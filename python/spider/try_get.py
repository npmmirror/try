#!/usr/bin/env python
# -*- coding:utf-8 -*-
# Author: HZH create at 2018/8/20 21:04 
# Description:


from urllib import request
from bs4 import BeautifulSoup


def get_comics_list():
    download_url = 'http://m.bzku520.com/shaonvmanhua/'
    # head = {}
    # head['User-Agent'] = 'Mozilla/5.0 (Linux; Android 4.1.1; Nexus 7 Build/JRO03D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166  Safari/535.19'
    download_req = request.Request(url=download_url)
    download_response = request.urlopen(download_req)
    download_response_data = download_response.read()
    # download_html = download_response_data.replace(b'\r\n',b'\r').replace(b'\r',b'\r\n').decode('gbk', 'ignore')
    download_html = download_response_data.decode('gbk', 'ignore')
    # print(download_html)
    soup_texts = BeautifulSoup(download_html, 'lxml')
    texts = soup_texts.find_all('img')
    soup_text = BeautifulSoup(str(texts), 'lxml')
    print(texts)
    # 将\xa0无法解码的字符删除(这个其实就是网页中的&nbsp;)
    # print(download_response_data.replace(b'\r',b'').decode('gbk', 'ignore'))
    # print(texts)
    # print(soup_text.div.text.replace('\xa0', ''))


def main():
    get_comics_list()


if __name__ == '__main__':
    main()
