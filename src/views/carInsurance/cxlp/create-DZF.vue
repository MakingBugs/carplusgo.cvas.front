<template>
    <div>
        <Modal
         :title="ModelName"
         :width="700"
         :value="value"
         @on-ok="save"
         @on-visible-change="visibleChange"
        >
            <Form ref="DZFForm" :rules="checkForm" :label-width="80" :model="DZFForm">
                <Row>
                    <Col span="12">
                        <FormItem label="对肇方" prop="ddlDZF" style="width: 100%">
                            <Select :placeholder="L('Select')" v-model="DZFForm.ddlDZF" @on-change="GetDZFType" :label-in-value="true">
                                <Option v-for="item in ddlDZFList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                         <FormItem label="是否伤人" prop="isInjured" style="width: 100%">
                             <Select :placeholder="L('Select')" v-model="DZFForm.isInjured">
                                 <Option value="1">是</Option>
                                 <Option value="2">否</Option>
                             </Select>
                         </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="车牌号" prop="makNO" style="width: 100%">
                            <Input v-model="DZFForm.makNO"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="车型" prop="clasenName" style="width: 100%">
                            <Input v-model="DZFForm.clasenName"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="承保公司" prop="iNSINC" style="width: 100%">
                            <Input v-model="DZFForm.iNSINC"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="车主" prop="owner" style="width: 100%">
                            <Input v-model="DZFForm.owner"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="驾驶员" prop="driver" style="width: 100%">
                            <Input v-model="DZFForm.driver"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="联系电话" prop="phone" style="width: 100%">
                            <Input v-model="DZFForm.phone" style="width:100%"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="维修厂" prop="dzfWXC" style="width: 100%">
                            <Input v-model="DZFForm.dzfWXC"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem label="备注" prop="remark" style="width: 100%">
                            <Input v-model="DZFForm.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
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
export default class DZF extends AbpBase{
    @Prop({type:Boolean,default:false}) value:boolean;
    pageItemCodeRequest:PageItemCodeRequest=new PageItemCodeRequest();
    
    AddOrEdit=1;
    Index=null;
    ModelName:any='新增对肇方'
    modelloading=true;//模态框加载动画
    DZF:any=null;//对肇方（多方）

    save(){
        (this.$refs.DZFForm as any).validate(async (valid:boolean)=>{
            if(valid){
                if (this.AddOrEdit==1) {
                    this.DZFForm.cdt=new Date();
                    this.$emit("save-success",publicclass.DeepClone(this.DZFForm),1,this.Index)
                }else{
                    this.DZFForm.mdt=new Date();
                    this.$emit("save-success",publicclass.DeepClone(this.DZFForm),2,this.Index)
                }
                (this.$refs.DZFForm as any).resetFields();
                this.$emit('input',false);
            }
        })
    }
    cancel(){
        (this.$refs.DZFForm as any).resetFields();
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
    
    get ddlDZFList(){//对肇方（多方）
        return this.DZF;
    }
    async getList(){
        //对肇方（多方）
        this.pageItemCodeRequest.itemTypes = [847];
        await this.$store.dispatch({
            type:'itemCode/GetItemCodeByItemTypes',
            data:this.pageItemCodeRequest
        }).then(res=>{
            this.DZF = res.items
        })
    }
    //获取对肇方
    GetDZFType(data){
        if(data){
            this.DZFForm.dzfTypeName=data.label
        }
    }
    /**监听addoredit当前状态，判断为修改还是新增 */
     @Watch("AddOrEdit",{immediate: true})
     changeaddoredit(){
        if (this.AddOrEdit==1) {
            this.ModelName='新增对肇方'
        }
        if (this.AddOrEdit==2) {
            this.ModelName='修改对肇方'
        }
    }
    /**填充数据 */
     async SetData(data,index){
        this.modelloading=true;
        this.AddOrEdit=2;
        this.Index=index
        this.DZFForm=data;
        if(data.isInjured==1){
            this.DZFForm.isInjured='1'
        }else if(data.isInjured==2){
            this.DZFForm.isInjured='2'
        }
        this.modelloading=false;
    }
    /**清空模态框 */
     clearModal(){
        this.AddOrEdit=1;
        this.DZFForm.id=0;
        this.DZFForm.ddlDZF=0;
        this.DZFForm.isInjured=0;
        this.DZFForm.makNO='';
        this.DZFForm.clasenName='';
        this.DZFForm.iNSINC='';
        this.DZFForm.owner='';
        this.DZFForm.driver='';
        this.DZFForm.phone='';
        this.DZFForm.dzfWXC='';
        this.DZFForm.remark='';
        (this.$refs.DZFForm as any).resetFields()
    }
    DZFForm={
        id:0,
        ddlDZF:null,//对肇方（多方）
        dzfTypeName:'',//对肇方名称
        isInjured:null,//是否伤人（对肇方）
        makNO:'',//车牌号（对肇方）
        clasenName:'',//车型（对肇方）
        iNSINC:'',//承保公司（对肇方）
        owner:'',//车主（对肇方）
        driver:'',//驾驶员（对肇方）
        phone:'',//联系电话（对肇方）
        dzfWXC:'',//维修厂（对肇方）
        remark:'',//备注（对肇方）
        cdt:null,
        mdt:null
    }

    checkForm={
        ddlDZF:[publicclass.Check.required.select],
        phone:[publicclass.Check.checkvalue.mobiel]
    }
}
</script>