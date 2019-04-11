/* eslint-disable taro/props-reserve-keyword */
import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import "./index.scss";
// const cax = require('../../components/cax/index')
// import * as cax from '../../components/cax/index'
import cax from "../../components/cax/index";
import drawText from "./draw";

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
      value: ""
    };
  }

  componentWillMount() {}

  componentDidMount() {
    const info = Taro.getSystemInfoSync();
    const stage = new cax.Stage(
      info.windowWidth,
      info.windowHeight / 2,
      "myCanvas",
      this.$scope
    );
    stage.scale = info.windowWidth / 375;
    stage.scale = 1;

    const rect = new cax.Rect(100, 100, {
      fillStyle: "black"
    });

    rect.originX = 50;
    rect.originY = 50;
    rect.x = 100;
    rect.y = 100;
    rect.rotation = 30;

    rect.on("touchstart", () => {
      console.log("rect touchstart");
    });

    rect.on("touchmove", () => {
      console.log("rect touchmove");
    });

    rect.on("touchend", () => {
      console.log("rect touchend");
    });

    const getImg = () => {
      const ctx = this.$scope.selectComponent("#myCanvas");
      wx.canvasToTempFilePath(
        {
          // x: 100,
          // y: 200,
          // width: 50,
          // height: 50,
          // destWidth: 100,
          // destHeight: 100,
          canvasId: stage.ctx.canvasId,
          success: res => {
            console.log(res.tempFilePath);
            this.setState({
              value: res.tempFilePath
            });
            // Taro.previewImage({
            //   current: res.tempFilePath, // 当前显示图片的http链接
            //   urls: [res.tempFilePath] // 需要预览的图片http链接列表
            // });
          },
          fail: e => {}
        },
        ctx
      );
    };

    rect.on("tap", () => {
      getImg();
    });

    stage.add(rect);

    const button = new cax.Button({
      width: 100,
      height: 40,
      text: "I am button!"
    });
    button.y = 170;
    button.x = 20;
    stage.add(button);
    const bitmap = new cax.Bitmap("../../images/wx.png");

    bitmap.on("tap", () => {
      console.log("bitmap tap");
    });

    stage.add(bitmap);

    const sprite = new cax.Sprite({
      framerate: 7,
      imgs: [
        "https://r.photo.store.qq.com/psb?/V137Nysk1nVBJS/09YJstVgoLEi0niIWFcOJCyGmkyDaYLq.tlpDE62Zdc!/r/dDMBAAAAAAAA"
      ],
      frames: [
        // x, y, width, height, originX, originY ,imageIndex
        [0, 0, 32, 32],
        [32 * 1, 0, 32, 32],
        [32 * 2, 0, 32, 32],
        [32 * 3, 0, 32, 32],
        [32 * 4, 0, 32, 32],
        [32 * 5, 0, 32, 32],
        [32 * 6, 0, 32, 32],
        [32 * 7, 0, 32, 32],
        [32 * 8, 0, 32, 32],
        [32 * 9, 0, 32, 32],
        [32 * 10, 0, 32, 32],
        [32 * 11, 0, 32, 32],
        [32 * 12, 0, 32, 32],
        [32 * 13, 0, 32, 32],
        [32 * 14, 0, 32, 32]
      ],
      animations: {
        walk: {
          frames: [0, 1]
        },
        happy: {
          frames: [11, 12, 13, 14]
        },
        win: {
          frames: [7, 8, 9, 10]
        }
      },
      currentAnimation: "walk",
      animationEnd: function() {}
    });

    sprite.x = 100;
    sprite.y = 100;
    stage.add(sprite);

    const textJson = {
      x: 20,
      y: 200,
      children: [
        {
          text: "雷猴啊类",
          color: "#00FF00",
          font: "30px Arial"
        },
        {
          text: "丢雷楼某啊",
          color: "red",
          font: "34px Arial",
          marginLeft: 10,
          marginTop: 5,
          // rotation: 180
        }
      ]
    };

    const textGroup = drawText(cax, textJson);
    stage.add(textGroup);

    setInterval(() => {
      rect.rotation++;
      stage.update();
    }, 16);

    stage.update();
    getImg();
    setTimeout(() => {
      getImg();
    }, 1000);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className='index'>
        <Text>Hello world!3</Text>
        <cax-canvas id='myCanvas' />
        <Image mode='widthFix' src={this.state.value} />
      </View>
    );
  }

  css() {}
}
