<template>
    <div>
        <Modal
         :title="L('维修估价/交修追加')"
         :value="value" 
         :width="1200"
         :information="information"
         @on-ok="save"
         @on-visible-change="visibleChange"
         fullscreen
        >
            <Form ref="carRepairForm" :model="Form1" :rules="checkform" :label-width="100">
               <Divider>车辆信息</Divider>
                <Row>
                     <Col span="6">
                        <FormItem :label="L('车牌号码')" style="width:100%" prop="makNo">
                            <Input v-model="Form1.makNo" :maxlength="50" @on-blur="MakNoCarInfo"/>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label="L('车型')" style="width:100%" prop="clasenName">
                            <p style="color:blue">{{clasenName}}</p>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label="L('出厂日期')" style="width:100%" prop="carDT">
                            <p style="color:blue">{{carDT}}</p>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label="L('登记日期')" style="width:100%" prop="linceDT">
                            <p style="color:blue">{{linceDT}}</p>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="6">
                        <Button style="width: 40%;margin-left:100px" type="primary" ghost class="toolbar-btn" @click="checkCarFixLog">查看维修记录</Button>
                    </Col>
                    <Col span="6">
                        <FormItem :label="L('变速类型')" style="width:100%" prop="BSType">
                            <p style="color:blue">{{BSType}}</p>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label="L('车架号')" style="width:100%" prop="carNo">
                            <p style="color:blue">{{carNo}}</p>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label="L('发动机号码')" style="width:100%" prop="engNo">
                            <p style="color:blue">{{engNo}}</p>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="6">
                        <FormItem :label="L('使用性质')" style="width:100%" prop="useType">
                            <p style="color:blue">{{useType}}</p>
                        </FormItem>
                    </Col>
                     <Col span="6">
                        <FormItem :label="L('颜色')" style="width:100%" prop="carColor">
                            <p style="color:blue">{{carColor}}</p>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label="L('交修日期')" style="width:100%" prop="repairDt">
                            <DatePicker v-model="Form1.repairDt" type="date" style="width:100%"></DatePicker>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label="L('交修类别')" style="width:100%" prop="repairType">
                            <Select :placeholder="L('Select')" v-model="Form1.repairType">
                                <Option v-for="item in repairTypeList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="6">
                        <FormItem :label="L('行驶里程')" style="width:100%" prop="repairKM">
                            <InputNumber v-model="Form1.repairKM" :min="0"  style="width: 100%"></InputNumber>
                        </FormItem>
                    </Col>
                     <Col span="6">
                        <FormItem :label="L('预计完工时间')" style="width:100%" prop="repairDtpre">
                            <DatePicker v-model="Form1.repairDtpre" type="date" style="width:100%"></DatePicker>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label="L('交修人')" style="width:100%" prop="repairName">
                            <Input v-model="Form1.repairName" :maxlength="50"/>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label="L('联系电话')" style="width:100%" prop="contactNumber">
                            <Input v-model="Form1.contactNumber" :maxlength="50"/>
                        </FormItem>
                    </Col>
                </Row>
               <Divider>承租信息</Divider>
                <!-- <Row>
                     <Col span="6">
                        <FormItem :label="L('客户名称')" style="width:100%" prop="cusName">
                            <p style="color:blue">{{Form1.cusName}}</p>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label="L('已收费用')" style="width:100%" prop="carMtnAmtT">
                            <p style="color:blue">{{Form1.carMtnAmtT}}</p>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label="L('维修总计')" style="width:100%" prop="totalAmount">
                            <p style="color:blue">{{Form1.totalAmount}}</p>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label="L('费用余额')" style="width:100%" prop="surplusage">
                            <p style="color:blue">{{Form1.surplusage}}</p>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                     <Col span="6">
                        <FormItem :label="L('轮胎使用/额度')" style="width:100%" prop="useWhiel">
                            <p style="color:blue">{{Form1.useWhiel}}</p>/<p>{{Form1.Whiel}}</p>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label="L('起租日')" style="width:100%" prop="SDT">
                            <p style="color:blue">{{Form1.SDT}}</p>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label="L('迄租日')" style="width:100%" prop="EDT">
                            <p style="color:blue">{{Form1.EDT}}</p>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label="L('是否含代步')" style="width:100%" prop="isDB">
                            <p style="color:blue">{{Form1.isDB}}</p>
                        </FormItem>
                    </Col>
                </Row> -->
                <Row>
                    <Col span="6">
                        <FormItem :label="L('付款周期')" style="width:100%" prop="payMode">
                            <Select :placeholder="L('Select')" v-model="Form1.payMode">
                                <Option v-for="item in payModeList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label="L('维修厂商')" style="width:100%" prop="supplierAuto">
                            <Select :placeholder="L('Select')" v-model="Form1.supplierAuto">
                                <Option v-for="item in supplierList" :value="item.id" :key="item.id">{{ item.fname }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <!-- <Col span="6" style="margin-left: 8px" prop="supName">
                        <Input v-model="Form1.supName"  style="width:60%" :maxlength="50"/>
                        <Button type="primary" size="large" @click="checkcarRepair" ghost class="toolbar-btn">{{L('搜索')}}</Button>
                    </Col> -->
                </Row>
                <!-- <Row>
                    <Col span="24">
                    <FormItem :label="L('契约备注信息')" style="width:100%">
                        <p>计价里程<label style="color:red">{{Form1.rateKM}}</label>公里,合约<Input v-model="Form1.linceKM" style="width:10%" :maxlength="50" readonly/>公里,月维修费
                        <label style="color:red">{{Form1.orderCarMtnAmt}}</label>,换轮胎<Input v-model="Form1.Whiel" style="width:10%" :maxlength="50" readonly/>条 ,超里程
                        <Input v-model="Form1.overKM" style="width:10%" :maxlength="50" readonly/>元/公里,
                        <Select :placeholder="L('Select')" v-model="Form1.overKMPayType" style="width:20%" disabled>
                            <Option v-for="item in overKMPayTypeList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                        </Select>结算。</p>
                    </FormItem>
                    </Col>
                </Row> -->
               <Divider>车身内部</Divider>
                <Row>
                    <Col>
                    <FormItem :label="L('车身内部')" style="width:100%" prop="carbody">
                        <CheckboxGroup v-model="Form1.carbody">
                            <Checkbox label="1">引擎系统</Checkbox>
                            <Checkbox label="2">底盘系统</Checkbox>
                            <Checkbox label="3">电器系统</Checkbox>
                            <Checkbox label="4">空调系统</Checkbox>
                            <Checkbox label="5">车内装潢</Checkbox>
                            <Checkbox label="6">车身外部</Checkbox>
                        </CheckboxGroup>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <FormItem :label="L('送修问题')" style="width:100%" prop="repairProblem">
                        <Input v-model="Form1.repairProblem" type="textarea" :autosize="{minRows: 3,maxRows: 5}"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <FormItem :label="L('作业项目')" style="width:100%" prop="operatingItem">
                        <Input v-model="Form1.operatingItem" type="textarea" :autosize="{minRows: 3,maxRows: 5}"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <FormItem :label="L('交修建议')" style="width:100%" prop="repairRecommendation">
                        <Input v-model="Form1.repairRecommendation" type="textarea" :autosize="{minRows: 3,maxRows: 5}"></Input>
                    </FormItem>
                    </Col>
                </Row>
               <Divider>追加作业</Divider>
                <!-- 追加作业项目列表 -->
                <Row v-show="addlist" style="margin-bottom:20px">
                    <Col span="12" style="margin-left:100px">
                        <Table :columns="columns" :no-data-text="L('NoDatas')" border :data="additionalItemlist">
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <!-- <Col span="18">
                    <FormItem :label="L('追加作业项目')" style="width:100%" prop="addoperatingItem">
                        <Input v-model="Form1.addoperatingItem" type="textarea" :autosize="{minRows: 3,maxRows: 5}"></Input>
                    </FormItem>
                    </Col> -->
                    <Col span="6">
                        <Button type="primary" ghost @click="Additional" style="margin-left:20px">新增追加</Button>
                    </Col>
                </Row>
                <!-- <Row>
                    <Col>
                    <FormItem :label="L('交修建议')" style="width:100%" prop="addrepairRecommendation">
                        <Input v-model="Form1.addrepairRecommendation" type="textarea" :autosize="{minRows: 3,maxRows: 5}"></Input>
                    </FormItem>
                    </Col>
                </Row> -->
               <Divider>附件</Divider>
                <Row v-show="upFile" style="margin-bottom:20px">
                    <Col span="12" style="margin-left:100px">
                        <Table :columns="columnsFile" :no-data-text="L('NoDatas')" border :data="fileDetail">
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormItem label="附件" style="width: 100%">
                            <Upload multiple action="" :before-upload="getFile" >
                                <Button icon="ios-cloud-upload-outline" size="large" :loading="uploadLoading" @click="handleUploadFile" type="success" ghost>点击上传附件</Button>
                            </Upload>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                     <Col span="6">
                        <FormItem :label="L('预估工时总金额')" style="width:100%" prop="estimatedTimeFee">
                            <Input v-model="Form1.estimatedTimeFee" :min="0" style="width: 100%" @on-blur="estimatedAmount"/>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label="L('预估零件总金额')" style="width:100%" prop="estimatedPartFee">
                            <Input v-model="Form1.estimatedPartFee" :min="0" style="width: 100%" @on-blur="estimatedAmount"/>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label="L('合计总金额')" style="width:100%" prop="estimatedTotalFee">
                            <p style="color:blue">{{Form1.estimatedTotalFee}}</p>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button @click="cancel">{{L('Cancel')}}</Button>
                <Button @click="save" type="primary">{{L('存档')}}</Button>
            </div>
            <Spin size="large" fix v-if="spinShow"></Spin>
        </Modal>
        <create-additionalItem v-model="createModalShow" :carrepairitems="carrepairitems" @save-success="getAdditionalItem"></create-additionalItem>
        <edit-additionalItem :additems="additems" :carrepairitems="carrepairitems" v-model="editModalShow"  @save-success="getAdditionalItem"></edit-additionalItem>
        <check-carFixRecord v-model="checkModalShow" :repairitems="repairitems"></check-carFixRecord>
    </div>
</template>
<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '../../../lib/util'
    import AbpBase from '../../../lib/abpbase'
    import PageRequest from '@/store/entities/page-request'
    import CarRepair from '@/store/entities/carfix/carRepair';
    import AdditionalItem from '@/store/entities/carfix/additionalItem'
    import CreateAdditionalItem from './create-additionalItem.vue'
    import EditAdditionalItem from './edit-additionalItem.vue'
    import Axios from 'axios';
    import FileUpload from '../../../store/entities/public/fileUpload';
    import publicclass from '../../../lib/publicclass';
    import CheckCarFixRecord from './check-carFixRecord.vue'

    class PageItemCodeRequest extends PageRequest{
        keyword:string='';
        from:Date;
        to:Date;
        itemTypes:Array<number>
    }
    class PageSupplierRequest extends PageRequest{
        keyword:string='';
        from:Date;
        to:Date;
        supplierTypes:Array<number>;
    }
    class PageClasenRequest extends PageRequest{//车型
        maxResultCount=10000
        skipCount=0
    }
    class PageCarBaseRequest extends PageRequest{
        maxResultCount=10000
        skipCount=0
        makNo:string;
    }
    class PageAdditionalItemRequest extends PageRequest{
        maxResultCount=10000
        skipCount=0
    }
    class PageFileUploadRequest extends PageRequest{
        maxResultCount=10000
        skipCount=0
        docPostID:number=0;
    }
    class PageInsurancePolicyRequest extends PageRequest{
        carBaseIds:Array<any>;
    }

    @Component({
        components:{CreateAdditionalItem,EditAdditionalItem,CheckCarFixRecord}
    })
    export default class EditCarRepair extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        @Prop({type:Object,default:null}) information:any;//传值
        carRepair:CarRepair=new CarRepair();
        additionalItem:AdditionalItem=new AdditionalItem();//追加表
        pageItemCodeRequest:PageItemCodeRequest=new PageItemCodeRequest();
        pageSupplierRequest:PageSupplierRequest=new PageSupplierRequest();
        pageClasenRequest:PageClasenRequest=new PageClasenRequest();//车型
        pageCarBaseRequest:PageCarBaseRequest = new PageCarBaseRequest();
        pageAdditionalItemRequest:PageAdditionalItemRequest = new PageAdditionalItemRequest();
        pageFileUploadRequest:PageFileUploadRequest = new PageFileUploadRequest();//附件
        pageInsurancePolicyRequest:PageInsurancePolicyRequest=new PageInsurancePolicyRequest();//保险
        itemCodeTypelist:any=null;//交修类别
        itemCodepayMode:any=null;//付款周期
        itemCodeOverKM:any=null;//超里程结算
        supplierselect:any=null;//维修厂商
        addlist:boolean=false;//是否显示追加作业项目列表
        addseris:any=[];//追加次序
        createModalShow:boolean=false;
        editModalShow:boolean=false;
        additems:object=null;//传值
        carrepairitems:object=null;//传值
        repairitems:object=null;
        upFile:boolean=false;//显示附件
        fileDetail:any=[];//附件列表
        spinShow=true;//加载动画
        makNo:any='';
        uploadLoading:boolean=false;//加载动画
        checkModalShow:boolean=false;

        create(){
            this.createModalShow=true;
            this.carrepairitems=this.Form1;
        }
        edit(a){
            this.editModalShow=true;
            this.additems=a;
            this.carrepairitems=this.Form1;
        }
        check(){
            this.checkModalShow=true;
            this.repairitems=this.Form1;
        }
        save(){
            (this.$refs.carRepairForm as any).validate(async (valid:boolean)=>{
                if(valid){
                    if(this.Form1.carbaseauto!=0){
                        //根据车号判断交修车辆是否关联有效合约
                        this.pageInsurancePolicyRequest.carBaseIds=[this.Form1.carbaseauto];
                        this.$store.dispatch({
                            type:'insurancePolicy/getAll',
                            data:this.pageInsurancePolicyRequest
                        }).then(async (res)=>{
                            if(res.items.length>0){
                                await this.carRepairData();//对应数据库
                                await this.$store.dispatch({
                                    type:'carRepair/update',
                                    data:this.carRepair
                                });
                                (this.$refs.carRepairForm as any).resetFields();
                                this.$emit('save-success');
                                this.$emit('input',false);
                            }else{
                                this.$Notice.warning({
                                    title: '判断交修车辆是否关联有效合约'
                                })
                            }
                        });
                    }
                }
            })
        }
        
        cancel(){
            (this.$refs.carRepairForm as any).resetFields();
            this.$emit('input',false);
        }
        async visibleChange(value:boolean){
            this.spinShow=true;//加载动画
            if(!value){
                this.$emit('input',value);
            }else{
                await this.getList();
                this.Form1=Util.extend(true,{},this.information);
                await this.getAdditionalItem();//查询追加表数据
                this.bestowData();//赋值
                if(this.additionalItemlist.length>0){
                    this.addlist=true;//显示列表
                }
                else{
                    this.addlist=false;//隐藏
                }
                this.spinShow=false;//加载动画
            }
        }
        get repairTypeList(){//交修类别 501
            return this.itemCodeTypelist
        }
        get payModeList(){//付款周期 123
            return this.itemCodepayMode;
        }
        get supplierList(){//维修厂商
            return this.supplierselect
        }
        get overKMPayTypeList(){//超里程结算 317
            return this.itemCodeOverKM;
        }

        async getList(){
            //交修类别
            this.pageItemCodeRequest.maxResultCount=10000;
            this.pageItemCodeRequest.skipCount=0;
            this.pageItemCodeRequest.itemTypes = [501];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                this.itemCodeTypelist=res.items
            })
            //付款周期
            this.pageItemCodeRequest.itemTypes = [123];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                this.itemCodepayMode=res.items
            })
            //超里程结算
            this.pageItemCodeRequest.itemTypes = [317];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                this.itemCodeOverKM=res.items
            })
            //维修厂商
            this.pageSupplierRequest.maxResultCount=10000;
            this.pageSupplierRequest.skipCount=0;
            this.pageSupplierRequest.supplierTypes=[2,3];
            await this.$store.dispatch({
                type:'supplier/getAll',
                data:this.pageSupplierRequest
            }).then(res=>{
                this.supplierselect=res.items
            })
            //变速类型
            this.pageItemCodeRequest.itemTypes = [841];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                this.itemCodelist=res.items;
            })
            
            await this.$store.dispatch({//车型
                type:'clasen/GetAll',
                data:this.pageClasenRequest
            }).then(res=>{
                this.clasenlist=res.items
            })
            //使用性质
            this.pageItemCodeRequest.itemTypes = [225];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                this.useTypelist=res.items;
            })
        }
        Form1={
            additionalItemAuto:0,
            carbaseauto:0,
            makNo:"",
            repairDt:null,
            repairType:0,
            repairKM:0,
            repairDtpre:null,
            repairName:"",
            contactNumber:"",
            cusName:"",
            carMtnAmtT:"",
            totalAmount:"",
            surplusage:"",
            useWhiel:"",
            Whiel:"",
            SDT:"",
            EDT:"",
            isDB:"",
            payMode:0,
            supplierAuto:0,
            supName:"",
            carbody:[],
            repairProblem:"",//送修问题
            operatingItem:"",//作业项目
            addoperatingItem:"",//追加作业项目
            repairRecommendation:"",//交修建议
            //addrepairRecommendation:"",//追加交修建议
            estimatedTimeFee:"",
            estimatedPartFee:"",
            estimatedTotalFee:"",
            //additionalItemlist:[],//追加列表
            //itemCodelist:[],//变速类型
            //clasenlist:[],//车型
            //useTypelist:[],//使用性质
            
            // rateKM:"",
            // linceKM:"",
            // orderCarMtnAmt:"",
            // overKM:"",
            // overKMPayType:"",
        }
        //自定义类型
            //makNo:any="";//车牌
            clasenName:any="";//车型
            carDT:any="";//出厂日期
            linceDT:any="";//登记日期
            BSType:any="";//变速类型
            carNo:any="";//车架号
            engNo:any="";//发动机号码
            useType:any="";//使用性质
            carColor:any="";//颜色
            itemCodelist:any=[];//变速类型
            clasenlist:any=[];//车型
            useTypelist:any=[];//使用性质
            additionalItemlist:any=[]

        columns=[{
                title:this.L('追加作业项目'),
                key:'additionalItem1',
            },{
                title:this.L('Actions'),
                key:'Actions',
                align: 'center',
                width:100,
                render:(h:any,params:any)=>{
                    return h('div',[
                        h('Button',{
                            props:{
                                type:'primary',
                                size:'small'
                            },
                            on:{
                                click:()=>{
                                    this.edit(params.row)
                                }
                            }
                        },this.L('选取'))
                    ])
                }
        }]
        columnsFile=[{
                title:'附件名称',
                key:'oldFileName',
            },{
                title:this.L('Actions'),
                key:'Actions',
                align: 'center',
                width:100,
                render:(h:any,params:any)=>{
                    return h('div',[
                        h('Button',{
                            props:{
                                type:'primary',
                                size:'small',
                            },
                            on:{
                                click:()=>{
                                    window.open(params.row.path);
                                    //location.href=params.row.path;
                                }
                            }
                        },this.L('查看附件'))
                    ])
                }
        }]
        
       //查看维修记录
        checkCarFixLog(){
            if(this.Form1.makNo==""||this.Form1.makNo==undefined||this.Form1.makNo==null){
                this.$Notice.warning({
                    title: '请输入车牌号'
                })
            }
            else{
                this.check();
            }
        }
        /**根据车号查询车辆基本信息 */
         async MakNoCarInfo(){
            //车号不是空交修日期也不是空
            if(this.Form1.makNo!=""){
                this.pageCarBaseRequest.makNo = this.Form1.makNo
                await this.$store.dispatch({
                    type:'carbase/SelectCarBase',
                    data:this.pageCarBaseRequest
                }).then(res=>{
                   res.items.map(i => {
                        this.itemCodelist.map(j=>{
                            if(i.bstype==j.num){
                                this.BSType=j.itemName;//变速类型
                            }
                        })
                        this.Form1.carbaseauto=i.id;//编号
                        if(i.clasen!=null){
                            this.clasenName=i.clasen.clasenName;//车型
                        }else{
                            this.clasenName='';
                        }
                        this.carDT=i.carDt;//出厂日期
                        this.linceDT=i.linceDt;//登记日期
                        this.carNo=i.carNo;//车架号
                        this.engNo=i.engNo;//发动机号码
                        this.useType=i.itemCode.itemName;//使用性质
                        this.carColor=i.carColor;//颜色
                   })
                });
            }
        }

        // /**厂商搜索 */
         //  checkcarRepair(){
            
         // }
        //计算合计总金额
         estimatedAmount(){
            if(this.Form1.estimatedTimeFee != '' && this.Form1.estimatedPartFee != ''){
                var sum= Number(this.Form1.estimatedTimeFee) + Number(this.Form1.estimatedPartFee);
                this.Form1.estimatedTotalFee = sum.toString();
            }
        }
        /**新增追加作业 */
         async Additional(){
            await this.getAdditionalItem();
            this.$Modal.confirm({
                title:this.L('Tips'),
                content:this.L('是否要追加？'),
                okText:this.L('Yes'),
                cancelText:this.L('No'),
                onOk:async()=>{
                    this.create();
                }
            })
        }
        //获取追加列表
         async getAdditionalItem(){
            var list=[];
            await this.$store.dispatch({
                type:'additionalItem/getAll',
                data:this.pageAdditionalItemRequest
            }).then(res=>{
                res.items.map(i=>{
                    if(i.carRepairAuto==this.information.id){
                        this.addseris.push(i.serialNumber);//追加次序
                        list.push(i);
                    }
                })
            })
            if(list.length>0){
                this.additionalItemlist=list;//给列表赋值
                this.addlist=true;
            }
        }
        //赋值
         bestowData(){
            this.clasenlist.map(b=>{
                if(this.information.carBase.clasenAuto==b.id){
                    this.clasenName=b.clasenName;//车型
                }
            })
            this.itemCodelist.map(j=>{
                if(this.information.carBase.bstype==j.num){
                    this.BSType=j.itemName;//变速类型
                }
            })
            this.useTypelist.map(j=>{
                if(this.information.carBase.useType==j.num){
                    this.useType=j.itemName;//使用性质
                }
            })
            this.Form1.carbaseauto=this.information.carBase.id;
            this.Form1.makNo=this.information.carBase.makNo;//车牌号
            this.carDT=this.information.carBase.carDt;//出厂日期
            this.linceDT=this.information.carBase.linceDt;//登记日期
            this.carNo=this.information.carBase.carNo;//车架号
            this.engNo=this.information.carBase.engNo;//发动机号
            this.carColor=this.information.carBase.carColor;//颜色
            this.Form1.repairKM=this.information.km;//行驶里程
            this.Form1.carbody=this.information.systemP.split(",");//车身内部
            //附件
            this.getFileUpload(this.information.id);
        }
        //对应数据库
         carRepairData(){
            if(this.Form1.repairDt!=''){
                this.Form1.repairDt=new Date(this.Form1.repairDt).toLocaleDateString();
            }
            if(this.Form1.repairDtpre!=''){
                this.Form1.repairDtpre=new Date(this.Form1.repairDtpre).toLocaleDateString();
            }
            this.getAdditionalItem();
            this.carRepair.id=this.information.id;//交修编号
            this.carRepair.carBaseAuto=this.Form1.carbaseauto;//车籍编号
            this.carRepair.orderAuto=0;//契约编号
            this.carRepair.repairDT=this.Form1.repairDt;//交修日期
            this.carRepair.repairType=this.Form1.repairType;//交修类别
            this.carRepair.km=this.Form1.repairKM;//行驶里程
            this.carRepair.repairDtpre=this.Form1.repairDtpre;//预计完工时间
            this.carRepair.repairName=this.Form1.repairName;//交修人
            this.carRepair.contactNumber=this.Form1.contactNumber;//联系电话
            this.carRepair.payMode=this.Form1.payMode;//付款周期
            this.carRepair.supplierAuto=this.Form1.supplierAuto;//维修厂商
            this.carRepair.systemP=this.Form1.carbody.toString();//车身内部
            this.carRepair.repairProblem=this.Form1.repairProblem;//送修问题
            this.carRepair.operatingItem=this.Form1.operatingItem;//作业项目
            this.carRepair.repairRecommendation=this.Form1.repairRecommendation;//交修建议
            this.carRepair.estimatedTimeFee=this.Form1.estimatedTimeFee;//预估工时总金额
            this.carRepair.estimatedPartFee=this.Form1.estimatedPartFee;//预估零件总金额
            this.carRepair.estimatedTotalFee=this.Form1.estimatedTotalFee;//合计总金额
            this.carRepair.repairTypeItemType=501;//维修类别
            this.carRepair.payModeItemType=123;//付款周期
            this.carRepair.status=20;
            this.carRepair.cdt=this.information.cdt;
            this.carRepair.cuser=this.information.cuser;
            this.carRepair.muser=0;
            this.carRepair.mdt=new Date();
            this.makNo=this.Form1.makNo;
            //判断追加表里如果有交修单号就修改状态
            if(this.addseris.length>0){
                this.carRepair.addStatus=20;//追加状态 -1 未追加 20追加核准
            }
            else{
                this.carRepair.addStatus=-1;//追加状态 -1 未追加 20追加核准
            }
        }
    //上传附件
        handleUploadFile(){
            this.uploadLoading=true;
        }
        addArr:any=[];
        addfile:any=[];
        //判断上传的文件类型（file为上传的文件）
         getFile(file) {
            this.addfile=[];
            this.addfile.push(file)
            //var newname=(new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate()).toString()+file.size+file.name;//新名
            for(var i = 0;i<this.addfile.length;i++){
                //上传类型判断
                var imgName =this.addfile[i].name;
                var idx = imgName.lastIndexOf(".");  
                if (idx != -1){
                    var fileExt = imgName.substr(idx+1).toUpperCase(); 
                    fileExt = fileExt.toLowerCase( ); 
                    if (fileExt!='pdf' && fileExt!='doc' && fileExt!='docx' && fileExt === 'xlsx' && fileExt === 'xls'){
                        this.$Notice.warning({
                            title: '文件类型错误',
                            desc: '文件：' + file.name + '的类型不正确，请选择后缀为.pdf、.doc、.docx、xls和xlsx的文件。'
                        })
                    }else{
                        this.submitUpload(this.addfile[i]);
                    }   
                }
            }        
         }
         //提交文件
         submitUpload(filelist){
            var formData = new FormData();
            formData.append('dirName','carRepair');
            formData.append('fileInfo',filelist);
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
                    this.$set(filelist,'url',response.data[0].url)
                    this.addArr.push(filelist)
                    //存附件到附件表
                    this.createFileUp(filelist.url,filelist.name,filelist.size)
                    this.uploadLoading=false;
                }
            })
        }
    //新增附件到数据库
     async createFileUp(url,name,size){
        var fileup=this.FileUoloadToData(url,name,size);
        await this.$store.dispatch({
            type:'fileUpload/create',
            data:fileup
        });
        this.getFileUpload(this.information.id);
     }
    //查询附件
     listfile:any=[]
     async getFileUpload(id){
         this.listfile=[];
        this.pageFileUploadRequest.docPostID=id;
        await this.$store.dispatch({
            type:'fileUpload/getAll',
            data:this.pageFileUploadRequest
        }).then(res=>{
            if(res.items.length>0){
                res.items.map(i=>{
                    if(i.type==7){
                        this.listfile.push(i)
                        this.upFile=true;//显示
                    }
                })
                    this.fileDetail=this.listfile;
            }
            else{
                this.upFile=false;//隐藏附件列表
            }
        })
    }
    //附件实体赋值
     FileUoloadToData(url,name,size){
        var fileup=new FileUpload();
        fileup.id=0;
        fileup.type=7;
        fileup.docPostID=this.information.id;
        fileup.fileName='交修单附件';
        fileup.path=url;
        fileup.status=1;
        fileup.memo='';
        fileup.cdt=new Date();
        fileup.cuser=0;
        fileup.mdt=null;
        fileup.muser=null;
        fileup.fileSize=size;
        fileup.oldFileName=name;
        return fileup;
     }
   
    checkform={
            repairDT:[publicclass.Check.required.date1],//交修日
            repairType:[publicclass.Check.required.select],//交修类别
            repairKM:[publicclass.Check.required.number],//行驶里程
            repairDTPre:[publicclass.Check.required.date1],//预计完工日
            repairNam:[publicclass.Check.required.text],//交修人
            contactNumber:[publicclass.Check.required.text,publicclass.Check.checkvalue.mobiel],//联系电话
            payMode:[publicclass.Check.required.select],//付款周期
            supplier:[publicclass.Check.required.select],//维修厂商
            carbody:[publicclass.Check.required.multiple],//车身内部
            repairProblem:[publicclass.Check.required.text],//送修问题
            operatingItem:[publicclass.Check.required.text],//作业项目
            repairRecommendation:[publicclass.Check.required.text],//交修建议
            // estimatedTimeFee:[publicclass.Check.required.text],//预估工时总金额
            // estimatedPartFee:[publicclass.Check.required.text]//预估零件总金额
        }
    }
</script>
<style scoped>
/* 假如内容过长，一屏放不下，滚动条下拉覆盖不全 */
.ivu-spin-fix {
    position: fixed;
}
</style>