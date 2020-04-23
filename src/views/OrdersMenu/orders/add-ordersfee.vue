<template>
  <Modal
    title="新增上牌规费"
    :mask-closable="false"
    :value="value"
    :closable="false"
    @on-visible-change="showchange">
    <div style="padding:0 20px">
      <Form :label-width="70" ref="OrdersFeeTypeForm" :model="OrdersFeeTypeForm" :rules="checkform" inline>
        <Row type="flex" justify="start">
          <i-col span="24">
            <FormItem label="费用别" style="width:100%" prop="ordersfeetype">
              <Select v-model="OrdersFeeTypeForm.ordersfeetype" :label-in-value="true" @on-change="getFeeAmt">
                <Option v-for="item in OrdersFeeTypeForm.ordersfeetypelist" :key="item.id" :value="item.id">{{item.feeType.itemName}}</Option>
              </Select>
            </FormItem>
          </i-col>
        </Row>
        <Row type="flex" justify="start">
          <i-col span="24">
            <FormItem label="费用金额" style="width:100%" prop="feeAmt">
              <InputNumber
              v-model="OrdersFeeTypeForm.feeAmt"
              :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
              :parser="value => value.replace(/$s?|(,*)/g, '')"
              style="width:100%"></InputNumber>
              </FormItem>
          </i-col>
        </Row>
        <Row type="flex" justify="start">
          <i-col span="24">
            <FormItem label="备注" style="width:100%" prop="ordersfeememo">
              <Input v-model="OrdersFeeTypeForm.ordersfeememo" type="textarea" :rows="4" placeholder="请输入..." />
            </FormItem>
          </i-col>
        </Row>
      </Form>
    </div>
    <div slot="footer">
      <Button type="text" size="large" @click="showchange(false)">取消</Button>
      <Button type="primary" size="large" @click="save">确定</Button>
    </div>
    <Spin size="large" fix v-if="modelloading"></Spin>
  </Modal>
</template>

<script lang="ts">
import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
import AbpBase from '@/lib/abpbase'
import PageRequest from '@/store/entities/page-request'
import PublicClass from '@/lib/publicclass'

class PagesOrdersFeeTypeRequest extends PageRequest{//上牌规费
  inc_Auto:number;
  maxResultCount=10000
  skipCount=0
}

@Component
export default class AddOrdersFee extends AbpBase{
  OrdersFeeTypeRequest:PagesOrdersFeeTypeRequest=new PagesOrdersFeeTypeRequest()
  @Prop({type:Boolean,default:false}) value!:Boolean;
  @Prop({type:Number,default:null}) incauto!:number;
//定义变量------------------------------
  modelloading=true;//模态框加载动画

  OrdersFeeTypeForm={
    ordersfeetype:null,//所选上牌规费
    ordersfeetypename:'',//所选上牌规费name
    incname:'',//所选公司name
    ordersfeetypelist:[],//上牌规费列表
    feeAmt:null,//费用金额
    ordersfeememo:'',//备注
  }
  /**表单验证规则 */
  checkform={
    ordersfeetype:[PublicClass.Check.required.select],
    feeAmt:[PublicClass.Check.required.number]
  }

//方法-----------------------------
  /**模态框状态 */
  showchange(value){
    if(!value){
      this.$emit("input",value);
      this.clearModal()
    }else{
      this.getOrdersFeeType()//根据公司别，获取上牌规费类型列表
    }
  }
  /**清空模态框 */
  clearModal(){
    this.OrdersFeeTypeForm.ordersfeetypelist=[];
    (this.$refs.OrdersFeeTypeForm as any).resetFields()
  }
  /**获取上牌规费类别 */
  async getOrdersFeeType(){
    this.modelloading=true
    this.OrdersFeeTypeRequest.inc_Auto=this.incauto
    await this.$store.dispatch({
      type:'ordersfeetype/GetOrdersFeeTypeByInc',
      data:this.OrdersFeeTypeRequest
    }).then(res=>{
      this.OrdersFeeTypeForm.ordersfeetypelist=res.items.filter(i=>{
        return i.feeTypeAuto!=5&&i.feeTypeAuto!=6
      })
      this.modelloading=false
    })
  }
  /**获取费用金额 */
  getFeeAmt(data){
    this.OrdersFeeTypeForm.ordersfeetypelist.forEach(i=>{
      if(i.id==data.value){
        this.OrdersFeeTypeForm.feeAmt=i.feeAmt
        this.OrdersFeeTypeForm.ordersfeetypename=i.feeType.itemName
        this.OrdersFeeTypeForm.incname=i.inc.sname
      }
    })
  }

  /**提交 */
  async save(){
    (this.$refs.OrdersFeeTypeForm as any).validate((valid:Boolean)=>{
      if(valid){
        let obj = PublicClass.DeepClone<Object>(this.OrdersFeeTypeForm)
        this.$emit("save-ordersfee",obj)
        this.showchange(false)
      }else{
        return
      }
    })
  }
  

  
}
</script>

<style lang="less" scoped>

</style>