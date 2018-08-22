#!/usr/bin/env python
# -*- coding:utf-8 -*-
# Author: HZH create at 2018/8/22 18:21 
# Description: 解析网页的类

class list_parser:
    """解析类"""
    def __init__(self):
        self.origin_

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

