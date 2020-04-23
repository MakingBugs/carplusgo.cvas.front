<template>
    <div>
        <Card dis-hover>
            <div class="page-body">
                <Form ref="queryForm" :label-width="100" label-position="left" inline>
                    <Row :gutter="16">
                        <Col span="6">
                            <FormItem :label="L('Keyword')+':'" style="width:100%">
                                <Input v-model="pagerequest.keyword" placeholder="保险单号/车牌号码/车架号"/>
                            </FormItem>
                        </Col>   
                        <Col span="6">
                            <FormItem label="保险公司：" style="width:100%">
                                <Select v-model="pagerequest.supplierId" filterable clearable>
                                    <Option v-for="item in supplierList" :value="item.id" :key="item.id">{{ item.fname }}</Option>
                                </Select>
                            </FormItem>    
                        </Col>
                        <Col span="6">
                            <FormItem label="保单状态：" style="width:100%">
                                <Select v-model="pagerequest.insurancePolicyStatus" clearable>
                                    <Option :value=0>新建</Option>
                                    <Option :value=1>签核中</Option>
                                    <Option :value=2>已签核</Option>
                                    <Option :value=3>驳回</Option>
                                </Select>
                            </FormItem>                        
                        </Col>
                        <Col span="6">
                            <FormItem label="合同类型：" style="width:100%">
                                <Select v-model="pagerequest.insuranceContractType" clearable>
                                    <Option :value=0>新保</Option>
                                    <Option :value=1>续保</Option>
                                </Select>
                            </FormItem>                        
                        </Col>
                        <Col span="6">
                            <FormItem label="保单类别：" style="width:100%">
                                <Select v-model="pagerequest.insurancePolicyType" clearable>
                                    <Option :value=0>交强险</Option>
                                    <Option :value=1>商业险</Option>
                                    <Option :value=2>承运人责任险</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem :label="'保险开始时间:'" style="width:100%">
                                <DatePicker  v-model="startTime" type="daterange" format="yyyy-MM-dd" style="width:100%" placement="bottom-end" :placeholder="L('SelectDate')"></DatePicker>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem :label="'保险结束时间:'" style="width:100%">
                                <DatePicker  v-model="endTime" type="daterange" format="yyyy-MM-dd" style="width:100%" placement="bottom-end" :placeholder="L('SelectDate')"></DatePicker>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="24">
                            <Button icon="ios-search" type="primary" size="large" @click="find">{{L('Find')}}</Button>
                            <Button type="primary" size="large" @click="approve" class="toolbar-btn">送签</Button>
                            <Button type="primary" size="large" @click="batchAdd" class="toolbar-btn">批加文档生成</Button>
                            <Button type="primary" size="large" @click="batchReduce" class="toolbar-btn">批减文档生成</Button>
                            <Button type="primary" size="large" @click="surrender" class="toolbar-btn">退保</Button>
                            <Upload class="toolbar-btn" style="display:inline;" action="" :before-upload="handleBeforeUpload" accept=".xls, .xlsx">
                                <Button icon="ios-cloud-upload-outline" type="primary" :loading="uploadLoading" @click="handleUploadFile" size="large">保险导入</Button>
                            </Upload>
                        </Col>  
                    </Row>
                    <Row :gutter="16">
                        <transition name="fade">
                        <Progress v-if="showProgress" :percent="progressPercent" :stroke-width="2">
                            <div v-if="progressPercent == 100">
                            <Icon type="ios-checkmark-circle"></Icon>
                            <span>文件读取成功</span>
                            </div>
                        </Progress>
                        </transition>
                    </Row>
                    <Row>
                        <transition name="fade">
                        <Progress v-if="showProgress" :percent="loadingProgress" :stroke-width="2">
                            <div v-if="loadingProgress == 100">
                            <Icon type="ios-checkmark-circle"></Icon>
                            <span>文件上传成功，共上传{{insertNum}}条</span>
                            </div>
                        </Progress>
                        </transition>
                    </Row>
                </Form>
                <div class="margin-top-10">
                    <Table :loading="loading" :columns="columns" :no-data-text="L('NoDatas')" border :data="list" @on-selection-change="selectionChange">
                    </Table>
                    <Page  show-sizer class-name="fengpage" :total="totalCount" class="margin-top-10" @on-change="pageChange" @on-page-size-change="pagesizeChange" :page-size="pageSize" :current="currentPage"></Page>
                </div>
            </div>
        </Card>
        <approve v-model="approveShow" :data="insurancePolicys" @save-success="getpage"></approve>
        <batch-add v-model="batchAddShow" :data="insurancePolicys" @save-success="getpage"></batch-add>
        <batch-reduce v-model="batchReduceShow" :data="insurancePolicys" @save-success="getpage"></batch-reduce>
        <surrender v-model="surrenderShow" :data="insurancePolicys" @save-success="getpage"></surrender>
        <edit-insurancePolicy v-model="editModalShow" @save-success="getpage"></edit-insurancePolicy>
        <info-insurancePolicy v-model="infoModalShow"></info-insurancePolicy>
    </div>
</template>
<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '@/lib/util'
    import AbpBase from '@/lib/abpbase'
    import PageRequest from '@/store/entities/page-request'
    import InsurancePolicy from '@/store/entities/insure/insurancePolicy';
    import EditInsurancePolicy from './edit-insurancePolicy.vue'    
    import InfoInsurancePolicy from './info-insurancePolicy.vue'    
    import BatchReduce from './batch-reduce.vue'
    import BatchAdd from './batch-add.vue'
    import Surrender from './surrender.vue'
    import Approve from './approve.vue'
    import Excel from '@/lib/excel'

    class PageInsurancePolicyRequest extends PageRequest{
        keyword:string='';
        supplierId:number=null;
        insuranceContractType:number=null;
        insurancePolicyType:number=null;
        insurancePolicyStatus:number=null;
        startTimeFrom:Date;
        startTimeTo:Date;
        endTimeFrom:Date;
        endTimeTo:Date;
    }

    class PageSupplierRequest extends PageRequest{
        isActive:boolean=null;
        supplierTypes:Array<number>;
    }
    @Component({
        components:{EditInsurancePolicy,InfoInsurancePolicy,BatchAdd,BatchReduce,Surrender,Approve}
    })
    export default class InsurancePolicys extends AbpBase{
        editModalShow:boolean=false;        
        infoModalShow:boolean=false;     
        batchAddShow:boolean=false;
        batchReduceShow:boolean=false;
        uploadLoading: boolean = false;
        progressPercent: Number = 0;
        loadingProgress: Number = 0;
        showProgress: boolean = false;
        surrenderShow:boolean=false;
        approveShow:boolean=false;
        file: any = null;
        startTime:Date[]=[];
        endTime:Date[]=[];
        insurancePolicys:Array<InsurancePolicy>=[];
        pageSupplierRequest:PageSupplierRequest=new PageSupplierRequest();
        pagerequest:PageInsurancePolicyRequest=new PageInsurancePolicyRequest();
        edit(){
            this.editModalShow=true;
        } 
        info(){
            this.infoModalShow=true;
        }
        get supplierList(){
            return this.$store.state.supplier.selectList;
        }
        approve(){
            this.approveShow=this.approveCheck();
        }
        approveCheck(){
            if(!this.insurancePolicys || this.insurancePolicys.length<=0){
                this.$Modal.error({title:'错误',content:'请选择保单，保单列表不能为空'})
                return false
            }
            if(this.insurancePolicys.some(x=>x.insurancePolicyStatus===1)){
                this.$Modal.error({title:'错误',content:'签核中保单无法送签'})
                return false
            }
            var first = this.insurancePolicys[0];
            if(this.insurancePolicys.some(x=>x.supplierId!==first.supplierId)){
                this.$Modal.error({title:'错误',content:'请选择相同保险公司的保单进行批量送签操作'})
                return false
            }
            return true
        }
        batchAdd(){
            this.batchAddShow=this.batchCheck();
        }
        batchReduce(){
            this.batchReduceShow=this.batchCheck();
        }
        batchCheck(){
            if(!this.checkInsurancePolicys()){
                return false
            }
            var first = this.insurancePolicys[0];
            if(this.insurancePolicys.some(x=>x.supplierId!==first.supplierId || x.insuranceContractType!==first.insuranceContractType || x.insurancePolicyType!==first.insurancePolicyType)){
                this.$Modal.error({title:'错误',content:'请选择相同保险公司、保险合同类别、保单类别的保单进行批量操作'})
                return false
            }
            return true
        }  
        surrender(){
            this.surrenderShow=this.checkInsurancePolicys();
        }
        checkInsurancePolicys(){
            if(!this.insurancePolicys || this.insurancePolicys.length<=0){
                this.$Modal.error({title:'错误',content:'请选择保单，保单列表不能为空'})
                return false
            }
            return true
        }
        selectionChange(selection:Array<InsurancePolicy>){
            this.insurancePolicys = selection
        }
        find(){
            this.initUpload();
            this.pageChange(1)
        }
        updateLoadingProgress(){
            if (this.loadingProgress < 99)
                (this.loadingProgress as any) ++;
        }
        initUpload () {
            this.file = null
            this.showProgress = false
            this.loadingProgress = 0
        }
        handleUploadFile () {
            this.initUpload()
        }
        handleBeforeUpload (file) {
            const fileExt = file.name.split('.').pop().toLocaleLowerCase()
            if (fileExt === 'xlsx' || fileExt === 'xls') {
                this.readFile(file)
                this.file = file
            } else {
                this.$Notice.warning({
                title: '文件类型错误',
                desc: '文件：' + file.name + '不是EXCEL文件，请选择后缀为.xlsx或者.xls的EXCEL文件。'
                })
            }
            return false
        }
        caseInsuranceContractType(name:string){
            switch (name) {
                case '新保':
                    return 0;
                case '续保':
                    return 1;
            }
        }
        caseInsurancePolicyType(name:string){
            switch (name) {
                case '交强险':
                    return 0;
                case '商业险':
                    return 1;
                case '承运人责任险':
                    return 2;
            }
        }
        caseInsuranceOperationType(name:string){
            switch (name) {
                case '普通修改':
                    return 0;
                case '批加':
                    return 1;
                case '批减':
                    return 2;
                case '退保':
                    return 3;
                case '投保':
                    return 4;
            }
        }
        readFile (file) {
            const reader = new FileReader()
            reader.readAsArrayBuffer(file)
            reader.onloadstart = e => {
                this.uploadLoading = true
                this.showProgress = true
            }
            reader.onprogress = e => {
                this.progressPercent = Math.round(e.loaded / e.total * 100)
            }
            reader.onerror = e => {
                this.$Message.error('文件读取出错')
            }
            reader.onload = async e => {
                this.$Message.info('文件读取成功')
                const data = (e.target as any).result
                const { header, results } = Excel.read(data, 'array')
                const requestData = results.map(x=>{
                    return {
                        carBaseId:x.车辆编号,
                        carNo:x.车架号,
                        insuranceTypeId:x.险种编号,
                        insuranceTypeName:x.险种名称,
                        isDeleted:(!!x.是否删除)?x.是否删除==='是':false,
                        insurancePresetId:(!!x.保险预设编号)?x.保险预设编号:0,
                        insurancePresetName:(!!x.保险预设名称)?x.保险预设名称:'',
                        insuranceOperationType:this.caseInsuranceOperationType(x.保险操作类型),
                        insuranceContractType:this.caseInsuranceContractType(x.保险合同类型),
                        insurancePolicyType:this.caseInsurancePolicyType(x.保单类别),
                        supplierId:x.保险公司编号,
                        supplierName:x.保险公司名称,
                        insuranceNum:x.保险单号,
                        insuredAmount:x.保险金额,
                        originalAmount:x.原价保费,
                        transactionAmount:x.签单保费,
                        noDeductibleOriginalAmount:x.不计免赔原价保费,
                        noDeductibleTransactionAmount:x.不计免赔签单保费,
                        startTime:(!!x.保险开始日期)?new Date(Math.round((x.保险开始日期 - 25569)*86400*1000)):new Date(),
                        endTime:(!!x.保险结束日期)?new Date(Math.round((x.保险结束日期 - 25569)*86400*1000)):new Date(),
                        remark:x.备注,
                        serialNumber:(!!x.批单号)?x.批单号:'',
                        isActive:true,
                    };
                })
                this.$Message.info('文件开始上传')
                var timer = setInterval(this.updateLoadingProgress, requestData.length/5)
                await this.$store.dispatch({
                type:'insuranceDetail/importAll',
                data: requestData
                })
                clearInterval(timer);
                this.loadingProgress = 100
                this.uploadLoading = false
                await this.getpage()
                this.$Message.info('文件上传成功')
            }
        }
        pageChange(page:number){
            this.$store.commit('insurancePolicy/setCurrentPage',page);
            this.getpage();
        }
        pagesizeChange(pagesize:number){
            this.$store.commit('insurancePolicy/setPageSize',pagesize);
            this.getpage();
        }
        async getpage(){
            this.pagerequest.maxResultCount=this.pageSize;
            this.pagerequest.skipCount=(this.currentPage-1)*this.pageSize;
            
            if (this.startTime.length>0) {
                this.pagerequest.startTimeFrom=this.startTime[0];
            }
            if (this.startTime.length>1) {
                this.pagerequest.startTimeTo=this.startTime[1];
            }

            if (this.endTime.length>0) {
                this.pagerequest.endTimeFrom=this.endTime[0];
            }
            if (this.startTime.length>1) {
                this.pagerequest.endTimeTo=this.endTime[1];
            }

            await this.$store.dispatch({
                type:'insurancePolicy/getAll',
                data:this.pagerequest
            })
                        
            this.pageSupplierRequest.maxResultCount=100;
            this.pageSupplierRequest.skipCount=0;
            this.pageSupplierRequest.isActive = true;
            this.pageSupplierRequest.supplierTypes=[1];
            await this.$store.dispatch({
                type:'supplier/selectAll',
                data:this.pageSupplierRequest
            })
        }
        get list(){
            return this.$store.state.insurancePolicy.list;
        };
        get loading(){
            return this.$store.state.insurancePolicy.loading;
        }
        get pageSize(){
            return this.$store.state.insurancePolicy.pageSize;
        }
        get totalCount(){
            return this.$store.state.insurancePolicy.totalCount;
        }
        get currentPage(){
            return this.$store.state.insurancePolicy.currentPage;
        }
        get insertNum(){
            return this.$store.state.insuranceDetail.insertNum;
        }
        async created(){
            this.getpage();
        }
        columns=[{
            width:80,
            type: 'selection',
            fixed:'left'
        },{
            title: '保险单号',
            width:160,
            key:'insuranceNum'
        },{
            title: '保险合同类型',
            width:160,
            key:'insuranceContractType',
            render:(h:any,params:any)=>{
                switch (params.row.insuranceContractType) {
                    default:
                    case 0:
                        return h('span','新保');
                    case 1:
                        return h('span','续保');
                }
            }
        },{
            title: '保单类别',
            width:160,
            key:'insuranceType.name',
            render:(h:any,params:any)=>{
                switch (params.row.insurancePolicyType) {
                    default:
                    case 0:
                        return h('span','交强险');
                    case 1:
                        return h('span','商业险');
                    case 2:
                        return h('span','承运人责任险');
                }
            }
        },{
            title: '保险厂商',
            width:160,
            key:'supplier.fname',
            render:(h:any,params:any)=>{
                return h('span',(!!params.row.supplier)?params.row.supplier.fname:'')
            }
        },{
            title: '车牌号码',
            width:160,
            key:'carBase.makNo',
            render:(h:any,params:any)=>{
                return h('span',(!!params.row.carBase)?params.row.carBase.makNo:'')
            }
        },{
            title: '车架号',
            width:160,
            key:'carBase.carNo',
            render:(h:any,params:any)=>{
                return h('span',params.row.carBase.carNo)
            }
        },{
            title: '保单状态',
            width:160,
            key:'insurancePolicyStatus',
            render:(h:any,params:any)=>{
                switch (params.row.insurancePolicyStatus) {
                    case 0:
                    default:
                        return h('span','新建');
                    case 1:
                        return h('span','签核中');
                    case 2:
                        return h('span','已签核');
                    case 3:
                        return h('span','驳回');
                }
                
            }
        },{
            title: '保险开始日期',
            width:160,
            key:'startTime',
            render:(h:any,params:any)=>{
                return h('span',new Date(params.row.startTime).toLocaleDateString())
            }
        },{
            title: '保险结束日期',
            width:160,
            key:'endTime',
            render:(h:any,params:any)=>{
                return h('span',new Date(params.row.endTime).toLocaleDateString())
            }
        },{
            title:this.L('Actions'),
            key:'Actions',
            width:150,
            fixed:'right',
            render:(h:any,params:any)=>{
                if(params.row.insurancePolicyStatus===1){
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
                                    this.$store.commit('insurancePolicy/edit',params.row);
                                    this.info();
                                }
                            }
                        },'详情')
                    ])
                }
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
                                this.$store.commit('insurancePolicy/edit',params.row);
                                this.edit();
                            }
                        }
                    },this.L('Edit')),
                    h('Button',{
                        props:{
                            type:'error',
                            size:'small'
                        },
                        on:{
                            click:async ()=>{
                                this.$Modal.confirm({
                                        title:this.L('Tips'),
                                        content:this.L('DeleteConfirm'),
                                        okText:this.L('Yes'),
                                        cancelText:this.L('No'),
                                        onOk:async()=>{
                                            await this.$store.dispatch({
                                                type:'insurancePolicy/delete',
                                                data:params.row
                                            })
                                            await this.getpage();
                                        }
                                })
                            }
                        }
                    },this.L('Delete'))
                ])
            }
        }]
    }
</script>