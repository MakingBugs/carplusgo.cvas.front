<template>
    <div>
        <Modal
         title='选取车辆'
         :value="value"
         fullscreen
         @on-ok="save"
         @on-visible-change="visibleChange"
        >
            <Form ref="queryForm" :label-width="80" label-position="right" inline>
                <Row :gutter="16">
                    <Col span="6">
                        <FormItem :label="'提领区域:'" style="width:100%">
                            <Input v-model="areaName" disabled :maxlength="50"/>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label="'提领仓库:'" style="width:100%">
                            <Select v-model="pagerequest.repositoryID" clearable>
                                <Option v-for="item in repositoryList" :value="item.id" :key="item.id">{{ item.repositoryName }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label="'车险性质别:'" style="width:100%">
                            <Select v-model="pagerequest.isBusiness" clearable>
                                <Option v-for="item in isBusinessList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label="'提领车型:'" style="width:100%">
                            <Select v-model="factoryBrandId" clearable @on-change="factoryBrandChange">
                                <Option v-for="item in factoryBrandList" :value="item.id" :key="item.id">{{ item.factoryBrandName }}</Option>
                            </Select>
                            <Select v-model="brandId" clearable @on-change="brandChange">
                                <Option v-for="item in brandList" :value="item.id" :key="item.id">{{ item.brandName }}</Option>
                            </Select>
                            <Select v-model="pagerequest.clasenId" clearable>
                                <Option v-for="item in clasenList" :value="item.id" :key="item.id">{{ item.clasenName }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label="'燃油种类:'" style="width:100%">
                            <Select v-model="pagerequest.oil" clearable>
                                <Option v-for="item in oilList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label="'出厂日期:'" style="width:100%">
                            <DatePicker  v-model="carDate" type="daterange" format="yyyy-MM-dd" style="width:100%" placement="bottom-end" :placeholder="L('SelectDate')"></DatePicker>
                        </FormItem>
                    </Col>
                    <col span="6">
                        <Button icon="ios-search" type="primary" size="large" @click="getpage" class="toolbar-btn">查找</Button>&nbsp;&nbsp;
                    </col>
                </Row>
                <Row>
                    <col span="12">
                        <h3>资料笔数：{{totalCount}}笔</h3>
                    </col>
                </Row>
            </Form>
            <div class="margin-top-10">
                <Table :loading="loading" :columns="columns" :no-data-text="L('NoDatas')" border :data="list" @on-select="selectChange">
                </Table>
            </div>
            <div slot="footer">
                <Button @click="cancel">{{L('Cancel')}}</Button>
                <Button @click="save" type="primary">{{L('OK')}}</Button>
            </div>
        </Modal>
    </div>
</template>

<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '@/lib/util'
    import AbpBase from '@/lib/abpbase'
    import PageRequest from '@/store/entities/page-request'
    import TakeCarApply from '@/store/entities/vehicleScheduling/takeCarApply'

    class PageCarBaseRequest extends PageRequest{
        carDtFrom:Date;
        carDtTo:Date;
        repositoryID:Number;
        isBusiness:Number;
        oil:Number;
        clasenId:Number;
    }

    class PageItemCodeRequest extends PageRequest{
        itemTypes:Array<number>
    }

    class PageFactoryBrandRequest extends PageRequest{//总厂牌
        maxResultCount=10000
        skipCount=0
    }
    class PageBrandRequest extends PageRequest{//厂牌
        maxResultCount=10000
        skipCount=0
        keyword:Number
    }
    class PageClasenRequest extends PageRequest{//车型
        maxResultCount=10000
        skipCount=0
        keyword:Number
    }

    @Component({
        components:{}
    })
    export default class CheckVehicleLoading extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        takeCarApply:TakeCarApply=new TakeCarApply();        
        pageFactoryBrandRequest:PageFactoryBrandRequest=new PageFactoryBrandRequest();//总厂牌
        pageBrandRequest:PageBrandRequest=new PageBrandRequest();//厂牌
        pageClasenRequest:PageClasenRequest=new PageClasenRequest();//车型
        pageItemCodeRequest:PageItemCodeRequest=new PageItemCodeRequest();
        pagerequest:PageCarBaseRequest=new PageCarBaseRequest();
        carDate:Date[]=[];
        isBusinessList:any[]=[];
        oilList:any[]=[];
        factoryBrandList:any[]=[];
        factoryBrandId:Number=null;
        brandList:any[]=[];
        brandId:Number=null;
        clasenList:any[]=[];
        selectedCarBaseList:any[]=[]
        cancel(){
            this.$emit('input',false);
        }
        factoryBrandChange(){
            this.brandId = null;
            this.pagerequest.clasenId = null;
            this.getpage();
        }
        brandChange(){
            this.pagerequest.clasenId = null;
            this.getpage();
        }
        selectChange(selection){
            this.selectedCarBaseList = selection;
        }
        async save(){
            await this.$store.dispatch({
                type:'takeCar/createAll',
                data:this.selectedCarBaseList
            });
            this.$emit('save-success');
            this.$emit('input',false);
        }
        get areaName(){
            return (!!this.takeCarApply.location) ? this.takeCarApply.location.areaName : '';
        }
        async visibleChange(value:boolean){
            if(!value){
                this.$emit('input',value);
            }else{
                this.takeCarApply=Util.extend(true,{},this.$store.state.takeCarApply.editTakeCarApply);
                await this.getpage();
            }
        }
        async getpage(){
            this.pagerequest.maxResultCount=1000;
            this.pagerequest.skipCount=0;

            if (this.carDate.length>0) {
                this.pagerequest.carDtFrom=this.carDate[0];
            }
            if (this.carDate.length>1) {
                this.pagerequest.carDtTo=this.carDate[1];
            }

            await this.$store.dispatch({
                type:'carBase/SelectCarBase',
                data:this.pagerequest
            })

            /**总厂牌 */
             await this.$store.dispatch({
                type:'factorybrand/GetAll',
                data:this.pageFactoryBrandRequest
             }).then(res=>{
                this.factoryBrandList=res.items
            })
            this.pageBrandRequest.keyword = this.factoryBrandId;
            await this.$store.dispatch({//厂牌
                type:'brand/GetAll',
                data:this.pageBrandRequest
            }).then(res=>{
                this.brandList=res.items
            })

            this.pageClasenRequest.keyword = this.brandId;
            await this.$store.dispatch({//车型
                type:'clasen/GetAll',
                data:this.pageClasenRequest
            }).then(res=>{
                this.clasenList=res.items
            })

            this.pageItemCodeRequest.maxResultCount=10000;
            this.pageItemCodeRequest.skipCount=0;
            this.pageItemCodeRequest.itemTypes = [231,411];

            let page = await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            })
            this.isBusinessList = (page.items as Array<any>).filter(x=>x.itemType === 411)
            this.oilList = (page.items as Array<any>).filter(x=>x.itemType === 231)
        }
        get loading(){
            return this.$store.state.carBase.loading;
        }
        get list(){
            return this.$store.state.carBase.list;
        }
        columns=[{
            width:80,
            type: 'selection',
            fixed:'left'
        },{
            title:'车牌号码',
            align: 'center',
            tooltip:true,
            key:'makNo'
        },{
            title:'总厂牌',
            align: 'center',
            width:150,
            tooltip:true,
            render:(h:any,params:any)=>{
                return h('span',params.row.factoryBrand==null?'':params.row.factoryBrand.factoryBrandName)
            }
        },{
            title:'厂牌',
            align: 'center',
            width:150,
            tooltip:true,
            render:(h:any,params:any)=>{
                return h('span',params.row.brand==null?'':params.row.brand.brandName)
            }
        },{
            title:'车型',
            align: 'center',
            width:150,
            tooltip:true,
            render:(h:any,params:any)=>{
                return h('span',params.row.clasen==null?'':params.row.clasen.clasenName)
            }
        },{
            title:'车色',
            align: 'center',
            tooltip:true,
            key:'carColor'
        },{
            title:'出厂日期',
            align: 'center',
            tooltip:true,
            render: (h:any, params:any) => {
                return h('span',new Date(params.row.carDt).toLocaleDateString())
            }
        },{
            title:'车险性质别',
            align: 'center',
            tooltip:true,
            render: (h:any, params:any) => {
                var temp = this.isBusinessList.find(x=>x.num === params.row.isBusiness);
                return h('span',(!!temp)? temp.itemName:'')
            }
        },{
            title:'燃油种类',
            align: 'center',
            tooltip:true,
            render: (h:any, params:any) => {
                var temp = this.oilList.find(x=>x.num === params.row.oil);
                return h('span',(!!temp)? temp.itemName:'')
            }
        },{
            title:'仓库',
            align: 'center',
            tooltip:true,
            render: (h:any, params:any) => {
                return h('span',(!!params.row.repository)?params.row.repository.repositoryName:'')
            }
        }]
    }
</script>