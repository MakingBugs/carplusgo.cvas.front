<template>
    <div>
        <Card dis-hover>
            <div class="page-body">
                <Form :label-width="80" :model="Form1" inline>
                    <Row :gutter="16">
                        <Col span="6">
                            <FormItem :label="L('公司别')+':'" style="width:100%" prop="incName">
                                <Select :placeholder="L('Select')" v-model="Form1.incName" :loading="loadingIncList">
                                    <Option v-for="item in incList" :value="item.id" :key="item.id">{{ item.sname }}</Option>
                                </Select>
                            </FormItem>
                        </Col> 
                        <Col span="6">
                            <FormItem label="车号" style="width:100%">
                                <Input v-model="Form1.makNO" :placeholder="L('请输入车号')"></Input>
                            </FormItem>
                        </Col> 
                    </Row>
                    <Row>
                        <Button @click="create" icon="android-add" type="primary" size="large">{{L('Add')}}</Button>
                        <Button icon="ios-search" type="primary" size="large" @click="checkCar" class="toolbar-btn">{{L('Find')}}</Button>
                    </Row>
                </Form>
                <div class="margin-top-10">
                    <Table :columns="columns" :no-data-text="L('NoDatas')" border :data="Form1.carRepairlist">
                    </Table>
                   <Page show-sizer class-name="fengpage" :total="totalCount" class="margin-top-10" @on-change="pageChange" @on-page-size-change="pagesizeChange" :page-size="pageSize" :current="currentPage"></Page>
                </div>
            </div>
        </Card>
        <!-- 待完工交修单 -->
        <card>
            <div class="margin-top-10">
                <p><h3 style="color:red;text-align:center">待完工交修单</h3></p>
                <Table :columns="carRepaircolumns" :loading="loadingcar" :data="waitcarRepairlist" border></Table>
             </div>
        </card>
        <create-carRepair  v-model="createModalShow" @save-success="CheckList"></create-carRepair>
        <edit-carRepair :information="newlist" v-model="editModalShow" @save-success="CheckList"></edit-carRepair>
    </div>
</template>
<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '@/lib/util'
    import AbpBase from '@/lib/abpbase'
    import PageRequest from '@/store/entities/page-request'
    import CreateCarRepair from './create-carRepair.vue'
    import EditCarRepair from './edit-carRepair.vue'
    import carRepair from '@/store/entities/carfix/carRepair'
    
    class PageCarRepairRequest extends PageRequest{
        keyword:string='';
        carBaseAuto:number=null;
        status:number=null;
    }
    class PageIncRequest extends PageRequest{
        keyword:string='';
        from:Date;
        to:Date;
    }
    class PageCarBaseRequest extends PageRequest{
        maxResultCount=10000
        skipCount=0
        makNo:string;
    }
    class PageClasenRequest extends PageRequest{//车型
        maxResultCount=10000
        skipCount=0
    }

    @Component({
        components:{CreateCarRepair,EditCarRepair}
    })
    export default class CarRepairs extends AbpBase{
        edit(a){
            this.editModalShow=true;
            this.newlist=a;
        }
        carRepair:carRepair=new carRepair();
        pagerequest:PageCarRepairRequest=new PageCarRepairRequest();
        pageIncRequest:PageIncRequest=new PageIncRequest();
        pageCarBaseRequest:PageCarBaseRequest = new PageCarBaseRequest();
        pageClasenRequest:PageClasenRequest=new PageClasenRequest();//车型
        createModalShow:boolean=false;
        editModalShow:boolean=false;
        newlist:object=null;//传值给子页面
        incType:any=null;//公司别
        carbaseAuto:any=0;//车籍号
        statusN:any="";//状态名
        waitcarRepairlist:any=[];//待完工交修单
        loadingcar:boolean=true;
        
        create(){
            this.createModalShow=true;
        }
        pageChange(page:number){
            this.$store.commit('carRepair/setCurrentPage',page);
            this.getpage();
        }
        pagesizeChange(pagesize:number){
            this.$store.commit('carRepair/setPageSize',pagesize);
            this.getpage();
        }
        async getpage(){
            this.pagerequest.maxResultCount=this.pageSize;
            this.pagerequest.skipCount=(this.currentPage-1)*this.pageSize;
            await this.$store.dispatch({
                type:'carRepair/getAll',
                data:this.pagerequest
            }).then(res =>{
                this.Form1.carRepairlist=res.items
            })
        }
        get pageSize(){
            return this.$store.state.carRepair.pageSize;
        }
        get totalCount(){
            return this.$store.state.carRepair.totalCount;
        }
        get currentPage(){
            return this.$store.state.carRepair.currentPage;
        }
        get incList(){//公司别
            return this.Form1.inclist;
        }
        get loadingIncList(){
             return this.$store.state.inc.loading;
        }
        async getlist(){
            this.pageIncRequest.maxResultCount=10000;
            this.pageIncRequest.skipCount=0;
            
            await this.$store.dispatch({
                type:'inc/getAll',
                data:this.pageIncRequest
            }).then(res=>{
                this.Form1.inclist=res.items
            })

            await this.$store.dispatch({//车型
                type:'clasen/GetAll',
                data:this.pageClasenRequest
            }).then(res=>{
                this.Form1.clasenlist=res.items
            })
        }

        Form1={
            makNO:"",
            incName:1,
            carRepairlist:[],
            clasenlist:[],//车型
            inclist:[]//公司别
        }
        async CheckList(){
            await this.getlist();
            await this.getpage();
            await this.getwaitCarRepair();//待完工交修单
        }
        //查询
        async checkCar(){
            if(this.Form1.makNO==""||this.Form1.makNO==undefined||this.Form1.makNO==null){
                this.$Notice.warning({
                    title: '请输入车牌号'
                })
            }
            else{
                this.CheckMakNo(this.Form1.makNO)
            }
        }
        //根据车号查询
        async CheckMakNo(makNo){
            this.pageCarBaseRequest.makNo = makNo;
            await this.$store.dispatch({
                type:'carbase/SelectCarBase',
                data:this.pageCarBaseRequest
            }).then(res=>{
                this.pagerequest.status=null;
                if(res.items.length<1){
                    this.pagerequest.carBaseAuto=0;
                }
                else{
                    res.items.map(i =>{
                        if(i.inc!=null){
                            if(i.inc.id==this.Form1.incName){
                                this.pagerequest.carBaseAuto = i.id;
                            }
                            else{
                                this.pagerequest.carBaseAuto = 0;
                            }
                        }
                    })
                }
            });
            await this.getlist();
            await this.getpage();
            await this.getwaitCarRepair();//待完工交修单
        }
        //待完工交修单
        async getwaitCarRepair(){
            var repairs=new PageCarRepairRequest();
            repairs.carBaseAuto=null;
            repairs.status=20;
            await this.$store.dispatch({
                type:'carRepair/getAll',
                data:repairs
            }).then(res=>{
                this.waitcarRepairlist=res.items;
            })
            this.loadingcar=false;
        }
       carRepaircolumns=[{
            title:this.L('交修单号'),
            width:150,
            align: 'center',
            tooltip:true,
            key:'id',
        },{
            title:this.L('车牌号码'),
            width:150,
            align: 'center',
            tooltip:true,
            render:(h:any,params:any)=>{
                    return h('span',params.row.carBase==null?'':params.row.carBase.makNo)
                }
        },{
            title:this.L('公司别'),
            width:150,
            align: 'center',
            tooltip:true,
            render:(h:any,params:any)=>{
                var incName="";
                if(params.row.carBase!=null){
                this.Form1.inclist.map(b=>{
                    if(params.row.carBase.incAuto==b.id){
                        incName=b.sname;
                    }
                })
                return h('span',incName)
                }else{
                    return h('span','')
                }
            }
        },{
            title:this.L('车型'),
            width:150,
            align: 'center',
            tooltip:true,
            render:(h:any,params:any)=>{
                var clasenName="";
                if(params.row.carBase!=null){
                this.Form1.clasenlist.map(b=>{
                    if(params.row.carBase.clasenAuto==b.id){
                        clasenName=b.clasenName;
                    }
                })
                return h('span',clasenName)
                }else{
                    return h('span','')
                }
            }
        },{
            title:this.L('交修人'),
            width:150,
            align: 'center',
            tooltip:true,
            key:'repairName',
        },{
            title:this.L('交修日期'),
            width:150,
            align: 'center',
            tooltip:true,
            key:'repairDt',
            render:(h:any,params:any)=>{
                    return h('span',new Date(params.row.repairDt).toLocaleDateString())
                }
        },{
            title:this.L('行驶里程'),
            width:150,
            align: 'center',
            tooltip:true,
            key:'km',
        },{
            title:this.L('交修类别'),
            width:100,
            render:(h:any,params:any)=>{
                    return h('span',params.row.repairTypeItemCode==null?'':params.row.repairTypeItemCode.itemName)
                }
        },{
            title:this.L('维修厂商'),
            width:150,
            align: 'center',
            tooltip:true,
            render:(h:any,params:any)=>{
                    return h('span',params.row.supplier==null?'':params.row.supplier.fname)
                }
        },{
            title:this.L('预计完工日期'),
            width:150,
            align: 'center',
            tooltip:true,
            key:'repairDtpre',
            render:(h:any,params:any)=>{
                    return h('span',new Date(params.row.repairDtpre).toLocaleDateString())
                }
        },{
            title:this.L('付款周期'),
            width:150,
            align: 'center',
            tooltip:true,
            render:(h:any,params:any)=>{
                    return h('span',params.row.payModeItemCode==null?'':params.row.payModeItemCode.itemName)
                }
        },{
            title:this.L('预估工时总金额'),
            width:150,
            align: 'center',
            tooltip:true,
            key:'estimatedTimeFee',
        },{
            title:this.L('预估零件总金额'),
            width:150,
            align: 'center',
            tooltip:true,
            key:'estimatedPartFee',
        },{
            title:this.L('合计总金额'),
            width:150,
            align: 'center',
            tooltip:true,
            key:'estimatedTotalFee',
        },{
            title:this.L('状态'),
            width:150,
            align: 'center',
            tooltip:true,
            key:'status',
            render:(h:any,params:any)=>{
                if(params.row.status==20){
                    status="未完工"
                }else if(params.row.status==30){
                    status="完工"
                }
                return h('span',status)
            }
        },{
            title:this.L('Actions'),
            width:150,
            key:'Actions',
            align: 'center',
            fixed: 'right',
            render:(h:any,params:any)=>{
                return h('div',[
                    h('Button',{
                        props:{
                            type:'error',
                            size:'small',
                        },
                        on:{
                            click:async ()=>{
                                this.$Modal.confirm({
                                    title:this.L('Tips'),
                                    content:this.L('是否要完工？'),
                                    okText:this.L('Yes'),
                                    cancelText:this.L('No'),
                                    onOk:async()=>{
                                        if(params.row.status==30){
                                            //提示框
                                            this.$Notice.warning({
                                                title: '该交修单已经是完工状态'
                                            })
                                        }
                                        else{
                                            this.carRepairData(params.row);
                                            await this.$store.dispatch({
                                                type:'carRepair/update',
                                                data:this.carRepair
                                            })
                                            //显示
                                            //this.pagerequest.carBaseAuto=params.row.carBaseAuto
                                            await this.getwaitCarRepair();//待完工交修单
                                            await this.getpage();
                                        }
                                    }
                                })
                            }
                        }
                    },this.L('完工'))
                ])
            }
        }]
       columns=[{
            title:this.L('交修单号'),
            width:150,
            align: 'center',
            tooltip:true,
            key:'id',
        },{
            title:this.L('车牌号码'),
            width:150,
            align: 'center',
            tooltip:true,
            render:(h:any,params:any)=>{
                    return h('span',params.row.carBase==null?'':params.row.carBase.makNo)
                }
        },{
            title:this.L('公司别'),
            width:150,
            align: 'center',
            tooltip:true,
            render:(h:any,params:any)=>{
                var incName="";
                if(params.row.carBase!=null){
                this.Form1.inclist.map(b=>{
                    if(params.row.carBase.incAuto==b.id){
                        incName=b.sname;
                    }
                })
                return h('span',incName)
                }else{
                    return h('span','')
                }
            }
        },{
            title:this.L('车型'),
            width:150,
            align: 'center',
            tooltip:true,
            render:(h:any,params:any)=>{
                var clasenName="";
                if(params.row.carBase!=null){
                this.Form1.clasenlist.map(b=>{
                    if(params.row.carBase.clasenAuto==b.id){
                        clasenName=b.clasenName;
                    }
                })
                return h('span',clasenName)
                }else{
                    return h('span','')
                }
            }
        },{
            title:this.L('交修人'),
            width:150,
            align: 'center',
            tooltip:true,
            key:'repairName',
        },{
            title:this.L('交修日期'),
            width:150,
            align: 'center',
            tooltip:true,
            key:'repairDt',
            render:(h:any,params:any)=>{
                    return h('span',new Date(params.row.repairDt).toLocaleDateString())
                }
        },{
            title:this.L('行驶里程'),
            width:150,
            align: 'center',
            tooltip:true,
            key:'km',
        },{
            title:this.L('交修类别'),
            width:150,
            align: 'center',
            tooltip:true,
            render:(h:any,params:any)=>{
                    return h('span',params.row.repairTypeItemCode==null?'':params.row.repairTypeItemCode.itemName)
                }
        },{
            title:this.L('维修厂商'),
            width:150,
            align: 'center',
            tooltip:true,
            render:(h:any,params:any)=>{
                    return h('span',params.row.supplier==null?'':params.row.supplier.fname)
                }
        },{
            title:this.L('预计完工日期'),
            width:150,
            align: 'center',
            tooltip:true,
            key:'repairDtpre',
            render:(h:any,params:any)=>{
                    return h('span',new Date(params.row.repairDtpre).toLocaleDateString())
                }
        },{
            title:this.L('付款周期'),
            width:150,
            align: 'center',
            tooltip:true,
            render:(h:any,params:any)=>{
                    return h('span',params.row.payModeItemCode==null?'':params.row.payModeItemCode.itemName)
                }
        },{
            title:this.L('预估工时总金额'),
            width:150,
            align: 'center',
            tooltip:true,
            key:'estimatedTimeFee',
        },{
            title:this.L('预估零件总金额'),
            width:150,
            align: 'center',
            tooltip:true,
            key:'estimatedPartFee',
        },{
            title:this.L('合计总金额'),
            width:150,
            align: 'center',
            tooltip:true,
            key:'estimatedTotalFee',
        },{
            title:this.L('状态'),
            width:150,
            align: 'center',
            tooltip:true,
            key:'status',
            render:(h:any,params:any)=>{
                if(params.row.status==20){
                    status="未完工"
                }else if(params.row.status==30){
                    status="完工"
                }
                return h('span',status)
            }
        },{
            title:this.L('Actions'),
            width:150,
            key:'Actions',
            align: 'center',
            fixed: 'right',
            render:(h:any,params:any)=>{
                return h('div',[
                    h('Button',{
                        props:{
                            type:'primary',
                            size:'small',
                        },
                        style:{
                            marginRight:'5px'
                        },
                        on:{
                            click:()=>{
                                if(params.row.status==30){
                                    //提示框
                                    this.$Notice.warning({
                                        title: '完工状态的交修单不可修改'
                                    })
                                }
                                else{
                                    this.edit(params.row);
                                }
                            }
                        }
                    },this.L('修改')),
                    h('Button',{
                        props:{
                            type:'error',
                            size:'small',
                        },
                        on:{
                            click:async ()=>{
                                this.$Modal.confirm({
                                    title:this.L('Tips'),
                                    content:this.L('是否要完工？'),
                                    okText:this.L('Yes'),
                                    cancelText:this.L('No'),
                                    onOk:async()=>{
                                        if(params.row.status==30){
                                            //提示框
                                            this.$Notice.warning({
                                                title: '该交修单已经是完工状态'
                                            })
                                        }
                                        else{
                                            this.carRepairData(params.row);
                                            await this.$store.dispatch({
                                                type:'carRepair/update',
                                                data:this.carRepair
                                            })
                                            //显示
                                            //this.pagerequest.carBaseAuto=params.row.carBaseAuto
                                            await this.getwaitCarRepair();//待完工交修单
                                            await this.getpage();
                                        }
                                    }
                                })
                            }
                        }
                    },this.L('完工'))
                ])
            }
        }]
       //对应数据库
         carRepairData(value){
            this.carRepair.id=value.id;//交修编号
            this.carRepair.carBaseAuto=value.carBaseAuto;//车籍编号
            this.carRepair.orderAuto=0;//契约编号
            this.carRepair.repairDT=value.repairDt;//交修日期
            this.carRepair.repairType=value.repairType;//交修类别
            this.carRepair.km=value.km;//行驶里程
            this.carRepair.repairDtpre=value.repairDtpre;//预计完工时间
            this.carRepair.repairName=value.repairName;//交修人
            this.carRepair.contactNumber=value.contactNumber;//联系电话
            this.carRepair.payMode=value.payMode;//付款周期
            this.carRepair.supplierAuto=value.supplierAuto;//维修厂商
            this.carRepair.systemP=value.systemP;//车身内部
            this.carRepair.repairProblem=value.repairProblem;//送修问题
            this.carRepair.operatingItem=value.operatingItem;//作业项目
            this.carRepair.repairRecommendation=value.repairRecommendation;//交修建议
            this.carRepair.estimatedTimeFee=value.estimatedTimeFee;//预估工时总金额
            this.carRepair.estimatedPartFee=value.estimatedPartFee;//预估零件总金额
            this.carRepair.estimatedTotalFee=value.estimatedTotalFee;//合计总金额
            this.carRepair.repairTypeItemType=501;//维修类别
            this.carRepair.payModeItemType=123;//付款周期
            this.carRepair.cuser=0;
            this.carRepair.cdt=value.cdt;
            this.carRepair.muser=0;
            this.carRepair.mdt=value.mdt;
            this.carRepair.addStatus=value.addStatus;
            this.carRepair.status=30;//状态
            this.carRepair.finishDT=new Date();//完工时间
        }
       async created(){
            await this.getlist();
            await this.getwaitCarRepair();//待完工交修单
            await this.getpage();
        }
    }
    
</script>