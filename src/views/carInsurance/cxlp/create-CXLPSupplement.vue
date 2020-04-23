<template>
    <div>
        <Modal
         :title="ModelName"
         :width="500"
         :value="value"
         @on-ok="save"
         @on-visible-change="visibleChange"
        >
            <Form ref="SupplementForm" :rules="checkForm" :label-width="80" :model="SupplementForm">
                <Row>
                    <Col span="24">
                        <FormItem label="补充说明" prop="supplementContent" style="width: 100%">
                            <Input v-model="SupplementForm.supplementContent" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem label="承办人" prop="contractors" style="width: 100%">
                            <Select :placeholder="L('Select')" v-model="SupplementForm.contractors" @on-change="GetContractors" :label-in-value="true">
                                <Option v-for="item in ContractorsList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
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
export default class CXLPSupplement extends AbpBase{
    @Prop({type:Boolean,default:false}) value:boolean;
    pageItemCodeRequest:PageItemCodeRequest=new PageItemCodeRequest();
    ModelName:any='新增案件补充说明'
    AddOrEdit=1;
    Index=null;
    modelloading=true;//模态框加载动画
    contractorlist:any=[];

    save(){
        (this.$refs.SupplementForm as any).validate(async (valid:boolean)=>{
            if(valid){
                if (this.AddOrEdit==1) {
                    this.SupplementForm.cdt=new Date();
                    this.$emit("save-success",publicclass.DeepClone(this.SupplementForm),1,this.Index)
                }else{
                    this.SupplementForm.mdt=new Date();
                    this.$emit("save-success",publicclass.DeepClone(this.SupplementForm),2,this.Index)
                }
                (this.$refs.SupplementForm as any).resetFields();
                this.$emit('input',false);
            }
        })
    }
    cancel(){
        (this.$refs.SupplementForm as any).resetFields();
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
    get ContractorsList(){
        return this.contractorlist;
    }
    async getList(){
        //承办人
        this.pageItemCodeRequest.itemTypes = [851];
        await this.$store.dispatch({
            type:'itemCode/GetItemCodeByItemTypes',
            data:this.pageItemCodeRequest
        }).then(res=>{
            this.contractorlist = res.items
        })
    }
    /**监听addoredit当前状态，判断为修改还是新增 */
     @Watch("AddOrEdit",{immediate: true})
     changeaddoredit(){
        if (this.AddOrEdit==1) {
            this.ModelName='新增案件补充说明'
        }
        if (this.AddOrEdit==2) {
            this.ModelName='修改案件补充说明'
        }
    }
    /**清空模态框 */
    clearModal(){
        this.AddOrEdit=1;
        this.SupplementForm.id=0;
        this.SupplementForm.supplementContent='';
        this.SupplementForm.contractors=null;
        this.SupplementForm.contractorsName='';
        this.SupplementForm.cuser=0;
        this.SupplementForm.cdt=null;
        this.SupplementForm.mdt=null;
        this.SupplementForm.muser=0;
        (this.$refs.SupplementForm as any).resetFields()
    }
    /**填充数据 */
     async SetData(data,index){
        this.modelloading=true;
        this.AddOrEdit=2;
        this.Index=index
        this.SupplementForm=data;
        this.modelloading=false;
    }
    SupplementForm={
        id:0,
        supplementContent:'',//补充说明
        contractors:null,//承办人
        contractorsName:'',//承办人名
        cuser:0,
        cdt:null,
        mdt:null,
        muser:0
    }
    //获取承办人名
    GetContractors(data){
        if(data){
            this.SupplementForm.contractorsName=data.label
        }
    }
    checkForm={
        supplementContent:[publicclass.Check.required.text],
        contractors:[publicclass.Check.required.select]
    }
}
</script>