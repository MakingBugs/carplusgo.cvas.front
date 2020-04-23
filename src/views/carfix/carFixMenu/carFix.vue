<template>
    <div>
        <Card dis-hover>
            <div class="page-body">
                <Form :label-width="100" :model="Form1" inline>
                    <Row>
                        <Col span="6">
                            <FormItem label="请款状态：" style="width:100%" prop="status">
                                <RadioGroup v-model="Form1.status">
                                    <Radio label="0">暂存</Radio>
                                    <Radio label="5">驳回</Radio>
                                    <Radio label="10">送签</Radio>
                                    <Radio label="20">核准</Radio>
                                    <Radio label="3">全部</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem :label="L('Keyword')+':'" style="width:100%" prop="itemCodekey">
                                <Select :placeholder="L('Select')" v-model="Form1.itemCodekey" @on-change="ChangeCar">
                                    <Option value="1">车号</Option>
                                    <Option value="2">车架号</Option>
                                    <Option value="3">发票号码</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="6" style="margin-left:10px">
                            <span v-show="makNoShow"><Input v-model="Form1.makNo" :placeholder="L('请输入车牌号')" style="width:85%"></Input></span>
                            <span v-show="carNoShow"><Input v-model="Form1.carNo" :placeholder="L('请输入车架号')" style="width:85%"></Input></span>
                            <span v-show="invNumberShow"><Input v-model="Form1.invNumber" :placeholder="L('请输入发票号码')" style="width:85%"></Input></span>
                        </Col> 
                    </Row>
                    <Row>
                        <Button icon="ios-search" type="primary" size="large" @click="CheckCarFix" class="toolbar-btn">{{L('Find')}}</Button>
                    </Row>
                </Form>
                <div class="margin-top-10">
                    <Table :columns="Form1.carFixcolumns" :loading="loadingcarfix" :data="Form1.carFixlist" border></Table>
                    <Page show-sizer class-name="fengpage" :total="totalCount" class="margin-top-10" @on-change="pageChange" @on-page-size-change="pagesizeChange" :page-size="pageSize" :current="currentPage"></Page>
                </div>
            </div>
        </Card>
        <!-- 完工的交修单 -->
        <card>
            <div class="margin-top-10">
                <p><h3 style="color:red;text-align:center">已完工待维修的交修单</h3></p>
                <Table :columns="Form1.carRepaircolumns" :loading="loadingcar" :data="Form1.carRepairlist" border></Table>
                <Page show-sizer class-name="fengpage" :total="totalCount1" class="margin-top-10" @on-change="pageChange1" @on-page-size-change="pagesizeChange1" :page-size="pageSize" :current="currentPage1"></Page>
            </div>
        </card>
        <edit-carFix :information="newlist" :carType="carType" v-model="editModalShow" @save-success="getData"></edit-carFix>
    </div>
</template>
<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '@/lib/util'
    import AbpBase from '@/lib/abpbase'
    import PageRequest from '@/store/entities/page-request'
    import EditCarFix from './edit-carFix.vue'
    import Clasen from '../../../store/entities/car/clasen';
    import Inc from '../../../store/entities/public/inc';
    
    class PageCarFixRequest extends PageRequest{
        maxResultCount=10000
        skipCount=0
        carBaseAuto:number=null;
        makNo:string=null;
        status:Array<number>=[];
        id:number=null;
    }
    class PageIncRequest extends PageRequest{//公司别
        keyword:string='';
        from:Date;
        to:Date;
    }
    class PageCarRepairRequest extends PageRequest{//交修
        maxResultCount=10000
        skipCount=0
        status:number=30;
    }
    class PageCarBaseRequest extends PageRequest{//车籍
        keyword:string='';
        carNo:string=null;
        incAuto:number=null;
        factoryBrandAuto:number=null;
        brandAuto:number=null;
        clasenAuto:number=null;
    }
    class PagePRInvRequest extends PageRequest{//发票明细
        keyword:string='';
        invNo:string=null;
    }

    @Component({
        components:{EditCarFix}
    })
    export default class CarFixs extends AbpBase{
        edit(a,b){
            this.editModalShow=true;
            this.newlist=a;
            this.carType=b;
        }
        pagerequest:PageCarFixRequest=new PageCarFixRequest();//维修
        pageIncRequest:PageIncRequest=new PageIncRequest();//公司别
        pageCarRepairRequest:PageCarRepairRequest=new PageCarRepairRequest();//交修
        pageCarBaseRequest:PageCarBaseRequest = new PageCarBaseRequest();//车籍
        pagePRInvRequest:PagePRInvRequest = new PagePRInvRequest();//发票明细
        editModalShow:boolean=false;
        newlist:object=null;//传值给子页面
        carType:object=null;//传状态
        incType:any=null;//公司别
        carFixincarRepairAuto:any=[];
        carfixdetail:any=[];
        loadingcar:boolean=true;
        loadingcarfix:boolean=true;

        makNoShow:boolean=true;
        carNoShow:boolean=false;
        invNumberShow:boolean=false;
        
        pageChange(page:number){
            this.$store.commit('carFix/setCurrentPage',page);
            this.getpage();
        }
        pagesizeChange(pagesize:number){
            this.$store.commit('carFix/setPageSize',pagesize);
            this.getpage();
        }
        async getpage(){
            this.carfixdetail=[];
            this.pagerequest.maxResultCount=this.pageSize;
            this.pagerequest.skipCount=(this.currentPage-1)*this.pageSize;
            await this.$store.dispatch({
                type:'carFix/getAll',
                data:this.pagerequest
            }).then(res=>{
                res.items.forEach(x => {
                    this.getClasenandInc(x,x.carBase.clasenAuto,x.carBase.incAuto);//获取车牌和公司名称
                    this.carfixdetail.push(x);//维修维护list
                });
            this.Form1.carFixlist=this.carfixdetail;
            })
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
        //交修分页
         pageChange1(page:number){
            this.$store.commit('carRepair/setCurrentPage',page);
            this.getCarRepair();
         }
         pagesizeChange1(pagesize:number){
            this.$store.commit('carRepair/setPageSize',pagesize);
            this.getCarRepair();
         }
         get totalCount1(){
            return this.$store.state.carRepair.totalCount1;
         }
         get currentPage1(){
            return this.$store.state.carRepair.currentPage;
         }
        // getlist
         get incList(){//公司别
            return this.incType;
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
                this.incType=res.items;
            })
         }
        //选择条件查询
         ChangeCar(){
            if(this.Form1.itemCodekey=='1'){//车号
                this.makNoShow=true;
                this.carNoShow=false;
                this.invNumberShow=false;
            }
            else if(this.Form1.itemCodekey=='2'){//车架号
                this.makNoShow=false;
                this.carNoShow=true;
                this.invNumberShow=false;
            }
            else if(this.Form1.itemCodekey=='3'){//发票号码
                this.makNoShow=false;
                this.carNoShow=false;
                this.invNumberShow=true;
            }
         }
        //查询新增的维修单
         async getData(){
            this.carfixdetail=[];//维修维护list
            this.carFixincarRepairAuto=[];//完工待维修list
            //this.pagerequest.id=data;
            await this.getpage();
            await this.getCarRepair();//完工待维修
            //this.Form1.carFixlist=this.carfixdetail;
            this.loadingcarfix=false;
         }
        //查询
         async CheckCarFix(){
            this.loadingcarfix=true;
            this.carfixdetail=[];
            if(this.Form1.status=="3"){
                this.pagerequest.status=[];
            }
            else if(this.Form1.status=="0"){
                this.pagerequest.status=[0];
            }else if(this.Form1.status=="5"){
                this.pagerequest.status=[5];
            }else if(this.Form1.status=="10"){
                this.pagerequest.status=[10];
            }else if(this.Form1.status=="20"){
                this.pagerequest.status=[20];
            }
            if(this.Form1.itemCodekey=='1'){//车号
                this.Form1.carNo='';
                this.Form1.invNumber='';
                if(this.Form1.makNo!=''){
                    this.pagerequest.makNo=this.Form1.makNo;
                }
                this.pagerequest.carBaseAuto=null;
                this.pagerequest.status=[];
                this.pagerequest.id=null;
                await this.getpage();
            }
            else if(this.Form1.itemCodekey=='2'){//车架号
                this.Form1.makNo='';
                this.Form1.invNumber='';
                if(this.Form1.carNo!=''){
                    this.pageCarBaseRequest.carNo=this.Form1.carNo;
                }
                this.pageCarBaseRequest.incAuto=null;
                this.pageCarBaseRequest.factoryBrandAuto=null;
                this.pageCarBaseRequest.brandAuto=null;
                this.pageCarBaseRequest.clasenAuto=null;
                await this.getCarBase();
            }
            else if(this.Form1.itemCodekey=='3'){//发票号码
                this.Form1.makNo='';
                this.Form1.carNo='';
                this.pagePRInvRequest.invNo=this.Form1.invNumber;
                await this.getPRInv();
            }
            
            this.loadingcarfix=false;
         }
        Form1={
            incName:1,//公司别
            makNo:"",//车号
            carNo:"",//车架号
            invNumber:"",//发票号码
            itemCodekey:"1",
            status:"3",//请款状态
            carFixlist:[],//维修数据
            carRepairlist:[],//完工的交修单
        
         /**完工的交修单，进行维修操作 */
         carRepaircolumns:[{
                title:this.L('交修单号'),
                key:'id',
                align: 'center',
                tooltip:true,
                width:150,
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
                key:'incName'
            },{
                title:this.L('车型'),
                width:150,
                align: 'center',
                tooltip:true,
                key:'clasenName'
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
                title:this.L('预计完工日'),
                width:150,
                align: 'center',
                tooltip:true,
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
                                size:'small'
                            },
                            on:{
                                click:()=>{
                                    this.edit(params.row,0);//交修
                                }
                            }
                        },this.L('选择'))
                    ])
                }
         }],
         /**根据条件查询显示出的维修数据 */
         carFixcolumns:[{
                title:this.L('车牌号码'),
                width:150,
                align: 'center',
                tooltip:true,
                key:'makNo',
            },{
                title:this.L('车型'),
                width:150,
                align: 'center',
                tooltip:true,
                key:'clasenName'
            },{
                title:this.L('维修日期'),
                width:150,
                align: 'center',
                tooltip:true,
                render:(h:any,params:any)=>{
                    return h('span',new Date(params.row.fixDt).toLocaleDateString())
                }
            },{
                title:this.L('维修里程'),
                width:150,
                align: 'center',
                tooltip:true,
                key:'km',
            },{
                title:this.L('维修类别'),
                width:150,
                align: 'center',
                tooltip:true,
                render:(h:any,params:any)=>{
                    return h('span',params.row.itemCodeFixTypeData==null?'':params.row.itemCodeFixTypeData.itemName)
                }
            },{
                title:this.L('实付金额'),
                width:150,
                align: 'center',
                tooltip:true,
                key:'realAmount',
            },{
                title:this.L('维修厂'),
                width:150,
                align: 'center',
                tooltip:true,
                render:(h:any,params:any)=>{
                    return h('span',params.row.supplier==null?'':params.row.supplier.fname)
                }
            },{
                title:this.L('公司别'),
                width:150,
                align: 'center',
                tooltip:true,
                key:'incName'
            },{
                title:this.L('建档日期'),
                width:150,
                align: 'center',
                tooltip:true,
                render:(h:any,params:any)=>{
                    return h('span',new Date(params.row.cdt).toLocaleDateString())
                }
            },{
                title:this.L('送件批号'),
                width:150,
                align: 'center',
                tooltip:true,
                key:'carFixBatchTno',
            },{
                title:this.L('备注'),
                width:150,
                align: 'center',
                tooltip:true,
                key:'remark',
            },{
                title:this.L('状态'),
                width:150,
                align: 'center',
                tooltip:true,
                render:(h:any,params:any)=>{
                    return h('span',params.row.itemCodeStatusData==null?'':params.row.itemCodeStatusData.itemName)
                }
            },
            // {
            //     title:this.L('是否含修'),
            //     key:'carMtnAmtKind',
            // },
            {
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
                                size:'small'
                            },
                            on:{
                                click:()=>{
                                    if(params.row.status==0||params.row.status==5){
                                        this.edit(params.row,1);//维修
                                    }
                                    else{
                                        this.$Message.warning('只有暂存和驳回状态可以修改')
                                    }
                                }
                            }
                        },this.L('选择'))
                    ])
                }
         }],
         
        }
        //获取车型和公司名称
         async getClasenandInc(data,clasenid,incid){
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
            this.loadingcarfix=false;
         }
        //已完工待维修明细
         async getCarRepair(){
            this.pageCarRepairRequest.status=30;
            await this.$store.dispatch({
                type:'carRepair/getAll',
                data:this.pageCarRepairRequest
            }).then(res=>{
                res.items.forEach(x => {
                    if(x!=null){
                        if(x.carFixType==0){//完工未维修
                            this.getClasenandInc(x,x.carBase.clasenAuto,x.carBase.incAuto)
                            this.carFixincarRepairAuto.push(x);
                        }
                    }
                });
                this.Form1.carRepairlist=this.carFixincarRepairAuto;
                this.loadingcar=false;
            })
         }
        //根据车架号查询
         async getCarBase(){
            await this.$store.dispatch({
                type:'carbase/SelectCarBase',
                data:this.pageCarBaseRequest
            }).then(res=>{
                res.items.map(async (x) => {
                    this.pagerequest.makNo=x.makNo;
                    await this.getpage();
                });
            })
         }
        //根据发票号码查询
         async getPRInv(){
            await this.$store.dispatch({
                type:'prinv/getAll',
                data:this.pagePRInvRequest
            }).then(res=>{
                if(res.items.length<1){
                    this.pagerequest.id=0;
                    this.getpage();
                }
                else{
                    res.items.forEach(x => {
                        if(x.prInvLink!=null){
                            this.pagerequest.id=x.prInvLink.sourceAuto;
                            this.getpage();
                        }
                    });
                }
            })
         }
       
        async created(){
            this.loadingcarfix=true;
            await this.getpage();
            await this.getlist();
            await this.getCarRepair();//完工待维修
            this.loadingcarfix=false;
        }
    }
    
</script>