<template>
    <div>
        <Modal
         :title="L('Edit')"
         :value="value" 
         :width="1200"
         :information="information"
         @on-ok="save"
         @on-visible-change="visibleChange"
        >
            <Form ref="requestForm"  label-position="left"  :model="Form1" :label-width="80">
                <Row>
                    <Col span="6">
                        <FormItem :label="L('客户')" prop="mainparts">
                            <Input v-model="Form1.customer" style="width:200px" :maxlength="50" readonly/>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label="L('业代部门')" prop="mainparts">
                            <Input v-model="Form1.salesDep" style="width:200px" :maxlength="50" readonly/>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label="L('业代姓名')" prop="mainparts">
                            <Input v-model="Form1.salesName" style="width:200px" :maxlength="50" readonly/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="6">
                        <FormItem :label="L('销售金额')" prop="mainparts">
                            <Input v-model="Form1.reqSaleAmt" style="width:200px" :maxlength="50"/>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label="L('税额')" prop="mainparts">
                            <Input v-model="Form1.reqTaxAmt" style="width:200px" :maxlength="50"/>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label="L('发票号码')" prop="mainparts">
                            <Input v-model="Form1.reqInvNo" style="width:200px" :maxlength="50"/>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label="L('厂商')" prop="mainparts">
                            <p>{{Form1.itemName}}</p>
                            <!-- <Input v-model="Form1.itemName" style="width:200px" :maxlength="50"/> -->
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table :columns="columns" :no-data-text="L('NoDatas')" border :data="Form1.partslist">
                        </Table>
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
    import Request from '@/store/entities/accessories/request';

    @Component
    export default class EditRequest extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        @Prop({type:Object,default:null}) information:any;
        request:Request=new Request();
        itemcodelist:any=null;
        mainparts:number=null;
        save(){
            (this.$refs.requestForm as any).validate(async (valid:boolean)=>{
                if(valid){
                    await this.$store.dispatch({
                        type:'request/update',
                        data:this.request
                    });
                    (this.$refs.requestForm as any).resetFields();
                    this.$emit('save-success');
                    this.$emit('input',false);
                }
            })
        }
        
        cancel(){
            (this.$refs.requestForm as any).resetFields();
            this.$emit('input',false);
        }
       async visibleChange(value:boolean){
            if(!value){
                this.$emit('input',value);
            }else{
                this.Form1=Util.extend(true,{},this.information);
                this.Form1.reqSaleAmt=this.information.totalAmt;//销售金额
                this.Form1.partslist=this.aa;
            }
        }
        Form1={
            customer:"",
            salesDep:"",
            salesName:"",
            reqSaleAmt:"",
            reqTaxAmt:"",
            reqInvNo:"",
            itemName:"",
            partslist:[]
        }
        columns=[{
            title:this.L('配件序号'),
            key:'accessoriesAuto',
        },{
            title:this.L('维修厂商'),
            key:'itemName',
        },{
            title:this.L('主配件'),
            key:'mainAccessory',
        },{
            title:this.L('次配件'),
            key:'subAccessory',
        },{
            title:this.L('施工位置'),
            key:'location',
        },{
            title:this.L('座位数'),
            key:'seat',
        },{
            title:this.L('施工及价格变动说明'),
            key:'accessoryRemark',
        },{
            title:this.L('配件售价'),
            key:'amt',
        },{
            title:this.L('厂商进价'),
            key:'purchasePrice',
        }]
        aa:any=[{//Table列表
            accessoriesAuto: 39201,
            itemName: '苏州名骏百盛',
            mainAccessory: '3M-太阳膜',
            subAccessory: '3M超级沙龙侧后档7座',
            location: '全车',
            seat: '2座',
            accessoryRemark:'',
            amt:'1490',
            purchasePrice:'846'
        }]
    }
</script>
