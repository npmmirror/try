#!/usr/bin/env python
# -*- coding:utf-8 -*-
# Author: HZH create at 2018/9/11 15:06 
# Description:
from include.get_cookie import get_cookie
from include.verify_img import verify
from include.get_result import *

from bs4 import BeautifulSoup


# 获取社保状态
def get_shebao_status(id_card_code):
    my_cookie = get_cookie()
    # cookie_string = 'JSESSIONID=c2LHkjYOldIhqp4emMqbrpLXVu-N8bsKF7-p4-I7JKtTc2SMl_Oe!-663685176'
    #
    # print('my       cookie%s' % my_cookie)
    # print('standard cookie%s' % cookie_string)

    cookie_string = my_cookie
    download_verify_code(cookie_str=cookie_string)
    verify_code = verify(r'img.png')
    response = get_result(cookie_str=cookie_string, verify_code=verify_code, id_card_code=id_card_code)
    # print(response)
    page_soup = BeautifulSoup(response, 'html.parser')
    a_list = page_soup.find_all('td')
    for item in a_list:
        print(item.text)
    if len(a_list) == 0:
        print("???")
    # print(a_list)


if __name__ == '__main__':
    code = 'xxx'  # 这里是身份证号
    get_shebao_status(code)
    os.system("del img.png")
    # os.system("pause")
    # 安装pyinstaller 后可以在终端使用 pyinstaller -F main_func.py 命令生成可执行的exe文件
