<template>
    <div>
        <Modal
         :title="ModelName"
         :width="500"
         :value="value"
         @on-ok="save"
         @on-visible-change="visibleChange"
        >
            <Form ref="RecordForm" :rules="checkForm" :label-width="80" :model="RecordForm">
                <Row>
                    <Col span="24">
                        <FormItem label="记录内容" prop="recordContent" style="width: 100%">
                            <Input v-model="RecordForm.recordContent" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem label="处理方法" prop="caseDealWay" style="width:100%">
                            <Select :placeholder="L('Select')" v-model="RecordForm.caseDealWay" @on-change="GetCaseDealWay" :label-in-value="true">
                                <Option v-for="item in caseDealWayList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem label="承办人" prop="contractors" style="width:100%;">
                            <Select :placeholder="L('Select')" v-model="RecordForm.contractors" @on-change="GetContractors" :label-in-value="true">
                                <Option v-for="item in contractorsList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                            </Select>
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
export default class Record extends AbpBase{
    @Prop({type:Boolean,default:false}) value:boolean;
    pageItemCodeRequest:PageItemCodeRequest=new PageItemCodeRequest();

    AddOrEdit=1;
    Index=null;
    ModelName:any='新增处理进度'
    modelloading=true;//模态框加载动画
    dealWay:any=[];//处理方法
    contractors:any=[];//承办人

    save(){
        (this.$refs.RecordForm as any).validate(async (valid:boolean)=>{
            if(valid){
                if (this.AddOrEdit==1) {
                    this.RecordForm.cdt=new Date();
                    this.$emit("save-success",publicclass.DeepClone(this.RecordForm),1,this.Index)
                }else{
                    this.RecordForm.mdt=new Date();
                    this.$emit("save-success",publicclass.DeepClone(this.RecordForm),2,this.Index)
                }
                (this.$refs.RecordForm as any).resetFields();
                this.$emit('input',false);
            }
        })
    }
    cancel(){
        (this.$refs.RecordForm as any).resetFields();
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
    get caseDealWayList(){
        return this.dealWay;
    }
    get contractorsList(){
        return this.contractors;
    }
    async getList(){
        //处理方法
        this.pageItemCodeRequest.itemTypes = [860];
        await this.$store.dispatch({
            type:'itemCode/GetItemCodeByItemTypes',
            data:this.pageItemCodeRequest
        }).then(res=>{
            this.dealWay = res.items
        })
        //承办人
        this.pageItemCodeRequest.itemTypes = [851];
        await this.$store.dispatch({
            type:'itemCode/GetItemCodeByItemTypes',
            data:this.pageItemCodeRequest
        }).then(res=>{
            this.contractors = res.items
        })
    }
    //获取处理方法
    GetCaseDealWay(data){
        if(data){
            this.RecordForm.caseDealWayName=data.label
        }
    }
    //获取承办人
    GetContractors(data){
        if(data){
            this.RecordForm.contractorsName=data.label
        }
    }
    /**监听addoredit当前状态，判断为修改还是新增 */
     @Watch("AddOrEdit",{immediate: true})
     changeaddoredit(){
        if (this.AddOrEdit==1) {
            this.ModelName='新增处理进度'
        }
        if (this.AddOrEdit==2) {
            this.ModelName='处理进度修改'
        }
    }
    /**清空模态框 */
     clearModal(){
        this.AddOrEdit=1;
        this.RecordForm.id=0;
        this.RecordForm.recordContent='';
        this.RecordForm.caseDealWay=null;
        this.RecordForm.caseDealWayName=null;
        this.RecordForm.contractors=null;
        this.RecordForm.contractorsName=null;
        this.RecordForm.cdt=null;
        this.RecordForm.mdt=null;
        (this.$refs.RecordForm as any).resetFields()
    }
    /**填充数据 */
     async SetData(data,index){
        this.modelloading=true;
        this.AddOrEdit=2;
        this.Index=index
        this.RecordForm=data;
        this.modelloading=false;
    }
    RecordForm={
        id:0,
        recordContent:'',//记录内容
        caseDealWay:null,//处理方法
        caseDealWayName:null,//处理方法
        contractors:null,//承办人
        contractorsName:null,//承办人
        cdt:null,
        mdt:null,
    }
    checkForm={
        recordContent:[publicclass.Check.required.text],
        caseDealWay:[publicclass.Check.required.select],
        contractors:[publicclass.Check.required.select]
    }
}
</script>