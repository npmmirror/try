const res = pm.response.json();

// res.t = 1619892159;

const n = {
  a: {
    resourcesUrl: 'https://resources.tkb600.site/',
    imageUrl: 'https://static.tkb600.site/',
    mediaType: { video: 'VIDEO', novel: 'NOVEL', image: 'IMAGE', album: 'ALBUM' },
  },
  b: '4qHK04',
  c: {
    t: '/thumbnail.jpg',
    s: '/output_sd.m3u8',
    p: '/output_preview.mp4',
    m: '?md5=',
    e: '&expires=',
    h: '/output_hd.m3u8',
  },
};

const config = n.a;
const md5Prefix = n.b;
const suffix = n.c;

const sign = function (md5Prefix, time, path) {
  if (!md5Prefix || !time || !path) return '';
  var n = md5Prefix + path + time;
  var MD5 = CryptoJS.MD5(n).toString(CryptoJS.enc.Base64);
  return MD5.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
};

const processResponse = function (data) {
  var baseUrl = config.resourcesUrl + data.batch + '/' + data.url;

  data.thumbnail = config.imageUrl + data.batch + '/' + data.url + suffix.t;

  if (data.type == config.mediaType.video) {
    var sdPath = '/' + data.batch + '/' + data.url + suffix.s,
      sdMD5 = sign(md5Prefix, data.t, sdPath),
      sdQuery = '';
    sdMD5 && (sdQuery = suffix.m + sdMD5 + suffix.e + data.t);

    data.sd = baseUrl + suffix.s + sdQuery;

    data.preview = baseUrl + suffix.p;

    if (data.hd) {
      var hdPath = '/' + data.batch + '/' + data.url + suffix.h,
        hdMD5 = sign(md5Prefix, data.t, hdPath),
        hdQuery = '';
      hdMD5 && (hdQuery = suffix.m + hdMD5 + suffix.e + data.t);
      data.hd = baseUrl + suffix.h + hdQuery;
    }
  }
};

processResponse(res);

const templateData = {
  thumbnail: res.thumbnail,
  sd: res.sd,
  preview: res.preview,
  hd: res.hd,
};
console.log(templateData);

const template2 = `
<div id="json" style="/*width: 400px; height: 400px;*/"></div>
<link href="https://cdn.bootcdn.net/ajax/libs/jquery-jsonview/1.2.3/jquery.jsonview.min.css" rel="stylesheet">
<script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="https://cdn.bootcdn.net/ajax/libs/jquery-jsonview/1.2.3/jquery.jsonview.min.js"></script>
<script>
var json = ${JSON.stringify(templateData)};
console.log(json);

$(function() {
  $("#json").JSONView(json);
  // with options
//   $("#json-collasped").JSONView(json, { collapsed: true });
});
</script>
`;

pm.visualizer.set(template2, {});
