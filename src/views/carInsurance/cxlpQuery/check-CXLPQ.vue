<template>
    <div>
        <Modal
         :title="L('车险理赔')"
         :width="1100"
         :value="value"
         @on-ok="save"
         @on-visible-change="visibleChange"
         fullscreen
        >
            <Form ref="cxlpForm" :label-width="100" :model="Form1">
                <Divider>案件信息</Divider>
                <Row>
                    <Col span="6">
                        <FormItem :label="L('案件类别')" prop="ddlCaseType" style="width: 100%">
                            <Select :placeholder="L('Select')" v-model="Form1.ddlCaseType" disabled>
                                <Option v-for="item in ddlCaseTypeList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label="L('案件处理状态')" prop="ddlCaseStatus" style="width: 100%">
                            <Select :placeholder="L('Select')" v-model="Form1.ddlCaseStatus" disabled>
                                <Option v-for="item in ddlCaseStatusList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label="L('已决日期')" prop="txtyjdt" style="width: 100%">
                            <DatePicker v-model="Form1.txtyjdt" type="date" style="width: 100%" format="yyyy-MM-dd" readonly></DatePicker>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label="L('结案日期')" prop="txtEndDT" style="width: 100%">
                            <DatePicker v-model="Form1.txtEndDT" type="date" style="width: 100%" format="yyyy-MM-dd" readonly></DatePicker>
                        </FormItem>
                    </Col>
                </Row>
                <Collapse v-model="collapsevalue">
                    <Panel name="1">
                        事故发生时受理信息
                        <div slot="content">
                          <Divider>基本数据</Divider>
                            <Row>
                                <Col span="6">
                                    <FormItem label="车号" prop="txtMakNO" style="width: 100%">
                                        <Input v-model="Form1.txtMakNO" readonly></Input>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="出险时间" prop="txtCaseTime" style="width: 100%">
                                        <DatePicker v-model="Form1.txtCaseTime" type="date" style="width: 100%" value-format="yyyy-MM-dd" readonly></DatePicker>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row v-show="Form1.carMakNoList">
                                <Col span="12" style="margin-left:100px">
                                    <label style="color:red;">该车出险同天系统中还存在以下出险数据,请确认是否重复录入</label>
                                    <Table :columns="carMastercolumns" border :data="caseInfo"></Table>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="6">
                                    <FormItem label="车型" prop="lblClasenName" style="width: 100%">
                                        <p style="color:blue">{{Form1.lblClasenName}}</p>
                                    </FormItem>
                                </Col>
                                <!-- <Col span="6">
                                    <FormItem label="车辆承租人" prop="lblTenant" style="width: 100%">
                                        <p style="color:blue">{{Form1.lblTenant}}</p>
                                    </FormItem>
                                </Col> -->
                                <!-- <Col span="6">
                                    <FormItem label="承办业代" prop="lblSaleName" style="width: 100%">
                                        <p style="color:blue">{{Form1.lblSaleName}}</p>
                                    </FormItem>
                                </Col> -->
                            </Row>
                             <Row>
                                <Col span="6">
                                    <FormItem label="交强险保单号码" prop="lblInsureNo" style="width: 100%">
                                        <p style="color:blue">{{Form1.lblInsureNo}}</p>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="交强险保险公司" prop="lblInsureINC" style="width: 100%">
                                        <p style="color:blue">{{Form1.lblInsureINC}}</p>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="商业险保险公司" prop="lblInsureDINC" style="width: 100%">
                                        <p style="color:blue">{{Form1.lblInsureDINC}}</p>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="商业险保单号" prop="lblInsureDNo" style="width: 100%">
                                        <p style="color:blue">{{Form1.lblInsureDNo}}</p>
                                    </FormItem>
                                </Col>
                            </Row>
                            <!-- <Row>
                                <Col span="6">
                                    <FormItem label="开户行及账号" prop="lblBankNmNo" style="width: 100%">
                                        <p style="color:blue">{{Form1.lblBankNmNo}}</p>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="12">
                                    <FormItem label="车辆备注" prop="lblMemo" style="width: 100%">
                                        <Table v-show="Form1.carMemo" :columns="carMemocolumns" border :data="gdCarMemo"></Table>
                                        <p style="color:blue">{{Form1.lblMemo}}</p>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <p style="color:red">{{Form1.lblQZ}}</p>
                                </Col>
                            </Row> -->
                            <Row>
                                <Col span="6">
                                    <FormItem label="出险地点" prop="txtCaseAddr" style="width: 100%">
                                        <Input v-model="Form1.txtCaseAddr" readonly></Input>
                                    </FormItem>
                                </Col>
                            </Row>
                             <Row>
                                <Col span="6">
                                    <FormItem label="驾驶人" prop="txtDriver" style="width: 100%">
                                        <Input v-model="Form1.txtDriver" readonly></Input>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="报案人" prop="txtReporter" style="width: 100%">
                                        <Input v-model="Form1.txtReporter" readonly></Input>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="电话1" prop="txtPhone1" style="width: 100%">
                                        <Input v-model="Form1.txtPhone1" style="width:100%" readonly></Input>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="电话2" prop="txtPhone2" style="width: 100%">
                                        <Input v-model="Form1.txtPhone2" style="width:100%" readonly></Input>
                                    </FormItem>
                                </Col>
                            </Row>
                             <Row>
                                <Col span="6">
                                    <FormItem label="事故方" prop="ddlAccidentType" style="width: 100%">
                                        <Select :placeholder="L('Select')" v-model="Form1.ddlAccidentType" disabled>
                                            <Option value="1">单方</Option>
                                            <Option value="2">多方</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="是否伤人" prop="ddlIsInjured" style="width: 100%">
                                        <Select :placeholder="L('Select')" v-model="Form1.ddlIsInjured" disabled>
                                            <Option value="1">是</Option>
                                            <Option value="2">否</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="事故类型" prop="ddlCauseTypeN" style="width: 100%">
                                        <Select :placeholder="L('Select')" v-model="Form1.ddlCauseTypeN" disabled>
                                            <Option v-for="item in ddlCauseTypeNList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="备注" prop="txtOtherRemark" style="width: 100%">
                                        <Input v-model="Form1.txtOtherRemark" readonly></Input>
                                    </FormItem>
                                </Col>
                            </Row>
                            <div v-show="DZF">
                          <Divider>对肇方</Divider>
                            <Row>
                                <Table v-show="Form1.dgdDZF" :columns="dgdDZFcolumns" border :data="dgdDZFList"></Table>
                            </Row>
                          <Divider>肇责情况</Divider>
                            <Row>
                                <Col span="6">
                                    <FormItem label="肇责情况" prop="ddlCauseType" style="width: 100%">
                                        <Select :placeholder="L('Select')" v-model="Form1.ddlCauseType" disabled>
                                            <Option v-for="item in ddlCauseTypeList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="我方负" prop="ddlPercent" style="width: 100%">
                                        <Select :placeholder="L('Select')" v-model="Form1.ddlPercent" disabled>
                                            <Option value="0%">0%</Option>
                                            <Option value="10%">10%</Option>
                                            <Option value="20%">20%</Option>
                                            <Option value="30%">30%</Option>
                                            <Option value="40%">40%</Option>
                                            <Option value="50%">50%</Option>
                                            <Option value="60%">60%</Option>
                                            <Option value="70%">70%</Option>
                                            <Option value="80%">80%</Option>
                                            <Option value="90%">90%</Option>
                                            <Option value="100%">100%</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                            </Row>
                            </div>
                        </div>
                    </Panel>
                    <Panel name="2">
                        事故处理时信息
                        <div slot="content">
                           <Divider>处理进度</Divider>
                            <Row>
                                <Col span="24">
                                    <Table v-show="Form1.record" :columns="recordcolumns" border :data="dgdRecord"></Table>
                                </Col>
                            </Row>
                           <Divider>损失情况</Divider>
                            <Row style="padding-bottom:20px">
                                <Col span="24">
                                    <Table v-show="Form1.lossInfo" :columns="lossInfocolumns" border :data="dgdlossInfo"></Table>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="6">
                                    <FormItem label="交强险赔付金额" prop="txtInsurePFAmount" style="width: 100%">
                                        <InputNumber v-model="Form1.txtInsurePFAmount" style="width:100%" readonly></InputNumber>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="商业险赔付金额" prop="txtInsureDPFAmount" style="width: 100%">
                                        <InputNumber v-model="Form1.txtInsureDPFAmount" style="width:100%" readonly></InputNumber>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="18">
                                    <FormItem label="赔付备注" prop="txtSSPFRemark" style="width: 100%">
                                        <Input v-model="Form1.txtSSPFRemark" type="textarea" :autosize="{minRows: 3,maxRows: 5}" readonly></Input>
                                    </FormItem>
                                </Col>
                            </Row>
                        </div>
                    </Panel>
                    <Panel name="3">
                        提交资料及理赔情况
                        <div slot="content">
                          <Divider>提交材料</Divider>
                            <Row>
                                <Col span="24">
                                <FormItem label="" prop="chkTJMakeFile" style="width: 100%">
                                    <CheckboxGroup v-model="Form1.chkTJMakeFile">
                                        <Checkbox v-for="item in chkTJMakeFileList" :label="item.num" :key="item.num" disabled>{{item.itemName}}</Checkbox>
                                    </CheckboxGroup>
                                </FormItem>
                                </Col>
                            </Row>
                            <div v-show="DZFTJCL" style="margin-bottom:20px;">
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
                                        <label style="font-size:16px;text-align:center">{{DZFName}}</label>
                                    </Col>
                                    <Col span="18" style="border:inset 1px;height:45px">
                                        <CheckboxGroup v-model="Form1.DZFchkTJMakeFile" style="text-align:center">
                                                <Checkbox v-for="item in DZFchkTJMakeFileList" :label="item.num" :key="item.num" disabled>{{item.itemName}}</Checkbox>
                                        </CheckboxGroup>
                                    </Col>
                                </Row>
                            </div>
                            <Row>
                                <Col span="6">
                                    <FormItem label="理赔承办人" prop="ddltijiao" style="width: 100%">
                                        <Select :placeholder="L('Select')" v-model="Form1.ddltijiao" disabled>
                                            <Option v-for="item in ddltijiaoList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="提交时间" style="width: 100%">
                                        <DatePicker v-model="Form1.txttjDT" type="date" placeholder="选择日期" style="width: 60%" format="yyyy-MM-dd" readonly></DatePicker>&nbsp;&nbsp;
                                        <TimePicker v-model="ddlhour" format="HH:mm" placeholder="选择时间" style="width: 35%" readonly></TimePicker>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="接收人" prop="txtjieshou" style="width: 100%">
                                        <Input v-model="Form1.txtjieshou" readonly></Input>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="接收日期" prop="txtjsDT" style="width: 100%">
                                        <DatePicker v-model="Form1.txtjsDT" type="date" style="width: 100%" format="yyyy-MM-dd" readonly></DatePicker>
                                    </FormItem>
                                </Col>
                            </Row>
                          <Divider>缺件待补</Divider>
                            <Row v-show="QJDB">
                                <Col span="24">
                                <FormItem label="" prop="chkQJDBMakeFile" style="width: 100%">
                                    <CheckboxGroup v-model="Form1.chkQJDBMakeFile">
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
                                        <label style="font-size:16px;text-align:center">{{DZFName}}</label>
                                    </Col>
                                    <Col span="18" style="border:inset 1px;height:45px">
                                        <CheckboxGroup v-model="Form1.DZFchkQJDBMakeFile" style="text-align:center">
                                            <Checkbox v-for="item in DZFchkQJDBMakeFileList" :label="item.num" :key="item.num" disabled>{{item.itemName}}</Checkbox>
                                        </CheckboxGroup>
                                    </Col>
                                </Row>
                            </div>
                            <Row>
                                <Col span="24">
                                    <FormItem label="备注" prop="txtQuejianRemark" style="width: 100%">
                                        <Input v-model="Form1.txtQuejianRemark" type="textarea" :autosize="{minRows: 3,maxRows: 5}" readonly></Input>
                                    </FormItem>
                                </Col>
                            </Row>
                          <Divider>送件</Divider>
                            <Row>
                                <Col span="6">
                                    <FormItem label="送件人" prop="txtSUser" style="width: 100%">
                                        <Input v-model="Form1.txtSUser" readonly></Input>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="送件时间" prop="txtSDT" style="width: 100%">
                                        <DatePicker v-model="Form1.txtSDT" type="date" style="width: 100%" format="yyyy-MM-dd" readonly></DatePicker>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="送件说明" prop="txtSRemark" style="width: 100%">
                                        <Input v-model="Form1.txtSRemark" type="textarea" :autosize="{minRows: 3,maxRows: 5}" readonly></Input>
                                    </FormItem>
                                </Col>
                            </Row>
                          <Divider>赔付</Divider>
                            <Row style="padding-bottom:20px">
                                <Table v-show="Form1.pfDetail" :columns="PFDetailcolumns" border :data="dgdPFDetail"></Table>
                            </Row>
                            <Row>
                                <Col span="6">
                                    <FormItem label="转付承办人" prop="ddlZFContractors" style="width: 100%">
                                        <Select :placeholder="L('Select')" v-model="Form1.ddlZFContractors" disabled>
                                            <Option v-for="item in ddlZFContractorsList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="6">
                                    <FormItem label="交强险到账金额" prop="txtInsureDZAmount" style="width: 100%">
                                       <InputNumber v-model="Form1.txtInsureDZAmount" style="width:100%" readonly></InputNumber>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="交强险到账日期" prop="txtInsureDZDT" style="width: 100%">
                                        <DatePicker v-model="Form1.txtInsureDZDT" type="date" style="width: 100%" format="yyyy-MM-dd" readonly></DatePicker>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="交强险到账账户" prop="ddlInsureDZAccount" style="width: 100%">
                                        <Select :placeholder="L('Select')" v-model="Form1.ddlInsureDZAccount" disabled>
                                            <Option v-for="item in ddlInsureDZAccountList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="6">
                                    <FormItem label="商业险到账金额" prop="tztInsureDDZAmount" style="width: 100%">
                                       <InputNumber v-model="Form1.tztInsureDDZAmount" style="width:100%" readonly></InputNumber>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="商业险到账日期" prop="txtInsureDDZDT" style="width: 100%">
                                        <DatePicker v-model="Form1.txtInsureDDZDT" type="date" style="width: 100%" format="yyyy-MM-dd" readonly></DatePicker>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="商业险到账账户" prop="ddlInsureDDZAccount" style="width: 100%">
                                        <Select :placeholder="L('Select')" v-model="Form1.ddlInsureDDZAccount" disabled>
                                            <Option v-for="item in ddlInsureDDZAccountList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="6">
                                    <FormItem label="对肇方赔付金额" prop="txtDZFPFAmount" style="width: 100%">
                                       <InputNumber v-model="Form1.txtDZFPFAmount" style="width:100%" readonly></InputNumber>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="对肇方赔付日期" prop="txtDZFPFDT" style="width: 100%">
                                        <DatePicker v-model="Form1.txtDZFPFDT" type="date" style="width: 100%" format="yyyy-MM-dd" readonly></DatePicker>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="转付日期" prop="txtZhuanFu" style="width: 100%">
                                        <DatePicker v-model="Form1.txtZhuanFu" type="date" style="width: 100%" format="yyyy-MM-dd" readonly></DatePicker>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="18">
                                    <FormItem label="赔付备注" prop="txtDZPFRemark" style="width: 100%">
                                        <Input v-model="Form1.txtDZPFRemark" type="textarea" :autosize="{minRows: 3,maxRows: 5}" readonly></Input>
                                    </FormItem>
                                </Col>
                            </Row>
                          <Divider>案件补充说明</Divider>
                            <Row>
                                <Table v-show="Form1.supplement" :columns="Supplementcolumns" border :data="dgdSupplement"></Table>
                            </Row>
                          <Divider>资料</Divider>
                            <Divider orientation="left">事故影像/事故照片</Divider>
                            <Row v-show="upFile" style="margin-bottom:20px">
                                <Col span="12" style="margin-left:100px">
                                    <Table :columns="columnsFile" :no-data-text="L('NoDatas')" border :data="fileDetail">
                                    </Table>
                                </Col>
                            </Row>
                        </div>
                    </Panel>
                </Collapse>
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
    import CXLP from '@/store/entities/carInsurance/cxlp'
    import Axios from 'axios';
    import publicclass from '../../../lib/publicclass';
    import CXLPMaterial from '@/store/entities/carInsurance/cxlpMaterial'
    import CXLPDZF from '../../../store/entities/carInsurance/cxlpDZF';
    import CXLPRecord from '../../../store/entities/carInsurance/cxlpRecord';
    import CXLPFee from '../../../store/entities/carInsurance/cxlpFee';
    import CXLPPFDetail from '../../../store/entities/carInsurance/cxlpPFDetail';
    import CXLPSupplement from '../../../store/entities/carInsurance/cxlpSupplement';

    class PageItemCodeRequest extends PageRequest{
        maxResultCount=10000
        skipCount=0
        itemTypes:Array<number>
    }
    class PageBankTypeRequest extends PageRequest{
        maxResultCount=10000
        skipCount=0
    }
    class PageBankDetailRequest extends PageRequest{//银行明细
        keyword:string='';
        bankType:number=0;
        from:Date;
        to:Date;
    }
    class PageCXLPMaterialRequest extends PageRequest{
        maxResultCount=10000
        skipCount=0
        cxlpAuto:number=null;
        cxlpMaterialType:number=null;
    }
    class PageClasenRequest extends PageRequest{//车型
        maxResultCount=10000
        skipCount=0
    }
    class PageCustomerRequest extends PageRequest{
        maxResultCount=10000
        skipCount=0
        supplierAuto:any=0;
    }
    class PageCXLPDZFRequest extends PageRequest{//对肇方
        maxResultCount=10000
        skipCount=0
        cxlpAuto:any=0;
    }
    class PageCXLPRecordRequest extends PageRequest{//处理进度
        maxResultCount=10000
        skipCount=0
        cxlpAuto:any=0;
    }
    class PageCXLPFeeRequest extends PageRequest{//损失情况
        maxResultCount=10000
        skipCount=0
        cxlpAuto:any=0;
    }
    class PageCXLPPFDetailRequest extends PageRequest{
        maxResultCount=10000
        skipCount=0
        cxlpAuto:any=0;
    }
    class PageCXLPSupplementRequest extends PageRequest{//案件补充
        maxResultCount=10000
        skipCount=0
        cxlpAuto:any=0;
    }
    class PageCarBaseRequest extends PageRequest{
        keyword:string='';
        from:Date;
        to:Date;
        makNo:string=null;
    }
    class PageCXLPRequest extends PageRequest{
        maxResultCount=10000
        skipCount=0
        makNo:any=null;
        caseTime:any=null;
    }
    class PageCarMemoRequest extends PageRequest{
        maxResultCount=10000;
        skipCount=0;
        carMakNo:string=null;
    }
    class PageInsurancePolicyRequest extends PageRequest{
        carBaseIds:Array<any>;
        insurancePolicyType:any=null;
    }
    class PageOrderRentRequest extends PageRequest{
        maxResultCount=10000
        skipCount=0
        tradeItemAuto:any=null;
    }

    @Component({
        components:{}
    })
    export default class EditCXLP extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        cxlp:CXLP=new CXLP();
        pageItemCodeRequest:PageItemCodeRequest=new PageItemCodeRequest();//类别明细
        pageBankTypeRequest:PageBankTypeRequest=new PageBankTypeRequest();//银行类别
        pageBankDetailRequest:PageBankDetailRequest=new PageBankDetailRequest();//银行明细
        pageCXLPMaterialRequest:PageCXLPMaterialRequest = new PageCXLPMaterialRequest();//附件
        pageClasenRequest:PageClasenRequest=new PageClasenRequest();//车型
        pageCustomerRequest:PageCustomerRequest=new PageCustomerRequest();//客户
        pageCXLPDZFRequest:PageCXLPDZFRequest=new PageCXLPDZFRequest();//对肇方
        pageCXLPRecordRequest:PageCXLPRecordRequest=new PageCXLPRecordRequest();//处理进度
        pageCXLPFeeRequest:PageCXLPFeeRequest=new PageCXLPFeeRequest();//损失情况
        pageCXLPPFDetailRequest:PageCXLPPFDetailRequest=new PageCXLPPFDetailRequest();//赔付账户明细
        pageCXLPSupplementRequest:PageCXLPSupplementRequest=new PageCXLPSupplementRequest();//案件补充
        pageCarBaseRequest:PageCarBaseRequest=new PageCarBaseRequest();
        pageCXLPRequest:PageCXLPRequest=new PageCXLPRequest();
        pageCarMemoRequest:PageCarMemoRequest=new PageCarMemoRequest();
        pageInsurancePolicyRequest:PageInsurancePolicyRequest=new PageInsurancePolicyRequest();
        pageOrderRentRequest:PageOrderRentRequest=new PageOrderRentRequest();//欠租
        //
         collapsevalue:any=[1,2,3];//折叠面板  
         spinShow=true;//加载动画
         caseType:any=null;//案件类别
         caseStatus:any=null;//案件处理状态
         causeType:any=null;//事故类型
         TJMakeFile:any=null;//提交材料
         lpagent:any=null;//理赔承办人
         ZFContractors:any=null;//转付承办人
         QJDBMakeFile:any=null;//缺件待补
         InsureDZAccount:any=null;//交强险到账账户
         InsureDDZAccount:any=null;//商业险到账账户
         DZFcauseType:any=null;//肇责情况（对肇方）
         bankchklist:any=false;
         DZFTJCL:boolean=false;//对肇方提交材料
         DZFQJDB:boolean=false;//对肇方缺件待补
         DZFName:any='';
         carBaseAuto:any=0;//车籍编号
         DZF:boolean=false;//对肇方(多方)v-show
         dgdRecord:any=[];//处理进度明细列表
         dgdlossInfo:any=[];//损失情况明细列表
         dgdPFDetail:any=[];//赔付明细列表
         dgdSupplement:any=[];//案件补充明细列表
         dgdDZFList:any=[];//对肇方信息列表
         gdCarMemo:any=[];//车辆备注明细列表
         caseInfo:any=[];//同一辆车当天出险明细
         clasenlist:any=[];//车型
         ddlhour:any='';//提交时间 时间
         DZFTJCLFile:any='';//对肇方提交材料
         DZFQJDBFile:any='';//对肇方缺件待补
         insureAuto:any=0;//保险编号
         Index=null;
         CXLPAuto:any=null;
         QJDB:boolean=true;

        Form1={
            id:0,
            ddlCaseType:0,//案件类别
            ddlCaseStatus:0,//处理状态
            txtyjdt:null,//已决日期
            txtEndDT:null,//结案日期
            txtMakNO:'',//车号
            txtCaseTime:null,//出险时间
            lblClasenName:'',//车型
            lblTenant:'',//车辆承租人
            lblSaleName:'',//承办业代
            lblInsureNo:'',//交强险保单号码
            lblInsureINC:'',//交强险保险公司
            lblInsureDINC:'',//商业险保险公司
            lblInsureDNo:'',//商业险保单号
            lblBankNmNo:'',//开户行及账号
            lblMemo:'',//车辆备注
            lblQZ:'',//欠租
            txtCaseAddr:'',//出险地点
            txtDriver:'',//驾驶人
            txtReporter:'',//报案人
            txtPhone1:'',//电话1
            txtPhone2:'',//电话2
            ddlAccidentType:'',//事故方 单方/多方
            ddlIsInjured:'',//是否伤人
            ddlCauseTypeN:0,////事故类型 划痕...
            txtOtherRemark:'',//备注
            ddlCauseType:0,//肇责情况
            ddlPercent:'0%',//我方负
            txtInsurePFAmount:0,//交强险赔付金额
            txtInsureDPFAmount:0,//商业险赔付金额
            txtSSPFRemark:'',//赔付备注
            chkTJMakeFile:[],//提交材料
            ddltijiao:0,//理赔承办人
            txttjDT:null,//提交时间 日期
            txtjieshou:'',//接收人
            txtjsDT:null,//接收日期
            chkQJDBMakeFile:[],//缺件待补
            txtQuejianRemark:'',//备注
            txtSUser:'',//送件人
            txtSDT:null,//送件时间
            txtSRemark:'',//送件说明
            ddlZFContractors:0,//转付承办人
            txtInsureDZAmount:0,//交强险到账金额
            txtInsureDZDT:null,//交强险到账日期
            ddlInsureDZAccount:0,//交强险到账账户
            tztInsureDDZAmount:0,//商业险到账金额
            txtInsureDDZDT:null,//商业险到账日期
            ddlInsureDDZAccount:0,//商业险到账账户
            txtDZFPFAmount:0,//对肇方赔付金额
            txtDZFPFDT:null,//对肇方赔付日期
            txtZhuanFu:null,//转付日期
            txtDZPFRemark:'',//赔付备注
            DZFchkTJMakeFile:[],//对肇方材料提交
            DZFchkQJDBMakeFile:[],//对肇方缺件待补
        //
            carMakNoList:false,//是否显示 当天出险明细
            carMemo:false,//车辆备注v-show
            record:false,//处理进度v-show
            lossInfo:false,//损失情况v-show
            //DZF:false,//对肇方(多方)v-show
            dgdDZF:false,//对肇方信息v-show
            supplement:false,//案件补充v-show
            pfDetail:false,//赔付明细v-show

        }
        save(){
            (this.$refs.cxlpForm as any).validate(async (valid:boolean)=>{
                if(valid){
                    this.clearTable();//清空
                    (this.$refs.cxlpForm as any).resetFields();
                    this.$emit('save-success');
                    this.$emit('input',false);
                }
            })
        }
        visibleChange(value:boolean){
            if(!value){
                this.$emit('input',value);
            }else{
                this.getList();
            }
        }
        // 
            get ddlCaseTypeList(){//案件类别
                return this.caseType;
            }
            get ddlCaseStatusList(){//案件处理状态
                return this.caseStatus;
            }
            get ddlCauseTypeNList(){//事故类型
                return this.causeType;
            }
            get ddlCauseTypeList(){//肇责情况
                return this.DZFcauseType;
            }
            get ddltijiaoList(){//理赔承办人
                return this.lpagent;
            }
            get ddlZFContractorsList(){//转付承办人
                return this.ZFContractors;
            }
            get ddlInsureDZAccountList(){//交强险到账账户
                return this.InsureDZAccount;
            }
            get ddlInsureDDZAccountList(){//商业险到账账户
                return this.InsureDDZAccount;
            }
            get chkTJMakeFileList(){//提交材料
                return this.TJMakeFile;
            }
            get chkQJDBMakeFileList(){//缺件待补
                return this.QJDBMakeFile;
            }
            get DZFchkTJMakeFileList(){//对肇方提交材料
                return this.TJMakeFile;
            }
            get DZFchkQJDBMakeFileList(){//对肇方缺件待补
                return this.QJDBMakeFile;
            }
        async getList(){
            //案件类别
            this.pageItemCodeRequest.itemTypes = [1309];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                this.caseType = res.items
            })
            //案件处理状态
            this.pageItemCodeRequest.itemTypes = [848];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                this.caseStatus = res.items;
            })
            //事故类型
            this.pageItemCodeRequest.itemTypes = [842];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                this.causeType = res.items;
            })
            //提交材料
            this.pageItemCodeRequest.itemTypes = [859];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                this.TJMakeFile = res.items
            })
            //理赔承办人
            this.pageItemCodeRequest.itemTypes = [851];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                this.lpagent = res.items
            })
            //转付承办人
            this.pageItemCodeRequest.itemTypes = [851];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                this.ZFContractors = res.items
            })
            //缺件待补
            this.pageItemCodeRequest.itemTypes = [859];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                this.QJDBMakeFile = res.items
            })
            //交强险到账账户
            this.pageItemCodeRequest.itemTypes = [869];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                this.InsureDZAccount = res.items
            })
            //商业险到账账户
            this.pageItemCodeRequest.itemTypes = [869];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                this.InsureDDZAccount = res.items
            })
            //肇责情况
            this.pageItemCodeRequest.itemTypes = [843];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                this.DZFcauseType = res.items
            })
            //车型
            await this.$store.dispatch({
                type:'clasen/GetAll',
                data:this.pageClasenRequest
            }).then(res=>{
                this.clasenlist=res.items;
            })
        }
        /**该车当天的出险记录列表 */
            carMastercolumns=[{
                title:'车号',
                key:'makNo',
                align:'center'
            },{
                title:'出险时间',
                key:'caseTime',
                align:'center'
            },{
                title:'出险编号',
                key:'cxlpno',
                align:'center'
            }]
        /**车辆备注明细列表 */
            carMemocolumns=[{
                title:'申购单号',
                key:'Order_Auto',
                align:'center'
            },{
                title:'备注内容',
                key:'carmemotext',
                align:'center'
            }]
        async getInsure(){
            //查询商业险
            this.pageInsurancePolicyRequest.carBaseIds=[this.carBaseAuto];
            this.pageInsurancePolicyRequest.insurancePolicyType=null;
            await this.$store.dispatch({
                type:'insurancePolicy/getAll',
                data:this.pageInsurancePolicyRequest
            }).then(res=>{//数据都相同，只取第一条数据
                if(res.items[0].insurancePolicyType>0&&res.items[0].insurancePolicyStatus!=-10){
                    this.Form1.lblInsureDINC=res.items[0].supplier.sname;//商业险保险公司
                    this.Form1.lblInsureDNo=res.items[0].insuranceNum;//商业险保单号
                }
            })
        }
        //获取车辆备注信息
        async getCarRemark(){
            this.pageCarMemoRequest.carMakNo=this.Form1.txtMakNO;
            await this.$store.dispatch({
                type:'carMemo/getAll',
                data:this.pageCarMemoRequest
            }).then(res=>{
                if(res.items.length>0){
                    this.Form1.carMemo=true;
                    this.gdCarMemo=res.items;//给车辆备注信息列表赋值
                }else{
                    this.Form1.carMemo=false;
                    this.gdCarMemo=[];
                }
            })
        }
        //查询是否欠租
        async getOrderRent(id){
            //判断是否欠租（需要用到Order_Auto）
                this.pageOrderRentRequest.tradeItemAuto=id;
                this.$store.dispatch({
                    type:'orderRent/getAll',
                    data:this.pageOrderRentRequest
                }).then(res=>{
                    var num=0;
                    res.items.map(i=>{
                        if(new Date(new Date(i.ARDT).toLocaleDateString())<new Date(new Date(this.Form1.txtCaseTime).toLocaleDateString())&&
                        ((i.InComeDT==null)||(i.InComeDT!=null&&i.ARAmt<i.TaxAmT)||i.InComeMDT>new Date(new Date(this.Form1.txtCaseTime).toLocaleDateString())&&i.ARAmt>=i.TaxAmT)){      
                            num+=num;
                            
                        }
                    })
                    if(num!=0){
                        this.Form1.lblQZ='欠租 '+num+' 期';
                    }else{
                        this.Form1.lblQZ='无欠租';
                    }
                })
        }
        async getOther(){
            //查询商业险
            this.pageInsurancePolicyRequest.carBaseIds=[this.carBaseAuto];
            this.pageInsurancePolicyRequest.insurancePolicyType=0;
            await this.$store.dispatch({
                type:'insurancePolicy/getAll',
                data:this.pageInsurancePolicyRequest
            }).then(res=>{
                if(res.items.length>0){
                    res.items.map(i=>{
                        this.insureAuto=i.id;
                        this.Form1.lblInsureNo=i.insuranceNum;//交强险保单号码
                        if(i.supplier!=null){
                            this.Form1.lblInsureINC=i.supplier.sname;//交强险保险公司
                        }
                        //判断是否再保险期内
                        if((new Date(new Date(this.Form1.txtCaseTime).toLocaleDateString())<=new Date(new Date(i.endTime).toLocaleDateString())&&
                        new Date(new Date(this.Form1.txtCaseTime).toLocaleDateString())>=new Date(new Date(i.startTime).toLocaleDateString()))&&i.insurancePolicyStatus!=-10&&i.insurancePolicyType==0){
                            if(i.supplier!=null){ 
                                this.Form1.lblTenant=i.supplier.sname;//车辆承租人
                                this.getbankAccunt(i.supplier.tradeItemAuto);//开户行及账号
                                //this.getOrderRent(i.supplier.tradeItemAuto);//查询是否欠租（需要根据Order_Auto查询）
                            }
                            // this.Form1.lblMemo=;//车辆备注（需要用到Order表 暂时不写）
                            // this.Form1.lblSaleName=;//承办业代(去掉)
                        }
                    })
                }                
            })
        }
        //获取开户行及账号
        async getbankAccunt(id){
            this.pageCustomerRequest.supplierAuto=id;
                await this.$store.dispatch({
                    type:'customer/getAll',
                    data:this.pageCustomerRequest
                }).then(res=>{
                    if(res.items.length>0){
                        res.items.map(i=>{
                            this.Form1.lblBankNmNo=i.taxbanknm+' '+i.taxbankno;//开户行及账号
                        })
                    }
                })
        }
        //清空表格
        clearTable(){
            this.Form1.carMakNoList=false;//当天相同的出险记录
            this.caseInfo=[];
            this.Form1.carMemo=false;//车辆备注v-show
            this.gdCarMemo=[];
            this.DZF=false;//对肇方v-show
            this.Form1.dgdDZF=false;//对肇方Table v-show
            this.dgdDZFList=[];
            this.Form1.record=false;//处理进度v-show
            this.dgdRecord=[];
            this.Form1.lossInfo=false;//损失情况v-show
            this.dgdlossInfo=[];
            this.DZFTJCL=false;//对肇方提交材料v-show
            this.DZFQJDB=false;//对肇方缺件待补v-show
            this.Form1.pfDetail=false;//赔付明细v-show
            this.dgdPFDetail=[];
            this.Form1.supplement=false;//案件补充v-show
            this.dgdSupplement=[];
            this.Form1.id=0;
            this.Form1.ddlCaseType=0;;//案件类别
            this.Form1.ddlCaseStatus=0;//处理状态
            this.Form1.txtyjdt='';//已决日期
            this.Form1.txtEndDT='';//结案日期
            this.Form1.txtMakNO='';//车号
            this.Form1.txtCaseTime='';//出险时间
            this.Form1.lblClasenName='';//车型
            this.Form1.lblTenant='';//车辆承租人
            this.Form1.lblSaleName='';//承办业代
            this.Form1.lblInsureNo='';//交强险保单号码
            this.Form1.lblInsureINC='';//交强险保险公司
            this.Form1.lblInsureDINC='';//商业险保险公司
            this.Form1.lblInsureDNo='';//商业险保单号
            this.Form1.lblBankNmNo='';//开户行及账号
            this.Form1.lblMemo='';//车辆备注
            this.Form1.lblQZ='';//欠租
            this.Form1.txtCaseAddr='';//出险地点
            this.Form1.txtDriver='';//驾驶人
            this.Form1.txtReporter='';//报案人
            this.Form1.txtPhone1='';//电话1
            this.Form1.txtPhone2='';//电话2
            this.Form1.ddlAccidentType='';//事故方 单方/多方
            this.Form1.ddlIsInjured='';//是否伤人
            this.Form1.ddlCauseTypeN=0;//事故类型 划痕...
            this.Form1.txtOtherRemark='';//备注
            this.Form1.ddlCauseType=0;//肇责情况
            this.Form1.ddlPercent='0%';//我方负
            this.Form1.txtInsurePFAmount=0;//交强险赔付金额
            this.Form1.txtInsureDPFAmount=0;//商业险赔付金额
            this.Form1.txtSSPFRemark='';//赔付备注
            this.Form1.chkTJMakeFile=[];//提交材料
            this.Form1.ddltijiao=0;//理赔承办人
            this.Form1.txttjDT='';//提交时间 日期
            this.Form1.txtjieshou='';//接收人
            this.Form1.txtjsDT='';//接收日期
            this.Form1.chkQJDBMakeFile=[];//缺件待补
            this.Form1.txtQuejianRemark='';//备注
            this.Form1.txtSUser='';//送件人
            this.Form1.txtSDT='';//送件时间
            this.Form1.txtSRemark='';//送件说明
            this.Form1.ddlZFContractors=0;//转付承办人
            this.Form1.txtInsureDZAmount=0;//交强险到账金额
            this.Form1.txtInsureDZDT='';//交强险到账日期
            this.Form1.ddlInsureDZAccount=0;//交强险到账账户
            this.Form1.tztInsureDDZAmount=0;//商业险到账金额
            this.Form1.txtInsureDDZDT='';//商业险到账日期
            this.Form1.ddlInsureDDZAccount=0;//商业险到账账户
            this.Form1.txtDZFPFAmount=0;//对肇方赔付金额
            this.Form1.txtDZFPFDT='';//对肇方赔付日期
            this.Form1.txtZhuanFu='';//转付日期
            this.Form1.txtDZPFRemark='';//赔付备注
            this.Form1.DZFchkTJMakeFile=[];//对肇方材料提交
            this.Form1.DZFchkQJDBMakeFile=[];//对肇方缺件待补
            this.ddlhour='';
        }
        
    /**填充数据 */
     async SetData(data,index){
        this.spinShow=true;
        await this.getList();
        this.Index=index;
        this.Form1=data;
        await this.DataCXLP(data);//赋值
        if(data.accidentType==2){
            this.DZF=true;//显示对肇方
            //显示对肇方的提交材料和缺件待补
            this.DZFTJCL=true;
            this.DZFQJDB=true;
        }else{
            this.DZF=false;
            this.DZFTJCL=false;
            this.DZFQJDB=false;
        }
        this.spinShow=false;//加载动画
    }
    /**-----------------赋值-------------------- */
        //取到值赋到页面
        async DataCXLP(data){
            this.Form1.id=data.id;
            this.carBaseAuto=data.carBaseAuto;
            this.Form1.ddlCaseType=data.caseType;//案件类别
            this.Form1.ddlCaseStatus=data.caseStatus;//案件处理状态
            this.Form1.txtyjdt=data.yiJueDT;//已决日期
            this.Form1.txtEndDT=data.endDt;//结案日期
            this.Form1.txtMakNO=data.makNo;//车号
            this.Form1.txtCaseTime=data.caseTime;//出险时间
            this.Form1.txtCaseAddr=data.caseAddr;//出险地点
            this.Form1.txtDriver=data.driver;//驾驶人
            this.Form1.txtReporter=data.reporter;//报案人
            this.Form1.txtPhone1=data.phone1;//电话1
            this.Form1.txtPhone2=data.phone2;//电话2
            // 事故方
            if(data.accidentType==1){
                this.Form1.ddlAccidentType='1';
            }else if(data.accidentType==2){
                this.Form1.ddlAccidentType='2';
            }else{
                this.Form1.ddlAccidentType='0';
            }
            //是否伤人
            if(data.isInjured==1){
                this.Form1.ddlIsInjured='1';
            }else if(data.isInjured==2){
                this.Form1.ddlIsInjured='2';
            }else{
                this.Form1.ddlIsInjured='0';
            }
            this.Form1.txtOtherRemark=data.lossOtherRemark;//备注
            this.Form1.ddlCauseType=data.causeType;//肇责情况
            this.Form1.ddlPercent=data.wfPercent.trim();//去空格
            this.Form1.txtInsurePFAmount=data.insurePFAmount;//交强险赔付金额
            this.Form1.txtInsureDPFAmount=data.insureDPFamount;//商业险赔付金额
            this.Form1.txtSSPFRemark=data.sspfRemark;//赔付备注
            this.Form1.ddltijiao=Number(data.tijiaoren);//理赔承办人 
            this.Form1.txttjDT=data.tijiaoDt;//提交日期
            this.ddlhour=data.hh+':'+data.mm;//提交时间 （数据库两个字段需要转换拼接）
            this.Form1.txtjieshou=data.jieshouren;//接收人
            this.Form1.txtjsDT=data.jieshouDt;//接收时间
            this.Form1.txtQuejianRemark=data.qjdbRemark;//备注
            this.Form1.txtSUser=data.sUser;//送件人
            this.Form1.txtSDT=data.sdt;//送件时间
            this.Form1.txtSRemark=data.sRemark;//送件说明 
            this.Form1.ddlZFContractors=data.zfContractors;//转付承办人
            this.Form1.txtInsureDZAmount=data.insureDZAmount;//交强险到账金额
            this.Form1.txtInsureDZDT=data.insureDZDT;//交强险到账日期
            this.Form1.ddlInsureDZAccount=Number(data.insureDZAccount);//交强险到账账户
            this.Form1.tztInsureDDZAmount=data.insureDDZAmount;//交强险到账金额
            this.Form1.txtInsureDDZDT=data.insureDDZDT;//商业险到账日期
            this.Form1.ddlInsureDDZAccount=Number(data.insureDDZAccount);//商业险到账账户
            this.Form1.txtDZFPFAmount=data.dzfpfAmount;//对肇方赔付金额
            this.Form1.txtDZFPFDT=data.dzfpfdt;//对肇方赔付日期
            this.Form1.txtZhuanFu=data.zhuanFuDT;//转付日期
            this.Form1.txtDZPFRemark=data.dzpfRemark;//赔付备注
            this.Form1.ddlCauseTypeN=data.lossValueN;//事故类型
            this.Form1.lblInsureDINC=data.insureDName;//商业险保险公司
            this.Form1.lblInsureDNo=data.insureDNo;//商业险保单号
            this.Form1.chkTJMakeFile=this.getCLTJToCXLP(data.tjclFile);//提交材料
            this.Form1.chkQJDBMakeFile=this.getCLTJToCXLP(data.qjdbFile);//缺件待补
            if(this.Form1.chkQJDBMakeFile.length>0){
                this.QJDB=true;
            }else{
                this.QJDB=false;
            }
            //车型
             this.clasenlist.map(i=>{
                 if(data.carBase!=null){
                    if(i.id==data.carBase.clasenAuto){
                        this.Form1.lblClasenName=i.clasenName;
                    }
                 }else{
                     this.Form1.lblClasenName='';
                 }
            })
            //查询是否欠租、车辆承租人、开户行及账号、交强险保险公司、交强险保单号码
            await this.getOther();
            //附件
            await this.getFileUpload(data.id);
            //对肇方
            await this.getDZFDetail(data.id);
            //处理进度
            await this.getRecordDetail(data.id);
            //损失情况
            await this.getFeeDetail(data.id);
            //第三方资料绑定
            this.Form1.DZFchkTJMakeFile=this.getCLTJToCXLP(this.DZFTJCLFile);//对肇方提交材料
            this.Form1.DZFchkQJDBMakeFile=this.getCLTJToCXLP(this.DZFQJDBFile);//对肇方缺件待补
            if(this.Form1.DZFchkQJDBMakeFile.length>0){
                this.DZFQJDB=true;
            }else{
                this.DZFQJDB=false;
            }
            //赔付账户明细
            this.getPFList(data.id);
            //案件补充说明
            this.getSupplementDetail(data.id)
        }
        //材料提交赋值到页面
        getCLTJToCXLP(allvalue){
            var svaluelist=[];
            for (let i = 0; i < this.TJMakeFile.length; i++) {
                const svalue = this.TJMakeFile[i].num;
                if ((allvalue & svalue) == svalue){//获取提交材料值的总和里面包括的哪些材料
                    svaluelist.push(svalue);
                }
            }
            return svaluelist;
        }
        //获取材料之和
        getMakeFile(data){
            var svalue=0;
            for (let i = 0; i < data.length; i++) {
                svalue += data[i];
            }
            return svalue;
        }
    /**-----------------对肇方------------------ */
        //选中数据获取对肇方明细
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
                        this.DZFTJCLFile=i.tjclfile;//提交材料
                        this.DZFQJDBFile=i.qjdbfile;//缺件待补
                        return{
                            id:i.id,
                            ddlDZF:i.dzftype,//对肇方（多方）
                            dzfTypeName:i.dzfTypeItemCode.itemName,//对肇方名称
                            isInjured:i.isInjured,//是否伤人（对肇方）
                            makNO:i.makNo,//车牌号（对肇方）
                            clasenName:i.clasenName,//车型（对肇方）
                            iNSINC:i.insinc,//承保公司（对肇方）
                            owner:i.owner,//车主（对肇方）
                            driver:i.driver,//驾驶员（对肇方）
                            phone:i.phone,//联系电话（对肇方）
                            dzfWXC:i.dzfwxc,//维修厂（对肇方）
                            remark:i.remark,//备注（对肇方）
                            cdt:i.cdt,
                            mdt:i.mdt
                        }
                    })
                    this.dgdDZFList=a;
                    this.Form1.dgdDZF=true;
                }else{
                    this.Form1.dgdDZF=false;
                }
            })
        }
        dgdDZFcolumns=[{
                title:'第几方',
                key:'dzfTypeName',
                align:'center',
                tooltip:true
            },{
                title:'是否伤人',
                align:'center',
                tooltip:true,
                render:(h:any,params:any)=>{
                    var name='';
                    if(params.row.isInjured==1){
                        name='是'
                    }
                    else if(params.row.isInjured==2){
                        name='否'
                    }
                    return h('span',name)
                }
            },{
                title:'车牌',
                key:'makNO',
                align:'center',
                tooltip:true
            },{
                title:'车型',
                key:'clasenName',
                align:'center',
                tooltip:true
            },{
                title:'承保公司',
                key:'iNSINC',
                align:'center',
                tooltip:true
            },{
                title:'车主',
                key:'owner',
                align:'center',
                tooltip:true
            },{
                title:'驾驶员',
                key:'driver',
                align:'center',
                tooltip:true
            },{
                title:'联系电话',
                key:'phone',
                align:'center',
                tooltip:true
            },{
                title:'维修厂',
                key:'dzfWXC',
                align:'center',
                tooltip:true
            },{
                title:'备注',
                key:'remark',
                align:'center',
                tooltip:true
            }]
    /**-----------------处理进度---------------- */
        //选中数据获取处理进度明细
        async getRecordDetail(id){
            this.pageCXLPRecordRequest.cxlpAuto=id;
            await this.$store.dispatch({
                type:'cxlpRecord/getAll',
                data:this.pageCXLPRecordRequest
            }).then(res=>{
                if(res.items.length>0){
                        var a=res.items.map(i=>{
                            return{
                                id:i.id,
                                recordContent:i.recordContent,//记录内容
                                caseDealWay:i.caseDealWay,//处理方法
                                caseDealWayName:i.caseDealWayItemCode.itemName,//处理方法
                                contractors:i.contractors,//承办人
                                contractorsName:i.contractorsItemCode.itemName,//承办人
                                cdt:i.cdt,
                                mdt:i.mdt,
                            }
                        })
                    this.dgdRecord=a;
                    this.Form1.record=true;
                }else{
                    this.Form1.record=false;
                }
            })
        }
        recordcolumns=[{
                title:'处理进度内容',
                key:'recordContent',
                tooltip:true,
                align:'center'
            },{
                title:'处理方法',
                key:'caseDealWayName',
                tooltip:true,
                align:'center'
            },{
                title:'承办人',
                key:'contractorsName',
                tooltip:true,
                align:'center'
            }]
    /**-----------------损失情况---------------- */
        //选中数据获取损失情况明细
        async getFeeDetail(id){
            this.pageCXLPFeeRequest.cxlpAuto=id;
            await this.$store.dispatch({
                type:'cxlpFee/getAll',
                data:this.pageCXLPFeeRequest
            }).then(res=>{
                if(res.items.length>0){
                    var a = res.items.map(i=>{
                        return{
                            id:i.id,
                            feeOtherRemark:i.feeOtherRemark,//其他备注
                            feeAmount:i.feeAmount,//金额
                            dzfType:i.dzftype,//对肇方
                            dzfTypeName:i.dzfTypeItemCode.itemName,//对肇方名称
                            feeType:i.feeType,//费用别
                            feeTypeName:i.feeTypeItemCode.itemName,//费用别名
                            cdt:i.cdt,
                            mdt:i.mdt,
                        }
                    })
                    this.dgdlossInfo=a;
                    this.Form1.lossInfo=true;
                }else{
                    this.Form1.lossInfo=false;
                }
            })
        }
        lossInfocolumns=[{
                title:'第几方',
                key:'dzfTypeName',
                align:'center',
                tooltip:true
            },{
                title:'费用别',
                key:'feeTypeName',
                align:'center',
                tooltip:true
            },{
                title:'金额',
                key:'feeAmount',
                align:'center',
                tooltip:true
            },{
                title:'其他备注',
                key:'feeOtherRemark',
                align:'center',
                tooltip:true
            }]
    /**-----------------赔付明细---------------- */
        //选中数据获取赔付账户明细
        async getPFList(id){
            this.pageCXLPPFDetailRequest.cxlpAuto=id;
            // this.pageCXLPPFDetailRequest.accountName=null;
            await this.$store.dispatch({
                type:'cxlpPFDetail/getAll',
                data:this.pageCXLPPFDetailRequest
            }).then(res=>{
                if(res.items.length>0){
                    var a = res.items.map(i=>{
                        return{
                            id:i.id,
                            accountName:i.accountName,//账户名称
                            ddlAccountName:0,//
                            bankAccount:i.bankAccount,//银行账号
                            ddlBankAccount:0,//
                            ddlBankType:i.bankType,//银行别
                            bankTypeName:i.bankTypeData.bankNameT,//银行别名称
                            acountBank:i.acountBank,//开户行 
                            ddlBankName:0,//
                            txtbankQuery:0,//银行搜索
                            pfAmt:i.pfamt,//赔付金额
                        }
                    })
                    this.dgdPFDetail=a;
                    this.Form1.pfDetail=true;
                }else{
                    this.Form1.pfDetail=false;
                    this.dgdPFDetail=[];
                }
            })
        }
        PFDetailcolumns=[{
                title:'账户名称',
                key:'accountName',
                tooltip:true,
                align:'center'
            },{
                title:'开户行',
                key:'acountBank',
                tooltip:true,
                align:'center'
            },{
                title:'银行账户',
                key:'bankAccount',
                tooltip:true,
                align:'center'
            },{
                title:'赔付金额',
                key:'pfAmt',
                tooltip:true,
                align:'center'
            },{
                title:'银行别',
                key:'bankTypeName',
                tooltip:true,
                align:'center'
            }]
    /**-----------------案件补充---------------- */
        //选中数据获取案件补充明细
        async getSupplementDetail(id){
            this.pageCXLPSupplementRequest.cxlpAuto=id;
            await this.$store.dispatch({
                type:'cxlpSupplement/getAll',
                data:this.pageCXLPSupplementRequest
            }).then(res=>{
                if(res.items.length>0){
                    var a = res.items.map(i=>{
                        return{
                            id:i.id,
                            supplementContent:i.supplementContent,//补充说明
                            contractors:i.contractors,//承办人
                            contractorsName:i.contractorsItemCode.itemName,//承办人名
                            cuser:i.cUser,
                            cdt:i.cdt,
                            mdt:i.mdt,
                            muser:i.mUser
                        }
                    })
                    this.dgdSupplement=a;
                    this.Form1.supplement=true;
                }else{
                    this.Form1.supplement=false;
                }
            })
        }
        Supplementcolumns=[{
                title:'补充说明内容',
                key:'supplementContent',
                tooltip:true,
                align:'center'
            },{
                title:'承办人',
                key:'contractorsName',
                tooltip:true,
                align:'center'
            }] 
    /**-----------------附件---------------- */
        fileDetail:any=[];//附件列表
        upFile:boolean=false;//显示附件
        listfile:any=[]
        //查询附件
         async getFileUpload(id){
            this.listfile=[];
            this.pageCXLPMaterialRequest.cxlpAuto=id;
            await this.$store.dispatch({
                type:'cxlpMaterial/getAll',
                data:this.pageCXLPMaterialRequest
            }).then(res=>{
                if(res.items.length>0){
                    res.items.map(i=>{
                        this.listfile.push(i)
                        this.upFile=true;//显示附件列表
                    })
                    this.fileDetail=this.listfile;
                }
                else{
                    this.upFile=false;//隐藏附件列表
                    this.fileDetail=[];
                }
            })
         }
        /**附件显示列表 */
         columnsFile=[{
                title:'附件名称',
                key:'oldFileName',
            },{
                title:this.L('Actions'),
                key:'Actions',
                align: 'center',
                width:100,
                render:(h:any,params:any)=>{
                    return h('div',[
                        h('Button',{
                            props:{
                                type:'primary',
                                size:'small',
                            },
                            on:{
                                click:()=>{
                                    window.open(params.row.cxlpMaterialURL);
                                }
                            }
                        },this.L('查看附件'))
                    ])
                }
        }]
    }
</script>

<style scoped>
/* 假如内容过长，一屏放不下，滚动条下拉覆盖不全 */
.ivu-spin-fix {
    position: fixed;
}
</style>
