<template>
  <div>
    <Card dis-hover>
       <!-- 折叠面板 -->
        <Collapse v-model="collapseKey" @on-change="showPanel" accordion>
          <!-- 厂商查询面板 -->
          <Panel name="1">
            厂商查询
            <div slot="content">
              <Form :label-width="70" inline>
                <Row>
                  <Col span="4">
                    <FormItem label="查询条件" style="width:100%">
                      <Select v-model="qcondition">
                          <Option :value="1">厂商名称</Option>
                          <Option :value="2">厂商序号</Option>
                      </Select>
                    </FormItem>
                  </Col> 
                 <Col span="6">
                      <FormItem :label-width="10" style="width:100%" prop="searchtext">
                          <Input v-model="searchtext" placeholder="请输入..." style="width:100%"></Input>
                      </FormItem>
                  </Col>
                  <Col span="10">
                    <FormItem label="厂商类型" style="width:100%">
                      <Select v-model="supplierT" multiple style="width:100%">
                          <Option v-for="item in SupplierTList":key="item.num" :value="item.num">{{item.itemName}}</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  <Col span="4">
                      <FormItem>
                          <Button icon="ios-search" type="primary" @click="SelectSupplier">查询</Button>
                          <Button icon="md-add" type="primary"  style="margin-left: 8px" @click="showPanel(['2'],1)">添加</Button>
                      </FormItem>
                  </Col> 
                </Row>
              </Form>
              <div>
                <Table border :columns="supplierheader" :data="suppliercontent"  :loading="supplierloading"></Table>
              </div>
              <div style="margin: 10px;overflow: hidden">
                <div style="float: left;">
                  <Page show-sizer :total="totalCount" :current="currentPage"  @on-change="currentPageChange" @on-page-size-change="pageSizeChange" ></Page>
                </div>
              </div>
            </div>
          </Panel>
          <!-- 试算添加面板 -->
          <Panel name="2">
            {{panelname}}
            <div slot="content" class="panel2">
              <Form :label-width="85" ref="Form" :rules="checkform" :model="Form" inline>
                <Divider>基本数据</Divider>
                <div>
                  <Row type="flex" justify="start">
                    
                    <Col span="6">
                        <FormItem label="工商注册号" style="width:100%" prop="fid">
                          <Input v-model="Form.fid" placeholder="请输入..." style="width:100%"></Input>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="厂商全称" style="width:100%" prop="fname">
                          <Input v-model="Form.fname" placeholder="请输入..." style="width:100%"></Input>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="厂商简称" style="width:100%" prop="sname">
                          <Input v-model="Form.sname" :maxlength="6" placeholder="请输入..." style="width:100%"></Input>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="设立日期" style="width:100%" prop="incCdt">
                          <Date-picker v-model="Form.incCdt" type="date" format="yyyy-MM-dd"  placeholder="选择日期" style="width:100%"></Date-picker>
                        </FormItem>
                    </Col>
                    
                  </Row>
                  <Row type="flex" justify="start">
                    <Col span="6">
                        <FormItem label="电话" style="width:100%" prop="tel">
                          <Input v-model="Form.tel" placeholder="请输入..." style="width:100%"></Input>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="传真" style="width:100%" prop="fax">
                          <Input v-model="Form.fax" placeholder="请输入..." style="width:100%"></Input>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="电子邮件" style="width:100%" prop="email">
                          <Input v-model="Form.email" placeholder="请输入..." style="width:100%"></Input>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="邮编" style="width:100%" prop="zipCode">
                          <Input v-model="Form.zipCode" placeholder="请输入..." style="width:100%"></Input>
                        </FormItem>
                    </Col>
                  </Row>
                  <Row type="flex" justify="start">
                    <Col span="6">
                        <FormItem label="设立地址" style="width:100%" prop="PCA">
                          <al-cascader v-if="collapseKey==2? true:false" data-type="all" v-model="Form.PCA" level="2" />
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label-width="0" style="width:100%;padding-left:5px" prop="addr">
                          <Input v-model="Form.addr" placeholder="请输入..." style="width:100%"></Input>
                        </FormItem>
                    </Col>
                  </Row>
                </div>
                <Divider>厂商动态</Divider>
                <div>
                  <Row type="flex" justify="start">
                    <Col span="6">
                      <FormItem label="公司形态" style="width:100%" prop="incType">
                        <Select v-model="Form.incType">
                          <Option v-for="item in IncTypeList" :key="item.num" :value="item.num">{{item.itemName}}</Option>
                        </Select>
                      </FormItem>
                    </Col>
                    <Col span="6">
                      <FormItem label="服务车型" style="width:100%" prop="serviceClasen">
                        <Select v-model="Form.serviceClasen">
                          <Option v-for="item in ServiceClasenList" :key="item.num" :value="item.num">{{item.itemName}}</Option>
                        </Select>
                      </FormItem>
                    </Col>
                    <Col span="24">
                      <FormItem label="厂商类别" prop="supplierT">
                        <CheckboxGroup v-model="Form.supplierT">
                          <Checkbox v-for="item in SupplierTList" :key="item.num" :label="item.num">{{item.itemName}}</Checkbox>
                        </CheckboxGroup>
                      </FormItem>
                    </Col>
                  </Row>
                  <Row type="flex" justify="start">
                    <Col span="6">
                      <FormItem label="工时折数" style="width:100%" prop="whdiscount">
                        <InputNumber v-model="Form.whdiscount" :min="0" :max="100" placeholder="请输入..." style="width:80%"></InputNumber> %
                      </FormItem>
                    </Col>
                    <Col span="6">
                      <FormItem label="零件折数" style="width:100%" prop="itemDiscount">
                        <InputNumber v-model="Form.itemDiscount" :min="0" :max="100" placeholder="请输入..." style="width:80%"></InputNumber> %
                      </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="合约起日" style="width:100%" prop="linceBeginDt">
                          <Date-picker v-model="Form.linceBeginDt" type="date" format="yyyy-MM-dd"  placeholder="选择日期" style="width:100%"></Date-picker>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="合约迄日" style="width:100%" prop="linceEndDt">
                          <Date-picker v-model="Form.linceEndDt" type="date" format="yyyy-MM-dd"  placeholder="选择日期" style="width:100%"></Date-picker>
                        </FormItem>
                    </Col>
                  </Row>
                </div>
                <Divider>付款条件</Divider>
                <div>
                  <Row type="flex" justify="start">
                    <Col span="6">
                      <FormItem label="付款周期" style="width:90%" prop="payMode">
                        <Select v-model="Form.payMode">
                          <Option v-for="item in PayModeList" :key="item.num" :value="item.num">{{item.itemName}}</Option>
                        </Select>
                      </FormItem>
                    </Col>
                    <Col span="12">
                      <FormItem v-if="Form.payMode==1" label="付款日"  prop="payDt"> 
                        <InputNumber v-model="Form.payDt" :min="1" :max="31" style="width:70px"></InputNumber> 日付款，
                      </FormItem>
                      <FormItem :label-width="0"  prop="payDay">
                        <InputNumber v-model="Form.payDay" :min="1" style="width:70px"></InputNumber> 天付款一次
                      </FormItem>
                    </Col>
                  </Row>
                </div>
                <Divider>联络明细</Divider>
                <div>
                  <add-contect ref="contect" v-model="contectmodal" @save-contect="SaveContect" @get-contect="GetContect"></add-contect>
                  <Row type="flex" justify="start" style="padding-bottom:10px">
                    <Col span="6">
                      <Button icon="md-add" type="primary" style="margin:10px width:100%" @click="contectmodal=true">新增</Button>
                    </Col>
                  </Row>
                  <div v-show="this.Form.Contect.length>0? true:false">
                    <Table width="100%" :disabled-hover="true" border :columns="ContectHeader" :data="Form.Contect"></Table>
                  </div>
                </div>
                <Divider>账户明细</Divider>
                <div>
                  <add-bank ref="accbank" v-model="bankmodal" @save-accbank="SaveAccbank"></add-bank>
                  <Row type="flex" justify="start" style="padding-bottom:10px">
                    <Col span="6">
                      <Button icon="md-add" type="primary" style="margin:10px width:100%" @click="ShowBankModal">新增</Button>
                    </Col>
                  </Row>
                  <div v-show="this.Form.AccBank.length>0? true:false">
                    <Table width="100%" :disabled-hover="true" border :columns="AccBankHeader" :data="Form.AccBank"></Table>
                  </div>
                </div>
                <Divider></Divider>
                <div style="text-align:right">
                  <Button v-if="addoredit==1? true:false" icon="md-arrow-up" @click="Save" type="success">提交</Button>
                  <Button v-if="addoredit==2? true:false" icon="md-create" @click="Update" type="warning">修改</Button>
                </div>
              </Form>
              <Spin size="large" fix v-if="panel2loading"></Spin>
            </div>
          </Panel>
        </Collapse>
    </Card>
  </div>
</template>

<script lang="ts">
import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
import AbpBase from '@/lib/abpbase'
import Util from '../../../lib/util'
import PageRequest from '@/store/entities/page-request'
import PublicClass from '@/lib/publicclass'
import AddContect from './add-contect.vue'
import AddBank from './add-bank.vue'
import Supplier from '@/store/entities/public/supplier'
import SupplierContect from '@/store/entities/public/supplierContect'
import AccBank from '@/store/entities/public/accBank'

class PagesItemCodeRequest extends PageRequest{
  itemTypes:Array<number>
  maxResultCount=10000
  skipCount=0
}
class PagesSupplierRequest extends PageRequest{//厂商
  maxResultCount=10;
  skipCount=0;
  supplierTypes=[];
  key:string='';
  supplierAuto:number=null;
}
class PagesContectRequest extends PageRequest{//联络人
  maxResultCount=10000
  skipCount=0
  supplierAuto=null
}
class PagesAccBankRequest extends PageRequest{//账户明细
  maxResultCount=10000
  skipCount=0
  supplierAuto=null
}

@Component({
  components:{AddContect,AddBank}
})
export default class  extends AbpBase{
ItemCodeRequest:PagesItemCodeRequest = new PagesItemCodeRequest();
SupplierRequest:PagesSupplierRequest=new PagesSupplierRequest();//厂商
ContectRequest:PagesContectRequest=new PagesContectRequest();//联络人
AccBankRequest:PagesAccBankRequest=new PagesAccBankRequest();//账户明细
//变量----------------------------------------
  //---------------
    panel2loading=true//新增厂商-加载状态

    panelname='厂商添加';//panel名称
    addoredit=1;//当前为添加还是修改：1添加，2修改
    SupplierAuto=null;

    collapseKey='1';//选中Panel
    qcondition=1;//所选查询条件
    supplierT=[];//所选厂商类别列表
    qconditionlist=[];//查询条件列表
    searchtext='';//输入的查询条件
    alcascader=false;

    SupplierContectList=[];//原有联络人存放列表
    AccBankList=[];//原有账户明细存放列表

    IncTypeList=[];//公司形态列表
    ServiceClasenList=[];//服务车型列表
    SupplierTList=[];//厂商类别列表
    supplierheader=[//厂商列表表头
      {
        title: '厂商序号',
        key:'id'
      },
      {
        title: '厂商简称',
        key:'sname'
      },
      {
        title: '厂商全称',
        key:'fname'
      },
      {
        title: '工商注册号',
        key:'fid'
      },
      {
        title:'厂商类型',
        render:(h:any,params:any)=>{
          var result = this.GetSupplierTypeName(params.row.supplierT);
          return h("span",result)
        }
      },
      {
        title: '操作',
        key: 'action',
        fixed: 'right',
        align: 'center',
        render: (h, params) => {
          return h('div', [
              h('Button', {
                props: {
                    type: 'warning',
                    size: 'small'
                },
                style:{
                    width:'50px',
                    margin:'0 2px 0 2px'
                },
                on: {
                    click: () => {
                      this.Edit(params.row)
                    }
                }
            }, '编辑'),
            h('Button', {
                props: {
                    type: 'error',
                    size: 'small'
                },
                style:{
                    width:'50px',
                    margin:'0 2px 0 2px'
                },
                on: {
                    click: () => {
                        this.$Modal.confirm({
                          title:'删除厂商',
                          content:'<p>确定删除该厂商么？</p>',
                          loading:true,
                          onOk:async ()=>{
                            await this.DeleteSupplier(params.row.id);
                            this.$Modal.remove();
                          }
                        })
                    }
                }
            }, '删除')
          ]);
        }
      }
    ];
    suppliercontent=[];//厂商列表内容
    contectmodal=false;//联络明细-模态框状态
    bankmodal=false;//账户明细-模态框状态
    PayModeList=[];//付款周期
    ContectHeader=[//联络人明细表头
      {
        title: '联络人编号',
        key: 'id'
      },
      {
          title: '联络抬头',
          key: 'title'
      },
      {
          title: '联络电话',
          key: 'tel'
      },
      {
          title: '移动电话',
          key: 'mTel'
      },
      {
          title: '传真',
          key: 'fax'
      },
      {
          title: '邮政编码',
          key: 'zipCode'
      },
      {
          title: '联络地址',
          render:(h,params)=>{
            return h("span",params.row.Address+params.row.address)
          }
      },
      {
        title: '操作',
        key: 'action',
        fixed: 'right',
        align: 'center',
        render: (h, params) => {
          return h('div', [
              h('Button', {
                props: {
                    type: 'warning',
                    size: 'small'
                },
                style:{
                    width:'50px',
                    margin:'0 2px 0 2px'
                },
                on: {
                    click: () => {
                      this.ShowContectModal();
                      (this.$refs.contect as any).SetData(PublicClass.DeepClone(params.row),params.index);
                    }
                }
            }, '编辑'),
            h('Button', {
                props: {
                    type: 'error',
                    size: 'small'
                },
                style:{
                    width:'50px',
                    margin:'0 2px 0 2px'
                },
                on: {
                    click: () => {
                      this.RemoveContect(params.index)
                    }
                }
            }, '删除')
          ]);
        }
      }
    ];
    AccBankHeader=[//账户明细表头
      {
          title: '帐户编号',
          key: 'id'
      },
      {
          title: '银行别',
          key: 'BankTypeName'
      },
      {
          title: '银行名称',
          key: 'bankName'
      },
      {
          title: '帐户',
          key: 'account'
      },
      {
          title: '户名',
          key: 'accountName'
      },
      {
          title: '备注',
          key: 'memo'
      },
      {
          title: '是否使用',
          key: 'isUserName'
      },
      {
        title: '操作',
        key: 'action',
        fixed: 'right',
        align: 'center',
        render: (h, params) => {
          return h('div', [
              h('Button', {
                props: {
                    type: 'warning',
                    size: 'small'
                },
                style:{
                    width:'50px',
                    margin:'0 2px 0 2px'
                },
                on: {
                    click: () => {
                      this.ShowBankModal();
                      (this.$refs.accbank as any).SetData(PublicClass.DeepClone(params.row),params.index);
                    }
                }
            }, '编辑'),
            h('Button', {
                props: {
                    type: 'error',
                    size: 'small'
                },
                style:{
                    width:'50px',
                    margin:'0 2px 0 2px'
                },
                on: {
                    click: () => {
                      this.RemoveAccBank(params.index)
                    }
                }
            }, '删除')
          ]);
        }
      }
    ]
  Form={
    id:null,
    fid:'',//工商注册号
    tel:'',//电话
    fax:'',//传真
    sname:'',//厂商简称
    incCdt:null,//设立日期
    email:'',//电子邮件
    zipCode:'',//邮政编码
    fname:'',//厂商全称
    PCA:[],//省市区
    addr:'',//详细地址
    incType:null,//公司形态
    serviceClasen:null,//服务车型
    supplierT:[],//厂商类别
    whdiscount:0,//工时折数
    itemDiscount:0,//零件折数
    linceBeginDt:null,//合约起日
    linceEndDt:null,//合约迄日
    payMode:null,//付款周期
    payDt:1,//付款日
    payDay:30,//每几天付一次
    Contect:[],//联络明细
    AccBank:[],//账户明细
  };

  checkform={
    fid:[PublicClass.Check.required.text],
    tel:[PublicClass.Check.checkvalue.tel],//电话
    fax:[PublicClass.Check.checkvalue.fax],//传真
    sname:[PublicClass.Check.required.text],//厂商简称
    incCdt:[PublicClass.Check.required.req],//设立日期
    email:[PublicClass.Check.checkvalue.mail],//电子邮件
    zipCode:[PublicClass.Check.checkvalue.zipcode],//邮政编码
    fname:[PublicClass.Check.required.text],//厂商全称
    PCA:[PublicClass.Check.required.PCA],//省市区
    addr:[PublicClass.Check.required.text],//详细地址
    incType:[PublicClass.Check.required.select],//公司形态
    serviceClasen:[PublicClass.Check.required.select],//服务车型
    supplierT:[PublicClass.Check.required.req],//厂商类别
    Contect:[PublicClass.Check],//联络明细
    AccBank:[PublicClass.Check],//账户明细
  }
  
  //计算属性-----
  get totalCount(){//数据总数
    return this.$store.state.supplier.totalCount
  }
  get supplierloading(){//Form1列表加载动画状态
    return this.$store.state.supplier.loading
  }
  get currentPage(){//当前页码
    return this.$store.state.supplier.currentPage;
  }
  get skipCount(){//跳过条数
    return (this.$store.state.supplier.currentPage-1)*this.$store.state.supplier.pageSize
  }



//方法------------------------------------------
  /**切换折叠面板 */
  showPanel(array,value){
    if (value==1) {//添加
      this.addoredit=1
    }
    if (value==2) {//修改
      this.addoredit=2
    }
    if (array[0]=="1") {
      this.clear()//关闭panel2时清空数据
    }
    this.collapseKey=array[0]
  }
  /**清空数据 */
  clear(){
    (this.$refs.Form as any).resetFields();//resetFields 重置
    this.Form.Contect=[];
    this.Form.AccBank=[];
  }
  /**监听addoredit当前状态，判断为修改还是新增 */
  @Watch("addoredit",{immediate: true})
  changeaddoredit(){
    if (this.addoredit==1) {
      this.panelname='厂商添加'
    }
    if (this.addoredit==2) {
      this.panelname='厂商修改'
    }
  }
  /**显示联络人明细对话框 */
  ShowContectModal(){
    this.contectmodal=true;
  }
  /**显示账户明细对话框 */
  ShowBankModal(){
    this.bankmodal=true;
  }
  /**点击编辑填充数据 */
  SetDate(row){
    // if (row.addrArea>99999) {
    //   this.$set(row,'PCA',[row.addrProvince.toString(),row.addrCity.toString(),row.addrArea.toString()])//省市区
    // }
    if (row.addrProvince>99999&&row.addrCity>99999&&row.addrArea>99999){
            this.$set(row,'PCA',[row.addrProvince.toString(),row.addrCity.toString(),row.addrArea.toString()])
          } else if (row.addrProvince>99999&&row.addrCity>99999) {
            this.$set(row,'PCA',[row.addrProvince.toString(),row.addrCity.toString()])
          }else{ 
            this.$set(row,'PCA',[row.addrProvince.toString()])
          }
    this.$set(row,'supplierT',this.stringToArray(row.supplierT))
    this.$set(row,'Contect',[])
    this.$set(row,'AccBank',[])
    this.Form=row
  }
  /** 拆分supplierT成数组*/
  stringToArray(str){
    return str.split(',').filter(x=>{
      if (x>=0) return Number(x)
    }).map(x=>{return Number(x)})
  }
  /**数组转string */
  ArrayToString(array:any[]){
    var a='';
    array.forEach(x=>{
      a=a+x.toString()+","
    })
    return a
  }
  /**在查询结果中显示厂商类型 */
  GetSupplierTypeName(data){
    var Namestr='';
    var list= data.split(',').filter(x=>x!='').map(x=>Number(x));
    list.forEach(x => {
      this.SupplierTList.forEach(i=>{
        if (x==i.num) {
          Namestr+=(i.itemName+";")
        }
      })
    });
    return Namestr;
  }
  /**获取公司形态 */
  async GetIncType(){
    this.ItemCodeRequest.itemTypes=[111]
    await this.$store.dispatch({
        type:'itemCode/GetItemCodeByItemTypes',
        data:this.ItemCodeRequest
    }).then(res=>{
        this.IncTypeList = res.items
    })
  }
  /**获取服务车型 */
  async GetServiceClasen(){
    this.ItemCodeRequest.itemTypes=[122]
    await this.$store.dispatch({
        type:'itemCode/GetItemCodeByItemTypes',
        data:this.ItemCodeRequest
    }).then(res=>{
        this.ServiceClasenList = res.items
    })
  }
  /**获取厂商类别 */
  async GetsupplierT(){
    this.ItemCodeRequest.itemTypes=[121]
    await this.$store.dispatch({
        type:'itemCode/GetItemCodeByItemTypes',
        data:this.ItemCodeRequest
    }).then(res=>{
        this.SupplierTList = res.items
    })
  }
  /**获取付款周期 */
  async GetPayMode(){
    this.ItemCodeRequest.itemTypes=[123]
    await this.$store.dispatch({
        type:'itemCode/GetItemCodeByItemTypes',
        data:this.ItemCodeRequest
    }).then(res=>{
      this.PayModeList = res.items
      this.Form.payMode=1
    })
  }
  /**从列表中移除联络人 */
  RemoveContect(index){
    this.Form.Contect.splice(index,1)
  }
  /**从列表中移除账户明细 */
  RemoveAccBank(index){
    this.Form.AccBank.splice(index,1)
  }
  /**查询联络人 */
  async GetContect(SupplierAuto:number){
    this.Form.Contect=[];
    this.SupplierContectList=[];
    this.ContectRequest.supplierAuto=SupplierAuto
    await this.$store.dispatch({
      type:'supplierContect/GetAll',
      data:this.ContectRequest
    }).then(res=>{
      res.items.forEach(x => {
        if(x!=null) 
        {
          console.log(x);
          this.SupplierContectList.push(x.id)
          //this.$set(x,'Address',x.creditProvince.name+x.creditCity.name+x.creditArea.name)
          if (x.province>99999&&x.city>99999&&x.area>99999){
            this.$set(x,'PCA',[x.province.toString(),x.city.toString(),x.area.toString()])
            this.$set(x,'Address',x.creditProvince.name+x.creditCity.name+x.creditArea.name)
          } else if (x.province>99999&&x.city>99999) {
            this.$set(x,'PCA',[x.province.toString(),x.city.toString()])
            this.$set(x,'Address',x.creditProvince.name+x.creditCity.name)
          }else{ 
            this.$set(x,'PCA',[x.province.toString()])
            this.$set(x,'Address',x.creditProvince.name)
          }
          this.Form.Contect.push(PublicClass.DeepClone(x))
        }
      });
    })
  }
  /**查询账户明细 */
  async GetAccBank(SupplierAuto:number){
    this.Form.AccBank=[]
    this.AccBankList=[]
    this.AccBankRequest.supplierAuto=SupplierAuto
    await this.$store.dispatch({
      type:'accBank/getAll',
      data:this.ContectRequest
    }).then(res=>{
      res.items.forEach(x => {
        if (x!=null) {
          this.AccBankList.push(x.id)
          this.$set(x,'BankTypeName',x.bankType.bankNameT)
          this.$set(x,'isUserName',x.isUser==1? "使用中":"未使用")
          this.Form.AccBank.push(x)
        }
      });
    })
  }

  //----------------------------------------
  /**点击编辑 */
  async Edit(data){
    this.panel2loading=true
    await this.showPanel(['2'],2);
    await this.SetDate(PublicClass.DeepClone(data));
    await this.GetContect(data.id);
    await this.GetAccBank(data.id);
    this.SupplierAuto=data.id
    this.panel2loading=false
  }
  /**Supplier实体赋值 */
  getSupplierData(data){
    var newdata=PublicClass.DeepClone(data)
    var S=new Supplier();
    this.SupplierAuto=newdata.id
    S.Fid=newdata.fid
    S.Tel=newdata.tel
    S.Fax=newdata.fax
    S.Fname=newdata.fname
    S.IncCdt=newdata.incCdt
    S.Email=newdata.email
    S.ZipCode=newdata.zipCode
    S.Sname=newdata.sname
    if (newdata.PCA.length==3) {
      S.AddrProvince=Number(newdata.PCA[0].code)
      S.AddrCity=Number(newdata.PCA[1].code)
      S.AddrArea=Number(newdata.PCA[2].code)
    }else if (newdata.PCA.length==2) {
      S.AddrProvince=Number(newdata.PCA[0].code)
      S.AddrCity=Number(newdata.PCA[1].code)
    }
    else{
      S.AddrProvince=Number(newdata.PCA[0].code)
    }
    
    S.Addr=newdata.addr
    S.IncType=newdata.incType
    S.ServiceClasen=newdata.serviceClasen
    S.SupplierT=this.ArrayToString(newdata.supplierT)
    S.Whdiscount=newdata.whdiscount
    S.ItemDiscount=newdata.itemDiscount
    S.LinceBeginDt=newdata.linceBeginDt
    S.LinceEndDt=newdata.linceEndDt
    S.PayMode=newdata.payMode
    S.PayDt=newdata.payDt
    S.PayDay=newdata.payDay
    return S
  }
  /**SupplierContect实体赋值 */
  getSupplierContectData(data){
    var newdata=PublicClass.DeepClone(data)
    var SC= new SupplierContect()
    SC.SupplierAuto=newdata.supplierAuto
    SC.Title=newdata.title
    SC.Tel=newdata.tel
    SC.Fax=newdata.fax
    SC.MTel=newdata.mTel
    SC.Email=newdata.email
    SC.ZipCode=newdata.zipCode
    SC.Address=newdata.address
    if (newdata.PCA.length==3) {
      SC.Province=Number(newdata.PCA[0].code==null? newdata.PCA[0]:newdata.PCA[0].code)
      SC.City=Number(newdata.PCA[1].code==null? newdata.PCA[1]:newdata.PCA[1].code)
      SC.Area=Number(newdata.PCA[2].code==null? newdata.PCA[2]:newdata.PCA[2].code)
    }else if (newdata.PCA.length==2) {
      SC.Province=Number(newdata.PCA[0].code==null? newdata.PCA[0]:newdata.PCA[0].code)
      SC.City=Number(newdata.PCA[1].code==null? newdata.PCA[1]:newdata.PCA[1].code)
    }
    else{
      SC.Province=Number(newdata.PCA[0].code==null? newdata.PCA[0]:newdata.PCA[0].code)
    }
    // SC.Province=Number(newdata.PCA[0].code==null? newdata.PCA[0]:newdata.PCA[0].code)
    // SC.City=Number(newdata.PCA[1].code==null? newdata.PCA[1]:newdata.PCA[1].code)
    // SC.Area=Number(newdata.PCA[2].code==null? newdata.PCA[2]:newdata.PCA[2].code)
    return SC
  }
  /**AccBank实体赋值 */
  getAccBankData(data){
    var newdata=PublicClass.DeepClone(data)
    var AB=new AccBank();
    AB.SupplierAuto=newdata.supplierAuto
    AB.BankTypeId=newdata.bankTypeId
    AB.BankDetailAuto=newdata.bankDetailAuto
    AB.BankName=newdata.bankName
    AB.Account=newdata.account
    AB.AccountName=newdata.accountName
    AB.IsUser=newdata.isUser
    AB.Memo=newdata.memo
    return AB
  }
  /**删除厂商 */
  async DeleteSupplier(SupplierAuto){
    var S=new Supplier()
    S.id=SupplierAuto
    await this.$store.dispatch({
        type:'supplier/delete',
        data:S
    }).then(res=>{
      this.$Message.success('删除成功！')
      this.getSupplierContect()
    })
  }
  /**提交 */
  async Save(){
    (this.$refs.Form as any).validate(async (valid:Boolean)=>{
      if(valid){
        //厂商新增开始--
        var Request = this.getSupplierData(this.Form)
        Request.id=0
        await this.$store.dispatch({
            type:'supplier/create',
            data:Request
        }).then(res=>{
          this.SupplierAuto=res.id
          //厂商新增结束--
          //联络人新增开始--
          this.Form.Contect.forEach(async (x)=>{
            await this.CreateSupplierContect(x)
          })
          //联络人新增结束--
          //账户明细新增开始--
          this.Form.AccBank.forEach(async (x)=>{
            await this.CreateAccBank(x)
          })
          //账户明细新增结束--
          this.$Message.success('新增厂商成功！')
          this.getSupplierContect()
          this.showPanel(['1'],1)
    })
      }else{
        return
      }
    })
  }
  /**修改 */
  async Update(){
    (this.$refs.Form as any).validate(async (valid:Boolean)=>{
      if(valid){
        //厂商修改--
        var Request = this.getSupplierData(this.Form)
        Request.id=this.Form.id
        await this.$store.dispatch({
            type:'supplier/update',
            data:Request
        }).then(res=>{
          //联络人添加
          this.Form.Contect.forEach(async x=>{
            if (this.SupplierContectList.indexOf(x.id)==-1) {
              await this.CreateSupplierContect(x)
            }
          })
          //账户添加
          this.Form.AccBank.forEach(async x=>{
            console.log("新增账户明细11111");
            console.log(x);
            if (this.AccBankList.indexOf(x.id)==-1) {
              console.log("新增账户明细");
              await this.CreateAccBank(x);
            }
          })
          //联络人修改
          this.Form.Contect.forEach(async x=>{
            this.SupplierContectList.forEach(async i=>{
              if (i==x.id) { 
                this.EditSupplierContect(x)
                await this.SupplierContectList.splice(this.SupplierContectList.indexOf(i),1)
              }
            })
          })
          //账户修改
          this.Form.AccBank.forEach(async x=>{
            this.AccBankList.forEach(async i=>{
              if (i==x.id) { 
                console.log("修改帐户明细");
                this.EditAccBank(x)
                await this.AccBankList.splice(this.AccBankList.indexOf(i),1)
              }
            })
            console.log(this.AccBankList);
          })
          //删除
          if (this.SupplierContectList.length>0) {
            this.SupplierContectList.forEach(async x=>{
              await this.DelSupplierContect(x)
            })
          }
          if (this.AccBankList.length>0) {
            console.log("删除帐户");
            this.AccBankList.forEach(async x=>{
              await this.DelAccBank(x)
            })
          }
          this.$Message.success('修改厂商成功！')
          this.getSupplierContect()
          this.showPanel(['1'],1)
        })
      }else{
        return
      }
    })
  }
  /**新增联络人 */
  async CreateSupplierContect(data){
    var Request = this.getSupplierContectData(data);
    Request.SupplierAuto=this.SupplierAuto
    Request.id=0
    await this.$store.dispatch({
      type:'supplierContect/Create',
      data:Request
    }).then(res=>{

    })
  }
  /**修改联络人 */
  async EditSupplierContect(data){
    var Request = this.getSupplierContectData(data)
    Request.id=data.id
    await this.$store.dispatch({
        type:'supplierContect/Update',
        data:Request
    }).then(res=>{
      
    })
  }
  /**删除联络人 */
  async DelSupplierContect(Auto){
    var SC=new SupplierContect();
    SC.id=Auto
    await this.$store.dispatch({
        type:'supplierContect/Delete',
        data:SC
    }).then(res=>{
      
    })
  }
  /**新增账户明细 */
  async CreateAccBank(data){
    console.log(data);
    var Request = this.getAccBankData(data)
    Request.SupplierAuto=this.SupplierAuto
    Request.id=0
    console.log(Request);
    await this.$store.dispatch({
      type:'accBank/create',
      data:Request
    }).then(res=>{

    })
  }
  /**修改账户明细 */
  async EditAccBank(data){
    console.log(data);
    var Request = this.getAccBankData(data)
    Request.id=data.id
    console.log(Request);
    await this.$store.dispatch({
      type:'accBank/update',
      data:Request
    }).then(res=>{

    })
  }
  /**删除账户明细 */
  async DelAccBank(Auto){
    console.log(Auto);
    var AB=new AccBank()
    AB.id=Auto
    console.log(AB);
    await this.$store.dispatch({
      type:'accBank/delete',
      data:AB
    }).then(res=>{

    })
  }
  //供子组件调用--------------------------
  /**新增联络人到列表中 */
  SaveContect(data,AddOrEdit,index){
    if (AddOrEdit==1) {
      this.Form.Contect.push(data);
    }else{
      this.Form.Contect.splice(index,1,data)
    }
  }
  /**新增账户明细到列表中 */
  SaveAccbank(data,AddOrEdit,index){
    if (AddOrEdit==1) {
      console.log(data);
      this.Form.AccBank.push(data);
    }else{
      this.Form.AccBank.splice(index,1,data);
    }
  }

  //厂商查询列表分页-------------------------
    /** 
     * 更新当前页码
    */
    currentPageChange(page:number){
      this.$store.commit('supplier/updatestate',{currentPage:page});
      this.SupplierRequest.skipCount=this.skipCount;
      this.getSupplierContect()
    }
    /**
     * 更新厂商列表每页显示条数
     */
    pageSizeChange(pagesize:number){
      this.$store.commit('supplier/updatestate',{pageSize:pagesize});
      this.getSupplierContect()
    }
    /**获取所查询数据 */
    async getSupplierContect(){
      this.SupplierRequest.supplierTypes=this.supplierT;
      this.SupplierRequest.maxResultCount=this.$store.state.supplier.pageSize;
      await this.$store.dispatch({
        type:'supplier/getAll',
        data:this.SupplierRequest
      }).then(res=>{
        this.suppliercontent=res.items
      })
    }
    /**条件查询 */
    SelectSupplier(){
      if (this.qcondition==1) {
        this.SupplierRequest.supplierAuto=null;
        this.SupplierRequest.key=this.searchtext
        this.getSupplierContect()
      }else if (this.qcondition==2) {
        var regNumber=/^[0-9]*$/;
        this.SupplierRequest.key='';
        if (regNumber.test(this.searchtext)) {
          this.SupplierRequest.supplierAuto=Number(this.searchtext);
          this.getSupplierContect()
        }else{
          this.$Message.warning('请输入正确的厂商序号！')
          this.searchtext="";
        }
      }
    }
  
  
  //页面渲染前执行----------------------------------
  async created() {
    this.panel2loading=true

    await this.GetsupplierT()
    await this.getSupplierContect()
    await this.GetIncType()
    await this.GetServiceClasen()
    await this.GetPayMode()

    this.panel2loading=false
  }

}
</script>

<style lang="less" scoped>
  .panel2{
    position: relative;
  }
</style>