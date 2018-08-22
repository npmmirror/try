#!/usr/bin/env python
# -*- coding:utf-8 -*-
# Author: HZH create at 2018/8/22 18:21 
# Description: 解析网页的类
from urllib import request
from bs4 import BeautifulSoup
import re


class ComicItem:
    """漫画对象，代表一条漫画"""

    # (comic_type_id,name,origin_host,origin_path,cover_url,
    # img_url_format,img_url_type,store_path,store_url_format,stick,priority,
    # state,valid,createId,createDate,modifyId,modifyDate)

    # ('1', 'nihao', 'http://xxx.xxx/', 'xxx/xxx.html', 'xxx/xxx.jpg',
    #  'xxx/xxx%s.jpg', '1', 'path:xxx/xxx','format:xxx/xxx%03d.jpg', '0', '1',
    # '1', '1', '0000', CURRENT_TIMESTAMP, '0000', CURRENT_TIMESTAMP);

    def __init__(self, name, origin_path, img_url_format, cover_url=1, origin_host=1,):
        self.comic_type_id = 1
        self.name = name
        self.origin_host = origin_host
        self.origin_path = origin_path
        self.cover_url = cover_url
        self.img_url_format = img_url_format
        self.img_url_type = 1
        self.store_path = 1
        self.store_url_format = 1
        self.stick = 1
        self.priority = 1
        self.state = 1
        self.valid = 1
        self.createId = 1
        self.createDate = 1
        self.modifyId = 1
        self.modifyDate = 1

    def __str__(self):
        return "{}\t\t{}\t\t{}".format(self.name, self.origin_path, self.img_url_format)

    @staticmethod
    def item_to_comic(item):
        result = ComicItem(origin_path=item['href'], name=item.img['alt'], img_url_format=item.img['src'])
        return result

    def get_sql(self):
        sql = """INSERT INTO comics_list
              (comic_type_id,name,origin_host,origin_path,cover_url,img_url_format,img_url_type,store_path,store_url_format,stick,priority,state,valid,createId,createDate,modifyId,modifyDate)
              VALUES
              ('%s','%s','%s','%s','%s','%s','%s','%s','%s','0','1','1','1','0000',CURRENT_TIMESTAMP,'0000',CURRENT_TIMESTAMP);""" \
        % (self.comic_type_id, self.origin_host, self.origin_path, self.cover_url, self.img_url_format, self.img_url_type, self.store_path, self.store_url_format)



class ComicItemConstructor:
    def __init__(self):
        self.a = 1

    def constructComicItem(self):
        return


class ComicsSite:
    """网站对象"""
    def __init__(self,list_url):
        self.list_url = list_url
        self.comics_list = ListParser.get_comics_list(list_url)


class ListParser:
    """解析类"""

    def __init__(self):
        self.list_url = 1 # 存放当前页面的链接
        self.comic_type_id = 1
        self.name = 1
        self.origin_host = 1
        self.origin_path = 1
        self.cover_url = 1
        self.img_url_format = 1
        self.img_url_type = 1
        self.store_path = 1
        self.store_url_format = 1
        self.stick = 1
        self.priority = 1
        self.state = 1
        self.valid = 1
        self.createId = 1
        self.createDate = 1
        self.modifyId = 1
        self.modifyDate = 1

    # 为图片的alt属性添加右引号，替换双引号为单引号（网站的html源码写错了）
    @staticmethod
    def fix_quotation(html_text):
        reg1 = r'(?<=alt=")([^/>]*?)\s+(?=\/>)'
        return re.sub(reg1, r'\1" ', html_text).replace('""', '"')

    # 获得列表
    @staticmethod
    def get_comics_list(download_url):
        page_request = request.Request(url=download_url)
        page_response = request.urlopen(page_request).read()
        page_html = page_response.decode('utf-8', 'ignore')
        page_html = ListParser.fix_quotation(page_html)
        # 这里使用html.parser,那个 lxml 在解析的时候没有办法处理引号不闭合的情况会混乱
        page_soup = BeautifulSoup(page_html, 'html.parser')
        li_list = page_soup.find_all('a', class_='pic')
        result_array = []
        for li_item in li_list:
            # 这里需要判断一下图片的路径是否符合我的要求
            # 1、至少保证图片封面现在是有效的
            # 2、确认这条记录没有存在
            if True:
                result_array.append(ComicItem.item_to_comic(li_item))
        return result_array


def main():
    download_url = [
        'http://m.bzku520.com/shaonvmanhua/',
        'http://m.lifanbzk.la/shaonvmanhua/',
        "http://m.benzi8.cc/shaonv/",
        "http://m.kmhua.net/shaonvmanhua/",
        ]
    comics_site = ComicsSite(download_url[0])
    for item in comics_site.comics_list:
        print(item)


if __name__ == '__main__':
    main()
    sql = """INSERT INTO comics_list
                  (comic_type_id,name,origin_host,origin_path,cover_url,img_url_format,img_url_type,store_path,store_url_format,stick,priority,state,valid,createId,createDate,modifyId,modifyDate)
                  VALUES
                  ('%s','%s','http://xxx.xxx/','xxx/xxx.html','xxx/xxx.jpg','xxx/xxx%%s.jpg','1','path:xxx/xxx','format:xxx/xxx%%03d.jpg','0','1','1','1','0000',CURRENT_TIMESTAMP,'0000',CURRENT_TIMESTAMP);""" \
          % ("h", "h")
    print(sql)
