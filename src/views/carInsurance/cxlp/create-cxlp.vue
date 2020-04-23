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
            <Form ref="cxlpForm" :rules="checkForm" :label-width="110" :model="Form1">
               <Divider>案件信息</Divider>
                <Row>
                    <Col span="6">
                        <FormItem label="案件类别" prop="ddlCaseType" style="width: 100%">
                            <Select :placeholder="L('Select')" v-model="Form1.ddlCaseType">
                                <Option v-for="item in ddlCaseTypeList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="案件处理状态" prop="ddlCaseStatus" style="width: 100%">
                            <Select :placeholder="L('Select')" v-model="Form1.ddlCaseStatus">
                                <Option v-for="item in ddlCaseStatusList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="已决日期" prop="txtyjdt" style="width: 100%">
                            <DatePicker v-model="Form1.txtyjdt" type="date" style="width: 100%"></DatePicker>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="结案日期" prop="txtEndDT" style="width: 100%">
                            <DatePicker v-model="Form1.txtEndDT" type="date" style="width: 100%"></DatePicker>
                        </FormItem>
                    </Col>
                </Row>
               <Collapse v-model="Form1.value1">
                    <Panel name="1">
                        事故发生时受理信息
                        <div slot="content">
                          <Divider>基本数据</Divider>
                            <Row>
                                <Col span="6">
                                    <FormItem label="车号" prop="txtMakNO" style="width: 100%">
                                        <Input v-model="Form1.txtMakNO" @on-blur="makNochange"></Input>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="出险时间" prop="txtCaseTime" style="width: 100%">
                                        <DatePicker v-model="Form1.txtCaseTime" type="date" style="width: 100%" @on-change="caseTimechange"></DatePicker>
                                    </FormItem>
                                </Col>
                                <Col span="6" style="margin-left:100px">
                                    <check-Insure v-model="checkModalShow" :carbaseId="carbaseId" :caseTimeCXLP="caseTimeCXLP"></check-Insure>
                                    <Button type="primary" ghost @click="chackInsure">查看保险</Button>
                                </Col>
                            </Row>
                            <Row v-show="Form1.carMakNoList">
                                <Col span="12" style="margin-left:100px">
                                    <label style="color:red;">该车出险同天系统中还存在以下出险数据,请确认是否重复录入</label>
                                    <Table :columns="carMastercolumns" border :data="Form1.caseInfo"></Table>
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
                                <Col span="24">
                                    <FormItem label="车辆备注" prop="lblMemo" style="width: 100%">
                                        <Table v-show="Form1.carMemo" :columns="carMemocolumns" border :data="Form1.gdCarMemo"></Table>
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
                                        <Input v-model="Form1.txtCaseAddr"></Input>
                                    </FormItem>
                                </Col>
                            </Row>
                             <Row>
                                <Col span="6">
                                    <FormItem label="驾驶人" prop="txtDriver" style="width: 100%">
                                        <Input v-model="Form1.txtDriver"></Input>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="报案人" prop="txtReporter" style="width: 100%">
                                        <Input v-model="Form1.txtReporter"></Input>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="电话1" prop="txtPhone1" style="width: 100%">
                                        <Input v-model="Form1.txtPhone1" style="width:100%"/>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="电话2" prop="txtPhone2" style="width: 100%">
                                        <Input v-model="Form1.txtPhone2" style="width:100%"/>
                                    </FormItem>
                                </Col>
                            </Row>
                             <Row>
                                <Col span="6">
                                    <FormItem label="事故方" prop="ddlAccidentType" style="width: 100%">
                                        <Select :placeholder="L('Select')" v-model="Form1.ddlAccidentType" @on-change="AccidentChange">
                                            <Option value="1">单方</Option>
                                            <Option value="2">多方</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="是否伤人" prop="ddlIsInjured" style="width: 100%">
                                        <Select :placeholder="L('Select')" v-model="Form1.ddlIsInjured">
                                            <Option value="1">是</Option>
                                            <Option value="2">否</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="受损类别" prop="ddlCauseTypeN" style="width: 100%">
                                        <Select :placeholder="L('Select')" v-model="Form1.ddlCauseTypeN">
                                            <Option v-for="item in ddlCauseTypeNList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="备注" prop="txtOtherRemark" style="width: 100%">
                                        <Input v-model="Form1.txtOtherRemark"></Input>
                                    </FormItem>
                                </Col>
                            </Row>
                            <div v-show="Form1.DZF">
                          <Divider>对肇方</Divider>
                            <div>
                                <create-DZF ref="DZFForm" v-model="DZFModel" @save-success="getDZF"></create-DZF>
                                <Row type="flex" justify="start" style="padding-bottom:10px">
                                    <Col span="6">
                                        <Button icon="md-add" type="success" style="margin:10px width:100%" @click="AddDZF">对肇方新增</Button>
                                    </Col>
                                </Row>
                            </div>
                            <Row>
                                <Table v-show="Form1.dgdDZF" :columns="dgdDZFcolumns" border :data="Form1.dgdDZFList"></Table>
                            </Row>
                          <Divider>肇责情况</Divider>
                            <Row>
                                <Col span="6">
                                    <FormItem label="肇责情况" prop="ddlCauseType" style="width: 100%">
                                        <Select :placeholder="L('Select')" v-model="Form1.ddlCauseType">
                                            <Option v-for="item in ddlCauseTypeList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="我方负" prop="ddlPercent" style="width: 100%">
                                        <Select :placeholder="L('Select')" v-model="Form1.ddlPercent">
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
                            <div>
                                <create-Record ref="record" v-model="RecordModel" @save-success="getRecord"></create-Record>
                                <Row type="flex" justify="start" style="padding-bottom:10px">
                                    <Col span="6">
                                        <Button icon="md-add" type="success" style="margin:10px width:100%" @click="AddRecord">新增处理进度</Button>
                                    </Col>
                                </Row>
                            </div>
                            <Row>
                                <Col span="24">
                                    <Table v-show="Form1.record" :columns="recordcolumns" border :data="Form1.dgdRecord"></Table>
                                </Col>
                            </Row>
                          <Divider>损失情况</Divider>
                            <div>
                                <create-Loss ref="loss" v-model="LossModel" @save-success="getLoss"></create-Loss>
                                <Row type="flex" justify="start" style="padding-bottom:10px">
                                    <Col span="6">
                                        <Button icon="md-add" type="success" style="margin:10px width:100%" @click="AddLoss">新增损失情况</Button>
                                    </Col>
                                </Row>
                            </div>
                            <Row style="padding-bottom:20px">
                                <Col span="24">
                                    <Table v-show="Form1.lossInfo" :columns="lossInfocolumns" border :data="Form1.dgdlossInfo"></Table>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="6">
                                    <FormItem label="交强险赔付金额" prop="txtInsurePFAmount" style="width: 100%">
                                        <InputNumber v-model="Form1.txtInsurePFAmount" style="width:100%"></InputNumber>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="商业险赔付金额" prop="txtInsureDPFAmount" style="width: 100%">
                                        <InputNumber v-model="Form1.txtInsureDPFAmount" style="width:100%"></InputNumber>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="18">
                                    <FormItem label="赔付备注" prop="txtSSPFRemark" style="width: 100%">
                                        <Input v-model="Form1.txtSSPFRemark" type="textarea" :autosize="{minRows: 3,maxRows: 5}"></Input>
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
                                        <Checkbox v-for="item in chkTJMakeFileList" :label="item.num" :key="item.num">{{item.itemName}}</Checkbox>
                                    </CheckboxGroup>
                                </FormItem>
                                </Col>
                            </Row>
                            <div v-show="DZFTJCL" style="margin-bottom:20px;">
                                <Row>
                                    <Col span="4" style="border:inset 1px">
                                        <p style="font-size:16px;text-align:center">对肇方</p>
                                    </Col>
                                    <Col span="20" style="border:inset 1px">
                                        <p style="font-size:16px;text-align:center">选择</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span="4" style="border:inset 1px;text-align:center">
                                    <FormItem label="" style="width: 100%">
                                        <p style="font-size:16px;text-align:center">{{DZFName}}</p>
                                    </FormItem>
                                    </Col>
                                    <Col span="20" style="border:inset 1px">
                                        <FormItem label="" prop="DZFchkTJMakeFile" style="width: 100%">
                                            <CheckboxGroup v-model="Form1.DZFchkTJMakeFile">
                                                <Checkbox v-for="item in DZFchkTJMakeFileList" :label="item.num" :key="item.num">{{item.itemName}}</Checkbox>
                                            </CheckboxGroup>
                                        </FormItem>
                                    </Col>
                                </Row>
                            </div>
                            <Row>
                                <Col span="6">
                                    <FormItem label="理赔承办人" prop="ddltijiao" style="width: 100%">
                                        <Select :placeholder="L('Select')" v-model="Form1.ddltijiao">
                                            <Option v-for="item in ddltijiaoList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="提交时间" style="width: 100%">
                                        <DatePicker v-model="Form1.txttjDT" type="date" placeholder="选择日期" style="width: 60%" ></DatePicker>&nbsp;&nbsp;
                                        <TimePicker v-model="Form1.ddlhour" format="HH:mm" placeholder="选择时间" style="width: 35%"></TimePicker>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="接收人" prop="txtjieshou" style="width: 100%">
                                        <Input v-model="Form1.txtjieshou"></Input>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="接收日期" prop="txtjsDT" style="width: 100%">
                                        <DatePicker v-model="Form1.txtjsDT" type="date" style="width: 100%"></DatePicker>
                                    </FormItem>
                                </Col>
                            </Row>
                          <Divider>缺件待补</Divider>
                            <Row>
                                <Col span="18">
                                <FormItem label="" prop="chkQJDBMakeFile" style="width: 100%">
                                    <CheckboxGroup v-model="Form1.chkQJDBMakeFile">
                                        <Checkbox v-for="item in chkQJDBMakeFileList" :label="item.num" :key="item.num">{{item.itemName}}</Checkbox>
                                    </CheckboxGroup>
                                </FormItem>
                                </Col>
                            </Row>
                            <div v-show="DZFQJDB" style="margin-bottom:20px">
                                <Row>
                                    <Col span="4" style="border:inset 1px">
                                        <p style="font-size:16px;text-align:center">对肇方</p>
                                    </Col>
                                    <Col span="20" style="border:inset 1px">
                                        <p style="font-size:16px;text-align:center">选择</p>
                                    </Col>
                                </Row> 
                                <Row style="height:100px">
                                    <Col span="4" style="border:inset 1px">
                                    <FormItem label="" style="width: 100%">
                                        <p style="font-size:16px;text-align:center;">{{DZFName}}</p>
                                    </FormItem>
                                    </Col>
                                    <Col span="20" style="border:inset 1px">
                                        <FormItem label="" prop="DZFchkQJDBMakeFile" style="width: 100%">
                                            <CheckboxGroup v-model="Form1.DZFchkQJDBMakeFile">
                                                <Checkbox v-for="item in DZFchkQJDBMakeFileList" :label="item.num" :key="item.num">{{item.itemName}}</Checkbox>
                                            </CheckboxGroup>
                                        </FormItem>
                                    </Col>
                                </Row>
                            </div>
                            <Row>
                                <Col span="24">
                                    <FormItem label="备注" prop="txtQuejianRemark" style="width: 100%">
                                        <Input v-model="Form1.txtQuejianRemark" type="textarea" :autosize="{minRows: 3,maxRows: 5}"></Input>
                                    </FormItem>
                                </Col>
                            </Row>
                          <Divider>送件</Divider>
                            <Row>
                                <Col span="6">
                                    <FormItem label="送件人" prop="txtSUser" style="width: 100%">
                                        <Input v-model="Form1.txtSUser"></Input>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="送件时间" prop="txtSDT" style="width: 100%">
                                        <DatePicker v-model="Form1.txtSDT" type="date" style="width: 100%"></DatePicker>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="送件说明" prop="txtSRemark" style="width: 100%">
                                        <Input v-model="Form1.txtSRemark" type="textarea" :autosize="{minRows: 3,maxRows: 5}"></Input>
                                    </FormItem>
                                </Col>
                            </Row>
                          <Divider>赔付</Divider>
                            <div>
                                <create-PFDetail ref="PFDetail" v-model="PFDetailModel" @save-success="getPFDetail"></create-PFDetail>
                                <Row type="flex" justify="start" style="padding-bottom:10px">
                                    <Col span="6">
                                        <Button icon="md-add" type="success" style="margin:10px width:100%" @click="AddPFDetail">新增赔付明细</Button>
                                    </Col>
                                </Row>
                            </div>
                            <Row style="padding-bottom:20px">
                                <Table v-show="Form1.pfDetail" :columns="PFDetailcolumns" border :data="Form1.dgdPFDetail"></Table>
                            </Row>
                            <Row>
                                <Col span="6">
                                    <FormItem label="转付承办人" prop="ddlZFContractors" style="width: 100%">
                                        <Select :placeholder="L('Select')" v-model="Form1.ddlZFContractors">
                                            <Option v-for="item in ddlZFContractorsList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="6">
                                    <FormItem label="交强险到账金额" prop="txtInsureDZAmount" style="width: 100%">
                                       <InputNumber v-model="Form1.txtInsureDZAmount" style="width:100%"></InputNumber>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="交强险到账日期" prop="txtInsureDZDT" style="width: 100%">
                                        <DatePicker v-model="Form1.txtInsureDZDT" type="date" style="width: 100%"></DatePicker>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="交强险到账账户" prop="ddlInsureDZAccount" style="width: 100%">
                                        <Select :placeholder="L('Select')" v-model="Form1.ddlInsureDZAccount">
                                            <Option v-for="item in ddlInsureDZAccountList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="6">
                                    <FormItem label="商业险到账金额" prop="tztInsureDDZAmount" style="width: 100%">
                                       <InputNumber v-model="Form1.tztInsureDDZAmount" style="width:100%"></InputNumber>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="商业险到账日期" prop="txtInsureDDZDT" style="width: 100%">
                                        <DatePicker v-model="Form1.txtInsureDDZDT" type="date" style="width: 100%"></DatePicker>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="商业险到账账户" prop="ddlInsureDDZAccount" style="width: 100%">
                                        <Select :placeholder="L('Select')" v-model="Form1.ddlInsureDDZAccount">
                                            <Option v-for="item in ddlInsureDDZAccountList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="6">
                                    <FormItem label="对肇方赔付金额" prop="txtDZFPFAmount" style="width: 100%">
                                       <InputNumber v-model="Form1.txtDZFPFAmount" style="width:100%"></InputNumber>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="对肇方赔付日期" prop="txtDZFPFDT" style="width: 100%">
                                        <DatePicker v-model="Form1.txtDZFPFDT" type="date" style="width: 100%"></DatePicker>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="转付日期" prop="txtZhuanFu" style="width: 100%">
                                        <DatePicker v-model="Form1.txtZhuanFu" type="date" style="width: 100%"></DatePicker>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="18">
                                    <FormItem label="赔付备注" prop="txtDZPFRemark" style="width: 100%">
                                        <Input v-model="Form1.txtDZPFRemark" type="textarea" :autosize="{minRows: 3,maxRows: 5}"></Input>
                                    </FormItem>
                                </Col>
                            </Row>
                          <Divider>案件补充说明</Divider>
                            <div>
                                <create-CXLPSupplement ref="CXLPSupplement" v-model="CXLPSupplementModel" @save-success="getCXLPSupplement"></create-CXLPSupplement>
                                <Row type="flex" justify="start" style="padding-bottom:10px">
                                    <Col span="6">
                                        <Button icon="md-add" type="success" style="margin:10px width:100%" @click="AddCXLPSupplement">案件补充说明</Button>
                                    </Col>
                                </Row>
                            </div>
                            <Row>
                                <Table v-show="Form1.supplement" :columns="Supplementcolumns" border :data="Form1.dgdSupplement"></Table>
                            </Row>
                        </div>
                    </Panel>
                </Collapse>
            </Form>
            <div slot="footer">
                <Button @click="cancel">{{L('Cancel')}}</Button>
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
    import CXLP from '@/store/entities/carInsurance/cxlp';
    import publicclass from '../../../lib/publicclass';
    import CreatePFDetail from './create-PFDetail.vue'
    import CreateRecord from './create-Record.vue'
    import CreateLoss from './create-Loss.vue'
    import CreateCXLPSupplement from './create-CXLPSupplement.vue'
    import CreateDZF from './create-DZF.vue'
    import CXLPDZF from '../../../store/entities/carInsurance/cxlpDZF';
    import CXLPRecord from '../../../store/entities/carInsurance/cxlpRecord';
    import CXLPFee from '../../../store/entities/carInsurance/cxlpFee';
    import CXLPPFDetail from '../../../store/entities/carInsurance/cxlpPFDetail';
    import CXLPSupplement from '../../../store/entities/carInsurance/cxlpSupplement';
    import CheckInsure from './check-Insure.vue'
    
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
    class PageCXLPRequest extends PageRequest{
        maxResultCount=10000
        skipCount=0
        makNo:any=null;
        caseTime:any=null;
    }
    class PageCarBaseRequest extends PageRequest{
        keyword:string='';
        from:Date;
        to:Date;
        makNo:string=null;
    }
    class PageInsurancePolicyRequest extends PageRequest{
        carBaseIds:Array<any>;
        insurancePolicyType:any=null;
    }
    class PageCarMemoRequest extends PageRequest{
        maxResultCount=10000;
        skipCount=0;
        carMakNo:string=null;
    }
    class PageCustomerRequest extends PageRequest{
        maxResultCount=10000
        skipCount=0
        supplierAuto:any=0;
    }
    class PageOrderRentRequest extends PageRequest{
        maxResultCount=10000
        skipCount=0
        tradeItemAuto:any=null;
    }
    
    @Component({
        components:{CreatePFDetail,CreateRecord,CreateLoss,CreateCXLPSupplement,CreateDZF,CheckInsure}
    })
    export default class CreateCXLP extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        pageItemCodeRequest:PageItemCodeRequest=new PageItemCodeRequest();//类别明细
        pageBankTypeRequest:PageBankTypeRequest=new PageBankTypeRequest();//银行类别
        pageBankDetailRequest:PageBankDetailRequest=new PageBankDetailRequest();//银行明细
        pageCXLPRequest:PageCXLPRequest=new PageCXLPRequest();
        pageCarBaseRequest:PageCarBaseRequest=new PageCarBaseRequest();
        pageInsurancePolicyRequest:PageInsurancePolicyRequest=new PageInsurancePolicyRequest();
        pageCarMemoRequest:PageCarMemoRequest=new PageCarMemoRequest();
        pageCustomerRequest:PageCustomerRequest=new PageCustomerRequest();//客户
        pageOrderRentRequest:PageOrderRentRequest=new PageOrderRentRequest();//欠租
        checkModalShow:boolean=false;
        caseType:any=null;//案件类别
        caseStatus:any=null;//案件处理状态
        causeType:any=null;//事故类型
        DZF1:any=null;//损失对肇方
        TJMakeFile:any=null;//提交材料
        lpagent:any=null;//理赔承办人
        ZFContractors:any=null;//转付承办人
        QJDBMakeFile:any=null;//缺件待补
        InsureDZAccount:any=null;//交强险到账账户
        InsureDDZAccount:any=null;//商业险到账账户
        BankType:any=null;//银行别
        DZFcauseType:any=null;//肇责情况（对肇方）
        cxlpNo:any='';
        carBaseAuto:any=0;//车籍编号
        insureAuto:any=0;//保险编号
        spinShow=true;//加载动画
        PFDetailModel:boolean=false;//赔付明细
        RecordModel:boolean=false;//处理进度
        LossModel:boolean=false;//损失情况
        CXLPSupplementModel:boolean=false;//案件补充
        DZFModel:boolean=false;//对肇方
        DZFTJCL:boolean=false;//对肇方提交材料
        DZFQJDB:boolean=false;//对肇方缺件待补
        DZFName:any='';
        CXLPAuto:any=0;
        istrue:boolean=false;
        carbaseId:number=0;
        caseTimeCXLP:string='';
        treaty:any=[];
        save(){
            (this.$refs.cxlpForm as any).validate(async (valid:boolean)=>{
                if(this.istrue){
                    this.$Notice.info({
                        title: '该出险案件发生在保险期间外'
                    });
                }else{
                    if(valid){
                        if(this.Form1.ddlCaseStatus==4){
                            if(this.Form1.txtEndDT==''){
                                this.$Message.error('请输入结案日期');
                            }else if(this.Form1.ddlCaseType!=0){
                                this.$Message.error('只有正常的案件类别方可结案，请确认');
                            }else{
                                if(this.Form1.lblInsureNo==''||this.Form1.lblInsureNo==null){
                                    this.$Message.error('保险单号非空请确认');
                                }else{ 
                                    await this.newsave();
                                    this.clearTable();//清空
                                    (this.$refs.cxlpForm as any).resetFields();
                                    this.$emit('save-success');
                                    this.$emit('input',false);
                                }
                            }
                        }else{
                            if(this.Form1.lblInsureNo==''||this.Form1.lblInsureNo==null){
                                this.$Message.error('保险单号非空请确认');
                            }else{ 
                                await this.newsave();
                                this.clearTable();//清空
                                (this.$refs.cxlpForm as any).resetFields();//resetFields 重置
                                this.$emit('save-success');
                                this.$emit('input',false);
                            }
                        }
                    }
                }
            })
        }
        cancel(){
            this.clearTable();//清空
            (this.$refs.cxlpForm as any).resetFields();
            this.$emit('input',false);
        }
        async visibleChange(value:boolean){
            this.spinShow=true;//加载动画
            if(!value){
                this.$emit('input',value);
            }else{
                await this.getList();
                this.spinShow=false;//加载动画
            }
        }
        async newsave(){
            await this.getCXLPNo();//生成车险编号
            //1.新增CXLP表
            var cxlp=this.CXLPToData(this.Form1);
            await this.$store.dispatch({
                type:'cxlp/create',
                data:cxlp
            }).then(res=>{
                this.CXLPAuto=res.id;
                //2.新增CXLPDZF对肇方表
                if(this.Form1.dgdDZFList.length>0){
                    this.Form1.dgdDZFList.forEach(async (x) => {
                        await this.AddCXLPDZF(x);
                    });
                }
                //3.新增CXLPRecord处理进度表
                if(this.Form1.dgdRecord.length>0){
                    this.Form1.dgdRecord.forEach(async (x) => {
                        await this.AddCXLPRecord(x);
                    })
                }
                //4.新增CXLPFee损失情况表
                if(this.Form1.dgdlossInfo.length>0){
                    this.Form1.dgdlossInfo.forEach(async (x) => {
                        await this.AddCXLPFee(x);
                    })
                }
                //5.新增CXLPPFDetail赔付账户明细表
                if(this.Form1.dgdPFDetail.length>0){
                    this.Form1.dgdPFDetail.forEach(async (x) => {
                        await this.AddCXLPPFDetail(x);
                    })
                }
                //6.新增CXLPSupplement案件补充
                if(this.Form1.dgdSupplement.length>0){
                    this.Form1.dgdSupplement.forEach(async (x) =>{
                        await this.AddSupplement(x);
                    })
                }
                this.$Message.success('新增成功！');
            });
        }
        //
            get ddlCaseTypeList(){//案件类别
                return this.caseType;
            }
            get ddlCaseStatusList(){//案件处理状态
                return this.caseStatus;
            }
            get ddlCauseTypeNList(){//受损类型
                return this.causeType;
            }
            get chkTJMakeFileList(){//提交材料
                return this.TJMakeFile;
            }
            get DZFchkTJMakeFileList(){//对肇方提交材料
                return this.TJMakeFile;
            }
            get ddltijiaoList(){//理赔承办人
                return this.lpagent;
            }
            get ddlZFContractorsList(){//转付承办人
                return this.ZFContractors;
            }
            get chkQJDBMakeFileList(){//缺件待补
                return this.QJDBMakeFile;
            }
            get DZFchkQJDBMakeFileList(){//对肇方缺件待补
                return this.QJDBMakeFile;
            }
            get ddlInsureDZAccountList(){//交强险到账账户
                return this.InsureDZAccount;
            }
            get ddlInsureDDZAccountList(){//商业险到账账户
                return this.InsureDDZAccount;
            }
            get ddlCauseTypeList(){//肇责情况
                return this.DZFcauseType;
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
                this.caseStatus = res.items
            })
            //事故类型
            this.pageItemCodeRequest.itemTypes = [842];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                this.causeType = res.items
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
            //银行别
            await this.$store.dispatch({
                type:'bankType/getAll',
                data:this.pageBankTypeRequest
            }).then(res=>{
                this.BankType = res.items
            })
        }
        Form1={
            id:0,
            value1:[1,2,3],//折叠面板
            ddlCaseType:0,//案件类别
            ddlCaseStatus:1,//案件处理状态
            txtyjdt:'',//已决日期
            txtEndDT:'',//结案日期
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
            ddlAccidentType:0,//事故类型 单方/多方
            ddlIsInjured:0,//是否伤人
            ddlCauseTypeN:0,//事故类型 划痕...
            txtOtherRemark:'',//备注
            txtInsurePFAmount:0,//交强险赔付金额
            txtInsureDPFAmount:0,//商业险赔付金额
            txtSSPFRemark:'',//赔付备注
            chkTJMakeFile:[],//提交材料
            ddltijiao:0,//理赔承办人
            txttjDT:'',//提交日期
            ddlhour:'',//提交时间
            txtjieshou:'',//接收人
            txtjsDT:'',//接收日期
            chkQJDBMakeFile:[],//缺件待补材料
            txtQuejianRemark:'',//缺件待补备注
            txtSUser:'',//送件人
            txtSDT:'',//送件时间
            txtSRemark:'',//送件说明
            ddlZFContractors:0,//转付承办人
            txtInsureDZAmount:0,//交强险到账金额
            txtInsureDZDT:'',//交强险到账日期
            ddlInsureDZAccount:0,//交强险到账账户
            tztInsureDDZAmount:0,//商业险到账金额
            txtInsureDDZDT:'',//商业险到账日期
            ddlInsureDDZAccount:0,//商业险到账账户
            txtDZFPFAmount:0,//对肇方赔付金额
            txtDZFPFDT:'',//对肇方赔付日期
            txtZhuanFu:'',//转付日期
            txtDZPFRemark:'',//赔付备注
            ddlCauseType:0,//肇责情况（对肇方）
            ddlPercent:'0%',//我方负（对肇方）
            DZFchkTJMakeFile:[],//对肇方材料提交
            DZFchkQJDBMakeFile:[],//对肇方缺件待补

            carMakNoList:false,//当天出险明细v-show
            caseInfo:[],//同一辆车当天出险明细

            carMemo:false,//车辆备注v-show
            gdCarMemo:[],//车辆备注明细列表

            record:false,//处理进度v-show
            dgdRecord:[],//处理进度明细列表

            lossInfo:false,//损失情况v-show
            dgdlossInfo:[],//损失情况明细列表

            DZF:false,//对肇方(多方)v-show
            dgdDZF:false,//对肇方信息v-show
            dgdDZFList:[],//对肇方信息列表

            supplement:false,//案件补充v-show
            dgdSupplement:[],//案件补充明细

            pfDetail:false,//赔付明细v-show
            dgdPFDetail:[],//赔付明细

        }
        /**该车当天的出险记录 */
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
                    key:'orderAuto',
                    align:'center',
                    width:100
                },{
                    title:'备注内容',
                    key:'carMemoText',
                    align:'center'
                }]
        /**输入车号 查询车辆基本数据 */
         async makNochange(){
            this.Form1.lblInsureDINC='';//商业险保险公司
            this.Form1.lblInsureDNo='';//商业险保单号
            this.Form1.lblInsureNo='';//交强险保单号码
            this.Form1.lblInsureINC='';//交强险保险公司
            //1.查询车籍数据
            if(this.Form1.txtMakNO!=''){
                this.pageCarBaseRequest.makNo=this.Form1.txtMakNO;
                await this.$store.dispatch({
                    type:'carbase/SelectCarBase',
                    data:this.pageCarBaseRequest
                }).then(res=>{
                    if(res.items.length>0){
                        res.items.map(i=>{
                            this.carBaseAuto=i.id;//获取车籍编号
                            if(i.clasen!=null){
                                this.Form1.lblClasenName=i.clasen.clasenName;//车型
                            }
                        })
                        this.getInsure();//查询商业险
                        this.getCarRemark();//获取车辆备注信息
                    }
                    else{
                        this.$Message.error('车号不存在，请确认')
                    }
                })
                if(this.Form1.txtMakNO!=''&&this.Form1.txtCaseTime!=''){//车号和出险时间不为空
                    //2.查出当天已存在的出险数据
                    this.pageCXLPRequest.makNo=this.Form1.txtMakNO;
                    this.pageCXLPRequest.caseTime=null;
                    var a=[];
                    await this.$store.dispatch({
                        type:'cxlp/getAll',
                        data:this.pageCXLPRequest
                    }).then(res=>{
                        res.items.map(i=>{
                            if(new Date(this.Form1.txtCaseTime).toLocaleDateString()==new Date(i.caseTime).toLocaleDateString()){
                                a.push(i);
                            }
                        })
                        if(a.length>0){
                            this.Form1.carMakNoList=true;//显示列表
                            this.Form1.caseInfo=a;//给列表赋值
                        }else{
                            this.Form1.carMakNoList=false;
                            this.Form1.caseInfo=[];
                        }
                    });
                    await this.getOther();//获取交强险和承租人承办业代
                    await this.insureContractPeriod(); //3.判断案件是否发生在保险期内
                }
            }
         }
        /**出险时间 查询车辆基本数据 */
         async caseTimechange(){
            this.Form1.lblInsureDINC='';//商业险保险公司
            this.Form1.lblInsureDNo='';//商业险保单号
            this.Form1.lblInsureNo='';//交强险保单号码
            this.Form1.lblInsureINC='';//交强险保险公司
            //1.查询车籍数据
            if(this.Form1.txtMakNO!=''){
                this.pageCarBaseRequest.makNo=this.Form1.txtMakNO;
                await this.$store.dispatch({
                    type:'carbase/SelectCarBase',
                    data:this.pageCarBaseRequest
                }).then(res=>{
                    if(res.items.length>0){
                        res.items.map(i=>{
                            this.carBaseAuto=i.id;//获取车籍编号
                            if(i.clasen!=null){
                                this.Form1.lblClasenName=i.clasen.clasenName;//车型
                            }
                        })
                        this.getInsure();//查询商业险
                        this.getCarRemark();//获取车辆备注信息
                    }
                    else{
                        this.$Message.error('车号不存在，请确认');
                    }
                })
                if(this.Form1.txtMakNO!=''&&this.Form1.txtCaseTime!=''){//车号和出险时间不为空
                    //2.查出当天已存在的出险数据
                    this.pageCXLPRequest.makNo=this.Form1.txtMakNO;
                    this.pageCXLPRequest.caseTime=null;
                    await this.$store.dispatch({
                        type:'cxlp/getAll',
                        data:this.pageCXLPRequest
                    }).then(res=>{
                        var a=[];
                        res.items.map(i=>{
                            if(new Date(this.Form1.txtCaseTime).toLocaleDateString()==new Date(i.caseTime).toLocaleDateString()){
                                a.push(i);
                            }
                        })
                        if(a.length>0){
                            this.Form1.carMakNoList=true;//显示列表
                            this.Form1.caseInfo=a;//给列表赋值
                        }else{
                            this.Form1.carMakNoList=false;
                            this.Form1.caseInfo=[];
                        }
                    })
                    await this.getOther();//获取交强险和承租人承办业代
                    await this.insureContractPeriod(); //3.判断案件是否发生在保险期内
                }
            }
            
         }
        //查询出险案件是否在合约期内
        async insureContractPeriod(){
            //3.判断案件是否发生在保险期内
            this.pageInsurancePolicyRequest.carBaseIds=[this.carBaseAuto];
            this.pageInsurancePolicyRequest.insurancePolicyType=null;
            await this.$store.dispatch({
                type:'insurancePolicy/getAll',
                data:this.pageInsurancePolicyRequest
            }).then(res=>{
                if(res.items.length>0){
                    res.items.map(i=>{
                        if(new Date(new Date(this.Form1.txtCaseTime).toLocaleDateString())<=new Date(new Date(i.endTime).toLocaleDateString())&&
                            new Date(new Date(this.Form1.txtCaseTime).toLocaleDateString())>=new Date(new Date(i.startTime).toLocaleDateString())){
                            this.treaty.push(i);
                        }
                    })
                    if(this.treaty.length>0){
                        this.istrue=false;
                    }else{
                        this.istrue=true;
                        this.$Notice.info({
                            title: '该出险案件发生在保险期间外'
                        });
                    }
                }
            });
        }
        async getInsure(){
            //查询商业险
            this.pageInsurancePolicyRequest.carBaseIds=[this.carBaseAuto];
            this.pageInsurancePolicyRequest.insurancePolicyType=null;
            await this.$store.dispatch({
                type:'insurancePolicy/getAll',
                data:this.pageInsurancePolicyRequest
            }).then(res=>{
                if(res.items.length>0){
                    res.items.map(i=>{
                        if(i.insurancePolicyType==1&&i.insurancePolicyStatus!=-10){
                            this.Form1.lblInsureDINC=i.supplier.sname;//商业险保险公司
                            this.Form1.lblInsureDNo=i.insuranceNum;//商业险保单号
                        }
                    })
                }else{
                    this.Form1.lblInsureDINC='';//商业险保险公司
                    this.Form1.lblInsureDNo='';//商业险保单号
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
                    this.Form1.gdCarMemo=res.items;//给车辆备注信息列表赋值
                }else{
                    this.Form1.carMemo=false;
                    this.Form1.gdCarMemo=[];
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
                        //判断是否在保险期内
                        if((new Date(new Date(this.Form1.txtCaseTime).toLocaleDateString())<=new Date(new Date(i.endTime).toLocaleDateString())&&
                        new Date(new Date(this.Form1.txtCaseTime).toLocaleDateString())>=new Date(new Date(i.startTime).toLocaleDateString()))&&i.insurancePolicyStatus!=-10&&i.insurancePolicyType==0){
                            if(i.supplier!=null){
                                this.Form1.lblTenant=i.supplier.sname;//车辆承租人
                                this.getbankAccunt(i.supplier.tradeItemAuto);//开户行及账号
                                //this.getOrderRent(i.supplier.tradeItemAuto);//查询是否欠租（需要用到Order_Auto查询，暂时不写）
                            }
                            // this.Form1.lblMemo=;//车辆备注（需要用到Order表 暂时不写）
                            // this.Form1.lblSaleName=;//承办业代(去掉)
                        }
                    })    
                }else{
                    this.Form1.lblInsureNo='';//交强险保单号码
                    this.Form1.lblInsureINC='';//交强险保险公司
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
                    res.items.map(i=>{
                        this.Form1.lblBankNmNo=i.taxbanknm+' '+i.taxbankno;//开户行及账号
                    })
                })
        }
        //查看保险
        async chackInsure(){
            if(this.carBaseAuto!=0&&this.Form1.txtMakNO!=''){
                if(this.Form1.txtCaseTime!=''){
                    this.carbaseId=this.carBaseAuto;
                    this.caseTimeCXLP=new Date(this.Form1.txtCaseTime).toLocaleDateString();
                    this.checkModalShow=true;
                }else{
                    this.$Notice.warning({
                        title: '请输入出险日期'
                    });
                }
            }else{
                this.$Notice.warning({
                    title: '请输入车牌号'
                });
            }
        }
        /**事故方 */
        AccidentChange(){
            if(this.Form1.ddlAccidentType==2){//多方
                this.Form1.DZF=true;//显示对肇方
            }
            else{
                this.Form1.DZF=false;
            }
        }
        //生成车险编号
        async getCXLPNo(){
            //获取最大的车险编号CXLPNO
            var maxCXLPNO='';
            this.pageCXLPRequest.makNo=null;
            this.pageCXLPRequest.caseTime=null;
            await this.$store.dispatch({
                type:'cxlp/SelectMaxCXLPNO',
                data:this.pageCXLPRequest
            }).then(res=>{
                maxCXLPNO=res;
            })
            var num=maxCXLPNO.substring(maxCXLPNO.length-5);//截取后五位数字
            var maxNum=Number(num)+1;
            var year=new Date().getFullYear();
            var month=(new Date().getMonth()+1)<10?'0'+(new Date().getMonth()+1):new Date().getMonth()+1;
            var day=(new Date().getDate())<10?'0'+(new Date().getDate()):new Date().getDate();
            this.cxlpNo=year+''+month+''+day+''+maxNum;
        }
        //清空表格
        clearTable(){
            this.Form1.carMakNoList=false;//当天相同的出险记录
            this.Form1.caseInfo=[];
            this.Form1.carMemo=false;//车辆备注v-show
            this.Form1.gdCarMemo=[];
            this.Form1.DZF=false;//对肇方v-show
            this.Form1.dgdDZF=false;//对肇方Table v-show
            this.Form1.dgdDZFList=[];
            this.Form1.record=false;//处理进度v-show
            this.Form1.dgdRecord=[];
            this.Form1.lossInfo=false;//损失情况v-show
            this.Form1.dgdlossInfo=[];
            this.DZFTJCL=false;//对肇方提交材料v-show
            this.DZFQJDB=false;//对肇方缺件待补v-show
            this.Form1.pfDetail=false;//赔付明细v-show
            this.Form1.dgdPFDetail=[];
            this.Form1.supplement=false;//案件补充v-show
            this.Form1.dgdSupplement=[];
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
            this.Form1.ddlAccidentType=0;//事故方 单方/多方
            this.Form1.ddlIsInjured=0;//是否伤人
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
            this.Form1.ddlhour='';
        }
    /**-----------------存档-------------------- */
        //对肇方
        async AddCXLPDZF(data){
            var Request = this.CXLPDZFToData(data);
            Request.cxlpAuto=this.CXLPAuto;
            await this.$store.dispatch({
                type:'cxlpDZF/create',
                data:Request
            });
        }
        //处理进度
        async AddCXLPRecord(data){
            var Request = this.CXLPRecordToData(data);
            Request.cxlpAuto=this.CXLPAuto;
            await this.$store.dispatch({
                type:'cxlpRecord/create',
                data:Request
            });
        }
        //损失情况
        async AddCXLPFee(data){
            var Request = this.CXLPLossToData(data);
            Request.cxlpAuto=this.CXLPAuto;
            await this.$store.dispatch({
                type:'cxlpFee/create',
                data:Request
            });
        }
        //赔付明细
        async AddCXLPPFDetail(data){
            var Request = this.CXLPPFDteailToData(data);
            Request.cxlpAuto=this.CXLPAuto;
            await this.$store.dispatch({
                type:'cxlpPFDetail/create',
                data:Request
            });
        }
        //案件补充
        async AddSupplement(data){
            var Request=this.CXLPSupplementToData(data);
            Request.cxlpAuto=this.CXLPAuto;
            await this.$store.dispatch({
                type:'cxlpSupplement/create',
                data:Request
            })
        }
    /**-----------------赋值-------------------- */
        //CXLP赋值
        CXLPToData(newdata){
            var data=publicclass.DeepClone(newdata);
            var cxlp=new CXLP();
            if(data.txtCaseTime!=''){
                data.txtCaseTime=new Date(data.txtCaseTime).toLocaleDateString();
            }
            if(data.txtSDT!=''){
                data.txtSDT=new Date(data.txtSDT).toLocaleDateString();
            }
            if(data.txtyjdt!=''){
                data.txtyjdt=new Date(data.txtyjdt).toLocaleDateString();
            }
            if(data.txtEndDT!=''){
                data.txtEndDT=new Date(data.txtEndDT).toLocaleDateString();
            }
            if(data.txttjDT){
                data.txttjDT=new Date(data.txttjDT).toLocaleDateString();
            }
            if(data.txtjsDT!=''){
                data.txtjsDT=new Date(data.txtjsDT).toLocaleDateString();
            }
            if(data.txtInsureDZDT!=''){
                data.txtInsureDZDT=new Date(data.txtInsureDZDT).toLocaleDateString();
            }
            if(data.txtInsureDDZDT!=''){
                data.txtInsureDDZDT=new Date(data.txtInsureDDZDT).toLocaleDateString();
            }
            if(data.txtDZFPFDT!=''){
                data.txtDZFPFDT=new Date(data.txtDZFPFDT).toLocaleDateString();
            }
            if(data.txtZhuanFu!=''){
                data.txtZhuanFu=new Date(data.txtZhuanFu).toLocaleDateString();
            }
            cxlp.id=data.id;
            cxlp.cxlpNO=this.cxlpNo;
            cxlp.makNO=data.txtMakNO;	        
            cxlp.caseTime=data.txtCaseTime;	        
            cxlp.caseAddr=data.txtCaseAddr;	    
            cxlp.driver=data.txtDriver;	        
            cxlp.reporter=data.txtReporter;	    
            cxlp.phone1=data.txtPhone1;	        
            cxlp.phone2=data.txtPhone2;	        
            cxlp.lossValue=0;	    
            cxlp.lossOtherRemark=data.txtOtherRemark;	
            cxlp.caseType=data.ddlCaseType;	    
            cxlp.caseStatus=data.ddlCaseStatus;	    
            cxlp.insureNo=data.lblInsureNo;  	  
            cxlp.accidentType=data.ddlAccidentType;	
            cxlp.isInjured=data.ddlIsInjured;	    
            cxlp.qjdbRemark=data.txtQuejianRemark;	    
            cxlp.suser=data.txtSUser;	        
            cxlp.sdt=data.txtSDT;	            
            cxlp.sRemark=data.txtSRemark;	        
            cxlp.accountName="";	    
            cxlp.acountBank="";	    
            cxlp.bankAccount="";	    
            cxlp.zfContractors=data.ddlZFContractors;	
            cxlp.zfdt=null;	            
            cxlp.causeType=data.ddlCauseType;	    
            cxlp.jfNeedFile=0;	    
            cxlp.jfMakeFile=0;	    
            cxlp.jfNeedFileNum=0;	
            cxlp.jfMakeFileNum=0;	
            cxlp.wfNeedFile=0;	    
            cxlp.wfMakeFile=0;	    
            cxlp.wfNeedFileNum=0;	
            cxlp.wfMakeFileNum=0;	
            cxlp.tijiaoren=data.ddltijiao;	    
            cxlp.tijiaoDT=data.txttjDT;	        
            cxlp.jieshouren=data.txtjieshou;	    
            cxlp.jieshouDT=data.txtjsDT;	        
            cxlp.insurePFAmount=data.txtInsurePFAmount;	
            cxlp.insureDPFAmount=data.txtInsureDPFAmount;	
            cxlp.sspfRemark=data.txtSSPFRemark;	    
            cxlp.insureDZAmount=data.txtInsureDZAmount;	
            cxlp.insureDZDT=data.txtInsureDZDT;	    
            cxlp.insureDZAccount=data.ddlInsureDZAccount;	
            cxlp.insureDDZAmount=data.tztInsureDDZAmount;	
            cxlp.insureDDZDT=data.txtInsureDDZDT;	    
            cxlp.insureDDZAccount=data.ddlInsureDDZAccount;
            cxlp.dzfpfAmount=data.txtDZFPFAmount;	    
            cxlp.dzfpfDT=data.txtDZFPFDT;	        
            cxlp.dzpfRemark=data.txtDZPFRemark;	    
            cxlp.querenAmount='0.00';	
            cxlp.daoZhangDT=null;	    
            cxlp.zhuanFuType=0;	    
            cxlp.zhuanFuDT=data.txtZhuanFu;	        
            cxlp.shouKuanRen='';	    
            cxlp.shouKuanRenID='';	
            cxlp.shouKuanFang='';	
            cxlp.shouKuanBank='';	
            cxlp.shouKuanAccount='';	
            cxlp.status=0;	        
            cxlp.cuser=0;	        
            cxlp.cdt=new Date();	            
            cxlp.muser=0;	        
            cxlp.mdt=null;	            
            cxlp.yiJueDT=data.txtyjdt;                 
            cxlp.wfPercent=data.ddlPercent;	    
            cxlp.orderauto=0;	    
            cxlp.endDT=data.txtEndDT;	            
            cxlp.insureAuto=this.insureAuto;
            cxlp.carBaseAuto=this.carBaseAuto;	    
            cxlp.requestStatus=0;	
            cxlp.requestDT=null;	        
            cxlp.requestUser=0;	    
            cxlp.isTrn=null;//付款之后改为1       
            cxlp.lossValueN=data.ddlCauseTypeN;
            if(data.chkTJMakeFile.length>0){
                cxlp.tjclFile=this.getMakeFile(data.chkTJMakeFile);//选中材料之和
            }else{
                cxlp.tjclFile=0;
            }
            cxlp.tjclNum=data.chkTJMakeFile.length;//选中的数量  
            if(data.chkQJDBMakeFile.length>0){
                cxlp.qjdbFile=this.getMakeFile(data.chkQJDBMakeFile);//缺件待补材料之和
            }else{
                cxlp.qjdbFile=0;
            }     
            cxlp.qjdbNum=data.chkQJDBMakeFile.length;//选中的数量  
            cxlp.hh=data.ddlhour.substring(0,2);//提交时间            
            cxlp.mm=data.ddlhour.substring(data.ddlhour.length-2);//提交分钟
            cxlp.csic=848;
            cxlp.ctic=1309;
            return cxlp;
        }
        //CXLPDZF赋值
        CXLPDZFToData(data){
            var newdata=publicclass.DeepClone(data);
            var cxlpDZF=new CXLPDZF();
            cxlpDZF.cxlpAuto=this.CXLPAuto;//出险理赔序号
            cxlpDZF.dzfType=newdata.ddlDZF;//对肇方
            cxlpDZF.isInjured=newdata.isInjured;//是否人伤
            cxlpDZF.makNO=newdata.makNO;//车号
            cxlpDZF.clasenName=newdata.clasenName;//车型
            cxlpDZF.iNSINC=newdata.iNSINC;//承保公司
            cxlpDZF.owner=newdata.owner;//车主
            cxlpDZF.driver=newdata.driver;//驾驶员
            cxlpDZF.phone=newdata.phone;//联系电话
            cxlpDZF.remark=newdata.remark;//备注
            cxlpDZF.needFile=0;//应备文件
            cxlpDZF.makeFile=0;//已交文件
            cxlpDZF.needFileNum=0;//应备文件数量
            cxlpDZF.makeFileNum=0;//已交文件数量
            cxlpDZF.cuser=0;//建立人
            cxlpDZF.cdt=newdata.cdt;//建立时间
            cxlpDZF.muser=0;//修改人
            cxlpDZF.mdt=newdata.mdt;//修改时间
            if(this.Form1.DZFchkTJMakeFile.length>0){
                cxlpDZF.tjclFile=this.getMakeFile(this.Form1.DZFchkTJMakeFile);//提交材料value之和
            }else{
                cxlpDZF.tjclFile=0;
            }
            cxlpDZF.tjclNum=this.Form1.DZFchkTJMakeFile.length;//提交材料数量
            if(this.Form1.DZFchkQJDBMakeFile.length>0){
                cxlpDZF.qjdbFile=this.getMakeFile(this.Form1.DZFchkQJDBMakeFile);//缺件待补value之和	
            }else{
                cxlpDZF.qjdbFile=0;
            }
            cxlpDZF.qjdbNum=this.Form1.DZFchkQJDBMakeFile.length;//缺件待补数量
            cxlpDZF.dzfWXC=newdata.dzfWXC;//对肇方维修厂
            cxlpDZF.dtic=847;
            return cxlpDZF;
        }
        //CXLPRecord赋值
        CXLPRecordToData(data){
            var newdata=publicclass.DeepClone(data);
            var record=new CXLPRecord();
            record.cxlpAuto=this.CXLPAuto;	    //出险理赔序号
            record.recordContent=newdata.recordContent;	//理赔记录内容
            record.contractors=newdata.contractors;	    //处理承办人id
            record.caseDealWay=newdata.caseDealWay;	    //出险处理方法
            record.cuser=0;	        //建立人
            record.mdt=newdata.mdt;	            //修改时间
            record.cdt=newdata.cdt;	            //建立日期
            record.muser=0;	            //修改人
            record.cdwic=860;
            record.cic=851;
            return record;
        }
        //CXLPFee赋值
        CXLPLossToData(data){
            var newdata=publicclass.DeepClone(data);
            var fee=new CXLPFee();
            fee.cxlpAuto=this.CXLPAuto;	    //出险理赔序号
            fee.dzfType=newdata.dzfType; 	    //对肇方
            fee.feeType=newdata.feeType; 	    //损失费用别
            fee.feeAmount=newdata.feeAmount;	    //损失费用金额	decimal
            fee.feeOtherRemark=newdata.feeOtherRemark;	//其他费用备注
            fee.cuser=0;       	//建立人
            fee.cdt=newdata.cdt;           	//建立日期
            fee.muser=0;       	//修改人
            fee.mdt=newdata.mdt;           	//修改时间
            fee.dtic=854;
            fee.ftic=844;
            return fee;
        }
        //CXLPPFDetail赋值
        CXLPPFDteailToData(data){
            var newdata=publicclass.DeepClone(data);
            var pfdetail=new CXLPPFDetail();
            pfdetail.cxlpAuto=this.CXLPAuto;
            pfdetail.accountName=newdata.accountName;	//账户名称
            pfdetail.acountBank=newdata.acountBank;	//开户行
            pfdetail.bankAccount=newdata.bankAccount;	//银行账号
            pfdetail.pfAmt=newdata.pfAmt;	//赔付金额
            pfdetail.cuser=0;
            pfdetail.cdt=newdata.cdt;
            pfdetail.muser=0;
            pfdetail.mdt=newdata.mdt;
            pfdetail.bankType=newdata.ddlBankType;	//银行别
            return pfdetail;
        }
        //CXLPSupplement赋值
        CXLPSupplementToData(data){
            var newdata=publicclass.DeepClone(data);
            var supplement=new CXLPSupplement();
            supplement.cxlpAuto=this.CXLPAuto;
            supplement.supplementContent=newdata.supplementContent;	//案件补充说明内容
            supplement.contractors=newdata.contractors;	        //补充说明承办人
            supplement.cuser=0;	            //建表人
            supplement.cdt=newdata.cdt;	                //建表时间
            supplement.muser=0;	            //修改人
            supplement.mdt=newdata.mdt;	
            supplement.cic=851;
            return supplement;
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
        AddDZF(){
            this.DZFModel=true;
        }
        getDZF(data,AddOrEdit,index){
            if (AddOrEdit==1) {
                this.Form1.dgdDZFList.push(data);
            }else{
                this.Form1.dgdDZFList.splice(index,1,data);
            }
            this.Form1.dgdDZF=true;
            this.DZFName=data.dzfTypeName;
            //显示对肇方的提交材料和缺件待补
            this.DZFTJCL=true;
            this.DZFQJDB=true;
        }
        dgdDZFcolumns=[{
                title:'第几方',
                key:'dzfTypeName',
                align:'center',
                width:170,
                tooltip:true
            },{
                title:'是否伤人',
                key:'isInjured',
                align:'center',
                width:170,
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
                width:170,
                tooltip:true
            },{
                title:'车型',
                key:'clasenName',
                align:'center',
                width:170,
                tooltip:true
            },{
                title:'承保公司',
                key:'iNSINC',
                align:'center',
                width:170,
                tooltip:true
            },{
                title:'车主',
                key:'owner',
                align:'center',
                width:170,
                tooltip:true
            },{
                title:'驾驶员',
                key:'driver',
                align:'center',
                width:170,
                tooltip:true
            },{
                title:'联系电话',
                key:'phone',
                align:'center',
                width:170,
                tooltip:true
            },{
                title:'维修厂',
                key:'dzfWXC',
                align:'center',
                width:170,
                tooltip:true
            },{
                title:'备注',
                key:'remark',
                align:'center',
                width:170,
                tooltip:true
            },{
                title:this.L('Actions'),
                key:'Actions',
                align: 'center',
                width:170,
                render:(h:any,params:any)=>{
                    return h('div',[
                        h('Button',{
                            props:{
                                type:'primary',
                                size:'small'
                            },
                            style:{
                                width:'60px'
                            },
                            on:{
                                click:()=>{
                                    this.AddDZF();
                                    (this.$refs.DZFForm as any).SetData(publicclass.DeepClone(params.row),params.index);
                                }
                            }
                        },this.L('修改'))
                    ])
                }
        }]
    /**-----------------处理进度---------------- */
        //新增处理进度
        AddRecord(){
            this.RecordModel=true;
        }
        //获取处理进度
        getRecord(data,AddOrEdit,index){
            if (AddOrEdit==1) {
                this.Form1.dgdRecord.push(data);
            }else{
                this.Form1.dgdRecord.splice(index,1,data);
            }
            this.Form1.record=true;
        }
        recordcolumns=[{
                title:'处理进度内容',
                key:'recordContent',
                width:170,
                tooltip:true,
                align:'center'
            },{
                title:'处理方法',
                key:'caseDealWayName',
                width:170,
                tooltip:true,
                align:'center'
            },{
                title:'承办人',
                key:'contractorsName',
                width:170,
                tooltip:true,
                align:'center'
            }
            ,{
                title:this.L('Actions'),
                key:'Actions',
                width:170,
                align: 'center',
                render:(h:any,params:any)=>{
                    return h('div',[
                        h('Button',{
                            props:{
                                type:'primary',
                                size:'small'
                            },
                            style:{
                                width:'60px'
                            },
                            on:{
                                click:()=>{
                                    this.AddRecord();
                                    (this.$refs.record as any).SetData(publicclass.DeepClone(params.row),params.index);
                                }
                            }
                        },this.L('修改'))
                    ])
                }
            }]
    /**-----------------损失情况---------------- */
        //新增损失情况
        AddLoss(){
            this.LossModel=true;
        }
        //获取处理进度
        getLoss(data,AddOrEdit,index){
            if (AddOrEdit==1) {
                this.Form1.dgdlossInfo.push(data);
            }else{
                this.Form1.dgdlossInfo.splice(index,1,data);
            }
            this.Form1.lossInfo=true;
        }
        lossInfocolumns=[{
                title:'第几方',
                key:'dzfTypeName',
                align:'center',
                width:170,
                tooltip:true
            },{
                title:'费用别',
                key:'feeTypeName',
                align:'center',
                width:170,
                tooltip:true
            },{
                title:'金额',
                key:'feeAmount',
                align:'center',
                width:170,
                tooltip:true
            },{
                title:'其他备注',
                key:'feeOtherRemark',
                align:'center',
                width:170,
                tooltip:true
            },{
                title:this.L('Actions'),
                key:'Actions',
                width:170,
                align: 'center',
                render:(h:any,params:any)=>{
                    return h('div',[
                        h('Button',{
                            props:{
                                type:'primary',
                                size:'small'
                            },
                            style:{
                                width:'60px'
                            },
                            on:{
                                click:()=>{
                                    this.AddLoss();
                                    (this.$refs.loss as any).SetData(publicclass.DeepClone(params.row),params.index);
                                }
                            }
                        },this.L('修改'))
                    ])
                }
            }]
    /**-----------------赔付明细---------------- */
        //新增赔付明细
        AddPFDetail(){
            this.PFDetailModel=true;
        }
        /**从列表中移除赔付明细 */
        RemoveAccBank(index){
            this.Form1.dgdPFDetail.splice(index,1)
        }
        //获取赔付明细
        getPFDetail(data,AddOrEdit,index){
            if (AddOrEdit==1) {
                this.Form1.dgdPFDetail.push(data);
            }else{
                this.Form1.dgdPFDetail.splice(index,1,data);
            }
            this.Form1.pfDetail=true;
        }
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
            },{
                title:this.L('Actions'),
                key:'Actions',
                width:150,
                align: 'center',
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
                                    this.AddPFDetail();
                                    (this.$refs.PFDetail as any).SetData(publicclass.DeepClone(params.row),params.index);
                                }
                            }
                        },this.L('修改')),
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
                                            this.RemoveAccBank(params.index);
                                        }
                                    })
                                }
                            }
                        },this.L('Delete'))
                    ])
                }
            }]
    /**-----------------案件补充---------------- */
        //新增损失情况
        AddCXLPSupplement(){
            this.CXLPSupplementModel=true;
        }
        //获取处理进度
        getCXLPSupplement(data,AddOrEdit,index){
            if (AddOrEdit==1) {
                this.Form1.dgdSupplement.push(data);
            }else{
                this.Form1.dgdSupplement.splice(index,1,data);
            }
            this.Form1.supplement=true;
        }
        Supplementcolumns=[{
                title:'补充说明内容',
                key:'supplementContent',
                width:170,
                tooltip:true,
                align:'center'
            },{
                title:'承办人',
                key:'contractorsName',
                width:170,
                tooltip:true,
                align:'center'
            },
            // {
            //     title:'填写人',
            //     key:'cuser',
            //     width:170,
            //     tooltip:true,
            //     align:'center'
            // },{
            //     title:'填写日期',
            //     key:'cdt',
            //     width:170,
            //     tooltip:true,
            //     align:'center',
            //     render:(h:any,params:any)=>{
            //         return h('span',params.row.cdt==null?'':new Date(params.row.cdt).toLocaleString())
            //     }
            // },{
            //     title:'修改人',
            //     key:'muser',
            //     width:170,
            //     tooltip:true,
            //     align:'center'
            // },{
            //     title:'修改日期',
            //     width:170,
            //     tooltip:true,
            //     align:'center',
            //     render:(h:any,params:any)=>{
            //         return h('span',params.row.mdt==null?'':new Date(params.row.mdt).toLocaleString())
            //     }
            // },
            {
                title:this.L('Actions'),
                key:'Actions',
                width:170,
                align: 'center',
                render:(h:any,params:any)=>{
                    return h('div',[
                        h('Button',{
                            props:{
                                type:'primary',
                                size:'small'
                            },
                            style:{
                                width:'60px'
                            },
                            on:{
                                click:()=>{
                                    this.AddCXLPSupplement();
                                    (this.$refs.CXLPSupplement as any).SetData(publicclass.DeepClone(params.row),params.index);
                                }
                            }
                        },this.L('修改'))
                    ])
                }
            }]
    //验证
     checkForm={
        ddlCaseType:[publicclass.Check.required.select],//案件类别
        ddlCaseStatus:[publicclass.Check.required.select],//案件状态
        txtMakNO:[publicclass.Check.required.text],//车号
        txtCaseTime:[publicclass.Check.required.date1],//出险日期
        txtSDT:[publicclass.Check.required.date1],//送件时间
        ddlCauseTypeN:[publicclass.Check.required.select],//受损类别
        txtPhone1:[publicclass.Check.checkvalue.mobiel],//电话1
        txtPhone2:[publicclass.Check.checkvalue.mobiel],//电话2
        txtInsurePFAmount:[publicclass.Check.required.number],//交强险赔付金额
        txtInsureDPFAmount:[publicclass.Check.required.number],//商业险赔付金额
        // txtInsureDZDT:[publicclass.Check.required.date1],//交强险到账日期
        // txtInsureDDZDT:[publicclass.Check.required.date1],//商业险到账日期
        // txtDZFPFDT:[publicclass.Check.required.date1],//对肇方赔付日期
     }
    }
</script>

<style scoped>
/* 假如内容过长，一屏放不下，滚动条下拉覆盖不全 */
.ivu-spin-fix {
    position: fixed;
}
</style>