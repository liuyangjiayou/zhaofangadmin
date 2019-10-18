<template>
  <div class="content">
    我是首页
    <el-button type="success" @click="test">点击我请求</el-button>
  </div>
</template>

<script>
  import { post } from '../api/api'
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

    methods: {
      test(){
        post('/api/area/getData').then((res)=>{
         
        });
      }
    },

    watch: {}

  }

</script>
<style lang='scss' scoped>
    .content{
        padding: 14px;
    }
</style>