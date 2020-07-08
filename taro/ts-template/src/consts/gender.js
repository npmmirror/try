// 性别
const Gender = [
  {
    'code': '1',
    'name': '男'
  },
  {
    'code': '2',
    'name': '女'
  },
  {
    'code': '5',
    'name': '男' // 女变男
  },
  {
    'code': '6',
    'name': '女' // 男变女
  },
  {
    'code': '9',
    'name': '未知'
  }
]

const GenderMap = {}
Gender.forEach(item => {
  GenderMap[item.code] = item
})

module.exports = {
  Gender, GenderMap
}
