#!/usr/bin/env python
# -*- coding:utf-8 -*-
# Author: HZH create at 2018/8/20 17:59 
# Description: 根据网上教程解析html

from urllib import request
from bs4 import BeautifulSoup


def get_article():
    download_url = 'http://www.biqukan.com/1_1094/5403177.html'
    # head = {}
    # head['User-Agent'] = 'Mozilla/5.0 (Linux; Android 4.1.1; Nexus 7 Build/JRO03D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166  Safari/535.19'
    download_req = request.Request(url=download_url)
    download_response = request.urlopen(download_req)
    dd = download_response.read()
    # download_html = dd.replace(b'\r\n',b'\r').replace(b'\r',b'\r\n').decode('gbk', 'ignore')
    download_html = dd.replace(b'\n',b'').replace(b'\r',b'\r\n').decode('gbk', 'ignore')
    soup_texts = BeautifulSoup(download_html, 'lxml')
    texts = soup_texts.find_all(id='content', class_='showtxt')
    soup_text = BeautifulSoup(str(texts), 'lxml')
    # 将\xa0无法解码的字符删除(这个其实就是网页中的&nbsp;)
    # print(dd.replace(b'\r',b'').decode('gbk', 'ignore'))
    # print(texts)
    print(soup_text.div.text.replace('\xa0', ''))


def main():
    get_article()



if __name__ == '__main__':
    main()
