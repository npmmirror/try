import requests, os
import urllib
import ssl
import urllib.request
import http.client

# 不校验证书的有效性
ssl._create_default_https_context = ssl._create_unverified_context


def download_verify_code(cookie_str):
    imgurl = 'https://grcx.dgsi.gov.cn/pages/checkimage.JSP'
    opener = urllib.request.build_opener()
    opener.addheaders = [('Cookie', cookie_str)]
    urllib.request.install_opener(opener)
    urllib.request.urlretrieve(imgurl, 'img.png')


def get_result(cookie_str, verify_code, id_card_code):
    conn = http.client.HTTPSConnection("grcx.dgsi.gov.cn")
    headers = {
        'Cookie': cookie_str
    }
    # path1 = "/action/MainAction?menuid=206207&ActionType=kcxjd"  # 页面的路径
    # 用这条获取信息
    path2 = '/action/MainAction?ActionType=kcxjd_action&gmsfhm=%s&imagecheck=%s' % (id_card_code,verify_code)
    conn.request("GET", path2, headers=headers)

    response = conn.getresponse()
    data = response.read()
    return data.decode("gbk")


if __name__ == '__main__':
    cookie_str1 = 'JSESSIONID=efjHecB1daczkyy_VyYsUEhLxb78doVIdP0sYMlV-qijsH4kkrSO!-663685176'

    download_verify_code(cookie_str=cookie_str1)

    verify_code1 = input("验证码:")

    res = get_result(cookie_str=cookie_str1, verify_code=verify_code1)

    print(res)

    os.system("pause")
