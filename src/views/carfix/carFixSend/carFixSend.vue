<template>
    <div>
        <Card dis-hover>
            <div class="page-body">
                <Form ref="queryForm" :label-width="100" inline>
                    <Row>
                        <Col span="6">
                            <FormItem label="厂商：" style="width:100%">
                                <Select :placeholder="L('Select')" v-model="Form1.ddlPRSupplier">
                                    <Option v-for="item in ddlPRSupplierList" :value="item.id" :key="item.id">{{ item.fname }}</Option>
                                </Select>
                            </FormItem>
                        </Col> 
                        <Col span="6">
                            <FormItem :label="L('Keyword')+':'" style="width:100%" prop="itemCodekey">
                                <Select :placeholder="L('Select')" v-model="Form1.itemCodekey" @on-change="ChangeCar">
                                    <Option value="1">维修</Option>
                                    <Option value="2">发票</Option>
                                    <Option value="3">批次</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="6" v-show="maintain">
                            <FormItem label="维修状态：" style="width:100%">
                                <RadioGroup v-model="Form1.carFixstatus">
                                    <Radio label="0">全部</Radio>
                                    <Radio label="1">未送件</Radio>
                                    <Radio label="2">已送件</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col> 
                        <Col span="6" v-show="maintain">
                            <FormItem label="维修日期：" style="width:100%">
                                <DatePicker v-model="Form1.carFixDate" style="width:100%" placeholder="请输入维修日期"></DatePicker>
                            </FormItem>
                        </Col> 
                        <Col span="6" v-show="invoice">
                            <FormItem label="发票号码：" style="width:100%">
                                <Input v-model="Form1.invNo" placeholder="请输入发票号码"></Input>
                            </FormItem>
                        </Col> 
                        <Col span="6" v-show="invoice">
                            <FormItem label="发票金额：" style="width:100%">
                                <Input v-model="Form1.invNumber" placeholder="请输入发票金额"></Input>
                            </FormItem>
                        </Col> 
                        <Col span="6" v-show="batch">
                            <FormItem label="批号：" style="width:100%">
                                <Input v-model="Form1.batchNum" placeholder="请输入批号"></Input>
                            </FormItem>
                        </Col> 
                        <Col span="6" v-show="batch">
                            <FormItem label="付款日期：" style="width:100%">
                                <DatePicker v-model="Form1.batchDate" style="width:100%" placeholder="请输入付款日期"></DatePicker>
                            </FormItem>
                        </Col> 
                    </Row>
                    <Row>
                        <Button type="success" size="large" @click="Send">送件</Button>
                        <Button icon="ios-search" type="primary" size="large" @click="CheckCarFixSend" class="toolbar-btn">{{L('Find')}}</Button>
                    </Row>
                </Form>
                <!-- 维修 -->
                <div class="margin-top-10" v-show="carfixlist">
                    <Table ref="selection" :loading="loading" :columns="columns" :no-data-text="L('NoDatas')" border :data="Form1.Detaillist" @on-selection-change="CarFixSend">
                    </Table>
                    <Page  show-sizer class-name="fengpage" :total="totalCount" class="margin-top-10" @on-change="pageChange" @on-page-size-change="pagesizeChange" :page-size="pageSize" :current="currentPage"></Page>
                </div>
                <!-- 发票 -->
                <div class="margin-top-10" v-show="prinvlist">
                    <Table :columns="prinvcolumns" border :data="Form1.prinvDetail"></Table>
                </div>
                <!-- 批次 -->
                <div class="margin-top-10" v-show="carBatchlist">
                    <Table :columns="carBatchcolumns" border :data="Form1.carBatchDetail"></Table>
                </div>
            </div>
        </Card>
    </div>
</template>
<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '@/lib/util'
    import AbpBase from '@/lib/abpbase'
    import PageRequest from '@/store/entities/page-request'
    import InvDetail from './invdetail.vue'
    import Clasen from '../../../store/entities/car/clasen';
    import Inc from '../../../store/entities/public/inc';
    import CarFixBatchT from '../../../store/entities/carfix/carFixBatchT';
    import publicclass from '../../../lib/publicclass';
    import CarFix from '../../../store/entities/carfix/carFix';
    import CarFixBatch from '../../../store/entities/carfix/carFixBatch';
    import ReadyBPM from '../../../store/entities/public/readyBPM';
    import BPMFile from '../../../store/entities/public/BPMFile'
    
    class PageCarFixRequest extends PageRequest{
        maxResultCount=10000;
        skipCount=0;
        status:Array<number>=[];
        cdt=null;
        supplierAuto:number=null;
        id:number=null;
        carFixBatchAuto:number=null;
    }
    class PageSupplierRequest extends PageRequest{//厂商
        maxResultCount=10000
        skipCount=0
        supplierTypes:Array<number>;
    }
    class PagePRInvRequest extends PageRequest{//发票明细
        keyword:string='';
        invNo:string=null;
        amount=null;
        supplierAuto:number=null;
        prinvLinkAuto:number=null;
    }
    class PageCarFixBatchRequest extends PageRequest{//批次
        maxResultCount=10000
        skipCount=0
        carFixBatchTNO:number=null;
        payDt=null
        supplierAuto:number=null
    }
    class PageIncRequest extends PageRequest{
        maxResultCount=10000
        skipCount=0
    }
    class PageFileUploadRequest extends PageRequest{
        maxResultCount=10000
        skipCount=0
        docPostID:number=0;
    }
    class PagePRInvLinkRequest extends PageRequest{//维修记录和发票关联档
        maxResultCount=10000
        skipCount=0
        sourceAuto:number=0;
    }

    @Component({
        components:{InvDetail},
    })
    export default class CarFixs extends AbpBase{
       
        pagerequest:PageCarFixRequest=new PageCarFixRequest();
        pageSupplierRequest:PageSupplierRequest=new PageSupplierRequest();//厂商
        pagePRInvRequest:PagePRInvRequest=new PagePRInvRequest();//发票明细
        pageCarFixBatchRequest:PageCarFixBatchRequest=new PageCarFixBatchRequest();
        pageIncRequest:PageIncRequest=new PageIncRequest()
        pageFileUploadRequest:PageFileUploadRequest = new PageFileUploadRequest();//附件
        pagePRInvLinkRequest:PagePRInvLinkRequest = new PagePRInvLinkRequest();//维修记录和发票关联档
        manufacturer:any=null;//厂商
        maintain:boolean=true;//维修
        invoice:boolean=false;//发票
        batch:boolean=false;//批次
        newCarFixDetail:any=[];//自定义维修数组
        abb:any=["prinv"];//自定义发票数组名称
        batchNumber:number=0;//批号
        CHKCarFix:any=[];//选中送签的数据
        SumAmountAll:any=0;
        Prinvs:any=[];//发票
        CarFixBatChs:any=[];//批次
        loading:boolean=true;
        requisitionID:string='';

        carfixlist:boolean=true;//维修查询
        prinvlist:boolean=false;//发票查询
        carBatchlist:boolean=false;//批次查询

        async pageChange(page:number){
            this.$store.commit('carFix/setCurrentPage',page);
            this.getpage();
        }
        pagesizeChange(pagesize:number){
            this.$store.commit('carFix/setPageSize',pagesize);
            this.getpage();
        }
        async getpage(){
            this.loading=true;
            this.Form1.Detaillist=[];//维修list
            this.newCarFixDetail=[];//自定义维修数组
            this.pagerequest.maxResultCount=this.pageSize;
            this.pagerequest.skipCount=(this.currentPage-1)*this.pageSize;
            var clasenauto=0;
            var incauto=0;
            
            await this.$store.dispatch({
                type:'carFix/getAll',
                data:this.pagerequest
            }).then(res=>{
                 res.items.forEach(async (x) => {
                    if(x.carBase!=null){
                        clasenauto=x.carBase.clasenAuto;
                        incauto=x.carBase.incAuto;
                    }
                    else{
                        clasenauto=0;
                        incauto=0;
                    }
                    if(x.prInvLink.length>0){
                        await this.getClasenandInc(x,clasenauto,incauto,x.prInvLink[0].id,x.status)
                    }
                    else{
                        await this.getClasenandInc(x,clasenauto,incauto,0,x.status)
                    }
                        this.newCarFixDetail.push(x);
                });
            this.Form1.Detaillist=this.newCarFixDetail;
            })
            setTimeout(() => {
                this.loading=false;
            }, 5000);
        }
        get pageSize(){
            return this.$store.state.carFix.pageSize;
        }
        get totalCount(){
            return this.$store.state.carFix.totalCount;
        }
        get currentPage(){
            return this.$store.state.carFix.currentPage;
        }
        //厂商
        get ddlPRSupplierList(){
            return this.manufacturer;
        }
        async getList(){
            /**厂商 */
            this.pageSupplierRequest.supplierTypes=[2,3,4,6];
            await this.$store.dispatch({
                type:'supplier/getAll',
                data:this.pageSupplierRequest
            }).then(res=>{
                this.manufacturer=res.items;
            })
        }
        //维修
        columns=[{
            type: 'expand',
            width:50,
            align: 'center',
            fixed: 'left',
            tooltip:true,
            render: (h, params) => {
                console.log(params.row)
                return h(InvDetail, {
                    props: {
                        row: params.row
                    }
                })
            }
            },{
                type: 'selection',
                width:80,
                align: 'center',
                tooltip:true,
                fixed: 'left',
            },{
                title:'车牌号',
                width:150,
                align: 'center',
                tooltip:true,
                key:'makNo'
            },{
                title:'车型',
                width:150,
                align: 'center',
                tooltip:true,
                key:'clasenName'
            },{
                title:'维修日期',
                width:150,
                align: 'center',
                tooltip:true,
                render:(h:any,params:any)=>{
                    return h('span',new Date(params.row.fixDt).toLocaleDateString())
                }
            },{
                title:'维修里程',
                width:150,
                align: 'center',
                tooltip:true,
                key:'km'
            },{
                title:'维修类别',
                width:150,
                align: 'center',
                tooltip:true,
                render:(h:any,params:any)=>{
                    return h('span',params.row.itemCodeFixTypeData==null?'':params.row.itemCodeFixTypeData.itemName)
                }
            },{
                title:'实付金额',
                width:150,
                align: 'center',
                tooltip:true,
                key:'realAmount'
            },{
                title:'保养厂',
                width:150,
                align: 'center',
                tooltip:true,
                render:(h:any,params:any)=>{
                    return h('span',params.row.supplier==null?'':params.row.supplier.fname)
                }
            },{
                title:'公司别',
                width:150,
                align: 'center',
                tooltip:true,
                key:'incName'
            },{
                title:'发票号码',
                width:150,
                align: 'center',
                tooltip:true,
                render:(h:any,params:any)=>{
                    var invno='';
                    if(params.row.prinv!=undefined){
                        if(params.row.prinv.length>1){
                            params.row.prinv.forEach(x => {
                                invno+=(x.invNo+'/')
                            });
                            return h('span',invno)
                        }
                        else{
                            return h('span',params.row.prinv[0].invNo)
                        }
                    }
                }
            },{
                title:'批号',
                width:150,
                align: 'center',
                tooltip:true,
                key:'carFixBatchTno'
            },{
                title:'状态',
                width:150,
                align: 'center',
                tooltip:true,
                render:(h:any,params:any)=>{
                    return h('span',params.row.itemCodeStatusData==null?'':params.row.itemCodeStatusData.itemName)
                }
            },{
                title:'发票日期',
                width:150,
                align: 'center',
                tooltip:true,
                key:'invDt',
                render:(h:any,params:any)=>{
                    var invDt='';
                    if(params.row.prinv!=undefined){
                        if(params.row.prinv.length>1){
                            params.row.prinv.forEach(x => {
                                invDt+=(new Date(x.invDt).toLocaleDateString()+',')
                            });
                            return h('span',invDt)
                        }
                        else{
                            return h('span',new Date(params.row.prinv[0].invDt).toLocaleDateString())
                        }
                    }
                }
            },{
                title:'付款周期',
                width:150,
                align: 'center',
                tooltip:true,
                render:(h:any,params:any)=>{
                    var payMode='';
                    if(params.row.payMode==1){
                        payMode="月結每月"
                    }else if(params.row.payMode==2){
                        payMode="發票日"
                    }
                    return h('span',payMode)
                }
            }]
        //发票
        prinvcolumns=[{
                title:'发票代码',
                align: 'center',
                tooltip:true,
                key:'invCode'
            },{
                title:'发票号码',
                align: 'center',
                tooltip:true,
                key:'invNo'
            },{
                title:'发票日期',
                align: 'center',
                tooltip:true,
                render:(h:any,params:any)=>{
                    return h('span',new Date(params.row.invDt).toLocaleDateString())
                }
            },{
                title:'发票类别',
                align: 'center',
                tooltip:true,
                render:(h:any,params:any)=>{
                    var invType="";
                    if(params.row.invType==1){
                        invType="普票"
                    }else if(params.row.invType==2){
                        invType="增票"
                    }
                    return h('span',invType)
                }
            },{
                title:'发票金额',
                align: 'center',
                tooltip:true,
                key:'invRealAmt'
            },{
                title:'保养厂',
                align: 'center',
                tooltip:true,
                render:(h:any,params:any)=>{
                    return h('span',params.row.supplier==null?'':params.row.supplier.fname)
                }
            },{
                title:'公司别',
                align: 'center',
                tooltip:true,
                render:(h:any,params:any)=>{
                    return h('span',params.row.inc==null?'':params.row.inc.sname)
                }
            },{
                title:'批号',
                align: 'center',
                tooltip:true,
                key:'carFixBatchTNo'
            }]
        //批次
        carBatchcolumns=[{
            type: 'expand',
            width: 50,
            render: (h, params) => {
                return h(InvDetail, {
                    props: {
                        row: params.row
                    }
                })
            }
            },{
                title:'批号',
                width:150,
                tooltip:true,
                key:'carFixBatchTNO'
            },{
                title:'实付总额',
                width:150,
                tooltip:true,
                key:'totalAmt'
            },{
                title:'发票总额',
                width:150,
                tooltip:true,
                key:'linkAmt'
            },{
                title:'保养厂',
                width:150,
                tooltip:true,
                render:(h:any,params:any)=>{
                    return h('span',params.row.supplier==null?'':params.row.supplier.fname)
                }
            },{
                title:'公司别',
                width:150,
                tooltip:true,
                render:(h:any,params:any)=>{
                    return h('span',params.row.inc==null?'':params.row.inc.sname)
                }
            },{
                title:'状态',
                width:150,
                tooltip:true,
                key:'status',
                render:(h:any,params:any)=>{
                    var isTab='';
                    if(params.row.isTab==0){
                        isTab="未转"
                    }else if(params.row.isTab==5){
                        isTab="驳回"
                    }else if(params.row.isTab==1){
                        isTab="已转"
                    }
                    return h('span',isTab)
                }
            },{
                title:'付款状态',
                width:150,
                tooltip:true,
                render:(h:any,params:any)=>{
                    var IsPAy='';
                    if(params.row.isPAy==0){
                        IsPAy="未付"
                    }else if(params.row.isPAy==1){
                        IsPAy="已付"
                    }
                    return h('span',IsPAy)
                }
            },{
                title:'付款日期',
                width:150,
                tooltip:true,
                key:'payDT'
            },{
                title:'付款周期',
                width:150,
                tooltip:true,
                key:'payMode',
                render:(h:any,params:any)=>{
                    var payMode='';
                    if(params.row.payMode==1){
                        payMode="月結每月"
                    }else if(params.row.payMode==2){
                        payMode="發票日"
                    }
                    return h('span',payMode)
                }
            }]

        Form1={
            ddlPRSupplier:0,//厂商
            carFixstatus:'0',//维修状态
            carFixDate:"",//维修日期
            invNo:'',//发票号码
            invNumber:"",//发票金额
            batchNum:0,//批号
            batchDate:"",//付款日期
            itemCodekey:'1',

            Detaillist:[],//维修列表
            prinvDetail:[],//发票列表
            carBatchDetail:[],//批次列表
        }
        //查询
         CheckCarFixSend(){
            this.newCarFixDetail=[];
            
            if(this.Form1.itemCodekey=='1'){//维修
                //送件状态
                if(this.Form1.carFixstatus=='0'){//全部
                    this.pagerequest.status=[0,5,10,20,25];
                }
                else if(this.Form1.carFixstatus=='1'){//未送件
                    this.pagerequest.status=[0,5];
                }
                else if(this.Form1.carFixstatus=='2'){//已送件
                    this.pagerequest.status=[10,20,25];
                }
                if(this.Form1.ddlPRSupplier==0){
                    this.pagerequest.supplierAuto==null;
                }
                else{
                    this.pagerequest.supplierAuto=this.Form1.ddlPRSupplier;//厂商
                }
                this.pagerequest.cdt=this.Form1.carFixDate;//维修日期
                this.pagerequest.id=null;
                this.pagerequest.carFixBatchAuto=null;
                this.getpage();
                
                this.carfixlist=true;//维修查询
                this.prinvlist=false;//发票查询
                this.carBatchlist=false;//批次查询
            }
            else if(this.Form1.itemCodekey=='2'){//发票
                if(this.Form1.ddlPRSupplier==0){
                    this.pagePRInvRequest.supplierAuto=null;
                }
                else{
                    this.pagePRInvRequest.supplierAuto=this.Form1.ddlPRSupplier;
                }
                this.pagePRInvRequest.invNo=this.Form1.invNo;
                this.pagePRInvRequest.amount=this.Form1.invNumber;
                this.pagePRInvRequest.prinvLinkAuto=null;
                this.getPRinv();

                this.prinvlist=true;//发票查询
                this.carfixlist=false;//维修查询
                this.carBatchlist=false;//批次查询
            }
            else if(this.Form1.itemCodekey=='3'){//批次
                if(this.Form1.ddlPRSupplier==0){
                    this.pageCarFixBatchRequest.supplierAuto=null;
                }
                else{
                    this.pageCarFixBatchRequest.supplierAuto=this.Form1.ddlPRSupplier;
                }
                this.pageCarFixBatchRequest.carFixBatchTNO=this.Form1.batchNum;
                this.pageCarFixBatchRequest.payDt=this.Form1.batchDate;
                this.getCarFixBath();

                this.carBatchlist=true;//批次查询
                this.prinvlist=false;//发票查询
                this.carfixlist=false;//维修查询
            }
         }
        /**--- 根据发票查询---*/
         //获取发票
         async getPRinv(){
            this.Prinvs=[];
            await this.$store.dispatch({
                type:'prinv/getAll',
                data:this.pagePRInvRequest
            }).then(res=>{
                res.items.forEach(x => {
                    this.getCarBatchTNo(x,x.prInvLink.sourceAuto)
                    this.Prinvs.push(x);
                });
            })
            this.Form1.prinvDetail=this.Prinvs;
         }
         //获取批号
         async getCarBatchTNo(data,id){
            var carfix=new CarFix();
            carfix.id=id;
            await this.$store.dispatch({
                type:'carFix/get',
                data:carfix
            }).then(res=>{
                this.$set(data,'carFixBatchTNo',res.carFixBatchTno);
            })
         }
        /**--- 根据批次查询---*/ 
         //获取批次请款送件档
         async getCarFixBath(){
             this.CarFixBatChs=[];
            await this.$store.dispatch({
                type:'carFixBatch/getAll',
                data:this.pageCarFixBatchRequest
            }).then(res=>{
                res.items.forEach(x => {
                    this.getnewCarFix(x,x.id)//查询carfix
                    this.CarFixBatChs.push(x);
                });
            })
            this.Form1.carBatchDetail=this.CarFixBatChs;
         }
         //获取需要的数据
         async getnewCarFix(data,id){
            this.pagerequest.cdt=null;//维修日期
            this.pagerequest.supplierAuto=null;//厂商
            this.pagerequest.id=null;
            this.pagerequest.carFixBatchAuto=id;
            await this.$store.dispatch({
                type:'carFix/getAll',
                data:this.pagerequest
            }).then(res=>{
                 res.items.map(i=>{
                    if(i.prInvLink.length>0){
                        this.$set(data,'linkAmt',i.prInvLink[0].linkAmt);
                        this.getAllPRinv(data,i.prInvLink[0].id);//发票
                    }
                    else{
                        this.$set(data,'linkAmt',0);
                        this.getAllPRinv(data,0);//发票
                    }
                });
            })
         }
         //根据条件查询获取发票
         async getAllPRinv(data,id){
            var newprinvDetail=[]; 
            this.pagePRInvRequest.invNo=null;
            this.pagePRInvRequest.amount=null;
            this.pagePRInvRequest.supplierAuto=null;
            this.pagePRInvRequest.prinvLinkAuto=id;
             await this.$store.dispatch({
                type:'prinv/getAll',
                data:this.pagePRInvRequest
            }).then(res=>{
                res.items.forEach(x => {
                    newprinvDetail.push(x)
                    this.$set(data,this.abb,newprinvDetail);//插入发票到数组
                });
            })
         }
         //获取车型和公司名称
         async getClasenandInc(data,clasenid,incid,prinvLinkId,status){
            if(clasenid!=null&&clasenid!=0){
                var clas=new Clasen();
                clas.id=clasenid;
                await this.$store.dispatch({
                    type:'clasen/get',
                    data:clas
                }).then(res=>{
                    this.$set(data,'clasenName',res.clasenName);//插入车型到数组
                })
            }
            if(incid!=null&&incid!=0){
                await this.$store.dispatch({
                    type:'inc/getAll',
                    data:this.pageIncRequest
                }).then(res=>{
                    res.items.map(i=>{
                        if(incid==i.id){
                            var inc=new Inc();
                            inc.id=incid;
                            this.$store.dispatch({
                                type:'inc/get',
                                data:inc
                            }).then(res=>{
                                this.$set(data,'incName',res.sname);//插入公司名称到数组
                            })
                        }
                    })
                })
            }
            this.getAllPRinv(data,prinvLinkId);//发票
            //非暂存和驳回状态不可送件
            if(status!=0&&status!=5){
                this.$set(data,'_disabled',true);
            }

         }
        //选择状态
        ChangeCar(){
            if(this.Form1.itemCodekey=='1'){//维修
                this.maintain=true;
                this.invoice=false;
                this.batch=false;
            }
            else if(this.Form1.itemCodekey=='2'){//发票
                this.invoice=true;
                this.maintain=false;
                this.batch=false;
            }
            else if(this.Form1.itemCodekey=='3'){//批次
                this.batch=true;
                this.invoice=false;
                this.maintain=false;
            }
        }
        /**送件 */
         //点击checkbox时触发
         CarFixSend(data){
            this.SumAmountAll=0;//选中的数据总额
            this.CHKCarFix=data;//选中的数据
            data.forEach(x => {
                this.SumAmountAll+=x.realAmount;
            });
         }
         async Send(){
            if(this.CHKCarFix.length<1){
                this.$Message.warning('请勾选要送件的维修记录');
            }
            else{
                this.CHKCarFix.forEach(async (x) => {
                    this.pagePRInvLinkRequest.sourceAuto=x.id;
                    await this.$store.dispatch({
                        type:'prinvLink/getAll',
                        data:this.pagePRInvLinkRequest
                    }).then(res=>{
                        if(res.items.length>0){
                            this.SendSign(x);
                        }else{
                            this.$Notice.warning({
                                title: '发票关联不可为空,请去维修界面补充完整'
                            })
                        }
                    })
                });
            }
         }
        async SendSign(x){
            var MaxCarFixBatchTNO=0;//最大批号+1
            await this.$store.dispatch({
                type:'carFixBatchT/selectMaxCarFixBatchTNO',
                data:this.pageCarFixBatchRequest
            }).then(res=>{
                MaxCarFixBatchTNO=res+1;
            })
            var SumRealAmount=this.SumAmountAll;//获取选中的数据的总额之和
            var paymode=this.CHKCarFix[0].payMode;//获取付款周期
            //新增CarFixBatchT表
            var carFixBatcht=this.carFixBatchTtoData(MaxCarFixBatchTNO,SumRealAmount,paymode);//赋值
            await this.$store.dispatch({
                type:'carFixBatchT/create',
                data:carFixBatcht
            }).then(async (res)=>{
                this.batchNumber=res.carFixBatchTNO;//批号
                //修改CarFix
                //this.CHKCarFix.forEach(async (x) => {
                    //修改CarFix
                    await this.UpdateToCarFix(x,0);
                    //新增CarFix_Batch表
                    await this.CreateToCarFixBatch(x);
                    //送到BPM中签核
                    await this.createReadyBPM(x.id,x);
                });
            //});
            this.$Message.success('送件成功！');
            await this.getpage();
         }
        //送到BPM送签
        async createReadyBPM(id,data){
            var readyBPM=this.readyBPMToData(id); 
            await this.$store.dispatch({
                type:'readyBPM/create',
                data:readyBPM
            }).then(res=>{
                this.requisitionID=res.id;//requisitionID
                this.BPMFileUpload(res.id,data)//附件显示到BPM
            })
        }
        //附件上传到BPM中
        async BPMFileUpload(requisitionID,data){
            //根据交修Id查询附件
            this.pageFileUploadRequest.docPostID=data.carRepairAuto;
            await this.$store.dispatch({
                type:'fileUpload/getAll',
                data:this.pageFileUploadRequest
            }).then(res=>{
                if(res.items.length>0){
                    res.items.forEach(async (x)=>{
                        if(x.type==7){
                            var bpmFile=this.BPMFileToData(x,requisitionID); 
                            await this.$store.dispatch({
                                type:'fileUpload/SaveBPMFile',
                                data:bpmFile
                            })
                        }
                    })
                }
            })
        }
        //附件上传到BPM中赋值
        BPMFileToData(data,id){
            var bpmfile=new BPMFile();
            bpmfile.requisitionID=id;
            bpmfile.formName='CarFix';
            bpmfile.nFileName='carRepair'+'//'+data.oldFileName;
            bpmfile.oFileName=data.oldFileName;
            bpmfile.fileSize=data.fileSize;
            bpmfile.flowId='CarFixSend_Proc_001';
            return bpmfile;
        }
        //送到BPM送签赋值
        readyBPMToData(id){
            var readyBPM=new ReadyBPM(); 
            readyBPM.formName='CarFix';
            readyBPM.id=id;//送签表单ID
            readyBPM.flowId='CarFixSend_Proc_001';
            return readyBPM;
        }
        //修改CarFix表
         async UpdateToCarFix(data,id){
            var carfix=this.carFixtoData(data);
            carfix.carFixBatchTNO=this.batchNumber;//批号
            carfix.status=10;
            if(id!=0){
                carfix.carFixBatchAuto=id;//批次Auto值
            }
            await this.$store.dispatch({
                type:'carFix/update',
                data:carfix
            })
         }
        //新增CarFix_Batch表
         async CreateToCarFixBatch(data){
            var carfixbatch=this.carFixBatchtoData(data);
            carfixbatch.carFixBatchTNO=this.batchNumber;//批号
            await this.$store.dispatch({
                type:'carFixBatch/create',
                data:carfixbatch
            }).then(res=>{
                this.UpdateToCarFix(data,res.id);//修改CarFix表
            })
         }
        //维修实体赋值
         carFixtoData(data){
            var newdata=publicclass.DeepClone(data)
            var carFix=new CarFix();
            carFix.id=newdata.id;
            carFix.carBaseAuto=newdata.carBaseAuto;//车籍序號
            carFix.orderAuto=newdata.orderAuto;//契约编号
            carFix.supplierAuto=newdata.supplierAuto;//厂商编号
            carFix.carFixNo=newdata.carFixNo;//工单号码
            carFix.makNo=newdata.makNo;//车牌号码
            carFix.custName=newdata.custName;//交修人
            carFix.fixDT=newdata.fixDt;//进厂日期
            carFix.fixDTPre=newdata.fixDtpre;//预计完修日
            carFix.fixDTReal=newdata.fixDtreal;//实际完修日
            carFix.km=newdata.km;//维修里程
            carFix.fixType=newdata.fixType;//维修类别
            carFix.mainTainKM=newdata.km;//定保类別
            carFix.wHAmount=newdata.whamount;//工时费
            carFix.wHDisCount=newdata.whdisCount;//工时折扣
            carFix.itemAmount=newdata.itemAmount;//材料费
            carFix.itemDisCount=newdata.itemDisCount;//材料费折扣
            carFix.realAmount=newdata.realAmount;//实付金额
            carFix.status=newdata.status;//状态
            carFix.cuser=newdata.cuser;//建立人
            carFix.cdt=newdata.cdt;
            carFix.muser=newdata.muser;//修改人
            carFix.mdt=newdata.mdt;//修改時間
            carFix.accBankAuto=newdata.accBankAuto;//厂商账户明细序号
            carFix.carFixBatchAuto=newdata.carFixBatchAuto;//维修送件批次
            carFix.remark=newdata.remark;//备注
            carFix.carFixBatchTNO=newdata.carFixBatchTno;//批号
            carFix.payMode=newdata.payMode;//付款周期
            carFix.carRepairAuto=newdata.carRepairAuto;//交修编号
            carFix.nextMaintainKM=newdata.nextMaintainKm;//下次保养里程
            carFix.nextMaintainDT=newdata.nextMaintainDt;//下次保养日期
            carFix.preNextMaintainDT=newdata.preNextMaintainDt;//预估下次保养日期
            carFix.itemCodeFixType=newdata.itemCodeFixType;
            carFix.itemCodeStatus=newdata.itemCodeStatus;
            return carFix;
         }
        //CarFixBatchT表实体赋值
         carFixBatchTtoData(batnumber,amount,paymode){
            var carFixBatcht=new CarFixBatchT();
            carFixBatcht.id=0;
            carFixBatcht.carFixBatchTNO=batnumber;//批号
            carFixBatcht.amt=amount;//批次请款总额
            carFixBatcht.status=10;//转传票状态
            carFixBatcht.requestStatus=0;//请款状态（0：未审核；20：已审核）
            carFixBatcht.payMode=paymode;//付款周期
            carFixBatcht.isPAy=0;//是否付款
            carFixBatcht.pAyDT=null;//付款日期
            carFixBatcht.cuser=0;//建立人
            carFixBatcht.cdt=new Date();//建立時間
            carFixBatcht.muser=0;//修改人
            carFixBatcht.mdt=null;//修改时间
            return carFixBatcht;
         }
        //CarFix_Batch表实体赋值
         carFixBatchtoData(data){
            var newdata=publicclass.DeepClone(data)
            var carFixBatch=new CarFixBatch();
            carFixBatch.totalAmt=newdata.realAmount;
            carFixBatch.supplierAuto=newdata.supplierAuto;
            carFixBatch.incAuto=newdata.carBase.incAuto;	
            carFixBatch.status=10;
            carFixBatch.accBankAuto=newdata.accBankAuto;	
            carFixBatch.pAyDT=null;
            carFixBatch.isPAy=0;	
            carFixBatch.bankTab=0;	
            carFixBatch.cuser=0;	
            carFixBatch.cdt=new Date();	
            carFixBatch.muser=0;
            carFixBatch.mdt=null;	
            carFixBatch.requestStatus=0;	
            carFixBatch.accountName='';	
            carFixBatch.accountBank='';	
            carFixBatch.bankAccount='';	
            carFixBatch.bankType=0;	
            carFixBatch.isS=0;	
            carFixBatch.payMode=newdata.payMode;	
            carFixBatch.carFixBatchTNO=newdata.carFixBatchTno;
            carFixBatch.isTab=0;
            return carFixBatch;
         }
        async created(){
            await this.getpage();
            await this.getList();
        }
    }
    
</script>