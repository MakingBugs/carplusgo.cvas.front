<template>
    <div>
        <Modal
         :title="L('维修输入')"
         :value="value" 
         :width="1200"
         :information="information"
         :carType="carType"
         @on-ok="save"
         @on-visible-change="visibleChange"
         fullscreen
        >
            <Form ref="carFixForm" :rules="checkform" :model="Form1" :label-width="100">
               <Divider>车辆信息</Divider>
                <Row>
                    <Col span="6">
                        <FormItem :label="L('车牌号码')" style="width:100%" prop="makNo">
                            <Input v-model="Form1.makNo" :maxlength="50" readonly/>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label="L('厂牌')" style="width:100%" prop="brandName">
                            <p style="color:blue">{{Form1.brandName}}</p>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label="L('车型')" style="width:100%" prop="clasenName">
                            <p style="color:blue">{{Form1.clasenName}}</p>
                        </FormItem>
                    </Col>
                    <!-- <Col span="6">
                        <FormItem :label="L('契约编号')" style="width:100%" prop="orderNo">
                            <p style="color:blue">{{Form1.orderNo}}</p>
                        </FormItem>
                    </Col> -->
                </Row>
                <Row>
                    <Col span="6">
                        <FormItem :label="L('变速类型')" style="width:100%" prop="BSType">
                            <p style="color:blue">{{Form1.BSType}}</p>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label="L('车架号')" style="width:100%" prop="carNo">
                            <p style="color:blue">{{Form1.carNo}}</p>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label="L('发动机号码')" style="width:100%" prop="engNo">
                            <p style="color:blue">{{Form1.engNo}}</p>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label="L('使用性质')" style="width:100%" prop="useType">
                            <p style="color:blue">{{Form1.useType}}</p>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                     <Col span="6">
                        <FormItem :label="L('颜色')" style="width:100%" prop="carColor">
                            <p style="color:blue">{{Form1.carColor}}</p>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label="L('登记日期')" style="width:100%" prop="linceDT">
                            <p style="color:blue">{{Form1.linceDT}}</p>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label="L('交修日期')" style="width:100%" prop="fixDT">
                            <DatePicker v-model="Form1.fixDT" type="date" style="width: 100%" readonly></DatePicker>
                        </FormItem>
                    </Col>
                     <Col span="6">
                        <FormItem :label="L('预计完修日')" style="width:100%" prop="fixDTPre">
                            <DatePicker v-model="Form1.fixDTPre" type="date" style="width: 100%" readonly></DatePicker>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                     <Col span="6">
                        <FormItem :label="L('实际完修日')" style="width:100%" prop="fixDTReal">
                            <DatePicker v-model="Form1.fixDTReal" type="date" style="width: 100%"></DatePicker>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label="L('交修人')" style="width:100%" prop="custName">
                            <Input v-model="Form1.custName" style="width:100%" :maxlength="50" readonly/>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label="L('联系电话')" style="width:100%" prop="contactNumber">
                            <p style="color:blue">{{Form1.contactNumber}}</p>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                     <Col span="6">
                        <FormItem :label="L('维修里程')" style="width:100%" prop="KM">
                            <InputNumber v-model="Form1.KM" :min="0" style="width:90%"></InputNumber>&nbsp;Km
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label="L('维修类别')" style="width:100%" prop="fixType">
                            <Select :placeholder="L('Select')" v-model="Form1.fixType" disabled>
                                <Option v-for="item in fixTypeList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label="L('下次保养里程')" style="width:100%" prop="nextMaintainKM">
                            <Input v-model="Form1.nextMaintainKM" :min="0" style="width:90%"/>&nbsp;Km
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label="L('下次保养日期')" style="width:100%" prop="nextMaintainDT">
                            <DatePicker v-model="Form1.nextMaintainDT" type="date" style="width:100%"></DatePicker>
                        </FormItem>
                    </Col>
                </Row>
               <Divider>承租信息</Divider>
                <!-- <Row>
                     <Col span="6">
                        <FormItem :label="L('客户名称')" style="width:100%" prop="customerName">
                            <p style="color:blue">{{Form1.customerName}}</p>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label="L('已收费用')" style="width:100%" prop="carMtnAmt">
                            <p style="color:blue">{{Form1.carMtnAmt}}</p>
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
                </Row> -->
                <!-- <Row>
                     <Col span="6">
                        <FormItem :label="L('轮胎使用/额度')" style="width:100%">
                            <p style="color:blue">{{Form1.useWhiel}}</p>/<p style="color:blue">{{Form1.Whiel}}</p>
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
                </Row>
                <Row>
                    <Col span="6">
                        <FormItem :label="L('是否含代步')" style="width:100%" prop="isDB">
                            <p style="color:blue">{{Form1.isDB}}</p>
                        </FormItem>
                    </Col> 
                </Row> -->
                <Row>
                    <Col span="6">
                        <FormItem :label="L('付款周期')" style="width:100%" prop="payMode">
                            <Select :placeholder="L('Select')" v-model="Form1.payMode" disabled>
                                <Option v-for="item in payModeList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label="L('维修厂商')" style="width:100%" prop="suppliers">
                            <Select :placeholder="L('Select')" v-model="Form1.suppliers" disabled>
                                <Option v-for="item in supplierList" :value="item.id" :key="item.id">{{ item.fname }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="6" style="margin-left: 8px">
                        <p>折扣：工时<label style="color:blue">{{WHDiscount}}</label>材料<label style="color:blue">{{itemDiscount}}</label>
                        每<label style="color:blue">{{sPayDT}}</label>日付款，<label style="color:blue">{{sPayDay}}</label>天付一次
                        <!-- 联络人<label style="color:blue">{{Form1.title}}</label>电话<label style="color:blue">{{Form1.tel}}</label> -->
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col span="6">
                        <FormItem :label="L('折扣')" style="width:100%">
                            工时<label style="color:blue">{{wHDisAmount}}</label>
                            材料<label style="color:blue">{{Form1.itemDisAmount}}</label>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label="L('维修状态')" style="width:100%" prop="cstatus">
                           <label style="color:blue">{{cstatus}}</label>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label="L('工单号码')" style="width:100%" prop="carFixNo">
                           <Input v-model="Form1.carFixNo" :maxlength="50"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="6">
                        <FormItem :label="L('工时费')" style="width:100%" prop="wHAmount">
                            <Input v-model="Form1.wHAmount" :maxlength="50" @on-blur="wHAmountChange"/>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label="L('材料费')" style="width:100%" prop="itemAmount">
                           <label>{{Form1.itemAmount}}</label>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label="L('实付金额')" style="width:100%" prop="realAmount">
                           <Input v-model="Form1.realAmount" :maxlength="50" readonly/>
                        </FormItem>
                    </Col>
                </Row>
               <Divider>车身内部</Divider>
                <Row>
                    <Col>
                    <FormItem :label="L('车身内部')" style="width:100%" prop="carbody">
                        <CheckboxGroup v-model="Form1.carbody">
                            <Checkbox label="1" disabled>引擎系统</Checkbox>
                            <Checkbox label="2" disabled>底盘系统</Checkbox>
                            <Checkbox label="3" disabled>电器系统</Checkbox>
                            <Checkbox label="4" disabled>空调系统</Checkbox>
                            <Checkbox label="5" disabled>车内装潢</Checkbox>
                            <Checkbox label="6" disabled>车身外部</Checkbox>
                        </CheckboxGroup>
                    </FormItem>
                    </Col>
                </Row>
               <Divider>送修问题</Divider>
                <Row>
                    <Col span="24">
                        <FormItem :label="L('送修问题')" style="width:100%" prop="repairProblem">   
                            <label style="color:blue">{{Form1.repairProblem}}</label>
                        </FormItem>
                    </Col>
                </Row>
               <Divider>附件</Divider>
                <Row>
                    <Col span="18">
                        <FormItem label="附件" style="width:100%">   
                            <Table :columns="Filecolumns" border :data="carRepairFilelist"></Table>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="18">
                    <FormItem label="备注" style="width:100%" prop="remark">
                        <Input v-model="Form1.remark" type="textarea" :autosize="{minRows: 3,maxRows: 5}"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <!-- <Row>
                    <Col span="24">
                    <FormItem :label="L('维修费')" style="width:100%">
                        <p style="color:blue">计价里程<label style="color:red">{{Form1.rateKM}}</label>公里，合约<Input v-model="Form1.linceKM" style="width:10%" :maxlength="50" readonly/>公里，
                        月维修费<label style="color:red">{{Form1.orderCarMtnAmt}}</label>，换轮胎<Input v-model="Form1.txtWhiel" style="width:10%" :maxlength="50" readonly/>条，
                        超里程<Input v-model="Form1.overKM" style="width:10%" :maxlength="50" readonly/>元/公里，
                        <Select :placeholder="L('Select')" v-model="Form1.overKMPayType" style="width:20%" disabled>
                            <Option v-for="item in overKMPayTypeList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                        </Select>结算。</p>
                    </FormItem>
                    </Col>
                </Row> -->
               <Divider>维修明细</Divider>
                <Row v-show="repairlist">
                    <Col style="margin-left: 100px">
                        <Table :columns="repairDetailcolumns" border style="width:100%" :data="repairDetaillist"></Table>
                    </Col>
                </Row>
                <Row style="margin-top: 15px"> 
                    <Col span="6">
                    <FormItem :label="L('零件名称')" style="width:100%" prop="itemNameType">
                        <Select :placeholder="L('Select')" v-model="CarFixItemForm.itemNameType" @on-change="partname">
                            <Option v-for="item in carFixItemList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label="L('')" style="width:100%" prop="itemName">
                            <Input v-model="CarFixItemForm.itemName" style="margin-left:-85px;width:90%" :placeholder="L('请输入...')" :maxlength="50"/>
                            <Button type="primary" @click="peijianselect" ghost style="margin-left: 10px">配件搜索</Button>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="18">
                        <FormItem :label="L('数量')" style="width:100%">
                            <Select :placeholder="L('Select')" v-model="CarFixItemForm.itemCount" style="width:20%">
                                <Option v-for="item in caritemCountList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                            </Select>
                            单价<Input v-model="CarFixItemForm.itemAmount" style="width:20%" :maxlength="50"/>
                            材料类别
                            <Select :placeholder="L('Select')" v-model="CarFixItemForm.itemType" style="width:20%">
                                <Option v-for="item in caritemTypeList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                            </Select>
                            备注<Input v-model="CarFixItemForm.memo" style="width:20%" :maxlength="200"/>
                        </FormItem>
                     </Col>
                     <Col span="6">
                        <span v-show="addbut"><Button type="error" @click="carfixadddetail" ghost style="margin-left: 90px">明细新增</Button></span>
                        <span v-show="editbut"><Button type="error" @click="carfixeditdetail" ghost style="margin-left: 90px">明细修改</Button></span>
                     </Col>
                </Row>
               <Divider>发票明细</Divider>
                <Row v-show="Invlist">
                    <Col>
                        <Table :columns="InvDetailcolumns" border :no-data-text="L('NoDatas')" style="width:100%" :data="InvDetaillist"></Table>
                    </Col>
                </Row>
                <Row style="margin-top: 20px">
                    <Col span="6">
                        <FormItem :label="L('发票代码')" style="width:100%" prop="invCode">
                            <Input v-model="PRInvForm.invCode" :maxlength="50"/>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label="L('发票金额')" style="width:100%" prop="amount">
                            <Input v-model="PRInvForm.amount" :maxlength="50" @on-blur="amountChange"/>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label="L('发票日期')" style="width:100%" prop="invDt">
                            <DatePicker v-model="PRInvForm.invDt" type="date" style="width:100%"></DatePicker>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="6">
                        <FormItem :label="L('发票号码')" style="width:100%" prop="invNo">
                            <Input v-model="PRInvForm.invNo" :maxlength="50"/>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label="L('发票实付')" style="width:100%" prop="invRealAmt">
                            <Input v-model="PRInvForm.invRealAmt" :maxlength="50"/>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label="L('发票类别')" style="width:100%" prop="invType">
                            <Select :placeholder="L('Select')" v-model="PRInvForm.invType">
                                <Option value="0">请选择</Option>
                                <Option value="1">普票</Option>
                                <Option value="2">增票</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="6">
                        <FormItem :label="L('公司别')" style="width:100%" prop="ddlinc">
                            <Select :placeholder="L('Select')" v-model="PRInvForm.ddlinc" disabled>
                                <Option v-for="item in ddlincList" :value="item.id" :key="item.id">{{ item.sname }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label="L('保养厂')">
                            <Select :placeholder="L('Select')" v-model="PRInvForm.prSupplier" style="width:100%">
                                <Option v-for="item in prSupplierList" :value="item.id" :key="item.id">{{ item.fname }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem :label="L('')" style="width:100%;margin-left:-85px" prop="txtprSupplier">
                            <Input v-model="PRInvForm.txtprSupplier" style="width:40%" :maxlength="50"/>
                            <Button type="primary" @click="prSupplierCheck" ghost style="margin-left: 10px">搜寻</Button>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem :label="L('收款人')" style="width:100%" prop="accountName">
                            <Input v-model="PRInvForm.accountName" :maxlength="50" style="width:45%"/>
                            <Button type="primary" @click="PayeeCheck" ghost style="margin-left: 10px">收款人搜索</Button>
                        </FormItem>
                    </Col>
                </Row>
                <Row v-show="zjpayeelist">
                    <Col style="margin-left: 100px">
                        <Table :columns="Payeecolumns" border style="width:100%" :data="Payeelist"></Table>
                    </Col>
                </Row>
                <Row style="margin-top: 20px">
                    <Col span="6">
                        <FormItem :label="L('账号')" style="width:100%" prop="bankAccount">
                            <Input v-model="PRInvForm.bankAccount" :maxlength="50"/>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <Button v-show="invadd" type="error" @click="InvSave" ghost style="margin-left: 600px">发票存档</Button>
                        <Button v-show="invedit" type="error" @click="InvEditSave" ghost style="margin-left: 600px">发票修改</Button>
                    </Col>
                </Row>
                <Row>
                    <Col span="6">
                        <FormItem :label="L('银行别')" style="width:100%" prop="bankType">
                            <Select :placeholder="L('Select')" v-model="PRInvForm.bankType">
                                <Option v-for="item in bankNameList" :value="item.id" :key="item.id">{{ item.bankNameT }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem :label="L('')" style="width:100%" prop="txtBankQuery">
                            <Input v-model="PRInvForm.txtBankQuery" style="margin-left: -85px;width:50%" :maxlength="50"/>
                            <Button type="primary" @click="BankCheck" ghost style="margin-left: 10px">银行搜寻</Button>
                        </FormItem>
                    </Col>
                </Row>
                <Row v-show="bankchklist" style="margin-bottom:20px;">
                    <Col span="12" style="margin-left: 100px">
                        <Table :columns="Bankcolumns" border :no-data-text="L('NoDatas')" :data="banklist"></Table>
                    </Col>
                </Row>
                <Row>
                    <Col span="6">
                        <FormItem :label="L('开户行')" style="width:100%" prop="accountBank">
                            <Input v-model="PRInvForm.accountBank" :maxlength="50" style="width:100%" readonly/>
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
    </div>
</template>
<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '../../../lib/util'
    import AbpBase from '../../../lib/abpbase'
    import PageRequest from '@/store/entities/page-request'
    import CarFix from '@/store/entities/carfix/carFix';
    import publicclass from '../../../lib/publicclass';
    import CarFixItem from '../../../store/entities/carfix/carFixItem';
    import PRInvLinK from '../../../store/entities/public/prinvLink';
    import PRInv from '../../../store/entities/public/prinv';
    import CarRepair from '../../../store/entities/carfix/carRepair';
    import Inc from '../../../store/entities/public/inc';
    import Supplier from '../../../store/entities/public/supplier';
    import BankType from '../../../store/entities/public/bankType';
    import CarBase from '../../../store/entities/car/carbase';

    class PageItemCodeRequest extends PageRequest{
        maxResultCount=10000
        skipCount=0
        itemTypes:Array<number>
        itemName:string=''
    }
    class PageSupplierRequest extends PageRequest{//厂商
        maxResultCount=10000
        skipCount=0
        supplierTypes:Array<number>;
        supplierAuto:number=null;
        key:string=null;
    }
    class PageIncRequest extends PageRequest{//公司别
        keyword:string='';
        from:Date;
        to:Date;
    }
    class PageBankTypeRequest extends PageRequest{//银行别
        keyword:string='';
        from:Date;
        to:Date;
    }
    class PageBankDetailRequest extends PageRequest{//银行明细
        maxResultCount=10000
        skipCount=0
        keyword:string='';
        bankType:number=0;
    }
    class PageCarFixItemRequest extends PageRequest{//维修明细
        maxResultCount=10000
        skipCount=0
        carFixAuto:number=0;
    }
    class PageLKRTotalRequest extends PageRequest{//收款人
        maxResultCount=10000
        skipCount=0
        lkrName:string=''
    }
    class PageCarBaseRequest extends PageRequest{//车籍
        maxResultCount=10000
        skipCount=0
        makNo:string;
    }
    class PageBrandRequest extends PageRequest{//厂牌
        maxResultCount=10000
        skipCount=0
    }
    class PageClasenRequest extends PageRequest{//车型
        maxResultCount=10000
        skipCount=0
    }
    class PagePRInvRequest extends PageRequest{//维修记录和发票关联档
        maxResultCount=10000
        skipCount=0
        prinvLinkAuto:number=0;
    }
    class PageFileUploadRequest extends PageRequest{
        maxResultCount=10000
        skipCount=0
        docPostID:number=0;
    }
    class PagePRInvLinkRequest extends PageRequest{//维修记录和发票关联档
        maxResultCount=10000
        skipCount=0
        sourceAuto:number=0;
    }

    @Component
    export default class EditCarFix extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        @Prop({type:Object,default:null}) information:any;
        @Prop({type:Number,default:null}) carType:number;
        carFix:CarFix=new CarFix();
        pageItemCodeRequest:PageItemCodeRequest=new PageItemCodeRequest();
        pageSupplierRequest:PageSupplierRequest=new PageSupplierRequest();//厂商
        pageIncRequest:PageIncRequest=new PageIncRequest();//公司别
        pageBankTypeRequest:PageBankTypeRequest=new PageBankTypeRequest();//银行别
        pageBankDetailRequest:PageBankDetailRequest=new PageBankDetailRequest();//银行明细
        pageCarFixItemRequest:PageCarFixItemRequest=new PageCarFixItemRequest();//维修明细
        pageLKRTotalRequest:PageLKRTotalRequest=new PageLKRTotalRequest();//收款人
        pageCarBaseRequest:PageCarBaseRequest = new PageCarBaseRequest();//车籍
        pageBrandRequest:PageBrandRequest=new PageBrandRequest();//厂牌
        pageClasenRequest:PageClasenRequest=new PageClasenRequest();//车型
        pagePRInvRequest:PagePRInvRequest = new PagePRInvRequest();//
        pagePRInvLinkRequest:PagePRInvLinkRequest = new PagePRInvLinkRequest();//维修记录和发票关联档
        pageFileUploadRequest:PageFileUploadRequest = new PageFileUploadRequest();//附件
       //自定义变量数组
        itemCodeTypelist:any=null;//交修类别
        itemCodepayMode:any=null;//付款周期
        itemCodeOverKM:any=null;//超里程结算
        supplierselect:any=null;//维修厂商
        prsupplierselect:any=null;//保养厂
        incType:any=null;//公司别
        carFixItemName:any=null;//零件名称
        numlist:any=null;//数量
        CLitemTypelist:any=null;//材料类别
        BankTypelist:any=null;//银行
        WHDiscount:any="";//工时
        itemDiscount:any="";//材料
        sPayDT:any="";//付款天
        sPayDay:any="";//付款日
        carFixAuto:number=0;
        PRInvLinkAuto:number=0;
        PRInvAuto:number=0;
        CarFixItemAuto:number=0;
        RealAmount:number=0;//发票总金额
        MaterialsAmount:number=0;//材料费
        //配件明细新增or修改
        addbut:boolean=true;
        editbut:boolean=false;
        //维修明细列表修改时的下标
        editnewindex:number=null;
        //发票新增or修改
        invadd:boolean=true;
        invedit:boolean=false;
        //发票明细列表修改时的下标
        editnewinvindex:number=null;
        banklist:any=[];//银行明细
        clasenlist:any=[];//车型list
        brandNamelist:any=[];//厂牌list
        bsTypelist:any=[];//变速类型list
        useTypelist:any=[];//使用性质list
        repairDetaillist:any=[]; //维修明细list
        InvDetaillist:any=[];//发票明细list
        carRepairList:any=[];
        Payeelist:any=[];//收款人明细
        PRInvList:any=[];//发票明细列表数组
        wHDisAmount:any=0;//折扣工时
        cstatus:any="";//维修状态
        CFIDelId:any=[];
        spinShow=true;//加载动画
        carRepairFilelist:any=[]
        listfile:any=[]

        /**---------v-show显示隐藏---------- */
            repairlist:any=false//维修明细
            Invlist:any=false//发票明细
            zjpayeelist:any=false//收款人显示明细
            bankchklist:any=false//银行显示明细

        
       //
        save(){
            (this.$refs.carFixForm as any).validate(async (valid:boolean)=>{
                if(valid){
                    if(this.Form1.carFixAuto==0||this.Form1.carFixAuto==null||this.Form1.carFixAuto==undefined){
                        //维修新增
                        var request=this.carFixtoData(this.Form1);
                        await this.$store.dispatch({
                            type:'carFix/create',
                            data:request
                        }).then(res=>{
                            this.carFixAuto=res.id;
                            this.AddFun();
                        })
                    }
                    else{//维修修改
                        if(this.information.status!=0 && this.information.status!=5){//如果状态不是暂存和驳回
                            this.$Message.warning('非暂存和驳回状态不可修改');
                        }
                        else if(this.information.status==0||this.information.status==5){
                            var Request=this.carFixtoData(this.Form1);//赋值
                            await this.$store.dispatch({
                                type:'carFix/update',
                                data:Request
                            }).then(res=>{
                                //维修配件
                                if(this.repairDetaillist.length>0){
                                    this.repairDetaillist.forEach(async (x) =>{
                                        if(x.id==0){//新增
                                            await this.CreateCarFixItem(x)
                                        }   
                                        else{//修改
                                            await this.UpdateCarFixItem(x)
                                        }
                                    })
                                    //删除维修配件
                                    this.DeleteCarFixItem();
                                }
                                //修改发票明细
                                if(this.InvDetaillist.length>0){
                                    this.InvDetaillist.forEach(async (x) =>{
                                        if(x.id==0){//新增
                                            await this.CreatePRInv(x)
                                        }
                                        else{//修改
                                            await this.UpdatePRInv(x);
                                        }
                                    })
                                }
                                //修改车籍
                                this.updateCarBase();
                                this.$Message.success('修改维修成功！');
                            })
                        }
                    }
                    this.$emit('save-success');
                    this.$emit('input',false);
                    this.clearForm();//清空表单
                    this.clearInv();//清空发票
                    this.clearcarFixDetail();//清空维修配件
                    (this.$refs.carFixForm as any).resetFields();
                }
            })
        }
        //新增操作
         async AddFun(){
            //新增维修明细
            if(this.repairDetaillist.length>0){
                this.repairDetaillist.forEach(async (x) =>{
                    await this.CreateCarFixItem(x)
                })
            }
            //新增发票
            if(this.InvDetaillist.length>0){
                this.InvDetaillist.forEach(async (x) =>{
                    await this.CreatePRInv(x)
                })
            }
            //修改交修表CarFixType
            await this.UpdateCarRepair();
            this.$Message.success('新增维修成功！');
         }
        cancel(){
            (this.$refs.carFixForm as any).resetFields();
            this.$emit('input',false);
            this.clearForm();//清空表单
            this.clearInv();//清空发票
            this.clearcarFixDetail();//清空维修配件
        }
        async visibleChange(value:boolean){
            this.spinShow=true;//加载动画
            if(!value){
                (this.$refs.carFixForm as any).resetFields();
                this.$emit('input',value);
                this.clearForm();//清空表单
                this.clearInv();//清空发票
                this.clearcarFixDetail();//清空维修配件
            }else{
                await this.getList();
                this.Form1=Util.extend(true,{},this.information);
                if(this.carType==0){//交修
                    await this.carRepairbestowData();//交修赋值
                }
                if(this.carType==1){//维修
                    await this.carFixbestowData();//维修赋值
                }
                this.spinShow=false;//加载动画
            }
        }
       //下拉框 
        get fixTypeList(){//交修类别 501
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
        get carFixItemList(){//维修零件名称
            return this.carFixItemName;
        }
        get caritemCountList(){//数量
            return this.numlist;
        }
        get caritemTypeList(){//材料类别
            return this.CLitemTypelist;
        }
        get ddlincList(){//公司别
            return this.incType;
        }
        get prSupplierList(){//保养厂
            return this.prsupplierselect;
        }
        get bankNameList(){//开户行
            return this.BankTypelist;
        }
       async getList(){
           this.supplierselect=[];
           this.prsupplierselect=[];
            /**交修类别 */
            this.pageItemCodeRequest.itemTypes = [501];
            this.itemCodeTypelist=(await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            })).items
            /**付款周期 */
            this.pageItemCodeRequest.itemTypes = [123];
            this.itemCodepayMode=(await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            })).items
            /**超里程结算 */
            this.pageItemCodeRequest.itemTypes = [317];
            this.itemCodeOverKM=(await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            })).items
            /**零件名称 */
            this.pageItemCodeRequest.itemTypes = [238];
            this.carFixItemName=(await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            })).items
            /**数量 */
            this.pageItemCodeRequest.itemTypes = [510];
            this.numlist=(await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            })).items
            /**材料类别 */
            this.pageItemCodeRequest.itemTypes = [511];
            this.CLitemTypelist=(await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            })).items
            /**厂商 */
            this.pageSupplierRequest.supplierTypes=[2,3,4,6];
            this.pageSupplierRequest.supplierAuto=null;
            this.pageSupplierRequest.key=null;
            await this.$store.dispatch({
                type:'supplier/getAll',
                data:this.pageSupplierRequest
            }).then(res=>{
                this.supplierselect=res.items//维修厂商
                this.prsupplierselect=res.items//保养厂商
            })
            /**公司别 */
            this.pageIncRequest.maxResultCount=10000;
            this.pageIncRequest.skipCount=0;
            this.incType=(await this.$store.dispatch({
                type:'inc/getAll',
                data:this.pageIncRequest
            })).items
            this.PRInvForm.ddlinc=1;//默认值是格上出行
            /**银行别 */
            this.pageBankTypeRequest.maxResultCount=10000;
            this.pageBankTypeRequest.skipCount=0;
            this.BankTypelist=(await this.$store.dispatch({
                type:'bankType/getAll',
                data:this.pageBankTypeRequest
            })).items
            //车型
            await this.$store.dispatch({
                type:'clasen/GetAll',
                data:this.pageClasenRequest
            }).then(res=>{
                this.clasenlist=res.items;
            })
            //厂牌
            await this.$store.dispatch({
                type:'brand/GetAll',
                data:this.pageBrandRequest
            }).then(res=>{
                this.brandNamelist=res.items
            })
            //变速类型
            this.pageItemCodeRequest.itemTypes = [841];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                this.bsTypelist=res.items;
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
/**--------------自定义Form-------------- */
        //维修配件明细Form
         CarFixItemForm={
            itemNameType:"",//零件名称
            itemName:"",//零件名称输入框
            itemCount:0,//数量
            itemAmount:"",//单价
            itemType:"",//材料类别
            memo:"",//备注
            seq:0,
            id:0
         }
        //发票明细Form
         PRInvForm={
            id:0,
            invCode:"",//发票代码
            invNo:"",//发票号码
            invDt:"",//发票日期
            amount:"",//发票金额
            invRealAmt:"",//发票实付金额
            invType:'0',//发票类别
            bankType:0,//银行别
            bankNameT:'',//银行别
            accountBank:'',//开户行
            prSupplier:0,//保养厂
            prSupplierN:"",//保养厂
            accountName:"",//收款人
            ddlinc:1,//公司别
            incName:'',//公司别
            bankAccount:"",//账号
            txtBankQuery:'',//银行搜索
            txtprSupplier:"",//保养厂搜索框
         }
        //自定义数组
         PRInvFormNew={
            id:0,
            invCode:"",//发票代码
            invNo:"",//发票号码
            invDt:"",//发票日期
            amount:"",//发票金额
            invRealAmt:"",//发票实付金额
            invType:'0',//发票类别
            bankType:0,//银行别
            bankNameT:'',//银行别
            accountBank:'',//开户行
            prSupplier:0,//保养厂
            prSupplierN:"",//保养厂
            accountName:"",//收款人
            ddlinc:1,//公司别
            incName:'',//公司别
            bankAccount:"",//账号
            txtBankQuery:'',//银行搜索
            txtprSupplier:"",//保养厂搜索框
            prinvLinkAuto:0,
         }
        Form1={
            carRepairAuto:0,//交修单号
            carFixAuto:0,//维修编号
            carbaseAuto:0,//车籍编号
            makNo:"",//车牌号码
            brandName:"",//厂牌
            clasenName:"",//车牌
            BSType:"",//变速类型
            carNo:"",//车架号
            engNo:"",//发动机号码
            useType:"",//使用性质
            carColor:"",//颜色
            linceDT:"",//登记日期
            fixDT:null,//交修日期
            fixDTPre:null,//预计完修日
            fixDTReal:null,//实际完修日
            custName:"",//交修人
            contactNumber:"",//联系电话
            KM:0,//维修里程
            fixType:0,//维修类别
            nextMaintainKM:0,//下次保养里程
            nextMaintainDT:null,//下次保养日期
            payMode:0,//付款周期
            suppliers:0,//维修厂商
            //wHDisAmount:null,//工时
            itemDisAmount:0,//材料
            //cstatus:"",//维修状态
            carFixNo:"",//工单号码
            wHAmount:0,//工时费
            itemAmount:0,//材料费
            realAmount:0,//实付金额
            repairProblem:"",//送修问题
            remark:"",//备注
            carbody:[],//车身内部
            // title:"",//联络人
            // tel:"",//电话
            // customerName:"",//客户名称
            // carMtnAmt:"",//已收费用
            // totalAmount:"",//维修总计
            // surplusage:"",//费用余额
            // useWhiel:"",//轮胎使用
            // Whiel:"",//额度
            // SDT:"",//起租日
            // EDT:"",//迄租日
            // isDB:"",//是否含代步
            // carFixItemN:"",//零件名称
            // itemNames:"",//零件名称输入框
            // itemCount:0,//数量
            // itemAmountD:"",//单价
            // itemType:"",//材料类别
            // memo:"",//备注
            //契约
            // rateKM:"",//计价里程公里
            // linceKM:"",//合约公里
            // orderCarMtnAmt:"",//月维修费
            // txtWhiel:"",//轮胎条数
            // overKM:"",//超里程
            // overKMPayType:"",//超里程结算
            //orderNo:"",//契约编号
            
        }
/**----------------table列表------------- */
        //附件列表
         Filecolumns=[{
                title:'交修单号',
                width:200,
                tooltip:true,
                key:'docPostId'
            },{
                title:'附件名称',
                width:300,
                tooltip:true,
                key:'oldFileName',
            },{
                title:this.L('Actions'),
                key:'Actions',
                align: 'center',
                width:200,
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
        //收款人明细
         Payeecolumns=[{
                title:'收款人',
                width:200,
                tooltip:true,
                key:'lkrName'
            },{
                title:'银行别',
                width:200,
                tooltip:true,
                render:(h:any,params:any)=>{
                    return h('span',params.row.bankType.bankNameT)
                }
            },{
                title:'银行',
                width:200,
                tooltip:true,
                key:'lkrBank'
            },{
                title:'账号',
                width:200,
                tooltip:true,
                key:'lkrAcount'
            },{
                title:this.L('Actions'),
                width:200,
                key:'Actions',
                align: 'center',
                render:(h:any,params:any)=>{
                    return h('div',[
                    h('Button',{
                            props:{
                                type:'primary',
                                size:'small'
                            },
                            on:{
                                click:()=>{
                                    //选中的数据赋值给文本框
                                    this.LKRvalue(params.row);
                                }
                            }
                        },this.L('选择'))
                    ])
                }
         }]
        //银行明细
         Bankcolumns=[{
                title:'银行别',
                width:200,
                tooltip:true,
                //key:'bankType',
                render:(h:any,params:any)=>{
                    return h('span',params.row.bankTypeData.bankNameT)
                }
            },{
                title:'银行支行',
                width:200,
                tooltip:true,
                key:'bankName'
            },{
                title:this.L('Actions'),
                width:200,
                key:'Actions',
                align: 'center',
                render:(h:any,params:any)=>{
                    return h('div',[
                        h('Button',{
                            props:{
                                type:'primary',
                                size:'small'
                            },
                            on:{
                                click:()=>{
                                    //选中的数据赋值给文本框
                                    this.bankvalue(params.row);
                                }
                            }
                        },this.L('选择'))
                    ])
                }
         }]
        //维修配件明细columns
         repairDetailcolumns=[{
                title:'零件名称',
                width:100,
                tooltip:true,
                key:'itemName'
            },{
                title:'数量',
                width:100,
                tooltip:true,
                key:'itemCount'
            },{
                title:'单价',
                width:100,
                tooltip:true,
                key:'itemAmount'
            },{
                title:'材料类别',
                width:100,
                tooltip:true,
                render:(h:any,params:any)=>{
                    var itemType='';
                    if(params.row.itemType==1){
                        itemType="轮胎"
                    }else if(params.row.itemType==2){
                        itemType="機油"
                    }else if(params.row.itemType==3){
                        itemType="其他"
                    }
                    return h('span',itemType)
                }
               
            },{
                title:'小计',
                width:100,
                render:(h:any,params:any)=>{
                    return h('span',params.row.itemAmount*params.row.itemCount)
                }
            },{
                title:'备注',
                width:100,
                key:'memo'
            },{
                title:this.L('Actions'),
                key:'Actions',
                width:150,
                render:(h:any,params:any)=>{
                    return h('div',[
                        h('Button',{
                            props:{
                                type:'primary',
                                size:'small'
                            },
                            style:{
                                marginRight:'5px'
                                },
                            on:{
                                click:()=>{
                                    //选中的数据赋值给文本框
                                    this.carFixItemvalue(params.row,params.index);
                                }
                            }
                        },this.L('Edit')),
                        h('Button',{
                            props:{
                                type:'error',
                                size:'small'
                            },
                            on:{
                                click:async ()=>{
                                    this.$Modal.confirm({
                                            title:this.L('Tips'),
                                            content:this.L('DeleteConfirm'),
                                            okText:this.L('Yes'),
                                            cancelText:this.L('No'),
                                            onOk:async()=>{
                                                this.RemoveCarFixItem(params.row.id,params.index);
                                            }
                                    })
                                }
                            }
                        },this.L('Delete'))
                    ])
                }
         }]
        //发票明细columns
         InvDetailcolumns=[{
                title:'发票代码',
                width:120,
                tooltip:true,
                key:'invCode'
            },{
                title:'发票号码',
                width:120,
                tooltip:true,
                key:'invNo'
            },{
                title:'发票日期',
                width:120,
                tooltip:true,
                render:(h:any,params:any)=>{
                    return h('span',new Date(params.row.invDt).toLocaleDateString())
                }
            },{
                title:'发票类别',
                width:120,
                tooltip:true,
                key:'invType',
                render:(h:any,params:any)=>{
                    var invType="";
                    if(params.row.invType==1){
                        invType="普票"
                    }else if(params.row.invType==2){
                        invType="增票"
                    }
                    return h('span',invType)
                }
            },{
                title:'发票金额',
                width:120,
                tooltip:true,
                key:'amount'
            },{
                title:'发票实付金额',
                width:120,
                tooltip:true,
                key:'invRealAmt'
            },{
                title:'保养厂',
                width:120,
                tooltip:true,
                key:'prSupplierN',
            },{
                title:'公司别',
                width:120,
                tooltip:true,
                key:'incName',
            },{
                title:'收款银行别',
                width:120,
                tooltip:true,
                key:'bankNameT',
            },{
                title:'收款人',
                width:120,
                tooltip:true,
                key:'accountName'
            },{
                title:'收款银行',
                width:120,
                tooltip:true,
                key:'accountBank'
            },{
                title:'收款账号',
                width:120,
                tooltip:true,
                key:'bankAccount'
            },{
                title:this.L('Actions'),
                width:120,
                key:'Actions',
                align: 'center',
                render:(h:any,params:any)=>{
                    return h('div',[
                        h('Button',{
                            props:{
                                type:'primary',
                                size:'small'
                            },
                            on:{
                                click:()=>{
                                    //选中的数据赋值给文本框
                                    this.PRInvValue(params.row,params.index);
                                }
                            }
                        },this.L('选择'))
                    ])
                }
         }]
/**-----------------赋值----------------- */
        //清空数据
         clearForm(){
            this.Form1.carRepairAuto=0;//交修单号
            this.Form1.carFixAuto=0;//维修编号
            this.Form1.carbaseAuto=0;//车籍编号
            this.Form1.makNo="";//车牌号码
            this.Form1.brandName="";//厂牌
            this.Form1.clasenName="";//车牌
            this.Form1.BSType="";//变速类型
            this.Form1.carNo="";//车架号
            this.Form1.engNo="";//发动机号码
            this.Form1.useType="";//使用性质
            this.Form1.carColor="";//颜色
            this.Form1.linceDT="";//登记日期
            this.Form1.fixDT=null;//交修日期
            this.Form1.fixDTPre=null;//预计完修日
            this.Form1.fixDTReal=null;//实际完修日
            this.Form1.custName="";//交修人
            this.Form1.contactNumber="";//联系电话
            this.Form1.KM=0;//维修里程
            this.Form1.fixType=0;//维修类别
            this.Form1.nextMaintainKM=0;//下次保养里程
            this.Form1.nextMaintainDT=null;//下次保养日期
            this.Form1.payMode=0;//付款周期
            this.Form1.suppliers=0;//维修厂商
            this.Form1.itemDisAmount=0;//材料
            this.Form1.carFixNo="";//工单号码
            this.Form1.wHAmount=0;//工时费
            this.Form1.itemAmount=0;//材料费
            this.Form1.realAmount=0;//实付金额
            this.Form1.repairProblem="";//送修问题
            this.Form1.remark="";//备注
            this.Form1.carbody=[];//车身内部
            this.carRepairFilelist=[];//附件明细
            this.listfile=[];
            this.WHDiscount='';//厂商折扣工时
            this.itemDiscount=''//厂商折扣材料
            this.sPayDT='';//厂商付款天
            this.sPayDay='';//厂商付款日
            this.wHDisAmount=0;//折扣工时
            this.cstatus="";//维修状态
            this.repairDetaillist=[];//维修明细
            this.InvDetaillist=[];//发票明细
            this.PRInvList=[];//自定义发票明细
            this.repairlist=false//维修明细
            this.Invlist=false//发票明细
            this.zjpayeelist=false//收款人显示明细
            this.bankchklist=false//银行显示明细
         }
        //领款人赋值
         LKRvalue(data){
            this.PRInvForm.accountName=data.lkrName;//领款人
            this.PRInvForm.bankType=data.bankType.id;//银行别
            this.PRInvForm.accountBank=data.lkrBank;//银行名称
            this.PRInvForm.bankAccount=data.lkrAcount;//账号
            this.zjpayeelist=false;//隐藏收款人明细
         }
        //银行赋值
         bankvalue(bank){
            this.PRInvForm.bankType=bank.bankType;//银行别
            this.PRInvForm.accountBank=bank.bankName;//银行名称
            this.PRInvForm.bankAccount=bank.bankNumber;//账号
            this.PRInvForm.txtBankQuery="";
            this.bankchklist=false;//隐藏银行明细
         }
        //维修赋值
         async carFixbestowData(){
            //厂牌
             this.brandNamelist.map(i=>{
                if(i.id==this.information.carBase.brandAuto){
                    this.Form1.brandName=i.brandName;
                }
            })
            //车型
             this.clasenlist.map(i=>{
                if(i.id==this.information.carBase.clasenAuto){
                    this.Form1.clasenName=i.clasenName;
                }
            })
            //变速类型
             this.bsTypelist.map(i=>{
                if(i.num==this.information.carBase.bstype){
                    this.Form1.BSType=i.itemName;//变速类型
                }
            })
            //使用性质
             this.useTypelist.map(i=>{
                if(this.information.carBase.useType==i.num){
                    this.Form1.useType=i.itemName;//使用性质
                }
            })
            this.Form1.carRepairAuto=this.information.carRepairAuto;//交修单号
            this.Form1.carFixAuto=this.information.id;//维修编号
            this.carFixAuto=this.information.id;
            this.Form1.carbaseAuto=this.information.carBase.id;
            this.Form1.makNo=this.information.makNo;//车号
            this.Form1.carNo=this.information.carBase.carNo;//车架号
            this.Form1.engNo=this.information.carBase.engNo;//发动机号码
            this.Form1.carColor=this.information.carBase.carColor;//颜色
            this.Form1.linceDT=this.information.carBase.linceDt;//登记日期
            this.Form1.fixDT=this.information.fixDt;//交修日期
            this.Form1.fixDTPre=this.information.fixDtpre;//预计完修日
            this.Form1.fixDTReal=this.information.fixDtreal;//实际完修日
            this.Form1.custName=this.information.custName;//交修人
            this.Form1.contactNumber=this.information.contactNumber;//联系电话
            this.Form1.KM=this.information.km;//维修里程
            this.Form1.fixType=this.information.fixType;//维修类别
            this.Form1.nextMaintainKM=this.information.nextMaintainKm;//下次保养里程
            this.Form1.nextMaintainDT=this.information.nextMaintainDt;//下次保养日期
            this.Form1.payMode=this.information.payMode;//付款周期
            this.Form1.suppliers=this.information.supplierAuto;//维修厂商
            this.getSupplier();//厂商折扣信息
            this.wHDisAmount=this.information.whdisCount;//工时
            this.Form1.itemDisAmount=this.information.itemDisCount;//材料
            this.getStatus(this.information.status);//维修状态
            this.Form1.carFixNo=this.information.carFixNo;//工单号码
            this.Form1.wHAmount=this.information.whamount;//工时费
            this.Form1.itemAmount=this.information.itemAmount;//材料费
            this.Form1.realAmount=this.information.realAmount;//实付金额
            this.Form1.remark=this.information.remark;//备注
            this.getCarRepair();//车身内部、送修问题 
            this.getPrinv();//获取发票信息
            this.repairDetaillist=this.information.carFixItem;//维修配件明细
            this.repairlist=true;//显示维修明细 
            //this.CarFixItemAuto=this.information.carFixItem[0].id;//获取维修配件id
            
         } 
        //交修赋值
         carRepairbestowData(){
            //厂牌
             this.brandNamelist.map(i=>{
                if(i.id==this.information.carBase.brandAuto){
                    this.Form1.brandName=i.brandName;
                }
            })
            //车型
             this.clasenlist.map(i=>{
                if(i.id==this.information.carBase.clasenAuto){
                    this.Form1.clasenName=i.clasenName;
                }
            })
            //变速类型
             this.bsTypelist.map(i=>{
                if(i.num==this.information.carBase.bstype){
                    this.Form1.BSType=i.itemName;//变速类型
                }
            })
            //使用性质
             this.useTypelist.map(i=>{
                if(this.information.carBase.useType==i.num){
                    this.Form1.useType=i.itemName;//使用性质
                }
            })
            this.Form1.carRepairAuto=this.information.id;//交修单号
            this.Form1.carbaseAuto=this.information.carBase.id;
            this.Form1.makNo=this.information.carBase.makNo;//车牌号
            this.Form1.carNo=this.information.carBase.carNo;//车架号
            this.Form1.engNo=this.information.carBase.engNo;//发动机号码
            this.Form1.carColor=this.information.carBase.carColor;//颜色
            if(this.information.carBase.linceDt!=null){
                this.Form1.linceDT=new Date(this.information.carBase.linceDt).toLocaleDateString();//登记日期
            }
            this.Form1.fixDT=this.information.repairDt;//交修日期
            this.Form1.fixDTPre=this.information.repairDtpre;//预计完修日
            this.Form1.custName=this.information.repairName;//交修人
            this.Form1.contactNumber=this.information.contactNumber;//联系电话
            this.Form1.KM=this.information.km;//维修里程
            this.Form1.fixType=this.information.repairTypeItemCode.num;//维修类别
            this.Form1.payMode=this.information.payModeItemCode.num;//付款周期
            this.Form1.suppliers=this.information.supplierAuto;//维修厂商
            this.getSupplier();//厂商折扣信息
            this.Form1.carbody=this.information.systemP.split(",");//车身内部
            this.Form1.repairProblem=this.information.repairProblem;//送修问题
            //附件
            this.getFileUpload(this.information.id);
         }
        //查询附件
         async getFileUpload(id){
            this.pageFileUploadRequest.docPostID=id;
            await this.$store.dispatch({
                type:'fileUpload/getAll',
                data:this.pageFileUploadRequest
            }).then(res=>{
                res.items.map(i=>{
                    if(i.type==7){
                        this.listfile.push(i);
                    }
                })
                this.carRepairFilelist=this.listfile;
            })
         }
/**---------------实体赋值--------------- */
        //维修实体赋值
         carFixtoData(data){
            var newdata=publicclass.DeepClone(data)
            if(newdata.fixDT!=''){
                newdata.fixDT=new Date(newdata.fixDT).toLocaleDateString();
            }
            if(newdata.fixDTPre!=''){
                newdata.fixDTPre=new Date(newdata.fixDTPre).toLocaleDateString();
            }
            if(newdata.fixDTReal!=''){
                newdata.fixDTReal=new Date(newdata.fixDTReal).toLocaleDateString();
            }
            if(newdata.nextMaintainDT!=''){
                newdata.nextMaintainDT=new Date(newdata.nextMaintainDT).toLocaleDateString();
            }
            var carFix=new CarFix();
            carFix.id=data.carFixAuto;
            carFix.carBaseAuto=newdata.carbaseAuto;//车籍序號
            carFix.orderAuto=0;//契约编号
            carFix.supplierAuto=newdata.suppliers;//厂商编号
            if(newdata.carFixNo==''||newdata.carFixNo==null||newdata.carFixNo==undefined){
                carFix.carFixNo='';
            }
            else{
                carFix.carFixNo=newdata.carFixNo;//工单号码
            }
            carFix.makNo=newdata.makNo;//车牌号码
            carFix.custName=newdata.custName;//交修人
            carFix.fixDT=newdata.fixDT;//进厂日期
            carFix.fixDTPre=newdata.fixDTPre;//预计完修日
            carFix.fixDTReal=newdata.fixDTReal;//实际完修日
            carFix.km=newdata.KM;//维修里程
            carFix.fixType=newdata.fixType;//维修类别
            carFix.mainTainKM=newdata.KM;//定保类別
            carFix.wHAmount=newdata.wHAmount;//工时费
            carFix.wHDisCount=newdata.wHDisAmount;//工时折扣
            carFix.itemAmount=newdata.itemAmount;//材料费
            carFix.itemDisCount=newdata.itemDisAmount;//材料费折扣
            carFix.realAmount=newdata.realAmount;//实付金额
            carFix.status=0;//状态
            carFix.cuser=0;//建立人
            if(this.information.cdt=='0001-01-01T00:00:00'){
                carFix.cdt=new Date();//建立時間
            }
            else{
                carFix.cdt=this.information.cdt;
            }
            carFix.muser=0;//修改人
            carFix.mdt=new Date();//修改時間
            carFix.accBankAuto=0;//厂商账户明细序号
            carFix.carFixBatchAuto=0;//维修送件批次
            carFix.remark=newdata.remark;//备注
            carFix.carFixBatchTNO=0;//批号
            carFix.payMode=newdata.payMode;//付款周期
            carFix.carRepairAuto=newdata.carRepairAuto;//交修编号
            carFix.nextMaintainKM=newdata.nextMaintainKM;//下次保养里程
            carFix.nextMaintainDT=newdata.nextMaintainDT;//下次保养日期
            carFix.preNextMaintainDT=newdata.nextMaintainDT;//预估下次保养日期
            carFix.itemCodeFixType=501;
            carFix.itemCodeStatus=1412;
            return carFix;
         }
        //维修配件实体类赋值
         carFixItemtoData(data){
            var newdata=publicclass.DeepClone(data);
            var CarItem=new CarFixItem();
            CarItem.id=newdata.id;
            CarItem.carFixAuto=0;
            CarItem.itemName=newdata.itemName;//名称
            CarItem.itemCount=newdata.itemCount;//数量
            CarItem.itemAmount=newdata.itemAmount;//单价
            CarItem.payType=1;//付费类别
            CarItem.itemType=newdata.itemType;//零件类别
            CarItem.memo=newdata.memo;//备注
            CarItem.seq=newdata.seq;//次数
            CarItem.cuser=0;//建立人
            CarItem.cdt=new Date();//建立时间
            CarItem.muser=0;//修改人
            CarItem.mdt=new Date();//修改时间
            return CarItem;
         }
        //发票实体赋值
         prinvtoData(data){
            var newdata=publicclass.DeepClone(data);
            if(newdata.invDt!=''){
                newdata.invDt=new Date(newdata.invDt).toLocaleDateString();
            }
            var prinv=new PRInv();
            prinv.id=data.id;
            prinv.prinvLinkAuto=0;
            prinv.incAuto=newdata.ddlinc;//公司别
            prinv.supplierAuto=newdata.prSupplier;//厂商
            prinv.invCode=newdata.invCode;//发票代码
            prinv.invNo=newdata.invNo;//发票号码
            prinv.invDt=newdata.invDt;//发票日期
            prinv.amount=newdata.amount;//发票金额
            prinv.paydt=newdata.paydt;//付款日期
            prinv.payamt=newdata.payamt;//付款金额
            prinv.status=0;//状态
            prinv.invType=newdata.invType;//发票类别
            prinv.accountName=newdata.accountName;//收款人
            prinv.accountBank=newdata.accountBank;//银行名称
            prinv.bankAccount=newdata.bankAccount;//收款账号
            prinv.bankType=newdata.bankType;//银行别
            prinv.invRealAmt=newdata.invRealAmt;//实付金额
            prinv.cuser=0;//建立人
            prinv.cdt=new Date();//建立时间
            prinv.muser=0;//修改人
            prinv.mdt=new Date();//修改时间
            return prinv;
         }
        //维修记录和发票关联档实体赋值
         prinvlinktoData(){
            var PRInvLink = new PRInvLinK();
            PRInvLink.id=0;
            PRInvLink.sourceAuto=this.carFixAuto;//维修编号
            PRInvLink.prinvAuto=0;//发票编号
            PRInvLink.prtype=1;//应付类别 itemcode 705
            PRInvLink.invSource=1;//营运付款类别 itemcode 711
            PRInvLink.linkAmt=this.RealAmount;//金额
            return PRInvLink;
         }
        //交修实体赋值
         carRepairData(){
            var carRepair=new CarRepair();
            carRepair.id=this.information.id;//交修编号
            carRepair.carBaseAuto=this.information.carBaseAuto;//车籍编号
            carRepair.orderAuto=this.information.orderAuto;//契约编号
            carRepair.repairDT=this.information.repairDt;//交修日期
            carRepair.repairType=this.information.repairType;//交修类别
            carRepair.km=this.information.km;//行驶里程
            carRepair.repairDtpre=this.information.repairDtpre;//预计完工时间
            carRepair.repairName=this.information.repairName;//交修人
            carRepair.contactNumber=this.information.contactNumber;//联系电话
            carRepair.payMode=this.information.payMode;//付款周期
            carRepair.supplierAuto=this.information.supplierAuto;//维修厂商
            carRepair.systemP=this.information.systemP;//车身内部
            carRepair.repairProblem=this.information.repairProblem;//送修问题
            carRepair.operatingItem=this.information.operatingItem;//作业项目
            carRepair.repairRecommendation=this.information.repairRecommendation;//交修建议
            carRepair.estimatedTimeFee=this.information.estimatedTimeFee;//预估工时总金额
            carRepair.estimatedPartFee=this.information.estimatedPartFee;//预估零件总金额
            carRepair.estimatedTotalFee=this.information.estimatedTotalFee;//合计总金额
            carRepair.repairTypeItemType=this.information.repairTypeItemType;//维修类别
            carRepair.payModeItemType=this.information.payModeItemType;//付款周期
            carRepair.status=30;
            carRepair.cuser=0;
            carRepair.cdt=this.information.cdt;
            carRepair.muser=0;
            carRepair.mdt=this.information.mdt;
            carRepair.addStatus=this.information.addStatus;//追加状态 -1 未追加 20追加核准
            carRepair.carFixType=this.information.carFixType;//是否维修请款
            carRepair.finishDT=this.information.finishDT;//完工时间
            return carRepair;
         }
        //车籍实体赋值
         carBaseData(){
            var carBase=new CarBase();
            carBase.id=this.information.carBaseAuto;
            carBase.km=this.Form1.KM;//公里数
            carBase.accessary=this.information.carBase.accessary;//配件总额
            carBase.incAuto=this.information.carBase.incAuto;//公司别
            carBase.makNo=this.information.carBase.makNo;//车牌号码
            carBase.makColor=this.information.carBase.makColor;//车牌颜色
            carBase.linceNo=this.information.carBase.linceNo;//登记证号
            carBase.linceDt=this.information.carBase.linceDt;//登记日期
            carBase.factoryBrandAuto=this.information.carBase.factoryBrandAuto;//总厂牌
            carBase.brandAuto=this.information.carBase.brandAuto;//厂牌
            carBase.clasenAuto=this.information.carBase.clasenAuto;//车型
            carBase.clasenCode=this.information.carBase.clasenCode;//车辆型号
            carBase.cc=this.information.carBase.cc;//排气量
            carBase.percnt=this.information.carBase.percnt;//座位数
            carBase.wheel=this.information.carBase.wheel;//轮胎数
            carBase.carColor=this.information.carBase.carColor;//车身颜色
            carBase.engNo=this.information.carBase.engNo;//发动机号
            carBase.carNo=this.information.carBase.carNo;//车架号
            carBase.carDt=this.information.carBase.carDt;//出厂日期
            carBase.oil=this.information.carBase.oil;//燃油种类
            carBase.listPrice=this.information.carBase.listPrice;//牌价
            carBase.carType=this.information.carBase.carType;//车辆性质
            carBase.isImport=this.information.carBase.isImport;//进口车
            carBase.clasenVer=this.information.carBase.clasenVer;//配置版本
            carBase.manufacturer=this.information.carBase.manufacturer;//制造厂商
            carBase.supplier=this.information.carBase.supplier;//购入厂商
            carBase.createPlace=this.information.carBase.createPlace;//汽车产地
            carBase.useType=this.information.carBase.useType;//使用性质
            carBase.category=this.information.carBase.category;//车种
            carBase.insurePercnt=this.information.carBase.insurePercnt;//车险座位别
            carBase.isBusiness=this.information.carBase.isBusiness;//车险性质别
            carBase.keyCount=this.information.carBase.keyCount;//备用钥匙
            carBase.provinceCode=this.information.carBase.provinceCode;//车辆使用地 省
            carBase.cityCode=this.information.carBase.cityCode;//车辆使用地 市
            carBase.makDt=this.information.carBase.makDt;//领照日期
            carBase.memo=this.information.carBase.memo;//备注
            carBase.mtnFirst=this.information.carBase.mtnFirst;//首保
            carBase.mtnFirstMonth=this.information.carBase.mtnFirstMonth;//首保
            carBase.mtnSecond=this.information.carBase.mtnSecond;//二保
            carBase.mtnSecondMonth=this.information.carBase.mtnSecondMonth;//二保
            carBase.mtnCycle=this.information.carBase.mtnCycle;//定保
            carBase.yearCheckDT=this.information.carBase.yearCheckDt;//年审截止
            carBase.roadCheckDT=this.information.carBase.roadCheckDt;//养路费截止
            carBase.rentCarType=this.information.carBase.rentCarType;//车辆吨数
            carBase.ton=this.information.carBase.ton;//实际吨数
            carBase.carTaxMode=this.information.carTaxMode;//税点
            carBase.es=this.information.carBase.es;//排放标准
            carBase.esremark=this.information.carBase.esremark;//排放标准
            carBase.bstype=this.information.carBase.bstype;//变速类型
            carBase.jcdt=this.information.carBase.jcdt;//交车日期
            carBase.bkdt=this.information.carBase.bkdt;//拨款日期
            carBase.status=this.information.carBase.status;//异动原因
            carBase.isYearCheck=this.information.carBase.isYearCheck;//年审数据中显示
            carBase.depAuto=this.information.depAuto;//保管单位
            carBase.sgAuto=this.information.carBase.sgAuto;//仓库别
            carBase.cuser=this.information.carBase.cuser;
            carBase.cdt=this.information.carBase.cdt;
            carBase.muser=this.information.carBase.muser;
            carBase.mdt=this.information.carBase.mdt;
            carBase.itemType=this.information.carBase.itemType;
            carBase.deptNo=this.information.carBase.deptNo;//会计部门序号
            carBase.easAsstAct=this.information.carBase.easAsstAct;
            carBase.easCarbaseAuto=this.information.carBase.easCarbaseAuto;
            carBase.getAmt=this.information.carBase.getAmt;
            carBase.carTax=this.information.carTax;//车辆购置税
            carBase.isEas=this.information.carBase.isEas;
            carBase.makStatus=this.information.carBase.makStatus;
            carBase.marketDt=this.information.carBase.marketDt;
            carBase.marketValue=this.information.carBase.marketValue;
            carBase.newBrand=this.information.carBase.newBrand;
            carBase.newClasen=this.information.carBase.newClasen;
            carBase.newFactory=this.information.carBase.newFactory;
            carBase.sellAmt=this.information.carBase.sellAmt;
            carBase.sellDt=this.information.carBase.sellDt;
            carBase.sellInvoice=this.information.carBase.sellInvoice;
            carBase.usePlace=this.information.carBase.usePlace;
            return carBase;
         }
/**---------------按钮事件-------------- */
        /**配件搜索 */
          peijianselect(){
            this.pageItemCodeRequest.itemTypes = [238];
            this.pageItemCodeRequest.itemName = this.CarFixItemForm.itemName;
            this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(a=>{
                a.items.map(i=>{
                    this.CarFixItemForm.itemNameType=i.num;//下拉框
                    this.CarFixItemForm.itemName=i.itemName;//搜索框
                })
            })
            
         }
        /**搜索保养厂 */
          prSupplierCheck(){
            this.pageSupplierRequest.supplierTypes=[2,3,4,6];
            this.pageSupplierRequest.key=this.PRInvForm.txtprSupplier;
            this.pageSupplierRequest.supplierAuto=null;
            this.$store.dispatch({
                type:'supplier/getAll',
                data:this.pageSupplierRequest
            }).then(res=>{
                res.items.map(i=>{
                    this.PRInvForm.prSupplier=i.id;
                })
            })
         }
        /**收款人搜索 */
          PayeeCheck(){
            if(this.PRInvForm.accountName=="" || this.PRInvForm.accountName==null || this.PRInvForm.accountName==undefined){
                this.$Notice.warning({
                    title: '请输入收款人姓名关键字'
                })
            }
            else{
                this.pageLKRTotalRequest.lkrName=this.PRInvForm.accountName;
                this.$store.dispatch({
                    type:'lKRTotal/getAll',
                    data:this.pageLKRTotalRequest
                }).then(res=>{
                    this.Payeelist=res.items;//赋值给table
                })
                this.zjpayeelist=true;//显示收款人明细
            }
         }
        /**银行搜索 */
          BankCheck(){
            if(this.PRInvForm.bankType == 0){
                this.$Notice.warning({
                    title: '请选择银行别'
                })
            }
            else{
                if(this.PRInvForm.txtBankQuery != "" && this.PRInvForm.txtBankQuery != undefined && this.PRInvForm.txtBankQuery != null){
                this.pageBankDetailRequest.keyword = this.PRInvForm.txtBankQuery;//搜索内容
                this.pageBankDetailRequest.bankType = this.PRInvForm.bankType;//银行别
                this.$store.dispatch({
                    type:'bankDetail/getAll',
                    data:this.pageBankDetailRequest
                }).then(a=>{
                    this.banklist=a.items;
                })
                this.bankchklist=true;//显示银行明细
            }
            else{
                this.$Notice.warning({
                    title: '请输入搜索关键字'
                })
            }
            }
         }
        /**零件名称（下拉框和文本框对应） */
         partname(){
            //选中的零件名称同步到文本框中
            if(this.CarFixItemForm.itemNameType!=null && this.CarFixItemForm.itemNameType!=undefined && this.CarFixItemForm.itemNameType!=undefined){
                this.CarFixItemForm.itemName=(this.carFixItemList.find(item => item.num === this.CarFixItemForm.itemNameType)['itemName']);
            }
         }
        //查询厂商折扣
         async getSupplier(){
            this.pageSupplierRequest.supplierAuto=this.Form1.suppliers
            await this.$store.dispatch({
                type:'supplier/getAll',
                data:this.pageSupplierRequest
            }).then(res=>{
                res.items.map(i=>{
                    this.WHDiscount=i.whdiscount;//折扣
                    this.itemDiscount=i.itemDiscount;//材料
                    this.sPayDT=i.payDt;//几日付款
                    this.sPayDay=i.payDay;//几天付一次
                })
            })
         }
        //获取交修内容
         async getCarRepair(){
            var carrepair=new CarRepair();
            carrepair.id=this.information.carRepairAuto;
            await this.$store.dispatch({
                type:'carRepair/get',
                data:carrepair
            }).then(res=>{
                this.Form1.carbody=res.systemP.split(",");//车身内部
                this.Form1.repairProblem=res.repairProblem;//送修问题
            })
         }
        //获取发票信息
         async getPrinv(){
            //根据carBaseAuto查询出发票信息
            this.pagePRInvLinkRequest.sourceAuto=this.information.id;
            await this.$store.dispatch({
                type:'prinvLink/getAll',
                data:this.pagePRInvLinkRequest
            }).then(async (res)=>{
                if(res.items.length>0){
                    res.items.map(i=>{
                        this.PRInvLinkAuto=i.id;
                        this.getPpRinv(i.id);
                    })
                }
            })         
        }
        async getPpRinv(id){
            this.pagePRInvRequest.prinvLinkAuto=id;
            await this.$store.dispatch({
                type:'prinv/getAll',
                data:this.pagePRInvRequest
            }).then(res=>{
                if(res.items.length>0){
                    this.getNewPRInv(res.items);
                }
            })
            this.Invlist=true;//显示发票明细
        }
        //自定义新数组赋值
         getNewPRInv(data){
            if(data[0].prinvLinkAuto!=0){
            this.PRInvFormNew.prinvLinkAuto=data[0].prinvLinkAuto;
            }
            data.forEach(async (val) => {
                this.PRInvFormNew.id=val.id;
                this.PRInvFormNew.invCode=val.invCode;//发票代码
                this.PRInvFormNew.invNo=val.invNo;//发票号码
                this.PRInvFormNew.invDt=val.invDt;//发票日期
                this.PRInvFormNew.amount=val.amount;//发票金额
                this.PRInvFormNew.invRealAmt=val.invRealAmt;//发票实付金额
                if(val.invType==1){
                    this.PRInvFormNew.invType='1';
                }
                else if(val.invType==2){
                    this.PRInvFormNew.invType='2';
                }
                else{
                    this.PRInvFormNew.invType='0';
                }
                this.PRInvFormNew.bankType=val.bankType;//银行别
                this.PRInvFormNew.bankNameT=val.bankTypeData.bankNameT;//银行别
                this.PRInvFormNew.accountBank=val.accountBank;//开户行
                this.PRInvFormNew.prSupplier=val.supplierAuto;//保养厂
                this.PRInvFormNew.prSupplierN=val.supplier.fname;//保养厂
                this.PRInvFormNew.accountName=val.accountName;//收款人
                this.PRInvFormNew.ddlinc=val.incAuto;//公司别
                this.PRInvFormNew.incName=val.inc.sname;//公司别
                this.PRInvFormNew.bankAccount=val.bankAccount;//账号
                this.PRInvList.push(publicclass.DeepClone(this.PRInvFormNew));
            });
            this.InvDetaillist=this.PRInvList;
         }
        //工时费触发事件
         wHAmountChange(){
             var a=this.Form1.wHAmount;
             this.wHDisAmount=Number(a).toFixed(2);//折扣工时费保留两位小数
         }
        //获取维修状态
         async getStatus(val){
            this.pageItemCodeRequest.itemTypes = [502];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                res.items.map(i=>{
                    if(i.num==val){
                        this.cstatus=i.itemName
                    }
                })
            })
         }
/**---------------新增修改操作------------ */
        //维修配件新增
         async CreateCarFixItem(data){
            var Request = this.carFixItemtoData(data);
            Request.carFixAuto=this.carFixAuto
            await this.$store.dispatch({
                type:'carFixItem/create',
                data:Request
            }).then(res=>{
                this.CarFixItemAuto=res.id;
            })
         }
        //维修配件修改
         async UpdateCarFixItem(data){
            var Request = this.carFixItemtoData(data);
            Request.carFixAuto=this.carFixAuto
            await this.$store.dispatch({
                type:'carFixItem/update',
                data:Request
            });
         }
        //删除维修配件
         async DeleteCarFixItem(){
            var cardixitem=new CarFixItem();
            for (let i = 0; i < this.CFIDelId.length; i++) {
                cardixitem.id=this.CFIDelId[i];
                await this.$store.dispatch({
                    type:'carFixItem/delete',
                    data:cardixitem
                });
            }
         }
        //新增维修记录和发票关联档
         async CreatePRInvLink(){
            var Request = this.prinvlinktoData();
            await this.$store.dispatch({
                type:'prinvLink/create',
                data:Request
            }).then(res=>{
                this.PRInvLinkAuto=res.id;
            })
         }
        //修改维修记录和发票关联档
         async UpdatePRInvLink(id){
            var Request = this.prinvlinktoData();
            Request.id=id;
            Request.prinvAuto=this.PRInvAuto;
            await this.$store.dispatch({
                type:'prinvLink/update',
                data:Request
            });
         }
        //新增发票
         async CreatePRInv(data){
            //判断PRInvLink表里是否有数据，没有就新增
            var prinvlink=new PagePRInvLinkRequest();
            if(this.carFixAuto==0||this.carFixAuto==null){
                prinvlink.sourceAuto=0;
            }else{
                prinvlink.sourceAuto=this.carFixAuto;
            }
            await this.$store.dispatch({
                type:'prinvLink/getAll',
                data:prinvlink
            }).then(async (res)=>{
                if(res.items.length>0){
                    this.PRInvLinkAuto=res.items[0].id;
                }
                else{
                    //新增维修记录和发票关联档
                    await this.CreatePRInvLink()
                }
            })
            var Request = this.prinvtoData(data);
            Request.prinvLinkAuto=this.PRInvLinkAuto;//发票关联档Auto值
            await this.$store.dispatch({
                type:'prinv/create',
                data:Request
            }).then(async (res)=>{
                this.PRInvAuto=res.id;
                if(this.PRInvLinkAuto!=0){
                    //修改维修记录和发票关联档
                    await this.UpdatePRInvLink(this.PRInvLinkAuto);
                }
            })
         }
        //修改发票
         async UpdatePRInv(data){
            var Request = this.prinvtoData(data);
            Request.prinvLinkAuto=this.PRInvLinkAuto;//发票关联档Auto值
            await this.$store.dispatch({
                type:'prinv/update',
                data:Request
            }).then(async (res)=>{
                this.PRInvAuto=res.id;
                if(this.PRInvLinkAuto!=0){
                    //修改维修记录和发票关联档
                    await this.UpdatePRInvLink(this.PRInvLinkAuto);
                }
            });
         }
        //修改交修表
         async UpdateCarRepair(){
            var Request = this.carRepairData();
            Request.carFixType=1;
            await this.$store.dispatch({
                type:'carRepair/update',
                data:Request
            });
         }
        //修改车籍里程数
         async updateCarBase(){
            var Request = this.carBaseData();
            await this.$store.dispatch({
                type:'carbase/update',
                data:Request
            });
         }
        
/**--------------维修配件明细------------- */
        //维修明细列表新增
         async carfixadddetail(){
            await this.getCarmoreName(0);
            this.carfixItemToAmount();//获取材料费
         }
        //维修明细列表修改
         async carfixeditdetail(){
            if(this.editnewindex!=null){
                await this.getCarmoreName(1);
                this.carfixItemToAmount();//获取材料费
            }
         }
        //维修明细列表删除
         RemoveCarFixItem(id,index){
            if(id!=0){
                this.CFIDelId.push(id);
            }
            this.repairDetaillist.splice(index,1)
            this.CarFixItemForm.seq=this.repairDetaillist.length;
            this.carfixItemToAmount();//获取材料费
         }
        //维修配件明细操作
         async getCarmoreName(num){
             if(this.CarFixItemForm.itemName==''||this.CarFixItemForm.itemNameType==undefined || this.CarFixItemForm.itemNameType==null){
                 this.$Message.warning('请输入零件名称')
             }
             else if(this.CarFixItemForm.itemCount==0){
                 this.$Message.warning('请输入零件数量')
             }
             else if(this.CarFixItemForm.itemAmount==''){
                 this.$Message.warning('请输入零件单价')
             }
             else if(this.CarFixItemForm.itemType==''){
                 this.$Message.warning('请输入材料类别')
             }
             else{
                 if(num==0){//新增
                    //新增维修明细到列表
                    this.CarFixItemForm.seq=this.repairDetaillist.length+1;
                    this.repairDetaillist.push(publicclass.DeepClone(this.CarFixItemForm))
                    this.repairlist=true;//显示维修明细
                    this.clearcarFixDetail();//清空数据
                 }
                 else if(num==1){//修改
                    this.repairDetaillist.splice(this.editnewindex,1,publicclass.DeepClone(this.CarFixItemForm))
                    this.addbut=true;//显示新增按钮
                    this.editbut=false;//隐藏编辑按钮
                    this.clearcarFixDetail();//清空数据
                 }
             }
         }
        //清空维修明细数据
         clearcarFixDetail(){
            this.CarFixItemForm.itemNameType="";//零件名称
            this.CarFixItemForm.itemName="";//输入框
            this.CarFixItemForm.itemCount=0;//数量
            this.CarFixItemForm.itemAmount="";//单价
            this.CarFixItemForm.itemType="";//类别材料
            this.CarFixItemForm.memo="";//备注
         }
        //维修配件明细赋值
          carFixItemvalue(data,index){
            this.addbut=false;//隐藏新增
            this.editbut=true;//显示修改
            this.CarFixItemForm.itemName=data.itemName;//零件名称搜索框
            this.CarFixItemForm.itemCount=data.itemCount;//数量
            this.CarFixItemForm.itemAmount=data.itemAmount;//单价
            this.CarFixItemForm.itemType=data.itemType;//材料类别
            this.CarFixItemForm.memo=data.memo;//备注
            this.CarFixItemForm.id=data.id;
            this.carFixdetail(data.itemName);//零件名称同步零件名称下拉框和搜索框
            
            this.editnewindex=index;//下标
          }
          async carFixdetail(val){
             this.pageItemCodeRequest.itemTypes = [238];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                res.items.map(i=>{
                    if(i.itemName==val){//零件名称
                        this.CarFixItemForm.itemNameType=i.num;//下拉框
                    }
                })
            })
         }
        //获取材料费
         carfixItemToAmount(){
             this.MaterialsAmount=0;
            if(this.repairDetaillist.length>0){//维修配件
                this.repairDetaillist.forEach(async (x) =>{
                    this.MaterialsAmount+=(Number(x.itemAmount)*Number(x.itemCount));
                })
                this.Form1.itemAmount=this.MaterialsAmount;//材料费
                this.Form1.itemDisAmount=this.Form1.itemAmount;//这口材料
            }
         }

/**----------------发票明细--------------- */
        //发票金额等于发票实付
         amountChange(){
            this.PRInvForm.invRealAmt = this.PRInvForm.amount;
         }
        //发票列表新增
         async InvSave(){
            this.getmoreName(0);
         }
        //发票列表修改
         InvEditSave(){
             if(this.editnewinvindex!=null){
                this.getmoreName(1);
             }
         }
        //发票列表操作
         async getmoreName(num){
           if(this.PRInvForm.invCode==""){
                this.$Message.warning('请输入发票代码')
            }
            else if(this.PRInvForm.amount==""){
                this.$Message.warning('请输入发票金额')
            }
            else if(this.PRInvForm.invDt==""){
                this.$Message.warning('请输入发票日期')
            }
            else if(this.PRInvForm.invNo==""){
                this.$Message.warning('请输入发票号码')
            }
            else if(this.PRInvForm.invRealAmt==""){
                this.$Message.warning('请输入发票实付金额')
            }
            else if(this.PRInvForm.invType=='0'){
                this.$Message.warning('请输入发票类别')
            }
            else if(this.PRInvForm.ddlinc==0){
                this.$Message.warning('请输入公司别')
            }
            else if(this.PRInvForm.prSupplier==0 || this.PRInvForm.prSupplier==undefined){
                this.$Message.warning('请输入保养厂')
            }
            else if(this.PRInvForm.accountName==""){
                this.$Message.warning('请输入收款人')
            }
            else if(this.PRInvForm.bankAccount==''){
                this.$Message.warning('请输入账号')
            }
            else if(this.PRInvForm.bankType==0||this.PRInvForm.bankType==undefined){
                this.$Message.warning('请输入银行别')
            }
            else if(this.PRInvForm.accountBank==''){
                this.$Message.warning('请输入开户行')
            }
            else{
               //获取公司别
                var inc=new Inc();
                inc.id=this.PRInvForm.ddlinc;
                await this.$store.dispatch({
                    type:'inc/get',
                    data:inc
                }).then(res=>{
                    this.PRInvForm.incName=res.sname;
                })
               //获取保养厂
                var supplier=new Supplier();
                supplier.id=this.PRInvForm.prSupplier;
                await this.$store.dispatch({
                    type:'supplier/get',
                    data:supplier
                }).then(res=>{
                    this.PRInvForm.prSupplierN=res.fname;
                })
               //获取银行别
                var banktype=new BankType();
                banktype.id=this.PRInvForm.bankType;
                await this.$store.dispatch({
                    type:'bankType/get',
                    data:banktype
                }).then(res=>{
                    this.PRInvForm.bankNameT=res.bankNameT;
                })
            
                if(num==0){//新增
                    this.PRInvList.push(publicclass.DeepClone(this.PRInvForm))//新增发票明细到列表
                    this.InvDetaillist=this.PRInvList;
                    this.Invlist=true;//显示发票明细
                    this.RealToAmount();//获取发票实付金额
                    this.clearInv();//清空
                }
                else if(num==1){//修改
                    this.PRInvList.splice(this.editnewinvindex,1,publicclass.DeepClone(this.PRInvForm))
                    this.InvDetaillist=this.PRInvList;
                    this.Invlist=true;//显示发票明细
                    this.invadd=true;//发票存档按钮
                    this.invedit=false;//发票修改按钮
                    this.RealToAmount();//获取发票实付金额
                    this.clearInv();//清空
                }
            }
         }
        //清空数据
         clearInv(){
            this.PRInvForm.invCode="";//发票代码
            this.PRInvForm.amount="";//发票金额
            this.PRInvForm.invDt="";//发票日期
            this.PRInvForm.invNo="";//发票号码
            this.PRInvForm.invRealAmt="";//发票实付金额
            this.PRInvForm.invType='0';//发票类别
            this.PRInvForm.prSupplier=0;//保养厂
            this.PRInvForm.txtprSupplier="";//文本框保养厂
            this.PRInvForm.accountName="";//收款人
            this.PRInvForm.bankAccount="";//账号
            this.PRInvForm.bankType=0;//银行别
            this.PRInvForm.accountBank='';//开户行
            this.PRInvForm.txtBankQuery='';//银行搜索
            this.PRInvForm.txtprSupplier="";//保养厂搜索框
         }
        //选择发票列表时赋值给Form
         PRInvValue(data,index){
            this.invadd=false;
            this.invedit=true;
            this.PRInvForm.id=data.id;
            this.PRInvForm.invCode=data.invCode;//发票代码
            this.PRInvForm.amount=data.amount;//发票金额
            this.PRInvForm.invDt=data.invDt;//发票日期
            this.PRInvForm.invNo=data.invNo;//发票号码
            this.PRInvForm.invRealAmt=data.invRealAmt;//发票实付金额
            if(data.invType==1){//发票类别
                this.PRInvForm.invType='1';
            }
            else if(data.invType==2){
                this.PRInvForm.invType='2';
            }
            else{
                this.PRInvForm.invType='0';
            }
            this.PRInvForm.ddlinc=data.ddlinc;//公司别
            this.PRInvForm.prSupplier=data.prSupplier;//保养厂
            this.PRInvForm.accountName=data.accountName;//收款人
            this.PRInvForm.bankAccount=data.bankAccount;//账号
            this.PRInvForm.bankType=data.bankType;//银行别
            this.PRInvForm.accountBank=data.accountBank;//开户行
            if(data.prinvLinkAuto!=0){
                this.PRInvLinkAuto=data.prinvLinkAuto;
            }
            this.editnewinvindex=index;//下标
         }
        //获取实付金额
         RealToAmount(){
             this.RealAmount=0;
            if(this.InvDetaillist.length>0){//发票明细
                this.InvDetaillist.forEach(async (x) =>{
                    this.RealAmount+=Number(x.invRealAmt);//实付总金额
                })
                this.Form1.realAmount=this.RealAmount;
            }
         }
//验证
        checkform={
            fixDTReal:[publicclass.Check.required.date1,publicclass.Check.checkvalue.date],//实际完修日
            KM:[publicclass.Check.required.number],//维修里程
            //nextMaintainKM:[publicclass.Check.required.number],//下次保养里程
            nextMaintainDT:[publicclass.Check.required.date1,publicclass.Check.checkvalue.date],//下次保养日期
            //carFixNo:[publicclass.Check.required.text],//工单号码
            //wHAmount:[publicclass.Check.required.text],//工时费
        }
    }
</script>

<style scoped>
/* 假如内容过长，一屏放不下，滚动条下拉覆盖不全 */
.ivu-spin-fix {
    position: fixed;
}
</style>
