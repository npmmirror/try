import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import hello2 from '@/components/hello2'

Vue.use(Router)

export default new Router({
  mode: 'history', // 后端支持可开
  routes: [
    {
      path: '/h1',
      name: 'HelloWorld',
      component: HelloWorld,
      children: [{
        path: 'hello2',
        name: 'Hello2',
        component: hello2
      }]
    }
  ]
})
