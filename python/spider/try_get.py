#!/usr/bin/env python
# -*- coding:utf-8 -*-
# Author: HZH create at 2018/8/20 21:04 
# Description:


from urllib import request
from bs4 import BeautifulSoup
import re


#为图片的alt属性添加右引号，原html中没有闭合影响解析
def add_quotation(str):
    reg1 = r'(?<=alt=")([^/>]*)\s*(?=\/>)'
    return re.sub(reg1,r'\1" ',str).replace('""','"')

#获得列表
def get_comics_list(download_url):
    download_req = request.Request(url=download_url)
    download_response = request.urlopen(download_req)
    download_response_data = download_response.read()
    download_html = download_response_data.decode('gbk', 'ignore')
    download_html = add_quotation(download_html)
    soup_texts = BeautifulSoup(download_html, 'lxml')
    texts = soup_texts.find_all('ul',class_='pList')
    soup_text = BeautifulSoup(str(texts), 'lxml')
    aa = soup_text.ul.children
    for child in aa:
        print(child)

    # 将\xa0无法解码的字符删除(这个其实就是网页中的&nbsp;)
    # print(download_response_data.replace(b'\r',b'').decode('gbk', 'ignore'))
    # print(texts)
    # print(soup_text.div.text.replace('\xa0', ''))


def main():
    download_url = 'http://m.bzku520.com/shaonvmanhua/'
    get_comics_list(download_url)


if __name__ == '__main__':
    main()
