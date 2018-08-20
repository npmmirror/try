#!/usr/bin/env python
# -*- coding:utf-8 -*-
# Author: HZH create at 2018/8/20 17:59 
# Description: The main function.


from urllib import request
from bs4 import BeautifulSoup


def main():
    download_url = 'http://www.biqukan.com/1_1452/7600592.html'
    # head = {}
    # head['User-Agent'] = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.26 Safari/537.36 Core/1.63.5702.400 QQBrowser/10.2.1893.400'
    # head['Host'] = 'www.biqukan.com'
    download_req = request.Request(url=download_url, headers=head)
    download_response = request.urlopen(download_req)
    download_html = download_response.read().decode('gbk', 'ignore')
    print(1,download_html)
    # url = 'https://api.github.com/some/endpoint'
    # payload = {'some': 'data'}
    # headers = {'content-type': 'application/json'}
    # r = requests.post(url, data=json.dumps(payload), headers=headers)
    # print
    # r.text


    # soup_texts = BeautifulSoup(download_html, 'lxml')
    # texts = soup_texts.find_all(id='content', class_='showtxt')
    # soup_text = BeautifulSoup(str(texts), 'lxml')
    # # 将\xa0无法解码的字符删除
    # print(soup_text.div.text.replace('\xa0', ''))


if __name__ == '__main__':
    main()
