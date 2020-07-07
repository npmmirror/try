import BaseApi from '@/utils/Base/BaseApi';

const host = 'https://comiccdnhw.jsmlny.top';

export default class HanmanApi extends BaseApi {
  // 根据名称搜索
  search(keyword: string) {
    return this.request(host + '/hcomic/csearch', {
      method: 'GET',
      data: {
        title: keyword,
      },
      cache: true,
    });
  }
  // 获取章节列表
  getChapterList(comicId: number) {
    return this.request(host + '/hcomic/qryComicInfoByComicId', {
      method: 'GET',
      data: {
        comicId,
      },
      cache: true,
    });
  }
  // 获取章节列表
  getChapterContent(chapterId: number) {
    return this.request(host + '/hcomic/chaptercontent', {
      method: 'GET',
      data: {
        chapterId,
      },
      cache: true,
    });
  }
}
