<template>
  <div class="wrap-box">
    <!-- 物业管理 -->
    <SonMenu class="SonMenu"></SonMenu>
    <Wrap>
      <router-view></router-view>
    </Wrap>
  </div>
</template>

<script>
    import SonMenu from '../components/sonMenu';
    import Wrap from '../components/wrap';
  export default {
    name:'',
    props:[''],
    data () {
      return {

      };
    },

    components: {
        SonMenu,
        Wrap
    },

    computed: {},

    beforeMount() {},

    mounted() {},

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