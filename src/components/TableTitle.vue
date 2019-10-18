<template>
  <div class="title">
      <span>{{title}}</span>
  </div>
</template>

<script>

  export default {
    name:'',
    props: {
        title : {
            default : '标题',
            type : String,
        }
    },
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
.title{
    display: flex;
    align-items: center;
    padding-left: 19px;
    height: 50px;
    border-bottom: 1px solid #e6e6e6;
    background: #fff;
    span:nth-child(1){
      font-size: 16px;
      color: #5e5e5e;
      font-weight: 900;
    }
}
</style>