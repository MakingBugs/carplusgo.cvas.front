<template>
    <div>
        <Modal
         :title="L('追加交修')"
         :value="value" 
         :width="1200"
         :additems="additems"
         :carrepairitems="carrepairitems"
         @on-ok="save"
         @on-visible-change="visibleChange"
        >
            <Form ref="additionalItemForm" :model="Form1" :label-width="100">
                <Row>
                    <Col>
                    <FormItem label="追加作业项目" style="width: 100%" prop="operatingItem">
                        <Input v-model="Form1.operatingItem" type="textarea" :autosize="{minRows: 3,maxRows: 5}"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <FormItem label="车身内部" style="width:100%" prop="carbody">
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
                    <FormItem label="送修问题" style="width:100%" prop="repairProblem">
                        <Input v-model="Form1.repairProblem" type="textarea" :autosize="{minRows: 3,maxRows: 5}"></Input>
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
    </div>
</template>
<script lang="ts">
import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
import Util from '../../../lib/util'
import AbpBase from '../../../lib/abpbase'
import PageRequest from '@/store/entities/page-request'
import CarRepair from '@/store/entities/carfix/carRepair';
import AdditionalItem from '@/store/entities/carfix/additionalItem'


    class PageAdditionalItemRequest extends PageRequest{
        maxResultCount=10000
        skipCount=0
    }

@Component
    export default class EditAdditionalItem extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        @Prop({type:Object,default:null}) additems:any;//传值
        @Prop({type:Object,default:null}) carrepairitems:any;//传值
        carRepair:CarRepair=new CarRepair();
        additionalItem:AdditionalItem=new AdditionalItem();//追加表
        pageAdditionalItemRequest:PageAdditionalItemRequest=new PageAdditionalItemRequest();
        addseris:any=[];//追加次序

        save(){
            (this.$refs.additionalItemForm as any).validate(async (valid:boolean)=>{
                this.addfuzhi();//赋值
                if(valid){
                    await this.$store.dispatch({
                        type:'additionalItem/update',
                        data:this.additionalItem
                    });
                    await this.$store.dispatch({
                        type:'carRepair/update',
                        data:this.carRepair
                    });
                    (this.$refs.additionalItemForm as any).resetFields();
                    this.$emit('save-success');
                    this.$emit('input',false);
                }
            })
        }
        
        cancel(){
            (this.$refs.additionalItemForm as any).resetFields();
            this.$emit('input',false);
        }
       async visibleChange(value:boolean){
            if(!value){
                this.$emit('input',value);
            }else{
                this.Form1=Util.extend(true,{},this.additems);
                this.Form1.additionalItemAuto=this.additems.id;
                this.Form1.operatingItem=this.additems.additionalItem1;//追加作业项目
                this.Form1.carRepairAuto=this.additems.carRepairAuto;
                this.Form1.carbaseauto=this.carrepairitems.carBaseAuto;
                this.Form1.repairProblem=this.carrepairitems.repairProblem;//送修问题
                this.Form1.repairRecommendation=this.carrepairitems.repairRecommendation;//交修建议
                this.Form1.estimatedTimeFee=this.carrepairitems.estimatedTimeFee;
                this.Form1.estimatedPartFee=this.carrepairitems.estimatedPartFee;
                this.Form1.estimatedTotalFee=this.carrepairitems.estimatedTotalFee;
                this.Form1.carbody=this.carrepairitems.systemP.split(",");//车身内部
                this.Form1.serialNumber=this.additems.serialNumber;
            }
        }
        
        Form1={
            additionalItemAuto:0,
            carRepairAuto:0,
            carbaseauto:0,
            serialNumber:0,
            carbody:[],
            repairProblem:"",//送修问题
            operatingItem:"",//追加作业项目
            repairRecommendation:"",//交修建议
            estimatedTimeFee:"",
            estimatedPartFee:"",
            estimatedTotalFee:"",
        }
        //计算合计总金额
        estimatedAmount(){
            if(this.Form1.estimatedTimeFee != '' && this.Form1.estimatedPartFee != ''){
                var sum= Number(this.Form1.estimatedTimeFee) + Number(this.Form1.estimatedPartFee);
                this.Form1.estimatedTotalFee = sum.toString();
            }
        }
        //追加表赋值
        addfuzhi(){
            //赋值
            this.additionalItem.id=this.Form1.additionalItemAuto;
            this.additionalItem.carRepairAuto=this.Form1.carRepairAuto;
            this.additionalItem.additionalItem1=this.Form1.operatingItem;//追加内容
            this.additionalItem.status=20;
            this.additionalItem.serialNumber=this.Form1.serialNumber;//追加次数
            this.additionalItem.muser=0;
            this.additionalItem.mdt=new Date();

            this.carRepair.id=this.Form1.carRepairAuto;//交修编号
            this.carRepair.carBaseAuto=this.Form1.carbaseauto;//车籍编号
            this.carRepair.orderAuto=0;//契约编号
            this.carRepair.repairDT=this.carrepairitems.repairDt;//交修日期
            this.carRepair.repairType=this.carrepairitems.repairType;//交修类别
            this.carRepair.km=this.carrepairitems.repairKM;//行驶里程
            this.carRepair.repairDtpre=this.carrepairitems.repairDtpre;//预计完工时间
            this.carRepair.repairName=this.carrepairitems.repairName;//交修人
            this.carRepair.contactNumber=this.carrepairitems.contactNumber;//联系电话
            this.carRepair.payMode=this.carrepairitems.payMode;//付款周期
            this.carRepair.supplierAuto=this.carrepairitems.supplierAuto;//维修厂商
            this.carRepair.systemP=this.Form1.carbody.toString();//车身内部
            this.carRepair.repairProblem=this.Form1.repairProblem;//送修问题
            this.carRepair.operatingItem=this.carrepairitems.operatingItem;//作业项目
            this.carRepair.repairRecommendation=this.Form1.repairRecommendation;//交修建议
            this.carRepair.estimatedTimeFee=this.Form1.estimatedTimeFee;//预估工时总金额
            this.carRepair.estimatedPartFee=this.Form1.estimatedPartFee;//预估零件总金额
            this.carRepair.estimatedTotalFee=this.Form1.estimatedTotalFee;//合计总金额
            this.carRepair.repairTypeItemType=501;//维修类别
            this.carRepair.payModeItemType=123;//付款周期
            this.carRepair.status=20;
            this.carRepair.addStatus=20;
            this.carRepair.cuser=this.carrepairitems.cuser;
            this.carRepair.mdt=this.carrepairitems.cdt;
            this.carRepair.muser=0;
            this.carRepair.mdt=new Date();
        }
    }
</script>