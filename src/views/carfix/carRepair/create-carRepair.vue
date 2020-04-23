<template>
    <div>
        <Modal
         :title="L('维修估价/交修')"
         :value="value" 
         :width="1200"
         @on-ok="save"
         @on-visible-change="visibleChange"
         fullscreen
        >
            <Form ref="carRepairForm" :model="Form1" :rules="checkform" :label-width="100">
               <Divider>车辆信息</Divider>
                <Row>
                     <Col span="6">
                        <FormItem label="车牌号码" style="width: 100%" prop="makNo">
                            <Input v-model="Form1.makNo" :maxlength="50" @on-blur="MakNoCarInfo" style="width: 100%"/>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="车型" style="width: 100%" prop="clasenName">
                            <p style="color:blue">{{Form1.clasenName}}</p>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="出厂日期" style="width: 100%" prop="carDT">
                            <p style="color:blue">{{Form1.carDT}}</p>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="登记日期" style="width: 100%" prop="linceDT">
                            <p style="color:blue">{{Form1.linceDT}}</p>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="6">
                        <Button style="width: 40%;margin-left:100px" type="primary" ghost class="toolbar-btn" @click="checkCarFixLog">查看维修记录</Button>
                    </Col>
                    <Col span="6">
                        <FormItem label="变速类型" style="width: 100%" prop="BSType">
                            <p style="color:blue">{{Form1.BSType}}</p>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="车架号" style="width: 100%" prop="carNo">
                            <p style="color:blue">{{Form1.carNo}}</p>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="发动机号码" style="width: 100%" prop="engNo">
                            <p style="color:blue">{{Form1.engNo}}</p>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="6">
                        <FormItem label="使用性质" style="width: 100%" prop="useType">
                            <p style="color:blue">{{Form1.useType}}</p>
                        </FormItem>
                    </Col>
                     <Col span="6">
                        <FormItem label="颜色" style="width: 100%" prop="carColor">
                            <p style="color:blue">{{Form1.carColor}}</p>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="交修日期" style="width: 100%" prop="repairDT">
                            <DatePicker v-model="Form1.repairDT" style="width: 100%" type="date"></DatePicker>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="交修类别" style="width: 100%" prop="repairType">
                            <Select :placeholder="L('Select')" v-model="Form1.repairType">
                                <Option v-for="item in repairTypeList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="6">
                        <FormItem label="行驶里程" style="width: 100%" prop="repairKM">
                            <InputNumber v-model="Form1.repairKM" :min="0"  style="width: 100%"></InputNumber>
                        </FormItem>
                    </Col>
                     <Col span="6">
                        <FormItem label="预计完工时间" style="width: 100%" prop="repairDTPre">
                            <DatePicker v-model="Form1.repairDTPre" style="width: 100%" type="date"></DatePicker>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="交修人" style="width: 100%" prop="repairNam">
                            <Input v-model="Form1.repairNam" :maxlength="50"/>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="联系电话" style="width: 100%" prop="contactNumber">
                            <Input v-model="Form1.contactNumber" :maxlength="50"/>
                        </FormItem>
                    </Col>
                </Row>
               <Divider>承租信息</Divider>
                <!-- <Row>
                     <Col span="6">
                        <FormItem label="客户名称" style="width: 100%" prop="cusName">
                            <p style="color:blue">{{Form1.cusName}}</p>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="已收费用" style="width: 100%" prop="carMtnAmtT">
                            <p style="color:blue">{{Form1.carMtnAmtT}}</p>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="维修总计" style="width: 100%" prop="totalAmount">
                            <p style="color:blue">{{Form1.totalAmount}}</p>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="费用余额" style="width: 100%" prop="surplusage">
                            <p style="color:blue">{{Form1.surplusage}}</p>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                     <Col span="6">
                        <FormItem label="轮胎使用/额度" style="width: 100%" prop="useWhiel">
                            <p style="color:blue">{{Form1.useWhiel}}</p>/<p>{{Form1.Whiel}}</p>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="起租日" style="width: 100%" prop="SDT">
                            <p style="color:blue">{{Form1.SDT}}</p>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="迄租日" style="width: 100%" prop="EDT">
                            <p style="color:blue">{{Form1.EDT}}</p>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="是否含代步" style="width: 100%" prop="isDB">
                            <p style="color:blue">{{Form1.isDB}}</p>
                        </FormItem>
                    </Col>
                </Row> -->
                <Row>
                    <Col span="6">
                        <FormItem label="付款周期" style="width: 100%" prop="payMode">
                            <Select :placeholder="L('Select')" v-model="Form1.payMode">
                                <Option v-for="item in payModeList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="维修厂商" style="width: 100%" prop="supplier">
                            <Select :placeholder="L('Select')" v-model="Form1.supplier">
                                <Option v-for="item in supplierList" :value="item.id" :key="item.id">{{ item.fname }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <!-- <Col span="6" style="margin-left: 8px">
                        <Input v-model="Form1.supName" :maxlength="50" style="width: 60%"/>
                        <Button type="primary" size="large" @click="checkcarRepair" ghost class="toolbar-btn">{{L('搜索')}}</Button>
                    </Col> -->
                </Row>
                <!-- <Row>
                    <Col span="24">
                    <FormItem label="契约备注信息" style="width: 100%">
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
                    <FormItem label="车身内部" style="width: 100%" prop="carbody">
                        <CheckboxGroup v-model="Form1.carbody">
                            <Checkbox v-for="item in chkCarBodyList" :label="item.num" :key="item.num">{{item.itemName}}</Checkbox>
                        </CheckboxGroup>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <FormItem label="送修问题" style="width: 100%" prop="repairProblem">
                        <Input v-model="Form1.repairProblem" type="textarea" :autosize="{minRows: 3,maxRows: 5}"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <FormItem label="作业项目" style="width: 100%" prop="operatingItem">
                        <Input v-model="Form1.operatingItem" type="textarea" :autosize="{minRows: 3,maxRows: 5}"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <FormItem label="交修建议" style="width: 100%" prop="repairRecommendation">
                        <Input v-model="Form1.repairRecommendation" type="textarea" :autosize="{minRows: 3,maxRows: 5}"></Input>
                    </FormItem>
                    </Col>
                </Row>
               <!-- <Divider>附件</Divider>
                <Row>
                    <Col>
                        <FormItem label="附件" style="width: 100%">
                            <Upload action="" :before-upload="getFile">
                                <Button icon="ios-cloud-upload-outline" size="large" type="success" ghost>点击上传附件</Button>
                            </Upload>
                            <a :href="url"><h2>{{fileName}}</h2></a>
                        </FormItem>
                    </Col>
                </Row> -->
                <Row>
                     <Col span="6">
                        <FormItem label="预估工时总金额" style="width: 100%" prop="estimatedTimeFee">
                            <Input v-model="Form1.estimatedTimeFee" :maxlength="50" @on-blur="estimatedAmount"/>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="预估零件总金额" style="width: 100%" prop="estimatedPartFee">
                            <Input v-model="Form1.estimatedPartFee" :maxlength="50" @on-blur="estimatedAmount"/>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="合计总金额" style="width: 100%" prop="estimatedTotalFee">
                            <p style="color:blue">{{Form1.estimatedTotalFee}}</p>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button @click="cancel">{{L('Cancel')}}</Button>
                <Button @click="save" type="primary">{{L('存档')}}</Button>
            </div>
        </Modal>
        <check-carFixRecord v-model="checkModalShow" :repairitems="repairitems"></check-carFixRecord>
    </div>
</template>
<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '../../../lib/util'
    import AbpBase from '../../../lib/abpbase'
    import PageRequest from '@/store/entities/page-request'
    import CarRepair from '@/store/entities/carfix/carRepair'
    import CheckCarFixRecord from './check-carFixRecord.vue'
    import Axios from 'axios';
    import publicclass from '../../../lib/publicclass';

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
    class PageCarBaseRequest extends PageRequest{
        maxResultCount=10000
        skipCount=0
        makNo:string;
    }
    class PageInsurancePolicyRequest extends PageRequest{
        carBaseIds:Array<any>;
    }

     @Component({
        components:{CheckCarFixRecord}
    })
    export default class CreateCarRepair extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        carRepair:CarRepair=new CarRepair();
        pageItemCodeRequest:PageItemCodeRequest=new PageItemCodeRequest();
        pageSupplierRequest:PageSupplierRequest=new PageSupplierRequest();
        pageCarBaseRequest:PageCarBaseRequest = new PageCarBaseRequest();
        pageInsurancePolicyRequest:PageInsurancePolicyRequest=new PageInsurancePolicyRequest();//保险
        itemCodeTypelist:any=null;//交修类别
        itemCodepayMode:any=null;//付款周期
        itemCodeOverKM:any=null;//超里程结算
        supplierselect:any=null;//维修厂商
        carbodylist:any=[];//车身内部系统
        checkModalShow:boolean=false;
        repairitems:object=null;//传值
        fileName:any=null;
        url:any=null;
        makNo:any='';

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
                                await this.carRepairData();//赋值 
                                await this.$store.dispatch({
                                    type:'carRepair/create',
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
                    }else{
                        this.$Notice.warning({
                            title: '车号不存在'
                        })
                    }
                }
            })
        }
        
        cancel(){
            (this.$refs.carRepairForm as any).resetFields();
            this.$emit('input',false);
        }
       async visibleChange(value:boolean){
            if(!value){
                this.$emit('input',value);
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
        get chkCarBodyList(){//车身内部系统
            return this.carbodylist;
        }
        async getList(){
            //交修类别
            this.pageItemCodeRequest.maxResultCount=10000;
            this.pageItemCodeRequest.skipCount=0;
            this.pageItemCodeRequest.itemTypes = [501];
            this.itemCodeTypelist=(await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            })).items
            //付款周期
            this.pageItemCodeRequest.itemTypes = [123];
            this.itemCodepayMode=(await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            })).items
            //超里程结算
            this.pageItemCodeRequest.itemTypes = [317];
            this.itemCodeOverKM=(await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            })).items
            //维修厂商
            this.pageSupplierRequest.maxResultCount=10000;
            this.pageSupplierRequest.skipCount=0;
            this.pageSupplierRequest.supplierTypes=[2,3];
            this.supplierselect=(await this.$store.dispatch({
                type:'supplier/getAll',
                data:this.pageSupplierRequest
            })).items
            //变速类型
            this.pageItemCodeRequest.itemTypes = [841];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                this.Form1.itemCodelist=res.items;
            })
            //车身内部系统
            this.pageItemCodeRequest.itemTypes = [1411];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                this.carbodylist=res.items;
            })
        }

        Form1={
            carbaseauto:0,
            makNo:"",
            clasenName:"",
            carDT:"",
            linceDT:"",
            BSType:"",
            carNo:"",
            engNo:"",
            useType:"",
            carColor:"",
            repairDT:null,
            repairType:null,
            repairKM:0,
            repairDTPre:null,
            repairNam:"",
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
            supplier:0,
            supName:"",
            carbody:[],
            repairProblem:"",
            operatingItem:"",
            repairRecommendation:"",
            estimatedTimeFee:"",
            estimatedPartFee:"",
            estimatedTotalFee:"",
            itemCodelist:[],
            //契约
            // rateKM:"",
            // linceKM:"",
            // orderCarMtnAmt:"",
            // overKM:"",
            // overKMPayType:"",
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
                    if(res.items.length>0){
                        res.items.map(i => {
                            this.Form1.carbaseauto=i.id;//编号
                            this.Form1.itemCodelist.map(j=>{
                                if(i.bstype==j.num){
                                    this.Form1.BSType=j.itemName;//变速类型
                                }
                            })
                            if(i.clasen!=null){
                                this.Form1.clasenName=i.clasen.clasenName;//车型
                            }else{
                                this.Form1.clasenName='';
                            }
                            this.Form1.carDT=i.carDt;//出厂日期
                            this.Form1.linceDT=i.linceDt;//登记日期
                            this.Form1.carNo=i.carNo;//车架号
                            this.Form1.engNo=i.engNo;//发动机号码
                            this.Form1.useType=i.itemCode.itemName;//使用性质
                            this.Form1.carColor=i.carColor;//颜色
                        })
                    }
                    else{
                        this.Form1.carbaseauto=0;
                        this.$Notice.warning({
                            title: '车号不存在'
                        })
                    }
                });
            }
        }

        //计算合计总金额
         estimatedAmount(){
            if(this.Form1.estimatedTimeFee != '' && this.Form1.estimatedPartFee != ''){
                var sum= Number(this.Form1.estimatedTimeFee) + Number(this.Form1.estimatedPartFee);
                this.Form1.estimatedTotalFee = sum.toString();
            }
        }
        //对应数据库
         carRepairData(){
            this.Form1.repairDT=new Date(this.Form1.repairDT).toLocaleDateString();
            this.Form1.repairDTPre=new Date(this.Form1.repairDTPre).toLocaleDateString();
            this.carRepair.carBaseAuto=this.Form1.carbaseauto;//车籍编号
            this.carRepair.orderAuto=0;//契约编号
            this.carRepair.repairDT=this.Form1.repairDT;//交修日期
            this.carRepair.repairType=this.Form1.repairType;//交修类别
            this.carRepair.km=this.Form1.repairKM;//行驶里程
            this.carRepair.repairDtpre=this.Form1.repairDTPre;//预计完工时间
            this.carRepair.repairName=this.Form1.repairNam;//交修人
            this.carRepair.contactNumber=this.Form1.contactNumber;//联系电话
            this.carRepair.payMode=this.Form1.payMode;//付款周期
            this.carRepair.supplierAuto=this.Form1.supplier;//维修厂商
            this.carRepair.systemP=this.Form1.carbody.toString();//车身内部
            this.carRepair.repairProblem=this.Form1.repairProblem;//送修问题
            this.carRepair.operatingItem=this.Form1.operatingItem;//作业项目
            this.carRepair.repairRecommendation=this.Form1.repairRecommendation;//交修建议
            this.carRepair.estimatedTimeFee=this.Form1.estimatedTimeFee;//预估工时总金额
            this.carRepair.estimatedPartFee=this.Form1.estimatedPartFee;//预估零件总金额
            this.carRepair.estimatedTotalFee=this.Form1.estimatedTotalFee;//合计总金额
            this.carRepair.addStatus=-1;//追加状态 -1 未追加 0已追加
            this.carRepair.status=20;
            this.carRepair.repairTypeItemType=501;//维修类别
            this.carRepair.payModeItemType=123;//付款周期
            this.carRepair.cuser=0;
            this.carRepair.cdt=new Date();
            this.carRepair.carFixType=0;
            this.makNo=this.Form1.makNo;
        }
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
       //上传附件
        //判断上传的文件类型（file为上传的文件）
         getFile(file) {
            const fileExt = file.name.split('.').pop().toLocaleLowerCase()//上传的文件的后缀
            if (fileExt === 'xlsx' || fileExt === 'xls'|| fileExt === 'pdf'|| fileExt === 'doc'|| fileExt === 'docx') {
                this.submitUpload(file)//文件提交
            } else {
                this.$Notice.warning({
                title: '文件类型错误',
                desc: '文件：' + file.name + '的类型不正确，请选择后缀为.pdf、.doc、.docx、xls和xlsx的文件。'
                })
            }
            return false
         }
        //提交文件
        submitUpload(file){
            var formData = new FormData();
            formData.append('fileInfo', file);
            formData.append('dirName','carRepair');
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            Axios.post('http://192.168.21.150:8080/api/upload',formData,config)
            .then((response) => {
                if(response.statusText=="OK"){
                    this.$Message.success('文件上传成功');  
                    this.fileName=file.name;//显示上传文件名
                    this.url=response.data.url;//返回链接
                }
            })
        }
      created(){
            this.getList();
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
            estimatedTimeFee:[publicclass.Check.required.text],//预估工时总金额
            estimatedPartFee:[publicclass.Check.required.text]//预估零件总金额
        }
    }
</script>
