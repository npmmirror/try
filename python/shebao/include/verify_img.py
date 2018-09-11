import urllib.request
import json
import datetime
import ssl

import urllib, base64


def get_token(client_id, client_secret):
    # client_id 为官网获取的AK， client_secret 为官网获取的SK
    host = ('https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&'
            + 'client_id=' + client_id
            + '&client_secret=' + client_secret)
    request = urllib.request.Request(host)
    request.add_header('Content-Type', 'application/json; charset=UTF-8')
    response = urllib.request.urlopen(request)
    content = response.read()
    myjson = json.loads(content)
    # if (content):
    #	print(content)
    return myjson['access_token']


# 通过百度的api识别验证码
def get_verify_code(access_token, img_path):
    url = 'https://aip.baidubce.com/rest/2.0/ocr/v1/general?access_token=' + access_token
    # 二进制方式打开图文件
    f = open(img_path, 'rb')
    # 参数image：图像base64编码
    img = base64.b64encode(f.read())
    params = {"image": img}
    # 准备一下头
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    # 将字典格式化成能用的形式
    data = urllib.parse.urlencode(params).encode('utf-8')
    # 创建一个request,放入我们的地址、数据、头
    request = urllib.request.Request(url, data, headers)
    # 访问
    html = urllib.request.urlopen(request).read().decode('utf-8')
    # 利用json解析包解析返回的json数据 拿到翻译结果
    # print(json.loads(html)['trans_result']['data'][0]['dst'])
    return json.loads(html)['words_result'][0]['words']


def verify(img_path=r'img.png'):
    ak = 'OyVRG28P0KFgSVZniGk43yNk'
    sk = 'jBObS5o1tKO72wiK3yCDZHPnrQEjyuhM'
    token = get_token(ak, sk)
    # print (token)
    return get_verify_code(access_token=token, img_path=img_path)


if __name__ == '__main__':
    print(verify(r'./img.png'))
