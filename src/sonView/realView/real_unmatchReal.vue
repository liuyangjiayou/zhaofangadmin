<template>
  <div>
    <TableTitle title="未匹配物业"></TableTitle>
    <TableSreach :sreachSelectObj="sreachSelectObj"></TableSreach>
    <div>
        <el-table 
        style="width: 100%"
        size="mini"
        height="566"
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
          label="编号">
            <template slot-scope="scope">
              <span>{{ scope.row.number }}</span>
            </template>
          </el-table-column>
          <el-table-column 
          label="小区名称">
              <template slot-scope="scope">
                <span>{{ scope.row.house_name }}</span>
              </template>
          </el-table-column>
          <el-table-column 
          label="所在地址">
              <template slot-scope="scope">
                <span>{{ scope.row.house_address }}</span>
              </template>
          </el-table-column>
          <el-table-column 
          width="270"
          label="小区坐标">
              <template slot-scope="scope">
                <span>{{ scope.row.point.lng }},{{ scope.row.point.lat }}</span> | 
                <el-button type="text" @click="innerVisible=true">修正</el-button>
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
                  <el-button type="text" @click="dialogFormVisible=true">编辑</el-button>
                  <el-button type="text" @click="tabelConfirm({id : scope.row.number})">合并</el-button>
                  <el-button type="text" @click="tabelConfirm({id : scope.row.number})">删除</el-button>
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
    <!-- 编辑的弹窗 -->
      <el-dialog title="编辑无效物业" :visible.sync="dialogFormVisible" width="500px">
        <el-form ref="form" :model="editFormData" :rules="rules" size="small">
          <el-form-item label="物业名称" label-width="90px" prop="name">
            <el-input v-model="editFormData.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="行政区域" label-width="90px" prop="region">
            <el-select v-model="editFormData.region" placeholder="请选择行政区域">
              <el-option v-for="item in regionOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属商圈" label-width="90px" prop="area">
            <el-select v-model="editFormData.area" multiple collapse-tags placeholder="请选择所属商圈">
              <el-option v-for="item in areaOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="小区地址" label-width="90px" prop="address">
            <el-input v-model="editFormData.address" placeholder="请填写小区地址" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="小区坐标" label-width="90px" prop="point">
            <el-input v-model="pointString" disabled placeholder="请填写小区地址" autocomplete="off">
              <el-button type="primary" plain slot="append" @click="innerVisible=true">选择坐标</el-button>
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible=false" size="mini">取 消</el-button>
          <el-button type="primary" @click="submitForm('form')" size="mini">提交</el-button>
        </div>
      </el-dialog>
      <!-- 地图的弹窗 -->
      <el-dialog
        width="750px"
        height="440px"
        title="选择坐标"
        :visible.sync="innerVisible"
        append-to-body>
        <div class="mapBox">
          <BaiduMap :center.sync="map.center" :zoom.sync="map.zoom" :point.sync="editFormData.point"></BaiduMap>
        </div>
        <div slot="footer">
          <el-button @click="innerVisible=false" size="mini">取消</el-button>
          <el-button type="primary" @click="innerVisible=false" size="mini">确定</el-button>
        </div>
      </el-dialog>
      <!-- 修正地图的弹窗 -->
      <el-dialog
        width="750px"
        height="440px"
        title="选择坐标"
        :visible.sync="innerVisible"
        append-to-body>
        <div class="mapBox">
          <BaiduMap :center.sync="map.center" :zoom.sync="map.zoom" :point.sync="editFormData.point"></BaiduMap>
        </div>
        <div slot="footer">
          <el-button @click="innerVisible=false" size="mini">取消</el-button>
          <el-button type="primary" @click="innerVisible=false" size="mini">确定</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
  import TableTitle from '../../components/TableTitle';
  import TableSreach from '../../components/TableSreach';
  import BaiduMap from '../../components/BaiduMap';
  import {bable_fun} from '../../mixins/tableMixin'
  export default {
    name:'mergeRecord',
    props:[''],
    mixins : [bable_fun],
    data () {
      return {
        /* 选取坐标 */
        map : {
          center : {
            lng : 114.485278,
            lat : 38.054584,
          },
          zoom : 15
        },
        editFormData : {
          name : '123',
          region : '2',
          area : ['1'],
          address : '',
          point : {
            lng : 114.485278,
            lat : 38.054584,
          },
        },  
        rules: {
          name: [
            { required: true, message: '请输入物业名称', trigger: 'blur' },
          ],
          region: [
            { required: true, message: '请选择行政区域', trigger: 'change' }
          ],
          area: [
            { required: true, message: '请选择所属商圈', trigger: 'change' }
          ],
          address: [
            { required: true, message: '请填写小区地址', trigger: 'blur' }
          ],
          point: [
            { required: true, message: '请选择一个坐标', trigger: 'blur' }
          ]
        },
        regionOptions : [
          {value : '1',label : '新华'},
          {value : '2',label : '裕华'},
          {value : '3',label : '桥东'},
          {value : '4',label : '桥西'},
          {value : '5',label : '桥南'},
        ],
        areaOptions : [
          {value : '1',label : '众美'},
          {value : '2',label : '新百'},
          {value : '3',label : '大马村'},
          {value : '4',label : '世纪公园'},
          {value : '5',label : '位同'},
        ],
        dialogFormVisible : false,//控制编辑框的显隐
        innerVisible : false,
        loading : false,
        currentPage3: 5,
        sreachSelectObj : {
          id : '2',
          options : [
            {
              value: '1',
              label: '小区名称'
            },
            {
              value: '2',
              label: '物业编号'
            }
          ],
          keyWord : '',
        },
        tableData: [{
          number: '1',
          house_name: '测试楼盘新华区',
          house_address: '北国益庄店和双环汽贸中间',
          point : {
            lat : '38.1172186405',
            lng : '38.1172186405',
          },
          date : '2018-09-30 14:16',
        },{
          number: '2',
          house_name: '测试楼盘新华区',
          house_address: '北国益庄店和双环汽贸中间',
          point : {
            lat : '38.1172186405',
            lng : '38.1172186405',
          },
          date : '2018-09-30 14:16',
        },{
          number: '3',
          house_name: '测试楼盘新华区',
          house_address: '北国益庄店和双环汽贸中间',
          point : {
            lat : '38.1172186405',
            lng : '38.1172186405',
          },
          date : '2018-09-30 14:16',
        }, {
          number: '4',
          house_name: '测试楼盘新华区',
          house_address: '北国益庄店和双环汽贸中间',
          point : {
            lat : '38.1172186405',
            lng : '38.1172186405',
          },
          date : '2018-09-30 14:16',
        }, {
          number: '5',
          house_name: '测试楼盘新华区',
          house_address: '北国益庄店和双环汽贸中间',
          point : {
            lat : '38.1172186405',
            lng : '38.1172186405',
          },
          date : '2018-09-30 14:16',
        }, {
          number: '6',
          house_name: '测试楼盘新华区',
          house_address: '北国益庄店和双环汽贸中间',
          point : {
            lat : '38.1172186405',
            lng : '38.1172186405',
          },
          date : '2018-09-30 14:16',
        }, {
          number: '7',
          house_name: '测试楼盘新华区',
          house_address: '北国益庄店和双环汽贸中间',
          point : {
            lat : '38.1172186405',
            lng : '38.1172186405',
          },
          date : '2018-09-30 14:16',
        },{
          number: '8',
          house_name: '测试楼盘新华区',
          house_address: '北国益庄店和双环汽贸中间',
          point : {
            lat : '38.1172186405',
            lng : '38.1172186405',
          },
          date : '2018-09-30 14:16',
        }, {
          number: '9',
          house_name: '测试楼盘新华区',
          house_address: '北国益庄店和双环汽贸中间',
          point : {
            lat : '38.1172186405',
            lng : '38.1172186405',
          },
          date : '2018-09-30 14:16',
        }, {
          number: '10',
          house_name: '测试楼盘新华区',
          house_address: '北国益庄店和双环汽贸中间',
          point : {
            lat : '38.1172186405',
            lng : '38.1172186405',
          },
          date : '2018-09-30 14:16',
        }]
      };
    },

    components: {
      TableTitle,
      TableSreach,
      BaiduMap
    },

    computed: {
      pointString(){
        return this.editFormData.point.lng + ',' + this.editFormData.point.lat;
      }
    },

    beforeMount() {},

    mounted() {},

    methods: {
      /* 编辑无效物业 */
      edit(){

      },
      handleSizeChange(){},
      handleCurrentChange(){},
      /* 重置表单 */
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
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
.mapBox{
  width: 100%;
  min-height: 540px;
  .bm-view{
    width: 100%;
    height: 540px;
  }
}
</style>