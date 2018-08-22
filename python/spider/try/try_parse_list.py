#!/usr/bin/env python
# -*- coding:utf-8 -*-
# Author: HZH create at 2018/8/20 21:04 
# Description:解析漫画网页
from urllib import request
from bs4 import BeautifulSoup
import re


# 为图片的alt属性添加右引号，替换双引号为单引号（网站的html源码写错了）
def fix_quotation(html_text):
    reg1 = r'(?<=alt=")([^/>]*?)\s+(?=\/>)'
    return re.sub(reg1, r'\1" ', html_text).replace('""', '"')


class ComicItem:
    """漫画对象，代表一条漫画"""
    counter = 0

    def __init__(self, target_url: object, name: object, img_url: object) -> object:
        self.target_url = target_url
        self.name = name
        self.img_url = img_url
        ComicItem.counter += 1

    def __str__(self):
        return "{}\t\t{}\t\t{}".format(self.name, self.target_url, self.img_url)


def item_to_comic(item):
    result = ComicItem(target_url=item['href'], name=item.img['alt'], img_url=item.img['src'])
    return result


# 获得列表
def get_comics_list(download_url):
    page_request = request.Request(url=download_url)
    page_response = request.urlopen(page_request).read()
    page_html = page_response.decode('gbk', 'ignore')
    page_html = fix_quotation(page_html)
    # 这里使用html.parser,那个 lxml 在解析的时候没有办法处理引号不闭合的情况会混乱
    soup_texts = BeautifulSoup(page_html, 'html.parser')
    # texts = soup_texts.find_all('ul', class_='pList')
    # soup_text = BeautifulSoup(str(texts), 'html.parser')
    # li_list = soup_text.find_all("li")
    li_list = soup_texts.find_all('a', class_='pic')
    result_array = []
    for li_item in li_list:
        # 这里需要判断一下图片的路径是否符合我的要求
        # 1、至少保证图片封面现在是有效的
        # 2、确认这条记录没有存在
        if True:
            result_array.append(item_to_comic(li_item))
    return result_array

    # 将\xa0无法解码的字符删除(这个其实就是网页中的&nbsp;)
    # print(soup_text.div.text.replace('\xa0', ''))


def main():
    download_url = 'http://m.bzku520.com/shaonvmanhua/'
    comics_list = get_comics_list(download_url)
    # print(comics_list)
    for item in comics_list:
        print(item)


if __name__ == '__main__':
    main()
