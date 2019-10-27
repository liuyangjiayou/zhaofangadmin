
<template>
  <div class="content">
    <div class="header-box">
        <div>石家庄</div>
        <div class="right">
          <div>站内信</div>
          <div>操作日志</div>
          <div>城市设置</div>
        </div>
    </div>
    <div class="menu-box">
      <div class="header">找房网</div>
      <el-menu
        class="el-menu"
        background-color="#0f1625"
        text-color="#fff"
        border-color="#0f1625"
        :default-active="$route.path"
      >
          <el-menu-item v-for="(item,i) in roter" :key="i">
            <router-link :key="i" :to="{path : item.path,query : {title : item.meta.name}}">{{item.meta.name}}</router-link>
          </el-menu-item>
          <!-- <el-menu-item index="/home/real">物业管理</el-menu-item>
          <el-menu-item index="/home/adver">广告管理</el-menu-item>
          <el-menu-item index="/home/consult">咨讯管理</el-menu-item>
          <el-menu-item index="/home/decoration">家装管理</el-menu-item>
          <el-menu-item index="/home/entrust">业主委托</el-menu-item>
          <el-menu-item index="/home/agent">经纪人管理</el-menu-item>
          <el-menu-item index="/home/newhouse">新房管理</el-menu-item>
          <el-menu-item index="/home/house">房源管理</el-menu-item>
          <el-menu-item index="/home/houseStore">房源库</el-menu-item>
          <el-menu-item index="/home/frenid">友情链接</el-menu-item> -->
        </el-menu>
      <div class="footer">
        <span>找房子就上找房网</span>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import { post } from '../api/api';
  import { mapState }  from 'vuex'
import { stat } from 'fs';
  export default {
    name:'',
    props:[''],
    data () {
      return {
      };
    },

    components: {
    },

    computed: {
      ...mapState({
        roter : state => state.newRouter
      })
    },

    beforeMount() {},
    created(){
     
    },
    mounted() {
      this.getData();
    },
    methods: {
      getData(){
        post('/api/area/getData').then((res)=>{
          // console.log(res)
        })
      }
    },

    watch: {}

  }

</script>
<style lang="scss" scoped>
/* 总体样式 */
.content{
  position: relative;
  padding: 56px 0 0 180px;
  width: 100%;
  height: 100%;
}
.menu-box{
  position: absolute;
  top: 0;
  left: 0;
  padding: 56px 0;
  width: 180px;
  height: 100%;
  background: #0f1625;
  .el-menu{
    max-height: 100%;
    overflow: auto;
    li{
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
.header,.footer{
  position: absolute;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 56px;
}
.header{
  top: 0;
  left: 0;
}
.footer{
  bottom: 0;
  left: 0;
}
/* 头部样式 */
.header-box{
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 180px;
  width: 100%;
  height: 56px;
  background: #fff;
  .right{
    display: flex;
    align-items: center;
  }
}
</style>
