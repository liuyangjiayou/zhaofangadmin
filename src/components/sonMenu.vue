<template>
<!-- 我是二级导航组件 -->
  <div class="warp">
    <p class="title">物业管理</p>
    <div class="">
      <el-menu
        :router="true"
        :default-active="$route.path"
      >
          <el-menu-item index="/home/real/mergeRecord">合并记录</el-menu-item>
          <el-menu-item index="/home/real/unmatchReal">未匹配物业</el-menu-item>
          <el-menu-item index="/home/real/matchReal">已匹配物业</el-menu-item>
      </el-menu>
    </div>
</div>
</template>

<script>

  export default {
    name:'',
    props:[''],
    data () {
      return {

      };
    },

    components: {},

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {},

    watch: {}

  }

</script>
<style lang='scss' scoped>
.warp{
    position: relative;
    padding-top: 50px;
    height: 100%;
    background: #fff;
    .title{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      line-height: 50px;
      padding-left: 20px;
      font-size: 16px;
    }
}
.warp ul{
    width: 160px;
    max-height: 100%;
    overflow: auto;
    border: none;
    li{
      padding-left: 20px;
      line-height: 40px;
      height: 40px;
      cursor: pointer;
    }
}
.exact-active-class{
  box-sizing: border-box;
  border-left: 4px solid #108cee;
}

</style>