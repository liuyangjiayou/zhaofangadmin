<template>
  <div>
    <TableTitle title="合并记录"></TableTitle>
    <TableSreach :sreachSelectObj="sreachSelectObj"></TableSreach>
    <div>
        <el-table 
        style="width: 100%"
        size="mini"
        :height="tableHieght"
        ref="table"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(f, f, f, 0.5)"
        :data="tableData">
          <el-table-column 
          width="50"
          type="selection">
          </el-table-column>
          <el-table-column 
           width="55"
          type="index"
          label="编号">
          </el-table-column>
          <el-table-column 
          label="合并前名称">
              <template slot-scope="scope">
                <span>{{ scope.row.mergeBefore }}</span>
              </template>
          </el-table-column>
          <el-table-column 
          label="合并后名称">
              <template slot-scope="scope">
                <span>{{ scope.row.mergeLater }}</span>
              </template>
          </el-table-column>
          <el-table-column 
          label="添加时间">
              <template slot-scope="scope">
                <span>{{ scope.row.date }}</span>
              </template>
          </el-table-column>
          <el-table-column 
          width="150"
          label="操作">
              <template slot-scope="scope">
                  <el-button type="text" @click="del({id : scope.row.number,title : scope.row.mergeBefore})">删除</el-button>
                  <el-button type="text" @click="tabelConfirm({id : scope.row.number,msg : '确定要还原这一项吗？',title : '还原'})">还原</el-button>
              </template>
          </el-table-column>
        </el-table>
    </div>
    <div class="page-box">
      <div>
        <el-button type="danger" size="mini">
          删除全部
        </el-button>
      </div>
      <div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage3"
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="1000">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import {bable_fun} from '../../mixins/tableMixin';
  import TableTitle from '../../components/TableTitle';
  import TableSreach from '../../components/TableSreach';
  import {post} from '../../api/api'
  export default {
    name:'mergeRecord',
    props:[''],
    mixins : [bable_fun],
    data () {
      return {
        sreachSelectObj : {
          id : '2',
          options : [
            {
              value: '1',
              label: '合并前名称'
            },
            {
              value: '2',
              label: '房源编号'
            }
          ],
          keyWord : '',
        },
        currentPage3: 5,
        selectID : '1',
        options: [{
            value: '1',
            label: '合并前名称'
          },{
            value : '2',
            label : '房源编号'
          }],
        placeholder: '请输入',
        formData : {
            sreach: '合并前名称',
            keyWord : '',
        },
       tableData: [],
      };
    },

    components: {
      TableTitle,
      TableSreach,
    },

    computed: {
      loading(){
        console.log(this.tableData);
        return this.tableData.length > 0 ? false : true
      }
    },

    beforeMount() {},

    mounted() {
      this.getData();
    },

    methods: {
      del(opts){
        this.$confirm(`你确定要删除${opts.title}吗？`,'删除',{
          confirmButtonText : '确定',
          cancelButtonText : '取消',
          type : 'warning'
        }).then(()=>{
            post('/api/real/removeMergeRecordList',{id : opts.id}).then(res=>{
              this.$message({
                type : res.code == 1 ? 'success' : 'error',
                message : res.msg,
                onClose : ()=>{
                  this.getData();
                }
              })
            });
        }).catch(()=>{

        })
        
      },
      getData(){
        post('/api/real/mergeRecordList').then(res=>{
          if(res.code == 1){
            console.log(res.data);
            this.tableData = res.data.list
          }
        })
      },
      handleSizeChange(){},
      handleCurrentChange(){}
    },

    watch: {}

  }

</script>
<style lang='scss' scoped>
.page-box{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 19px 20px;
  border-top: 1px solid #ebebeb;
  background: #fff;
}
</style>