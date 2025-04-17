import { createRouter, createWebHistory} from 'vue-router';


const routes = [
  {
    path: "/home",
    component: () => import("@/view/home/index.vue"),
    meta:{
      title:'首页'
    }
  },
  {
    path: "/detail",
    component: () => import("@/view/detail/index.vue"),
    redirect: "detail/register",
    children: [
      {
        path: 'register',
        component: () => import("@/view/detail/register.vue"),
        meta:{
          title:'预约挂号'
        }
      }, {
        path: 'item',
        component: () => import("@/view/detail/item.vue"),
        meta:{
          title:'医院详情'
        }
      }, {
        path: 'reserve',
        component: () => import("@/view/detail/reserve.vue"),
        meta:{
          title:'通知'
        }
      }, {
        path: 'close',
        component: () => import("@/view/detail/close.vue"),
        meta:{
          title:'停诊信息'
        }
      }, {
        path: 'search',
        component: () => import("@/view/detail/search.vue"),
        meta:{
          title:'查询与取消'
        }
      },{
        path:'step',
        component:()=>import("@/view/detail/step.vue"),
        meta:{
          title:'预约第一步'
        }
      },{
        path:'peopleStep',
        component:()=>import("@/view/detail/peopleStep.vue"),
        meta:{
          title:'预约第二步'
        }
      }
    ],
  },
  {
    path:'/user',
    component:()=>import("@/view/user/index.vue"),
    redirect:'/user/realname',
    children:[
      {
        path:'realname',
        component:()=>import('@/view/user/realname.vue'),
        meta:{
          title:'实名认证'
        }
      },{
        path:'order',
        component:()=>import('@/view/user/order.vue'),
        meta:{
          title:'挂号订单'
        }
      },{
        path:'seeDoc',
        component:()=>import('@/view/user/seeDoc.vue'),
        meta:{
          title:'就诊人管理'
        }
      },{
        path:'account',
        component:()=>import('@/view/user/account.vue'),
        meta:{
          title:'账号信息'
        }
      },{
        path:'option',
        component:()=>import('@/view/user/option.vue'),
        meta:{
          title:'意见反馈'
        }
      }
    ]
  },
  {
    path: '/wxlogin',
    component: () => import("@/view/wxlogin/index.vue"),
  },
  {
    path: "/",
    redirect: "/home",
  },
]

//createRouter方法，用来创建路由实列，可以管理多个路由
export default createRouter({
  history: createWebHistory(),
  routes: routes,
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    };
  },
});
