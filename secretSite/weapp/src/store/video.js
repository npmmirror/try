import { observable } from 'mobx';
import { getVideoList } from '@/services/video';

const videoStore = observable({
  list: [],
  video: {},
  async getList() {
    const list = await getVideoList();

    // 视频链接：https://aicdn-20180326-1.mannersteel.com/M4bdKiLd/500kb/hls/index.m3u8
    // 视频封面：https://video.vodstatic.com/B3TyZIm5/1.jpg
    this.list = list.map((item) => ({
      key: item.secret_key,
      videoSrc: `https://aicdn-20180326-1.mannersteel.com/${item.secret_key}/500kb/hls/index.m3u8`,
      coverSrc: `https://video.vodstatic.com/${item.secret_key}/1.jpg`
    }));
  },
  setVideo(video) {
    this.video = video;
  }
});

export default videoStore;
