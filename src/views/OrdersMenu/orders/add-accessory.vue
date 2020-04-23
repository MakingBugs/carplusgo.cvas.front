<template>
  <Modal
  title="新增配件"
  :mask-closable="false"
  :value="value"
  :closable="false"
  @on-visible-change="showchange">
    <div style="padding:0 20px">
      <Form :label-width="70" ref="AccessoryForm" :model="AccessoryForm" :rules="checkform" inline>
        <Row type="flex" justify="start">
          <Col span="24">
            <FormItem label="维修厂商" style="width:100%" prop="supplier">
              <Select v-model="AccessoryForm.supplier" @on-change="getAccessoriesMainType" :label-in-value="true">
                <Option v-for="item in AccessoryForm.supplierlist" :key="item.num" :value="item.num">{{item.itemName}}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col span="12">
            <FormItem label="配件类别" style="width:100%" prop="accessoriesmaintype">
              <Select v-model="AccessoryForm.accessoriesmaintype" @on-change="getAccessoriesType" :label-in-value="true">
                <Option v-for="item in AccessoryForm.accessoriesmaintypelist" :key="item.accessoriesType.accessoriesMainType.id" :value="item.accessoriesType.accessoriesMainType.id">{{item.accessoriesType.accessoriesMainType.accessoriesMainName}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem :label-width="10" label="" style="width:100%" prop="accessoriestype">
              <Select v-model="AccessoryForm.accessoriestype" @on-change="getPurchasePrice" :label-in-value="true">
                <Option v-for="item in AccessoryForm.accessoriestypelist" :key="item.id" :value="item.id">{{item.accessoriesTypeName}}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col span="12">
            <FormItem label="施工位置" style="width:100%" prop="location">
              <Select v-model="AccessoryForm.location">
                <Option value="全车">全车</Option>
                <Option value="前档">前档</Option>
                <Option value="后档">后档</Option>
                <Option value="侧后档">侧后档</Option>
                <Option value="前杠">前杠</Option>
                <Option value="后杠">后杠</Option>
                <Option value="底盘">底盘</Option>
                <Option value="车门">车门</Option>
                <Option value="车身">车身</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="座位数" style="width:100%" prop="seat">
              <Select v-model="AccessoryForm.seat">
                <Option value="2座">2座</Option>
                <Option value="3座">3座</Option>
                <Option value="4座">4座</Option>
                <Option value="5座">5座</Option>
                <Option value="6座">6座</Option>
                <Option value="7座">7座</Option>
                <Option value="8座">8座</Option>
                <Option value="9座">9座</Option>
                <Option value="10座">10座</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col span="24">
            <FormItem label="配件价格" style="width:100%" prop="purchaseprice">
              <p>{{this.AccessoryForm.purchaseprice+" 元"}}</p>
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col span="24">
            <FormItem label="备注" style="width:100%" prop="accessoryremark">
              <Input  type="textarea" v-model="AccessoryForm.accessoryremark" :rows="4" placeholder="请输入施工及价格变动说明..." />
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
import PageRequest from '@/store/entities/page-request'
import PublicClass from '@/lib/publicclass'

class PagesItemCodeRequest extends PageRequest{//业务类别
  itemTypes:Array<number>
  maxResultCount=10000
  skipCount=0
}
class PageAccessoriesTsRequest extends PageRequest{//配件-厂商对应表
  supplier:number
  maxResultCount=10000
  skipCount=0
}
class PageAccessoriesTypeRequest extends PageRequest{//次配件
  keyword:string
  maxResultCount=10000
  skipCount=0
}

@Component
export default class AddAccessory extends AbpBase{
  ItemCodeRequest:PagesItemCodeRequest = new PagesItemCodeRequest()
  AccessoriesTsRequest:PageAccessoriesTsRequest =new PageAccessoriesTsRequest()
  AccessoriesTypeRequest:PageAccessoriesTypeRequest=new PageAccessoriesTypeRequest()
  @Prop({type:Boolean,default:false}) value!:Boolean;
//定义变量------------------------------
  AccessoryForm={
    supplier:null,//所选配件厂商
    supplierName:'',//所选配件厂商name
    supplierlist:[],//配件商列表
    accessoriesmaintype:null,//所选主配件
    accessoriesmaintypeName:'',//所选主配件name
    accessoriesmaintypelist:[],//主配件列表
    accessoriestype:null,//所选次配件
    accessoriestypeName:'',//所选次配件name
    accessoriestypelist:[],//次配件列表
    purchaseprice:0,//配件价格
    location:'',//施工位置
    seat:'',//座位
    accessoryremark:'',//施工及价格变动说明
  }
  Allpurchaseprice=[]//存放所有次配件价格
  modelloading=true;//模态框加载动画

  /**表单验证规则 */
  checkform={
    supplier:[PublicClass.Check.required.select],
    accessoriesmaintype:[PublicClass.Check.required.select],
    accessoriestype:[PublicClass.Check.required.select],
    location:[PublicClass.Check.required.text],
    seat:[PublicClass.Check.required.text],
  }

//方法-----------------------------
  
  /**模态框状态 */
  async showchange(value){
    if(!value){
      this.$emit("input",value);
      this.clearModal()
    }else{
      await this.getSupplier()
    }
  }
  /**获取配件厂商 */
  async getSupplier(){
    this.modelloading=true;
    this.ItemCodeRequest.itemTypes=[883]
    await this.$store.dispatch({
      type:'itemCode/GetItemCodeByItemTypes',
      data:this.ItemCodeRequest
    }).then(res=>{
      this.AccessoryForm.supplierlist=res.items
      this.modelloading=false;
    })
  }
  /**根据厂商获取主配件 */
  getAccessoriesMainType(data){
    this.AccessoryForm.accessoriesmaintype=null//清空所选主配件
    this.AccessoryForm.accessoriestype=null//清空所选次配件

    if(data){
      this.AccessoryForm.supplierName=data.label

      this.AccessoriesTsRequest.supplier=data.value
      this.$store.dispatch({
      type:'accessoriesTs/getAll',
      data:this.AccessoriesTsRequest
      }).then(res=>{
        let list=[]
        let accessoriesmaintypelist=[]
        res.items.forEach(i=>{
          if(list.indexOf(i.accessoriesType.accessoriesMainType.id)==-1){
            list.push(i.accessoriesType.accessoriesMainType.id)
            accessoriesmaintypelist.push(i)
          }
        })
        this.AccessoryForm.accessoriesmaintypelist=accessoriesmaintypelist
      })
    }
  }
  /**根据主配件获取次配件 */
  getAccessoriesType(data){
    this.AccessoryForm.accessoriestype=null//清空次配件表
    this.Allpurchaseprice=[]//清空价格表
    this.AccessoryForm.purchaseprice=0//清空配件价格
    if(data){
      this.AccessoryForm.accessoriesmaintypeName=data.label

      this.AccessoriesTypeRequest.keyword=data.value
      this.$store.dispatch({
        type:'accessoriesType/getAll',
        data:this.AccessoriesTypeRequest
      }).then(res=>{
        this.AccessoryForm.accessoriestypelist=res.items
        res.items.forEach(i=>{
          let obj={'id':i.id,'purchasePrice':i.purchasePrice}
          this.Allpurchaseprice.push(obj)
        })
      })
    }else{
      this.AccessoryForm.accessoriestypelist=[]
    }
  }
  /**获取配件价格 */
  getPurchasePrice(data){
    if(data){
      this.AccessoryForm.accessoriestypeName=data.label

      this.Allpurchaseprice.forEach(i=>{
        if(i.id==data.value){
          this.AccessoryForm.purchaseprice=i.purchasePrice
        }
      })
    }
  }
  /**清空模态框 */
  clearModal(){
    this.AccessoryForm.supplierlist=[];
    this.AccessoryForm.accessoriesmaintypelist=[];
    this.AccessoryForm.accessoriestypelist=[];
    this.AccessoryForm.supplierName='';//所选配件厂商name
    this.AccessoryForm.accessoriesmaintypeName='';//所选主配件name
    this.AccessoryForm.accessoriestypeName='';//所选次配件name
    (this.$refs.AccessoryForm as any).resetFields()
  }
  /**提交 */
  async save(){
    (this.$refs.AccessoryForm as any).validate((valid:Boolean)=>{
      if(valid){
        let obj = PublicClass.DeepClone<Object>(this.AccessoryForm)
        this.$emit("save-accessory",obj)
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