<template>
  <div style="position: relative;">
    <Divider orientation="left">派车资料</Divider>
    <Row v-if="ButtonType==1||ButtonType==2" type="flex" justify="start">
      <Col span="24">
        <Button type="primary" style="width:90px;margin:4px 0" @click="ShowDispatchCar">派车</Button>
      </Col>
    </Row>
    <Form :label-width="90" ref="Form" :model="Form" inline>
      <Row type="flex" justify="start">
        <Col span="6">
          <FormItem label="车牌号码" style="width:100%">
            <div v-if="!show" class="readonly"></div>
            <div v-if="show" class="readonly">{{Form.makNo}}</div>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="所在区域" style="width:100%">
            <div v-if="!show" class="readonly"></div>
            <div v-if="show" class="readonly">{{Form.repository.location.areaName}}</div>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="所在仓库" style="width:100%">
            <div v-if="!show" class="readonly"></div>
            <div v-if="show" class="readonly">{{Form.repository.repositoryName}}</div>
          </FormItem>
        </Col>
      </Row>
      <Row type="flex" justify="start">
        <Col span="12">
          <FormItem label="车型" style="width:100%">
            <div v-if="!show" class="readonly"></div>
            <div v-if="show" class="readonly">{{Form.factoryBrand.factoryBrandName+" "+Form.brand.brandName+" "+Form.clasen.clasenName}}</div>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="车色" style="width:100%">
            <div v-if="!show" class="readonly"></div>
            <div v-if="show" class="readonly">{{Form.carColor}}</div>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="车险性质别" style="width:100%">
            <div v-if="!show" class="readonly"></div>
            <div v-if="show" class="readonly">{{Form.isBusiness==1? '非营运':'营运'}}</div>
          </FormItem>
        </Col>
      </Row>
      <Spin size="large" fix v-if="CarBaseloading"></Spin>
    </Form>
    <AddDispatchCar ref="AddDispatchCar" @selectcar="SelectedCar" v-model="ShowAddDispatchCar" ></AddDispatchCar>
  </div>
</template>

<script lang="ts">
  import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
  import Util from '@/lib/util'
  import AbpBase from '@/lib/abpbase'
  import PageRequest from '@/store/entities/page-request'
  import PublicClass from '@/lib/publicclass'
  import AddDispatchCar from './add-dispatchcar.vue'
  import CarBaseRequest from '@/store/modules/car/carbase'
  
  class PageCarBaseRequest extends PageRequest{
    maxResultCount=10;
    skipCount=0;
    carBaseAuto=null;
  }
  @Component({
      components:{AddDispatchCar}
  })
  export default class DispatchCarData extends AbpBase{
    CarBaseRequest:PageCarBaseRequest=new PageCarBaseRequest();//车籍
    @Prop({type:Number,default:1}) ButtonType!:number;
    @Prop({type:Object,default:{}}) DispatchCarParams!:any;
    
    ShowAddDispatchCar:boolean=false;
    CarBaseloading:boolean=false;
    show:boolean=false//是否渲染结果

    Form={
      carBase:null
    }

    

  //----------------------------------------------------------------------
    /**显示对话框 */
    async ShowDispatchCar(){
      this.ShowAddDispatchCar=true;
    }
    /**获取车籍DataList */
    async GetCarBaseList(CarBaseAuto){
      this.CarBaseloading=true
      this.CarBaseRequest.carBaseAuto=CarBaseAuto
      await this.$store.dispatch({
          type:'carbase/getAll',
          data:this.CarBaseRequest
      }).then(res=>{
        this.Form=res.items[0];
        this.show=true
      })
      this.CarBaseloading=false
    }
    /**填充数据 */
    SelectedCar(data){
      this.Form=data
      this.$emit('dispatch',PublicClass.DeepClone(data.id))
      this.show=true
    }
    /**清空数据 */
    clear(){
      (this.$refs.Form as any).resetFields();//resetFields 重置
    }
  }
</script>

<style lang="less">
.readonly{
  height: 32px;
  background-color: #EEEEEE!important;
  text-align: center;
}
</style>