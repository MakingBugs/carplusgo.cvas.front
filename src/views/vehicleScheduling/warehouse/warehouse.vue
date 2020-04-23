<template>
    <div>
        <Card dis-hover>
            <div class="page-body">
                <Form ref="searchForm" :label-width="80" label-position="right" inline>
                    <Row :gutter="20">
                        <Col span="6">
                          <FormItem label="区域" style="width:100%">
                            <Select v-model="pagerequest.areaID" clearable>
                              <Option v-for="item in areaList" :value="item.id" :key="item.id">{{ item.areaName }}</Option>
                            </Select>
                          </FormItem>
                        </Col> 
                        <Col span="6">
                          <FormItem label="仓库类型" style="width:100%">
                            <Select v-model="pagerequest.repositoryType" clearable>
                                <Option :value=1>调度</Option>
                                <Option :value=2>网约车</Option>
                                <Option :value=3>专车</Option>
                                <Option :value=4>处分</Option>
                            </Select>
                          </FormItem>
                        </Col> 
                        <Col span="6">
                          <FormItem label="仓库名称" style="width:100%">
                            <Input v-model="pagerequest.repositoryName" placeholder="请输入仓库名称"/>
                          </FormItem>
                        </Col>
                        <col span="6">
                          <Button icon="ios-search" type="primary" size="large" @click="getpage" class="toolbar-btn">查找</Button>&nbsp;&nbsp;
                          <Button @click="create" icon="android-add" type="primary" size="large">新增</Button>
                        </col>
                    </Row>
                    <Row>
                      <col span="12">
                        <h3>资料笔数：{{totalCount}}笔</h3>
                      </col>
                    </Row>
                </Form>
                <div class="margin-top-10">
                    <Table :loading="loading" :columns="columns" border :data="list">
                    </Table>
                    <Page  show-sizer class-name="fengpage" :total="totalCount" class="margin-top-10" @on-change="pageChange" @on-page-size-change="pagesizeChange" :page-size="pageSize" :current="currentPage"></Page>
                </div>
            </div>
        </Card>
        <create-warehouse v-model="createModalShow" @save-success="getpage"></create-warehouse>
        <edit-warehouse  v-model="editModalShow" @save-success="getpage"></edit-warehouse>
        <admin-warehouse v-model="adminModalShow"></admin-warehouse>
    </div>
</template>

<script lang="ts">
  import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
  import Util from '@/lib/util'
  import AbpBase from '@/lib/abpbase'
  import PageRequest from '@/store/entities/page-request'
  import Repository from '@/store/entities/vehicleScheduling/repository'
  import CreateWarehouse from './create-warehouse.vue'
  import EditWarehouse from './edit-warehouse.vue'
  import AdminWarehouse from './admin/admin-warehouse.vue'
  
  class PageWarehouseRequest extends PageRequest{
    areaID:Number;
    repositoryType:Number;
    repositoryName:String;
  }

  class PageLocationRequest extends PageRequest{
  }

  @Component({
      components:{CreateWarehouse,EditWarehouse,AdminWarehouse}
  })
  export default class Warehouse extends AbpBase{//仓库区域维护
    pagerequest:PageWarehouseRequest=new PageWarehouseRequest();
    pageLocationRequest:PageLocationRequest=new PageLocationRequest();
    repository:Repository=new Repository();
    editModalShow:boolean=false;
    createModalShow:boolean=false;
    adminModalShow:boolean=false;
    //表头
    columns=[{
        title:'区域',
        align: 'center',
        tooltip:true,
        render: (h:any, params:any) => {
          return h('span',!!params.row.location?params.row.location.areaName:'')
        }
      },{
        title:'仓库类型',
        align: 'center',
        tooltip:true,
        render: (h:any, params:any) => {
          return h('span',this.GetRepositoryTypeName(params.row.repositoryType))
        }
      },{
        title:'仓库名称',
        align: 'center',
        tooltip:true,
        key:'repositoryName'
      },{
        title:'停/启用',
        width:150,
        align: 'center',
        tooltip:true,
        render: (h:any, params:any) => {
          return h('i-switch',{
            props: {//这里可以设置它的属性
              value: params.row.isStop === 1,     //设置它的值比如：true或false
              //disabled: !params.row.online     // 设置是否可以操作，变灰
            },
            on: { //操作事件
              'on-change': async (value)=>{ //值发生了改变调用方法
                  this.repository = Util.extend(true,{},params.row)
                  this.repository.location=null;
                  this.repository.isStop=value? 1 : 0;
                  await this.$store.dispatch({
                      type:'repository/update',
                      data:this.repository
                  });
                  this.getpage()
              }
            }
          })
        }
      },{
          title:'维护',
          width:150,
          key:'Actions',
          align: 'center',
          render:(h:any,params:any)=>{
            return h('div',[
              h('Button',{
                  props:{
                      type:'primary',
                      size:'small'
                  },
                  on:{
                      click:()=>{
                        this.$store.commit('repository/edit',params.row);
                        this.edit();
                      }
                  }
              },'维护')
            ])
          }
      },{
        title:'管理员维护',
        width:150,
        key:'Actions',
        align: 'center',
        render:(h:any,params:any)=>{
          return h('div',[
            h('Button',{
                props:{
                    type:'primary',
                    size:'small'
                },
                on:{
                    click:()=>{
                      this.$store.commit('repository/edit',params.row);
                      this.showadmin()
                    }
                }
            },'管理员维护')
          ])
        }
    }]
    GetRepositoryTypeName(value:Number){
        switch (value) {
            case 1:
                return '调度'
            case 2:
                return '网约车'
            case 3:
                return '专车'
            case 4:
                return '处分'
        }
    }
    edit(){//修改弹出框
        this.editModalShow=true;
    }
    create(){//添加弹出框
        this.createModalShow=true;
    }
    showadmin(){//管理员维护弹出框
      this.adminModalShow=true;
    }
    pageChange(page:number){
        this.$store.commit('repository/setCurrentPage',page);
        this.getpage();
    }
    pagesizeChange(pagesize:number){
        this.$store.commit('repository/setPageSize',pagesize);
        this.getpage();
    }
    async getpage(){
        this.pagerequest.maxResultCount=this.pageSize;
        this.pagerequest.skipCount=(this.currentPage-1)*this.pageSize;

        await this.$store.dispatch({
            type:'repository/getAll',
            data:this.pagerequest
        })

        this.pageLocationRequest.maxResultCount=10000;
        this.pageLocationRequest.skipCount=0;
        await this.$store.dispatch({
            type:'location/getAll',
            data:this.pageLocationRequest
        })
    }
    get areaList(){
        return this.$store.state.location.list;
    }
    get pageSize(){
        return this.$store.state.repository.pageSize;
    }
    get totalCount(){
        return this.$store.state.repository.totalCount;
    }
    get currentPage(){
        return this.$store.state.repository.currentPage;
    }
    get list(){
        return this.$store.state.repository.list;
    }
    get loading(){
        return this.$store.state.repository.loading;
    }
    async created(){
        await this.getpage();
    }
  }
</script>