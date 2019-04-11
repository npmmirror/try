/* eslint-disable taro/props-reserve-keyword */
import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image, Input, Button } from "@tarojs/components";
import "./index.scss";
import cax from "../../components/cax/index";
import drawText from "../index2/draw";
import template1 from "./template/1.json";
import template2 from "./template/2.json";
import template3 from "./template/10000years.json";
import template4 from "./template/demaxiya.json";

const templateList = [template3, template1, template2, template4];

export default class Index extends Component {
  config = {
    navigationBarTitleText: "首页",
    usingComponents: {
      // 这里为组件要另外取一个名字 cax-canvas，不能跟cax库重名
      "cax-canvas": "../../components/cax/cax"
    }
  };

  constructor() {
    super();
    this.state = {
      userInput: []
    };
    this.stage = null;
    this.userInput = [];
  }

  componentDidMount() {
    this.getTemplate();
  }

  // 获得模版
  getTemplate() {
    const template = JSON.parse(JSON.stringify(templateList[0]));
    templateList.push(templateList.shift());
    this.template = template;
    this.setState({
      userInput: template.userInput
    });
    this.userInput = template.userInput;
    this.draw();
  }

  draw = () => {
    let { stageProps, textGroupList } = this.template;
    const { width = 375, height = 500 } = stageProps;
    const info = Taro.getSystemInfoSync();

    // 计算画布的真实宽高
    const actualWidth = info.windowWidth * (600 / 750);
    const actualHeight = (height * actualWidth) / width;
    const stage = (this.stage =
      this.stage ||
      new cax.Stage(actualWidth, actualHeight, "myCanvas", this.$scope));
    stage.scale = actualWidth / width;

    stage.empty();
    // 背景色
    const rect = new cax.Rect(width, height, {
      fillStyle: stageProps.background || "#FFFFFF"
    });
    stage.add(rect);
    // 逐条文字添加
    textGroupList.forEach(item => {
      item = JSON.parse(JSON.stringify(item));
      item.children.forEach(child => {
        this.userInput.forEach((keyword, index) => {
          child.text = child.text.replace(
            new RegExp(`{keyword${index}}`, "g"),
            keyword.text
          );
        });
      });
      const textGroup = drawText(cax, item);
      stage.add(textGroup);
    });
    stage.update();
  };

  // 生成图片
  getImg = callback => {
    const ctx = this.$scope.selectComponent("#myCanvas");
    Taro.canvasToTempFilePath(
      {
        canvasId: this.stage.ctx.canvasId,
        success: res => {
          if (typeof callback === "function") {
            callback(res.tempFilePath);
          } else {
            Taro.previewImage({
              current: res.tempFilePath, // 当前显示图片的http链接
              urls: [res.tempFilePath] // 需要预览的图片http链接列表
            });
          }
        },
        fail: e => {
          Taro.showToast({
            title: e,
            icon: "none"
          });
        }
      },
      ctx
    );
  };

  handleClick = () => {
    this.draw();
  };

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  handleInput(index, e) {
    this.userInput[index].text = e.detail.value;
    this.draw();
  }

  saveImage = () => {
    this.getImg(url => {
      Taro.saveImageToPhotosAlbum({
        filePath: url,
        success() {
          Taro.showToast({
            title: "保存成功",
            icon: "success",
            duration: 2000
          });
        },
        fail(e) {
          if (e.errMsg.indexOf("cancel") !== -1) return;
          Taro.showToast({
            title: "保存失败",
            icon: "none",
            duration: 2000
          });
        }
      });
    });
  };

  render() {
    return (
      <View>
        <View className='canvas-wrap'>
          <cax-canvas id='myCanvas' onTap={this.getImg} />
        </View>
        <View className='input-list'>
          {this.state.userInput.map((item, index) => (
            <Input
              type='text'
              className='my-input'
              value={item.text}
              key={index}
              onInput={this.handleInput.bind(this, index)}
            />
          ))}
        </View>
        <Button onClick={this.getTemplate.bind(this)}>换个模版</Button>
        <Button onClick={this.saveImage}>保存图片</Button>
        {/* <Button onClick={this.handleClick} style='display:none;'>点我画图</Button>
        <Button onClick={this.getImg} style='display:none;'>
          点我生成图片
        </Button> */}
        {/* taro 必须要有这个事件才会加入到小程序的作用域中。。。 */}
      </View>
    );
  }

  css() {}
}
