<template>
  <div>
    <Modal
    title="新增车险"
    :mask-closable="false"
    :value="value"
    :closable="false"
    @on-visible-change="showchange"
    width="1200"
    :styles="{top: '10px'}">
      <div style="padding:0 20px">
        <Form :label-width="85" ref="InsuranceForm" :model="InsuranceForm" :rules="checkform" inline>
          <Row type="flex" justify="start">
            <i-col span="6">
              <FormItem label="保险公司" style="width:100%" prop="insurancesupplier">
                <Select v-model="InsuranceForm.insurancesupplier" :label-in-value="true" @on-change="getOrdersType">
                  <Option v-for="item in InsuranceForm.insurancesupplierlist" :key="item.id" :value="item.id">{{item.sname}}</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col span="6">
              <FormItem label="保险年度" style="width:100%" prop="insureyear">
                <Select v-model="InsuranceForm.insureyear" :label-in-value="true" @on-change="getInsureYearName">
                  <Option v-for="item in insureyearlist" :key="item" :value="item">第{{item}}年度</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col span="6">
              <FormItem label="投保类型" style="width:100%" prop="customercare">
                <Select v-model="InsuranceForm.customercare" :label-in-value="true" @on-change="getCustomerCareName">
                  <Option v-for="item in InsuranceForm.customercarelist" :key="item.num" :value="item.num">{{item.itemName}}</Option>
                </Select>
              </FormItem>
            </i-col>
          </Row>
          <Row type="flex" justify="start">
            <i-col span="6">
              <FormItem label="车险性质别" style="width:100%" prop="insuretype">
                <Select v-model="InsuranceForm.insuretype" :label-in-value="true" @on-change="getInsureTypeName">
                  <Option v-for="item in InsuranceForm.insuretypelist" :key="item.num" :value="item.num">{{item.itemName}}</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col span="6">
              <FormItem label="车险座位别" style="width:100%" prop="insurepercnt">
                <Select v-model="InsuranceForm.insurepercnt" :label-in-value="true" @on-change="getInsurePercntName">
                  <Option v-for="item in InsuranceForm.insurepercntlist" :key="item.num" :value="item.num">{{item.itemName}}</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col span="6">
              <FormItem label="座位数" style="width:100%" prop="seating">
                <Select v-model="InsuranceForm.seating">
                  <Option v-for="item in InsuranceForm.seatinglist" :key="item.num" :value="item.num">{{item.itemName}}</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col span="6">
              <FormItem label="汽车产地" style="width:100%" prop="carplace">
                <Select v-model="InsuranceForm.carplace" :label-in-value="true" @on-change="getCarPlaceName">
                  <Option v-for="item in InsuranceForm.carplacelist" :key="item.num" :value="item.num">{{item.itemName}}</Option>
                </Select>
              </FormItem>
            </i-col>
          </Row>
          <Card class="card" dis-hover>
            <Row class-name="header">
              <Col span="24">
                <Col span="4">险种别</Col>
                <Col span="4">保额/赔付额</Col>
                <Col span="4">不计免赔</Col>
                <Col span="4">标准保费</Col>
                <Col span="4">折后保费</Col>
                <Col span="4">备注</Col>
              </Col>
            </Row>
            <!-- <Divider class="divider" dashed></Divider> -->
            <Row type="flex" justify="center" align="middle" class="must" v-for="(item,index) in InsuranceForm.insurancecontent" :key="index">
              <Col span="24">
                <Row type="flex" justify="center" align="middle" class-name="must">
                  <Col span="4">
                    <FormItem :label-width="0" style="width:100%" prop="insureName">
                      <span>{{item.insureName}}</span>
                    </FormItem>
                  </Col>
                  <Col span="4">
                    <FormItem :label-width="0" style="width:100%" prop="insureLimit">
                      <span v-if="item.insureid===2||item.insureid===1||item.insureid===6||item.insureid===7||item.insureid===9">{{item.insureLimit=ListPrice}}</span>
                      <span v-if="item.insureid===14">死亡伤残保额{{item.insureLimit=200000}}</span>
                      <Select v-if="item.insureid===3" v-model="item.insureLimit=500000">
                        <Option :value="500000">50万</Option>
                        <Option :value="1000000">100万</Option>
                        <Option :value="2000000">200万</Option>
                        <Option :value="3000000">300万</Option>
                        <Option :value="5000000">500万</Option>
                        <Option :value="10000000">1000万</Option>
                      </Select>
                      <Select v-if="item.insureid===5" v-model="item.insureLimit=2000">
                        <Option :value="2000">2000</Option>
                        <Option :value="5000">5000</Option>
                        <Option :value="10000">10000</Option>
                        <Option :value="20000">20000</Option>
                      </Select>
                      <Select v-if="item.insureid===4" v-model="item.insureLimit=100000">
                        <Option :value="100000">10万</Option>
                        <Option :value="200000">20万</Option>
                        <Option :value="300000">30万</Option>
                        <Option :value="500000">50万</Option>
                        <Option :value="1000000">100万</Option>
                      </Select>
                      <InputNumber
                      v-if="item.insureid===13"
                      v-model="item.insureLimit"
                      :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                      :parser="value => value.replace(/$s?|(,*)/g, '')"
                      style="width:90%"></InputNumber>
                    </FormItem>
                    </FormItem>
                  </Col>
                  <Col span="4">
                    <FormItem :label-width="0" style="width:100%" prop="isDetail">
                      <i-switch v-model="item.isDetail" :true-value="1" :false-value="0">
                        <span slot="open">是</span>
                        <span slot="close">否</span>
                      </i-switch>
                    </FormItem>
                  </Col>
                  <Col span="4">
                    <FormItem :label-width="0" style="width:100%" prop="">
                      <InputNumber
                      v-model="item.orgAmt"
                      :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                      :parser="value => value.replace(/$s?|(,*)/g, '')"
                      style="width:90%"></InputNumber>
                    </FormItem>
                  </Col>
                  <Col span="4">
                    <FormItem :label-width="0" style="width:100%" prop="">
                      <InputNumber
                      v-model="item.rateAmt"
                      :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                      :parser="value => value.replace(/$s?|(,*)/g, '')"
                      style="width:90%"></InputNumber>
                    </FormItem>
                  </Col>
                  <Col span="4">
                  <FormItem v-model="item.memo" :label-width="0" style="width:100%" prop="">
                    <Input placeholder="请输入..." />
                  </FormItem>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </Form>
      </div>
      <div slot="footer">
        <Row type="flex" justify="end" align="middle">
          <Col span="2">
            <Button :disabled="InsuranceForm.insurancesupplier!=null? false:true" type="primary" size="large" @click="show=true">新增险种</Button>
          </Col>
          <Col span="22">
            <Button type="text" size="large" @click="showchange(false)">取消</Button>
            <Button type="primary" size="large" @click="save">确定</Button>
          </Col>
        </Row>
      </div>
      <Spin size="large" fix v-if="model1loading"></Spin>
    </Modal>


    <Modal
      title="新增险种"
      :mask-closable="false"
      v-model="show"
      :closable="false"
      @on-visible-change="showchange2">
      <div>
        <Form :label-width="75" inline>
          <Row type="flex" justify="start">
            <i-col span="23">
              <FormItem label="险种别" style="width:100%">
                <Select v-model="insure">
                  <Option v-for="item in insurelist" :key="item.id" :value="item.id">{{item.insureName}}</Option>
                </Select>
              </FormItem>
            </i-col>
          </Row>
        </Form>
      </div>
      <div slot="footer">
        <Button type="text" size="large" @click="showchange2(false)">取消</Button>
        <Button type="primary" size="large" @click="addInsure">确定</Button>
      </div>
      <Spin size="large" fix v-if="model2loading"></Spin>
    </Modal>
  </div>
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
class PageSupplierRequest extends PageRequest{//厂商
  maxResultCount=10000
  skipCount=0;
}
class PageInsurancePresetRequest extends PageRequest{//保险预设
  maxResultCount=10000;
  skipCount=0;
  isActive=true;
  supplierAuto:number;
  num:number;
}
class PageInsureSetupRequest extends PageRequest{//险种别
  maxResultCount=10000;
  skipCount=0;
  isActive=true;
}

@Component
export default class AddOrdersFee extends AbpBase{
  ItemCodeRequest:PagesItemCodeRequest = new PagesItemCodeRequest();
  SupplierRequest:PageSupplierRequest=new PageSupplierRequest()
  InsurancePresetRequest:PageInsurancePresetRequest=new PageInsurancePresetRequest()
  InsureSetupRequest:PageInsureSetupRequest=new PageInsureSetupRequest()

  @Prop({type:Boolean,default:false}) value!:Boolean;
  @Prop({type:Number,default:null}) TenancyTerm!:number;
  @Prop({type:Array,default:null}) InsureContent!:any;
  @Prop({type:Number,default:null}) OrderType!:number;
  @Prop({type:Number,default:null}) ListPrice!:number;

//定义变量------------------------------
  InsuranceForm={
    insurancesupplier:null,//所选保险厂商
    insurancesuppliername:'',//所选保险厂商名称
    insurancesupplierlist:[],//保险厂商列表
    insurancecontent:[],//投保内容
    insureyear:null,//保险年度
    insureyearname:'',//保险年度名称
    customercare:null,//投保类型
    customercarename:'',//投保类型名称
    customercarelist:[],//投保类型列表
    insuretype:null,//车险性质别
    insuretypename:'',//车险性质别名称
    insuretypelist:[],//车险性质别列表
    insurepercnt:null,//车险座位别
    insurepercntname:'',//车险座位别名称
    insurepercntlist:[],//车险座位别列表
    seating:null,//所选座位数
    seatinglist:[],//座位数列表
    carplace:null,//所选汽车产地
    carplacename:'',//汽车产地名称
    carplacelist:[],//所选汽车产地列表
    sumorgamt:0,//总标准保费
    sumrateamt:0,//总保费
  }

   /**表单验证规则 */
  checkform={
    insurancesupplier:[PublicClass.Check.required.select],//所选保险厂商
    orderstype:[PublicClass.Check.required.select],//所选业务类别
    insureyear:[PublicClass.Check.required.select],//保险年度
    customercare:[PublicClass.Check.required.select],//投保类型
    insuretype:[PublicClass.Check.required.select],//车险性质别
    insurepercnt:[PublicClass.Check.required.select],//车险座位别
    seating:[PublicClass.Check.required.select],//所选座位数
    carplace:[PublicClass.Check.required.select],//所选汽车产地
  }
  /**新增保险-对话框加载状态 */
  get model1loading(){
    return this.InsuranceForm.customercarelist.length==0||this.InsuranceForm.insuretypelist.length==0||this.InsuranceForm.insurepercntlist.length==0||this.InsuranceForm.seatinglist.length==0||this.InsuranceForm.carplacelist.length==0
  }
  /**获取保险年度列表 */
  get insureyearlist(){
    let insureyearlist=[]
    let newinsureyearlist=[]
    for(let m=1;m<=(this.TenancyTerm/12);m++){
      insureyearlist.push(m)
    }
    insureyearlist.forEach(v=>{
      if(this.insureyearlog.indexOf(v)===-1){
        newinsureyearlist.push(v)
      }
    })
    return newinsureyearlist
  }
  /**取得已添加的保险年度 */
  get insureyearlog(){
    let insureyearlog=[]
    this.InsureContent.forEach(i=>{
      insureyearlog.push(i.insureyear)
    })
    return insureyearlog
  }


  //方法-----------------------------
  /**获取保险厂商 */
  async getinsurancesupplier(){
    let supplierlist=[]
    let itemcodelist=[]
    await this.$store.dispatch({
        type:'supplier/getAll',
        data:this.SupplierRequest
    }).then(res=>{
        supplierlist=res.items
    })
    await supplierlist.map(i=>{
        let list=[]
        i.supplierT.split(",").forEach(j=>{
            if(j.length>0){
                list.push(j)
            }
        })
        let b= list.some(e=>{
            return (e==1)
        })
        if(b){
            this.InsuranceForm.insurancesupplierlist.push(i)
        }
    })
  }
  /**获取预设保险配置及保险厂商名称 */
  async getOrdersType(data){
    if(data){
      this.InsuranceForm.insurancecontent=[]//清空投保内容
      this.InsuranceForm.insurancesuppliername=data.label
      this.InsurancePresetRequest.supplierAuto=data.value;
      this.InsurancePresetRequest.num=this.OrderType
      this.$store.dispatch({
          type:'insurancePreset/getAll',
          data:this.InsurancePresetRequest
      }).then(res=>{
        res.items.forEach(i=>{
          this.InsuranceForm.insurancecontent.push({
            insureid:i.insureSetup.id,//险种id
            insureName:i.insureSetup.insureName,//险种名称
            isDetail:i.insureSetup.isDetail,//不计免赔
            orgAmt:0,//标准保费
            rateAmt:0,//折后保费
            insureLimit:0,//保额/赔付额
            memo:'',//备注
          })
        })
      })
    } 
  }
  /**获取投保类型列表 */
  async getCustomerCare(){
    this.ItemCodeRequest.itemTypes=[128]
    await this.$store.dispatch({
      type:'itemCode/GetItemCodeByItemTypes',
      data:this.ItemCodeRequest
    }).then(res=>{
      this.InsuranceForm.customercarelist = res.items
    })
  }
  /**获取车险性质别 */
  async getInsureType(){
    this.ItemCodeRequest.itemTypes=[411]
    await this.$store.dispatch({
      type:'itemCode/GetItemCodeByItemTypes',
      data:this.ItemCodeRequest
    }).then(res=>{
      this.InsuranceForm.insuretypelist = res.items
    })
  }
  /**获取车险座位别 */
  async getInsurePercnt(){
    this.ItemCodeRequest.itemTypes=[410]
    await this.$store.dispatch({
      type:'itemCode/GetItemCodeByItemTypes',
      data:this.ItemCodeRequest
    }).then(res=>{
      this.InsuranceForm.insurepercntlist = res.items
    })
  }
  /**获取座位数 */
  async getSeating(){
    this.ItemCodeRequest.itemTypes=[222]
    await this.$store.dispatch({
      type:'itemCode/GetItemCodeByItemTypes',
      data:this.ItemCodeRequest
    }).then(res=>{
      this.InsuranceForm.seatinglist = res.items
    })
  }
  /**获取汽车产地 */
  async getCarPlace(){
    this.ItemCodeRequest.itemTypes=[227]
    await this.$store.dispatch({
      type:'itemCode/GetItemCodeByItemTypes',
      data:this.ItemCodeRequest
    }).then(res=>{
      this.InsuranceForm.carplacelist = res.items
    })
  }
  /**获取保险年度名称 */
  getInsureYearName(data){
    if(data) this.InsuranceForm.insureyearname=data.label
  }
  /**获取投保类型名称 */
  getCustomerCareName(data){
    if(data) this.InsuranceForm.customercarename=data.label
  }
  /**获取车险性质别名称 */
  getInsureTypeName(data){
    if(data) this.InsuranceForm.insuretypename=data.label
  }
  /**获取车险座位别名称 */
  getInsurePercntName(data){
    if(data) this.InsuranceForm.insurepercntname=data.label
  }
  /**获取汽车产地名称 */
  getCarPlaceName(data){
    if(data) this.InsuranceForm.carplacename=data.label
  }

   /**获取总保费 */
  SumRateAmt(){
    let sum=0
    this.InsuranceForm.insurancecontent.forEach(i=>{
        sum+=i.rateAmt
    })
    return sum
  }
  /**获取总标准保费 */
  SumOrgAmt(){
    let sum=0
    this.InsuranceForm.insurancecontent.forEach(i=>{
        sum+=i.orgAmt
    })
    return sum
  }

 


  /**模态框状态 */
  async showchange(value){
    if(!value){
      this.$emit("input",value);
      this.clearModal()
    }else{
      this.getinsurancesupplier()//获取保险公司列表
      await this.getCustomerCare()
      await this.getInsureType()
      await this.getInsurePercnt()
      await this.getSeating()
      await this.getCarPlace()
    }
  }
  /**清空模态框 */
  clearModal(){
    this.InsuranceForm.insurancecontent=[]//清空投保内容
    this.InsuranceForm.insurancesupplierlist=[];
    this.InsuranceForm.insurancecontent=[];
    this.InsuranceForm.customercarelist=[];
    this.InsuranceForm.insuretypelist=[];
    this.InsuranceForm.insurepercntlist=[];
    this.InsuranceForm.seatinglist=[];
    this.InsuranceForm.carplacelist=[];
    (this.$refs.InsuranceForm as any).resetFields()
  }
 

  /**提交 */
  async save(){
    (this.$refs.InsuranceForm as any).validate((valid:Boolean)=>{
      if(valid){
        this.InsuranceForm.sumorgamt=this.SumOrgAmt();
        this.InsuranceForm.sumrateamt=this.SumRateAmt();
        let obj = PublicClass.DeepClone<Object>(this.InsuranceForm)
        this.$emit("save-insure",obj)
        this.showchange(false)
      }else{
        return
      }
    })
  }
  

  




//------------------------------------------------------------------
  model2loading=true;//新增险种别加载动画
  show:boolean=false
  insure:number=null;//险种别
  insurelist=[]//险种别列表

  showchange2(value){
    if(!value){
      this.show=value
    }else{
      this.getInsure()//获取险种列表
    }
  }
  /**获取险种别 */
  getInsure(){
    this.model2loading=true
    this.insurelist=[]
    this.insure=null
    this.$store.dispatch({
        type:'insureSetup/getAll',
        data:this.InsureSetupRequest
    }).then(res=>{
      res.items.forEach(i=>{
        let b = this.InsuranceForm.insurancecontent.some(j=>{
          return j.insureid==i.id
        })
        if(!b){
          if(i.id==14){
            let c=this.InsuranceForm.insurancecontent.some(n=>{
              return n.insureid==4
            })
            if(!c) this.insurelist.push(i)
          }else if(i.id==4){
            let c=this.InsuranceForm.insurancecontent.some(n=>{
              return n.insureid==14
            })
            if(!c) this.insurelist.push(i)
          }else if(i.id==99){
            let c=this.InsuranceForm.insurancecontent.some(n=>{
              return n.insureid==98
            })
            if(!c) this.insurelist.push(i)
          }else if(i.id==98){
            let c=this.InsuranceForm.insurancecontent.some(n=>{
              return n.insureid==99
            })
            if(!c) this.insurelist.push(i)
          }else{
            this.insurelist.push(i)
          }
        }
      })
      if(this.insurelist.length>0){
        this.insure=this.insurelist[0].id
      }
      this.model2loading=false
    })
  }
  /**添加险种别 */
  addInsure(){
    this.insurelist.forEach(i=>{
      if(i.id==this.insure){
        this.InsuranceForm.insurancecontent.push({
          insureid:i.id,//险种id
          insureName:i.insureName,//险种名称
          isDetail:i.isDetail,//不计免赔
          orgAmt:0,//标准保费
          rateAmt:0,//折后保费
          insureLimit:0,//保额/赔付额
          memo:'',//备注
        })
      }
    })
    this.showchange2(false)
  }
}
</script>

<style lang="less" scoped>
.divider{
  margin: 3px;
  color: black;
  font-weight: bold;
}
.header{
  background-color: aliceblue;
  text-align: center;
  font-size: 18px;
  color: black;
  font-weight: bold;
  margin-bottom: 10px;
}
.must,.selectable,.especially,.other{
  text-align: center;
  padding: 1px;
  .ivu-col-span-4{
    height: 32px;//指定formitem高度
  }
}

</style>