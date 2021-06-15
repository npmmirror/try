// 定位上报
export function reportPosition(acl_user, { position, lat, lng }) {
  return new Promise((resolve, reject) => {
    uni.request({
      header: {
        acl_user,
      },
      url: 'https://gateway-jd.d2.yilisafe.com/jindu/addicts/checkins/position',
      data: {
        position,
        lat,
        lng,
      },
      method: 'POST',
      success: (res) => {
        resolve(res);
      },
      fail: (res) => {
        reject(res);
      },
    });
  });
}

// 逆地址解析
export function decodeLocation(lat, lng) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: `https://gateway-jd.d2.yilisafe.com/jindu/geocodes?lat=${lat}&lng=${lng}`,
      method: 'GET',
      success: (res) => {
        resolve(res);
      },
      fail: (res) => {
        reject(res);
      },
    });
  });
}
