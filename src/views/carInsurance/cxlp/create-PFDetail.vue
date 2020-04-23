<template>
    <div>
        <Modal
         :title="ModelName"
         :width="800"
         :value="value"
         @on-ok="save"
         @on-visible-change="visibleChange"
        >
            <Form ref="PFDetailForm" :rules="checkForm" :label-width="80" :model="PFDetailForm">
                <Row>
                    <Col span="12">
                        <FormItem label="账户名称" prop="accountName" style="width: 100%">
                            <Input v-model="PFDetailForm.accountName"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem :label-width="0" label="" prop="ddlAccountName" style="width:100%;padding-left:5px">
                            <Select :placeholder="L('Select')" v-model="PFDetailForm.ddlAccountName" @on-change="GetBankAccountName" :label-in-value="true">
                                <Option v-for="item in ddlAccountNameList" :value="item.id" :key="item.id">{{ item.lkrUser }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="银行账号" prop="bankAccount" style="width: 100%">
                            <Input v-model="PFDetailForm.bankAccount"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem :label-width="0" label="" prop="ddlBankAccount" style="width:100%;padding-left:5px">
                            <Select :placeholder="L('Select')" v-model="PFDetailForm.ddlBankAccount" @on-change="GetBankAccount" :label-in-value="true">
                                <Option v-for="item in ddlBankAccountList" :value="item.id" :key="item.id">{{ item.lkrAccount }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="银行别" prop="ddlBankType" style="width: 100%">
                            <Select :placeholder="L('Select')" v-model="PFDetailForm.ddlBankType" @on-change="GetBankTypeName" :label-in-value="true">
                                <Option v-for="item in ddlBankTypeList" :value="item.id" :key="item.id">{{ item.bankNameT }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem :label-width="0" label="" style="width:100%;padding-left:5px" prop="txtbankQuery">
                            <Select ref="select" placeholder="输入关键字搜索银行..." v-model="PFDetailForm.txtbankQuery" filterable remote :remote-method="GetBank" :loading="BankLoading" @on-change="GetBankName" :label-in-value="true">
                                <Option v-for="item in BankList" :key="item.id" :value="item.id">{{item.bankName}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="银行名称" prop="acountBank" style="width: 100%">
                            <Input v-model="PFDetailForm.acountBank" readonly></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem :label-width="0" label="" prop="ddlBankName" style="width:100%;padding-left:5px">
                            <Select :placeholder="L('Select')" v-model="PFDetailForm.ddlBankName" @on-change="GetlkrbankName" :label-in-value="true">
                                <Option v-for="item in ddlBankNameList" :value="item.id" :key="item.id">{{ item.lkrBank }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="赔付金额" prop="pfAmt" style="width: 100%">
                            <InputNumber v-model="PFDetailForm.pfAmt" style="width:100%"></InputNumber>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem :label-width="0" label="" style="width: 100%">
                            <Button type="primary" @click="btnBankinfoSave" ghost style="margin-left: 20px">账户信息存档</Button>
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
    import RRLKR from '../../../store/entities/carInsurance/rrlkr';
import BankType from '../../../store/entities/public/bankType';

    class PageRRLKRRequest extends PageRequest{
        maxResultCount=10000
        skipCount=0
        formType:number=1;
        rrlkrAuto:any=null;
    }
    class PageBankTypeRequest extends PageRequest{
        maxResultCount=10000
        skipCount=0
    }
    class PageBankDetailRequest extends PageRequest{//银行明细
        maxResultCount=10000
        skipCount=0
        keyword:string='';
        bankType:number=0;
    }

    @Component
    export default class PFDetail extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        pagerequest:PageRRLKRRequest=new PageRRLKRRequest();
        pageBankTypeRequest:PageBankTypeRequest=new PageBankTypeRequest();//银行类别
        pageBankDetailRequest:PageBankDetailRequest=new PageBankDetailRequest();//银行明细
        BankLoading:boolean=false;
        BankTypelist:any=[];//银行别
        lkrNamelist:any=[];//账户名称显示
        lkrAccountlist:any=[];//银行账号显示
        bankNamelist:any=[];//开户行显示
        lkrbanklist:any=[];
        AddOrEdit=1;
        ModelName:any='新增赔付明细'
        Index=null;
        modelloading=true;//模态框加载动画
        save(){
            (this.$refs.PFDetailForm as any).validate(async (valid:boolean)=>{
                if(valid){
                    if (this.AddOrEdit==1) {
                        this.$emit("save-success",publicclass.DeepClone(this.PFDetailForm),1,this.Index)
                    }else{
                        this.$emit("save-success",publicclass.DeepClone(this.PFDetailForm),2,this.Index)
                    }
                    (this.$refs.PFDetailForm as any).resetFields();
                    this.$emit('input',false);
                }
            })
        }
        cancel(){
            (this.$refs.PFDetailForm as any).resetFields();
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
        /**监听addoredit当前状态，判断为修改还是新增 */
        @Watch("AddOrEdit",{immediate: true})
        changeaddoredit(){
            if (this.AddOrEdit==1) {
              this.ModelName='新增赔付明细'
            }
            if (this.AddOrEdit==2) {
              this.ModelName='赔付明细修改'
            }
        }
        /**清空模态框 */
        clearModal(){
            this.AddOrEdit=1;
            this.PFDetailForm.id=0;
            (this.$refs.PFDetailForm as any).resetFields()
        }
        /**填充数据 */
        async SetData(data,index){
            this.modelloading=true;
            this.AddOrEdit=2;
            this.Index=index
            this.PFDetailForm=data;
            this.modelloading=false;
        }
        get ddlBankTypeList(){//银行别
            return this.BankTypelist;
        }
        get ddlAccountNameList(){//银行账户名称选择
            return this.lkrNamelist;
        }
        get ddlBankAccountList(){//银行账号选择
            return this.lkrAccountlist;
        }
        get BankList(){//银行搜索
            return this.lkrbanklist;
        }
        get ddlBankNameList(){//银行名称选择
            return this.bankNamelist;
        }
        async getList(){
            //银行别
            await this.$store.dispatch({
                type:'bankType/getAll',
                data:this.pageBankTypeRequest
            }).then(res=>{
                this.BankTypelist = res.items
            })
            this.pagerequest.rrlkrAuto=null;
            this.pagerequest.formType=1;
            await this.$store.dispatch({
                type:'rrlkr/getAll',
                data:this.pagerequest
            }).then(res=>{
                this.lkrNamelist = res.items;//账户名
                this.lkrAccountlist = res.items;//账号
                this.bankNamelist = res.items;//开户行
            })
        }
        PFDetailForm={
            id:0,
            accountName:'',//账户名称
            ddlAccountName:0,//
            bankAccount:'',//银行账号
            ddlBankAccount:0,//
            ddlBankType:0,//银行别
            bankTypeName:null,//银行别名称
            acountBank:'',//开户行 
            ddlBankName:0,//
            txtbankQuery:'',//银行搜索
            pfAmt:0,//赔付金额
        }

        //账户信息存档
        async btnBankinfoSave(){
            if(this.PFDetailForm.accountName==''){
                this.$Message.warning('账户名称不可为空');
            }
            else if(this.PFDetailForm.bankAccount==''){
                this.$Message.warning('银行账号不可为空');
            }
            else if(this.PFDetailForm.ddlBankType==null){
                this.$Message.warning('请选择银行别');
            }
            else if(this.PFDetailForm.acountBank==''){
                this.$Message.warning('开户行不可为空');
            }
            else{
                await this.$store.dispatch({
                    type:'rrlkr/getAll',
                    data:this.pagerequest
                }).then(async (res)=>{
                    var exist=res.items.some(i=>{
                        return i.formType==1&&this.PFDetailForm.accountName==i.lkrUser&&this.PFDetailForm.bankAccount==i.lkrAccount&&this.PFDetailForm.acountBank==i.lkrBank;
                    })
                    if(exist){
                        this.$Message.warning('已有该账户信息，请勿重复添加');
                    }else{    
                        var lkr = this.lkrToData();
                        await this.$store.dispatch({
                            type:'rrlkr/create',
                            data:lkr
                        });
                        this.$Message.success('账户信息存档成功！');
                    }
                })
            }
        }
        //获取银行账号开户行
        async GetBankAccountName(data){
            if(data){
                this.PFDetailForm.ddlBankType=0;
                this.PFDetailForm.ddlBankAccount=0;
                this.PFDetailForm.ddlBankName=0;
                this.PFDetailForm.accountName='';
                this.PFDetailForm.bankAccount='';
                if(data.value != null && data.value != 0 && data.value != undefined){
                    this.pagerequest.rrlkrAuto=data.value;
                    await this.$store.dispatch({
                        type:'rrlkr/getAll',
                        data:this.pagerequest
                    }).then(res=>{
                        this.lkrAccountlist = res.items;//账号
                        this.bankNamelist = res.items;//开户行
                    })
                }
                this.PFDetailForm.accountName=data.label;//给账户名称赋值
            }
        }
        //获取银行名称
        async GetBankAccount(data){
            if(data){
                if(data.value != null && data.value != undefined && data.value != 0){
                    this.pagerequest.rrlkrAuto=data.value;
                    await this.$store.dispatch({
                        type:'rrlkr/getAll',
                        data:this.pagerequest
                    }).then(res=>{
                        this.bankNamelist = res.items;//开户行
                    })
                }
                this.PFDetailForm.bankAccount=data.label;//给银行账户赋值
            }
        }
        async GetlkrbankName(data){
            if (data) {
                this.PFDetailForm.acountBank=data.label;//给银行名称赋值
                if(data.value != null && data.value != 0 && data.value !=undefined){
                    var rrlkr=new RRLKR();
                    rrlkr.id=data.value;
                    await this.$store.dispatch({
                        type:'rrlkr/get',
                        data:rrlkr
                    }).then(res=>{
                        this.PFDetailForm.ddlBankType=res.bankType;//银行别
                        this.getBankTypeName(res.bankType);
                    })
                }
            }
        }
        async getBankTypeName(id){
            if(id!=null&&id!=undefined&&id!=0){
                var banktype=new BankType();
                banktype.id=id;
                await this.$store.dispatch({
                    type:'bankType/get',
                    data:banktype
                }).then(res=>{
                    this.PFDetailForm.bankTypeName=res.bankNameT;//银行名称
                })
            }
        }
        lkrToData(){
            var lkr=new RRLKR();
            lkr.formType=1;
            lkr.lkrUser=this.PFDetailForm.accountName;
            lkr.lkrAccount=this.PFDetailForm.bankAccount;
            lkr.lkrBank=this.PFDetailForm.acountBank;
            lkr.bankType=this.PFDetailForm.ddlBankType;
            lkr.cuser=0;
            lkr.cdt=new Date();
            return lkr;
        }
        GetBankTypeName(data){
            this.lkrbanklist=[];
            this.PFDetailForm.txtbankQuery='';
            this.PFDetailForm.acountBank='';
            if(data){
                this.PFDetailForm.bankTypeName=data.label;
            }
        }
        //银行搜索
        GetBankName(data){
            if (data) {
                this.PFDetailForm.txtbankQuery=data.value;
                this.PFDetailForm.acountBank=data.label;
            }
        }
        async GetBank(query){
            this.lkrbanklist=[];
            this.BankLoading=true;
            this.pageBankDetailRequest.keyword=query;
            this.pageBankDetailRequest.bankType=this.PFDetailForm.ddlBankType;
            await this.$store.dispatch({
                type:'bankDetail/getAll',
                data:this.pageBankDetailRequest
            }).then(res=>{
                this.lkrbanklist = res.items
                this.BankLoading=false;
            })
        }
        checkForm={
            accountName:[publicclass.Check.required.text],
            bankAccount:[publicclass.Check.required.text],
            ddlBankType:[publicclass.Check.required.select],
            acountBank:[publicclass.Check.required.text],
            pfAmt:[publicclass.Check.required.number]
        }
    }
</script>