import request from "../util/request";

function getRandomTemplate() {
  return request({
    url: "/v2/cms/copywritingPattern/findRandom"
  });
}
export default getRandomTemplate;
