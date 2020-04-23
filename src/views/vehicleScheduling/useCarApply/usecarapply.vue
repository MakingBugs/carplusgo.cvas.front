<template>
  <div>
    <Card dis-hover>
      <div class="page-body">
        <p><h3>资料笔数：{{count}}笔</h3></p>
        <div class="margin-top-10">
            <Table :loading="useCarApplyloading" :columns="columns" border :data="usecarapplylist">
            </Table>
            <Page  show-sizer class-name="fengpage" :total="totalCount" class="margin-top-10" @on-change="pageChange" @on-page-size-change="pagesizeChange" :page-size="pageSize" :current="currentPage"></Page>
        </div>
      </div>
    </Card>
    <!--弹出框-->
    <Modal
    title="出还车作业"
    :mask-closable="false"
    v-model="ModalShow"
    :closable="false"
    :scrollable="true"
    :fullscreen="true">
      <OutCarApplyData v-show="ShowOutCarApply" ref="outcarapply"></OutCarApplyData>
      <DispatchCarData :ButtonType="ButtonType" :DispatchCarParams="DispatchCarParams" @dispatch="dispatch" v-show="ShowDispatchCar" ref="dispatchcar"></DispatchCarData>
      <OutCarData :ButtonType="ButtonType" v-show="ShowOutCar" ref="outcar"></OutCarData>
      <ReturnCarData v-show="ShowReturnCar" ref="returncar"></ReturnCarData>
      <OtherData v-show="ShowOther" ref="other"></OtherData>
      <div slot="footer" style="text-align:left">
        <Button v-if="ButtonType==1? true:false||ButtonType==2? true:false" :disabled="ShowDispatchBTN" type="primary" style="width:100px" @click="ConfirmDispatchCar">确认派车</Button>
        <Button v-if="ButtonType==3? true:false" type="primary" style="width:105px">出还车确认单</Button>
        <Button v-if="ButtonType==3? true:false" type="primary" style="width:100px" @click="ConfirmOutCar">确认出车</Button>
        <Button v-if="ButtonType==4? true:false" type="primary" style="width:100px" @click="ConfirmReturnCar">确认还车</Button>
        <Button v-if="ButtonType!=4? true:false" style="width:100px" @click="CancelOutCarShowChange(true)">取消出车</Button>
        <Button @click="showchange(false)" style="width:100px">返回</Button>
      </div>
      <Spin size="large" fix v-if="ModelLoading"></Spin>
    </Modal>
    <!--取消出车-->
    <Modal
    title="取消出车"
    :mask-closable="false"
    v-model="CancelOutCarShow"
    :closable="false"
    @on-visible-change="CancelOutCarShowChange">
      <div>
        <Form :label-width="70" ref="CancelOutCarForm" :model="CancelOutCarForm" inline>
          <Row>
            <Col span="24">
              <FormItem label="取消原因" style="width:100%">
                <Input v-model="CancelOutCarForm.RejectMemo" type="textarea" :rows="4" placeholder="请输入取消原因..." />
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
      <div slot="footer">
        <Button type="primary" @click="ConfirmCancelOutCar">确认</Button>
        <Button @click="CancelOutCarShowChange(false)">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
  import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
  import Util from '@/lib/util'
  import AbpBase from '@/lib/abpbase'
  import PageRequest from '@/store/entities/page-request'
  import PublicClass from '@/lib/publicclass'
  import UseCarApply from '@/store/entities/vehicleScheduling/useCarApply'
  import OutCarApplyData from './outcarapplydata/outcarapplydata.vue'
  import DispatchCarData from './dispatchcardata/dispatchcardata.vue'
  import OutCarData from './outcardata/outcardata.vue'
  import ReturnCarData from './returncardata/returncardata.vue'
  import OtherData from './otherdata/otherdata.vue'
  import publicclass from '@/lib/publicclass';
  
  //出还车
  class PageUseCarApplyRequest extends PageRequest{
    maxResultCount=10;
    skipCount=0;
  }

  @Component({
      components:{OutCarApplyData,DispatchCarData,OutCarData,ReturnCarData,OtherData}
  })
  export default class extends AbpBase{//仓库区域维护
    UseCarApplyRequest:PageUseCarApplyRequest=new PageUseCarApplyRequest();//出还车
    UseCarApply:UseCarApply=null;
    ModalShow:boolean=false;
    CancelOutCarShow:boolean=false;
    ModelLoading:boolean=false;
    ShowOutCarApply:boolean=false;//出车申请资料展示状态
    ShowDispatchCar:boolean=false;//派车料展示状态
    ShowOutCar:boolean=false;//出车
    ShowReturnCar:boolean=false;//还车
    ShowOther:boolean=false;//其他资料展示状态
    ButtonType:number=null;//按钮类型 1派车 2重新派车 3出车 4还车
    ShowDispatchBTN:boolean=true;//是否禁用[确认派车按钮]

    count:any=0;

    DispatchCarParams={
      //当前用户有权限的仓库区域
      LocationList:[],
      RepositoryList:[],
      SelectLocationId:null,
      SelectRepositoryId:null,
    }
    
    
    CancelOutCarForm={/**取消出车 */
      RejectMemo:''//取消原因
    }

    //表数据
    usecarapplylist:any=[];
    //表头
    columns=[{
        title:'申请单位',
        width:100,
        align: 'center',
        render:(h:any,params:any)=>{
          return h('span',params.row.proposerData.depName)
        }
      },{
        title:'申请人',
        width:100,
        align: 'center',
        render:(h:any,params:any)=>{
          return h('span',params.row.proposerData.fName)
        }
      },{
        title:'申请原因',
        width:100,
        align: 'center',
        render:(h:any,params:any)=>{
          return h('span',params.row.userReasonData.itemName)
        }
      },{
        title:'预定使用时间',
        width:150,
        align: 'center',
        render:(h:any,params:any)=>{
          return h('span',publicclass.FormatDate(new Date(params.row.preUseDT),"yyyy-MM-dd hh:mm"))
        }
      },{
        title:'预订车型',
        align: 'center',
        render:(h:any,params:any)=>{
          return h('span',params.row.clasen.brand.factoryBrand.factoryBrandName+" "+params.row.clasen.brand.brandName+" "+params.row.clasen.clasenName)
        }
      },{
        title:'出车区域',
        width:100,
        align: 'center',
        render:(h:any,params:any)=>{
          return h('span',params.row.location.areaName)
        }
      },{
        title:'出车仓库',
        width:100,
        align: 'center',
        render:(h:any,params:any)=>{
          return h('span',params.row.repository.repositoryName)
        }
      },{
        title:'实际出车时间',
        width:150,
        align: 'center',
        render:(h:any,params:any)=>{
          return h('span',publicclass.FormatDate(new Date(params.row.outDT),"yyyy-MM-dd hh:mm"))
        }
      },{
        title:'实际出车车型',
        align: 'center',
        render:(h:any,params:any)=>{
          if(params.row.carBase>0){
            return h('span',params.row.carBaseData.factoryBrand.factoryBrandName+" "+params.row.carBaseData.brand.brandName+" "+params.row.carBaseData.clasen.clasenName)
          }else{
            return h('span','——')
          } 
        }
      },{
        title:'出车车牌号码',
        width:150,
        align: 'center',
        key:'makNo'
      },{
          title:'维护',
          width:200,
          align: 'center',
          render:(h:any,params:any)=>{
            if(params.row.status==10){
              return h('div',[
                h('Button',{
                  style:{
                    width:'100%'
                  },
                  props:{
                      type:'warning',
                  },
                  on:{
                      click:()=>{
                        this.showmodalcontect(1,params.row);
                        this.showchange(true);
                      }
                  }
                },'派车')
              ])
            }
            if(params.row.status==20){
              return h('div',[
                h('Button',{
                  style:{
                    width:'48%',
                    marginRight:'4%'
                  },
                  props:{
                      type:'success',
                  },
                  on:{
                      click:()=>{
                        this.showmodalcontect(3,params.row)
                        this.showchange(true)
                      }
                  }
                },'出车'),
                h('Button',{
                  style:{
                    width:'48%'
                  },
                  props:{
                      type:'warning',
                  },
                  on:{
                      click:()=>{
                        this.showmodalcontect(2,params.row)
                        this.showchange(true)
                      }
                  }
                },'重新派车')
              ])
            }
            if(params.row.status==30){
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
                        this.showmodalcontect(4,params.row)
                        this.showchange(true)
                      }
                  }
                },'还车')
              ])
            }
          }
      }]
    
  //方法-------------------------------------------------------------------------------------------------------
    /**获取出还车DataList */
    async GetUseCarApplyList(){
      this.UseCarApplyRequest.maxResultCount=this.$store.state.useCarApply.pageSize;
      await this.$store.dispatch({
          type:'useCarApply/getAll',
          data:this.UseCarApplyRequest
      }).then(res=>{
        console.log(res);
        this.usecarapplylist = res.items
        this.count=res.totalCount
      })
    }

    /**清空数据 */
    ClearChildData(){
      this.ShowDispatchBTN=true;
      //派车子组件
      (this.$refs.dispatchcar as any).Form={};
      (this.$refs.dispatchcar as any).show=false;
    }
    /**模态框状态 */
    async showchange(value){
      if(value){
        this.ModalShow=value
      }else{
        this.ModalShow=value
        this.ClearChildData()
      }
    }
    /**点击派车传入车辆id */
    dispatch(CarBaseAuto:bigint){
      this.UseCarApply.carBase=CarBaseAuto
      this.ShowDispatchBTN=false
    }
    
  //按钮---------------------------------
    /**确认派车 */
    async ConfirmDispatchCar(){
      this.$Modal.confirm({
          title:'是否确认派车?',
          okText:'确认',
          cancelText:'取消',
          onOk:async()=>{
            this.UseCarApply.status=20
            console.log(this.UseCarApply);
            await this.$store.dispatch({
              type:'useCarApply/update',
              data:this.UseCarApply
            }).then(res=>{
              this.GetUseCarApplyList()
              this.showchange(false)
              this.$Message.success('派车成功！')
            }).catch(err=>{
              this.GetUseCarApplyList()
              this.showchange(false)
              this.$Message.error('派车成功！')
            })
          }
      });
    }
    /**取消出车对话框 */
    CancelOutCarShowChange(value){
      if(value){
        this.CancelOutCarShow=value
      }else{
        this.CancelOutCarShow=value
      }
    };
    /**确认取消出车 */
    ConfirmCancelOutCar(){
      this.$Modal.confirm({
        title:'是否取消出车?',
        okText:'确认',
        cancelText:'取消',
        onOk:async()=>{
          this.CancelOutCarShowChange(false)
          this.showchange(false)
        }
      });
    }
    /**确认出车 */
    ConfirmOutCar(){
      this.$Modal.confirm({
        title:'是否确认出车?',
        okText:'确认',
        cancelText:'取消',
        onOk:async()=>{
          this.CancelOutCarShowChange(false)
          this.showchange(false)
        }
      });
    }
    /**确认还车 */
    ConfirmReturnCar(){
      this.$Modal.confirm({
        title:'是否确认还车?',
        okText:'确认',
        cancelText:'取消',
        onOk:async()=>{
          this.CancelOutCarShowChange(false)
          this.showchange(false)
        }
      });
    }
    /**模态框展示内容 1派车 2重新派车 3出车 4还车 */
    async showmodalcontect(type,row){
      this.UseCarApply=new UseCarApply();//实例化 出还车类
      this.$store.commit('useCarApply/updatestate',{updateUseCarApply:row});//为 state 传值
      this.UseCarApply=PublicClass.DeepClone(this.$store.state.useCarApply.updateUseCarApply);//将值放入待修改对象中

      if(row.CarBase>0){//是否已派车
        this.dispatch(row.CarBase)
      };
      console.log(row);
      (this.$refs.outcarapply as any).SetData(PublicClass.DeepClone(row));
      this.ButtonType=type
      switch(type){
        case 1:
            this.ShowOutCarApply=true;//出车申请资料展示状态
            this.ShowDispatchCar=true;//派车料展示状态
            this.ShowOutCar=false;//出车
            this.ShowReturnCar=false;//还车
            this.ShowOther=false;//其他资料展示状态
          break;
        case 2:
            this.ShowOutCarApply=true;//出车申请资料展示状态
            this.ShowDispatchCar=true;//派车料展示状态
            this.ShowOutCar=false;//出车
            this.ShowReturnCar=false;//还车
            this.ShowOther=false;//其他资料展示状态
            (this.$refs.dispatchcar as any).GetCarBaseList(PublicClass.DeepClone(row.carBase));
          break;
        case 3:
            this.ShowOutCarApply=true;//出车申请资料展示状态
            this.ShowDispatchCar=true;//派车料展示状态
            this.ShowOutCar=true;//出车
            this.ShowReturnCar=false;//还车
            this.ShowOther=true;//其他资料展示状态
            (this.$refs.dispatchcar as any).GetCarBaseList(PublicClass.DeepClone(row.carBase));
          break;
        case 4:
            this.ShowOutCarApply=true;//出车申请资料展示状态
            this.ShowDispatchCar=true;//派车料展示状态
            this.ShowOutCar=true;//出车
            this.ShowReturnCar=true;//还车
            this.ShowOther=true;//其他资料展示状态
            (this.$refs.dispatchcar as any).GetCarBaseList(PublicClass.DeepClone(row.carBase));
          break;
        default:
            this.ShowOutCarApply=false;//出车申请资料展示状态
            this.ShowDispatchCar=false;//派车料展示状态
            this.ShowOutCar=false;//出车
            this.ShowReturnCar=false;//还车
            this.ShowOther=false;//其他资料展示状态
          break;
      }
    }
    
  //页码------------------------
    /**切换页码 */
    pageChange(page:number){
        this.$store.commit('useCarApply/updatestate',{currentPage:page});
        this.UseCarApplyRequest.skipCount=this.skipCount;
        this.GetUseCarApplyList();
    }
    /**切换显示条数 */
    pagesizeChange(pagesize:number){
        this.$store.commit('useCarApply/updatestate',{pageSize:pagesize});
        this.GetUseCarApplyList();
    }

  //计算属性-----------------------  
    /**每页条数 */
    get pageSize(){
        return this.$store.state.useCarApply.pagesize;
    }
    /**总条数 */
    get totalCount(){
        return this.$store.state.useCarApply.totalCount;
    }
    /**当前页码 */
    get currentPage(){
        return this.$store.state.useCarApply.currentPage;
    }
    /**跳过条数 */
    get skipCount(){
      return (this.$store.state.useCarApply.currentPage-1)*this.$store.state.useCarApply.pageSize
    }
    /**最大返回条数 */
    get maxResultCount(){
      return this.$store.state.useCarApply.maxResultCount;
    }
    /**列表加载动画状态 */
    get useCarApplyloading(){
      return this.$store.state.useCarApply.loading
    }
  
  /**渲染时加载 */
    async created(){
      this.ModelLoading=true
      await this.GetUseCarApplyList()
      this.ModelLoading=false
    }
  }
</script>

<style lang="less">

</style>