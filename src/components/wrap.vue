<template>
  <div class="wrap">
    <div class="son-wrap">
      <slot></slot>
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
.wrap{
    padding: 14px;
    min-width: 990px;
    width: 100%;
    height : 100%;
    .son-wrap{
      position : relative;
      padding-top : 106px;
      width : 100%;
      height : 100%;
    }
}
</style>