<template>
    <div>
        <Modal
         :title="L('Edit')"
         :value="value" 
         :width="1200" :information="information"
         @on-ok="save"
         @on-visible-change="visibleChange"
        >
            <Form ref="accessoriesWorkForm"  label-position="left" :model="Form2" :label-width="80">
                <Row>
                        <Col span="6">
                            <FormItem :label="L('车牌号码')">
                                <Input v-model="Form2.makNo" style="width:200px" readonly/>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem :label="L('车型')">
                                <Input v-model="Form2.clasen" style="width:200px" :maxlength="50" :minlength="2" readonly/>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem :label="L('营业人员')">
                                <Input v-model="Form2.salesName" style="width:200px" :maxlength="50" :minlength="2" readonly/>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem :label="L('试算价格')">
                                <Input v-model="Form2.accessary" style="width:200px" :maxlength="50" :minlength="2" readonly/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="6">
                            <FormItem :label="L('客户名称')">
                                <Input v-model="Form2.cusName" style="width:200px" :maxlength="50" :minlength="2" readonly/>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem :label="L('开票信息')">
                                <Input v-model="Form2.incName" style="width:200px" :maxlength="50" :minlength="2" readonly/>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem :label="L('送修日期')">
                                <DatePicker v-model="Form2.SCDT" style="width:200px" type="date"></DatePicker>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem :label="L('预计完工')">
                                <DatePicker v-model="Form2.preOverDT" type="date"></DatePicker>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="24">
                            <FormItem :label="L('备注')">
                                <Input v-model="Form2.remark" style="width:1000px" type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder="请输入..."></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="6">
                            <FormItem :label="L('GPS是否安装')">
                                <RadioGroup v-model="Form2.is_GPS">
                                    <Radio label="0" disabled>否</Radio>
                                    <Radio label="1" disabled>是</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem :label="L('GPS序号')">
                                <Input v-model="Form2.GPSNo" style="width:200px" :maxlength="50" :minlength="2" readonly/>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem :label="L('SIM卡号')">
                                <Input v-model="Form2.SIMNo" style="width:200px" :maxlength="50" :minlength="2" readonly/>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem :label="L('GPS试算费用')">
                                <Input v-model="Form2.GPSFeeAmt" style="width:200px" :maxlength="50" :minlength="2" readonly/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Table :columns="columns" :no-data-text="L('NoDatas')" border :data="Form2.partslist">
                            </Table>
                        </Col>
                    </Row>
                    <Row style="margin-top: 10px">
                        <Col span='6'>
                            <FormItem :label="L('维修厂商')">
                                <Select v-model="Form2.supplier" style="width:200px" :disabled="isdisabled">
                                    <Option v-for="item in itemTypeList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="6">
                            <FormItem :label="L('配件类别')">
                                <Select v-model="Form2.mainAccessoriesType" style="width:200px" :disabled="isdisabled">
                                    <Option v-for="item in accessoriesList" :value="item.id" :key="item.id">{{ item.accessoriesMainName }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="6" style="margin-left: 8px">
                            <Select v-model="Form2.accessoriesType" style="width:200px" :disabled="isdisabled">
                                <Option v-for="item in accessoriesTypeList" :value="item.id" :key="item.id">{{ item.accessoriesTypeName}}</Option>
                            </Select>
                        </Col>
                        <Col span="6">
                            <FormItem :label="L('配件售价')">
                                <Input v-model="Form2.amt" style="width:200px" :maxlength="50" :minlength="2" readonly/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="6">
                            <FormItem :label="L('施工位置')">
                                <Select v-model="Form2.location" style="width:200px" :placeholder="L('Select')" :disabled="isdisabled">
                                    <Option v-for="item in locationsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem :label="L('座位数')">
                                <Select v-model="Form2.seat" style="width:200px" :placeholder="L('Select')" :disabled="isdisabled">
                                    <Option v-for="item in seatList" :value="item.value" :key="item.value">{{ item.label}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="6" style="margin-left:290px">
                            <Button @click="detailsave" type="primary">{{L('明细存档')}}</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="24">
                            <FormItem :label="L('施工及价格变动说明')">
                                <Input v-model="Form2.accessoryRemark" style="width:1000px" type="textarea" :autosize="{minRows: 3,maxRows: 5}" :disabled="isdisabled"></Input>
                            </FormItem>
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
    import AccessoriesWork from '@/store/entities/accessories/accessoriesWork';

    class PageAccessoriesWorkRequest extends PageRequest{
        keyword:string='';
        from:Date;
        to:Date;
    }
    class PageItemCodeRequest extends PageRequest{
        keyword:string='';
        from:Date;
        to:Date;
        itemTypes:Array<number>
    }
    class PageAccessoriesMainTypeRequest extends PageRequest{
        keyword:string='';
        from:Date;
        to:Date;
    }
    class PageAccessoriesTypeRequest extends PageRequest{
        keyword:string='';
        from:Date;
        to:Date;
    }

    @Component
    export default class EditAccessoriesWorks extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        @Prop({type:Object,default:null}) information:boolean;
        accessoriesWork:AccessoriesWork=new AccessoriesWork();
        pageAccessoriesWorkRequest:PageAccessoriesWorkRequest=new PageAccessoriesWorkRequest();
        pageAccessoriesMainTypeRequest:PageAccessoriesMainTypeRequest=new PageAccessoriesMainTypeRequest();
        pageAccessoriesTypeRequest:PageAccessoriesTypeRequest=new PageAccessoriesTypeRequest();
        pageItemCodeRequest:PageItemCodeRequest=new PageItemCodeRequest();
        itemcodelist:any=null;
        isdisabled:boolean=true;//设置下拉框禁用
        
        save(){
            (this.$refs.accessoriesWorkForm as any).validate(async (valid:boolean)=>{
                if(valid){
                    await this.$store.dispatch({
                        type:'accessoriesWork/update',
                        data:this.accessoriesWork
                    });
                    (this.$refs.accessoriesWorkForm as any).resetFields();
                    this.$emit('save-success');
                    this.$emit('input',false);
                }
            })
        }
        cancel(){
                //清空
            // this.accessoriesWork.makNo="";
            // this.accessoriesWork.clasen="";
            // this.accessoriesWork.salesName="";
            // this.accessoriesWork.accessary="";
            // this.accessoriesWork.cusName="";
            // this.accessoriesWork.incName="";
            // this.accessoriesWork.sendDT="";
            // this.accessoriesWork.preOverDT="";
            // this.accessoriesWork.remark="";
            // this.accessoriesWork.is_GPS="";
            // this.accessoriesWork.GPSNo="";
            // this.accessoriesWork.SIMNo="";
            // this.accessoriesWork.GPSFeeAmt="";
            // this.accessoriesWork.supplier="";
            // this.accessoriesWork.mainAccessoriesType="";
            // this.accessoriesWork.accessoriesType="";
            // this.accessoriesWork.amt="";
            // this.accessoriesWork.location="";
            // this.accessoriesWork.seat="";
            // this.accessoriesWork.accessoryRemark="";
            (this.$refs.accessoriesWorkForm as any).resetFields();
            this.$emit('input',false);
        }
        visibleChange(value:boolean){
            if(!value){
                this.$emit('input',value);
            }else{
                this.getList();
                this.Form2=Util.extend(true,{},this.information);
                //if(){//如果没有GPS
                //    this.Form2.is_GPS="0";
                //    this.Form2.GPSNo="";
                //    this.Form2.SIMNo="";
                //    this.Form2.GPSFeeAmt="";
                //}else{
                //    this.Form2.is_GPS="1";
                //    this.Form2.GPSNo=this.;
                //    this.Form2.SIMNo=this.;
                //    this.Form2.GPSFeeAmt=this.;
                //}
                
                this.Form2.partslist=this.aa;
            }
        }
        get itemTypeList(){//厂商
            return this.itemcodelist;
        };
        get accessoriesList(){//主配件
            return this.$store.state.accessoriesMainType.list;
        };
        get accessoriesTypeList(){//次配件
            return this.$store.state.accessoriesType.list;
        };
        get locationsList(){//施工位置
            return this.locations;
        }
        get seatList(){//座位数
            return this.seat;
        }
        async getList(){
            this.pageAccessoriesMainTypeRequest.maxResultCount=10000;
            this.pageAccessoriesMainTypeRequest.skipCount=0;
            
            await this.$store.dispatch({
                type:'accessoriesMainType/getAll',
                data:this.pageAccessoriesMainTypeRequest
            })
            this.pageAccessoriesTypeRequest.maxResultCount=10000;
            this.pageAccessoriesTypeRequest.skipCount=0;
            
            await this.$store.dispatch({
                type:'accessoriesType/getAll',
                data:this.pageAccessoriesTypeRequest
            })
            this.pageItemCodeRequest.maxResultCount=10000;
            this.pageItemCodeRequest.skipCount=0;
            this.pageItemCodeRequest.itemTypes = [883];
            
            this.itemcodelist=(await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            })).items
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
                                //this.$store.commit('ordersAccessary/edit',params.row);
                                this.disableds();//取消禁用
                                //this.Form2.supplier=params.row.itemName
                                // console.log(params.row)
                                // console.log(this.Form2.amt)
                            }
                        }
                    },this.L('选择')),
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
                                            await this.$store.dispatch({
                                                type:'accessoriesWork/delete',
                                                data:params.row
                                            })
                                        }
                                })
                            }
                        }
                    },this.L('Delete'))
                ])
            }
        }]
        locations:any[]=[//施工位置
           {
                value: '全车',
                label: '全车'
            },
            {
                value: '前档',
                label: '前档'
            },
            {
                value: '后档',
                label: '后档'
            },
            {
                value: '侧后档',
                label: '侧后档'
            },
            {
                value: '前杠',
                label: '前杠'
            },
            {
                value: '后杠',
                label: '后杠'
            },
            {
                value: '底盘',
                label: '底盘'
            },
            {
                value: '车门',
                label: '车门'
            },
            {
                value: '车身',
                label: '车身'
            },
        ]
        seat:any[]=[//座位数
           {
               value:'2座',
               label:'2座'
           },
           {
               value:'3座',
               label:'3座'
           },
           {
               value:'4座',
               label:'4座'
           },
           {
               value:'5座',
               label:'5座'
           },
           {
               value:'6座',
               label:'6座'
           },
           {
               value:'7座',
               label:'7座'
           },
           {
               value:'8座',
               label:'8座'
           },
           {
               value:'9座',
               label:'9座'
           },
           {
               value:'10座',
               label:'10座'
           }
        ]
   
    Form2={
        makNo:"",
        clasen:"",
        salesName:"",
        accessary:"",
        cusName:"",
        incName:"",
        sendDT:"",
        preOverDT:"",
        remark:"",
        is_GPS:"",
        GPSNo:"",
        SIMNo:"",
        GPSFeeAmt:"",
        supplier:"",
        mainAccessoriesType:"",
        accessoriesType:"",
        amt:"",
        location:"",
        seat:"",
        accessoryRemark:"",
        partslist:[]
    }
    aa:any=[{//Table列表
            accessoriesAuto: 39201,
            itemName: '苏州名骏百盛',
            mainAccessory: '3M-太阳膜',
            subAccessory: '3M超级沙龙侧后档7座',
            location: '全车',
            seat: '2座',
            accessoryRemark:'',
            amt:'1490'
        }]
    /**明细存档*/
    detailsave(){

    }
    /**取消禁用的下拉框 */
     disableds(){
         this.isdisabled=false;//下拉框设为可选
     }
    }
</script>
