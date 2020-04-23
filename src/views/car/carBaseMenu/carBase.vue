<template>
    <div>
        <Card dis-hover>
            <div class="page-body">
                <Form ref="queryForm" :model="Form2" :label-width="80" inline>
                    <Row :gutter="16">
                        <Col span="6">
                            <FormItem :label="L('车号')+':'" style="width:100%" prop="makNo">
                                <Input v-model="Form2.makNo"></Input>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem :label="L('车架号')+':'" style="width:100%" prop="carNo">
                                <Input v-model="Form2.carNo"></Input>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem :label="L('发动机号')+':'" style="width:100%" prop="engNo">
                                <Input v-model="Form2.engNo"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="5">
                            <FormItem :label="L('上牌日期')+':'" style="width:100%" prop="makDtFrom">
                                <DatePicker v-model="Form2.makDtFrom" type="date"></DatePicker>
                            </FormItem>
                        </Col>
                        <Col span="5">
                            <FormItem label="" style="width:100%;margin-left:-70px;" prop="makDtTo">
                            <DatePicker v-model="Form2.makDtTo" type="date"></DatePicker>
                            </FormItem>
                        </Col>
                        <Col span="5">
                            <FormItem :label="L('出厂日期')+':'" style="width:100%" prop="carDtFrom">
                            <DatePicker v-model="Form2.carDtFrom" type="date"></DatePicker>
                            </FormItem>
                        </Col>
                        <Col span="5">
                            <FormItem label="" style="width:100%;margin-left:-70px;" prop="carDtTo">
                            <DatePicker v-model="Form2.carDtTo" type="date"></DatePicker>
                            </FormItem>
                        </Col>
                        <!-- <Col span="4">
                            <FormItem :label="L('状态')+':'" style="width:100%;margin-left: -125px">
                                <RadioGroup v-model="Form2.status">
                                    <Radio label="0">出售</Radio>
                                    <Radio label="1">未出售</Radio>
                                    <Radio label="2">全部</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col> -->
                        <Col span="4" style="">
                        </Col>
                    </Row>
                    <Row>
                        <Button @click="create" icon="android-add" type="primary" size="large">{{L('Add')}}</Button>
                        <Button icon="ios-search" type="primary" size="large" @click="checkDetail" class="toolbar-btn">{{L('Find')}}</Button>
                    </Row>
                    <!-- <Row>
                        <Button icon="ios-download-outline" type="primary" @click="carMasterARtoExcel">年审资料导Excel</Button>
                    </Row> -->
                </Form>
                <div class="margin-top-10">
                    <!-- 根据车号、车架号、发动机号查询的数据 -->
                    <Table v-show="Form2.carMakNo" :loading="loading" :columns="carMastercolumns" :no-data-text="L('NoDatas')" border :data="Form2.carMaster"></Table>
                    <!-- 根据年审到期日查询的数据 -->
                    <!-- <Table v-show="Form2.carYearCheckDT" :loading="loading" :columns="carMasterARcolumns" :no-data-text="L('NoDatas')" border :data="Form2.carMasterAR"></Table> -->
                    <!-- 根据二级维护到期日查询的数据 -->
                    <!-- <Table v-show="Form2.carARSMState" :loading="loading" :columns="carMasterSMcolumns" :no-data-text="L('NoDatas')" border :data="Form2.carMasterSM"></Table> -->
                    <Page show-sizer class-name="fengpage" :total="totalCount" class="margin-top-10" @on-change="pageChange" @on-page-size-change="pagesizeChange" :page-size="pageSize" :current="currentPage"></Page>
                </div>
            </div>
        </Card>
        <!-- <Card>
            <Divider>上牌完成待维护数据</Divider>
            <div class="margin-top-10">
                <Table :columns="toMaintaincolumns" :no-data-text="L('NoDatas')" border :data="Form2.toMaintain"></Table>
            </div>
        </Card> -->
        <create-carBase v-model="createModalShow" @save-success="getpage"></create-carBase>
        <edit-carBase :information="newlist" v-model="editModalShow" @save-success="getpage"></edit-carBase><!-- :conditions="stat"-->
    </div>
</template>
<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '@/lib/util'
    import AbpBase from '@/lib/abpbase'
    import PageRequest from '@/store/entities/page-request'
    import CreateCarBase from './create-carBase.vue'
    import EditCarBase from './edit-carBase.vue'
    import PublicClass from '@/lib/publicclass'
    import Excel from '@/lib/excel'
    
    class PageCarBaseRequest extends PageRequest{
        keyword:string='';
        from:Date;
        to:Date;
        makNo:string;
        carNo:string;
        engNo:string;
        makDtFrom:string;
        makDtTo:string;
        carDtFrom:string;
        carDtTo:string;
        useType:number;
    }
    class PageIncRequest extends PageRequest{//公司别
        maxResultCount=10000
        skipCount=0
    }
    class PageItemCodeRequest extends PageRequest{
        maxResultCount=10000
        skipCount=0
        itemTypes:Array<number>
    }

    @Component({
        components:{CreateCarBase,EditCarBase}
    })
    
    export default class CarBases extends AbpBase{
        edit(a,b){
            this.editModalShow=true;
            this.newlist=a;//传值
            //this.stat=b;//传状态：年审 10或二级维护 20
        }
       
        pagerequest:PageCarBaseRequest=new PageCarBaseRequest();
        pageIncRequest:PageIncRequest=new PageIncRequest();
        pageItemCodeRequest:PageItemCodeRequest=new PageItemCodeRequest();
        createModalShow:boolean=false;
        editModalShow:boolean=false;
        newlist:object=null;//传值
        //stat:number=0;//传状态：年审或二级维护
        itemCodeTypelist:any=null;//车籍搜寻条件
        incType:any=null;//公司别
        carchange:any=null;//根据条件变换(车籍年审和二级维护)

        //上传/读取附件
        file: any = null;//文件名
        uploadLoading: boolean = false;
        showProgress: boolean = false;//显示进度
        progressPercent: Number = 0;//读取文件进度百分比
        loadingProgress: Number = 0;//上传文件进度百分比

        excelLoading:boolean=false;//导Excel加载Loading
        
        get loading(){
            return this.$store.state.carbase.loading;
        }
        create(){
            this.createModalShow=true;
        }
        /**更新当前页码 */
        pageChange(page:number){
            this.$store.commit('carbase/setCurrentPage',page);
            this.getpage();
        }
        /**更新列表每页显示条数 */
        pagesizeChange(pagesize:number){
            this.$store.commit('carbase/setPageSize',pagesize);
            this.getpage();
        }

        async getpage(){
            this.pagerequest.maxResultCount=this.pageSize;
            this.pagerequest.skipCount=(this.currentPage-1)*this.pageSize;
            var newcarchange = this.carchange;
            await this.$store.dispatch({
                type:'carbase/SelectCarBase',
                data:this.pagerequest
            }).then(a=>{
                this.Form2.carMaster=a.items;
            /*if(newcarchange==11013){
                    this.Form2.carMaster=a.items;//车牌号、车架号、发动机号
                }
                if(newcarchange==11){
                    this.Form2.carMasterAR=a.items;//年审
                }
                if(newcarchange==12){
                    this.Form2.carMasterSM=a.items;//二级维护
                }*/
            })
        }
        
        get pageSize(){
            return this.$store.state.carbase.pageSize;
        }
        get totalCount(){//数据总数
            return this.$store.state.carbase.totalCount;
        }
        get currentPage(){//当前页码
            return this.$store.state.carbase.currentPage;
        }
        get incList(){//公司别
            return this.incType;
        }
        get loadingIncList(){
             return this.$store.state.inc.loading;
        }
        /**条件查询 */
        checkDetail(){
            this.pagerequest.makNo=this.Form2.makNo;//车号
            this.pagerequest.carNo=this.Form2.carNo;//车架号
            this.pagerequest.engNo=this.Form2.engNo;//发动机号
            this.pagerequest.makDtFrom=this.Form2.makDtFrom;//上牌日期 起
            this.pagerequest.makDtTo=this.Form2.makDtTo;//上牌日期 迄
            this.pagerequest.carDtFrom=this.Form2.carDtFrom;//出厂日期 起
            this.pagerequest.carDtTo=this.Form2.carDtTo;//出厂日期 迄
            
            this.getpage();
           //
            /**年审到期日 */
            /*if(this.Form2.carBaseCondition==11){
                if(this.Form2.txtQuery==""||this.Form2.txtQueryEnd==""){
                    this.$Notice.warning({
                        title:'查询起讫日都不能为空，请确认'
                    })
                }
                else{
                    this.carchange=11;
                    this.Form2.carYearCheckDT=true;
                    this.Form2.carMakNo=false;//车号、车架号、发动机号
                    this.Form2.carARSMState=false;//二级维护到期日数据
                }
            }*/
            /**二级维护到期日 */
            /*if(this.Form2.carBaseCondition==12){
                if(this.Form2.txtQuery==""||this.Form2.txtQueryEnd==""){
                    this.$Notice.warning({
                        title:'查询起讫日都不能为空，请确认'
                    })
                }
                else{
                    this.carchange=12;
                    this.Form2.carARSMState=true;
                    this.Form2.carMakNo=false;//车号、车架号、发动机号
                    this.Form2.carYearCheckDT=false;//年审到期日数据
                }
            }*/
        }
        /**根据车号、车架号、发动机号查询的数据 */
        carMastercolumns=[{
                title:'车牌号码',
                align: 'center',
                width:150,
                tooltip:true,
                key:'makNo'
            },{
                title:'厂牌',
                align: 'center',
                width:150,
                tooltip:true,
                render:(h:any,params:any)=>{
                    return h('span',params.row.brand==null?'':params.row.brand.brandName)
                }
            },{
                title:'车型',
                align: 'center',
                width:150,
                tooltip:true,
                render:(h:any,params:any)=>{
                    return h('span',params.row.clasen==null?'':params.row.clasen.clasenName)
                }
            },{
                title:'颜色',
                align: 'center',
                width:150,
                tooltip:true,
                key:'carColor'
            },{
                title:'排气量',
                align: 'center',
                width:150,
                tooltip:true,
                key:'cc'
            },{
                title:'使用性质',
                align: 'center',
                width:150,
                tooltip:true,
                render:(h:any,params:any)=>{
                    return h('span',params.row.itemCode==null?'':params.row.itemCode.itemName)
                }
            },{
                title:'车架号',
                align: 'center',
                width:150,
                tooltip:true,
                key:'carNo'
            },{
                title:'登记日',
                align: 'center',
                width:150,
                tooltip:true,
                key:'linceDt',
                render:(h:any,params:any)=>{
                    return h('span',params.row.linceDt==null? "":new Date(params.row.linceDt).toLocaleDateString())
                }
            },{
                title:'年审截止日',
                align: 'center',
                width:150,
                tooltip:true,
                key:'yearCheckDt',
                render:(h:any,params:any)=>{
                    return h('span',params.row.yearCheckDt==null? "":new Date(params.row.yearCheckDt).toLocaleDateString())
                }
            },{
                title:'客户名称',
                align: 'center',
                width:150,
                tooltip:true,
                render:(h:any,params:any)=>{
                    return h('span',params.row.inc==null?'':params.row.inc.fname)
                }
            },{
                title:'公司别',
                align: 'center',
                width:150,
                tooltip:true,
                render:(h:any,params:any)=>{
                    return h('span',params.row.inc==null?'':params.row.inc.sname)
                }
            },
            // {
            //     title:'契约单号',
            //      render:(h:any,params:any)=>{
            //         return h('span',params.row.order.id)
            //     }
            // },
            {
            title:this.L('Actions'),
            key: 'Actions',
            width: 150,
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
                            width:'60px'
                        },
                        on:{
                            click:()=>{
                                this.edit(params.row,0);
                            }
                        }
                    },this.L('Edit'))
                ])
            }
        }]
        Form2={
            incName:"",//公司别
            makNo:"",//车号
            carNo:"",//车架号
            engNo:"",//发动机号
            makDtFrom:"",//上牌日期 起
            makDtTo:"",//上牌日期 迄
            carDtFrom:"",//出厂日期 起
            carDtTo:"",//出厂日期 迄
            status:"2",//状态

            //v-show根据查询条件显示对应的table
            carMakNo:true,//车号、车架号、发动机号查询的
            //carYearCheckDT:false,//年审到期日查询的
            //carARSMState:false,

            carMaster:[],//根据车号、车架号、发动机号查询的数据明细
            //carMasterAR:[],//根据年审到期日查询数据明细
            //carMasterSM:[],//根据二级维护到期日查询数据明细
            //toMaintain:[],//上牌完成待维护数据明细
        }
        //
         /**上牌完成待维护数据 */
         /*toMaintaincolumns=[{
                title:'车牌号码',
                key:'makNo'
            },{
                title:'厂牌',
                key:'BrandName'
            },{
                title:'车型',
                key:'ClasenName'
            },{
                title:'颜色',
                key:'carColor'
            },{
                title:'排气量',
                key:'cc'
            },{
                title:'车号',
                key:'makNo'
            },{
                title:'车架号',
                key:'carNo'
            },{
                title:'发动机号',
                key:'EngNo'
            },{
                title:'领牌日',
                key:'MakDT'
            },{
                title:'使用性质',
                key:'UseTypeName'
            },{
                title:'登记日',
                key:'linceDt'
            },{
                title:'年审截止日',
                key:'yearCheckDT'
            },{
                title:'客户名称',
                key:'Custname'
            },{
                title:'契约状态',
                key:'StatusDesc'
            },{
                title:'业代',
                key:'fname'
            },{
                title:'公司别',
                key:'IncName'
            },{
                title:'试算单号',
                key:'OrdersAuto'
            },{
            title:this.L('Actions'),
            key:'Actions',
            align: 'center',
            render:(h:any,params:any)=>{
                return h('div',[
                    h('Button',{
                        props:{
                            type:'primary',
                            size:'small'
                        },
                        style:{
                            width:'60px'
                        },
                        on:{
                            click:()=>{
                                this.edit(params.row,0);
                            }
                        }
                    },this.L('Edit'))
                ])
            }
         }]*/
         /**根据年审到期日查询的数据 */
         /*carMasterARcolumns=[{
                title:'车牌号码',
                key:'makNo'
            },{
                title:'厂牌',
                render:(h:any,params:any)=>{
                    return h('span',params.row.brand.brandName)
                }
            },{
                title:'车型',
                render:(h:any,params:any)=>{
                    return h('span',params.row.clasen.clasenName)
                }
            },{
                title:'颜色',
                key:'carColor'
            },{
                title:'排气量',
                key:'cc'
            },{
                title:'使用性质',
                 render:(h:any,params:any)=>{
                    return h('span',params.row.itemCode.itemName)
                }
            },{
                title:'车架号',
                key:'carNo'
            },{
                title:'登记日',
                key:'linceDt'
            },{
                title:'年审截止日',
                key:'yearCheckDt'
            },{
                title:'客户名称',
                render:(h:any,params:any)=>{
                    return h('span',params.row.inc.fname)
                }
            },{
                title:'公司别',
                render:(h:any,params:any)=>{
                    return h('span',params.row.inc.sname)
                }
            },{
                title:'年审状态',
                key:'ARSMState'
            },{
                title:'年审到期日',
                key:'yearCheckDTNew'
            }
            // ,{
            //     title:'契约单号',
            //     key:'OrderAuto'
            // }
            ,{
            title:this.L('Actions'),
            key:'Actions',
            align: 'center',
            render:(h:any,params:any)=>{
                return h('div',[
                    h('Button',{
                        props:{
                            type:'primary',
                            size:'small'
                        },
                        style:{
                            width:'60px'
                        },
                        on:{
                            click:()=>{
                                this.edit(params.row,10);
                            }
                        }
                    },this.L('Edit'))
                ])
            }
         }]*/
         /**根据二级维护到期日查询的数据 */
         /*carMasterSMcolumns=[{
                title:'车牌号码',
                key:'makNo'
            },{
                title:'厂牌',
                render:(h:any,params:any)=>{
                    return h('span',params.row.brand.brandName)
                }
            },{
                title:'车型',
                render:(h:any,params:any)=>{
                    return h('span',params.row.clasen.clasenName)
                }
            },{
                title:'颜色',
                key:'carColor'
            },{
                title:'排气量',
                key:'cc'
            },{
                title:'使用性质',
                render:(h:any,params:any)=>{
                    return h('span',params.row.itemCode.itemName)
                }
            },{
                title:'车架号',
                key:'carNo'
            },{
                title:'登记日',
                key:'linceDt'
            },{
                title:'年审截止日',
                key:'yearCheckDt'
            },{
                title:'客户名称',
                render:(h:any,params:any)=>{
                    return h('span',params.row.inc.fname)
                }
            },
            // {
            //     title:'契约状态',
            //     key:'StatusDesc'
            // },{
            //     title:'业代',
            //     key:'fname'
            // },
            {
                title:'公司别',
                render:(h:any,params:any)=>{
                    return h('span',params.row.inc.sname)
                }
            },{
                title:'二级维护状态',
                key:'ARSMState'
            },{
                title:'二级维护到期日',
                key:'yearCheckDTNew'
            },{
            title:this.L('Actions'),
            key:'Actions',
            align: 'center',
            render:(h:any,params:any)=>{
                return h('div',[
                    h('Button',{
                        props:{
                            type:'primary',
                            size:'small'
                        },
                        style:{
                            width:'60px'
                        },
                        on:{
                            click:()=>{
                                //this.$store.commit('carbase/edit',params.row);
                                this.edit(params.row,20);
                            }
                        }
                    },this.L('Edit'))
                ])
            }
         }]*/
         //年审资料导Excel
         /*carMasterARtoExcel(){
            //根据公司和日期导出
            if(this.Form2.txtQuery==""||this.Form2.txtQueryEnd==""){
                this.$Notice.warning({
                title: '年审资料导Excel出错',
                desc: '请输入开始和结束日期'
                })
            }
         }*/
        async created(){
            this.getpage();
        }
    }
    
</script>