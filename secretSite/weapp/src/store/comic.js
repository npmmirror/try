import { observable } from 'mobx';
import { getComicList } from '@/services/comic';

const comicStore = observable({
  list: [],
  comic: {
    pages: [],
    comic_id: 0,
    cover_url: '', // 'http://bzk.7k7kcn.cn/uploads/2018/0404A2/tu.jpg'
    img_url_format: '', // 'http://bzk.7k7kcn.cn/uploads/2018/0404A2/tu%s.jpg'
    name: '',
    page_number: 0,
  },
  async getList() {
    const list = await getComicList();
    this.list = list
      .filter((item) => item.img_url_type)
      .filter((item) => item.origin_host === 'http://m.bzku520.com/');
  },
  setComic(comic) {
    const { page_number, img_url_format } = comic;
    const pages = Array.from({ length: page_number || 0 })
      .map((_, index) => img_url_format.replace('%s', index + 1));
    this.comic = {
      ...comic,
      pages
    };
  }
});

export default comicStore;
