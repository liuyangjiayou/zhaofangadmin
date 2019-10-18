<template>
  <div class="sreach-box">
      <div>1</div>
      <div class="form-box">
        <el-input :placeholder="placeholder" size="small" v-model="sreachSelectObj.keyWord">
          <el-select v-if="sreachSelectObj.options" class="select-box" v-model="sreachSelectObj.id" slot="prepend" placeholder="请选择">
            <el-option v-for="item in sreachSelectObj.options" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
          <el-button class="btn" @click="sub('ruleForm')" slot="append" icon="el-icon-search"></el-button>
        </el-input>

        <el-button class="btn" style="margin-left: 8px" @click="reset" size="small" icon="el-icon-refresh-left"></el-button>
      </div>

      <!-- <div class="form-box">
          <el-select
            v-model="sreachSelectObj.id"
            size="small"
            class="sreach-select">
            <el-option class="sreach-select" v-for="item in sreachSelectObj.options" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
          <el-input
            size="small"
            v-model="sreachSelectObj.keyWord"
            :placeholder="placeholder">
          </el-input>
         
      </div> -->
  </div>
</template>

<script>
  
  export default {
    name:'',
    props:{
      sreachSelectObj : '',
    },
    data () {
      return {
          
      };
    },

    components: {},

    computed: {
      placeholder(){
        if(this.sreachSelectObj.options){
          return '请输入' + this.sreachSelectObj.options.find(item =>{ 
            return item.value == this.sreachSelectObj.id
          }).label + '进行搜索'
        }else{
          return '请输入' + this.sreachSelectObj.placeholder + '进行搜索'
        }
      }
    },

    beforeMount() {},

    mounted() {
     
    },

    methods: {
      sub(formName){
        if(!this.sreachSelectObj.keyWord){
           this.$message({
            message: '搜索条件不能为空',
            type: 'warning'
          });
          return false;
        }     
        console.log('这是检测通过');   
      },
      reset(){
        window.location.reload();
      }
    },

    watch: {}

  }

</script>
<style lang='scss' scoped>
.sreach-box{    
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    min-height: 56px;
    background: #fff;
    .form-box{
      display: flex;
      align-items: center;
    }
}
.select-box{
  min-width: 114px;
  font-size: 12px;
}
.btn{
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 0;
  width: 37px;
  height: 30px;
}
</style>