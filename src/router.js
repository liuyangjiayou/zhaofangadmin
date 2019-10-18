import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from './store/store';
Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

let routerArr = store.getters.getRoles;
/* 定义路由数组 */
let initRouter = [
  {
    path : '/home/index',
    name : 'index',
    component : resolve => require(['./viewFile/index.vue'],resolve),
    meta : {
      name : '总览'
    }
  },
  {
    path : '/home/real',
    name : 'real',
    component : resolve => require(['./viewFile/real.vue'],resolve),
    meta : {
      name : '物业管理'
    },
    children : [
      {
        path : '/home/real/mergeRecord',
        name : 'mergeRecord',
        component : resolve => require(['./sonView/realView/real_mergeRecord.vue'],resolve),
        meta : {
          name : '合并记录'
        }
      },
      {
        path : '/home/real/unmatchReal',
        name : 'unmatchReal',
        component : resolve => require(['./sonView/realView/real_unmatchReal.vue'],resolve),
        meta : {
          name : '未匹配物业'
        }
      },
      {
        path : '/home/real/matchReal',
        name : 'matchReal',
        component : resolve => require(['./sonView/realView/real_matchReal.vue'],resolve),
        meta : {
          name : '已匹配物业'
        }
      }
    ]
  },
  {
    path : '/home/adver',
    name : 'adver',
    component : resolve => require(['./viewFile/adverAdmin'],resolve),
    meta : {
      name : '广告管理'
    },
    children : [
      {
        path : '/home/adver/newhouse',
        name : '',
        component : resolve => require(['./sonView/adverView/adver_newhouse_index'],resolve),
        meta : {
          name : '新房首页'
        }
      },
      {
        path : '/home/adver/website',
        name : '',
        component : resolve => require(['./sonView/adverView/adver_website_index'],resolve),
        meta : {
          name : '网站首页'
        }
      },
      {
        path : '/home/adver/newhouseList',
        name : '',
        component : resolve => require(['./sonView/adverView/adver_newhouse_index'],resolve),
        meta : {
          name : '新房列表'
        }
      },
      {
        path : '/home/adver/salehouseList',
        name : '',
        component : resolve => require(['./sonView/adverView/adver_salehouse_list'],resolve),
        meta : {
          name : '二手房列表'
        }
      },
      {
        path : '/home/adver/renthouseList',
        name : '',
        component : resolve => require(['./sonView/adverView/adver_renthouse_list'],resolve),
        meta : {
          name : '出租房列表'
        }
      },
      {
        path : '/home/adver/consultList',
        name : '',
        component : resolve => require(['./sonView/adverView/adver_consult_list'],resolve),
        meta : {
          name : '咨询列表'
        }
      },
      {
        path : '/home/adver/consultDetail',
        name : 'adver_newhouse',
        component : resolve => require(['./sonView/adverView/adver_consult_detail'],resolve),
        meta : {
          name : '咨询详情'
        }
      }
    ]
  },
  {
    path : '/home/consult',
    name : '',
    component : resolve => require(['./viewFile/consult'],resolve),
    meta : {
      name : '咨询管理'
    },
    children : [
      {
        path : '/home/consult/buyhouse',
        name : '',
        component : resolve => require(['./sonView/consultView/consult_buyhouse'],resolve),
        meta : {
          name : '购房相关政策'
        }
      },
      {
        path : '/home/consult/loans',
        name : '',
        component : resolve => require(['./sonView/consultView/consult_loans'],resolve),
        meta : {
          name : '买房贷款流程'
        }
      },
      {
        path : '/home/consult/taxes',
        name : '',
        component : resolve => require(['./sonView/consultView/consult_taxes'],resolve),
        meta : {
          name : '买房税费'
        }
      },
      {
        path : '/home/consult/flow',
        name : '',
        component : resolve => require(['./sonView/consultView/consult_buyhouse_flow'],resolve),
        meta : {
          name : '购房流程'
        }
      },
      {
        path : '/home/consult/lookOut',
        name : '',
        component : resolve => require(['./sonView/consultView/consult_buyhouse_lookOut'],resolve),
        meta : {
          name : '买房注意事项'
        }
      },
      {
        path : '/home/consult/encyclopedia',
        name : '',
        component : resolve => require(['./sonView/consultView/consult_buyhouse_encyclopedia'],resolve),
        meta : {
          name : '买房知识百科'
        }
      },
      {
        path : '/home/consult/privacy',
        name : '',
        component : resolve => require(['./sonView/consultView/consult_privacy'],resolve),
        meta : {
          name : '隐私声明'
        }
      },
      {
        path : '/home/consult/link',
        name : '',
        component : resolve => require(['./sonView/consultView/consult_link'],resolve),
        meta : {
          name : '联系我们'
        }
      }
    ]
  },
  {
    path : '/home/decoration',
    name : '',
    component : resolve => require(['./viewFile/decoration'],resolve),
    meta : {
      name : '家装管理'
    },
    children : [
      {
        path : '/home/decoration/companyList',
        name : '',
        component : resolve => require(['./sonView/decoration/decoration_company_list'],resolve),
        meta : {
          name : '装修公司列表'
        }
      },
      {
        path : '/home/decoration/apply',
        name : '',
        component : resolve => require(['./sonView/decoration/decoration_apply'],resolve),
        meta : {
          name : '量房申请列表'
        }
      },
    ]
  },
  {
    path : '/home/entrust',
    name : '',
    component : resolve => require(['./viewFile/entrust'],resolve),
    meta : {
      name : '业主委托'
    },
    children : [
      {
        path : '/home/entrust/sale',
        name : '',
        component : resolve => require(['./sonView/entrust/entrust_sale'],resolve),
        meta : {
          name : '出售委托'
        }
      },
      {
        path : '/home/entrust/rent',
        name : '',
        component : resolve => require(['./sonView/entrust/entrust_rent'],resolve),
        meta : {
          name : '出租委托'
        }
      },
    ]
  },
  {
    path : '/home/agent',
    name : '',
    component : resolve => require(['./viewFile/agent'],resolve),
    meta : {
      name : '经纪人管理'
    },
    children : [
      {
        path : '/home/agent/addGent',
        name : '',
        component : resolve => require(['./sonView/agent/agent_addagent'],resolve),
        meta : {
          name : '新建经纪人'
        }
      },
      {
        path : '/home/agent/addGent',
        name : '',
        component : resolve => require(['./sonView/agent/agent_addagent'],resolve),
        meta : {
          name : '经纪人列表'
        }
      },
    ]
  },
  {
    path : '/home/newhouse',
    name : '',
    component : resolve => require(['./viewFile/newHouse'],resolve),
    meta : {
      name : '新房管理'
    },
    children : [
      {
        path : '/home/newhouse/house',
        name : '',
        component : resolve => require(['./sonView/newHouse/newHouse_house'],resolve),
        meta : {
          name : '楼盘管理'
        }
      }
    ]
  },
  {
    path : '/home/house',
    name : '',
    component : resolve => require(['./viewFile/house'],resolve),
    meta : {
      name : '房源管理'
    },
    children : [
      {
        path : '/home/house/adver',
        name : '',
        component : resolve => require(['./sonView/house/house_adver'],resolve),
        meta : {
          name : '推广房源'
        }
      },
      {
        path : '/home/house/quality',
        name : '',
        component : resolve => require(['./sonView/house/house_quality'],resolve),
        meta : {
          name : '优质房源'
        }
      }
    ]
  },
  {
    path : '/home/houseStore',
    name : '',
    component : resolve => require(['./viewFile/houseStore'],resolve),
    meta : {
      name : '房源库'
    },
    children : [
      {
        path : '/home/houseStore/sale',
        name : '',
        component : resolve => require(['./sonView/houseStore/houseStore_sale'],resolve),
        meta : {
          name : '出售房源'
        }
      },
      {
        path : '/home/houseStore/quality',
        name : '',
        component : resolve => require(['./sonView/houseStore/houseStore_rent'],resolve),
        meta : {
          name : '出租房源'
        }
      }
    ]
  },
  {
    path : '/home/frenid',
    name : '',
    component : resolve => require(['./viewFile/friendLink'],resolve),
    meta : {
      name : '友情链接'
    },
    children : [
      {
        path : '/home/frenid/sale',
        name : '',
        component : resolve => require(['./sonView/friendLink/friend_sale'],resolve),
        meta : {
          name : '出售房源'
        }
      },
      {
        path : '/home/frenid/rent',
        name : '',
        component : resolve => require(['./sonView/friendLink/friend_rent'],resolve),
        meta : {
          name : '出租房源'
        }
      }
    ]
  }
];

let aa = cc(initRouter,routerArr);
function cc(router1,router2){
  let arr = [];
  router1.forEach((item1,index1) => {
    router2.forEach((item2,index2)=>{
      if(item1.meta.name == item2.name){
        if(index1 == 0){
          let obj = {
             path : ''
          }
        }
        arr.push(item1);
        if(item2.children.length > 0) {
          let childArr = cc(item1.children,item2.children);
          item1.children = childArr;
        }
      }
    })
  });
  return arr;
}


let router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:[
    {
      path: '/home',
      name: 'home',
      component: Home,
      children : initRouter
    },
    {
      path: '/login',
      name: 'login',
      meta : {
        role :  ['a','b','c'],
      },
      component: (resolve) => require(['./views/Login.vue'],resolve)
    },
    {
      path : '/',
      redirect : '/home',
      meta : {
        role :  ['a','b','c'],
      },
    }
  ],
});


/* 定义一个真正需要的路由 */
// let newRouterArr = [];
// let newRouter = initRouterFn(initRouter)
// function initRouterFn(routerArr){
//   return routerArr.filter(item =>{
//     let isRouter = store.getters.getRoles.some(role =>{
//       return item.meta.role.indexOf(role) != -1
//     });
//     if(isRouter){
//       newRouterArr.push(isRouter);

//     }
//     return isRouter
//   });
// }


// console.log(newRouter)






/* 路由守卫 */
router.beforeEach((to,from,next)=>{
  if(to.path == '/login'){
    next()
  }else{
    let token = localStorage.getItem('zfToken');
    if(token && token != ''){
      next()
    }else{
      next('./login')
    }
  }
});
export default router