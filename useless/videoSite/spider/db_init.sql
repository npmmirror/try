-- 数据库表结构
CREATE TABLE `video_list` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `type` varchar(20) DEFAULT NULL COMMENT '视频分类',
  `secret_key` varchar(256) NOT NULL COMMENT '获得封面和播放视频用到的key',
  `origin_id` varchar(256) DEFAULT NULL COMMENT '在源站中视频的key',
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建日期',
  PRIMARY KEY (`id`),
  UNIQUE KEY `secret_key` (`secret_key`),
  UNIQUE KEY `origin_id` (`origin_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='用于存储恋夜秀场视频站中的视频，主要是其中的secret_key，可以用于获取视频封面';

-- 插入示例
INSERT INTO video_list(type,secret_key,origin_id)
VALUES ('nihao','aaa','dfsdf/fsdf');