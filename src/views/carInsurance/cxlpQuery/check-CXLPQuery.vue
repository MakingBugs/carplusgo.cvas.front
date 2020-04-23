<template>
    <div>
        <Modal
         :title="L('出险查询')"
         :width="1100"
         :value="value"
         @on-ok="save"
         @on-visible-change="visibleChange"
         fullscreen
        >
            <Form ref="cxlpQueryForm" :label-width="100" :model="cxlpQueryForm">
                <Divider>缺件待补</Divider>
                    <Row v-show="QJDB">
                        <Col span="18">
                            <FormItem label="" prop="chkQJDBMakeFile" style="width: 100%">
                                <CheckboxGroup v-model="cxlpQueryForm.chkQJDBMakeFile">
                                    <Checkbox v-for="item in chkQJDBMakeFileList" :label="item.num" :key="item.num" disabled>{{item.itemName}}</Checkbox>
                                </CheckboxGroup>
                            </FormItem>
                        </Col>
                    </Row>
                    <div v-show="DZFQJDB" style="margin-bottom:20px;">
                        <Row>
                            <Col span="2" style="border:inset 1px">
                                <p style="font-size:16px;text-align:center">对肇方</p>
                            </Col>
                            <Col span="18" style="border:inset 1px">
                                <p style="font-size:16px;text-align:center">选择</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="2" style="border:inset 1px;text-align:center;height:45px">
                                <label style="font-size:16px;">{{DZFName}}</label>
                            </Col>
                            <Col span="18" style="border:inset 1px;height:45px">
                                <CheckboxGroup v-model="cxlpQueryForm.DZFchkQJDBMakeFile" style="text-align:center">
                                    <Checkbox v-for="item in DZFchkQJDBMakeFileList" :label="item.num" :key="item.num" disabled>{{item.itemName}}</Checkbox>
                                </CheckboxGroup>
                            </Col>
                        </Row>
                    </div>
                    <Row>
                        <Col span="24">
                            <FormItem label="备注" prop="txtQuejianRemark" style="width: 100%">
                                <p style="color:blue">{{cxlpQueryForm.txtQuejianRemark}}</p>
                            </FormItem>
                        </Col>
                    </Row>
                <Divider>送件</Divider>
                    <Row>
                        <Col span="6">
                            <FormItem label="送件人" prop="txtSUser" style="width: 100%">
                                <p style="color:blue">{{cxlpQueryForm.txtSUser}}</p>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem label="送件时间" prop="txtSDT" style="width: 100%">
                                <p style="color:blue">{{cxlpQueryForm.txtSDT}}</p>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="送件说明" prop="txtSRemark" style="width: 100%">
                                <p style="color:blue">{{cxlpQueryForm.txtSRemark}}</p>
                            </FormItem>
                        </Col>
                    </Row>
                <Divider>赔付</Divider>
                    <Row style="padding-bottom:20px">
                        <Table v-show="cxlpQueryForm.pfDetail" :columns="PFDetailcolumns" border :data="cxlpQueryForm.dgdPFDetail"></Table>
                    </Row>
                    <Row>
                        <Col span="6">
                            <FormItem label="交强险到账金额" prop="txtInsureDZAmount" style="width: 100%">
                                <p style="color:blue">{{cxlpQueryForm.txtInsureDZAmount}}</p>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem label="交强险到账日期" prop="txtInsureDZDT" style="width: 100%">
                                <p style="color:blue">{{cxlpQueryForm.txtInsureDZDT}}</p>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem label="交强险到账账户" prop="ddlInsureDZAccount" style="width: 100%">
                                <p style="color:blue">{{cxlpQueryForm.ddlInsureDZAccount}}</p>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="6">
                            <FormItem label="商业险到账金额" prop="tztInsureDDZAmount" style="width: 100%">
                                <p style="color:blue">{{cxlpQueryForm.tztInsureDDZAmount}}</p>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem label="商业险到账日期" prop="txtInsureDDZDT" style="width: 100%">
                                <p style="color:blue">{{cxlpQueryForm.txtInsureDDZDT}}</p>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem label="商业险到账账户" prop="ddlInsureDDZAccount" style="width: 100%">
                                <p style="color:blue">{{cxlpQueryForm.ddlInsureDDZAccount}}</p>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="6">
                            <FormItem label="对肇方赔付金额" prop="txtDZFPFAmount" style="width: 100%">
                                <p style="color:blue">{{cxlpQueryForm.txtDZFPFAmount}}</p>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem label="对肇方赔付日期" prop="txtDZFPFDT" style="width: 100%">
                                <p style="color:blue">{{cxlpQueryForm.txtDZFPFDT}}</p>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem label="转付日期" prop="txtZhuanFu" style="width: 100%">
                                <p style="color:blue">{{cxlpQueryForm.txtZhuanFu}}</p>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="18">
                            <FormItem label="赔付备注" prop="txtDZPFRemark" style="width: 100%">
                                <p style="color:blue">{{cxlpQueryForm.txtDZPFRemark}}</p>
                            </FormItem>
                        </Col>
                    </Row>
                <Divider>案件补充说明</Divider>
                    <Row>
                        <Table v-show="cxlpQueryForm.supplement" :columns="Supplementcolumns" border :data="dgdSupplement"></Table>
                    </Row>
            </Form>
            <div slot="footer">
                <Button @click="save" type="primary">{{L('OK')}}</Button>
            </div>
            <Spin size="large" fix v-if="spinShow"></Spin>
        </Modal>
    </div>
</template>
<script lang="ts">
import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
import Util from '@/lib/util'
import AbpBase from '@/lib/abpbase'
import PageRequest from '@/store/entities/page-request'

class PageItemCodeRequest extends PageRequest{
    maxResultCount=10000
    skipCount=0
    itemTypes:Array<number>
}
class PageCXLPDZFRequest extends PageRequest{//对肇方
    maxResultCount=10000
    skipCount=0
    cxlpAuto:any=0;
}
class PageCXLPSupplementRequest extends PageRequest{//案件补充
    maxResultCount=10000
    skipCount=0
    cxlpAuto:any=0;
}

@Component({
    components:{}
})
export default class CheckCXLPQuery extends AbpBase{
    @Prop({type:Boolean,default:false}) value:boolean;
    pageItemCodeRequest:PageItemCodeRequest=new PageItemCodeRequest();//类别明细
    pageCXLPDZFRequest:PageCXLPDZFRequest=new PageCXLPDZFRequest();//对肇方
    pageCXLPSupplementRequest:PageCXLPSupplementRequest=new PageCXLPSupplementRequest();//案件补充
    spinShow=true;//模态框加载动画
    QJDBMakeFile:any=[];//缺件待补列表
    dgdPFDetail:any=[];//赔付明细列表
    dgdSupplement:any=[];//缺件待补列表
    DZFQJDB:boolean=false;//对肇方缺件待补
    DZFName:any='';//对肇方第几方
    Index=null;
    DZFQJDBFile:any='';//对肇方缺件待补
    QJDB:boolean=false;
    save(){
        (this.$refs.cxlpQueryForm as any).resetFields();
        this.$emit('input',false);
    }
    async visibleChange(value:boolean){
        if(!value){
            this.$emit('input',value);
        }else{
            this.getList();
        }
    }
    
    get chkQJDBMakeFileList(){//缺件待补
        return this.QJDBMakeFile;
    }
    get DZFchkQJDBMakeFileList(){//对肇方缺件待补
        return this.QJDBMakeFile;
    }
    async getList(){
        //缺件待补
        this.pageItemCodeRequest.itemTypes = [859];
        await this.$store.dispatch({
            type:'itemCode/GetItemCodeByItemTypes',
            data:this.pageItemCodeRequest
        }).then(res=>{
            this.QJDBMakeFile = res.items
        })
    }
    
    //材料提交赋值到页面
    getCLTJToCXLP(allvalue){
        var svaluelist=[];
        for (let i = 0; i < this.QJDBMakeFile.length; i++) {
            const svalue = this.QJDBMakeFile[i].num;
            if ((allvalue & svalue) == svalue){//获取提交材料值的总和里面包括的哪些材料
                svaluelist.push(svalue);
            }
        }
        return svaluelist;
    }
    //赔付明细
    PFDetailcolumns=[{
                title:'账户名称',
                key:'accountName',
                width:170,
                tooltip:true,
                align:'center'
            },{
                title:'开户行',
                key:'acountBank',
                width:170,
                tooltip:true,
                align:'center'
            },{
                title:'银行账户',
                key:'bankAccount',
                width:170,
                tooltip:true,
                align:'center'
            },{
                title:'赔付金额',
                key:'pfAmt',
                width:170,
                tooltip:true,
                align:'center'
            },{
                title:'银行别',
                key:'bankTypeName',
                width:170,
                tooltip:true,
                align:'center'
            }];
    //案件补充明细
    Supplementcolumns=[{
                title:'补充说明内容',
                key:'supplementContent',
                tooltip:true,
                align:'center'
            },{
                title:'承办人',
                tooltip:true,
                align:'center',
                render:(h:any,params:any)=>{
                    return h('span',params.row.contractorsItemCode==null?'':params.row.contractorsItemCode.itemName)
                }
            }];
    cxlpQueryForm={
        id:0,
        chkQJDBMakeFile:[],//缺件待补
        DZFchkQJDBMakeFile:[],//对肇方缺件待补
        txtQuejianRemark:'',//备注
        txtSUser:'',//送件人
        txtSDT:'',//送件时间
        txtSRemark:'',//送件说明
        txtInsureDZAmount:0,//交强险到账金额
        txtInsureDZDT:'',//交强险到账日期
        ddlInsureDZAccount:'',//交强险到账账户
        tztInsureDDZAmount:0,//商业险到账金额
        txtInsureDDZDT:'',//商业险到账日期
        ddlInsureDDZAccount:'',//商业险到账账户
        txtDZFPFAmount:0,//对肇方赔付金额
        txtDZFPFDT:'',//对肇方赔付日期
        txtZhuanFu:'',//转付日期
        txtDZPFRemark:'',//赔付备注

        pfDetail:false,//赔付明细
        supplement:false,//案件补充
    }
    //获取对肇方明细
    async getDZFDetail(id){
        this.pageCXLPDZFRequest.cxlpAuto=id;
        await this.$store.dispatch({
            type:'cxlpDZF/getAll',
            data:this.pageCXLPDZFRequest
        }).then(res=>{
            if(res.items.length>0){
                var a = res.items.map(i=>{
                    if(i.dzfTypeItemCode!=null){
                        this.DZFName=i.dzfTypeItemCode.itemName;
                    }
                    this.DZFQJDBFile=i.qjdbfile;//缺件待补
                })
                this.DZFQJDB=true;
            }else{
                this.DZFQJDB=false;
            }
        })
    }
    //选中数据获取案件补充明细
    async getSupplementDetail(id){
        this.pageCXLPSupplementRequest.cxlpAuto=id;
        await this.$store.dispatch({
            type:'cxlpSupplement/getAll',
            data:this.pageCXLPSupplementRequest
        }).then(res=>{
            if(res.items.length>0){
                this.dgdSupplement=res.items;
                this.cxlpQueryForm.supplement=true;
            }else{
                this.cxlpQueryForm.supplement=false;
            }
        })
    }
    /**填充数据 */
     async SetData(data,index){
        this.spinShow=true;
        this.Index=index;
        this.cxlpQueryForm=data;
        await this.ToData(data);//赋值
        this.spinShow=false;
    }
    //获取到账账户
    async getAccountName(insureDZAccount,insureDDZAccount){
        this.pageItemCodeRequest.itemTypes = [869];
        await this.$store.dispatch({
            type:'itemCode/GetItemCodeByItemTypes',
            data:this.pageItemCodeRequest
        }).then(res=>{
            if(res.items.length>0){
                res.items.map(i=>{
                    if(i.num==insureDZAccount){
                        this.cxlpQueryForm.ddlInsureDZAccount=i.itemName;//交强险到账账户
                    }
                    if(i.num==insureDDZAccount){
                        this.cxlpQueryForm.ddlInsureDDZAccount=i.itemName;//商业险到账账户
                    }
                })
            }
        })
    }
    //赋值
    async ToData(data){
        this.cxlpQueryForm.id=data.id;
        await this.getDZFDetail(data.id);//获取对肇方明细
        await this.getAccountName(data.insureDZAccount,data.insureDDZAccount);//获取到账账户
        this.cxlpQueryForm.chkQJDBMakeFile=this.getCLTJToCXLP(data.qjdbFile);//缺件待补
        if(this.cxlpQueryForm.chkQJDBMakeFile.length>0){
            this.QJDB=true;
        }else{
            this.QJDB=false;
        }
        this.cxlpQueryForm.DZFchkQJDBMakeFile=this.getCLTJToCXLP(this.DZFQJDBFile);//对肇方缺件待补
        this.cxlpQueryForm.txtQuejianRemark=data.qjdbRemark;//备注
        this.cxlpQueryForm.txtSUser=data.sUser;//送件人
        if(data.sdt!=null){
            this.cxlpQueryForm.txtSDT=new Date(data.sdt).toLocaleDateString();//送件时间
        }
        this.cxlpQueryForm.txtSRemark=data.sRemark;//送件说明
        this.cxlpQueryForm.txtInsureDZAmount=data.insureDZAmount;//交强险到账金额
        if(data.insureDZDT!=null){
            this.cxlpQueryForm.txtInsureDZDT=new Date(data.insureDZDT).toLocaleDateString();//交强险到账日期
        }
        this.cxlpQueryForm.tztInsureDDZAmount=data.insureDDZAmount;//商业险到账金额
        if(data.insureDDZDT!=null){
            this.cxlpQueryForm.txtInsureDDZDT=new Date(data.insureDDZDT).toLocaleDateString();//商业险到账日期
        }
        this.cxlpQueryForm.txtDZFPFAmount=data.dzfpfAmount;//对肇方赔付金额
        if(data.dzfpfdt!=null){
            this.cxlpQueryForm.txtDZFPFDT=new Date(data.dzfpfdt).toLocaleDateString();//对肇方赔付日期
        }
        if(data.zhuanFuDT!=null){
            this.cxlpQueryForm.txtZhuanFu=new Date(data.zhuanFuDT).toLocaleDateString();//转付日期
        }
        this.cxlpQueryForm.txtDZPFRemark=data.dzpfRemark;//赔付备注
        //案件补充说明
        await this.getSupplementDetail(data.id);
    }
}
</script>