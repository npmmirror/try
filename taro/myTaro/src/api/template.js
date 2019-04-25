import request from '../util/request';

export default function getRandomTemplate(data) {
  return request({
    url: '/v2/cms/copywritingPattern/findRandom',
    data
  });
}
