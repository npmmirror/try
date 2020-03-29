host: `http://106.53.82.122:7001`

1. 获取豌豆直播列表

   - `/wandou/getList`

   ```typescript
   export interface WandouLiveItem {
     uid: string;
     // 标题
     title: string;
     // 用户名？
     user_nicename: string;
     // rtmp 视频流源地址
     pull: string;
     // 封面？
     thumb: string;
     // 头像？
     avatar: string;
     // type !== 0 代表是收费房间
     type: number;
   }
   ```

2. 获取漫画列表

   - `/comic/getList?limit=${limit}`
   - limit：获取数量

   ```typescript
   export interface ComicItem {
     comic_id: number;
     // 封面图
     cover_url: string;
     // 图片路径，替换其中的 %s 即为图片路径
     img_url_format: string;
     // 源站，目前只有源站地址为 'http://m.bzku520.com/' 的能用
     origin_host: string;
     // 是否可用
     img_url_type: string;
     // 名称
     name: string;
     // 页数
     page_number: number;
     pages: string[];
   }
   ```
