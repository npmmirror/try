/* eslint-disable taro/props-reserve-keyword */
import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image, Input, Button } from '@tarojs/components';
import './index.scss';
import cax from '../../components/cax/index';
import drawText from '../index2/draw';
// import template1 from "./template/1.json";
// import template2 from "./template/2.json";
// import template3 from "./template/10000years.json";
// import template4 from "./template/demaxiya.json";
import getRandomTemplate from '../../api/template';

// const templateList = [template3, template1, template2, template4];

export default class Index extends Component {
  config = {
    navigationBarTitleText: '首页',
    usingComponents: {
      // 这里为组件要另外取一个名字 cax-canvas，不能跟cax库重名
      'cax-canvas': '../../components/cax/cax'
    }
  };

  constructor() {
    super();
    // this.state = {
    //   userInput: []
    // };
    this.stage = null;
    this.templateList = [];
    this.userInput = [];
  }

  componentDidMount() {
    this.keywords =
      (this.$router.params.corpName || '') + (this.$router.params.major || '');
    this.userInput = [
      { text: this.$router.params.corpName || '' },
      { text: this.$router.params.major || '' }
    ];
    this.generateImage();
  }

  generateImage() {
    this.getTemplate().then(this.draw);
  }

  // 获得模版
  getTemplate() {
    return new Promise((resolve, reject) => {
      if (this.templateList && this.templateList.length) {
        const currentTemplate = this.templateList.shift();
        this.template = JSON.parse(currentTemplate.patternText);
        resolve();
        return;
      }
      getRandomTemplate({
        keywords: this.keywords || '',
        limit: 10
      })
        .then(data => {
          // 根据id手动去重
          const keyMap = {};
          this.templateList = data.reduce((result, cur) => {
            if (!keyMap[cur.id]) {
              result.push(cur);
              keyMap[cur.id] = true;
            }
            return result;
          }, []);

          const currentTemplate = this.templateList.shift();
          this.template = JSON.parse(currentTemplate.patternText);
          // const template = JSON.parse(data[0].patternText);
          // this.currentTemplate = data[0];
          // const template = JSON.parse(data[0].patternText);
          // this.template = template;
          // this.setState({
          //   userInput: template.userInput
          // });
          // this.userInput = JSON.parse(JSON.stringify(template.userInput));
          // this.userInput = template.userInput;
          // this.userInput.forEach((item, index) => {
          //   item.text = '';
          //   if (index === 0) {
          //     item.text = this.$router.params.corpName;
          //   } else if (index === 1) {
          //     item.text = this.$router.params.major;
          //   }
          // });
          resolve();
        })
        .catch(reject);
    });
  }

  draw = () => {
    let { stageProps, textGroupList } = this.template;
    const { width = 750, height = 750 } = stageProps;
    const info = Taro.getSystemInfoSync();

    // 计算画布的真实宽高
    const actualWidth = info.windowWidth * (750 / 750);
    const actualHeight = (height * actualWidth) / width;
    const stage = (this.stage =
      this.stage ||
      new cax.Stage(actualWidth, actualHeight, 'myCanvas', this.$scope));
    stage.scale = actualWidth / width;

    stage.empty();

    // 背景色
    const rect = new cax.Rect(width, height, {
      fillStyle: stageProps.background || '#FFFFFF'
    });
    stage.add(rect);

    // 右下角的小图片
    const bitmap = new cax.Bitmap('../../images/smallqr.png');
    // bitmap.scale = (width / 750) * (84 / 225); //84 是设计尺寸，225是图片原始尺寸
    bitmap.scale = width / 750;
    bitmap.x = (603 / 750) * width;
    bitmap.y = (611 / 750) * height;
    stage.add(bitmap);

    // 28 * 84
    const bitmap2 = new cax.Bitmap('../../images/text2.png');
    bitmap2.scale = width / 750;
    bitmap2.x = (700 / 750) * width;
    bitmap2.y = (611 / 750) * height;
    stage.add(bitmap2);

    // 逐条文字添加
    textGroupList.forEach(item => {
      item = JSON.parse(JSON.stringify(item));
      item.children.forEach(child => {
        this.userInput.forEach((keyword, index) => {
          child.text = child.text.replace(
            new RegExp(`{keyword${index}}`, 'g'),
            keyword.text
          );
        });
      });
      const textGroup = drawText(cax, item);
      stage.add(textGroup);
    });

    // 不加setTimeout 图片就不显示。。。我也不知道为什么
    Taro.showLoading({
      title: '加载中',
      mask: true
    });
    setTimeout(() => {
      Taro.hideLoading();
      stage.update();
      setTimeout(() => {
        this.getImg(url => {
          this.imgUrl = url;
        });
      }, 1000);
    }, 100);
  };

  // 生成图片
  getImg = callback => {
    const ctx = this.$scope.selectComponent('#myCanvas');
    Taro.canvasToTempFilePath(
      {
        canvasId: this.stage.ctx.canvasId,
        success: res => {
          if (typeof callback === 'function') {
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
            icon: 'none'
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

  saveImage = () => {
    this.getImg(url => {
      Taro.saveImageToPhotosAlbum({
        filePath: url,
        success() {
          Taro.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 2000
          });
        },
        fail(e) {
          if (e.errMsg.indexOf('cancel') !== -1) return;
          Taro.showToast({
            title: '保存失败',
            icon: 'none',
            duration: 2000
          });
        }
      });
    });
  };

  onShareAppMessage() {
    return {
      // title: that.data.detail.content,
      title: `${this.$router.params.corpName}的毒文案`,
      imageUrl: this.imgUrl
    };
  }

  render() {
    return (
      <View className='container'>
        <View className='canvas-wrap' onTap={this.getImg}>
          <cax-canvas id='myCanvas' />
        </View>
        <View className='btn-group'>
          <View className='row'>
            <Button onClick={this.generateImage.bind(this)}>再来一次</Button>
          </View>
          <View className='row'>
            <Button className='main-color' onClick={this.saveImage}>
              保存到相册
            </Button>
            <Button className='emm' openType='share'>
              邀请朋友玩
            </Button>
          </View>
        </View>
      </View>
    );
  }

  css() {}
}
