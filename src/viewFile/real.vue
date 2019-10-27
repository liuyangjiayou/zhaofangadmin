<template>
  <div class="wrap-box">
    <!-- 物业管理 -->
    <SonMenu class="SonMenu" :title="router.meta.name" :route="router.children"></SonMenu>
    <Wrap>
      <router-view></router-view>
    </Wrap>
  </div>
</template>

<script>
    import SonMenu from '../components/sonMenu';
    import Wrap from '../components/wrap';
    import { mapActions, mapState } from 'vuex'
  export default {
    name:'',
    props:[''],
    data () {
      return {
        router : [],
      };
    },

    components: {
        SonMenu,
        Wrap
    },

    computed: {
      ...mapState({
        newRouter : state => state.newRouter
      })
    },

    beforeMount() {},
    created(){
      this.router = this.newRouter.filter(item => {
        return item.meta.name == this.$route.query.title
      })[0];
    },
    mounted() {
      
  
    },

    methods: {},

    watch: {}

  }

</script>
<style lang='scss' scoped>
.wrap-box{
    display: flex;
    align-items: top;
    height: 100%;
}
</style>