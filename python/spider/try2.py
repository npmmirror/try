#!/usr/bin/env python
# -*- coding:utf-8 -*-
# Author: HZH create at 2018/8/21 0:28 
# Description:
import requests
import http.client,re

if __name__=="__main__":
    # headers = {
    # 'user-agent': 'Mozilla / 5.0(Windows NT 10.0; WOW64) AppleWebKit / 537.36(KHTML, likeGecko) Chrome / 53.0.2785.104Safari / 537.36Core / 1.53.4882.400QQBrowser / 9.7.13059.400'
    # }
    # response = requests.get('http://toutiao.com/group/6552087122092753412', headers = headers)
    # print(response.status_code)
    # print(response.text)

    conn = http.client.HTTPConnection("www.biqukan.com")
    # headers = {
    #     'cache-control': "no-cache",
    #     'postman-token': "94a26401-f17f-a9ee-acf5-eb1eb0ea572a"
    # }
    conn.request("GET", "/1_1094/5403177.html")
    res = conn.getresponse()
    data = res.read()
    # data = re.sub("\r","",data)
    data = data.replace(b'\r',b'\r\n')
    print(data.decode("gbk"))
