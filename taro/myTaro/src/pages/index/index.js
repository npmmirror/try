/* eslint-disable taro/props-reserve-keyword */
import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image, Input, Button } from "@tarojs/components";
import "./index.scss";
import cax from "../../components/cax/index";
import drawText from "../index2/draw";
// import template1 from "./template/1.json";
// import template2 from "./template/2.json";
// import template3 from "./template/10000years.json";
// import template4 from "./template/demaxiya.json";
import getRandomTemplate from "../../api/template";

// const templateList = [template3, template1, template2, template4];

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
    getRandomTemplate().then(data => {
      this.currentTemplate = data[0];
      const template = JSON.parse(data[0].patternText);
      this.template = template;
      this.setState({
        userInput: template.userInput
      });
      this.userInput = JSON.parse(JSON.stringify(template.userInput));
      this.draw();
      this.userInput.forEach(item => (item.text = ""));
    });
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

    const bitmap = new cax.Bitmap("../../images/qr.png");
    bitmap.scale = 0.4;
    bitmap.y = bitmap.x = 490 - 225 * bitmap.scale;
    stage.add(bitmap);

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

    // 不加setTimeout 图片就不显示。。。我也不知道为什么
    Taro.showLoading();
    setTimeout(() => {
      Taro.hideLoading();
      stage.update();
    }, 100);
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
    // this.draw();
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
      <View className='container'>
        <View className='canvas-wrap'>
          <cax-canvas id='myCanvas' onTap={this.getImg} />
        </View>
        <View className='input-list'>
          {this.state.userInput.map((item, index) => (
            <View className='input-item' key={item.text}>
              <View className='label'>{item.text}</View>
              <Input
                type='text'
                className='input'
                placeholder={`请输入${item.text}`}
                onInput={this.handleInput.bind(this, index)}
              />
            </View>
          ))}
        </View>
        <View className='btn-group'>
          <View className='row'>
            <Button onClick={this.handleClick}>确定</Button>
          </View>
          <View className='row'>
            <Button type='primary' onClick={this.getTemplate.bind(this)}>
              换一个
            </Button>
            <Button onClick={this.saveImage}>保存图片</Button>
          </View>
        </View>
      </View>
    );
  }

  css() {}
}
