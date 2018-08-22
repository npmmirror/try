#!/usr/bin/env python
# -*- coding:utf-8 -*-
# Author: HZH create at 2018/8/22 17:19 
# Description:尝试调用mysql
import pymysql
import re


def main():
    # 打开数据库连接
    db = pymysql.connect(host="showhand.top", user="hzh", password="1q2w3e4r5t", database="comics_site")
    # db = pymysql.connect(host="193.112.1.213", user="hzh", password="1q2w3e4r5t", database="comics_site")

    # 使用cursor()方法获取操作游标
    cursor = db.cursor()

    # SQL 插入语句
    sql = """INSERT INTO comics_list
      (comic_type_id,name,origin_host,origin_path,cover_url,img_url_format,img_url_type,store_path,store_url_format,stick,priority,state,valid,createId,createDate,modifyId,modifyDate)
      VALUES
      ('1','nihao','http://xxx.xxx/','xxx/xxx.html','xxx/xxx.jpg','xxx/xxx%s.jpg','1','path:xxx/xxx','format:xxx/xxx%03d.jpg','0','1','1','1','0000',CURRENT_TIMESTAMP,'0000',CURRENT_TIMESTAMP);"""
    try:
        # 执行sql语句
        cursor.execute(sql)
        # 提交到数据库执行
        db.commit()
    except Exception as e:
        # 如果发生错误则回滚
        db.rollback()
        if re.search(r'Duplicate', str(e)):
            raise Exception('这个源地址已经存在了哟')
        else:
            raise Exception('unknow Exception')
    # 关闭数据库连接
    db.close()


if __name__ == '__main__':
    main()
