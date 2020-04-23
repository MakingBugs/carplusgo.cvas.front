<template>
    <div>
        <Modal
         :title="L('车籍资料')"
         :value="value" 
         :width="1100"
         :information="information"
         @on-ok="save"
         @on-visible-change="visibleChange"
         fullscreen
        >
            <Form ref="carBaseForm" :model="Form1" :rules="Formcheck" :label-width="80" inline>
                <Row>
                    <Col span="6">
                        <FormItem label="公司别" style="width: 100%" prop="incAuto">
                            <Select :placeholder="L('Select')" v-model="Form1.incAuto">
                                <Option v-for="item in incList" :value="item.id" :key="item.id">{{ item.sname }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="6" style="margin-left:100px">
                        <check-Insure v-model="checkModalShow" :carbaseId="carbaseId"></check-Insure>
                        <Button type="primary" ghost @click="chackInsure">查看保险</Button>
                    </Col>
                </Row>
                <Row>
                    <Col span="6">
                        <FormItem label="车牌号码" style="width: 100%" prop="txtMakNo">
                            <Input v-model="Form1.txtMakNo"></Input>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="车牌颜色" style="width: 100%" prop="ddlMakColor">
                            <Select :placeholder="L('Select')" v-model="Form1.ddlMakColor">
                                <Option v-for="item in ddlMakColorList" :value="item.itemName" :key="item.itemName">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="登记证号" style="width: 100%" prop="txtLinceNo">
                            <Input v-model="Form1.txtLinceNo"></Input>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="登记日期" style="width: 100%" prop="txtLinceDT">
                            <DatePicker v-model="Form1.txtLinceDT" type="date" style="width: 100%"></DatePicker>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="6">
                        <FormItem label="总厂牌" style="width: 100%" prop="ddlFactoryBrandAuto">
                            <Select :placeholder="L('Select')" v-model="Form1.ddlFactoryBrandAuto" @on-change="factoryBrandchange">
                                <Option v-for="item in ddlFactoryBrandAutoList" :value="item.id" :key="item.id">{{ item.factoryBrandName }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="厂牌" style="width: 100%" prop="ddlBrandAuto">
                            <Select :placeholder="L('Select')" v-model="Form1.ddlBrandAuto" @on-change="brandchange">
                                <Option v-for="item in ddlBrandAutoList" :value="item.id" :key="item.id">{{ item.brandName }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="车型" style="width: 100%" prop="ddlClasenAuto">
                            <Select :placeholder="L('Select')" v-model="Form1.ddlClasenAuto">
                                <Option v-for="item in ddlClasenAutoList" :value="item.id" :key="item.id">{{ item.clasenName }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="车辆型号" style="width: 100%" prop="txtClasenCode">
                            <Input v-model="Form1.txtClasenCode"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="6">
                        <FormItem label="排气量" style="width: 100%" prop="txtCC">
                            <InputNumber v-model="Form1.txtCC" :formatter="value => `${value}`.replace(/B(?=(d{3})+(?!d))/g, ',')" :parser="value => value.replace(/$s?|(,*)/g, '')" style="width: 100%"></InputNumber>          
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="座位数" style="width: 100%" prop="ddlPercnt">
                            <Select :placeholder="L('Select')" v-model="Form1.ddlPercnt">
                                <Option v-for="item in ddlPercntList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="轮胎数" style="width: 100%" prop="ddlWheel">
                            <Select :placeholder="L('Select')" v-model="Form1.ddlWheel">
                                <Option v-for="item in ddlWheelList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="车身颜色" style="width: 100%" prop="txtCarColor">
                            <Input v-model="Form1.txtCarColor"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="6">
                        <FormItem label="发动机号" style="width: 100%" prop="txtEngNo">
                            <Input v-model="Form1.txtEngNo"></Input>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="车架号" style="width: 100%" prop="txtCarNo">
                            <Input v-model="Form1.txtCarNo"></Input>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="出厂日期" style="width: 100%" prop="txtCarDT">
                            <DatePicker v-model="Form1.txtCarDT" type="date" style="width: 100%"></DatePicker>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="燃油种类" style="width: 100%" prop="ddloil">
                            <Select :placeholder="L('Select')" v-model="Form1.ddloil">
                                <Option v-for="item in ddloilList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="6">
                        <FormItem label="牌价" style="width: 100%" prop="lblListPrice">
                            <p style="color:green">{{Form1.lblListPrice}}</p>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="车辆性质" style="width: 100%" prop="ddlCarType">
                            <Select :placeholder="L('Select')" v-model="Form1.ddlCarType">
                                <Option v-for="item in ddlCarTypeList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="进口车" style="width: 100%" prop="ddlIsImport">
                            <Select :placeholder="L('Select')" v-model="Form1.ddlIsImport">
                                <Option v-for="item in ddlIsImportList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="配置版本" style="width: 100%" prop="txtClasenVer">
                            <Input v-model="Form1.txtClasenVer"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="6">
                        <FormItem label="制造厂商" style="width: 100%" prop="ddlManufacturer">
                            <Select :placeholder="L('Select')" v-model="Form1.ddlManufacturer">
                                <Option v-for="item in ddlManufacturerList" :value="item.id" :key="item.id">{{ item.fname }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="购入厂商" style="width: 100%;" prop="ddlSupplier">
                            <Select :placeholder="L('Select')" v-model="Form1.ddlSupplier">
                                <Option v-for="item in ddlSupplierList" :value="item.id" :key="item.id">{{ item.fname }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="汽车产地" style="width: 100%" prop="txtCreatePlace">
                            <Input v-model="Form1.txtCreatePlace"></Input>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="车历状态" style="width: 100%" prop="lblStatus">
                            <p style="color:green">{{Form1.lblStatus}}</p>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="6">
                        <FormItem label="使用性质" style="width: 100%" prop="ddlUseType">
                            <Select :placeholder="L('Select')" v-model="Form1.ddlUseType">
                                <Option v-for="item in ddlUseTypeList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="车种" style="width: 100%" prop="ddlCategory">
                            <Select :placeholder="L('Select')" v-model="Form1.ddlCategory">
                                <Option v-for="item in ddlCategoryList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="车险座位别" style="width: 100%" prop="ddlInsurePercnt">
                            <Select :placeholder="L('Select')" v-model="Form1.ddlInsurePercnt">
                                <Option v-for="item in ddlInsurePercntList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="车险性质别" style="width: 100%" prop="ddlIsBusiness">
                            <Select :placeholder="L('Select')" v-model="Form1.ddlIsBusiness">
                                <Option v-for="item in ddlIsBusinessList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="6">
                        <FormItem label="备用钥匙" style="width: 100%" prop="ddlKeyCount">
                            <Select :placeholder="L('Select')" v-model="Form1.ddlKeyCount">
                                <Option v-for="item in ddlKeyCountList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="车辆使用地" style="width: 100%" prop="creditProvince">
                            <Select :placeholder="L('Select')" v-model="Form1.creditProvince" @on-change="provincechange">
                                <Option v-for="item in creditProvinceList" :value="item.code" :key="item.code">{{ item.name }}</Option>
                            </Select>
                            <Select :placeholder="L('Select')" v-model="Form1.creditCity">
                                <Option v-for="item in creditCityList" :value="item.code" :key="item.code">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="领照日期" style="width: 100%" prop="txtMakDT">
                            <DatePicker v-model="Form1.txtMakDT" type="date" style="width: 100%"></DatePicker>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="备注" style="width: 100%" prop="txtMemo">
                            <Input v-model="Form1.txtMemo"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="6">
                        <FormItem label="首保" style="width: 100%" prop="ddlMtnFirst">
                            <Select :placeholder="L('Select')" v-model="Form1.ddlMtnFirst" style="width:90%">
                                <Option v-for="item in ddlMtnFirstList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                            </Select>&nbsp;km
                            或&nbsp;<InputNumber v-model="Form1.txtMtnFirstMonth" :min="1" style="width:65%"></InputNumber>&nbsp;个月
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="二保" style="width: 100%" prop="ddlMtnSecond">
                            <Select :placeholder="L('Select')" v-model="ddlMtnSecond" style="width:90%">
                                <Option v-for="item in ddlMtnSecondList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                            </Select>&nbsp;km
                            或&nbsp;<InputNumber v-model="Form1.txtMtnSecondMonth" :min="1" style="width:65%"></InputNumber>&nbsp;个月 
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="定保" style="width: 100%" prop="ddlMtnCycle">
                            <Select :placeholder="L('Select')" v-model="ddlMtnCycle" style="width:90%">
                                <Option v-for="item in ddlMtnCycleList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                            </Select>&nbsp;km
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="" style="width: 100%">
                            <p style="color:green">定保为：<label>{{ddlMtnSecond}}</label>KM+<label>{{ddlMtnCycle}}</label>KM</p>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="6">
                        <FormItem label="年审截止" style="width: 100%" prop="txtYearCheckDT">
                            <DatePicker v-model="Form1.txtYearCheckDT" type="date" style="width: 100%"></DatePicker>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="养路费截止" style="width: 100%" prop="txtRoadCheckDT">
                            <DatePicker v-model="Form1.txtRoadCheckDT" type="date" style="width: 100%"></DatePicker>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="交强险截止" style="width: 100%" prop="lblInsureSDT">
                            <label style="color:green">{{Form1.lblInsureSDT}}</label>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="商业险截止" style="width: 100%" prop="lblInsuertDSDT">
                            <label style="color:green">{{Form1.lblInsuertDSDT}}</label>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="6">
                        <FormItem label="车辆吨数" style="width: 100%" prop="txtRentCarType">
                            <InputNumber v-model="Form1.txtRentCarType" style="width:90%" :precision="2"
                            :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                            :parser="value => value.replace(/$s?|(,*)/g, '')"></InputNumber>&nbsp;&nbsp;吨
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="实际吨数" style="width: 100%" prop="txtTon">
                            <InputNumber v-model="Form1.txtTon" style="width:90%" :precision="2"
                            :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                            :parser="value => value.replace(/$s?|(,*)/g, '')"></InputNumber>&nbsp;&nbsp;吨
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="税点" style="width: 100%" prop="lblCarTaxMode">
                            <label style="color:green">{{Form1.lblCarTaxMode}}</label>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="6">
                        <FormItem label="排放标准" style="width: 100%" prop="ddlES">
                            <Select :placeholder="L('Select')" v-model="Form1.ddlES" style="width: 40%">
                                <Option v-for="item in ddlESList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                            </Select>&nbsp;
                            <Input v-model="Form1.txtESRemark" style="width: 55%"></Input>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="变速类型" style="width: 100%" prop="ddlBsType">
                            <Select :placeholder="L('Select')" v-model="Form1.ddlBsType">
                                <Option v-for="item in ddlBsTypeList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="交车日期" style="width: 100%" prop="txtJCDT">
                            <DatePicker v-model="Form1.txtJCDT" type="date" style="width: 100%"></DatePicker>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="拨款日期" style="width: 100%" prop="txtBKDT">
                            <DatePicker v-model="Form1.txtBKDT" type="date" style="width: 100%"></DatePicker>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="6">
                        <FormItem label="异动原因" style="width: 100%" prop="ddlStatus">
                            <Select :placeholder="L('Select')" v-model="Form1.ddlStatus">
                                <Option v-for="item in ddlStatusList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="6" style="display:none">
                        <FormItem label="年审数据中显示" style="width: 100%" prop="rbtIsYearCheck">
                            <RadioGroup v-model="Form1.rbtIsYearCheck">
                                <Radio label="0">是</Radio>
                                <Radio label="1">否</Radio>
                            </RadioGroup>
                        </FormItem>
                    </Col>
                </Row>
                 <!-- <table v-show="annual" style="width:100%">
                    <Divider>年审</Divider>
                    <Row>
                        <Table v-show="ARDetail" :columns="ARDetailcolumns" border :data="Form1.ARDetailList"></Table>
                    </Row>
                    <Row>
                        <Col span="6">
                            <FormItem :label="L('年审完成日')+':'" style="width: 260px" prop="txtAROverDT">
                                <DatePicker v-model="Form1.txtAROverDT" type="date" style="width: 210px"></DatePicker>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem :label="L('年审厂商')+':'" style="width: 260px" prop="ddlARSupplier">
                                <Select :placeholder="L('Select')" v-model="Form1.ddlARSupplier" style="width:210px">
                                    <Option v-for="item in ddlARSupplierList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem :label="L('年审地点')+':'" style="width: 260px" prop="txtARAddr">
                                <Input v-model="Form1.txtARAddr" style="width:210px"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="6">
                            <FormItem :label="L('请款日期')+':'" style="width: 260px" prop="txtARPayDT">
                                <DatePicker v-model="Form1.txtARPayDT" type="date" style="width: 210px"></DatePicker>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem :label="L('请款金额')+':'" style="width: 260px" prop="txtARPayAmt">
                                <Input v-model="Form1.txtARPayAmt" style="width:210px"></Input>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem :label="L('年审到期日')+':'" style="width: 300px" prop="lblDQDTAR">
                                <label style="color:red">{{Form1.lblDQDTAR}}</label>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="6">
                            <FormItem :label="L('年审是否完成')+':'" style="width: 260px" prop="rbtAR">
                                <RadioGroup v-model="Form1.rbtAR">
                                    <Radio label="0">否</Radio>
                                    <Radio label="1">是</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem :label="L('未完成原因')+':'" style="width: 260px" prop="txtARRemark">
                                <Input v-model="Form1.txtARRemark" style="width:300px" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <Button type="primary" ghost @click="btnARAddrSave" style="margin-left: 5px">明细存档</Button>
                        </Col>
                    </Row>
                    </table> -->
                <!-- <table v-show="maintenance" style="width:100%">
                    <Divider>二级维护</Divider>
                    <Row>
                        <Table v-show="SMDetail" :columns="SMDetailcolumns" border :data="Form1.SMDetailList"></Table>
                    </Row>
                    <Row>
                        <Col span="6">
                            <FormItem :label="L('二级维护完成日')+':'" style="width: 100%" prop="txtSMOverDT">
                                <DatePicker v-model="Form1.txtSMOverDT" type="date"></DatePicker>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem :label="L('二级维护厂商')+':'" style="width: 100%" prop="ddlSMSupplier">
                                <Select :placeholder="L('Select')" v-model="Form1.ddlSMSupplier">
                                    <Option v-for="item in ddlSMSupplierList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem :label="L('二级维护地点')+':'" style="width: 100%" prop="txtSMAddr">
                                <Input v-model="Form1.txtSMAddr"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="6">
                            <FormItem :label="L('请款日期')+':'" style="width: 100%" prop="txtSMPayDT">
                                <DatePicker v-model="Form1.txtSMPayDT" type="date"></DatePicker>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem :label="L('请款金额')+':'" style="width: 100%" prop="txtSMPayAmt">
                                <Input v-model="Form1.txtSMPayAmt"></Input>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem :label="L('二级维护到期日')+':'" style="width: 100%" prop="lblDQDT">
                                <label style="color:red">{{Form1.lblDQDT}}</label>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="6">
                            <FormItem :label="L('二级维护是否完成')+':'" style="width: 100%" prop="rbtSM">
                                <RadioGroup v-model="Form1.rbtSM">
                                    <Radio label="0">否</Radio>
                                    <Radio label="1">是</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem :label="L('未完成原因')+':'" style="width: 100%" prop="txtSMRemark">
                                <Input v-model="Form1.txtSMRemark" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <Button type="primary" @click="btnSMAddrSave" ghost style="margin-left: 40px">明细存档</Button>
                        </Col>
                    </Row>
                    </table> -->
                <!-- <Row>
                    <Col span="24">
                        <Card>
                            <Divider>车籍异动记录</Divider>
                            <div class="margin-top-10">
                                <Table :columns="carBaseLogcolumns" :no-data-text="L('NoDatas')" border :data="Form1.carBaseLog"></Table>
                            </div>
                        </Card>
                    </Col>
                </Row> -->
            </Form>
            <div slot="footer">
                <Button @click="cancel">{{L('Cancel')}}</Button>
                <Button @click="save" type="primary">修改</Button>
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
    import CarBase from '@/store/entities/car/carbase';
    import PublicClass from '../../../lib/publicclass';
    import CheckInsure from '../../carInsurance/cxlp/check-Insure.vue'

    class PageIncRequest extends PageRequest{//公司别
        maxResultCount=10000
        skipCount=0
    }
    class PageItemCodeRequest extends PageRequest{
        maxResultCount=10000
        skipCount=0
        itemTypes:Array<number>
    }
    class PageFactoryBrandRequest extends PageRequest{//总厂牌
        maxResultCount=10000
        skipCount=0
    }
    class PageBrandRequest extends PageRequest{//厂牌
        maxResultCount=10000
        skipCount=0
    }
    class PageClasenRequest extends PageRequest{//车型
        maxResultCount=10000
        skipCount=0
    }
    class PageSupplierRequest extends PageRequest{//厂商
        maxResultCount=10000
        skipCount=0
        supplierTypes:Array<number>;
    }
    class PageARSMRequest extends PageRequest{
        maxResultCount=10000
        skipCount=0
    }
    class PageCarBaseLogRequest extends PageRequest{//车籍异动记录
        maxResultCount=10000
        skipCount=0
    }
    class PageInsurancePolicyRequest extends PageRequest{
        carBaseIds:Array<any>;
    }
    class PageCreditProvinceRequest extends PageRequest{//省
        maxResultCount=10000
        skipCount=0
    }
    class PageCreditCityRequest extends PageRequest{//市
        maxResultCount=10000
        skipCount=0
        provinceCode=0
    }

    @Component({
        components:{CheckInsure}
    })
    export default class EditCarBase extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        @Prop({type:Object,default:null}) information:any;//传值
        @Prop({type:Number,default:null}) conditions:number;//传状态
        carBase:CarBase=new CarBase();
        pageIncRequest:PageIncRequest=new PageIncRequest();//公司别
        pageItemCodeRequest:PageItemCodeRequest=new PageItemCodeRequest();
        pageFactoryBrandRequest:PageFactoryBrandRequest=new PageFactoryBrandRequest();//总厂牌
        pageBrandRequest:PageBrandRequest=new PageBrandRequest();//厂牌
        pageClasenRequest:PageClasenRequest=new PageClasenRequest();//车型
        pageSupplierRequest:PageSupplierRequest=new PageSupplierRequest();//厂商
        pageARSMRequest:PageARSMRequest=new PageARSMRequest();//年审和二级维护
        pageCarBaseLogRequest:PageCarBaseLogRequest=new PageCarBaseLogRequest();//年审和二级维护
        pageInsurancePolicyRequest:PageInsurancePolicyRequest=new PageInsurancePolicyRequest();//保险
        pageCreditProvinceRequest:PageCreditProvinceRequest=new PageCreditProvinceRequest();//省
        pageCreditCityRequest:PageCreditCityRequest=new PageCreditCityRequest();//市
        ddlMtnSecond:any=0;//二保
        ddlMtnCycle:any=0;//定保
        spinShow=true;//进入页面加载动画
        checkModalShow:boolean=false;
        carbaseId:number=0;

        /**自定义的值 */
            incType:any=[];//公司别
            ddloilmore:any=[];//燃油种类
            brandLable:any=[];//厂牌
            clasenType:any=[];//车型
            seating:any=[];//座位数
            tireNumber:any=[];//轮胎数
            carNature:any=[];//车辆性质
            importedCar:any=[];//进口车
            manufacturer:any=[];//制造厂商
            buypartners:any=[];//购入厂商
            useNature:any=[];//使用性质
            caroftype:any=[];//车种
            carinsurance:any=[];//车险座位别
            carofNature:any=[];//车险性质别
            falsekey:any=[];//备用钥匙
            firstMtn:any=[];//首保
            secondMtn:any=[];//二保
            settoprotect:any=[];//定保
            emissionstandard:any=[];//排放标准
            transmissiontype:any=[];//变速类型
            movethereaso:any=[];//异动原因
            makNoColor:any=[];//车牌颜色
            factoryBrandAutomore:any=[];//总厂牌
            ARSupplierN:any=[];//年审厂商
            SMSupplierN:any=[];//二级维护厂商
            province:any=null;//省
            city:any=null;//市

            annual:any=false;//v-show年审
            maintenance:any=false;//v-show二级维护
            SMDetail:any=false;//二级维护明细表
            ARDetail:any=false;//年审明细表

        Form1={
            carbaseauto:0,
            incAuto:1,
            txtMakNo:"",//车牌号码
            ddlMakColor:"",//车牌颜色
            txtLinceNo:"",//登记证号
            txtLinceDT:null,//登记日期
            ddlFactoryBrandAuto:0,//总厂牌
            ddlBrandAuto:0,//厂牌
            ddlClasenAuto:0,//车型
            txtClasenCode:"",//车辆型号
            txtCC:0,//排气量
            ddlPercnt:0,//座位数
            ddlWheel:0,//轮胎数
            txtCarColor:"",//车身颜色
            txtEngNo:"",//发动机号
            txtCarNo:"",//车架号
            txtCarDT:null,//出厂日期
            ddloil:0,//燃油种类
            lblListPrice:0,//牌价
            ddlCarType:0,//车辆性质
            ddlIsImport:0,//进口车
            txtClasenVer:"",//配置版本
            ddlManufacturer:0,//制造厂商
            ddlSupplier:0,//购入厂商
            txtCreatePlace:"",//汽车产地
            lblStatus:null,//车历状态
            ddlUseType:0,//使用性质
            ddlCategory:0,//车种
            ddlInsurePercnt:0,//车险座位别
            ddlIsBusiness:0,//车险性质别
            ddlKeyCount:0,//备用钥匙
            creditProvince:0,//车辆使用地 省
            creditCity:0,//车辆使用地 市
            txtMakDT:null,//领照日期
            txtMemo:"",//备注
            ddlMtnFirst:0,//首保
            txtMtnFirstMonth:0,//首保
            txtMtnSecondMonth:0,//二保
            txtYearCheckDT:null,//年审截止
            txtRoadCheckDT:null,//养路费截止
            lblInsureSDT:null,//交强险截止
            lblInsuertDSDT:null,//商业险截止
            txtRentCarType:0,//车辆吨数
            txtTon:0,//实际吨数
            lblCarTaxMode:null,//税点
            ddlES:0,//排放标准
            txtESRemark:"",//排放标准
            ddlBsType:0,//变速类型
            txtJCDT:null,//交车日期
            txtBKDT:null,//拨款日期
            ddlStatus:0,//异动原因
            rbtIsYearCheck:'0',//年审数据中显示
            //二级维护
                /*txtSMOverDT:null,//二级维护完成日
                ddlSMSupplier:null,//二级维护厂商
                txtSMAddr:null,//二级维护地点
                txtSMPayDT:null,//请款日期
                txtSMPayAmt:null,//请款金额
                lblDQDT:null,//二级维护到期日
                rbtSM:null,//二级维护是否完成
                txtSMRemark:null,//未完成原因
                //年审
                txtAROverDT:null,//年审完成日
                ddlARSupplier:null,//年审厂商
                txtARAddr:null,//年审地点
                txtARPayDT:null,//请款日期
                txtARPayAmt:null,//请款金额
                lblDQDTAR:null,//年审到期日
                rbtAR:null,//年审是否完成
                txtARRemark:null,//未完成原因

                SMDetailList:[],//二级维护列表明细
                ARDetailList:[],//年审列表明细*/
            carBaseLog:[],//车籍异动记录*/

        }
        save(){
            (this.$refs.carBaseForm as any).validate(async (valid:boolean)=>{
                this.evaluation();//赋值
                if(valid){
                    await this.$store.dispatch({
                        type:'carbase/update',
                        data:this.carBase
                    });
                    (this.$refs.carBaseForm as any).resetFields();
                    this.$emit('save-success');
                    this.$emit('input',false);
                }
            })
        }
        cancel(){
            this.clearModel();
            this.$emit('input',false);
        }
        async visibleChange(value:boolean){
            this.spinShow=true;//加载动画
            if(!value){
                this.$emit('input',value);
                this.clearModel();
            }else{
                /*if(this.conditions==10){//显示年审
                        this.annual=true;
                    }
                    if(this.conditions==20){//显示二级维护
                        this.maintenance=true;
                    }*/
                //赋值
                await this.getList();
                //this.Form1=Util.extend(true,{},this.information);
                await this.bestowData(this.information);
                this.spinShow=false;//加载动画
              ///车籍异动记录
                //this.carBaseLogRecord(this.information.carBaseAuto);
                //如果是年审就查询出数据并给年审list
                //this.getARSMList(10);
                //如果是二级维护就查询出数据并给二级维护list
                //this.getARSMList(20);
            }
        }
        //查看保险
        async chackInsure(){
            if(this.Form1.carbaseauto!=0){
                this.carbaseId=this.Form1.carbaseauto;
                this.checkModalShow=true;
            }else{
                this.$Notice.warning({
                    title: '请输入车牌号'
                });
            }
        }
        //列表  
            get incList(){//公司别
                return this.incType;
            }
            get ddlMakColorList(){//车牌颜色
                return this.makNoColor;
            }
            get ddlFactoryBrandAutoList(){//总厂牌
                return this.factoryBrandAutomore;
            }
            get ddlBrandAutoList(){//厂牌
                return this.brandLable;
            }
            get ddlClasenAutoList(){//车型
                return this.clasenType;
            }
            get ddlPercntList(){//座位数
                return this.seating;
            }
            get ddlWheelList(){//轮胎数
                return this.tireNumber;
            }
            get ddloilList(){//燃油种类
                return this.ddloilmore;
            }
            get ddlCarTypeList(){//车辆性质
                return this.carNature;
            }
            get ddlIsImportList(){//进口车
                return this.importedCar;
            }
            get ddlManufacturerList(){//制造厂商
                return this.manufacturer;
            }
            get ddlSupplierList(){//购入厂商
                return this.buypartners;
            }
            get ddlUseTypeList(){//使用性质
                return this.useNature;
            }
            get ddlCategoryList(){//车种
                return this.caroftype;
            }
            get ddlInsurePercntList(){//车险座位别
                return this.carinsurance;
            }
            get ddlIsBusinessList(){//车险性质别
                return this.carofNature;
            }
            get ddlKeyCountList(){//备用钥匙
                return this.falsekey;
            }
            get ddlMtnFirstList(){//首保
                return this.firstMtn;
            }
            get ddlMtnSecondList(){//二保
                return this.secondMtn;
            }
            get ddlMtnCycleList(){//定保
                return this.settoprotect;
            }
            get ddlESList(){//排放标准
                return this.emissionstandard;
            }
            get ddlBsTypeList(){//变速类型
                return this.transmissiontype;
            }
            get ddlStatusList(){//异动原因
                return this.movethereaso;
            }
            get ddlSMSupplierList(){//二级维护厂商
                return this.SMSupplierN;
            }
            get ddlARSupplierList(){//年审厂商
                return this.ARSupplierN;
            }
            get creditProvinceList(){//车辆使用地 省
                return this.province;
            }
            get creditCityList(){//车辆使用地 市
                return this.city;
            }

        async getList(){
            /**年审厂商 */
            this.pageItemCodeRequest.itemTypes = [867];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                this.ARSupplierN = res.items
            })
            /**二级维护厂商 */
            this.pageItemCodeRequest.itemTypes = [868];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                this.SMSupplierN = res.items
            })
            /**公司别 */
            await this.$store.dispatch({
                type:'inc/getAll',
                data:this.pageIncRequest
            }).then(res=>{
                this.incType=res.items;
            })
            /**车牌颜色 */
            this.pageItemCodeRequest.itemTypes = [221];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                this.makNoColor = res.items
            })
            /**燃油种类 */
            this.pageItemCodeRequest.itemTypes = [231];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                this.ddloilmore = res.items
            })
            /**座位数 */
            this.pageItemCodeRequest.itemTypes = [222];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                this.seating = res.items
            })
            /**轮胎数 */
            this.pageItemCodeRequest.itemTypes = [223];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                this.tireNumber = res.items
            })
            /**总厂牌 */
            await this.$store.dispatch({
                type:'factorybrand/GetAll',
                data:this.pageFactoryBrandRequest
            }).then(res=>{
                this.factoryBrandAutomore=res.items
            })
           
            /**进口车 */
            this.pageItemCodeRequest.itemTypes = [227];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                this.importedCar = res.items
            })
            /**使用性质 */
            this.pageItemCodeRequest.itemTypes = [225];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                this.useNature = res.items
            })
            /**车种 */
            this.pageItemCodeRequest.itemTypes = [226];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                this.caroftype = res.items
            })
            /**车险座位别 */
            this.pageItemCodeRequest.itemTypes = [410];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                this.carinsurance = res.items
            })
            /**车险性质别 */
            this.pageItemCodeRequest.itemTypes = [411];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                this.carofNature = res.items
            })
            /**备用钥匙 */
            this.pageItemCodeRequest.itemTypes = [232];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                this.falsekey = res.items
            })
            /**首保 */
            this.pageItemCodeRequest.itemTypes = [228];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                this.firstMtn = res.items
            })
            /**二保 */
            this.pageItemCodeRequest.itemTypes = [229];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                this.secondMtn = res.items
            })
            /**定保 */
            this.pageItemCodeRequest.itemTypes = [230];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                this.settoprotect = res.items
            })
            /**排放标准 */
            this.pageItemCodeRequest.itemTypes = [840];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                this.emissionstandard = res.items
            })
            /**变速类型 */
            this.pageItemCodeRequest.itemTypes = [841];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                this.transmissiontype = res.items
            })
            /**异动原因 */
            this.pageItemCodeRequest.itemTypes = [233];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                this.movethereaso = res.items
            })
            // this.Form1.lblStatus=this.ddlStatusList.find(item => item.num === this.Form1.ddlStatus)['itemName'];//车历状态（和异动原因一致）
            /**制造厂商 */
            this.pageSupplierRequest.supplierTypes=[5];
            await this.$store.dispatch({
                type:'supplier/getAll',
                data:this.pageSupplierRequest
            }).then(res=>{
                this.manufacturer=res.items;
            })
            /**购入厂商 */
            this.pageSupplierRequest.supplierTypes=[6,7];
            await this.$store.dispatch({
                type:'supplier/getAll',
                data:this.pageSupplierRequest
            }).then(res=>{
                this.buypartners=res.items;
            })
            /**车辆性质 */
            this.pageItemCodeRequest.itemTypes = [224];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                this.carNature = res.items
            })
            /**车辆使用地 省 */
            await this.$store.dispatch({
                type:'creditProvince/getAll',
                data:this.pageCreditProvinceRequest
            }).then(res=>{
                this.province = res.items
            })
            /**车辆使用地 市 */
            if(this.information.creditProvince!=null){
                this.pageCreditCityRequest.provinceCode=this.information.creditProvince.code;
            }
            else{
                this.pageCreditCityRequest.provinceCode=0;
            }
            await this.$store.dispatch({
                type:'creditCity/getAll',
                data:this.pageCreditCityRequest
            }).then(res=>{
                if(res.items.length>0){
                    this.city = res.items
                }
            })
        }
        /**根据总厂牌显示厂牌 */
         async factoryBrandchange(f){
            this.Form1.ddlBrandAuto=null;//清空第二个select的选项
            this.brandLable=[];//清空厂牌上一次的数据
            await this.$store.dispatch({
                type:'brand/GetAll',
                data:this.pageBrandRequest
            }).then(res=>{
                res.items.map(i=>{
                    if(i.factoryBrand.id==f){
                        this.brandLable.push(i)
                    }
                })
                this.Form1.ddlBrandAuto=this.information.brand.id;//厂牌
            })
        }
        /**根据厂牌显示车型 */
         async brandchange(b){
            this.Form1.ddlClasenAuto=null;//清空第二个select的选项
            this.clasenType=[];//清空车型上一次的数据
            await this.$store.dispatch({
                type:'clasen/GetAll',
                data:this.pageClasenRequest
            }).then(res=>{
                res.items.map(i=>{
                    if(i.brandAuto==b){
                        this.clasenType.push(i)
                    }
                })
                if(this.information.clasen!=null){
                    this.Form1.ddlClasenAuto=this.information.clasen.id;//车型
                }
            })
        }
        /**根据省份选中城市 */
         async provincechange(p){
            this.Form1.creditCity=null;//清空第二个select的选项
            this.city=[];//清空城市上一次的数据
            this.pageCreditCityRequest.provinceCode=p;
            await this.$store.dispatch({
                type:'creditCity/getAll',
                data:this.pageCreditCityRequest
            }).then(res=>{
                res.items.map(i=>{
                    if(i.provinceId==p){
                        this.city.push(i)
                    }
                })
            })
        }
       //
        /**
         * 二级维护明细列表
         */
         /*SMDetailcolumns=[{
                title:'二级维护序号',
                key:'ARSMAuto'
            },{
                title:'二级维护厂商',
                key:'ARSMSupplierN'
            },{
                title:'二级维护地点',
                key:'ARSMAddr'
            },{
                title:'请款日期',
                key:'PayDT'
            },{
                title:'请款金额',
                key:'PayAmt'
            },{
                title:'二级维护到期日',
                key:'DQDT'
            },{
                title:'二级维护完成日',
                key:'ARSMOverDT'
            },{
                title:'未完成原因',
                key:'Remark'
            },{
                title:this.L('Actions'),
                key:'Actions',
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
                                    
                                }
                            }
                        },this.L('Edit'))
                    ])
                }
        }]*/

        /**
         * 年审明细列表
         */
            /*ARDetailcolumns=[{
                title:'年审序号',
                key:'ARSMAuto'
            },{
                title:'年审厂商',
                key:'ARSMSupplierN'
            },{
                title:'年审地点',
                key:'ARSMAddr'
            },{
                title:'请款日期',
                key:'PayDT'
            },{
                title:'请款金额',
                key:'PayAmt'
            },{
                title:'年审到期日',
                key:'DQDT'
            },{
                title:'年审完成日',
                key:'ARSMOverDT'
            },{
                title:'未完成原因',
                key:'Remark'
            },{
                title:this.L('Actions'),
                key:'Actions',
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
                                    
                                }
                            }
                        },this.L('Edit'))
                    ])
                }
        }]*/

        /**二级维护明细存档  */
         //async btnSMAddrSave(){
          /*  
            if(){//1.判断二级维护是否重复

            }
            else{
                if(){//2.判断是修改还是新增
                    //新增
                    await this.$store.dispatch({
                        type:'ARSM/create',
                        data:this.pageARSMRequest
                    });
                }
                else{
                    //修改
                    await this.$store.dispatch({
                        type:'ARSM/update',
                        data:this.pageARSMRequest
                    });
                }
                this.getARSMList(20);//获取数据
                this.SMDetail=true;
            } */
        //}

        /**年审明细存档 */
         //btnARAddrSave(){
           /* if(){//1.判断是否重复

            }
            else{
                if(){//2.判断是修改还是新增
                    //新增
                    await this.$store.dispatch({
                        type:'ARSM/create',
                        data:this.pageARSMRequest
                    });
                }
                else{
                    //修改
                    await this.$store.dispatch({
                        type:'ARSM/update',
                        data:this.pageARSMRequest
                    });
                }
                this.getARSMList(10);//获取数据
                this.ARDetail=true;
            } */
        //}

        /**获取年审和二级维护数据列表显示  */
         //async getARSMList(val){
            /*
            await this.$store.dispatch({
                 type:'ARSM/getAll',
                 data:this.pageARSMRequest
            }).then(res=>{
                res.items.map(i=>{
                    if(i.carBaseAuto==){//车籍号相等
                        if(val==10){//年审
                            this.Form1.ARDetailList.push(i);
                        }
                        else if(val==20){//二级维护
                            this.Form1.SMDetailList.push(i);
                        }
                    }
                })
            });
            */
        //}

        /**车籍异动记录 */
        /*async carBaseLogRecord(val){//根据CarBase_Auto查询
            await this.$store.dispatch({
                 type:'CarBaseLog/getAll',
                 data:this.pageCarBaseLogRequest
            }).then(res=>{
                res.items.map(i=>{
                    if(i.carBaseAuto==val){//车籍号相等
                        this.Form1.carBaseLog.push(i);
                    }
                })
            });
        }*/

        /**车籍异动记录 */
        /*carBaseLogcolumns=[{
                title:'车籍序号',
                key:'CarBaseAuto'
            },{
                title:'车牌号码',
                key:'makNo'
            },{
                title:'厂牌',
                key:'BrandName'
            },{
                title:'车型',
                key:'ClasenName'
            },{
                title:'颜色',
                key:'carColor'
            },{
                title:'排气量',
                key:'cc'
            },{
                title:'公司别',
                key:'IncName'
            },{
                title:'保管单位',
                key:'DepAuto'
            },{
                title:'仓库别',
                key:'SGAuto'
            },{
                title:'里程数',
                key:'KM'
            },{
                title:'异动人员',
                key:'MUserNa'
            },{
                title:'异动日期',
                key:'MDT'
            },{
                title:'序号',
                key:'Var'
            },{
            title:this.L('Actions'),
            key:'Actions',
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
                                this.Form1=params.row;
                            }
                        }
                    },this.L('Edit'))
                ])
            }
        }]*/

       /**赋值 */
        bestowData(value){
            this.Form1.carbaseauto=value.id;
            this.Form1.incAuto=value.inc.id;//公司别
            this.Form1.txtMakNo=value.makNo;//车牌号码
            this.Form1.txtCarColor=value.carColor;//车身颜色
            this.Form1.txtCC=value.cc;//排气量
            this.Form1.txtLinceNo=value.linceNo;//登记证号
            this.Form1.txtLinceDT=value.linceDt;//登记日期
            this.Form1.txtClasenCode=value.clasenCode;//车辆型号
            this.Form1.ddlPercnt=value.percnt;//座位数
            this.Form1.ddlWheel=value.wheel;//轮胎数
            this.Form1.ddlMakColor=value.makColor;//车牌颜色
            this.Form1.txtEngNo=value.engNo;//发动机号
            this.Form1.txtCarNo=value.carNo;//车架号
            this.Form1.txtCarDT=value.carDt;//出厂日期
            this.Form1.ddloil=value.oil;//燃油种类
            this.Form1.ddlCarType=value.carType;//车辆性质
            this.Form1.ddlIsImport=value.isImport;//进口车
            this.Form1.txtClasenVer=value.clasenVer;//配置版本
            this.Form1.txtCreatePlace=value.createPlace;//汽车产地
            this.Form1.ddlUseType=value.useType;//使用性质
            this.Form1.ddlCategory=value.category;//车种
            this.Form1.ddlInsurePercnt=value.insurePercnt;//车险座位别
            this.Form1.ddlIsBusiness=value.isBusiness;//车险性质别
            this.Form1.ddlKeyCount=value.keyCount;//备用钥匙
            if(value.creditProvince!=null){
                this.Form1.creditProvince=value.creditProvince.code;//车辆使用地省
            }
            if(value.creditCity!+null){
                this.Form1.creditCity=value.creditCity.code;//车辆使用地市
            }
            this.Form1.txtMakDT=value.makDt;//领照日期
            this.Form1.txtJCDT=value.jcdt;//交车日期
            this.Form1.txtBKDT=value.bkdt;//拨款日期
            this.Form1.txtMemo=value.memo;//备注
            this.Form1.ddlMtnFirst=value.mtnFirst;//首保
            this.Form1.txtMtnFirstMonth=value.mtnFirstMonth;//首保月份
            this.ddlMtnSecond=value.mtnSecond;//二保
            this.Form1.txtMtnSecondMonth=value.mtnSecondMonth;//二保月份
            this.ddlMtnCycle=value.mtnCycle;//定保
            this.Form1.txtYearCheckDT=value.yearCheckDt;//年审截止
            this.Form1.txtRoadCheckDT=value.roadCheckDt;//养路费截至
            this.Form1.txtRentCarType=value.rentCarType;//车辆吨数
            this.Form1.txtTon=value.ton;//实际吨数
            this.Form1.ddlES=value.es;//标准排放
            this.Form1.txtESRemark=value.esremark;//标准排放
            this.Form1.ddlBsType=value.bstype;//变速类型
            this.Form1.ddlStatus=value.status;//异动原因
            this.Form1.lblListPrice=value.listPrice;//牌价
            this.Form1.ddlManufacturer=value.manufacturer;//制造厂商
            this.Form1.ddlSupplier=value.supplier;//购入厂商
            this.Form1.ddlFactoryBrandAuto=value.factoryBrand.id;//总厂牌
            this.factoryBrandchange(value.factoryBrand.id);//厂牌
            this.brandchange(value.brand.id);//车型
            this.Form1.lblStatus=this.ddlStatusList.find(item => item.num === this.Form1.ddlStatus)['itemName'];//车历状态（和异动原因一致）
            this.getcarTaxMode(value.carTaxMode);//税点
            this.Form1.rbtIsYearCheck=value.isYearCheck+'';//年审数据中显示  转为字符串
            //根据车籍编号查询交强险和商业险
            this.getInsure(value.id);
        }
       /**对应数据库字段 */
        evaluation(){
            if(this.Form1.txtLinceDT!=''){
                this.Form1.txtLinceDT=new Date(this.Form1.txtLinceDT).toLocaleDateString();
            }
            if(this.Form1.txtCarDT!=''){
                this.Form1.txtCarDT=new Date(this.Form1.txtCarDT).toLocaleDateString();
            }
            if(this.Form1.txtMakDT!=''){
                this.Form1.txtMakDT=new Date(this.Form1.txtMakDT).toLocaleDateString();
            }
            if(this.Form1.txtYearCheckDT){
                this.Form1.txtYearCheckDT=new Date(this.Form1.txtYearCheckDT).toLocaleDateString();
            }
            if(this.Form1.txtRoadCheckDT!=''){
                this.Form1.txtRoadCheckDT=new Date(this.Form1.txtRoadCheckDT).toLocaleDateString();
            }
            if(this.Form1.txtJCDT!=''){
                this.Form1.txtJCDT=new Date(this.Form1.txtJCDT).toLocaleDateString();
            }
            if(this.Form1.txtBKDT!=''){
                this.Form1.txtBKDT=new Date(this.Form1.txtBKDT).toLocaleDateString();
            }
            this.carBase.id=this.information.id;
            this.carBase.incAuto=this.Form1.incAuto;//公司别
            this.carBase.makNo=this.Form1.txtMakNo;//车牌号码
            this.carBase.makColor=this.Form1.ddlMakColor;//车牌颜色
            this.carBase.linceNo=this.Form1.txtLinceNo;//登记证号
            this.carBase.linceDt=this.Form1.txtLinceDT;//登记日期
            this.carBase.factoryBrandAuto=this.Form1.ddlFactoryBrandAuto;//总厂牌
            this.carBase.brandAuto=this.Form1.ddlBrandAuto;//厂牌
            if(this.Form1.ddlClasenAuto==null||this.Form1.ddlClasenAuto==undefined){
                this.carBase.clasenAuto=0;
            }
            else{
                this.carBase.clasenAuto=this.Form1.ddlClasenAuto;//车型
            }
            this.carBase.clasenCode=this.Form1.txtClasenCode;//车辆型号
            this.carBase.cc=this.Form1.txtCC;//排气量
            this.carBase.percnt=this.Form1.ddlPercnt;//座位数
            this.carBase.wheel=this.Form1.ddlWheel;//轮胎数
            this.carBase.carColor=this.Form1.txtCarColor;//车身颜色
            this.carBase.engNo=this.Form1.txtEngNo;//发动机号
            this.carBase.carNo=this.Form1.txtCarNo;//车架号
            this.carBase.carDt=this.Form1.txtCarDT;//出厂日期
            this.carBase.oil=this.Form1.ddloil;//燃油种类
            this.carBase.listPrice=this.Form1.lblListPrice;//牌价
            this.carBase.carType=this.Form1.ddlCarType;//车辆性质
            this.carBase.isImport=this.Form1.ddlIsImport;//进口车
            this.carBase.clasenVer=this.Form1.txtClasenVer;//配置版本
            this.carBase.manufacturer=this.Form1.ddlManufacturer;//制造厂商
            this.carBase.supplier=this.Form1.ddlSupplier;//购入厂商
            this.carBase.createPlace=this.Form1.txtCreatePlace;//汽车产地
            this.carBase.useType=this.Form1.ddlUseType;//使用性质
            this.carBase.category=this.Form1.ddlCategory;//车种
            this.carBase.insurePercnt=this.Form1.ddlInsurePercnt;//车险座位别
            this.carBase.isBusiness=this.Form1.ddlIsBusiness;//车险性质别
            this.carBase.keyCount=this.Form1.ddlKeyCount;//备用钥匙
            this.carBase.provinceCode=this.Form1.creditProvince;//车辆使用地 省
            this.carBase.cityCode=this.Form1.creditCity;//车辆使用地 市
            this.carBase.makDt=this.Form1.txtMakDT;//领照日期
            this.carBase.memo=this.Form1.txtMemo;//备注
            this.carBase.mtnFirst=this.Form1.ddlMtnFirst;//首保
            this.carBase.mtnFirstMonth=this.Form1.txtMtnFirstMonth;//首保
            this.carBase.mtnSecond=this.ddlMtnSecond;//二保
            this.carBase.mtnSecondMonth=this.Form1.txtMtnSecondMonth;//二保
            this.carBase.mtnCycle=this.ddlMtnCycle;//定保
            this.carBase.yearCheckDT=this.Form1.txtYearCheckDT;//年审截止
            this.carBase.roadCheckDT=this.Form1.txtRoadCheckDT;//养路费截止
            this.carBase.rentCarType=this.Form1.txtRentCarType;//车辆吨数
            this.carBase.ton=this.Form1.txtTon;//实际吨数
            //税点
            if(this.Form1.lblCarTaxMode=="5%"){
                this.carBase.carTaxMode=1;
            }
            else if(this.Form1.lblCarTaxMode=="17%"){
                this.carBase.carTaxMode=3;
            }
            else{
                this.carBase.carTaxMode=0;
            }
            this.carBase.es=this.Form1.ddlES;//排放标准
            this.carBase.esremark=this.Form1.txtESRemark;//排放标准
            this.carBase.bstype=this.Form1.ddlBsType;//变速类型
            this.carBase.jcdt=this.Form1.txtJCDT;//交车日期
            this.carBase.bkdt=this.Form1.txtBKDT;//拨款日期
            this.carBase.status=this.Form1.ddlStatus;//异动原因
            this.carBase.isYearCheck=parseInt(this.Form1.rbtIsYearCheck);//年审数据中显示
            this.carBase.depAuto=0;//保管单位
            this.carBase.sgAuto=0;//仓库别
            this.carBase.km=this.information.km;//公里数
            this.carBase.muser=0;
            this.carBase.mdt=new Date();
            this.carBase.itemType=225;
        }
        
       /**根据车辆编号查询交强险和商业险 */
        async getInsure(val){
            this.pageInsurancePolicyRequest.carBaseIds=[val];
            await this.$store.dispatch({
                type:'insurancePolicy/getAll',
                data:this.pageInsurancePolicyRequest
            }).then(res=>{
                if(res.items.length>0){
                    res.items.map(i=>{
                        //赋值
                        this.Form1.lblInsureSDT=new Date(i.startTime).toLocaleDateString();//交强险截止
                        this.Form1.lblInsuertDSDT=new Date(i.startTime).toLocaleDateString();//商业险截止
                    })
                }
            });
        }
       /**查税点 */
        async getcarTaxMode(val){
            this.pageItemCodeRequest.itemTypes = [2014];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                res.items.map(i=>{
                    if(i.num==val){
                        this.Form1.lblCarTaxMode=i.itemName
                    }
                })
            })
        }
       /**表单验证 */
        Formcheck={
            txtLinceDT:[PublicClass.Check.required.req],//登记日期
            txtCarDT:[PublicClass.Check.required.req],//出厂日期
            txtYearCheckDT:[PublicClass.Check.required.req],//年审截止
            txtMakDT:[PublicClass.Check.required.req],//领照日期
            txtMakNo:[PublicClass.Check.required.text],//车牌号码
            txtClasenCode:[PublicClass.Check.required.text],//车辆型号
            txtCarColor:[PublicClass.Check.required.text],//车身颜色
            ddlFactoryBrandAuto:[PublicClass.Check.required.select],//总厂牌
            ddlBrandAuto:[PublicClass.Check.required.select],//厂牌
            ddlPercnt:[PublicClass.Check.required.select],//座位数
            txtCC:[PublicClass.Check.required.number],//排气量
            ddlWheel:[PublicClass.Check.required.select],//轮胎数
            txtEngNo:[PublicClass.Check.required.text],//发动机号
            txtCarNo:[PublicClass.Check.required.text],//车架号
            ddloil:[PublicClass.Check.required.select],//燃油种类
            txtCreatePlace:[PublicClass.Check.required.text],//汽车产地
        }
       //清除模态框
        clearModel(){
            this.Form1.ddlMtnFirst=0;//首保
            this.Form1.txtMtnFirstMonth=0;
            this.ddlMtnSecond=0;//二保
            this.Form1.txtMtnSecondMonth=0;
            this.ddlMtnCycle=0;//定保
            this.Form1.creditProvince=0;//省
            this.Form1.creditCity=0;//市
            this.Form1.ddlES=0;//排放标准
            this.Form1.txtESRemark="";
            (this.$refs.carBaseForm as any).resetFields();
        }
    }
</script>
<style scoped>
/* 全屏覆盖 */
.ivu-spin-fix {
    position: fixed;
}
</style>