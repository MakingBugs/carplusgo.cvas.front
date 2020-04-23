<template>
    <div>
        <Card dis-hover>
            <div class="page-body">
                <Form ref="queryForm" :label-width="80" label-position="left" inline>
                    <Row :gutter="16">
                        <Col span="6">
                            <FormItem label="查询条件:" style="width:100%">
                                <Select v-model="Form1.ddlCustQ" @on-change="ChangeCar">
                                    <Option value="1">车牌号</Option>
                                    <Option value="2">出险编号</Option>
                                    <Option value="3">保险单号</Option>
                                    <Option value="4">出险日期</Option>
                                    <Option value="5">转付日期</Option>
                                    <Option value="6">发动机号</Option>
                                    <Option value="7">车架号</Option>
                                </Select>
                            </FormItem>
                        </Col> 
                        <Col span="6">
                            <!-- <FormItem label="" style="width:100%"> -->
                                <Input v-show="seemakNo" v-model="Form1.makNo" style="width:80%" placeholder="请输入车牌号"></Input>
                                <Input v-show="seeCXLPNO" v-model="Form1.CXLPNO" style="width:80%" placeholder="请输入出险编号"></Input>
                                <Input v-show="seeinsureNo" v-model="Form1.insureNo" style="width:80%" placeholder="请输入保险单号"></Input>
                                <DatePicker v-show="seecaseTime" v-model="Form1.caseTime" format="yyyy/MM/dd" type="daterange" style="width:80%" placement="bottom-end" placeholder="请选择出险日期"></DatePicker>
                                <DatePicker v-show="seeZFDT" v-model="Form1.ZFDT" format="yyyy/MM/dd" type="daterange" style="width:80%" placement="bottom-end" placeholder="请选择转付日期"></DatePicker>
                                <Input v-show="seeengNo" v-model="Form1.engNo" style="width:80%" placeholder="请输入发动机号"></Input>
                                <Input v-show="seecarNo" v-model="Form1.carNo" style="width:80%" placeholder="请输入车架号"></Input>
                            <!-- </FormItem> -->
                        </Col> 
                        <Col span="6">
                            <FormItem label="案件类别:" style="width:100%">
                                <Select v-model="Form1.ddlCaseTypeQ">
                                    <Option v-for="item in ddlCaseTypeQList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                                </Select>
                            </FormItem>
                        </Col> 
                        <Col span="6">
                            <FormItem label="处理状态:" style="width:100%">
                                <Select v-model="Form1.ddlSearch">
                                    <Option v-for="item in ddlSearchList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Button icon="ios-search" type="primary" size="large" @click="CheckCXLP" class="toolbar-btn">{{L('Find')}}</Button>
                    </Row>
                </Form>
                <div class="margin-top-10">
                    <Table :loading="loading" :columns="columns" :no-data-text="L('NoDatas')" border :data="carinsuranceDetail"></Table>
                    <Page  show-sizer class-name="fengpage" :total="totalCount" class="margin-top-10" @on-change="pageChange" @on-page-size-change="pagesizeChange" :page-size="pageSize" :current="currentPage"></Page>
                </div>
            </div>
        </Card>
        <check-CXLPQ ref="cxlpDetail" v-model="checkModalShow"></check-CXLPQ>
        </Spin>
    </div>
</template>
<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '@/lib/util'
    import AbpBase from '@/lib/abpbase'
    import PageRequest from '@/store/entities/page-request'
    import CXLP from '../../../store/entities/carInsurance/cxlp';
    import Inc from '../../../store/entities/public/inc';
    import ReadyBPM from '../../../store/entities/public/readyBPM';
    import BPMFile from '../../../store/entities/public/BPMFile';
    import CheckCXLPQ from './check-CXLPQ.vue';
    import publicclass from '../../../lib/publicclass';
    
    class PageCXLPRequest extends PageRequest{
        maxResultCount=10000
        skipCount=0
        caseType:any=null;
        caseStatus:any=null;
        makNo:any=null;
        insureNo:any=null;
        cxlpno:any=null;
        caseTimeFrom:any=null;
        caseTimeTo:any=null;
        zhuanFuDTFrom:any=null;
        zhuanFuDTTo:any=null;
    }
    class PageItemCodeRequest extends PageRequest{
        maxResultCount=10000
        skipCount=0
        itemTypes:Array<number>
    }
    class PageCXLPFeeRequest extends PageRequest{
        maxResultCount=10000
        skipCount=0
        cxlpAuto:any=null;
    }
    class PageCXLPRecordRequest extends PageRequest{
        maxResultCount=10000
        skipCount=0
        cxlpAuto:any=null;
    }
    class PageIncRequest extends PageRequest{//公司别
        keyword:string='';
        from:Date;
        to:Date;
    }
    class PageCarBaseRequest extends PageRequest{//车籍
        keyword:string='';
        carNo:string=null;
        engNo:string=null;
    }
    class PageInsurancePolicyRequest extends PageRequest{
        carBaseIds:Array<any>;
        insurancePolicyType:any=null;
    }
    class PageCXLPPFDetailRequest extends PageRequest{
        maxResultCount=10000
        skipCount=0
        cxlpAuto:any=0;
    }
    class PageCXLPMaterialRequest extends PageRequest{
        maxResultCount=10000
        skipCount=0
        cxlpAuto:number=null;
        cxlpMaterialType:number=null;
    }
    
    @Component({
        components:{CheckCXLPQ}
    })
    export default class CXLPQ extends AbpBase{
        pagerequest:PageCXLPRequest=new PageCXLPRequest();
        pageItemCodeRequest:PageItemCodeRequest=new PageItemCodeRequest();//类别明细
        pageCXLPFeeRequest:PageCXLPFeeRequest=new PageCXLPFeeRequest();//赔付明细
        pageCXLPRecordRequest:PageCXLPRecordRequest=new PageCXLPRecordRequest();//处理进度
        pageIncRequest:PageIncRequest=new PageIncRequest();//公司别
        pageCarBaseRequest:PageCarBaseRequest = new PageCarBaseRequest();//车籍
        pageInsurancePolicyRequest:PageInsurancePolicyRequest=new PageInsurancePolicyRequest();
        pageCXLPPFDetailRequest:PageCXLPPFDetailRequest=new PageCXLPPFDetailRequest();//赔付账户明细
        pageCXLPMaterialRequest:PageCXLPMaterialRequest = new PageCXLPMaterialRequest();//附件
        checkModalShow:boolean=false;
        carinsuranceDetail:any=[];
        cxlpDetail:any=[];
        seemakNo:boolean=true;
        seeCXLPNO:boolean=false;
        seeinsureNo:boolean=false;
        seecaseTime:boolean=false;
        seeZFDT:boolean=false;
        seeengNo:boolean=false;
        seecarNo:boolean=false;
        loading:boolean=true;

        check(){
            this.checkModalShow=true;
        }
        pageChange(page:number){
            this.$store.commit('cxlp/setCurrentPage',page);
            this.getpage();
        }
        pagesizeChange(pagesize:number){
            this.$store.commit('cxlp/setPageSize',pagesize);
            this.getpage();
        }
        async getpage(){
            this.loading=true;
            this.cxlpDetail=[];
            this.pagerequest.maxResultCount=this.pageSize;
            this.pagerequest.skipCount=(this.currentPage-1)*this.pageSize;

            await this.$store.dispatch({
                type:'cxlp/getAll',
                data:this.pagerequest
            }).then(res=>{
                if(res.items.length>0){
                    res.items.forEach(async (x)=>{
                        if(x.carBase!=null){
                            await this.getIncName(x,x.carBase.incAuto);//获取公司名
                        }
                        await this.getToAmount(x,x.id);//获取总金额和承办人
                        if(x.carBaseAuto!=undefined){
                            await this.getInsureName(x,x.carBaseAuto);//获取交强险、商业险公司
                        }
                        this.cxlpDetail.push(x);
                    })
                    this.carinsuranceDetail=this.cxlpDetail;
                }else{
                    this.carinsuranceDetail=[];
                }
            })
            setTimeout(() => {
                this.loading=false;
            }, 5000);
        }
        get pageSize(){
            return this.$store.state.cxlp.pageSize;
        }
        get totalCount(){
            return this.$store.state.cxlp.totalCount;
        }
        get currentPage(){
            return this.$store.state.cxlp.currentPage;
        }
        get ddlCaseTypeQList(){
            return this.Form1.CaseTypeQ;
        }
        get ddlSearchList(){
            return this.Form1.Search;
        }
        async getList(){
            //案件类别
            this.pageItemCodeRequest.itemTypes = [1309];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                this.Form1.CaseTypeQ = res.items
            })
            //理赔处理状态
            this.pageItemCodeRequest.itemTypes = [848];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                this.Form1.Search = res.items
            })
        }
        //获取交强险、商业险公司
        async getInsureName(data,carid){
            var pageInsurancePolicyRequest = new PageInsurancePolicyRequest();
            if(carid!=undefined){
                pageInsurancePolicyRequest.carBaseIds=[carid];
            }
            await this.$store.dispatch({
                type:'insurancePolicy/getAll',
                data:pageInsurancePolicyRequest
            }).then(res=>{
                var a=[];
                var b=[];
                res.items.map(i=>{
                    if(i.insurancePolicyStatus!=-10&&i.insurancePolicyType>0){
                        a.push(i);
                        this.$set(data,'insureDName',a[0].supplier.sname);//商业险承保公司 只取第一条
                        this.$set(data,'insureDNo',a[0].insuranceNum);//商业险保单号
                    }
                    if(i.insurancePolicyType==0){
                        //交强险承保公司
                        b.push(i);
                        this.$set(data,'insureName',b[0].supplier.sname);
                        this.$set(data,'insureNo',b[0].insuranceNum);
                    }
                })
            })
        }
        //获取总金额和承办人
        async getToAmount(data,id){
            if(id!=0){
                //获取金额
                var pageCXLPFeeRequest=new PageCXLPFeeRequest();
                var sum=0;
                pageCXLPFeeRequest.cxlpAuto=id;
                await this.$store.dispatch({
                    type:'cxlpFee/getAll',
                    data:pageCXLPFeeRequest
                }).then(res=>{
                    if(res.items.length>0){
                        res.items.forEach(x => {
                            sum+=x.feeAmount;
                        });
                        this.$set(data,'totalAmt',sum);
                    }
                })
                //获取承办人
                var pageCXLPRecordRequest= new PageCXLPRecordRequest();
                pageCXLPRecordRequest.cxlpAuto=id;
                await this.$store.dispatch({
                    type:'cxlpRecord/getAll',
                    data:pageCXLPRecordRequest
                }).then(res=>{
                    res.items.forEach(i=>{
                        if(i.contractorsItemCode!=null){
                            this.$set(data,'CBP',i.contractorsItemCode.itemName);
                        }
                    })
                })
            }
        }
        //获取公司名称
        async getIncName(data,id){
            await this.$store.dispatch({
                    type:'inc/getAll',
                    data:this.pageIncRequest
                }).then(res=>{
                    res.items.map(i=>{
                        if(id==i.id){
                            var inc=new Inc();
                            inc.id=id;
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
        //查询
        async CheckCXLP(){
            this.pagerequest.caseType=this.Form1.ddlCaseTypeQ;//案件类别
            this.pagerequest.caseStatus=this.Form1.ddlSearch;//处理状态
            if(this.Form1.ddlCustQ=='1'){//车牌号
                this.Form1.CXLPNO='';
                this.Form1.insureNo='';
                this.Form1.caseTime='';
                this.Form1.ZFDT='';
                this.Form1.engNo='';
                this.Form1.carNo='';
                this.pagerequest.makNo=this.Form1.makNo;
                await this.getpage();
            }
            if(this.Form1.ddlCustQ=='2'){//出险编号
                this.Form1.makNo='';
                this.Form1.insureNo='';
                this.Form1.caseTime='';
                this.Form1.ZFDT='';
                this.Form1.engNo='';
                this.Form1.carNo='';
                this.pagerequest.cxlpno=this.Form1.CXLPNO;
                await this.getpage();
            }
            if(this.Form1.ddlCustQ=='3'){//保险单号
                this.Form1.makNo='';
                this.Form1.CXLPNO='';
                this.Form1.caseTime='';
                this.Form1.ZFDT='';
                this.Form1.engNo='';
                this.Form1.carNo='';
                this.pagerequest.insureNo=this.Form1.insureNo;
                await this.getpage();
            }
            if(this.Form1.ddlCustQ=='4'){//出险日期 查区间
                this.Form1.makNo='';
                this.Form1.CXLPNO='';
                this.Form1.insureNo='';
                this.Form1.ZFDT='';
                this.Form1.engNo='';
                this.Form1.carNo='';
                if(this.Form1.caseTime.length>0) {
                    this.pagerequest.caseTimeFrom=this.Form1.caseTime[0];
                }
                if(this.Form1.caseTime.length>1) {
                    this.pagerequest.caseTimeTo=this.Form1.caseTime[1];
                }
                await this.getpage();
            }
            if(this.Form1.ddlCustQ=='5'){//转付日期 查区间
                this.Form1.makNo='';
                this.Form1.CXLPNO='';
                this.Form1.insureNo='';
                this.Form1.caseTime='';
                this.Form1.engNo='';
                this.Form1.carNo='';
                if(this.Form1.ZFDT.length>0) {
                    this.pagerequest.zhuanFuDTFrom=this.Form1.ZFDT[0];
                }
                if(this.Form1.ZFDT.length>1) {
                    this.pagerequest.zhuanFuDTTo=this.Form1.ZFDT[1];
                }
                await this.getpage();
            }
            if(this.Form1.ddlCustQ=='6'){//发动机号
                this.Form1.makNo='';
                this.Form1.CXLPNO='';
                this.Form1.insureNo='';
                this.Form1.caseTime='';
                this.Form1.ZFDT='';
                this.Form1.carNo='';
                this.pageCarBaseRequest.engNo=this.Form1.engNo;
                this.pageCarBaseRequest.carNo=null;
                await this.getCarBase();
            }
            if(this.Form1.ddlCustQ=='7'){//车架号
                this.Form1.makNo='';
                this.Form1.CXLPNO='';
                this.Form1.insureNo='';
                this.Form1.caseTime='';
                this.Form1.ZFDT='';
                this.Form1.engNo='';
                this.pageCarBaseRequest.carNo=this.Form1.carNo;
                this.pageCarBaseRequest.engNo=null;
                await this.getCarBase();
            }
        }
        //查车籍表
        async getCarBase(){
            await this.$store.dispatch({
                type:'carbase/SelectCarBase',
                data:this.pageCarBaseRequest
            }).then(res=>{
                res.items.map(async(i)=>{
                    this.pagerequest.makNo=i.makNo;
                    await this.getpage();
                })
            })
        }
        Form1={
            ddlCustQ:'1',//查询条件
            ddlCaseTypeQ:0,//案件类别
            ddlSearch:1,//理赔处理状态
            makNo:'',//车牌号
            CXLPNO:null,//出险编号
            insureNo:null,//保险单号
            caseTime:null,//出险日期
            ZFDT:null,//转付日期
            engNo:'',//发动机号
            carNo:'',//车架号
            CaseTypeQ:[],//案件类别
            Search:[]
        }
        columns=[{
                title:this.L('车牌号'),
                key:'makNo',
                width:150,
                align: 'center',
                tooltip:true,
            },{
                title:this.L('公司别'),
                key:'incName',
                width:150,
                align: 'center',
                tooltip:true,
            },{
                title:this.L('出险编号'),
                key:'cxlpno',
                width:150,
                align: 'center',
                tooltip:true,
            },{
                title:this.L('交强险承保公司'),
                key:'insureName',
                width:150,
                align: 'center',
                tooltip:true,
            },{
                title:this.L('商业险承保公司'),
                key:'insureDName',
                width:150,
                align: 'center',
                tooltip:true,
            },{
                title:this.L('事故类型'),
                width:150,
                align: 'center',
                tooltip:true,
                render:(h:any,params:any)=>{
                    var AccidentTypeDesc='';
                    if(params.row.accidentType==1){
                        AccidentTypeDesc='单方';
                    }else if(params.row.accidentType==2){
                        AccidentTypeDesc='多方';
                    }else{
                        AccidentTypeDesc='';
                    }
                    return h('span',AccidentTypeDesc);
                }
            },{
                title:this.L('总金额'),
                key:'totalAmt',
                width:150,
                align: 'center',
                tooltip:true,
            },{
                title:this.L('处理状态'),
                width:150,
                align: 'center',
                tooltip:true,
                render:(h:any,params:any)=>{
                    var CaseStatusDesc=null;
                    if(params.row.caseStatusItemCode!=null){
                        CaseStatusDesc=params.row.caseStatusItemCode.itemName;
                    }else{
                        CaseStatusDesc='';
                    }
                    return h('span',CaseStatusDesc);
                }
            },{
                title:this.L('案件状态'),
                width:150,
                align: 'center',
                tooltip:true,
                render:(h:any,params:any)=>{
                    var statusD=null;
                    switch (params.row.status) {
                        case 0:
                            statusD='暂存'
                            break;
                        case 10:
                            statusD='送件'
                            break;
                        case 20:
                            statusD='核准'
                            break;
                        case 5:
                            statusD='驳回'
                            break;
                        default:
                            statusD=''
                            break;
                    }
                    return h('span',statusD);
                }
            },{
                title:this.L('承办人'),
                key:'CBP',
                width:150,
                align: 'center',
                tooltip:true,
            },{
                title:this.L('赔付备注'),
                key:'dzpfRemark',
                width:150,
                align: 'center',
                tooltip:true,
            },{
                title:this.L('结案天数'),
                width:150,
                align: 'center',
                tooltip:true,
                render:(h:any,params:any)=>{
                    var endday=null;
                    if(params.row.caseStatus==4){//结案  sdt送件时间 endDT结案日期
                        var date1 = new Date(Date.parse(params.row.endDT.replace("/")));
                        var date2 = new Date(Date.parse(params.row.sdt.replace("/")));
                        var iDays = Number(Math.abs(date2.getTime()- date1.getTime()) /1000/60/60/24); 
                        endday=iDays;
                    }else{
                        endday='';
                    }
                    return h('span',endday);
                }
            },{
                title:this.L('请款状态'),
                width:150,
                align: 'center',
                tooltip:true,
                render:(h:any,params:any)=>{
                    var requestStatusD=null;
                    switch (params.row.requestStatus) {
                        case 0:
                            requestStatusD='未请款'
                            break;
                        case 10:
                            requestStatusD='请款审核中'
                            break;
                        case 20:
                            requestStatusD='请款核准'
                            break;
                        case 5:
                            requestStatusD='请款驳回'
                            break;
                        default:
                            requestStatusD=''
                            break;
                    }
                    return h('span',requestStatusD)
                }
            },{
                title:this.L('Actions'),
                key:'Actions',
                width:150,
                align: 'center',
                fixed: 'right',
                render:(h:any,params:any)=>{
                    return h('div',[
                        h('Button',{
                            props:{
                                type:'primary',
                                size:'small'
                            },
                            style:{
                                marginRight:'5px'
                            },
                            on:{
                                click:()=>{
                                    this.check();
                                    (this.$refs.cxlpDetail as any).SetData(publicclass.DeepClone(params.row),params.index);//传值
                                }
                            }
                        },this.L('查看'))
                    ])
                }
            }]
   
        //赋值
        CXLPToData(data){
            var cxlp=new CXLP();
            cxlp.id=data.id;
            cxlp.cxlpNO=data.cxlpno;
            cxlp.makNO=data.makNo;	        
            cxlp.caseTime=data.caseTime;	        
            cxlp.caseAddr=data.caseAddr;	    
            cxlp.driver=data.driver;	        
            cxlp.reporter=data.reporter;	    
            cxlp.phone1=data.phone1;	        
            cxlp.phone2=data.phone2;	        
            cxlp.lossValue=data.lossValue;	    
            cxlp.lossOtherRemark=data.lossOtherRemark;	
            cxlp.caseType=data.caseType;	    
            cxlp.caseStatus=data.caseStatus;	    
            cxlp.insureNo=data.insureNo;
            cxlp.accidentType=data.accidentType;	
            cxlp.isInjured=data.isInjured;	    
            cxlp.qjdbRemark=data.qjdbRemark;	    
            cxlp.suser=data.sUser;	        
            cxlp.sdt=data.sdt;	            
            cxlp.sRemark=data.sRemark;	        
            cxlp.accountName=data.accountName;	    
            cxlp.acountBank=data.acountBank;	    
            cxlp.bankAccount=data.bankAccount;	    
            cxlp.zfContractors=data.zfContractors;	
            cxlp.zfdt=data.zfdt;	            
            cxlp.causeType=data.causeType;	    
            cxlp.jfNeedFile=data.jfNeedFile;	    
            cxlp.jfMakeFile=data.jfMakeFile;	    
            cxlp.jfNeedFileNum=data.jfNeedFileNum;	
            cxlp.jfMakeFileNum=data.jfMakeFileNum;	
            cxlp.wfNeedFile=data.wfNeedFile;	    
            cxlp.wfMakeFile=data.wfMakeFile;	    
            cxlp.wfNeedFileNum=data.wfNeedFileNum;	
            cxlp.wfMakeFileNum=data.wfMakeFileNum;	
            cxlp.tijiaoren=data.tijiaoren;	    
            cxlp.tijiaoDT=data.tijiaoDt;	        
            cxlp.jieshouren=data.jieshouren;	    
            cxlp.jieshouDT=data.jieshouDt;	        
            cxlp.insurePFAmount=data.insurePFAmount;	
            cxlp.insureDPFAmount=data.insureDPFamount;	
            cxlp.sspfRemark=data.sspfRemark;
            cxlp.insureDZAmount=data.insureDZAmount;	
            cxlp.insureDZDT=data.insureDZDT;	    
            cxlp.insureDZAccount=data.insureDZAccount;	
            cxlp.insureDDZAmount=data.insureDDZAmount;	
            cxlp.insureDDZDT=data.insureDDZDT;	    
            cxlp.insureDDZAccount=data.insureDDZAccount;
            cxlp.dzfpfAmount=data.dzfpfAmount;	    
            cxlp.dzfpfDT=data.dzfpfdt;	        
            cxlp.dzpfRemark=data.dzpfRemark;	    
            cxlp.querenAmount=data.querenAmount;	
            cxlp.daoZhangDT=data.daoZhangDT;	    
            cxlp.zhuanFuType=data.zhuanFuType;	    
            cxlp.zhuanFuDT=data.zhuanFuDT;	        
            cxlp.shouKuanRen=data.shouKuanRen;	    
            cxlp.shouKuanRenID=data.shouKuanRenID;	
            cxlp.shouKuanFang=data.shouKuanFang;	
            cxlp.shouKuanBank=data.shouKuanBank;	
            cxlp.shouKuanAccount=data.shouKuanAccount;	
            cxlp.status=data.status;	        
            cxlp.cuser=data.cUser;	        
            cxlp.cdt=data.cdt;	            
            cxlp.muser=data.mUser;	        
            cxlp.mdt=data.mdt;	            
            cxlp.yiJueDT=data.yiJueDt;	        
            cxlp.tjclFile=data.tjclFile;	    
            cxlp.tjclNum=data.tjclNum;	        
            cxlp.qjdbFile=data.qjdbFile;	    
            cxlp.qjdbNum=data.qjdbNum;	        
            cxlp.hh=data.hh;	            
            cxlp.mm=data.mm;	            
            cxlp.wfPercent=data.wfPercent;	    
            cxlp.orderauto=data.orderAuto;	    
            cxlp.endDT=data.endDT;	            
            cxlp.insureAuto=data.insureAuto;	    
            cxlp.carBaseAuto=data.carBaseAuto;	    
            cxlp.requestStatus=10;	
            cxlp.requestDT=new Date();	        
            cxlp.requestUser=data.requestUser;	    
            cxlp.isTrn=data.isTrn;	        
            cxlp.lossValueN=data.lossValueN
            cxlp.csic=848;
            cxlp.ctic=1309;
            return cxlp;
        }
        //查询条件选择
        ChangeCar(){
            switch (this.Form1.ddlCustQ) {
                case '1'://车号
                    this.seemakNo=true;
                    this.seeCXLPNO=false;
                    this.seeinsureNo=false;
                    this.seecaseTime=false;
                    this.seeZFDT=false;
                    this.seeengNo=false;
                    this.seecarNo=false;
                    break;
                case '2'://出险编号
                    this.seemakNo=false;
                    this.seeCXLPNO=true;
                    this.seeinsureNo=false;
                    this.seecaseTime=false;
                    this.seeZFDT=false;
                    this.seeengNo=false;
                    this.seecarNo=false;
                    break;
                case '3'://保险单号
                    this.seemakNo=false;
                    this.seeCXLPNO=false;
                    this.seeinsureNo=true;
                    this.seecaseTime=false;
                    this.seeZFDT=false;
                    this.seeengNo=false;
                    this.seecarNo=false;
                    break;
                case '4'://出险日期
                    this.seemakNo=false;
                    this.seeCXLPNO=false;
                    this.seeinsureNo=false;
                    this.seecaseTime=true;
                    this.seeZFDT=false;
                    this.seeengNo=false;
                    this.seecarNo=false;
                    break;
                case '5'://转付日期
                    this.seemakNo=false;
                    this.seeCXLPNO=false;
                    this.seeinsureNo=false;
                    this.seecaseTime=false;
                    this.seeZFDT=true;
                    this.seeengNo=false;
                    this.seecarNo=false;
                    break;
                case '6'://发动机号
                    this.seemakNo=false;
                    this.seeCXLPNO=false;
                    this.seeinsureNo=false;
                    this.seecaseTime=false;
                    this.seeZFDT=false;
                    this.seeengNo=true;
                    this.seecarNo=false;
                    break;
                case '7'://车架号
                    this.seemakNo=false;
                    this.seeCXLPNO=false;
                    this.seeinsureNo=false;
                    this.seecaseTime=false;
                    this.seeZFDT=false;
                    this.seeengNo=false;
                    this.seecarNo=true;
                    break;
                default:
                    break;
            }
        }
        async created(){
            this.getpage();
            this.getList(); 
        }
    }
    
</script>
