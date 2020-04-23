<template>
  <Modal
  title='区域管理员维护'
  :width="1000"
  :value="value"
  @on-visible-change="visibleChange">
    <div style="padding:0 50px 0 50px">
      <Form ref="queryForm" :label-width="80" label-position="right" inline>
        <Row :gutter="20">
          <Col span="6">
              <FormItem label="区域" style="width:100%">
                <h3>{{location.areaName}}</h3>
              </FormItem>
          </Col>
          <col span="6">
            <Button @click="create" icon="android-add" type="primary" style="margin-left:20px">新增</Button>
          </col>
        </Row>
        <Row :gutter="20">
          <Col span="4">
            <h3>资料笔数：{{totalCount}}笔</h3>
          </Col>
          <Col span="20">
            <Checkbox v-model="stopCheck" @on-change="getpage">停用不显示</Checkbox>
          </Col>
        </Row>
      </Form>
      <div class="margin-top-10">
        <Table :loading="loading" :columns="columns" border :data="list"></Table>
        <Page  show-sizer class-name="fengpage" :total="totalCount" class="margin-top-10" @on-change="pageChange" @on-page-size-change="pagesizeChange" :page-size="pageSize" :current="currentPage"></Page>
      </div>
    </div>
    <div slot="footer">
    </div>
    <create-admin v-model="createModalShow" @save-success="getpage"></create-admin>
  </Modal>
</template>

<script lang="ts">
import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
import Util from '@/lib/util'
import AbpBase from '@/lib/abpbase'
import PageRequest from '@/store/entities/page-request'
import publicclass from '@/lib/publicclass'
import Location from '@/store/entities/vehicleScheduling/location'
import LocationManager from '@/store/entities/vehicleScheduling/locationManager'
import VEmp from '@/store/entities/public/vEmp'
import CreateAdmin from './create-admin.vue'

class PageAdminWarehouseAreaRequest extends PageRequest{
  areaID:Number=null;
  isStop:Number=null;
}
class PageVEmpRequest extends PageRequest{
}

@Component({components:{CreateAdmin}})
export default class AdminWarehouseArea extends AbpBase{
  @Prop({type:Boolean,default:false}) value:Boolean;
  pagerequest:PageAdminWarehouseAreaRequest=new PageAdminWarehouseAreaRequest();
  vEmpPagerequest:PageVEmpRequest=new PageVEmpRequest();
  stopCheck:Boolean=false;
  createModalShow:Boolean=false;
  location:Location=new Location();
  locationManager:LocationManager=new LocationManager();
  columns=[
    {
      title:'管理员单位',
      align: 'center',
      render: (h:any, params:any) => {
        var user = (this.userList as Array<VEmp>).find(x=>x.userAuto.toString()===params.row.empID)
        return h('span',!!user?user.depName:'')
      }
    },
    {
      title:'管理员',
      align: 'center',
      render: (h:any, params:any) => {
        var user = (this.userList as Array<VEmp>).find(x=>x.userAuto.toString()===params.row.empID)
        return h('span',!!user?user.fName:'')
      }
    },
    {
      title:'停/启用',
      width:150,
      align: 'center',
      render: (h:any, params:any) => {
        return h('i-switch',{
            props: {//这里可以设置它的属性
                value: params.row.isStop === 1,     //设置它的值比如：true或false
                //disabled: !params.row.online     // 设置是否可以操作，变灰
            },
            on: { //操作事件
                'on-change': async (value)=>{ //值发生了改变调用方法
                    this.locationManager = Util.extend(true,{},params.row)
                    this.locationManager.location = null
                    this.locationManager.isStop=value? 1 : 0;
                    await this.$store.dispatch({
                        type:'locationManager/update',
                        data:this.locationManager
                    });
                    this.getpage()
                }
            }
        })
      }
    }
  ]
//页码
  pageChange(page:number){
      this.$store.commit('locationManager/setCurrentPage',page);
      this.getpage();
  }
  pagesizeChange(pagesize:number){
      this.$store.commit('locationManager/setPageSize',pagesize);
      this.getpage();
  }
  async getpage(){
      this.pagerequest.maxResultCount=this.pageSize;
      this.pagerequest.skipCount=(this.currentPage-1)*this.pageSize;
      this.pagerequest.isStop=this.stopCheck?1:null;
      this.pagerequest.areaID=this.location.id;
      await this.$store.dispatch({
          type:'locationManager/getAll',
          data:this.pagerequest
      })

      this.vEmpPagerequest.skipCount=0;
      this.vEmpPagerequest.maxResultCount=10000;
      await this.$store.dispatch({
          type:'vEmp/getAll',
          data:this.vEmpPagerequest
      })
  }
  get pageSize(){
      return this.$store.state.locationManager.pageSize;
  }
  get totalCount(){
      return this.$store.state.locationManager.totalCount;
  }
  get currentPage(){
      return this.$store.state.locationManager.currentPage;
  }
  get list(){
      return this.$store.state.locationManager.list;
  }
  get userList(){
      return this.$store.state.vEmp.list;
  }
  get loading(){
      return this.$store.state.locationManager.loading;
  }
  create(){
    this.createModalShow=true;
  }
  visibleChange(value:boolean){
    if(!value){
        this.$emit('input',value);
    }else{
        this.location=Util.extend(true,{},this.$store.state.location.editLocation);
        this.getpage();
    }
  }
}
</script>