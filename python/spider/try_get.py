#!/usr/bin/env python
# -*- coding:utf-8 -*-
# Author: HZH create at 2018/8/20 21:04 
# Description: 

import requests


def main():
    # download_url = 'http://www.biqukan.com/1_1452/7600592.html'
    # url2 = "https://github.com/timeline.json"
    # headers = {'content-type': 'application/json'}
    # res = requests.get(download_url,headers = headers)
    # print(res.text)
    url = "http://www.biqukan.com/1_1094/5403177.html"
    headers = {
        'cache-control': "no-cache",
        'postman-token': "f0c3b6cf-912d-03df-4c38-6c6788690ac7",
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.26 Safari/537.36 Core/1.63.5702.400 QQBrowser/10.2.1893.400',
    }
    response = requests.request("GET", url, headers=headers)
    print(response.text)


if __name__ == '__main__':
    main()
