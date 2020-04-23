<template>
    <div>
        <Modal
         :title="L('车籍资料')"
         :value="value" 
         @on-ok="save"
         @on-visible-change="visibleChange"
         fullscreen
         footer-hide
        >
            <Form ref="carBaseForm" :model="Form1" :rules="checkForm" :label-width="80" inline>
                <Row>
                    <Col span="6">
                        <FormItem label="公司别" style="width: 100%" prop="incAuto">
                            <Select :placeholder="L('Select')" v-model="Form1.incAuto">
                                <Option v-for="item in incList" :value="item.id" :key="item.id">{{ item.sname }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    
                </Row>
                <Row>
                    <Col span="6">
                        <FormItem label="车牌号码" style="width: 100%" prop="makNo">
                            <Input v-model="Form1.makNo" style="width: 70%"></Input>&nbsp;
                            <Button type="primary" ghost @click="temporarymakNo" :loading="makNoLoading">临时车牌</Button>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="车牌颜色" style="width: 100%" prop="makColor">
                            <Select :placeholder="L('Select')" v-model="Form1.makColor">
                                <Option v-for="item in ddlMakColorList" :value="item.itemName" :key="item.itemName">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="登记证号" style="width: 100%" prop="linceNo">
                            <Input v-model="Form1.linceNo"></Input>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="登记日期" style="width: 100%" prop="linceDt">
                            <DatePicker v-model="Form1.linceDt" type="date" style="width: 100%" @on-change="LinceDTChange"></DatePicker>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="6">
                        <FormItem label="总厂牌" style="width: 100%" prop="factoryBrandAuto">
                            <Select :placeholder="L('Select')" v-model="Form1.factoryBrandAuto" @on-change="factoryBrandchange">
                                <Option v-for="item in ddlFactoryBrandAutoList" :value="item.id" :key="item.id">{{ item.factoryBrandName }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="厂牌" style="width: 100%" prop="brandAuto">
                            <Select :placeholder="L('Select')" v-model="Form1.brandAuto" @on-change="brandchange">
                                <Option v-for="item in ddlBrandAutoList" :value="item.id" :key="item.id">{{ item.brandName }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="车型" style="width: 100%" prop="clasenAuto">
                            <Select :placeholder="L('Select')" v-model="Form1.clasenAuto">
                                <Option v-for="item in ddlClasenAutoList" :value="item.id" :key="item.id">{{ item.clasenName }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="车辆型号" style="width: 100%" prop="clasenCode">
                            <Input v-model="Form1.clasenCode"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="6">
                        <FormItem label="排气量" style="width: 100%" prop="cc">
                            <InputNumber v-model="Form1.cc" :formatter="value => `${value}`.replace(/B(?=(d{3})+(?!d))/g, ',')" :parser="value => value.replace(/$s?|(,*)/g, '')" style="width: 100%"></InputNumber>          
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="座位数" style="width: 100%" prop="percnt">
                            <Select :placeholder="L('Select')" v-model="Form1.percnt">
                                <Option v-for="item in ddlPercntList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="轮胎数" style="width: 100%" prop="wheel">
                            <Select :placeholder="L('Select')" v-model="Form1.wheel">
                                <Option v-for="item in ddlWheelList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="车身颜色" style="width: 100%" prop="carColor">
                            <Input v-model="Form1.carColor"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="6">
                        <FormItem label="发动机号" style="width: 100%" prop="engNo">
                            <Input v-model="Form1.engNo"></Input>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="车架号" style="width: 100%" prop="carNo">
                            <Input v-model="Form1.carNo"></Input>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="出厂日期" style="width: 100%" prop="carDt">
                            <DatePicker v-model="Form1.carDt" type="date" style="width: 100%" @on-change="CarDTChange"></DatePicker>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="燃油种类" style="width: 100%" prop="oil">
                            <Select :placeholder="L('Select')" v-model="Form1.oil">
                                <Option v-for="item in ddloilList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="6">
                        <FormItem label="牌价" style="width: 100%" prop="listPrice">
                            <Input v-model="Form1.listPrice"></Input>
                        </FormItem>
                    </Col>
                    <!-- <Col span="6">
                        <FormItem label="车辆性质" style="width: 100%" prop="carType">
                            <Select :placeholder="L('Select')" v-model="Form1.carType">
                                <Option v-for="item in ddlCarTypeList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>
                    </Col> -->
                    <Col span="6">
                        <FormItem label="进口车" style="width: 100%" prop="isImport">
                            <Select :placeholder="L('Select')" v-model="Form1.isImport">
                                <Option v-for="item in ddlIsImportList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="配置版本" style="width: 100%" prop="clasenVer">
                            <Input v-model="Form1.clasenVer"></Input>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="制造厂商" style="width: 100%" prop="manufacturer">
                            <Select :placeholder="L('Select')" v-model="Form1.manufacturer">
                                <Option v-for="item in ddlManufacturerList" :value="item.id" :key="item.id">{{ item.fname }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="6">
                        <FormItem label="购入厂商" style="width: 100%;" prop="supplier">
                            <Select :placeholder="L('Select')" v-model="Form1.supplier">
                                <Option v-for="item in ddlSupplierList" :value="item.id" :key="item.id">{{ item.fname }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="汽车产地" style="width: 100%" prop="createPlace">
                            <Input v-model="Form1.createPlace"></Input>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="使用性质" style="width: 100%" prop="useType">
                            <Select :placeholder="L('Select')" v-model="Form1.useType">
                                <Option v-for="item in ddlUseTypeList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="车种" style="width: 100%" prop="category">
                            <Select :placeholder="L('Select')" v-model="Form1.category">
                                <Option v-for="item in ddlCategoryList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="6">
                        <FormItem label="车险座位别" style="width: 100%" prop="insurePercnt">
                            <Select :placeholder="L('Select')" v-model="Form1.insurePercnt">
                                <Option v-for="item in ddlInsurePercntList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="车险性质别" style="width: 100%" prop="isBusiness">
                            <Select :placeholder="L('Select')" v-model="Form1.isBusiness">
                                <Option v-for="item in ddlIsBusinessList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="备用钥匙" style="width: 100%" prop="keyCount">
                            <Select :placeholder="L('Select')" v-model="Form1.keyCount">
                                <Option v-for="item in ddlKeyCountList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="车辆使用地" style="width: 100%" prop="provinceCode">
                            <Select :placeholder="L('Select')" v-model="Form1.provinceCode" @on-change="provincechange" style="width:45%">
                                <Option v-for="item in creditProvinceList" :value="item.code" :key="item.code">{{ item.name }}</Option>
                            </Select>&nbsp;
                            <Select :placeholder="L('Select')" v-model="Form1.cityCode" style="width:50%">
                                <Option v-for="item in creditCityList" :value="item.code" :key="item.code">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="6">
                        <FormItem label="领照日期" style="width: 100%" prop="makDt">
                            <DatePicker v-model="Form1.makDt" type="date" style="width: 100%" @on-change="MakDTChange"></DatePicker>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="备注" style="width: 100%" prop="memo">
                            <Input v-model="Form1.memo"></Input>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="车辆吨数" style="width: 100%" prop="rentCarType">
                            <InputNumber v-model="Form1.rentCarType" style="width:85%" :precision="2"
                            :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                            :parser="value => value.replace(/$s?|(,*)/g, '')"></InputNumber>&nbsp;&nbsp;吨
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="实际吨数" style="width: 100%" prop="ton">
                            <InputNumber v-model="Form1.ton" style="width:85%" :precision="2"
                            :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                            :parser="value => value.replace(/$s?|(,*)/g, '')"></InputNumber>&nbsp;&nbsp;吨
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="6">
                        <FormItem label="首保" style="width: 100%" prop="mtnFirst">
                            <Select :placeholder="L('Select')" v-model="Form1.mtnFirst" style="width:40%">
                                <Option v-for="item in ddlMtnFirstList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                            </Select>&nbsp;km
                            或&nbsp;<InputNumber v-model="Form1.mtnFirstMonth" :min="1" style="width:35%"></InputNumber>&nbsp;个月
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="二保" style="width: 100%" prop="ddlMtnSecond">
                            <Select :placeholder="L('Select')" v-model="ddlMtnSecond" style="width:40%" @on-change="ddlMtnSecondchange">
                                <Option v-for="item in ddlMtnSecondList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                            </Select>&nbsp;km
                            或&nbsp;<InputNumber v-model="Form1.mtnSecondMonth" :min="1" style="width:35%"></InputNumber>&nbsp;个月 
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="定保" style="width: 100%" prop="ddlMtnCycle">
                            <Select :placeholder="L('Select')" v-model="ddlMtnCycle" style="width:85%" @on-change="ddlMtnCyclechange">
                                <Option v-for="item in ddlMtnCycleList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                            </Select>&nbsp;&nbsp;km
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="" style="width: 100%">
                            <p style="color:green">定保为：<label>{{ddlMtnSecond}}</label>KM+<label>{{ddlMtnCycle}}</label>KM</p>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="6">
                        <FormItem label="年审截止" style="width: 100%" prop="yearCheckDt">
                            <DatePicker v-model="Form1.yearCheckDt" type="date" style="width: 100%" @on-change="YearCheckDTChange"></DatePicker>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="养路费截止" style="width: 100%" prop="roadCheckDt">
                            <DatePicker v-model="Form1.roadCheckDt" type="date" style="width: 100%" @on-change="RoadCheckDTChange"></DatePicker>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="排放标准" style="width: 100%" prop="es">
                            <Select :placeholder="L('Select')" v-model="Form1.es" style="width: 40%">
                                <Option v-for="item in ddlESList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                            </Select>&nbsp;
                            <Input v-model="Form1.esremark" style="width: 55%"></Input>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="变速类型" style="width: 100%" prop="bstype">
                            <Select :placeholder="L('Select')" v-model="Form1.bstype">
                                <Option v-for="item in ddlBsTypeList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="6">
                        <FormItem label="交车日期" style="width: 100%" prop="jcdt">
                            <DatePicker v-model="Form1.jcdt" type="date" style="width: 100%" @on-change="JCDTChange"></DatePicker>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="拨款日期" style="width: 100%" prop="bkdt">
                            <DatePicker v-model="Form1.bkdt" type="date" style="width: 100%" @on-change="BKDTChange"></DatePicker>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="车历状态" style="width: 100%">
                            <p style="color:green">未领牌</p>
                        </FormItem>
                    </Col>
                    <Col span="6" style="display:none;">
                        <FormItem label="车籍状态" style="width: 100%" prop="status">
                            <Select :placeholder="L('Select')" v-model="Form1.status">
                                <Option v-for="item in ddlStatusList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row style="margin-bottom:20px">
                    <Col span="6">
                        <FormItem label="批次数量" style="width: 100%" prop="batch">
                            <InputNumber v-model="batch" :min="1" style="width: 100%"></InputNumber>
                        </FormItem>
                    </Col>
                    
                </Row>
                <Row>
                    <Col span="4" style="margin-left:20px">
                        <Button icon="ios-download-outline" @click="exporttoExcel" :loading="excelLoading" type="primary" ghost shape="circle" size="large">批量生成</Button>
                    </Col>
                    <Col span="4">
                        <Upload action="" :before-upload="handleBeforeUpload" accept=".xls, .xlsx"><!-- accept:接受上传的文件类型 -->
                            <Button icon="ios-cloud-upload-outline" :loading="uploadLoading" @click="handleUploadFile" size="large" type="primary" ghost>批量导入</Button>
                        </Upload>
                    </Col>
                    <Col span="4">
                        <Button icon="ios-download-outline" @click="getdictionary" type="primary" shape="circle" size="large" ghost>批量导入帮助档</Button>
                    </Col>
                    <Col span="4">
                        <Button @click="save" type="primary" size="large">添加</Button>
                    </Col>
                    <Col span="4">
                        <Button @click="cancel" size="large">取消</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <transition name="fade"><!-- 动画 -->
                        <Progress v-if="showProgress" :percent="progressPercent" :stroke-width="2"><!-- 进度条 -->
                            <div v-if="progressPercent == 100">
                            <Icon type="ios-checkmark-circle"></Icon>
                            <span>文件读取成功</span>
                            </div>
                        </Progress>
                    </transition>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <transition name="fade"><!-- 动画 -->
                        <Progress v-if="showProgress" :percent="loadingProgress" :stroke-width="2"><!-- 进度条 -->
                            <div v-if="loadingProgress == 100">
                            <Icon type="ios-checkmark-circle"></Icon>
                            <span>文件上传成功</span>
                            </div>
                        </Progress>
                    </transition>
                    </Col>
                </Row>
            </Form>
            <Spin size="large" fix v-if="spinShow"></Spin>
            <!-- <div slot="footer">
                <Button @click="cancel">{{L('Cancel')}}</Button>
                <Button @click="save" type="primary">添加</Button>
            </div> -->
        </Modal>
    </div>
</template>
<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '../../../lib/util'
    import AbpBase from '../../../lib/abpbase'
    import PageRequest from '@/store/entities/page-request'
    import CarBase from '@/store/entities/car/carbase'
    import publicclass from '../../../lib/publicclass'
    import Excel from '@/lib/excel'

    class PageCarBaseRequest extends PageRequest{
        maxResultCount=10000
        skipCount=0
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
    class PageFactoryBrandRequest extends PageRequest{//总厂牌
        maxResultCount=10000
        skipCount=0
    }
    class PageBrandRequest extends PageRequest{//厂牌
        maxResultCount=10000
        skipCount=0
    }
    class PageClasenRequest extends PageRequest{//车型
        maxResultCount=10000
        skipCount=0
    }
    class PageSupplierRequest extends PageRequest{//厂商
        maxResultCount=10000
        skipCount=0
        supplierTypes:Array<number>;
    }
    class PageCreditProvinceRequest extends PageRequest{//省
        maxResultCount=10000
        skipCount=0
    }
    class PageCreditCityRequest extends PageRequest{//市
        maxResultCount=10000
        skipCount=0
        provinceCode=0
    }

    @Component
    export default class CreateCarBase extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        carBase:CarBase=new CarBase();
        pageCarBaseRequest:PageCarBaseRequest = new PageCarBaseRequest();
        pageIncRequest:PageIncRequest=new PageIncRequest();//公司别
        pageItemCodeRequest:PageItemCodeRequest=new PageItemCodeRequest();
        pageFactoryBrandRequest:PageFactoryBrandRequest=new PageFactoryBrandRequest();//总厂牌
        pageBrandRequest:PageBrandRequest=new PageBrandRequest();//厂牌
        pageClasenRequest:PageClasenRequest=new PageClasenRequest();//车型
        pageSupplierRequest:PageSupplierRequest=new PageSupplierRequest();//厂商
        pageCreditProvinceRequest:PageCreditProvinceRequest=new PageCreditProvinceRequest();//省
        pageCreditCityRequest:PageCreditCityRequest=new PageCreditCityRequest();//市
        newCarBase:any=[];//批次产生车籍
        batch:any=0;//批次数量选择
        dictionaryList:any=[];

        //上传/读取附件
        file: any = null;//文件名
        uploadLoading: boolean = false;
        showProgress: boolean = false;//显示进度
        progressPercent: Number = 0;//读取文件进度百分比
        loadingProgress: Number = 0;//上传文件进度百分比

        excelLoading:boolean=false;//导Excel加载Loading
        makNoLoading:boolean=false;//获取临时车牌Loading
        spinShow=true;//进入页面加载动画

        /**自定义的值 */
            ddlMtnSecond:any=0;//二保
            ddlMtnCycle:any=0;//定保

            incType:any=[];//公司别
            ddloilmore:any=[];//燃油种类
            brandLable:any=[];//厂牌
            clasenType:any=[];//车型
            seating:any=[];//座位数
            tireNumber:any=[];//轮胎数
            //carNature:any=[];//车辆性质
            importedCar:any=[];//进口车
            manufacturer:any=[];//制造厂商
            buypartners:any=[];//购入厂商
            useNature:any=[];//使用性质
            caroftype:any=[];//车种
            carinsurance:any=[];//车险座位别
            carofNature:any=[];//车险性质别
            falsekey:any=[];//备用钥匙
            firstMtn:any=[];//首保
            secondMtn:any=[];//二保
            settoprotect:any=[];//定保
            emissionstandard:any=[];//排放标准
            transmissiontype:any=[];//变速类型
            movethereaso:any=[];//异动原因
            makNoColor:any=[];//车牌颜色
            factoryBrandAutomore:any=[];//总厂牌
            insures:any=[];//保险
            province:any=null;//省
            city:any=null;//市
            brandlist:any=[];//厂牌
            clasenlist:any=[];//车型

        Form1={
            incAuto:1,//公司别
            makNo:"",//车牌号码
            makColor:"",//车牌颜色
            linceNo:"",//登记证号
            linceDt:null,//登记日期
            factoryBrandAuto:0,//总厂牌
            brandAuto:0,//厂牌
            clasenAuto:0,//车型
            clasenCode:"",//车辆型号
            cc:0,//排气量
            percnt:0,//座位数
            wheel:0,//轮胎数
            carColor:"",//车身颜色
            engNo:"",//发动机号
            carNo:"",//车架号
            carDt:null,//出厂日期
            oil:0,//燃油种类
            listPrice:0,//牌价
            //carType:0,//车辆性质
            isImport:0,//进口车
            clasenVer:"",//配置版本
            manufacturer:0,//制造厂商
            supplier:0,//购入厂商
            createPlace:"",//汽车产地
            useType:0,//使用性质
            category:0,//车种
            insurePercnt:0,//车险座位别
            isBusiness:0,//车险性质别
            keyCount:0,//备用钥匙
            provinceCode:0,//车辆使用地 省
            cityCode:0,//车辆使用地 市
            makDt:null,//领照日期
            memo:"",//备注
            mtnFirst:0,//首保
            mtnFirstMonth:0,//首保
            mtnSecond:0,//二保
            mtnSecondMonth:0,//二保
            mtnCycle:0,//定保
            yearCheckDt:null,//年审截止
            roadCheckDt:null,//养路费截止
            rentCarType:0,//车辆吨数
            ton:0,//实际吨数
            es:0,//排放标准
            esremark:"",//排放标准
            bstype:0,//变速类型
            jcdt:null,//交车日期
            bkdt:null,//拨款日期
            status:0,//异动原因
            itemType:225
        }
        save(){
            if(this.Form1.factoryBrandAuto==0){
                this.Form1.factoryBrandAuto=null;
            }if(this.Form1.percnt==0){
                this.Form1.percnt=null;
            }if(this.Form1.wheel==0){
                this.Form1.wheel=null;
            }
            (this.$refs.carBaseForm as any).validate(async (valid:boolean)=>{
                this.evaluation();
                if(valid){
                    await this.$store.dispatch({
                        type:'carbase/create',
                        data:this.carBase
                    });
                    (this.$refs.carBaseForm as any).resetFields();
                    this.$emit('save-success');
                    this.$emit('input',false);
                }
            })
        }
        cancel(){
            this.clearModel();
            this.$emit('input',false);
        }
        async visibleChange(value:boolean){
            this.spinShow=true;//加载动画
            if(!value){
                this.$emit('input',value);
                this.clearModel();
            }else{
                await this.getList();
                this.spinShow=false;//加载动画
            }
        }
        //列表  
            get incList(){//公司别
                return this.incType;
            }
            get ddlMakColorList(){//车牌颜色
                return this.makNoColor;
            }
            get ddlFactoryBrandAutoList(){//总厂牌
                return this.factoryBrandAutomore;
            }
            get ddlBrandAutoList(){//厂牌
                return this.brandLable;
            }
            get ddlClasenAutoList(){//车型
                return this.clasenType;
            }
            get ddlPercntList(){//座位数
                return this.seating;
            }
            get ddlWheelList(){//轮胎数
                return this.tireNumber;
            }
            get ddloilList(){//燃油种类
                return this.ddloilmore;
            }
            // get ddlCarTypeList(){//车辆性质
            //     return this.carNature;
            // }
            get ddlIsImportList(){//进口车
                return this.importedCar;
            }
            get ddlManufacturerList(){//制造厂商
                return this.manufacturer;
            }
            get ddlSupplierList(){//购入厂商
                return this.buypartners;
            }
            get ddlUseTypeList(){//使用性质
                return this.useNature;
            }
            get ddlCategoryList(){//车种
                return this.caroftype;
            }
            get ddlInsurePercntList(){//车险座位别
                return this.carinsurance;
            }
            get ddlIsBusinessList(){//车险性质别
                return this.carofNature;
            }
            get ddlKeyCountList(){//备用钥匙
                return this.falsekey;
            }
            get ddlMtnFirstList(){//首保
                return this.firstMtn;
            }
            get ddlMtnSecondList(){//二保
                return this.secondMtn;
            }
            get ddlMtnCycleList(){//定保
                return this.settoprotect;
            }
            get ddlESList(){//排放标准
                return this.emissionstandard;
            }
            get ddlBsTypeList(){//变速类型
                return this.transmissiontype;
            }
            get ddlStatusList(){//车籍状态
                return this.movethereaso;
            }
            get creditProvinceList(){//车辆使用地 省
                return this.province;
            }
            get creditCityList(){//车辆使用地 市
                return this.city;
            }

        async getList(){
            /**公司别 */
             await this.$store.dispatch({
                type:'inc/getAll',
                data:this.pageIncRequest
             }).then(res=>{
                this.incType=res.items;
                
            })
            /**车牌颜色 */
            this.pageItemCodeRequest.itemTypes = [221];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                this.makNoColor = res.items
            })
            /**燃油种类 */
            this.pageItemCodeRequest.itemTypes = [231];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                this.ddloilmore = res.items
            })
            /**座位数 */
            this.pageItemCodeRequest.itemTypes = [222];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                this.seating = res.items
            })
            /**轮胎数 */
            this.pageItemCodeRequest.itemTypes = [223];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                this.tireNumber = res.items
            })
            /**总厂牌 */
             await this.$store.dispatch({
                type:'factorybrand/GetAll',
                data:this.pageFactoryBrandRequest
             }).then(res=>{
                this.factoryBrandAutomore=res.items
            })
           
            /**进口车 */
            this.pageItemCodeRequest.itemTypes = [227];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                this.importedCar = res.items
            })
            /**使用性质 */
            this.pageItemCodeRequest.itemTypes = [225];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                this.useNature = res.items
            })
            /**车种 */
            this.pageItemCodeRequest.itemTypes = [226];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                this.caroftype = res.items
            })
            /**车险座位别 */
            this.pageItemCodeRequest.itemTypes = [410];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                this.carinsurance = res.items
            })
            /**车险性质别 */
            this.pageItemCodeRequest.itemTypes = [411];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                this.carofNature = res.items
            })
            /**备用钥匙 */
            this.pageItemCodeRequest.itemTypes = [232];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                this.falsekey = res.items
            })
            /**首保 */
            this.pageItemCodeRequest.itemTypes = [228];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                this.firstMtn = res.items
            })
            /**二保 */
            this.pageItemCodeRequest.itemTypes = [229];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                this.secondMtn = res.items
            })
            /**定保 */
            this.pageItemCodeRequest.itemTypes = [230];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                this.settoprotect = res.items
            })
            /**排放标准 */
            this.pageItemCodeRequest.itemTypes = [840];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                this.emissionstandard = res.items
            })
            /**变速类型 */
            this.pageItemCodeRequest.itemTypes = [841];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                this.transmissiontype = res.items
            })
            /**异动原因 */
            this.pageItemCodeRequest.itemTypes = [233];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                this.movethereaso = res.items
            })
            /**制造厂商 */
             this.pageSupplierRequest.supplierTypes=[5];
             await this.$store.dispatch({
                type:'supplier/getAll',
                data:this.pageSupplierRequest
             }).then(res=>{
                this.manufacturer=res.items;
            })
            /**购入厂商 */
             this.pageSupplierRequest.supplierTypes=[6,7];
             await this.$store.dispatch({
                type:'supplier/getAll',
                data:this.pageSupplierRequest
             }).then(res=>{
                this.buypartners=res.items;
            })
            // /**车辆性质 */
             // this.pageItemCodeRequest.itemTypes = [224];
             // await this.$store.dispatch({
             //     type:'itemCode/GetItemCodeByItemTypes',
             //     data:this.pageItemCodeRequest
             // }).then(res=>{
             //     this.carNature = res.items
             // })
            /**车辆使用地 省 */
             await this.$store.dispatch({
                type:'creditProvince/getAll',
                data:this.pageCreditProvinceRequest
             }).then(res=>{
                this.province = res.items
            })
            /**车辆使用地 市 */
            await this.$store.dispatch({
                type:'creditCity/getAll',
                data:this.pageCreditCityRequest
            }).then(res=>{
                this.city = res.items
            })

            await this.$store.dispatch({//厂牌
                type:'brand/GetAll',
                data:this.pageBrandRequest
            }).then(res=>{
                this.brandlist=res.items
            })
            await this.$store.dispatch({//车型
                type:'clasen/GetAll',
                data:this.pageClasenRequest
            }).then(res=>{
                this.clasenlist=res.items
            })
        }
        /**根据总厂牌显示厂牌 */
         async factoryBrandchange(f){
            this.Form1.brandAuto=null;//清空第二个select的选项
            this.brandLable=[];//清空厂牌上一次的数据
            await this.$store.dispatch({
                type:'brand/GetAll',
                data:this.pageBrandRequest
            }).then(res=>{
                res.items.map(i=>{
                    if(i.factoryBrand.id==f){
                        this.brandLable.push(i)
                    }
                })
            })
        }
        /**根据厂牌显示车型 */
         async brandchange(b){
            this.Form1.clasenAuto=null;//清空第二个select的选项
            this.clasenType=[];//清空车型上一次的数据
            await this.$store.dispatch({
                type:'clasen/GetAll',
                data:this.pageClasenRequest
            }).then(res=>{
                res.items.map(i=>{
                    if(i.brandAuto==b){
                        this.clasenType.push(i)
                    }
                })
            })
        }
        /**根据省份选中城市 */
         async provincechange(p){
            this.Form1.cityCode=null;//清空第二个select的选项
            this.city=[];//清空城市上一次的数据
            this.pageCreditCityRequest.provinceCode=p;
            await this.$store.dispatch({
                type:'creditCity/getAll',
                data:this.pageCreditCityRequest
            }).then(res=>{
                res.items.map(i=>{
                    if(i.provinceId==p){
                        this.city.push(i)
                    }
                })
            })
        }
        //二保
         ddlMtnSecondchange(){
            this.Form1.mtnSecond=this.ddlMtnSecond;
        }
        //定保
         ddlMtnCyclechange(){
            this.Form1.mtnCycle=this.ddlMtnCycle;
        }
        //临时车牌
         async temporarymakNo(){
            this.makNoLoading=true;
            var maxmakNo=0;//车籍表里最大的流水号
            var newmakNo='';//临时车牌
            await this.$store.dispatch({//1.获取最大编号
                type:'carbase/SelectMaxCarBaseId',
                data:this.pageCarBaseRequest
            }).then(res=>{
               maxmakNo=res;
            });
            var sum=maxmakNo+1;//查询数据库车籍编号最大的编号加一
            var maxmakLength=sum.toString();//编号字符长度
            //maxmakLength.padEnd(6,'0');//尾部补0
            newmakNo="@@"+maxmakLength.padStart(6, '0');//字符没有到达指定长度，在头部补0
            this.makNoLoading=false;
            this.Form1.makNo=newmakNo;//新的临时车牌
        }
        //批次产生车籍（批次数量可选）
         async exporttoExcel(){
            if(this.Form1.factoryBrandAuto==0||this.Form1.brandAuto==0||this.Form1.clasenAuto==0||this.Form1.percnt==0||this.Form1.wheel==0||this.Form1.oil==0||
            this.Form1.isImport==0||this.Form1.manufacturer==0||this.Form1.supplier==0||this.Form1.insurePercnt==0||this.Form1.isBusiness==0||this.Form1.provinceCode==0||this.Form1.cityCode==0
            ||this.batch==0){
                this.checkinput();
            }
           else{
            this.excelLoading=true;//加载中
            var maxmakNo=0;
            var newmakNo='';
            //提示框
            this.$Notice.info({
                title: '提示',
                desc: '批次导入车籍时请对应字典档编写',
                duration: 0
            });
            //获取数据库id最大值
            await this.$store.dispatch({
                type:'carbase/SelectMaxCarBaseId',
                data:this.pageCarBaseRequest
            }).then(res=>{
               maxmakNo=res;
            });
            //1.循环批次(加临时车牌)
            for (let index = 1; index <= this.batch; index++) {
                var arr=Util.extend(true,{},this.Form1);
                //车牌号
                var sum=maxmakNo+index;
                var maxmakLength=sum.toString();
                newmakNo="@@"+maxmakLength.padStart(6, '0');
                //赋值
                arr.makNo=newmakNo;
                this.newCarBase.push(arr);
            }
            //2.数据写入excel
            require.ensure([], () => {
                const { export_json_to_excel } = require('../../../excel/Export2Excel');
                //设置Excel的表格第一行的标题
                const tHeader = ['公司別','车牌号码','登记证号','登记日期','总厂牌','厂牌','车型','车辆型号','排气量','座位数','轮胎数',
                                '车身颜色','发动机号','车架号', '出厂日期','燃油种类','车牌颜色','牌价','进口车','配置版本',
                                '制造厂商','购入厂商','汽车产地','使用性质','车种','车险座位别','车险性质别','备用钥匙',
                                '车辆使用地省份','车辆使用地城市','领照日期','备注','首保','第一次保养月数','二保','第二次保养月数','定保','年审截止',
                                '养路费截止','车辆吨数','实际吨数','排放标准','排放标准备注','变速类型','交车日期','拨款日期','车籍状态','itemCode类型'];
                //filterVal对应的是获取到的数据对象的属性，和tHeader对应
                 const filterVal = ['incAuto','makNo','linceNo','linceDt','factoryBrandAuto','brandAuto','clasenAuto','clasenCode','cc','percnt','wheel', 
                                    'carColor','engNo','carNo','carDt','oil','makColor','listPrice','isImport','clasenVer',
                                    'manufacturer','supplier','createPlace','useType','category','insurePercnt','isBusiness','keyCount',
                                    'provinceCode','cityCode','makDt','memo','mtnFirst','mtnFirstMonth','mtnSecond','mtnSecondMonth','mtnCycle','yearCheckDt',
                                    'roadCheckDt','rentCarType','ton','es','esremark','bstype','jcdt','bkdt','status','itemType'];                 
                const list = this.newCarBase;//把获取的数据存到list 
                const data = this.formatJson(filterVal, list);
                this.excelLoading=false;
                export_json_to_excel(tHeader, data, '车籍列表excel');
            })
            }
            
         }
         //格式转换
         formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]))
        }
        //批次车籍导入数据库
         handleUploadFile(){
            this.initUpload()
         }
         //初始化上传的附件
         initUpload () {
            this.file = null //文件名
            this.showProgress = false //显示进度
            this.loadingProgress = 0 //上传文件百分比
         }
         updateLoadingProgress(){
            if (this.loadingProgress < 99)
                (this.loadingProgress as any) ++;
         }
         //判断上传的文件类型（file为上传的文件）
         handleBeforeUpload (file) {
            const fileExt = file.name.split('.').pop().toLocaleLowerCase()//上传的文件的后缀
            if (fileExt === 'xlsx' || fileExt === 'xls') {
                this.readFile(file)//文件读取
                this.file = file
            } else {
                this.$Notice.warning({
                title: '文件类型错误',
                desc: '文件：' + file.name + '不是EXCEL文件，请选择后缀为.xlsx或者.xls的EXCEL文件。'
                })
            }
            return false
         }
         //文件读取
         readFile (file) {
            const reader = new FileReader()
            reader.readAsArrayBuffer(file)
            reader.onloadstart = e => {//触发读取进度
                this.uploadLoading = true
                this.showProgress = true //显示进度
            }
            reader.onprogress = e => {//文件读取百分比
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
                        incAuto:x.公司別,
                        makNo:x.车牌号码,
                        linceNo:x.登记证号,
                        linceDt:Util.formatExcelDate(x.登记日期),
                        factoryBrandAuto:x.总厂牌,
                        brandAuto:x.厂牌,
                        clasenAuto:x.车型,
                        clasenCode:x.车辆型号,
                        cc:x.排气量,
                        percnt:x.座位数,
                        wheel:x.轮胎数,
                        carColor:x.车身颜色,
                        engNo:x.发动机号,
                        carNo:x.车架号,
                        carDt:Util.formatExcelDate(x.出厂日期),
                        oil:x.燃油种类,
                        makColor:x.车牌颜色,
                        listPrice:x.牌价,
                        isImport:x.进口车,
                        clasenVer:x.配置版本,
                        manufacturer:x.制造厂商,
                        supplier:x.购入厂商,
                        createPlace:x.汽车产地,
                        useType:x.使用性质,
                        category:x.车种,
                        insurePercnt:x.车险座位别,
                        isBusiness:x.车险性质别,
                        keyCount:x.备用钥匙,
                        provinceCode:x.车辆使用地省份,
                        cityCode:x.车辆使用地城市,
                        makDt:Util.formatExcelDate(x.领照日期),
                        memo:x.备注,
                        mtnFirst:x.首保,
                        mtnFirstMonth:x.第一次保养月数,
                        mtnSecond:x.二保,
                        mtnSecondMonth:x.第二次保养月数,
                        mtnCycle:x.定保,
                        yearCheckDt:Util.formatExcelDate(x.年审截止),
                        roadCheckDt:Util.formatExcelDate(x.养路费截止),
                        rentCarType:x.车辆吨数,
                        ton:x.实际吨数,
                        es:x.排放标准,
                        esremark:x.排放标准备注,
                        bstype:x.变速类型,
                        jcdt:Util.formatExcelDate(x.交车日期),
                        bkdt:Util.formatExcelDate(x.拨款日期),
                        status:x.车籍状态,
                        itemType:x.itemCode类型
                    };
                })
                this.$Message.info('文件开始上传')
                var timer = setInterval(this.updateLoadingProgress, requestData.length/50)//定时器 可按照指定的周期（以毫秒计）来调用函数或计算表达式
                await this.$store.dispatch({
                type:'carbase/createAll',
                data: requestData
                })
                clearInterval(timer);//结束定时器（参数必须是setInterval() 返回的 ID 值）
                this.loadingProgress = 100 //上传文件百分比
                this.uploadLoading = false
                this.$Message.info('文件上传成功')
            }
        }
        //清除模态框
         clearModel(){
            this.Form1.mtnFirst=0;//首保
            this.Form1.mtnFirstMonth=0;
            this.ddlMtnSecond=0;//二保
            this.Form1.mtnSecondMonth=0;
            this.ddlMtnCycle=0;//定保
            this.Form1.provinceCode=0;//省
            this.Form1.cityCode=0;//市
            this.Form1.es=0;//排放标准
            this.Form1.esremark="";
            (this.$refs.carBaseForm as any).resetFields();
        }
        //日期转换
         LinceDTChange(){//登记日期
            var a = new Date(this.Form1.linceDt).getFullYear()+"-"+(new Date(this.Form1.linceDt).getMonth()+1).toString()+"-"+(new Date(this.Form1.linceDt).getDate()).toString();
            this.Form1.linceDt=a;
         }
         CarDTChange(){//出厂日期
            var a = new Date(this.Form1.carDt).getFullYear()+"-"+(new Date(this.Form1.carDt).getMonth()+1).toString()+"-"+(new Date(this.Form1.carDt).getDate()).toString();
            this.Form1.carDt=a;
         }
         MakDTChange(){//领照日期
            var a = new Date(this.Form1.makDt).getFullYear()+"-"+(new Date(this.Form1.makDt).getMonth()+1).toString()+"-"+(new Date(this.Form1.makDt).getDate()).toString();
            this.Form1.makDt=a;
         }
         YearCheckDTChange(){//年审截止
            var a = new Date(this.Form1.yearCheckDt).getFullYear()+"-"+(new Date(this.Form1.yearCheckDt).getMonth()+1).toString()+"-"+(new Date(this.Form1.yearCheckDt).getDate()).toString();
            this.Form1.yearCheckDt=a;
         }
         RoadCheckDTChange(){//养路费截止
            var a = new Date(this.Form1.roadCheckDt).getFullYear()+"-"+(new Date(this.Form1.roadCheckDt).getMonth()+1).toString()+"-"+(new Date(this.Form1.roadCheckDt).getDate()).toString();
            this.Form1.roadCheckDt=a;
         }
         JCDTChange(){//交车日期
            var a = new Date(this.Form1.jcdt).getFullYear()+"-"+(new Date(this.Form1.jcdt).getMonth()+1).toString()+"-"+(new Date(this.Form1.jcdt).getDate()).toString();
            this.Form1.jcdt=a;
         }
         BKDTChange(){//拨款日期
            var a = new Date(this.Form1.bkdt).getFullYear()+"-"+(new Date(this.Form1.bkdt).getMonth()+1).toString()+"-"+(new Date(this.Form1.bkdt).getDate()).toString();
            this.Form1.bkdt=a;
        }
        //批量导入对应字典
         getdictionary(){
            this.mapChange();
            require.ensure([], () => {
                const { export_json_to_excel } = require('../../../excel/Export2Excel');
                //设置Excel的表格第一行的标题
                const tHeader = ['编号','名称','类型'];
                const filterVal = ['num','itemName','memo'];     
                //把获取的数据存到list            
                const list = this.dictionaryList; 
                //转换格式
                const data = this.formatJson(filterVal, list);
                //导出
                export_json_to_excel(tHeader, data, '字典excel');
            })
        }
        //对应数据库字段
         evaluation(){
            this.carBase.incAuto=this.Form1.incAuto;//公司别
            this.carBase.makNo=this.Form1.makNo;//车牌号码
            this.carBase.makColor=this.Form1.makColor;//车牌颜色
            this.carBase.linceNo=this.Form1.linceNo;//登记证号
            this.carBase.linceDt=this.Form1.linceDt;//登记日期
            this.carBase.factoryBrandAuto=this.Form1.factoryBrandAuto;//总厂牌
            this.carBase.brandAuto=this.Form1.brandAuto;//厂牌
            if(this.Form1.clasenAuto==null||this.Form1.clasenAuto==undefined){
                this.carBase.clasenAuto=0;
            }
            else{
                this.carBase.clasenAuto=this.Form1.clasenAuto;//车型
            }
            this.carBase.clasenCode=this.Form1.clasenCode;//车辆型号
            this.carBase.cc=this.Form1.cc;//排气量
            this.carBase.percnt=this.Form1.percnt;//座位数
            this.carBase.wheel=this.Form1.wheel;//轮胎数
            this.carBase.carColor=this.Form1.carColor;//车身颜色
            this.carBase.engNo=this.Form1.engNo;//发动机号
            this.carBase.carNo=this.Form1.carNo;//车架号
            this.carBase.carDt=this.Form1.carDt;//出厂日期
            this.carBase.oil=this.Form1.oil;//燃油种类
            this.carBase.listPrice=this.Form1.listPrice;//牌价
            this.carBase.isImport=this.Form1.isImport;//进口车
            this.carBase.clasenVer=this.Form1.clasenVer;//配置版本
            this.carBase.manufacturer=this.Form1.manufacturer;//制造厂商
            this.carBase.supplier=this.Form1.supplier;//购入厂商
            this.carBase.createPlace=this.Form1.createPlace;//汽车产地
            this.carBase.useType=this.Form1.useType;//使用性质
            this.carBase.category=this.Form1.category;//车种
            this.carBase.insurePercnt=this.Form1.insurePercnt;//车险座位别
            this.carBase.isBusiness=this.Form1.isBusiness;//车险性质别
            this.carBase.keyCount=this.Form1.keyCount;//备用钥匙
            this.carBase.provinceCode=this.Form1.provinceCode;//车辆使用地 省
            this.carBase.cityCode=this.Form1.cityCode;//车辆使用地 市
            this.carBase.makDt=this.Form1.makDt;//领照日期
            this.carBase.memo=this.Form1.memo;//备注
            this.carBase.mtnFirst=this.Form1.mtnFirst;//首保
            this.carBase.mtnFirstMonth=this.Form1.mtnFirstMonth;//首保
            this.carBase.mtnSecond=this.ddlMtnSecond;//二保
            this.carBase.mtnSecondMonth=this.Form1.mtnSecondMonth;//二保
            this.carBase.mtnCycle=this.ddlMtnCycle;//定保
            this.carBase.yearCheckDT=this.Form1.yearCheckDt;//年审截止
            this.carBase.roadCheckDT=this.Form1.roadCheckDt;//养路费截止
            this.carBase.rentCarType=this.Form1.rentCarType;//车辆吨数
            this.carBase.ton=this.Form1.ton;//实际吨数
            this.carBase.es=this.Form1.es;//排放标准
            this.carBase.esremark=this.Form1.esremark;//排放标准
            this.carBase.bstype=this.Form1.bstype;//变速类型
            this.carBase.jcdt=this.Form1.jcdt;//交车日期
            this.carBase.bkdt=this.Form1.bkdt;//拨款日期
            this.carBase.status=this.Form1.status;//异动原因
            this.carBase.itemType=225;
        }
        //参考字典
         mapChange(){
            var a=this.incType.map(i => {
                return {
                    num:i.id,
                    itemName:i.sname,
                    memo:'公司别'
                };
            });
            var b=this.factoryBrandAutomore.map(i => {
                return {
                    num:i.id,
                    itemName:i.factoryBrandName,
                    memo:'总厂牌'
                };
            });
            b.push(...a)
            var c=this.brandlist.map(i =>{
                return {
                    num:i.id,
                    itemName:i.brandName,
                    memo:'厂牌'
                };
            })
            c.push(...b)
            var d=this.clasenlist.map(i =>{
                return {
                    num:i.id,
                    itemName:i.clasenName,
                    memo:'车型'
                };
            })
            d.push(...c)
            var e=this.manufacturer.map(i => {
                return {
                    num:i.id,
                    itemName:i.fname,
                    memo:'制造厂商'
                };
            });
            e.push(...d)
            var f=this.buypartners.map(i =>{
                return {
                    num:i.id,
                    itemName:i.fname,
                    memo:'购入厂商'
                };
            })
            f.push(...e)
            var g=this.province.map(i =>{
                return {
                    num:i.code,
                    itemName:i.name,
                    memo:'车辆使用地省份'
                };
            })
            g.push(...f)
            var h=this.province.map(i =>{
                return {
                    num:i.code,
                    itemName:i.name,
                    memo:'车辆使用地城市'
                };
            })
            h.push(...g)
            var ii=this.makNoColor.map(i =>{//车牌颜色
                return {
                    num:i.itemName,
                    itemName:i.itemName,
                    memo:i.memo
                };
            })
            ii.push(...h)
            var j=this.ddloilmore.map(i =>{//燃油种类
                return {
                    num:i.num,
                    itemName:i.itemName,
                    memo:i.memo
                };
            })
            j.push(...ii)
            var k=this.seating.map(i =>{//座位数
                return {
                    num:i.num,
                    itemName:i.itemName,
                    memo:i.memo
                };
            })
            k.push(...j)
            var l=this.tireNumber.map(i =>{//轮胎数
                return {
                    num:i.num,
                    itemName:i.itemName,
                    memo:i.memo
                };
            })
            l.push(...k)
            var m=this.importedCar.map(i =>{//进口车
                return {
                    num:i.num,
                    itemName:i.itemName,
                    memo:i.memo
                };
            })
            m.push(...l)
            var n=this.useNature.map(i =>{//使用性质
                return {
                    num:i.num,
                    itemName:i.itemName,
                    memo:i.memo
                };
            })
            n.push(...m)
            var o=this.caroftype.map(i =>{//车种
                return {
                    num:i.num,
                    itemName:i.itemName,
                    memo:i.memo
                };
            })
            o.push(...n)
            var p=this.carinsurance.map(i =>{//车险座位别
                return {
                    num:i.num,
                    itemName:i.itemName,
                    memo:i.memo
                };
            })
            p.push(...o)
            var q=this.carofNature.map(i =>{//车险性质别
                return {
                    num:i.num,
                    itemName:i.itemName,
                    memo:i.memo
                };
            })
            q.push(...p)
            var r=this.falsekey.map(i =>{//备用钥匙
                return {
                    num:i.num,
                    itemName:i.itemName,
                    memo:i.memo
                };
            })
            r.push(...q)
            var s=this.firstMtn.map(i =>{//首保
                return {
                    num:i.num,
                    itemName:i.itemName,
                    memo:i.memo
                };
            })
            s.push(...r)
            var t=this.secondMtn.map(i =>{//二保
                return {
                    num:i.num,
                    itemName:i.itemName,
                    memo:i.memo
                };
            })
            t.push(...s)
            var u=this.settoprotect.map(i =>{//定保
                return {
                    num:i.num,
                    itemName:i.itemName,
                    memo:i.memo
                };
            })
            u.push(...t)
            var v=this.emissionstandard.map(i =>{//排放标准
                return {
                    num:i.num,
                    itemName:i.itemName,
                    memo:i.memo
                };
            })
            v.push(...u)
            var w=this.transmissiontype.map(i =>{//变速类型
                return {
                    num:i.num,
                    itemName:i.itemName,
                    memo:i.memo
                };
            })
            w.push(...v)
            this.dictionaryList=this.movethereaso.map(i =>{//异动原因
                return {
                    num:i.num,
                    itemName:i.itemName,
                    memo:i.memo
                };
            })
            this.dictionaryList.push(...w);
        }
        //导出Excel验证
         checkinput(){
            if(this.Form1.factoryBrandAuto==0){
                this.$Notice.warning({
                    title: '请选择总厂牌'
                });
            }else if(this.Form1.brandAuto==0){
                this.$Notice.warning({
                    title: '请选择厂牌'
                });
            }else if(this.Form1.clasenAuto==0){
                this.$Notice.warning({
                    title: '请选择车型'
                });
            }else if(this.Form1.percnt==0){
                this.$Notice.warning({
                    title: '请选择座位数'
                });
            }else if(this.Form1.wheel==0){
                this.$Notice.warning({
                    title: '请选择轮胎数'
                });
            }else if(this.Form1.oil==0){
                this.$Notice.warning({
                    title: '请选择燃油种类'
                });
            }else if(this.Form1.isImport==0){
                this.$Notice.warning({
                    title: '请选择进口车'
                });
            }else if(this.Form1.manufacturer==0){
                this.$Notice.warning({
                    title: '请选择制造厂商'
                });
            }else if(this.Form1.supplier==0){
                this.$Notice.warning({
                    title: '请选择购入厂商'
                });
            }else if(this.Form1.insurePercnt==0){
                this.$Notice.warning({
                    title: '请选择车险座位别'
                });
            }else if(this.Form1.isBusiness==0){
                this.$Notice.warning({
                    title: '请选择车险性质别'
                });
            }else if(this.Form1.provinceCode==0){
                this.$Notice.warning({
                    title: '请选择车辆使用地省份'
                });
            }else if(this.Form1.cityCode==0){
                this.$Notice.warning({
                    title: '请选择车辆使用地城市'
                });
            }
            else if(this.batch==0){
                this.$Notice.warning({
                    title: '请填写要导出的数量'
                });
            }
        }
        /**表单验证 */
         checkForm={
            //非空验证
            makNo:[publicclass.Check.required.text],//车牌号码
            clasenCode:[publicclass.Check.required.text],//车辆型号
            carColor:[publicclass.Check.required.text],//车身颜色
            factoryBrandAuto:[publicclass.Check.required.select],//总厂牌
            brandAuto:[publicclass.Check.required.select],//厂牌
            percnt:[publicclass.Check.required.select],//座位数
            cc:[publicclass.Check.required.number],//排气量
            wheel:[publicclass.Check.required.select],//轮胎数
            engNo:[publicclass.Check.required.text],//发动机号
            carNo:[publicclass.Check.required.text],//车架号
            oil:[publicclass.Check.required.select],//燃油种类
            listPrice:[publicclass.Check.required.text,publicclass.Check.checkvalue.number],//牌价
            createPlace:[publicclass.Check.required.text],//汽车产地
        }
    }
</script>
<style scoped>
/* 全屏覆盖 */
.ivu-spin-fix {
    position: fixed;
}
</style>

