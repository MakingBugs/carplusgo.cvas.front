<template>
    <div>
        <Modal
         fullscreen
         :title="'入库作业'"
         :value="value"
         @on-ok="save"
         @on-visible-change="visibleChange"
        >
                <Collapse v-model="collapseValue">
                    <Panel name="1">
                        车辆基本资料
                        <div slot="content">
                            <Form ref="carBaseForm" :label-width="80" label-position="right" inline>  
                                <Row :gutter="20">
                                    <Col :xs="24" :md="12" :xxl="6">
                                        <FormItem :label="'车牌号码:'" style="width:100%">
                                            <Input v-model="carBase.makNo" disabled :maxlength="50"/>
                                        </FormItem>
                                    </Col>
                                    <Col :xs="24" :md="12" :xxl="6">
                                        <FormItem :label="'发动机号:'" style="width:100%">
                                            <Input v-model="carBase.engNo" disabled :maxlength="50"/>
                                        </FormItem>
                                    </Col>
                                    <Col :xs="24" :md="12" :xxl="6">
                                        <FormItem :label="'车架号:'" style="width:100%">
                                            <Input v-model="carBase.carNo" disabled :maxlength="50"/>
                                        </FormItem>
                                    </Col>
                                    <Col :xs="24" :md="12" :xxl="6">
                                        <FormItem :label="'出厂日期:'" style="width:100%">
                                            <DatePicker v-model="carBase.carDt" format="yyyy-MM-dd" disabled style="width:100%"/>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row :gutter="20" class="margin-top-10">
                                    <Col :xs="24" :md="12" :xxl="6">
                                        <FormItem :label="'车型:'" style="width:100%">
                                            <Input v-model="clasenName" disabled :maxlength="50"/>
                                        </FormItem>
                                    </Col>
                                    <Col :xs="24" :md="12" :xxl="6">
                                        <FormItem :label="'车色:'" style="width:100%">
                                            <Input v-model="carBase.carColor" disabled :maxlength="50"/>
                                        </FormItem>
                                    </Col>
                                    <Col :xs="24" :md="12" :xxl="6">
                                        <FormItem :label="'排气量:'" style="width:100%">
                                            <Input v-model="carBase.cc" disabled :maxlength="50"/>
                                        </FormItem>
                                    </Col>
                                    <Col :xs="24" :md="12" :xxl="6">
                                        <FormItem :label="'燃油种类:'" style="width:100%">
                                            <Input v-model="oilName" disabled :maxlength="50"/>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row :gutter="20" class="margin-top-10">
                                    <Col :xs="24" :md="12" :xxl="6">
                                        <FormItem :label="'变速种类:'" style="width:100%">
                                            <Input v-model="bsTypeName" disabled :maxlength="50"/>
                                        </FormItem>
                                    </Col>
                                    <Col :xs="24" :md="12" :xxl="6">
                                        <FormItem :label="'车险性质别:'" style="width:100%">
                                            <Input v-model="isBusinessName" disabled :maxlength="50"/>
                                        </FormItem>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </Panel>
                    <Panel name="2">
                        入库资料
                        <div slot="content">
                            <Form ref="repositoryOutForm" :label-width="80"  label-position="right" inline :rules="repositoryOutRule" :model="repositoryOut">
                                <Row :gutter="20">
                                    <Col :xs="24" :md="12" :xxl="6">
                                        <FormItem :label="'入库原因:'" style="width:100%">
                                            <Select v-model="repositoryOut.inReason" clearable>
                                                <Option v-for="item in reasonList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <Col :xs="24" :md="12" :xxl="6">
                                        <FormItem :label="'入库日期:'" style="width:100%">
                                            <DatePicker v-model="repositoryOut.inDate" format="yyyy-MM-dd" style="width:100%"/>
                                        </FormItem>
                                    </Col>
                                    <Col :xs="24" :md="12" :xxl="6">
                                        <FormItem :label="'入库里程:'" style="width:100%">
                                            <Input v-model="repositoryOut.inKM" :maxlength="50"/>
                                        </FormItem>
                                    </Col>
                                    <Col :xs="24" :md="12" :xxl="6">
                                        <FormItem :label="'车况:'" style="width:100%">
                                            <Select v-model="repositoryOut.inCondition" clearable>
                                                <Option v-for="item in conditionList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row :gutter="20">
                                    <Col :xs="24" :md="12" :xxl="6">
                                        <FormItem :label="'目的区域:'" style="width:100%">
                                            <Select v-model="inAreaId" clearable @on-change="locationChange">
                                                <Option v-for="item in locationList" :value="item.id" :key="item.id">{{ item.areaName }}</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <Col :xs="24" :md="12" :xxl="6">
                                        <FormItem :label="'目的仓库:'" style="width:100%">
                                            <Select v-model="repositoryOut.inRepositoryID" clearable>
                                                <Option v-for="item in repositoryList" :value="item.id" :key="item.id">{{ item.repositoryName }}</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <Col :xs="24" :md="12" :xxl="12">
                                        <FormItem :label="'入库备注:'" style="width:100%">
                                            <Input v-model="repositoryOut.inMemo" :maxlength="50"/>
                                        </FormItem>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </Panel>
                    <Panel name="3">
                        车辆外观
                        <div slot="content">
                            <Button @click="save" type="primary">新增</Button>
                            <Table class="margin-top-10" :columns="repositoryOutCarPartColumns" :no-data-text="L('NoDatas')" border :data="repositoryOutCarPartList">
                            </Table>
                        </div>
                    </Panel>
                    <Panel name="4">
                        随车配件
                        <div slot="content">
                            <Table border :columns="repositoryOutAccessoryColumns" :data="repositoryOutAccessoryList">
                                <template #disabled="{row}">
                                    <Checkbox v-model="row.disabled"></Checkbox>
                                </template>
                                <template #dueQty="{row}">
                                    <Form class="dueQtyform" :ref='"dueQty"+row.id' :model='row'>
                                        <FormItem prop="dueQty" :rules='{required:true,message:"请输入应收数量！"}'>
                                            <InputNumber :disabled="row.disabled" style="width:100%" :max="10" :min="0" v-model="row.dueQty"></InputNumber>
                                        </FormItem>
                                    </Form>
                                </template>
                                <template #qty="{row}">
                                    <Form class="qtyform" :ref='"qty"+row.id' :model='row'>
                                    <FormItem prop="qty" :rules='{required:true,message:"请输入实收数量！"}'>
                                        <InputNumber :disabled="row.disabled" style="width:100%" :max="10" :min="0" v-model="row.qty"></InputNumber>
                                    </FormItem>
                                    </Form>
                                </template>
                                <template #memo="{row}">
                                    <Form class="memoform" :ref='"memo"+row.id' :model="row">
                                        <FormItem prop="memo" :rules='{required:true,message:"请输入备注！"}'>
                                            <Input :disabled="row.disabled" style="width:100%" v-model='row.memo'/>
                                        </FormItem>
                                    </Form>
                                </template>
                            </Table>
                        </div>
                    </Panel>
                    <Panel name="5">
                        随车证件
                        <div slot="content">
                            <Table border :columns="repositoryOutCertificateColumns" :data="repositoryOutCertificateList">
                                <template #disabled="{row}">
                                    <Checkbox v-model="row.disabled"></Checkbox>
                                </template>
                                <template #dueQty="{row}">
                                    <Form class="dueQtyform" :ref='"dueQty"+row.id' :model='row'>
                                        <FormItem prop="dueQty" :rules='{required:true,message:"请输入应收数量！"}'>
                                            <InputNumber :disabled="row.disabled" style="width:100%" :max="10" :min="0" v-model="row.dueQty"></InputNumber>
                                        </FormItem>
                                    </Form>
                                </template>
                                <template #qty="{row}">
                                    <Form class="qtyform" :ref='"qty"+row.id' :model='row'>
                                    <FormItem prop="qty" :rules='{required:true,message:"请输入实收数量！"}'>
                                        <InputNumber :disabled="row.disabled" style="width:100%" :max="10" :min="0" v-model="row.qty"></InputNumber>
                                    </FormItem>
                                    </Form>
                                </template>
                                <template #memo="{row}">
                                    <Form class="memoform" :ref='"memo"+row.id' :model="row">
                                        <FormItem prop="memo" :rules='{required:true,message:"请输入备注！"}'>
                                            <Input :disabled="row.disabled" style="width:100%" v-model='row.memo'/>
                                        </FormItem>
                                    </Form>
                                </template>
                            </Table>
                        </div>
                    </Panel>
                    <Panel name="6">
                        上传出还车确认表
                        <div slot="content">
                            <Upload class="toolbar-btn" style="display:inline;" :show-upload-list="false" action="" :before-upload="handleBeforeUpload" accept=".xls, .xlsx, .pdf, .doc, .docx, .jpg, .png">
                                <Button icon="ios-cloud-upload-outline" type="primary" :loading="uploadLoading" @click="handleUploadFile" size="large">选取文件</Button>
                            </Upload>
                            <Table class="margin-top-10" :columns="repositoryOutFileColumns" :no-data-text="L('NoDatas')" border :data="repositoryOutFileList">
                            </Table>
                        </div>
                    </Panel>
                </Collapse>
            <div slot="footer">
                <Button @click="save" type="primary">收车确认</Button>
                <Button @click="cancelInRepository">取消入库</Button>
                <Button @click="cancel">取消</Button>
            </div>
            <create-repositoryOutCarPart v-model="createRepositoryOutCarPartShow" :data="repositoryOutCarPartList"></create-repositoryOutCarPart>
            <edit-repositoryOutCarPart v-model="editRepositoryOutCarPartShow" :data="repositoryOutCarPartList"></edit-repositoryOutCarPart>
            <cancel-repositoryOut v-model="cancelRepositoryOutShow" @save-success="close"></cancel-repositoryOut>
        </Modal>
    </div>
</template>
<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '@/lib/util'
    import AbpBase from '@/lib/abpbase'
    import PageRequest from '@/store/entities/page-request'
    import CarBase from '@/store/entities/car/carbase'
    import RepositoryOut from '@/store/entities/vehicleScheduling/repositoryOut'
    import RepositoryOutCarPart from '@/store/entities/vehicleScheduling/repositoryOutCarPart'
    import RepositoryOutAccessory from '@/store/entities/vehicleScheduling/repositoryOutAccessory'
    import RepositoryOutCertificate from '@/store/entities/vehicleScheduling/repositoryOutCertificate'
    import RepositoryOutFile from '@/store/entities/vehicleScheduling/repositoryOutFile'
    import Location from '@/store/entities/vehicleScheduling/location'
    import Repository from '@/store/entities/vehicleScheduling/repository'
    import ItemCode from '@/store/entities/public/itemCode';
    import CreateRepositoryOutCarPart from './create-repositoryOutCarPart.vue'
    import EditRepositoryOutCarPart from './edit-repositoryOutCarPart.vue'
    import CancelRepositoryOut from './cancel-repositoryOut.vue'
    import Axios from 'axios';
    
    class PageItemCodeRequest extends PageRequest{
        itemTypes:Array<number>
    }

    class PageLocationRequest extends PageRequest{
        maxResultCount=10000
        skipCount=0
    }

    class PageRepositoryRequest extends PageRequest{
        maxResultCount=10000
        skipCount=0
        areaID:Number;
    }

    class PageCarPartRightRequest extends PageRequest{
        maxResultCount=10000
        skipCount=0
        oilID:Number;
    }

    class PageCarAccessoryRightRequest extends PageRequest{
        maxResultCount=10000
        skipCount=0
        oilID:Number;
    }

    class PageCarCertificateRightRequest extends PageRequest{
        maxResultCount=10000
        skipCount=0
        oilID:Number;
    }

    @Component({
        components:{CreateRepositoryOutCarPart,EditRepositoryOutCarPart,CancelRepositoryOut}
    })
    export default class InsertVehicleLoading extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        createRepositoryOutCarPartShow:Boolean=false;
        editRepositoryOutCarPartShow:Boolean=false;
        cancelRepositoryOutShow:Boolean=false;
        uploadLoading:Boolean=false;
        pageItemCodeRequest:PageItemCodeRequest=new PageItemCodeRequest();
        pageLocationRequest:PageLocationRequest=new PageLocationRequest();
        pageRepositoryRequest:PageRepositoryRequest=new PageRepositoryRequest();
        pageCarPartRightRequest:PageCarPartRightRequest=new PageCarPartRightRequest();
        pageCarAccessoryRightRequest:PageCarAccessoryRightRequest=new PageCarAccessoryRightRequest();
        pageCarCertificateRightRequest:PageCarCertificateRightRequest=new PageCarCertificateRightRequest();
        carBase:CarBase=new CarBase();
        repositoryOut:RepositoryOut=new RepositoryOut();
        inAreaId:Number=null;
        isBusinessList:ItemCode[]=[];
        oilList:ItemCode[]=[];
        bsTypeList:ItemCode[]=[];
        reasonList:ItemCode[]=[];
        conditionList:ItemCode[]=[];
        carPartStatusList:ItemCode[]=[];
        repositoryOutCarPartList:RepositoryOutCarPart[]=[];
        repositoryOutAccessoryList:RepositoryOutAccessory[]=[];
        repositoryOutCertificateList:RepositoryOutCertificate[]=[];
        repositoryOutFileList:RepositoryOutFile[]=[];
        fileList:any[]=[];
        collapseValue:Array<string>=["1","2","3","4","5","6"]
        save(){
            (this.$refs.repositoryOutForm as any).validate(async (valid:boolean)=>{
                if(valid){
                    this.$Modal.confirm({
                        title:this.L('Tips'),
                        content:'是否收车确认',
                        okText:this.L('Yes'),
                        cancelText:this.L('No'),
                        onOk:async()=>{
                            this.repositoryOut.status = 40;
                            this.repositoryOut.repositoryOutCarPartList = this.repositoryOutCarPartList;
                            this.repositoryOut.repositoryOutAccessoryList = this.repositoryOutAccessoryList;
                            this.repositoryOut.repositoryOutCertificateList = this.repositoryOutCertificateList;
                            this.repositoryOut.repositoryOutFileList = this.repositoryOutFileList;
                            await this.$store.dispatch({
                                type:'repositoryOut/create',
                                data:this.repositoryOut
                            });
                            (this.$refs.repositoryOutForm as any).resetFields();
                            this.$emit('save-success');
                            this.$emit('input',false);
                        }
                    });
                }
            })
        }
        cancelInRepository(){
            this.$store.commit('repositoryOut/edit',this.repositoryOut);
            this.cancelRepositoryOutShow = true;
        }
        close(){
            this.value = false;
            this.$emit('input',false);
        }
        cancel(){
            this.$emit('input',false);
        }
        visibleChange(value:boolean){
            if(!value){
                this.$emit('input',value);
            }else{
                this.carBase=Util.extend(true,{},this.$store.state.carbase.editCarBase);
                this.getpage()
            }
        }
        async getpage(){
            this.getItemCodeList();
            this.getLocationList();
            this.getRepositoryList();
            this.getCarPartRightList();
            this.getCarAccessoryRightList();
        }
        get clasenName(){
            return (!!this.carBase.clasen)?this.carBase.clasen.clasenName:'';
        }
        locationChange(){
            this.repositoryOut.inRepositoryID = null;
            this.getRepositoryList()
        }
        async getLocationList(){
            await this.$store.dispatch({
                type:'location/getAll',
                data:this.pageLocationRequest
            })
        }
        get locationList(){
            return this.$store.state.location.list
        }
        async getRepositoryList(){
            this.pageRepositoryRequest.areaID = this.inAreaId
            await this.$store.dispatch({
                type:'repository/getAll',
                data:this.pageRepositoryRequest
            })
        }
        get repositoryList(){
            return this.$store.state.repository.list
        }
        async getItemCodeList(){
            this.pageItemCodeRequest.maxResultCount=10000;
            this.pageItemCodeRequest.skipCount=0;
            this.pageItemCodeRequest.itemTypes = [231,411,841,1604,1603,1602];

            let page = await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            })

            this.oilList = (page.items as Array<any>).filter(x=>x.itemType === 231)
            this.isBusinessList = (page.items as Array<any>).filter(x=>x.itemType === 411)
            this.bsTypeList = (page.items as Array<any>).filter(x=>x.itemType === 841)
            this.reasonList = (page.items as Array<any>).filter(x=>x.itemType === 1604)
            this.conditionList = (page.items as Array<any>).filter(x=>x.itemType === 1603)
            this.carPartStatusList = (page.items as Array<any>).filter(x=>x.itemType === 1602)
        }
        get oilName(){
            var temp = this.oilList.find(x=>x.num === this.carBase.oil);
            return (!!temp)? temp.itemName:''
        }
        get bsTypeName(){
            var temp = this.bsTypeList.find(x=>x.num === this.carBase.bstype);
            return (!!temp)? temp.itemName:''
        }
        get isBusinessName(){
            var temp = this.isBusinessList.find(x=>x.num === this.carBase.isBusiness);
            return (!!temp)? temp.itemName:''
        }
        async getCarPartRightList(){
            this.pageCarPartRightRequest.oilID = this.carBase.oil
            await this.$store.dispatch({
                type:'carPartRight/getAll',
                data:this.pageCarPartRightRequest
            })
        }
        get carPartList(){
            var list = [];
            (this.$store.state.carPartRight.list as Array<any>).map(x=>{
                if(list.every(y=>y.id !== x.carPartID)){
                    list.push(x.carPart);
                }
            })
            return list
        }
        repositoryOutCarPartColumns=[{
            title:'车辆部位',
            align: 'center',
            tooltip:true,
            render: (h:any, params:any) => {
                var temp = this.carPartList.find(x=>x.id === params.row.carPartID);
                return h('span',(!!temp)? temp.carPartName:'')
            }
        },{
            title:'状态',
            align: 'center',
            tooltip:true,
            render: (h:any, params:any) => {
                var temp = this.carPartStatusList.find(x=>x.num === params.row.status);
                return h('span',(!!temp)? temp.itemName:'')
            }
        },{
            title:'备注',
            align: 'center',
            tooltip:true,
            key:'memo'
        },{
            title:'维护',
            align: 'center',
            tooltip:true,
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
                                this.$store.commit('repositoryOutCarPart/edit',params.row);
                                this.editRepositoryOutCarPart();
                            }
                        }
                    },this.L('Edit')),
                ])
            }
        },{
            title:'删除',
            align: 'center',
            tooltip:true,
            render:(h:any,params:any)=>{
                return h('div',[
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
                                            this.repositoryOutCarPartList = this.repositoryOutCarPartList.filter(x=>x.carPartID !== params.row.carPartID);
                                        }
                                })
                            }
                        }
                    },this.L('Delete'))
                ])
            }
        }]
        editRepositoryOutCarPart(){
            this.editRepositoryOutCarPartShow = true;
        }
        async getCarAccessoryRightList(){
            this.pageCarAccessoryRightRequest.oilID = this.carBase.oil
            await this.$store.dispatch({
                type:'carAccessoryRight/getAll',
                data:this.pageCarAccessoryRightRequest
            })
            this.repositoryOutAccessoryList = this.carAccessoryList.map(x=>{
                var repositoryOutAccessory = new RepositoryOutAccessory();
                repositoryOutAccessory.carAccessoryID == x.id;
                return repositoryOutAccessory;
            })
        }
        get carAccessoryList(){
            var list = [];
            (this.$store.state.carAccessoryRight.list as Array<any>).map(x=>{
                if(list.every(y=>y.id !== x.carAccessoryID)){
                    list.push(x.carAccessory);
                }
            })
            return list
        }
        repositoryOutAccessoryColumns=[
            {
                title:'应收',
                align: 'center',
                tooltip:true,
                key:'disabled'
            },{
                title: '缺件',
                align: 'center',
                tooltip:true,
                render:(h:any,params:any)=>{
                    return h('Checkbox',{
                        props:{
                            value:params.row.lack===1,
                            disabled:params.row.disabled
                        },
                        on:{
                            'on-change':async (value)=>{
                                params.row.lack=value? 1 : 0;
                            }
                        }
                    })
                }
            },{
                title: '配件',
                align: 'center',
                tooltip:true,
                key:'carAccessoryID',
                render:(h:any,params:any)=>{
                    var carAccessory = this.carAccessoryList.find(x=>x.id === params.row.carAccessoryID)
                    return h('span' ,(!!carAccessory)?carAccessory.carAccessoryName:'')
                }
            },{
                title: '应收数量',
                align: 'center',
                tooltip:true,
                key:'dueQty'
            },{
                title: '实收数量',
                align: 'center',
                tooltip:true,
                key:'qty'
            },{
                title:'备注',
                align: 'center',
                tooltip:true,
                key:'memo'
            }
        ]
        async getCarCertificateRightList(){
            this.pageCarCertificateRightRequest.oilID = this.carBase.oil
            await this.$store.dispatch({
                type:'carCertificateRight/getAll',
                data:this.pageCarAccessoryRightRequest
            })
            this.repositoryOutCertificateList = this.carCertificateList.map(x=>{
                var repositoryOutCertificate = new RepositoryOutCertificate();
                repositoryOutCertificate.carCertificateID == x.id;
                return repositoryOutCertificate;
            })
        }
        get carCertificateList(){
            var list = [];
            (this.$store.state.carCertificateRight.list as Array<any>).map(x=>{
                if(list.every(y=>y.id !== x.carCertificateID)){
                    list.push(x.carCertificate);
                }
            })
            return list
        }
        repositoryOutCertificateColumns=[{
            title:'应收',
            align: 'center',
            tooltip:true,
            key:'disabled'
        },{
            title: '缺件',
            align: 'center',
            tooltip:true,
            render:(h:any,params:any)=>{
                return h('Checkbox',{
                    props:{
                        value:params.row.lack===1,
                        disabled:params.row.disabled
                    },
                    on:{
                        'on-change':async (value)=>{
                            params.row.lack=value? 1 : 0;
                        }
                    }
                })
            }
        },{
            title: '配件',
            align: 'center',
            tooltip:true,
            key:'carCertificateID',
            render:(h:any,params:any)=>{
                var carCertificate = this.carCertificateList.find(x=>x.id === params.row.carCertificateID)
                return h('span' ,(!!carCertificate)?carCertificate.carCertificateName:'')
            }
        },{
            title: '应收数量',
            align: 'center',
            tooltip:true,
            key:'dueQty'
        },{
            title: '实收数量',
            align: 'center',
            tooltip:true,
            key:'qty'
        },{
            title:'备注',
            align: 'center',
            tooltip:true,
            key:'memo'
        }]
        handleBeforeUpload (file) {
            this.fileList=[];
            this.fileList.push(file)
            for(var i = 0;i<this.fileList.length;i++){
                //上传类型判断
                var imgName =this.fileList[i].name;
                var idx = imgName.lastIndexOf(".");  
                if (idx != -1){
                    var fileExt = imgName.substr(idx+1).toUpperCase(); 
                    fileExt = fileExt.toLowerCase( ); 
                    if (fileExt!='pdf' && fileExt!='doc' && fileExt!='docx' && fileExt != 'xlsx' && fileExt != 'xls' && fileExt != 'jpg'){
                        this.$Notice.warning({
                            title: '文件类型错误',
                            desc: '文件：' + file.name + '的类型不正确，请选择后缀为.pdf、.doc、.docx、xls、xlsx和jpg的文件。'
                        })
                    }else{
                        this.readFile(this.fileList[i]);
                    }   
                }
            }  
            return false
        }
        readFile (file) {
            var formData = new FormData();
            file.name = this.carBase.makNo+'-'+file.name;
            formData.append('dirName','RepositoryOut');
            formData.append('fileInfo',file);
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            var url = process.env.NODE_ENV === 'production' ? 'http://192.168.21.50:8080/api/upload' : process.env.NODE_ENV === 'stage' ? 'http://192.168.21.150:8080/api/upload' : 'http://192.168.21.150:8080/api/upload';
            Axios.post(url,formData,config)
            .then((response) => {
                if(response.statusText=="OK"){
                    this.$Message.success('文件上传成功');
                    this.uploadLoading=false;
                    var repositoryOutFile = new RepositoryOutFile();
                    repositoryOutFile.type = 2;
                    repositoryOutFile.fileName = file.name;
                    repositoryOutFile.url = response.data[0].url;
                    this.repositoryOutFileList.push(repositoryOutFile)
                }
            })
        }
        handleUploadFile(){
            this.uploadLoading=true;
        }
        repositoryOutFileColumns=[{
            title:'档案',
            align: 'center',
            tooltip:true,
            key:'fileName'
        },{
            title:'删除',
            align: 'center',
            tooltip:true,
            render:(h:any,params:any)=>{
                return h('div',[
                    h('Button',{
                        props:{
                            type:'error',
                            size:'small'
                        },
                        on:{
                            click:async ()=>{
                                this.$Modal.confirm({
                                        title:this.L('Tips'),
                                        content:'是否确认删除？<br/>档案：'+params.row.fileName,
                                        okText:this.L('Yes'),
                                        cancelText:this.L('No'),
                                        onOk:async()=>{
                                            this.repositoryOutFileList = this.repositoryOutFileList.filter(x=>x.url !== params.row.url);
                                        }
                                })
                            }
                        }
                    },this.L('Delete'))
                ])
            }
        }]
        repositoryOutRule={

        }
    }
</script>