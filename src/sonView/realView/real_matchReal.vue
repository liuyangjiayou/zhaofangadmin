<template>
  <div>
    <TableTitle title="已匹配物业"></TableTitle>
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
           width="55"
          label="序号">
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
          label="小区地址">
              <template slot-scope="scope">
                <span>{{ scope.row.house_address }}</span>
              </template>
          </el-table-column>
          <el-table-column
          label="小区坐标">
              <template slot-scope="scope">
                <span>{{ scope.row.point.lng }},{{ scope.row.point.lat }}</span> | 
                <el-button type="text" @click="innerVisible=true">修正</el-button>
              </template>
          </el-table-column>
          <el-table-column 
          width="80px"
          label="小区相册">
              <template>
                <el-button type="text" @click="dialogImagVisible = true">[0]</el-button>
              </template>
          </el-table-column>
          <el-table-column 
          label="添加账号">
              <template slot-scope="scope">
                <span>{{ scope.row.date }}</span>
              </template>
          </el-table-column>
          <el-table-column 
          label="添加时间">
              <template slot-scope="scope">
                <span>{{ scope.row.date }}</span>
              </template>
          </el-table-column>
          <el-table-column 
          prop="state"
          :filters = "[{text : '正常',value : '正常'},{text : '锁定',value : '锁定'}]"
          :filter-method = "filterTag"
          filter-placement= "bottom"
          label="状态">
              <template slot-scope="scope">
                <el-tag :type="scope.row.state === '正常' ? 'primary' : 'success'">{{scope.row.state}}</el-tag>
              </template>
          </el-table-column>
          <el-table-column 
          width="150"
          label="操作">
              <template slot-scope="scope">
                  <el-button type="text" @click="dialogFormVisible=true">编辑</el-button>
                  <el-button type="text" @click="tabelConfirm({id : scope.row.number})">锁定</el-button>
                  <el-button type="text" @click="tabelConfirm({id : scope.row.number})">删除</el-button>
              </template>
          </el-table-column>
        </el-table>
    </div>
    <div class="page-box">
      <div></div>
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
      <el-dialog title="编辑小区" :visible.sync="dialogFormVisible" width="500px" height="560px">
        <el-form ref="form" :model="editFormData" :rules="rules" size="small">
          <el-form-item label="小区名称：" label-width="100px" prop="name">
            <el-input v-model="editFormData.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="所在区域：" label-width="100px" prop="region">
            <el-select v-model="editFormData.region" placeholder="请选择行政区域">
              <el-option v-for="item in regionOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属商圈：" label-width="100px" prop="area">
            <el-select v-model="editFormData.area" multiple collapse-tags placeholder="请选择所属商圈">
              <el-option v-for="item in areaOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="周边地铁：" label-width="100px" prop="area">
            <el-row>
              <el-col :span="11">
                <el-select v-model="editFormData.subway_line" collapse-tags placeholder="请选择地铁线路">
                  <el-option v-for="item in subwayOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-col>
              <el-col :span="11" style="margin-left: 5px;">
                <el-select v-model="editFormData.subway_dot" collapse-tags placeholder="请选择地铁站">
                  <el-option v-for="item in subwayDotOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="小区地址：" label-width="100px" prop="address">
            <el-input v-model="editFormData.address" placeholder="请填写小区地址" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="开发商：" label-width="100px" prop="address">
            <el-input v-model="editFormData.developers" placeholder="请填写开发商" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="物业公司：" label-width="100px" prop="address">
            <el-input v-model="editFormData.real" placeholder="请填写物业公司" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="物业费：" label-width="100px" prop="address">
            <el-row>
              <el-col :span="10"><el-input v-model="editFormData.real_price" placeholder="请填写物业费" autocomplete="off"></el-input></el-col>
              <el-col :span="10">单位（元㎡/月）</el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="建筑年代：" label-width="100px" prop="address">
            <el-input v-model="editFormData.arc_year" placeholder="请填写建筑年代" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="楼栋总数：" label-width="100px" prop="address">
            <el-input v-model="editFormData.build_num" placeholder="请填写楼栋总数" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="建筑类型：" label-width="100px" prop="address">
            <el-radio-group v-model="editFormData.arc_type">
              <el-radio :label="3">塔楼</el-radio>
              <el-radio :label="6">板楼</el-radio>
              <el-radio :label="9">塔板结合</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="房屋总数：" label-width="100px" prop="address">
            <el-input v-model="editFormData.house_num" placeholder="请填写房屋总数" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible=false" size="mini">取 消</el-button>
          <el-button type="primary" @click="submitForm('form')" size="mini">提交</el-button>
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
      <!-- 上传相册 -->
      <el-dialog
        width="750px"
        :visible.sync="dialogImagVisible"
        title="上传图片">
        <el-upload
          action="#"
          list-type="picture-card"
          :auto-upload="false">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url" alt=""
              >
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleDownload(file)"
                >
                  <i class="el-icon-download"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
        </el-upload>
        <div slot="footer">
          <el-button @click="dialogImagVisible=false" type="paimary" size="mini">提交</el-button>
          <el-button @click="dialogImagVisible=false" size="mini">取消</el-button>
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
        /* 上传相册 */
        dialogImageUrl: '',
        dialogImagVisible: false,
        disabled: false,

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
          subway_line : 1,
          subway_dot : 2,
          address : '我是一个小区地址',
          developers : '我是一个开放商',
          real : '我是一个物业公司',
          real_price : '我是物业费',
          arc_year : '建筑年代',
          build_num : '楼栋总数',
          arc_type: 3,
          house_num : 10,
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
        subwayDotOptions : [
          {value : 1,label : '新百站'},
          {value : 2,label : '北国商城'},
          {value : 3,label : '南三条'},
          {value : 4,label : '万象城'},
          {value : 5,label : '乐汇城'},
          {value : 6,label : '勒泰'},
          {value : 7,label : '东购'},
        ],
        subwayOptions : [
          {value : 1,label : '地铁一号线'},
          {value : 2,label : '地铁二号线'},
          {value : 3,label : '地铁三号线'},
          {value : 4,label : '地铁四号线'},
          {value : 5,label : '地铁五号线'},
          {value : 6,label : '地铁六号线'},
          {value : 7,label : '地铁七号线'},
        ],
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
          keyWord : '',
          placeholder : '小区名称'
        },
        tableData: [{
          number: '1',
          house_name: '测试楼盘新华区',
          house_address: '北国益庄店和双环汽贸中间',
          point : {
            lat : '38.1172186405',
            lng : '38.1172186405',
          },
          user : 'asdmin',
          date : '2018-09-30 14:16',
          state : '正常',
        },{
          number: '1',
          house_name: '测试楼盘新华区',
          house_address: '北国益庄店和双环汽贸中间',
          point : {
            lat : '38.1172186405',
            lng : '38.1172186405',
          },
          user : 'asdmin',
          date : '2018-09-30 14:16',
          state : '锁定',
        },{
          number: '1',
          house_name: '测试楼盘新华区',
          house_address: '北国益庄店和双环汽贸中间',
          point : {
            lat : '38.1172186405',
            lng : '38.1172186405',
          },
          user : 'asdmin',
          date : '2018-09-30 14:16',
          state : '正常',
        }, {
          number: '1',
          house_name: '测试楼盘新华区',
          house_address: '北国益庄店和双环汽贸中间',
          point : {
            lat : '38.1172186405',
            lng : '38.1172186405',
          },
          user : 'asdmin',
          date : '2018-09-30 14:16',
          state : '锁定',
        }, {
          number: '1',
          house_name: '测试楼盘新华区',
          house_address: '北国益庄店和双环汽贸中间',
          point : {
            lat : '38.1172186405',
            lng : '38.1172186405',
          },
          user : 'asdmin',
          date : '2018-09-30 14:16',
          state : '正常',
        }, {
          number: '1',
          house_name: '测试楼盘新华区',
          house_address: '北国益庄店和双环汽贸中间',
          point : {
            lat : '38.1172186405',
            lng : '38.1172186405',
          },
          user : 'asdmin',
          date : '2018-09-30 14:16',
          state : '锁定',
        }, {
          number: '1',
          house_name: '测试楼盘新华区',
          house_address: '北国益庄店和双环汽贸中间',
          point : {
            lat : '38.1172186405',
            lng : '38.1172186405',
          },
          user : 'asdmin',
          date : '2018-09-30 14:16',
          state : '正常',
        },{
          number: '1',
          house_name: '测试楼盘新华区',
          house_address: '北国益庄店和双环汽贸中间',
          point : {
            lat : '38.1172186405',
            lng : '38.1172186405',
          },
          user : 'asdmin',
          date : '2018-09-30 14:16',
          state : '锁定',
        }, {
          number: '1',
          house_name: '测试楼盘新华区',
          house_address: '北国益庄店和双环汽贸中间',
          point : {
            lat : '38.1172186405',
            lng : '38.1172186405',
          },
          user : 'asdmin',
          date : '2018-09-30 14:16',
          state : '正常',
        }, {
          number: '1',
          house_name: '测试楼盘新华区',
          house_address: '北国益庄店和双环汽贸中间',
          point : {
            lat : '38.1172186405',
            lng : '38.1172186405',
          },
          user : 'asdmin',
          date : '2018-09-30 14:16',
          state : '锁定',
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
      /* 过滤标签 */
      filterTag(value, row) {
        console.log(value,row);
        return row.state === value;
      },
      /* 上传相册 */
      handleRemove(file) {
        console.log(file);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleDownload(file) {
        console.log(file);
      },
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