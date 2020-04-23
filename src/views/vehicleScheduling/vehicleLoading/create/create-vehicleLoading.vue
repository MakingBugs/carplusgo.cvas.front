<template>
    <div>
        <Modal
         title='入库作业'
         :value="value"
         width="100"
         @on-visible-change="visibleChange"
        >
            <Form ref="queryForm" :label-width="80" label-position="right" inline>
                <Row :gutter="16">
                    <Col span="6">
                        <FormItem label="车牌号码" style="width:100%">
                            <Input v-model="pagerequest.makNo" placeholder="请输入车牌号码"/>
                        </FormItem>
                    </Col> 
                    <col span="6">
                        <Button icon="ios-search" type="primary" size="large" @click="getpage" class="toolbar-btn">查找</Button>
                    </col>
                </Row>
            </Form>
            <div class="margin-top-10">
                <Form ref="carBaseForm" :label-width="80" label-position="right" inline>  
                    <Row :gutter="20">
                        <Col :xs="24" :md="12" :xxl="6">
                            <FormItem :label="'车牌号码:'" style="width:100%">
                                <Input v-model="carBase.makNo" disabled :maxlength="50"/>
                            </FormItem>
                        </Col>
                        <Col :xs="24" :md="12" :xxl="6">
                            <FormItem :label="'发动机号:'" style="width:100%">
                                <Input v-model="carBase.engNo" disabled :maxlength="50"/>
                            </FormItem>
                        </Col>
                        <Col :xs="24" :md="12" :xxl="6">
                            <FormItem :label="'车架号:'" style="width:100%">
                                <Input v-model="carBase.carNo" disabled :maxlength="50"/>
                            </FormItem>
                        </Col>
                        <Col :xs="24" :md="12" :xxl="6">
                            <FormItem :label="'出厂日期:'" style="width:100%">
                                <DatePicker v-model="carBase.carDt" format="yyyy-MM-dd" disabled style="width:100%"/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="20" class="margin-top-10">
                        <Col :xs="24" :md="12" :xxl="6">
                            <FormItem :label="'车型:'" style="width:100%">
                                <Input v-model="clasenName" disabled :maxlength="50"/>
                            </FormItem>
                        </Col>
                        <Col :xs="24" :md="12" :xxl="6">
                            <FormItem :label="'车色:'" style="width:100%">
                                <Input v-model="carBase.carColor" disabled :maxlength="50"/>
                            </FormItem>
                        </Col>
                        <Col :xs="24" :md="12" :xxl="6">
                            <FormItem :label="'排气量:'" style="width:100%">
                                <Input v-model="carBase.cc" disabled :maxlength="50"/>
                            </FormItem>
                        </Col>
                        <Col :xs="24" :md="12" :xxl="6">
                            <FormItem :label="'燃油种类:'" style="width:100%">
                                <Input v-model="oilName" disabled :maxlength="50"/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="20" class="margin-top-10">
                        <Col :xs="24" :md="12" :xxl="6">
                            <FormItem :label="'变速种类:'" style="width:100%">
                                <Input v-model="bsTypeName" disabled :maxlength="50"/>
                            </FormItem>
                        </Col>
                        <Col :xs="24" :md="12" :xxl="6">
                            <FormItem :label="'车险性质别:'" style="width:100%">
                                <Input v-model="isBusinessName" disabled :maxlength="50"/>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
            <div slot="footer">
                <Button @click="insert" type="primary">开始收车</Button>
            </div>
            <insert-vehicleLoading v-model="insertModalShow" @save-success="save"></insert-vehicleLoading>
        </Modal>
    </div>
</template>

<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '@/lib/util'
    import AbpBase from '@/lib/abpbase'
    import PageRequest from '@/store/entities/page-request'
    import CarBase from '@/store/entities/car/carbase'
    import InsertVehicleLoading from './insert-vehicleLoading.vue'

    class PageCarBaseRequest extends PageRequest{
        makNo:String;
    }

    class PageItemCodeRequest extends PageRequest{
        itemTypes:Array<number>
    }

    @Component({
        components:{InsertVehicleLoading}
    })
    export default class CreateVehicleLoading extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        pagerequest:PageCarBaseRequest=new PageCarBaseRequest();
        pageItemCodeRequest:PageItemCodeRequest=new PageItemCodeRequest();
        carBase:CarBase=new CarBase();
        insertModalShow:Boolean=false;
        isBusinessList:any[]=[];
        oilList:any[]=[];
        bsTypeList:any[]=[];
        save(){
            this.$emit('save-success');
            this.$emit('input',false);
        }
        insert(){
            this.$store.commit('carbase/edit',this.carBase);
            this.insertModalShow=true;
        }
        async visibleChange(value:boolean){
            if(!value){
                this.$emit('input',value);
            }else{
                this.pageItemCodeRequest.maxResultCount=10000;
                this.pageItemCodeRequest.skipCount=0;
                this.pageItemCodeRequest.itemTypes = [231,411,841];

                let page = await this.$store.dispatch({
                    type:'itemCode/GetItemCodeByItemTypes',
                    data:this.pageItemCodeRequest
                })

                this.oilList = (page.items as Array<any>).filter(x=>x.itemType === 231)
                this.isBusinessList = (page.items as Array<any>).filter(x=>x.itemType === 411)
                this.bsTypeList = (page.items as Array<any>).filter(x=>x.itemType === 841)
            }
        }
        async getpage(){
            if((!!this.pagerequest.makNo) && this.pagerequest.makNo !== ''){
                await this.$store.dispatch({
                    type:'carbase/SelectCarBase',
                    data:this.pagerequest
                })
                this.carBase = this.$store.state.carbase.list[0]
            }
        }
        get clasenName(){
            return (!!this.carBase.clasen)?this.carBase.clasen.clasenName:'';
        }
        get oilName(){
            var temp = this.oilList.find(x=>x.num === this.carBase.oil);
            return (!!temp)? temp.itemName:''
        }
        get bsTypeName(){
            var temp = this.bsTypeList.find(x=>x.num === this.carBase.bstype);
            return (!!temp)? temp.itemName:''
        }
        get isBusinessName(){
            var temp = this.isBusinessList.find(x=>x.num === this.carBase.isBusiness);
            return (!!temp)? temp.itemName:''
        }
    }
</script>