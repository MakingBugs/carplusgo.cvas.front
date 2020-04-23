<template>
    <div>
        <Card dis-hover>
            <div class="page-body">
                <Form ref="queryForm" :label-width="80" label-position="left" inline>
                    <Row :gutter="16">
                        <Col span="6">
                            <FormItem :label="L('Keyword')+':'" style="width:100%">
                                <Input v-model="pagerequest.keyword" placeholder="车牌号码/车架号/发动机号"/>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem :label="'车型:'" style="width:100%">
                                <Select :placeholder="L('Select')" v-model="pagerequest.clasenAuto" filterable clearable >
                                    <Option v-for="item in clasenList" :value="item.id" :key="item.id">{{ item.clasenName }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem :label="'使用性质:'" style="width:100%">
                                <Select :placeholder="L('Select')" v-model="pagerequest.useType" filterable clearable>
                                    <Option v-for="item in useTypeList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem :label="'上牌日期:'" style="width:100%">
                                <DatePicker  v-model="makDate" type="daterange" format="yyyy-MM-dd" style="width:100%" placement="bottom-end" :placeholder="L('SelectDate')"></DatePicker>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem :label="'出厂日期:'" style="width:100%">
                                <DatePicker  v-model="carDate" type="daterange" format="yyyy-MM-dd" style="width:100%" placement="bottom-end" :placeholder="L('SelectDate')"></DatePicker>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Button icon="ios-search" type="primary" size="large" @click="getpage" class="toolbar-btn">{{L('Find')}}</Button>
                        <Button type="primary" size="large" @click="insure" class="toolbar-btn">投保文档生成</Button>
                    </Row>
                </Form>
                <div class="margin-top-10">
                    <Table :loading="loading" :columns="columns" :no-data-text="L('NoDatas')" border :data="list" @on-selection-change="selectionChange">
                    </Table>
                    <Page  show-sizer class-name="fengpage" :total="totalCount" class="margin-top-10" @on-change="pageChange" @on-page-size-change="pagesizeChange" :page-size="pageSize" :current="currentPage"></Page>
                </div>
            </div>
        </Card>
        <insure v-model="insureShow" :data="carBases" @save-success="getpage"></insure>
    </div>
</template>
<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '@/lib/util'
    import AbpBase from '@/lib/abpbase'
    import PageRequest from '@/store/entities/page-request'
    import Excel from '@/lib/excel'
    import Insure from './insure.vue'
    import CarBase from '@/store/entities/car/carbase'

    class PageCarBaseRequest extends PageRequest{
        keyword:string;
        makDtFrom:Date;
        makDtTo:Date;
        carDtFrom:Date;
        carDtTo:Date;
        useType:Number;
        clasenAuto:Number;
    }
    class PageClasenRequest extends PageRequest{//车型
        maxResultCount=10000
        skipCount=0
    }    
    class PageItemCodeRequest extends PageRequest{
        maxResultCount=10000
        skipCount=0
        itemTypes:Array<number>
    }
    @Component({
        components:{Insure}
    })
    export default class VehicleInsuranceChange extends AbpBase{
        insureShow:boolean=false;
        carBases:Array<CarBase>=[];
        pagerequest:PageCarBaseRequest=new PageCarBaseRequest();
        pageItemCodeRequest:PageItemCodeRequest=new PageItemCodeRequest();
        pageClasenRequest:PageClasenRequest=new PageClasenRequest();//车型
        makDate:Date[]=[];
        carDate:Date[]=[];
        useTypeList:Array<any>=[];
        clasenList:Array<any>=[];
        get list(){
            return this.$store.state.carbase.list;
        };
        get pageSize(){
            return this.$store.state.carbase.pageSize;
        }
        get totalCount(){
            return this.$store.state.carbase.totalCount;
        }
        get currentPage(){
            return this.$store.state.carbase.currentPage;
        }
        get loading(){
            return this.$store.state.carbase.loading;
        }
        pageChange(page:number){
            this.$store.commit('carbase/setCurrentPage',page);
            this.getpage();
        }
        pagesizeChange(pagesize:number){
            this.$store.commit('carbase/setPageSize',pagesize);
            this.getpage();
        }
        async getpage(){
            this.pagerequest.maxResultCount=this.pageSize;
            this.pagerequest.skipCount=(this.currentPage-1)*this.pageSize;

            if (this.makDate.length>0) {
                this.pagerequest.makDtFrom=this.makDate[0];
            }
            if (this.makDate.length>1) {
                this.pagerequest.makDtTo=this.makDate[1];
            }

            if (this.carDate.length>0) {
                this.pagerequest.carDtFrom=this.carDate[0];
            }
            if (this.carDate.length>1) {
                this.pagerequest.carDtTo=this.carDate[1];
            }
            
            await this.$store.dispatch({
                type:'carbase/SelectCarBase',
                data:this.pagerequest
            })

            /**使用性质 */
            this.pageItemCodeRequest.itemTypes = [225];
            await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            }).then(res=>{
                this.useTypeList=res.items
            })
            //车型
            await this.$store.dispatch({
                type:'clasen/GetAll',
                data:this.pageClasenRequest
            }).then(res=>{
                this.clasenList=res.items
            })

        }
        async created(){
            this.getpage();
        }
        insure(){
            if(!this.carBases || this.carBases.length<=0){
                this.$Modal.error({title:'错误',content:'请选择车辆，车辆列表不能为空'})
                return false
            }
            this.insureShow=true;
        }
        selectionChange(selection:Array<CarBase>){
            this.carBases = selection
        }
        columns=[{
            width:80,
            type: 'selection',
            fixed:'left'
        },{
                title:'车牌号码',
                align: 'center',
                width:150,
                tooltip:true,
                key:'makNo'
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
                title:'颜色',
                align: 'center',
                width:150,
                tooltip:true,
                key:'carColor'
            },{
                title:'排气量',
                align: 'center',
                width:150,
                tooltip:true,
                key:'cc'
            },{
                title:'使用性质',
                align: 'center',
                width:150,
                tooltip:true,
                render:(h:any,params:any)=>{
                    return h('span',params.row.itemCode==null?'':params.row.itemCode.itemName)
                }
            },{
                title:'车架号',
                align: 'center',
                width:150,
                tooltip:true,
                key:'carNo'
            },{
                title:'登记日',
                align: 'center',
                width:150,
                tooltip:true,
                key:'linceDt',
                render:(h:any,params:any)=>{
                    return h('span',params.row.linceDt==null? "":new Date(params.row.linceDt).toLocaleDateString())
                }
            },{
                title:'年审截止日',
                align: 'center',
                width:150,
                tooltip:true,
                key:'yearCheckDt',
                render:(h:any,params:any)=>{
                    return h('span',params.row.yearCheckDt==null? "":new Date(params.row.yearCheckDt).toLocaleDateString())
                }
            },{
                title:'客户名称',
                align: 'center',
                width:150,
                tooltip:true,
                render:(h:any,params:any)=>{
                    return h('span',params.row.inc==null?'':params.row.inc.fname)
                }
            },{
                title:'公司别',
                align: 'center',
                width:150,
                tooltip:true,
                render:(h:any,params:any)=>{
                    return h('span',params.row.inc==null?'':params.row.inc.sname)
                }
            }]
    }
</script>