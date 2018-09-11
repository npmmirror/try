# -*- coding: UTF-8 -*-
from urllib import request
from http import cookiejar
import ssl

# 不校验证书的有效性
ssl._create_default_https_context = ssl._create_unverified_context


# 获取社保网站的cookie
def get_cookie():
    # 声明一个CookieJar对象实例来保存cookie
    cookie = cookiejar.CookieJar()
    # 利用urllib.request库的HTTPCookieProcessor对象来创建cookie处理器,也就CookieHandler
    handler = request.HTTPCookieProcessor(cookie)
    # 通过CookieHandler创建opener
    opener = request.build_opener(handler)
    # 此处的open方法打开网页
    response = opener.open('https://grcx.dgsi.gov.cn/action/LoginAction?ywType=kcxjd')
    # response = opener.open('https://grcx.dgsi.gov.cn/pages/cxxt/q_sbkjdcx_tj.jsp')
    cookie_array = []
    # 打印cookie信息
    for item in cookie:
        cookie_array.append('%s=%s' % (item.name, item.value))
        # print('Name = %s' % item.name)
        # print('Value =    %s' % item.value)
    return '&'.join(cookie_array)


if __name__ == '__main__':
    print(get_cookie())
