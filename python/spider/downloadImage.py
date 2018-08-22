import urllib.request, os
from urllib import error
import socket

# 超时时间
socket.setdefaulttimeout(5.0)
# 重试次数
retry_limit = 5
# 允许失败的次数
fail_limit = 3

bookID: str = "0820A2"
# 同漫画的目录，这里写成ID好看点
bookPath = "2018/%s" % bookID
# 下载的页数范围
page_range = range(1, 299)
# 漫画的存放目录
category_name = "D:/comics/" + bookID
# 下载所用的资源
# 0：5D漫画
# 1：里番本子
# 2：本子吧
# 3：看漫画
source_number = 0

list_format = "list_4_%d.html"
source_list = [
    {
        "web_url": "http://m.bzku520.com/shaonvmanhua/",
        "uploads_url_format": "http://bzk.7k7kcn.cn/uploads/%s/",
        "img_id_format": "tu%s.jpg"
    }, {
        "web_url": "http://m.lifanbzk.net/shaonvmanhua/",
        "uploads_url_format": "http://img.rw05.com/uploads/%s/",
        "img_id_format": "lifan%s.jpg"
    }, {
        "web_url": "http://m.benzi8.cc/shaonv/",
        "uploads_url_format": "http://bz.dyymh.com/uploads/%s/",
        "img_id_format": "bz%s.jpg"
    }, {
        "web_url": "http://m.kmhua.net/shaonvmanhua/",
        "uploads_url_format": "http://kmh.zuowen.us/uploads/%s/",
        "img_id_format": "kmh%s.jpg"
    }

    # 这个的图片url需要另外写爬虫，但是稳定性太差了懒得写
    # {
    # 	"web_url":"http://m.skwo.net/xieemanhua/27131_34.html",
    # 	"uploads_url_format":"http://3itm.qdskdz.com/skwo/uploads/allimg/180511/cvpy55dz1m1217.jpg"
    # }

]

source = source_list[source_number]
imgurlBase = source["uploads_url_format"]
imgurlFormat = imgurlBase % bookPath + source["img_id_format"]

imgurl = ""
file_path_Format = category_name + "/img_%03d.jpg"

try:
    os.mkdir(category_name)
    print("Create category \"%s\" success." % category_name)
except BaseException as e:
    print("error occurred:", e)
    exit()

download_success = True
# 失败次数
fail_time = 0

print("----------Download Start:%s---------" % imgurlFormat)
for page_idx in page_range:
    imgurl = imgurlFormat % str(page_idx)
    download_success = False
    file_not_found_error = False
    # 5 is the maximum of retry time
    for try_time in range(1, retry_limit + 1):
        try:
            urllib.request.urlretrieve(imgurl, file_path_Format % page_idx)
            print(page_idx, ": \tdownload ", imgurl, " succeed.")
            download_success = True
            break
            pass
        except error.HTTPError as e:
            # 容忍一次404，避免是中间某个页面缺页导致的错误
            print(page_idx, ": \t(%d/5)" % try_time, e, )
            if file_not_found_error:
                break
            file_not_found_error = True
        except Exception as e:
            print(page_idx, ": \t(%d/5) Connect fail. Try again. " % try_time, "\t------", e)
    if download_success is False and fail_time >= fail_limit:
        if page_idx - fail_time - 1 < 1:
            print("Error occurred when download:\" %s \", please check the url." % imgurl)
        else:
            print("\n%d image has been downloaded." % (page_idx - fail_time - 1))
        break
    elif download_success is False:
        fail_time += 1
        print(page_idx, ": \tSkip the image. (%d/%d)" % (fail_time, fail_limit))

print("----------Download Finished:%s---------\n" % imgurlFormat)
# os.system("pause")
