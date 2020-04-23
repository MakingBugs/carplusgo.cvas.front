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
                                    <Option value="2">出险日期</Option>
                                </Select>
                            </FormItem>
                        </Col> 
                        <Col span="6">
                            <Input v-show="seemakNo" v-model="Form1.makNo" style="width:80%" placeholder="请输入车牌号"></Input>
                            <!-- <DatePicker v-show="seecaseTime" v-model="Form1.caseTime" format="yyyy/MM/dd" type="daterange" style="width:80%" placement="bottom-end" placeholder="请选择出险日期"></DatePicker> -->
                            <Date-picker v-show="seecaseTime" v-model="caseTime" type="daterange" format="yyyy/MM/dd" style="width:100%" placement="bottom-end" placeholder="选择日期范围"></Date-picker>
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
                        <Button icon="ios-search" type="primary" size="large" @click="SearchCXLP" class="toolbar-btn">{{L('Find')}}</Button>
                    </Row>
                </Form>
                <div class="margin-top-10">
                    <Table :loading="loading" :columns="columns" :no-data-text="L('NoDatas')" border :data="carinsuranceDetail">
                    </Table>
                    <Page  show-sizer class-name="fengpage" :total="totalCount" class="margin-top-10" @on-change="pageChange" @on-page-size-change="pagesizeChange" :page-size="pageSize" :current="currentPage"></Page>
                </div>
            </div>
        </Card>
        <check-CXLPQuery ref="cxlpDetail" v-model="checkModalShow"></check-CXLPQuery>
    </div>
</template>
<script lang="ts">
import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
import Util from '@/lib/util'
import AbpBase from '@/lib/abpbase'
import PageRequest from '@/store/entities/page-request'
import CheckCXLPQuery from './check-CXLPQuery.vue'
import publicclass from '../../../lib/publicclass';
import Clasen from '../../../store/entities/car/clasen';

class PageCXLPRequest extends PageRequest{
    maxResultCount=10000
    skipCount=0
    caseStatus:any=null;
    makNo:any=null;
    caseTimeFrom:Date;
    caseTimeTo:Date;
}
class PageItemCodeRequest extends PageRequest{
    maxResultCount=10000
    skipCount=0
    itemTypes:Array<number>
}
class PageCXLPRecordRequest extends PageRequest{
    maxResultCount=10000
    skipCount=0
    cxlpAuto:any=null;
}
class PageCXLPFeeRequest extends PageRequest{
    maxResultCount=10000
    skipCount=0
    cxlpAuto:any=null;
}

@Component({
        components:{CheckCXLPQuery}
    })
    export default class CXLPQuery extends AbpBase{
        pagerequest:PageCXLPRequest=new PageCXLPRequest();
        pageItemCodeRequest:PageItemCodeRequest=new PageItemCodeRequest();//类别明细
        pageCXLPRecordRequest:PageCXLPRecordRequest=new PageCXLPRecordRequest();//处理进度
        pageCXLPFeeRequest:PageCXLPFeeRequest=new PageCXLPFeeRequest();//赔付明细
        checkModalShow:boolean=false;
        seemakNo:boolean=true;//车牌号
        seecaseTime:boolean=false;//出险日期
        carinsuranceDetail:any=[];//list
        cxlpDetail:any=[];
        caseTime:Date[]=[];
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
                            await this.getClasenName(x.carBase.clasenAuto,x);//获取车型
                        }
                        await this.getToAmount(x,x.id);//获取总金额和承办人
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
        get ddlSearchList(){
            return this.Form1.Search;
        }
        async getList(){
            //理赔处理状态
            this.pageItemCodeRequest.itemTypes = [848];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                this.Form1.Search = res.items
            })
        }
        //获取车型
        async getClasenName(clasenid,data){
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
        Form1={
            ddlCustQ:'1',//查询条件
            makNo:'',//车号
            caseTime:null,//出险日期
            ddlSearch:1,//处理状态
            Search:[],//处理状态list
        }
        columns=[{
                title:'序号',
                key:'id',
                align: 'center',
                tooltip:true,
            },{
                title:'车牌号',
                key:'makNo',
                align: 'center',
                tooltip:true,
            },{
                title:'车型',
                key:'clasenName',
                align: 'center',
                tooltip:true,
            },{
                title:'出险时间',
                key:'caseTime',
                align: 'center',
                tooltip:true,
                render:(h:any,params:any)=>{
                    return h('span',params.row.caseTime=='1900-01-01T00:00:00'?'':new Date(params.row.caseTime).toLocaleDateString())
                }
            },{
                title:'事故类型',
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
                title:'总金额',
                key:'totalAmt',
                align: 'center',
                tooltip:true,
            },{
                title:'案件状态',
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
                title:'承办人',
                key:'CBP',
                align: 'center',
                tooltip:true,
            },{
                title:this.L('Actions'),
                key:'Actions',
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
                        },this.L('理赔进度'))
                    ])
                }
            }]
        //查询条件选择
        ChangeCar(){
            switch (this.Form1.ddlCustQ) {
                case '1'://车号
                    this.seemakNo=true;
                    this.seecaseTime=false;
                    this.Form1.caseTime=null;
                    break;
                case '2'://出险日期
                    this.seemakNo=false;
                    this.seecaseTime=true;
                    this.Form1.makNo=null;
                    break;
                default:
                    break;
            }
        }
        //依条件查询列表
        SearchCXLP(){
            if(this.Form1.ddlSearch!=0){
                this.pagerequest.caseStatus=this.Form1.ddlSearch;
            }
            if(this.Form1.makNo!=''){
                this.pagerequest.makNo=this.Form1.makNo;
            }else{
                this.pagerequest.makNo=null;
            }
            if(this.caseTime.length>0) {
                this.pagerequest.caseTimeFrom=this.caseTime[0];
            }
            if(this.caseTime.length>1) {
                this.pagerequest.caseTimeTo=this.caseTime[1];
            }
            this.getpage();
        }
        created(){
            this.getpage();
            this.getList();
        }
    }
</script>