<template>
    <div>
        <Card dis-hover>
           <!-- 折叠面板 -->
           <Collapse v-model="collapseKey" @on-change="showPanel" accordion>
                <!-- 试算查询面板 -->
                <Panel name="1">
                    试算查询
                    <div slot="content">
                        <Form ref="Form1" :model="Form1" :label-width="80" :rules="check" inline>
                            <Row>
                                <Col span="4">
                                   <FormItem label="试算单状态" style="width:100%">
                                        <Select v-model="Form1.ordersstatus">
                                            <Option :value="-1">全部</Option>
                                            <Option v-for="item in Form1.ordersstatuslist" :key="item.num" :value="item.num">{{item.itemName}}</Option>
                                        </Select>
                                    </FormItem>
                                </Col> 
                                <Col span="4">
                                    <Form-item label="试算单号" prop="orders">
                                        <InputNumber placeholder="请输入试算单号" :min="0" v-model="Form1.orders" on-blur="checkorders" style="width:100%"></InputNumber>
                                    </Form-item>
                                </Col>              
                                <Col span="8">
                                    <Form-item label="起止日期">
                                        <Date-picker type="daterange" placeholder="选择日期范围" format="yyyy-MM-dd" @on-change="udate" :editable="false"></Date-picker>
                                    </Form-item>
                                </Col>
                                <Col span="8">
                                    <Form-item>
                                        <Button icon="ios-search" type="primary" @click="SearchOrders('Form1')">查询</Button>
                                        <Button icon="md-add" type="primary"  style="margin-left: 8px" @click="showPanel(['2'])">添加</Button>
                                    </Form-item>
                                </Col>
                            </Row>
                        </Form>
                        <div>
                            <template>
                                <Table border :columns="Form1.ordersheader" :data="Form1.orderscontent" :loading="ordersloading"></Table>
                                <div style="margin: 10px;overflow: hidden">
                                    <div style="float: left;">
                                        <Page show-sizer :total="totalCount" :current="currentPage"  @on-change="currentPageChange" @on-page-size-change="pageSizeChange" ></Page>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </Panel>
                <!-- 试算输入面板 -->
                <Panel name="2">
                    试算输入
                    <div slot="content"  class="panel2">
                        <Form :label-width="90" inline>
                            <!-- 车籍资料 -->
                            <div>
                                <Row type="flex" justify="start">
                                    <Col span="3">
                                        <FormItem label="试算单号" style="width:100%" prop="">
                                            <label>1</label>
                                        </FormItem>
                                    </Col>
                                    <Col span="3">
                                        <FormItem label="租赁期数" style="width:100%" prop="tenancyterm">
                                            <Select v-model="Form2.tenancyterm">
                                                <Option v-for="item in 72" :key="item" :value="item">{{ item }}</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <Col span="6">
                                        <FormItem label="租赁性质" style="width:100%" prop="renttype">
                                            <Select v-model="Form2.renttype">
                                                <Option v-for="item in Form2.renttypelist" :key="item.num" :value="item.num">{{item.itemName}}</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <Col span="6">
                                        <FormItem label="业务类别" style="width:100%" prop="ordertype">
                                            <Select v-model="Form2.ordertype">
                                                <Option v-for="item in Form2.ordertypelist" :key="item.num" :value="item.num">{{item.itemName}}</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                </Row>
                            </div>
                            <Divider>车籍资料</Divider>
                            <div>
                                <Row type="flex" justify="start">
                                    <Col span="6">
                                        <FormItem label="报价车商" style="width:100%" prop="suppliertype">
                                            <Select :v-model="Form2.suppliertype">
                                                <Option v-for="item in Form2.supplierlist" :value="item.id" :key="item.id">{{item.sname}}</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <Col span="6">
                                        <FormItem label="总厂牌" style="width:100%" prop="factorybrandtype">
                                            <Select v-model="Form2.factorybrandtype" @on-change="getBrands" filterable clearable>
                                                <Option :value="-1">全部</Option>
                                                <Option v-for="item in Form2.factorybrandlist" :value="item.id" :key="item.id">{{item.factoryBrandName}}</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <Col span="6">
                                        <FormItem label="厂牌/车型" style="width:100%" prop="brandclasentype">
                                            <Cascader v-model="Form2.brandclasentype" :data="Form2.brandclasen" :load-data="getClasen"></Cascader>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row type="flex" justify="start">
                                    <Col span="6">
                                        <FormItem label="车型代码" style="width:100%" prop="clasencode">
                                            <Input v-model="Form2.clasencode" placeholder="请输入..."></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="6">
                                        <FormItem label="车号" style="width:100%" prop="makno">
                                            <InputNumber
                                            v-model="Form2.makno"
                                            :formatter="value => `${value}`"
                                            :parser="value => value.replace(/$s?|(,*)/g, '')"
                                            placeholder="请输入..."
                                            style="width:100%"></InputNumber>
                                        </FormItem>
                                    </Col>
                                    <Col span="6">
                                        <FormItem label="车色" style="width:100%" prop="carcolor">
                                            <Input v-model="Form2.carcolor" placeholder="请输入..."></Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row type="flex" justify="start">
                                    <Col span="6">
                                        <FormItem label="排气量" style="width:100%" prop="cc">
                                            <InputNumber
                                            v-model="Form2.cc"
                                            :formatter="value => `${value} CC`"
                                            :parser="value => value.replace(/$s?|(,*)/g, '')"
                                            placeholder="请输入..."
                                            style="width:100%"></InputNumber>
                                        </FormItem>
                                    </Col>
                                    <Col span="6">
                                        <FormItem label="排挡方式" style="width:100%">
                                            <Select v-model="Form2.bstype">
                                                <Option v-for="item in Form2.bslist" :key="item.num" :value="item.num">{{item.itemName}}</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <Col span="6">
                                        <FormItem label="起租里程" style="width:100%" prop="usekm">
                                            <InputNumber
                                            v-model="Form2.usekm"
                                            :formatter="value => `${value} KM`"
                                            :parser="value => value.replace(/$s?|(,*)/g, '')"
                                            placeholder="请输入..."
                                            style="width:100%"></InputNumber>
                                        </FormItem>
                                    </Col>
                                    <Col span="6">
                                        <FormItem label="燃油种类" style="width:100%" prop="oiltype">
                                            <Select v-model="Form2.oiltype">
                                                <Option v-for="item in Form2.oillist" :key="item.num" :value="item.num">{{item.itemName}}</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row type="flex" justify="start">
                                    <Col span="6">
                                        <FormItem label="吨数" style="width:100%" prop="weight">
                                            <Select v-model="Form2.weight">
                                                <Option v-for="item in 10" :value="item/2" :key="item">{{(item/2).toFixed(1) +" t"}}</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <Col span="6">
                                        <FormItem label="已用月数" style="width:100%" prop="mm2">
                                            <Select v-model="Form2.mm2">
                                                <Option v-for="item in 73" :key="item" :value="item-1">{{item-1}}</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <Col span="6">
                                        <FormItem label="出厂年月" style="width:100%" prop="cardate">
                                            <Date-picker :value="Form2.cardate" type="date"  format="yyyy-MM-dd" @on-change="CarDate" placeholder="选择日期" :value.sync="Form2.cardate"  style="width:100%"></Date-picker>
                                        </FormItem>
                                    </Col>
                                    <Col span="6">
                                        <FormItem label="车辆来源" style="width:100%" prop="carsource">
                                            <Select v-model="Form2.carsource">
                                                <Option v-for="item in Form2.carsourcelist" :key="item.num" :value="item.num">{{item.itemName}}</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <!-- 牌照资料 -->
                                <Divider orientation="left" size="small" dashed>牌照资料</Divider>
                                <Row type="flex" justify="start">
                                    <Col span="6">
                                        <FormItem label="公司别" style="width:100%" prop="inc">
                                            <Select v-model="Form2.inc">
                                                <Option v-for="item in Form2.inclist" :key="item.id" :value="item.id">{{item.sname}}</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <!-- <Col span="12">
                                        <FormItem label="限牌照使用" style="width:100%">
                                            <Col span="2">
                                                <Form-item>
                                                    <i-switch v-model="Form2.switch1">
                                                        <span slot="open">是</span>
                                                        <span slot="close">否</span>
                                                    </i-switch>
                                                </Form-item>
                                            </Col>
                                            <Col span="8" v-show="Form2.switch1">
                                                <Form-item>
                                                    <Select>
                                                        <Option value="1">杭州</Option>
                                                    </Select>
                                                </Form-item>
                                            </Col>
                                            <Col span="8" style="padding-left:10px" v-show="Form2.switch1">
                                                <Form-item>
                                                    <Select>
                                                        <Option value="1">-</Option>
                                                    </Select>
                                                </Form-item>
                                            </Col>
                                        </FormItem>
                                    </Col>
                                    <Col span="6" v-show="Form2.switch1">
                                        <FormItem label="购牌费" style="width:100%">
                                            <Input placeholder="请输入..."><span slot="append">￥</span></Input>
                                        </FormItem>
                                    </Col> -->
                                </Row>
                            </div>
                            <!-- 车辆成本 -->
                            <Divider>车辆成本</Divider>
                            <div>
                                <Row type="flex" justify="start">
                                    <Col span="4">
                                        <FormItem label="车辆牌价" style="width:100%" prop="listprice">
                                            <InputNumber
                                                v-model="Form2.listprice"
                                                placeholder="请输入"
                                                :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                                                :parser="value => value.replace(/$s?|(,*)/g, '')"
                                                style="width:90%"></InputNumber>
                                        </FormItem>
                                    </Col>
                                    <Col span="2">
                                        <FormItem :label-width="10">
                                            <Checkbox>可抵扣</Checkbox>
                                        </FormItem>
                                    </Col>
                                    <Col span="6">
                                        <FormItem label="折价金额" style="width:100%" prop="disprice">
                                            <InputNumber
                                                v-model="Form2.disprice"
                                                placeholder="请输入"
                                                :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                                                :parser="value => value.replace(/$s?|(,*)/g, '')"
                                                style="width:100%"></InputNumber>
                                        </FormItem>
                                    </Col>
                                    <Col span="6">
                                        <FormItem label="购置税" style="width:100%" prop="cartax">
                                            <InputNumber
                                                v-model="Form2.cartax"
                                                placeholder="请输入"
                                                :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                                                :parser="value => value.replace(/$s?|(,*)/g, '')"
                                                style="width:100%"></InputNumber>
                                        </FormItem>
                                    </Col>
                                    <Col span="6">
                                        <FormItem label="车辆成本" style="width:100%">
                                            <span>{{Form2.carcost}}</span>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row type="flex" justify="start">
                                    <Col span="6">
                                        <FormItem label="还车残值调整" style="width:100%">
                                            <span>{{Form2.overamtu}}</span>
                                        </FormItem>
                                    </Col>
                                    <Col span="6">
                                        <FormItem label="预估残值" style="width:100%" prop="overamt">
                                            <InputNumber
                                                v-model="Form2.overamt"
                                                placeholder="请输入"
                                                :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                                                :parser="value => value.replace(/$s?|(,*)/g, '')"
                                                style="width:100%"></InputNumber>
                                        </FormItem>
                                    </Col>
                                    <Col span="6">
                                        <FormItem label="残值比例" style="width:100%" prop="overp">
                                            <span>{{Form2.overp}}%</span>
                                        </FormItem>
                                    </Col>
                                    <Col span="6">
                                        <FormItem label="期满购回价" style="width:100%" prop="repurchaseamt">
                                            <span>{{Form2.repurchaseamt}}</span>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row type="flex" justify="start">
                                    <Col span="6">
                                        <FormItem label="承租车价" style="width:100%" prop="rentamt">
                                            <span>{{Form2.rentamt}}</span>
                                        </FormItem>
                                    </Col>
                                    <Col span="6">
                                        <FormItem label="代垫利息成本" style="width:100%" prop="dpttax">
                                            <span>{{Form2.dpttax}}</span>
                                        </FormItem>
                                    </Col>
                                    <Col span="6">
                                        <FormItem label="保证金"  style="width:100%" prop="dptamt">
                                            <InputNumber
                                                v-model="Form2.dptamt"
                                                placeholder="请输入"
                                                :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                                                :parser="value => value.replace(/$s?|(,*)/g, '')"
                                                style="width:100%"></InputNumber>
                                        </FormItem>
                                    </Col>
                                    <Col span="3">
                                        <FormItem :label-width="10" style="width:100%" prop="dpttype">
                                            <Select v-model="Form2.dpttype" @on-change="getDptTaxPayList">
                                                <Option v-for="item in Form2.dpttypelist" :key="item.num" :value="item.num">{{item.itemName}}</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <Col span="3" v-if="Form2.dpttype==2">
                                        <FormItem :label-width="10"  style="width:100%" prop="dpttaxpay">
                                        <Select v-model="Form2.dpttaxpay">
                                            <Option v-for="item in Form2.dpttaxpaylist" :key="item.num" :value="item.num">{{item.itemName}}</Option>
                                        </Select>
                                    </FormItem>
                                    </Col>
                                </Row>
                                <Row type="flex" justify="start">
                                    <Col span="6">
                                        <FormItem label="保证金比例" style="width:100%" prop="dptp">
                                            <span>{{Form2.dptp}}</span>
                                        </FormItem>
                                    </Col>
                                    <Col span="6">
                                        <FormItem label="过户费" style="width:100%" prop="trnsfee">
                                            <span>{{Form2.trnsfee}}</span>
                                        </FormItem>
                                    </Col>
                                    <Col span="6">
                                        <FormItem label="印花税" style="width:100%" prop="stamptax">
                                            <span>{{Form2.stamptax}}</span>
                                        </FormItem>
                                    </Col>
                                    <Col span="6">
                                        <FormItem label="配件金额" style="width:100%" prop="accessary">
                                            <span>{{Form2.accessary}}</span>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row type="flex" justify="start">
                                    <Col span="6">
                                        <FormItem label="成本调整" style="width:100%" prop="costadjustment">
                                            <InputNumber
                                                v-model="Form2.costadjustment"
                                                placeholder="请输入"
                                                :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                                                :parser="value => value.replace(/$s?|(,*)/g, '')"
                                                style="width:100%"></InputNumber>
                                        </FormItem>
                                    </Col>
                                    <Col span="6">
                                        <FormItem label="售车税" style="width:100%" prop="sellcartax">
                                            <span>{{Form2.sellcartax}}</span>
                                        </FormItem>
                                    </Col>
                                </Row>
                            </div>
                            <!-- 配件 -->
                            <Divider>配件</Divider>
                            <div>
                                <add-accessory ref="accessory" v-model="accessorymodal" @save-accessory="SaveAccessory"></add-accessory>
                                <Row type="flex" justify="start" style="padding-bottom:10px">
                                    <Col span="6">
                                        <Button icon="md-add" type="primary" style="margin:10px width:100%" @click="accessorymodal=true">新增</Button>
                                    </Col>
                                </Row>
                                <div v-show="this.Form2.accessorycontent.length>0? true:false">
                                    <Table width="100%" :disabled-hover="true" border :columns="Form2.accessoryheader" :data="Form2.accessorycontent"></Table>
                                </div>
                            </div>
                            <!-- 上牌规费 -->
                            <Divider>上牌规费</Divider>
                            <div>
                                <add-ordersFee ref="ordersfee" v-model="ordersfeemodal" :incauto="Form2.inc"  @save-ordersfee="SaveOrdersFee"></add-ordersFee>
                                <Row type="flex" justify="start" style="padding-bottom:10px">
                                    <Col span="6">
                                        <Button icon="md-add" type="primary" style="margin:10px width:100%" @click="ordersfeemodal=true">新增</Button>
                                    </Col>
                                </Row>
                                <div v-show="this.Form2.ordersfeetypecontent.length>0? true:false">
                                    <Table width="100%" :disabled-hover="true" border :columns="Form2.ordersfeetypeheader" :data="Form2.ordersfeetypecontent"></Table>
                                </div>
                            </div>
                            <!-- 保险 -->
                            <Divider>保险</Divider>
                            <div>
                                <add-insurance ref="ordersfee" v-model="insurancefeemodal" :OrderType="Form2.ordertype" :TenancyTerm="Form2.tenancyterm" :InsureContent="Form2.insurecontent" :ListPrice="Form2.listprice" @save-insure="SaveInsure"></add-insurance>
                                <Row type="flex" justify="start" style="padding-bottom:10px">
                                    <Col span="6">
                                        <Button :disabled="Form2.ordertype!=null? false:true" icon="md-add" type="primary" style="margin:10px width:100%" @click="insurancefeemodal=true">新增</Button>
                                    </Col>
                                </Row>
                                <div v-show="this.Form2.insurecontent.length>0? true:false">
                                    <Table width="100%" :disabled-hover="true" :columns="Form2.insureheader" :data="Form2.insurecontent"></Table>
                                </div>
                                <div v-show="this.Form2.insurecontent.length>0? true:false">
                                    <Tag style="font-size:20px;height:40px;padding:10px" color="green">保险成本(年)：{{Form2.insureyearcost}}￥</Tag>
                                </div>
                            </div>
                            <!-- 成本计算 -->
                            <Divider>成本计算</Divider>
                            <Card :dis-hover="true" style="background-color:#f8f8f9;">
                                <div style="background-color:#fff;">
                                    <div class="header title" >
                                        <div style="width:5%;background-color:#f8f8f9;"></div>
                                        <div class="left borderleft" style="width:45%;background-color:#f8f8f9;">内容</div>
                                        <div class="borderleft" style="width:25%;background-color:#f8f8f9;">
                                            <div class="borderbottom">计价成本{{Form2.raterate}}%</div>
                                            <div class="between">
                                                <div style="width:50%">%折价后</div>
                                                <div class="borderleft" style="width:50%">费用租金</div>
                                            </div>
                                        </div>
                                        <div class="borderleft" style="width:25%;background-color:#f8f8f9;">
                                            <div class="borderbottom">实际成交价{{Form2.frate}}%</div>
                                            <div class="between">
                                                <div style="width:50%">%折价后</div>
                                                <div class="borderleft" style="width:50%">费用租金</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="header" style="margin-top:-1px">
                                        <div class="borderbottom lefttitle" style="width:5%;margin-bottom:-1px;background-color:#f8f8f9;">
                                            <div class="title" style="margin-top:150px">月费用</div>
                                        </div>
                                        <div class="borderleft content" style="width:45%;">
                                            <Row class="row">
                                                残值利息
                                            </Row>
                                            <Row class="row">
                                                代步车，每月
                                                <Select v-model="Form2.costdetail.A11" style="width:200px">
                                                    <Option v-for="item in Form2.costdetail.A11list" :key="item.num" :value="item.num">{{item.itemName}}</Option>
                                                </Select>
                                            </Row>
                                            <Row class="row">
                                                保养维修费， 合约总里程
                                                <Select v-model="Form2.costdetail.B01=0" style="width:100px;padding-right:5px">
                                                    <Option v-for="(item,index) in 61" :key="index" :value="(item-1)*5000">{{(item-1)*5000}}</Option>
                                                </Select>
                                                <InputNumber v-model="Form2.costdetail.B01KM" ></InputNumber>
                                                公里，每月
                                                <InputNumber
                                                v-model="Form2.costdetail.U01"
                                                :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                                                :parser="value => value.replace(/$s?|(,*)/g, '')"
                                                ></InputNumber>
                                                元
                                            </Row>
                                            <Row class="row">
                                                牵送费，每月
                                                <InputNumber
                                                v-model="Form2.costdetail.A02"
                                                :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                                                :parser="value => value.replace(/$s?|(,*)/g, '')"
                                                ></InputNumber>
                                                元
                                            </Row>
                                            <Row class="row">
                                                验车费，每年
                                                <InputNumber
                                                v-model="Form2.costdetail.A03"
                                                :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                                                :parser="value => value.replace(/$s?|(,*)/g, '')"
                                                ></InputNumber>
                                                元
                                            </Row>
                                            <Row class="row">
                                                服务费，每月
                                                <Select v-model="Form2.costdetail.A04=100" style="width:100px;padding-right:5px">
                                                    <Option :value="100">100</Option>
                                                    <Option :value="150">150</Option>
                                                    <Option :value="200">200</Option>
                                                    <Option :value="250">250</Option>
                                                </Select>
                                                元 
                                                <Checkbox v-model="Form2.costdetail.chk04" >服务费减免</Checkbox>
                                                服务费
                                                <InputNumber
                                                v-model="Form2.costdetail.ServiceAmt"
                                                :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                                                :parser="value => value.replace(/$s?|(,*)/g, '')"
                                                ></InputNumber>
                                                元
                                            </Row>
                                            <Row class="row">
                                                牌照使用费，每月
                                                <InputNumber
                                                v-model="Form2.costdetail.A12"
                                                :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                                                :parser="value => value.replace(/$s?|(,*)/g, '')"
                                                ></InputNumber>
                                                元
                                            </Row>
                                            <Row class="row">
                                                客商险，每月
                                                <InputNumber
                                                v-model="Form2.costdetail.A13"
                                                :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                                                :parser="value => value.replace(/$s?|(,*)/g, '')"
                                                ></InputNumber>
                                                元
                                            </Row>
                                            <Row class="row">
                                                带垫利息成本
                                                <InputNumber
                                                v-model="Form2.costdetail.A19"
                                                :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                                                :parser="value => value.replace(/$s?|(,*)/g, '')"
                                                ></InputNumber>
                                                元
                                            </Row>
                                            <Row>
                                                其他，每月
                                                <InputNumber
                                                v-model="Form2.costdetail.A08"
                                                :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                                                :parser="value => value.replace(/$s?|(,*)/g, '')"
                                                ></InputNumber>
                                                元，备注
                                                <Input v-model="Form2.costdetail.C08" style="width:300px" placeholder="请输入备注..."></Input>
                                            </Row>
                                        </div>
                                        <div class="borderleft between contentright" style="width:25%">
                                            <div style="width:50%;" class="content">
                                                <Row class="row">{{Form2.costdetail.D00}}</Row>
                                                <Row class="row">{{Form2.costdetail.D11}}</Row>
                                                <Row class="row">{{Form2.costdetail.D01}}</Row>
                                                <Row class="row">{{Form2.costdetail.D02}}</Row>
                                                <Row class="row">{{Form2.costdetail.D03}}</Row>
                                                <Row class="row">{{Form2.costdetail.D04}}</Row>
                                                <Row class="row">{{Form2.costdetail.D12}}</Row>
                                                <Row class="row">{{Form2.costdetail.D13}}</Row>
                                                <Row class="row">{{Form2.costdetail.D19}}</Row>
                                                <Row>{{Form2.costdetail.D08}}</Row>
                                            </div>
                                            <div class="borderleft content" style="width:50%">
                                                <Row class="row">{{Form2.costdetail.E00}}</Row>
                                                <Row class="row">{{Form2.costdetail.E11}}</Row>
                                                <Row class="row">{{Form2.costdetail.E01}}</Row>
                                                <Row class="row">{{Form2.costdetail.E02}}</Row>
                                                <Row class="row">{{Form2.costdetail.E03}}</Row>
                                                <Row class="row">{{Form2.costdetail.E04}}</Row>
                                                <Row class="row">{{Form2.costdetail.E12}}</Row>
                                                <Row class="row">{{Form2.costdetail.E13}}</Row>
                                                <Row class="row">{{Form2.costdetail.E19}}</Row>
                                                <Row>{{Form2.costdetail.E08}}</Row>
                                            </div>
                                        </div>
                                        <div class="borderleft between contentright" style="width:25%">
                                            <div style="width:50%" class="content">
                                                <Row class="row">{{Form2.costdetail.F00}}</Row>
                                                <Row class="row">{{Form2.costdetail.F11}}</Row>
                                                <Row class="row">{{Form2.costdetail.F01}}</Row>
                                                <Row class="row">{{Form2.costdetail.F02}}</Row>
                                                <Row class="row">{{Form2.costdetail.F03}}</Row>
                                                <Row class="row">{{Form2.costdetail.F04}}</Row>
                                                <Row class="row">{{Form2.costdetail.F12}}</Row>
                                                <Row class="row">{{Form2.costdetail.F13}}</Row>
                                                <Row class="row">{{Form2.costdetail.F19}}</Row>
                                                <Row>{{Form2.costdetail.F08}}</Row>
                                            </div>
                                            <div class="borderleft content" style="width:50%">
                                                <Row class="row">{{Form2.costdetail.G00}}</Row>
                                                <Row class="row">{{Form2.costdetail.G11}}</Row>
                                                <Row class="row">{{Form2.costdetail.G01}}</Row>
                                                <Row class="row">{{Form2.costdetail.G02}}</Row>
                                                <Row class="row">{{Form2.costdetail.G03}}</Row>
                                                <Row class="row">{{Form2.costdetail.G04}}</Row>
                                                <Row class="row">{{Form2.costdetail.G12}}</Row>
                                                <Row class="row">{{Form2.costdetail.G13}}</Row>
                                                <Row class="row">{{Form2.costdetail.G19}}</Row>
                                                <Row>{{Form2.costdetail.G08}}</Row>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="header" style="margin-top:-1px">
                                        <div class="borderbottom lefttitle" style="width:5%;margin-bottom:-1px;background-color:#f8f8f9;">
                                            <div class="title">年费用</div>
                                        </div>
                                        <div class="borderleft content" style="width:45%;">
                                            <Row class="row">
                                                车船税，每年
                                                <InputNumber
                                                v-model="Form2.costdetail.A05"
                                                :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                                                :parser="value => value.replace(/$s?|(,*)/g, '')"
                                                ></InputNumber>
                                                元
                                            </Row>
                                            <Row class="row">
                                                保险年费用合计<Tag color="green">{{Form2.costdetail.A06=Form2.insureyearcost}}</Tag>元，每
                                                <Select v-model="Form2.costdetail.B06=1" style="width:100px;padding-right:5px">
                                                    <Option v-for="item in 3" :key="item" :value="item">{{item}}</Option>
                                                </Select>
                                                年一缴
                                            </Row>
                                        </div>
                                        <div class="borderleft between contentright" style="width:25%">
                                            <div style="width:50%" class="content">
                                                <Row class="row">{{Form2.costdetail.D05}}</Row>
                                                <Row class="row">{{Form2.costdetail.D06}}</Row>
                                            </div>
                                            <div class="borderleft content" style="width:50%">
                                                <Row class="row">{{Form2.costdetail.E05}}</Row>
                                                <Row class="row">{{Form2.costdetail.E06}}</Row>
                                            </div>
                                        </div>
                                        <div class="borderleft between contentright" style="width:25%">
                                            <div style="width:50%" class="content">
                                                <Row class="row">{{Form2.costdetail.F05}}</Row>
                                                <Row class="row">{{Form2.costdetail.F06}}</Row>
                                            </div>
                                            <div class="borderleft content" style="width:50%">
                                                <Row class="row">{{Form2.costdetail.G05}}</Row>
                                                <Row class="row">{{Form2.costdetail.G06}}</Row>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="header" style="margin-top:-1px">
                                        <div class="borderbottom lefttitle" style="width:5%;margin-bottom:-1px;background-color:#f8f8f9;">
                                            <div class="title" style="margin-top:6px">次费用</div>
                                        </div>
                                        <div class="borderleft content" style="width:45%;">
                                            <Row class="row">
                                                上牌规费，每次
                                                <Tag color="green">{{Form2.costdetail.A07}}</Tag>
                                                元
                                            </Row>
                                            <Row class="row">
                                                统缴卡，每次
                                                <InputNumber
                                                v-model="Form2.costdetail.A16"
                                                :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                                                :parser="value => value.replace(/$s?|(,*)/g, '')"
                                                ></InputNumber>
                                                元
                                            </Row>
                                            <Row>
                                                二级维护，每次
                                                <InputNumber
                                                v-model="Form2.costdetail.A18"
                                                :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                                                :parser="value => value.replace(/$s?|(,*)/g, '')"
                                                ></InputNumber>
                                                元
                                            </Row>
                                        </div>
                                        <div class="borderleft between contentright" style="width:25%">
                                            <div style="width:50%" class="content">
                                                <Row class="row">{{Form2.costdetail.D07}}</Row>
                                                <Row class="row">{{Form2.costdetail.D16}}</Row>
                                                <Row>{{Form2.costdetail.D18}}</Row>
                                            </div>
                                            <div class="borderleft content" style="width:50%">
                                                <Row class="row">{{Form2.costdetail.E07}}</Row>
                                                <Row class="row">{{Form2.costdetail.E16}}</Row>
                                                <Row>{{Form2.costdetail.E18}}</Row>
                                            </div>
                                        </div>
                                        <div class="borderleft between contentright" style="width:25%">
                                            <div style="width:50%" class="content">
                                                <Row class="row">{{Form2.costdetail.F07}}</Row>
                                                <Row class="row">{{Form2.costdetail.F16}}</Row>
                                                <Row>{{Form2.costdetail.F18}}</Row>
                                            </div>
                                            <div class="borderleft content" style="width:50%">
                                                <Row class="row">{{Form2.costdetail.G07}}</Row>
                                                <Row class="row">{{Form2.costdetail.G16}}</Row>
                                                <Row>{{Form2.costdetail.G18}}</Row>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="header" style="margin-top:-1px">
                                        <div class="borderbottom lefttitle" style="width:5%;margin-bottom:-1px;background-color:#f8f8f9;">
                                            <div class="title" style="margin-top:27px">租金计算</div>
                                        </div>
                                        <div class="borderleft content" style="width:45%;text-align:center;background-color:#f8f8f9;">
                                            <Row class="row">
                                                费用月租金
                                            </Row>
                                            <Row class="row">
                                                折旧月租金
                                            </Row>
                                            <Row class="row">
                                                月租金
                                            </Row>
                                            <Row class="row">
                                                <Select v-model="Form2.taxmode=1" style="width:200px;padding-right:5px">
                                                    <Option :value="1">增值税16%总和</Option>
                                                    <Option :value="2">增值税17%总和</Option>
                                                    <Option :value="3">营业税5%总和</Option>
                                                </Select>
                                            </Row>
                                            <Row>
                                                含税月租金
                                            </Row>
                                        </div>
                                        <div class="borderleft content contentright" style="width:25%">
                                            <Row class="row">{{Form2.ratecost}}</Row>
                                            <Row class="row">{{Form2.ratedpn}}</Row>
                                            <Row class="row">{{Form2.rateamt}}</Row>
                                            <Row class="row">{{Form2.ratetax}}</Row>
                                            <Row>{{Form2.ratemamt}}</Row>
                                        </div>
                                        <div class="borderleft content contentright" style="width:25%">
                                            <Row class="row">{{Form2.fcost}}</Row>
                                            <Row class="row">{{Form2.fdpn}}</Row>
                                            <Row class="row">{{Form2.famt}}</Row>
                                            <Row class="row">{{Form2.ftax}}</Row>
                                            <Row>{{Form2.fmamt}}</Row>
                                        </div>
                                    </div>
                                    <div class="header" style="margin-top:-1px">
                                        <div class="borderbottom lefttitle" style="width:5%;margin-bottom:-1px;background-color:#f8f8f9;">
                                            <div class="title" style="margin-top:2px">备注</div>
                                        </div>
                                        <div class="borderleft content" style="width:95%;">
                                            <Input v-model="Form2.amtmemo" type="textarea" :rows="3" placeholder="请输入备注内容..." />
                                        </div>
                                    </div>
                                </div>
                            </Card>
                            <!-- 附件上传-->
                            <Divider>附件上传</Divider>
                            <div>
                                <Upload
                                    multiple
                                    type="drag"
                                    action="//jsonplaceholder.typicode.com/posts/">
                                    <div style="padding: 20px 0">
                                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                                        <p>点击或拖拽文件至此</p>
                                    </div>
                                </Upload>
                            </div>

                            <div style="height:120px">
                                <!-- 底部图钉 -->
                                <Affix v-show="!panel2loading" :offset-bottom="10">
                                    <Card class="footer" :dis-hover="true">
                                        <div>
                                            <Card>
                                                <div slot="title">
                                                    <Row type="flex" justify="start" align="middle">
                                                        <Col span="2">
                                                        实际成交概况
                                                        </Col>
                                                        <Col span="5"  offset="17">
                                                            <ButtonGroup>
                                                                <Button icon="ios-calculator" type="info">计算</Button>
                                                                <Button icon="md-arrow-down" type="primary">暂存</Button>
                                                                <Button icon="md-arrow-up" type="success">提交</Button>
                                                            </ButtonGroup>
                                                        </Col>
                                                    </Row>
                                                </div>
                                                <div>
                                                    <Row type="flex" justify="start">
                                                        <i-col span="8">
                                                            <FormItem label="含税月租金" style="width:100%" prop="rentmamt">
                                                                <InputNumber
                                                                v-model="Form2.rentmamt"
                                                                :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                                                                :parser="value => value.replace(/$s?|(,*)/g, '')"
                                                                style="width:100%"></InputNumber>
                                                            </FormItem>
                                                        </i-col>
                                                        <i-col span="8">
                                                            <FormItem label="租金总额" style="width:100%" prop="rentamtt">
                                                                <span>{{Form2.rentamtt|monetfilter}}</span>
                                                            </FormItem>
                                                        </i-col>
                                                        <i-col span="8">
                                                            <FormItem label="成交利率" style="width:100%" prop="rentrate">
                                                                <span>{{Form2.rentrate}}%</span>
                                                            </FormItem>
                                                        </i-col>
                                                    </Row>
                                                    <Row type="flex" justify="start">
                                                        <i-col span="8">
                                                            <FormItem label="毛利总额" style="width:100%" prop="gm">
                                                                <span>{{Form2.gm|monetfilter}}</span>
                                                            </FormItem>
                                                        </i-col>
                                                        <i-col span="8">
                                                            <FormItem label="毛利率" style="width:100%" prop="gmt">
                                                                <span>{{Form2.gmt}}%</span>
                                                            </FormItem>
                                                        </i-col>
                                                        <i-col span="8">
                                                            <FormItem label="成交年化利率" style="width:100%" prop="rentratey">
                                                                <span>{{Form2.rentratey}}%</span>
                                                            </FormItem>
                                                        </i-col>
                                                    </Row>
                                                    <Row type="flex" justify="start">
                                                        
                                                    </Row>
                                                </div>
                                            </Card>
                                        </div>
                                    </Card>
                                </Affix>
                            </div>
                        </Form>
                        <Spin size="large" fix v-if="panel2loading"></Spin>
                    </div>
                </Panel>
            </Collapse>
        </Card>
    </div>
</template>

<script lang="ts">
import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
import Util from '@/lib/util'
import AbpBase from '@/lib/abpbase'
import PageRequest from '@/store/entities/page-request'
import PublicClass from '@/lib/publicclass'
import AddAccessory from './add-accessory.vue'
import AddOrdersFee from './add-ordersfee.vue'
import AddInsurance from './add-insurance.vue'
import InsureDetail from './insuredetail.vue'
 
class PagesItemCodeRequest extends PageRequest{//业务类别
    itemTypes:Array<number>
    maxResultCount=10000
    skipCount=0
}
class PagesOrdersRequest extends PageRequest{//试算查询
    orders_Auto:number=0;
    from:string='2000-01-01 00:00:00';
    to:string='3000-01-01 00:00:00';
    status:number=null;
}
class PagesFactoryBrandRequest extends PageRequest{//总厂牌
    maxResultCount=10000;
    skipCount=0;
}
class PagesBrandRequest extends PageRequest{//厂牌
    maxResultCount=10000
    skipCount=0;
    keyword:string
}
class PagesClasenRequest extends PageRequest{//车型
    maxResultCount=10000
    skipCount=0;
    keyword:string
}
class PagesSupplierRequest extends PageRequest{//厂商
    maxResultCount=10000
    skipCount=0;
    supplierTypes=[];
    fName:string='';
    supplierCode:string='';
}
class PagesIncRequest extends PageRequest{//公司别
    maxResultCount=10000
    skipCount=0;
}

@Component({
    components:{AddAccessory,AddOrdersFee,AddInsurance,InsureDetail}
})
export default class Order extends AbpBase{
//试算查询---------------------------------------------------------------------------------------------------------------------
    OrdersRequest:PagesOrdersRequest=new PagesOrdersRequest();//试算查询
    ItemCodeRequest:PagesItemCodeRequest = new PagesItemCodeRequest();
    FactoryBrandRequest:PagesFactoryBrandRequest= new PagesFactoryBrandRequest();//总厂牌
    BrandRequest:PagesBrandRequest= new PagesBrandRequest();//厂牌
    ClasenRequest:PagesClasenRequest=new PagesClasenRequest();//车型
    SupplierRequest:PagesSupplierRequest=new PagesSupplierRequest();//厂商
    IncRequest:PagesIncRequest=new PagesIncRequest();//公司别
    //试算查询Form数据-----

    collapseKey='1';//选中Panel
    Form1={
        orders:null,//查询试算单号
        ordersstatus:-1,//所选查询类型
        ordersstatuslist:[],//查询类型列表
        ordersheader:[//试算列表表头
            {
                title: '试算单号',
                key: 'id',
                fixed: 'left'
            },
            {
                title: '厂牌',
                render:(h:any,params:any)=>{
                    return h("span",params.row.brand.brandName)
                }
            },
            {
                title: '车型',
                render:(h:any,params:any)=>{
                    return h("span",params.row.clasen.clasenName)
                }
            },
            {
                title: '月租金',
                key: 'mamt',
                width: 100
            },
            {
                title: '残值',
                key: 'overAmt'
            },
            {
                title: '成交利率',
                render:(h:any,params:any)=>{
                    return h("span",params.row.rateRate+"%")
                }
            },
            {
                title: '状态',
                key: 'orderStatusName'
            }
        ],
        orderscontent:[],//试算列表数据
    }
    //计算属性-----
    get totalCount(){//数据总数
        return this.$store.state.orders.totalCount
    }
    get ordersloading(){//Form1列表加载动画状态
        return this.$store.state.orders.loading
    }
    get carloading(){//厂牌车型加载动画状态
        return this.$store.state.factorybrand.loading
    }
    get currentPage(){//当前页码
        return this.$store.state.orders.currentPage;
    }
    get skipCount(){//跳过条数
        return (this.$store.state.orders.currentPage-1)*this.$store.state.orders.pageSize
    }

    //自定义函数----- 
    /** 
     * 获取试算单状态列表
     * */  
    async GetOrdersStatus(){
        this.ItemCodeRequest.itemTypes=[327]
        await this.$store.dispatch({
            type:'itemCode/GetItemCodeByItemTypes',
            data:this.ItemCodeRequest
        }).then(res=>{
            this.Form1.ordersstatuslist = res.items
        })
    }
    /**
     * 查询试算列表
     */
    GetOrdersList(){
        this.OrdersRequest.maxResultCount=this.$store.state.orders.pageSize;
        this.$store.dispatch({
            type:'orders/GetOrdersList',
            data:this.OrdersRequest
        }).then(res=>{
            this.Form1.orderscontent=res.items
        })
    }
    /**
     * 更新查询日期范围
     */
    udate(daterange){
        let [f,t]=[...daterange]
        if((f+t).length>0){
            this.OrdersRequest.from=f+" 00:00:00"
            this.OrdersRequest.to=t+" 23:59:59"
        }
        else{
            this.OrdersRequest.from="2000-01-01 00:00:00"
            this.OrdersRequest.to="3000-01-01 00:00:00"
        }
    }
    /**
     * 依条件查询试算列表
     */
    SearchOrders(){
        if(this.Form1.orders==null){
            this.OrdersRequest.orders_Auto=0
        }else{
            this.OrdersRequest.orders_Auto=this.Form1.orders
        }
        if(this.Form1.ordersstatus!=-1){
            this.OrdersRequest.status=this.Form1.ordersstatus
        }else{
            this.OrdersRequest.status=null
        }
        this.GetOrdersList()
    }
    //试算查询列表分页
    /** 
     * 更新当前页码
    */
    currentPageChange(page:number){
        this.$store.commit('orders/updatestate',{currentPage:page});
        this.OrdersRequest.skipCount=this.skipCount;
        this.GetOrdersList()
    }
    /**
     * 更新试算列表每页显示条数
     */
    pageSizeChange(pagesize:number){
        this.$store.commit('orders/updatestate',{pageSize:pagesize});
        this.GetOrdersList()
    }








//试算输入---------------------------------------------------------------------------------------------------------------------
    //定义临时储值变量区
        panel2loading=true//试算输入-加载状态
        accessorymodal=false//新增配件-对话框状态
        ordersfeemodal=false//新增上牌规费-对话框状态
        insurancefeemodal=false//新增保险-对话框状态
    Form2={
        ordertype:null,//业务类型
        ordertypelist:[],//业务类型列表
        tenancyterm:60,//租赁期数
        renttype:null,//租赁性质
        renttypelist:[],//租赁性质列表
        switch1:false,//限牌照使用
        factorybrandtype:-1,//所选总厂牌类型
        factorybrandlist:[],//总厂牌列表
        brandclasentype:[],//所选厂牌车型
        brandclasen:[],//厂牌车型
        supplierlist:[],//报价厂商列表
        suppliertype:null,//所选报价厂商类型
        clasencode:'',//车型代码
        makno:null,//车号
        carcolor:'',//车色
        cc:null,//排气量
        usekm:null,//起租里程
        bstype:null,//所选排挡方式
        bslist:[],//排挡方式列表
        oiltype:null,//所选燃油种类
        oillist:[],//燃油种类列表
        weight:1.5,//吨数
        mm2:0,//已用月数
        cardate:'',//出厂日期
        carsource:null,//车辆来源
        carsourcelist:[],//车辆来源列表
        inc:null,//公司别
        inclist:[],//公司别列表
        listprice:0,//车辆牌价
        disprice:null,//折价金额
        cartax:null,//购置税
        carcost:null,//车辆成本
        overamtu:null,//还车残值调整
        overamt:null,//预估残值
        overp:0,//残值比例
        repurchaseamt:null,//期满回购价
        rentamt:null,//承租车价
        dpttax:null,//带垫利息成本
        dptamt:null,//保证金
        dpttype:null,//保证金类型1
        dpttypelist:[],//保证金类型1列表
        dpttaxpay:null,//保证金类型2
        dpttaxpaylist:[],//保证金类型2列表
        dptp:null,//保证金比例
        trnsfee:null,//过户费
        stamptax:null,//印花税
        costadjustment:null,//成本调整
        sellcartax:null,//售车税
        accessary:null,//配件金额
        accessoryheader:[//配件列表表头
            {
                title: '厂商',
                key: 'supplierName'
            },
            {
                title: '主配件',
                key: 'accessoriesmaintypeName'
            },
            {
                title: '次配件',
                key: 'accessoriestypeName'
            },
            {
                title: '售价',
                key: 'purchaseprice'
            },
            {
                title: '座位数',
                key: 'seat'
            },
            {
                title: '施工位置',
                key: 'location'
            },
            {
                title: '备注',
                key: 'accessoryremark'
            },
            {
                title: '操作',
                key: 'action',
                fixed: 'right',
                align: 'center',
                render: (h, params) => {
                    return h('Button', {
                        props: {
                            type: 'error',
                            size: 'small'
                        },
                        style:{
                            width:'100px'
                        },
                        on: {
                            click: () => {
                                this.Form2.accessorycontent.splice(params.index,1)
                            }
                        }
                    }, '删除')
                }
            }
        ],
        accessorycontent:[],//配件列表
        ordersfeetypeheader:[//上牌规费列表表头
            {
                title: '公司别',
                key: 'incname'
            },
            {
                title: '费用别',
                key: 'ordersfeetypename'
            },
            {
                title: '费用金额',
                key: 'feeAmt'
            },
            {
                title: '备注',
                key: 'ordersfeememo'
            },
            {
                title: '操作',
                key: 'action',
                fixed: 'right',
                align: 'center',
                render: (h, params) => {
                    return h('Button', {
                        props: {
                            type: 'error',
                            size: 'small'
                        },
                        style:{
                            width:'100px'
                        },
                        on: {
                            click: () => {
                                this.Form2.ordersfeetypecontent.splice(params.index,1)
                                this.getA07()
                            }
                        }
                    }, '删除')
                }
            }
        ],
        ordersfeetypecontent:[],//上牌规费列表数据
        insureheader:[//保险列表表头
            {
                type: 'expand',
                width: 50,
                render: (h, params) => {
                    return h(InsureDetail, {
                        props: {
                            row: params.row
                        }
                    })
                }
            },
            {
                align: 'center',
                title: '年度',
                key:'insureyearname'
            },
            {
                align: 'center',
                title: '投保',
                key: 'customercarename'
            },
            {
                align: 'center',
                title: '标准保费',
                key: 'sumorgamt'
            },
            {
                align: 'center',
                title: '保费',
                key: 'sumrateamt'
            },
            {
                align: 'center',
                title: '折扣',
                key: ''
            },
            {
                title: '操作',
                key: 'action',
                align: 'center',
                render: (h, params) => {
                    return h('Button', {
                        props: {
                            type: 'error',
                            size: 'small'
                        },
                        style:{
                            width:'100px'
                        },
                        on: {
                            click: () => {
                                this.Form2.insurecontent.splice(params.index,1)
                                this.getInsureYearCost()
                            }
                        }
                    }, '删除')
                }
            }
        ],
        insurecontent:[],//保险列表数据
        insureyearcost:0,//保险成本（年）

        raterate:0,//计价成本
        frate:0,//实际成交价
        costdetail:{//成本计算明细
        //
            //月费用------------
            //残值利息
            D00:0,E00:0,F00:0,G00:0,
            //代步车每月费用list ItemType=971
            A11:null,A11list:[], D11:0,E11:0,F11:0,G11:0,
            //保养维修费
            B01:null,B01KM:0,U01:0, D01:0,E01:0,F01:0,G01:0,
            //牵送费
            A02:0, D02:0,E02:0,F02:0,G02:0,
            //验车费
            A03:0, D03:0,E03:0,F03:0,G03:0,
            //服务费
            A04:null,chk04:false,ServiceAmt:0, D04:0,E04:0,F04:0,G04:0,
            //牌照使用费
            A12:0, D12:0,E12:0,F12:0,G12:0,
            //客商险
            A13:0, D13:0,E13:0,F13:0,G13:0,
            //带垫利息成本
            A19:0, D19:0,E19:0,F19:0,G19:0,
            //其他
            A08:0,C08:'', D08:0,E08:0,F08:0,G08:0,
            //年费用-------------
            //车船税
            A05:0, D05:0,E05:0,F05:0,G05:0,
            //保险年费用合计
            A06:0,B06:null, D06:0,E06:0,F06:0,G06:0,
            //次费用-------------
            //上牌规费
            A07:0, D07:0,E07:0,F07:0,G07:0,
            //统缴卡
            A16:0, D16:0,E16:0,F16:0,G16:0,
            //二级维护
            A18:0, D18:0,E18:0,F18:0,G18:0,
        },
        ratecost:0,//计价成本-费用月租金
        fcost:0,//实际成交价-费用月租金
        ratedpn:0,//计价成本-折旧月租金
        fdpn:0,//实际成交价-折旧月租金
        rateamt:0,//计价成本-月租金
        famt:0,//实际成交价-月租金
        taxmode:null,//税金
        ratetax:0,//计价成本-税金
        ftax:0,//实际成交价-税金
        ratemamt:0,//计价成本-含税月租金
        fmamt:0,//实际成交价-含税月租金
        amtmemo:'',//备注

        rentmamt:0,//含税月租金
        rentamtt:0,//租金总额
        rentrate:0,//成交利率
        gm:0,//毛利总额
        gmt:0,//毛利率
        rentratey:0,//成交年化利率
    }


    check={
        test: [PublicClass.Check.required.text,PublicClass.Check.checkvalue.mail]
    }


//方法function
    // (this.$refs[fname]  as any).validate(async (valid:boolean)=>{
        //     console.log(valid);
        //     if(valid){

        //     }else{
        //         //(this.$refs[fname]  as any).resetFields()
        //     }
        // })

    
    
    //表单检查---------------
    checkorders(){
        
    }
    /**切换折叠面板 */
    showPanel(array){
        this.collapseKey=array[0]
    }
    /**底部图钉监听1 */
    @Watch("collapseKey",{immediate: true})
    triggerResize(){
        setTimeout(() => {
            let e = document.createEvent('Event')
            e.initEvent('resize', true, true)
            window.dispatchEvent(e)
        }, 300);
    }
    /**底部图钉监听2 */
    @Watch("panel2loading",{immediate: true})
    triggerResize2(){
        if(this.panel2loading==false){
            setTimeout(() => {
            let e = document.createEvent('Event')
            e.initEvent('resize', true, true)
            window.dispatchEvent(e)
        },300);
        }
    }


    /**计算保险年成本 */
    getInsureYearCost(){
        let sum:number=0
        this.Form2.insurecontent.forEach(i=>{
            sum+=i.sumrateamt
        })
        if(this.Form2.insurecontent.length>0){
            this.Form2.insureyearcost=(sum/this.Form2.insurecontent.length)
        }else{
            this.Form2.insureyearcost=0
        }
    }
    /**获取上牌规费 */
    getA07(){
        let sum:number=0
        this.Form2.ordersfeetypecontent.forEach(i=>{
            sum+=i.feeAmt
        })
        this.Form2.costdetail.A07=sum
    }
    /**出厂年月 */
    CarDate(value){
        this.Form2.cardate=value
    }
    /**获取租赁性质列表 */
    async getRentTypeList(){
        this.ItemCodeRequest.itemTypes=[236]
        await this.$store.dispatch({
            type:'itemCode/GetItemCodeByItemTypes',
            data:this.ItemCodeRequest
        }).then(res=>{
            this.Form2.renttypelist=res.items;
        })
    };
    /**获取车辆来源列表 */
    async getCarSourceList(){
        this.ItemCodeRequest.itemTypes=[503]
        await this.$store.dispatch({
            type:'itemCode/GetItemCodeByItemTypes',
            data:this.ItemCodeRequest
        }).then(res=>{
            this.Form2.carsourcelist=res.items;
        })
    };
   /**
    * 获取业务类别
    */
    async GetOrderTypeList(){
        this.ItemCodeRequest.itemTypes=[326]
        let newlist=[];
        await this.$store.dispatch({
            type:'itemCode/GetItemCodeByItemTypes',
            data:this.ItemCodeRequest
        }).then(res=>{
            res.items.map(i=>{
                if(i.num!=3){
                    newlist.push(i)
                }
            })
        })
        this.Form2.ordertypelist=newlist;
        
    };
    /**
     * 获取总厂牌
     */
    async GetFactoryBrandList(){
        await this.$store.dispatch({
            type:'factorybrand/GetAll',
            data:this.FactoryBrandRequest
        }).then(res=>{
            this.Form2.factorybrandlist=res.items
            this.Form2.factorybrandtype=60//获取数据后重新指定默认选项
        })
    }
    /**
     * 获取厂牌
     */
    getBrands(value){
        this.Form2.brandclasentype=[]
        if(value!=-1){
            this.BrandRequest.keyword=value
        }else{
            this.BrandRequest.keyword=""
        }
        this.$store.dispatch({
            type:'brand/GetAll',
            data:this.BrandRequest
        }).then(res=>{
            let list=PublicClass.ConvertTree(res.items,{
                value:'id',
                label:'brandName'
            },1)
            this.Form2.brandclasen=list
        })
    }
    /**
     * 获取车型
     */
    getClasen(item,callback){
        item.loading=true
        this.ClasenRequest.keyword=item.value
        this.$store.dispatch({
            type:'clasen/GetAll',
            data:this.ClasenRequest
        }).then(res=>{
            let list=PublicClass.ConvertTree(res.items,{
                value:'id',
                label:'clasenName'
            },0)
            item.children=list
            item.loading=false
            callback()
        })
    }
    /**
     * 获取报价车商
     */
    async getSupplier1(){
        this.SupplierRequest.supplierTypes=[6,7]
        await this.$store.dispatch({
            type:'supplier/getAll',
            data:this.SupplierRequest
        }).then(res=>{
            this.Form2.supplierlist=res.items
        })
    }
    /**
     * 获取排挡方式
     */
    async getBs(){
        this.ItemCodeRequest.itemTypes=[841]
        await this.$store.dispatch({
            type:'itemCode/GetItemCodeByItemTypes',
            data:this.ItemCodeRequest
        }).then(res=>{
            let list = res.items.map(i=>{
                if(i.num!=0){
                    this.Form2.bslist.push(i)
                }
            })
        })
    }
    /**
     * 获取燃油种类
     */
    async getOil(){
        this.ItemCodeRequest.itemTypes=[231]
        await this.$store.dispatch({
            type:'itemCode/GetItemCodeByItemTypes',
            data:this.ItemCodeRequest
        }).then(res=>{
            this.Form2.oillist=res.items
        })
    }
    /**获取公司别 */
    getInclist(){
        this.$store.dispatch({
            type:'inc/getAll',
            data:this.IncRequest
        }).then(res=>{
            this.Form2.inclist=res.items
            this.Form2.inc=1//指定默认选项
        })
    }
    /**获取保证金类型1 */
    async getDptTypeList(){
        this.ItemCodeRequest.itemTypes=[332]
        await this.$store.dispatch({
            type:'itemCode/GetItemCodeByItemTypes',
            data:this.ItemCodeRequest
        }).then(res=>{
            this.Form2.dpttypelist=res.items
        })
    }
    getDptTaxPayList(value){
        this.Form2.dpttaxpaylist=[]
        if(value==2){
            this.ItemCodeRequest.itemTypes=[333]
            this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.ItemCodeRequest
            }).then(res=>{
                this.Form2.dpttaxpaylist=res.items
            })
        }
    }
    /**计算成本-代步车-A11 */
    async getA11list(){
        this.ItemCodeRequest.itemTypes=[971]
        await this.$store.dispatch({
            type:'itemCode/GetItemCodeByItemTypes',
            data:this.ItemCodeRequest
        }).then(res=>{
            this.Form2.costdetail.A11list=res.items
            this.Form2.costdetail.A11=0
        })
    }


    //供子组件调用
    /**新增配件到试算表中 */
    SaveAccessory(data){
        this.Form2.accessorycontent.push(data)
    }
    /**新增上牌规费到试算表中 */
    SaveOrdersFee(data){
        this.Form2.ordersfeetypecontent.push(data)
        this.getA07()
    }
    /**新增保险到试算表中 */
    SaveInsure(data){
        this.Form2.insurecontent.push(data)
        this.getInsureYearCost()
    }




    //页面渲染前执行
    async created() {
        this.panel2loading=true

        this.GetOrdersList()
        await this.GetOrdersStatus()

        await this.getRentTypeList()
        await this.GetOrderTypeList()
        await this.getBs()
        await this.getOil()
        await this.getInclist()
        await this.GetFactoryBrandList()
        await this.getBrands(60)
        await this.getSupplier1()
        await this.getCarSourceList()
        await this.getDptTypeList()
        await this.getA11list()
        
        this.panel2loading=false
    }
    //页面渲染成功未显示时候执行
    mounted() {
        
    }
    
};
</script>

<style lang="less" scoped>
.panel2{
    position: relative;
}
.footer{
    background-color:#f8f8f9;
    width:100%;
}
.header{
    display: flex;
    justify-content: space-between;
    border:1px solid #D5D5D5;
    line-height:40px;
}
.left{
    padding-top:20px;
}
.between{
    display: flex;
    justify-content: space-between;
}
.borderleft{
    border-left:1px solid #D5D5D5;
}
.borderbottom{
    border-bottom:1px solid #D5D5D5;
}
.borderright{
    border-right:1px solid #D5D5D5;
}
.title{
    text-align:center;
    font-size: 18px;
    color: black;
    font-weight: bold;
}
.lefttitle{
    padding: 0 20px;
}
.row{
    border-bottom:1px solid #EEEEEE;
}
.content{
    padding:5px 10px;
}
.contentright{
    text-align:right;
}
</style>