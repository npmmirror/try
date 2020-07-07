import Taro, { Component } from '@tarojs/taro';
import { Image, View } from '@tarojs/components';
import { inject, observer } from '@tarojs/mobx';
import HanmanStore from '@/store/HanmanStore';
import './read.less';

interface PageProps {
  hanmanStore: HanmanStore;
}

@inject('hanmanStore')
@observer
class HanmanSearch extends Component<PageProps> {
  render() {
    const {
      hanmanStore: {
        chapterPages,
      },
    } = this.props;
    return (
      <View>
        <View className='list'>
          {
            chapterPages.map(item => (
              <View className='item' key={item.content}>
                <Image src={item.content} mode='widthFix' />
              </View>
            ))
          }
        </View>
      </View>
    );
  }
}

export default HanmanSearch;
