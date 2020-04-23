<template>
  <Modal
  title="派车车辆选取"
  :mask-closable="false"
  :value="value"
  :closable="false"
  width="1000"
  @on-visible-change="showchange">
    <div>
      <Form :label-width="70" ref="SearchForm" :rules="checkform" :model="SearchForm" inline>
        <Row type="flex" justify="start">
          <Col span="6">
            <FormItem label="区域" style="width:100%" prop="locationId">
              <Select v-model="SearchForm.locationId">
                <Option v-for="item in LocationList" :key="item.Id" :value="item.Id">{{item.AreaName}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="仓库" style="width:100%" prop="repositoryId">
              <Select v-model="SearchForm.repositoryId">
                <Option v-for="item in RepositoryList" :key="item.Id" :value="item.Id">{{item.RepositoryName}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="车牌号码" style="width:100%" prop="makNo">
              <Input v-model="SearchForm.makNo" placeholder="请输入..." style="width:100%"></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem>
                <Button icon="ios-search" type="primary" @click="Search">查询</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <p><h3>资料笔数：{{count}}笔</h3></p>
      <div class="margin-top-10">
          <Table :loading="CarBaseloading"  :columns="columns" border :data="carlist">
          </Table>
          <Page  show-sizer class-name="fengpage" :total="totalCount" class="margin-top-10" @on-change="pageChange" @on-page-size-change="pagesizeChange" :page-size="pageSize" :current="currentPage"></Page>
      </div>
    </div>
    <div slot="footer">
      <Button @click="$emit('input',false)">返回</Button>
    </div>
  </Modal>
</template>

<script lang="ts">
  import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
  import Util from '@/lib/util'
  import AbpBase from '@/lib/abpbase'
  import PageRequest from '@/store/entities/page-request'
  import PublicClass from '@/lib/publicclass'
  import CarBaseRequest from '@/store/modules/car/carbase'
  import LocationRequest from '@/store/modules/vehicleScheduling/location'
  
  class PageCarBaseRequest extends PageRequest{
    maxResultCount=10;
    skipCount=0;
    repositoryId=null;
    makNo=''
  }
  @Component({
      components:{}
  })
  export default class AddDispatchCar extends AbpBase{
    CarBaseRequest:PageCarBaseRequest=new PageCarBaseRequest();//车籍
    @Prop({type:Boolean,default:false}) value!:Boolean;

    count=0//资料笔数
    LocationList=[]//区域列表
    RepositoryList=[]//仓库列表
    SearchForm={
      locationId:null,
      repositoryId:null,
      makNo:'',
    }

    columns=[// 表头
      {
        title:'选取',
        width:100,
        key:'Actions',
        align: 'center',
        render:(h:any,params:any)=>{
          return h('div',[
            h('Button',{
              style:{
                width:'100%'
              },
              props:{
                  type:'primary',
              },
              on:{
                  click:()=>{
                    this.Selected(params.row)
                  }
              }
            },'选取')
          ])
        }
      },{
        title:'车牌号码',
        align: 'center',
        key:'makNo'
      },{
        title:'车型',
        align: 'center',
        render:(h:any,params:any)=>{
          return h('span',params.row.factoryBrand.factoryBrandName+" "+params.row.brand.brandName+" "+params.row.clasen.clasenName)
        }
      },{
        title:'车色',
        align: 'center',
        key: 'carColor'
      },{
        title:'车险性质别',
        align: 'center',
        render:(h:any,params:any)=>{
          if(params.row.isBusiness==1){
            return h('span','非营业')
          }
          if(params.row.isBusiness==2){
            return h('span','营业')
          }
        }
      },{
        title:'区域',
        align: 'center',
        render:(h:any,params:any)=>{
          return h('span',params.row.repository.location.areaName)
        }
      },{
        title:'仓库',
        align: 'center',
        render:(h:any,params:any)=>{
          return h('span',params.row.repository.repositoryName)
        }
      }
    ]
    carlist=[]//表数据

    //验证规则
    checkform={
      locationId:[PublicClass.NewCheck.required.select("请选择区域！")],
      repositoryId:[PublicClass.NewCheck.required.select("请选择仓库！")]
    }


  //方法-----------------------------------------------------------------------
    /**渲染时执行 */
    created() {
      
    }

    //查询
    async Search(){
      await (this.$refs.SearchForm as any).validate(async (valid:Boolean)=>{
        if(valid){
          this.GetCarBaseList()
        }else{
          return;
        }
      })
    }
    /**获取区域 */
    async GetLocation(){
      await this.$store.dispatch({
        type:'carbase/SelectCarByJurisdiction',
        data:this.CarBaseRequest
      })
    }
    /**获取车籍DataList */
    async GetCarBaseList(){
      this.CarBaseRequest.maxResultCount=this.$store.state.carbase.pageSize;
      this.CarBaseRequest.repositoryId=this.SearchForm.repositoryId;
      this.CarBaseRequest.makNo=this.SearchForm.makNo
      await this.$store.dispatch({
          type:'carbase/SelectCarByJurisdiction',
          data:this.CarBaseRequest
      }).then(res=>{
        this.count=res.totalCount
        this.carlist=res.items
      })
    }
    /**模态框状态 */
    async showchange(value){
      if(value){
        this.clear()
        this.GetCarBaseList()
      }else{
        this.clear()
      }
    }
    /**选取 */
    async Selected(row){
      this.$emit('selectcar',PublicClass.DeepClone(row))
      this.$emit('input',false)
    }

    /**清空数据 */
    clear(){
      (this.$refs.SearchForm as any).resetFields();//resetFields 重置
    }


  //页码------------------------
    /**切换页码 */
    pageChange(page:number){
        this.$store.commit('carbase/updatestate',{currentPage:page});
        this.CarBaseRequest.skipCount=this.skipCount;
        this.GetCarBaseList();
    }
    /**切换显示条数 */
    pagesizeChange(pagesize:number){
        this.$store.commit('carbase/updatestate',{pageSize:pagesize});
        this.GetCarBaseList();
    }

  //计算属性----------------------- 
    /**每页条数 */
    get pageSize(){
        return this.$store.state.carbase.pagesize;
    }
    /**总条数 */
    get totalCount(){
        return this.$store.state.carbase.totalCount;
    }
    /**当前页码 */
    get currentPage(){
        return this.$store.state.carbase.currentPage;
    }
    /**跳过条数 */
    get skipCount(){
      return (this.$store.state.carbase.currentPage-1)*this.$store.state.useCarApply.pageSize
    }
    /**最大返回条数 */
    get maxResultCount(){
      return this.$store.state.carbase.maxResultCount;
    }
    /**列表加载动画状态 */
    get CarBaseloading(){
      return this.$store.state.carbase.loading
    }
  }
</script>

<style lang="less">

</style>