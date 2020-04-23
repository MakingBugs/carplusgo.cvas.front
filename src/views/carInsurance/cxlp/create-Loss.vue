<template>
    <div>
        <Modal
         :title="ModelName"
         :width="500"
         :value="value"
         @on-ok="save"
         @on-visible-change="visibleChange"
        >
            <Form ref="LossForm" :rules="checkForm" :label-width="80" :model="LossForm">
                <Row>
                    <Col span="24">
                        <FormItem label="对肇方" prop="dzfType" style="width: 100%">
                            <Select :placeholder="L('Select')" v-model="LossForm.dzfType" @on-change="GetDZFType" :label-in-value="true">
                                <Option v-for="item in DZFTypeList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem label="费用别" prop="feeType" style="width:100%">
                            <Select :placeholder="L('Select')" v-model="LossForm.feeType" @on-change="GetFeeType" :label-in-value="true">
                                <Option v-for="item in FeeTypeList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem label="金额" prop="feeAmount" style="width:100%;">
                            <InputNumber v-model="LossForm.feeAmount" style="width:100%"></InputNumber>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem label="其他备注" prop="feeOtherRemark" style="width: 100%">
                            <Input v-model="LossForm.feeOtherRemark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button @click="cancel">{{L('Cancel')}}</Button>
                <Button @click="save" type="primary">{{L('OK')}}</Button>
            </div>
            <Spin size="large" fix v-if="modelloading"></Spin>
        </Modal>
    </div>
</template>
<script lang="ts">
import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
import Util from '../../../lib/util'
import AbpBase from '../../../lib/abpbase'
import PageRequest from '@/store/entities/page-request' 
import publicclass from '../../../lib/publicclass';

class PageItemCodeRequest extends PageRequest{
    maxResultCount=10000
    skipCount=0
    itemTypes:Array<number>
}

@Component
export default class Loss extends AbpBase{
    @Prop({type:Boolean,default:false}) value:boolean;
    pageItemCodeRequest:PageItemCodeRequest=new PageItemCodeRequest();
    
    AddOrEdit=1;
    Index=null;
    ModelName:any='新增损失情况'
    modelloading=true;//模态框加载动画
    LossDZF:any=[];//损失对肇方
    LossFeeType:any=[];//损失费用别

    save(){
        (this.$refs.LossForm as any).validate(async (valid:boolean)=>{
            if(valid){
                if (this.AddOrEdit==1) {
                    this.LossForm.cdt=new Date();
                    this.$emit("save-success",publicclass.DeepClone(this.LossForm),1,this.Index)
                }else{
                    this.LossForm.mdt=new Date();
                    this.$emit("save-success",publicclass.DeepClone(this.LossForm),2,this.Index)
                }
                (this.$refs.LossForm as any).resetFields();
                this.$emit('input',false);
            }
        })
    }
    cancel(){
        (this.$refs.LossForm as any).resetFields();
        this.$emit('input',false);
    }
    async visibleChange(value:boolean){
        if(!value){
            this.$emit('input',value);
            this.clearModal()
        }else{
            this.modelloading=true;
            await this.getList();
            this.modelloading=false;
        }
    }
    get DZFTypeList(){//对肇方
        return this.LossDZF;
    }
    get FeeTypeList(){//对肇方
        return this.LossFeeType;
    }
    async getList(){
        //损失对肇方
        this.pageItemCodeRequest.itemTypes = [854];
        await this.$store.dispatch({
            type:'itemCode/GetItemCodeByItemTypes',
            data:this.pageItemCodeRequest
        }).then(res=>{
            this.LossDZF = res.items
        })
        //费用别
        this.pageItemCodeRequest.itemTypes = [844];
        await this.$store.dispatch({
            type:'itemCode/GetItemCodeByItemTypes',
            data:this.pageItemCodeRequest
        }).then(res=>{
            this.LossFeeType = res.items
        })
    }
    //获取对肇方
    GetDZFType(data){
        if(data){
            this.LossForm.dzfTypeName=data.label
        }
    }
    //获取费用别名
    GetFeeType(data){
        if(data){
            this.LossForm.feeTypeName=data.label
        }
    }
    /**监听addoredit当前状态，判断为修改还是新增 */
     @Watch("AddOrEdit",{immediate: true})
     changeaddoredit(){
        if (this.AddOrEdit==1) {
            this.ModelName='新增损失情况'
        }
        if (this.AddOrEdit==2) {
            this.ModelName='修改损失情况'
        }
    }
    /**填充数据 */
     async SetData(data,index){
        this.modelloading=true;
        this.AddOrEdit=2;
        this.Index=index
        this.LossForm=data;
        this.modelloading=false;
    }
    /**清空模态框 */
     clearModal(){
        this.AddOrEdit=1;
        this.LossForm.id=0;
        this.LossForm.feeOtherRemark='';
        this.LossForm.feeAmount=0;
        this.LossForm.dzfType=null;
        this.LossForm.feeType=null;
        this.LossForm.dzfTypeName='';
        this.LossForm.feeTypeName='';
        (this.$refs.LossForm as any).resetFields()
    }
    LossForm={
        id:0,
        feeOtherRemark:'',//其他备注
        feeAmount:0,//金额
        dzfType:null,//对肇方
        dzfTypeName:'',//对肇方名称
        feeType:null,//费用别
        feeTypeName:'',//费用别名
        cdt:null,
        mdt:null,
    }

    checkForm={
        dzfType:[publicclass.Check.required.select],
        feeType:[publicclass.Check.required.select],
        feeAmount:[publicclass.Check.required.number]
    }
}
</script>