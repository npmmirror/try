<template>
  <div>

    <p>pages/test/test.wxml</p>

    <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="bindGetUserInfo"> 登录</button>
    <button @tap='getAllUser'>读取所有用户</button>

  </div>
</template>

<script>
  // const $ = require('@/utils/request.js')0
  const service = require('@/utils/service.js')
  // pages/test/test.js
  export default {
    name: 'index',
    methods: {
      bindGetUserInfo: function (e) {
        console.log(e)
        service.updateUserInfo(e.mp.detail.userInfo)
      },

      getAllUser: function () {
        service.getAllUser({
          pageSize: 1,
          pageNo: 1
        })
      }
    }
  }
</script>

<style scoped>

</style>
