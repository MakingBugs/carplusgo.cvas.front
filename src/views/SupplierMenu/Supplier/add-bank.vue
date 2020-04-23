<template>
  <Modal
  :title="ModelName"
  :mask-closable="false"
  :value="value"
  :closable="false"
  width="600"
  @on-visible-change="showchange">
    <div style="padding:0 20px 0 10px">
      <Form :label-width="70" ref="BankForm" :model="BankForm" :rules="checkform" inline>
        <Row type="flex" justify="start">
          <Col span="12">
            <FormItem label="银行名称" style="width:100%" prop="bankTypeId">
              <Select v-model="BankForm.bankTypeId" @on-change="GetBankTypeName" :label-in-value="true">
                <Option v-for="item in BankTypeList" :key="item.id" :value="item.id">{{item.bankNameT}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem :label-width="0" label="" style="width:100%;padding-left:5px" prop="bankDetailAuto">
              <Select ref="select" placeholder="输入关键字搜索银行..." v-model="BankForm.bankDetailAuto" filterable remote :remote-method="GetBank" :loading="BankLoading" @on-change="GetBankName" :label-in-value="true">
                <Option v-for="item in BankList" :key="item.id" :value="item.id">{{item.bankName}}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col span="24">
            <FormItem label="帐号" style="width:100%" prop="account">
              <Input v-model="BankForm.account" placeholder="请输入..." style="width:100%"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col span="18">
            <FormItem label="户名" style="width:100%" prop="accountName">
              <Input v-model="BankForm.accountName" placeholder="请输入..." style="width:100%"></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem :label-width="50" style="width:100%" label="状态" prop="isUser">
              <Select v-model="BankForm.isUser" @on-change="GetBankStatus" :label-in-value="true">
                <Option :value="1">使用中</Option>
                <Option :value="0">未使用</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col span="24">
            <FormItem label="备注" style="width:100%" prop="memo">
              <Input v-model="BankForm.memo" type="textarea" :rows="4" placeholder="请输入..." />
            </FormItem>
          </Col>
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
import Util from '../../../lib/util'
import PageRequest from '@/store/entities/page-request'
import PublicClass from '@/lib/publicclass'
import publicclass from '@/lib/publicclass';

class PagesBankTypeRequest extends PageRequest{//银行类型
    maxResultCount=10000;
    skipCount=0;
}
class PagesBankDetailRequest extends PageRequest{//支行
    maxResultCount=10000;
    skipCount=0;
    keyword:string='';
    bankType:number=null;
}
@Component
export default class AddAccessory extends AbpBase{
  BankTypeRequest:PagesBankTypeRequest=new PagesBankTypeRequest();
  BankDetailRequest:PagesBankDetailRequest=new PagesBankDetailRequest();
  @Prop({type:Boolean,default:false}) value!:Boolean;

//参数----------------------------
  modelloading=true;//模态框加载动画
  BankLoading=false;//支行下拉框动画
  ModelName='新增帐户明细';
  AddOrEdit=1;
  Index=null;

  BankTypeList=[];//银行类型列表
  BankList=[];//银行名称列表
  BankStatusList=[];//状态列表
  BankForm={
    id:null,
    bankTypeId:null,//所选银行类型
    BankTypeName:'',//所选银行类型名称
    bankDetailAuto:null,//所选支行
    bankName:'',//所选支行名称
    account:null,//帐号
    accountName:'',//户名
    isUser:null,//所选状态
    isUserName:'',//所选状态名称
    memo:'',//备注
  }

  checkform={
    bankDetailAuto:[PublicClass.Check.required.PCA],
    account:[PublicClass.Check.required.text,PublicClass.Check.checkvalue.number],
    accountName:[PublicClass.Check.required.text],
    isUser:[PublicClass.Check.required.select]
  }
  


//方法-----------------------------
  
  /**模态框状态 */
  async showchange(value){
    if(!value){
      this.$emit("input",value);
      this.clearModal()
    }else{
      this.modelloading=true;
      await this.GetBankType()
      this.modelloading=false;
    }
  }
  /**监听addoredit当前状态，判断为修改还是新增 */
  @Watch("AddOrEdit",{immediate: true})
  changeaddoredit(){
    if (this.AddOrEdit==1) {
      this.ModelName='新增帐户明细'
    }
    if (this.AddOrEdit==2) {
      this.ModelName='帐户明细修改'
    }
  }

  /**清空模态框 */
  clearModal(){
    this.AddOrEdit=1;
    this.BankForm.id=null;
    (this.$refs.BankForm as any).resetFields()
  }

  /**获取银行类别 */
  async GetBankType(){
    await this.$store.dispatch({
      type:'bankType/getAll',
      data:this.BankTypeRequest
    }).then(res=>{
      this.BankTypeList = res.items
    })
  }
  /**获取支行 */
  async GetBank(query){
    this.BankLoading=true;
    this.BankDetailRequest.keyword=query;
    this.BankDetailRequest.bankType=this.BankForm.bankTypeId;
    await this.$store.dispatch({
      type:'bankDetail/getAll',
      data:this.BankDetailRequest
    }).then(res=>{
      this.BankList = res.items
      this.BankLoading=false;
    })
  }

  /**获取所选银行类型名称 */
  GetBankTypeName(data){
    this.BankForm.bankDetailAuto=null;
    this.BankList=[];
    if (data) {
      this.BankForm.bankTypeId=data.value
      this.BankForm.BankTypeName=data.label
    }
  }
  /**获取所选银行支行名称 */
  GetBankName(data){
    if (data) {
      this.BankForm.bankDetailAuto=data.value
      this.BankForm.bankName=data.label
    }
  }
  /**获取所选状态名称 */
  GetBankStatus(data){
    if (data) {
      this.BankForm.isUser=data.value
      this.BankForm.isUserName=data.label
    }
  }
  /**填充数据 */
  async SetData(data,index){
    this.AddOrEdit=2;
    this.Index=index
    this.BankForm.bankTypeId=data.bankTypeId;//所选银行类型
    await this.GetBank(data.bankName);
    this.BankForm=data
  }

  /**提交 */
  async save(){
    (this.$refs.BankForm as any).validate((valid:Boolean)=>{
      if(valid){
        if (this.AddOrEdit==1) {
          this.$emit("save-accbank",PublicClass.DeepClone(this.BankForm),1,this.Index)
        }else{
          this.$emit("save-accbank",PublicClass.DeepClone(this.BankForm),2,this.Index)
        }
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