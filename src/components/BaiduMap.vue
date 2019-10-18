<template>
    <baidu-map
        :center="center" 
        :zoom="zoom"
        @ready="handler"
        @click="setPonit"
        class="bm-view">
        <bm-marker :position="point"></bm-marker>
    </baidu-map>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
  export default {
    name:'',
    props: {
        point : {
            type : Object,
        },
        center : {
            type : Object,
        },
        zoom : {
            type : Number,
            default : 14
        }
    },
    data () {
      return {
      };
    },

    components: {
        BaiduMap,
    },

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {
        handler(opts){
            console.log(opts.map);
        },
        setPonit(opts){
            this.$emit('update:point',opts.point);
        }
    },

    watch: {}

  }

</script>
<style lang='scss' scoped>
.bm-view {
  width: 100%;
  height: 100%;
}
</style>