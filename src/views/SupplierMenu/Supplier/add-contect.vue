<template>
  <Modal
  :title="ModelName"
  :mask-closable="false"
  :value="value"
  :closable="false"
  width="600"
  @on-visible-change="showchange">
    <div style="padding:0 20px 0 10px">
      <Form :label-width="70" ref="ContectForm" :model="ContectForm" :rules="checkform" inline>
        <Row type="flex" justify="start">
          <Col span="12">
            <FormItem label="联络抬头" style="width:100%" prop="title">
              <Input v-model="ContectForm.title" placeholder="请输入..." style="width:100%"></Input>
            </FormItem>
          </Col>
          <Col span="12">
             <FormItem label="联络电话" style="width:100%" prop="tel">
              <Input v-model="ContectForm.tel" placeholder="请输入..." style="width:100%"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col span="12">
            <FormItem label="传真" style="width:100%" prop="fax">
              <Input v-model="ContectForm.fax" placeholder="请输入..." style="width:100%"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="移动电话" style="width:100%" prop="mTel">
              <Input v-model="ContectForm.mTel" placeholder="请输入..." style="width:100%"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col span="24">
            <FormItem label="电子邮箱" style="width:100%" prop="email">
              <Input v-model="ContectForm.email" placeholder="请输入..." style="width:100%"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col span="12">
            <FormItem label="邮编" style="width:100%" prop="zipCode">
              <Input v-model="ContectForm.zipCode" placeholder="请输入..." style="width:100%"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="联络地址" style="width:100%" prop="PCA">
              <al-cascader v-if="value" data-type="all" v-model="ContectForm.PCA" required level="2" />
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col span="24">
              <FormItem label="详细地址" style="width:100%;padding-left:5px" prop="address">
                <Input v-model="ContectForm.address" placeholder="请输入..." style="width:100%"></Input>
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
import SupplierContect from '@/store/entities/public/supplierContect'

class PagesItemCodeRequest extends PageRequest{
  itemTypes:Array<number>
  maxResultCount=10000
  skipCount=0
}

@Component
export default class AddAccessory extends AbpBase{
  ItemCodeRequest:PagesItemCodeRequest = new PagesItemCodeRequest();
  @Prop({type:Boolean,default:false}) value!:Boolean;
//参数--------------------------------
  modelloading=true;//模态框加载动画
  ModelName='新增联络明细';
  AddOrEdit=1;
  Index=null;

  ContectTypeList=[];//联络类别列表
  ContectForm={
    id:null,//联络人auto
    tel:null,//联络电话
    fax:null,//传真
    mTel:null,//移动电话
    email:'',//电子邮箱
    title:'',//联络抬头
    zipCode:null,//联络邮编
    PCA:[],//省市区
    address:'',//详细地址
  }
  /**表单验证规则 */
  checkform={
    PCA:[PublicClass.Check.required.PCA],
    tel:[PublicClass.Check.checkvalue.tel],
    fax:[PublicClass.Check.checkvalue.fax],
    mTel:[PublicClass.Check.checkvalue.mobiel],
    title:[PublicClass.Check.required.text],
    zipCode:[PublicClass.Check.checkvalue.zipcode],
    email:[PublicClass.Check.checkvalue.mail],
    address:[PublicClass.Check.required.text]
  }

//方法-----------------------------

/**监听addoredit当前状态，判断为修改还是新增 */
  @Watch("AddOrEdit",{immediate: true})
  changeaddoredit(){
    if (this.AddOrEdit==1) {
      this.ModelName='新增联络明细'
    }
    if (this.AddOrEdit==2) {
      this.ModelName='联络明细修改'
    }
  }
  
  /**模态框状态 */
  async showchange(value){
    if(!value){
      this.$emit("input",value);
      this.clearModal()
    }else{
      this.modelloading=true;

      this.modelloading=false;
    }
  }
  /**清空模态框 */
  clearModal(){
    this.AddOrEdit=1;
    this.ContectForm.id=null;
    (this.$refs.ContectForm as any).resetFields()
  }


   /**填充数据 */
  SetData(data,index){
    this.AddOrEdit=2;
    this.Index=index
    this.ContectForm=data
  }

  /**提交 */
  async save(){
    await (this.$refs.ContectForm as any).validate(async (valid:Boolean)=>{
      if(valid){
        //this.$set(this.ContectForm,'Address',this.ContectForm.PCA[0].name+this.ContectForm.PCA[1].name+this.ContectForm.PCA[2].name)
        if (this.ContectForm.PCA.length==3) {
          this.$set(this.ContectForm,'Address',this.ContectForm.PCA[0].name+this.ContectForm.PCA[1].name+this.ContectForm.PCA[2].name)
        }else if (this.ContectForm.PCA.length==2) {
          this.$set(this.ContectForm,'Address',this.ContectForm.PCA[0].name+this.ContectForm.PCA[1].name)
        }
        else{
          this.$set(this.ContectForm,'Address',this.ContectForm.PCA[0].name)
        }
        if (this.AddOrEdit==1) {
          this.$emit("save-contect",PublicClass.DeepClone(this.ContectForm),1,this.Index)
        }else{
          this.$emit("save-contect",PublicClass.DeepClone(this.ContectForm),2,this.Index)
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