<template>
    <div>
        <Card dis-hover>
            <div class="page-body">
                <Form ref="queryForm" :label-width="80" label-position="right" inline>
                    <Row :gutter="16">
                        <Col span="6">
                            <FormItem label="车牌号码" style="width:100%">
                                <Input v-model="pagerequest.makNo" placeholder="请输入车牌号码"/>
                            </FormItem>
                        </Col> 
                        <col span="6">
                            <Button icon="ios-search" type="primary" size="large" @click="getpage" class="toolbar-btn">查找</Button>&nbsp;&nbsp;
                            <Button @click="create" icon="android-add" type="primary" size="large">新车收车</Button>
                        </col>
                    </Row>
                    <Row>
                        <col span="12">
                            <h3>资料笔数：{{totalCount}}笔</h3>
                        </col>
                    </Row>
                </Form>
                <div class="margin-top-10">
                    <Table :loading="loading" :columns="columns" border :data="list">
                    </Table>
                    <Page  show-sizer class-name="fengpage" :total="totalCount" class="margin-top-10" @on-change="pageChange" @on-page-size-change="pagesizeChange" :page-size="pageSize" :current="currentPage"></Page>
                </div>
            </div>
        </Card>
        <create-vehicleLoading v-model="createModalShow" @save-success="getpage"></create-vehicleLoading>
        <!-- <edit-vehicleLoading v-model="editModalShow" @save-success="getpage"></edit-vehicleLoading>
        <check-vehicleLoading v-model="checkModalShow" @save-success="getpage"></check-vehicleLoading> -->
    </div>
</template>

<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '@/lib/util'
    import AbpBase from '@/lib/abpbase'
    import PageRequest from '@/store/entities/page-request'
    import publicclass from '@/lib/publicclass'
    import RepositoryOut from '@/store/entities/vehicleScheduling/repositoryOut'
    import CreateVehicleLoading from './create/create-vehicleLoading.vue'
    // import EditVehicleLoading from './edit-vehicleLoading.vue'
    // import CheckVehicleLoading from './check-vehicleLoading.vue'
    
    class PageVehicleLoadingRequest extends PageRequest{
        makNo:string='';
    }

    class PageItemCodeRequest extends PageRequest{
        itemTypes:Array<number>
    }

    @Component({
        components:{CreateVehicleLoading}//,EditVehicleLoading,CheckVehicleLoading}
    })
    export default class VehicleLoading extends AbpBase{//仓库区域维护
        pagerequest:PageVehicleLoadingRequest=new PageVehicleLoadingRequest();
        pageItemCodeRequest:PageItemCodeRequest=new PageItemCodeRequest();
        repositoryOut:RepositoryOut=new RepositoryOut();
        checkModalShow:boolean=false;
        editModalShow:boolean=false;
        createModalShow:boolean=false;
        inReasonList:any[]=[];
        columns=[{
            title:'车牌号码',
            align: 'center',
            tooltip:true,
            render: (h:any, params:any) => {
                return h('span',(!!params.row.carBase)?params.row.carBase.makNo:'')
            }
        },{
            title:'发动机号',
            align: 'center',
            tooltip:true,
            render: (h:any, params:any) => {
                return h('span',(!!params.row.carBase)?params.row.carBase.engNo:'')
            }
        },{
            title:'车架号',
            align: 'center',
            tooltip:true,
            render: (h:any, params:any) => {
                return h('span',(!!params.row.carBase)?params.row.carBase.carNo:'')
            }
        },{
            title:'车型',
            align: 'center',
            tooltip:true,
            render: (h:any, params:any) => {
                return h('span',(!!params.row.carBase) && (!!params.row.carBase.clasen)?params.row.carBase.clasen.clasenName:'')
            }
        },{
            title:'车色',
            align: 'center',
            tooltip:true,
            render: (h:any, params:any) => {
                return h('span',(!!params.row.carBase)?params.row.carBase.carColor:'')
            }
        },{
            title:'出仓区域',
            align: 'center',
            tooltip:true,
            render: (h:any, params:any) => {
                return h('span',(!!params.row.outRepositoryData) && (!!params.row.outRepositoryData.location)?params.row.outRepositoryID.location.areaName:'')
            }
        },{
            title:'出仓仓库',
            align: 'center',
            tooltip:true,
            render: (h:any, params:any) => {
                return h('span',(!!params.row.outRepositoryData)?params.row.outRepositoryData.repositoryName:'')
            }
        },{
            title:'目的区域',
            align: 'center',
            tooltip:true,
            render: (h:any, params:any) => {
                return h('span',(!!params.row.inRepositoryData) && (!!params.row.inRepositoryData.location)?params.row.inRepositoryData.location.areaName:'')
            }
        },{
            title:'目的仓库',
            align: 'center',
            tooltip:true,
            render: (h:any, params:any) => {
                return h('span',(!!params.row.inRepositoryData)?params.row.inRepositoryData.repositoryName:'')
            }
        },{
            title:'入库原因',
            align: 'center',
            tooltip:true,
            render: (h:any, params:any) => {
                return h('span',(!!params.row.iteminReasonCode)? params.row.iteminReasonCode.itemName:'')
            }
        },{
            title:'状态',
            align: 'center',
            tooltip:true,
            render: (h:any, params:any) => {
                return h('span',(!!params.row.itemCode)?params.row.itemCode.itemName:'')
            }
        },{
            title:'维护',
            width:150,
            key:'Actions',
            align: 'center',
            render:(h:any,params:any)=>{
                if(params.row.status === 30){
                    return h('div',[
                        h('Button',{
                            props:{
                                type:'primary',
                                size:'small'
                            },
                            on:{
                                click:()=>{
                                    this.$store.commit('repositoryOut/edit',params.row);
                                    this.check();
                                }
                            }
                        },'收车')
                    ])
                }else if(params.row.status === 40){
                    return h('div',[
                        h('Button',{
                            props:{
                                type:'primary',
                                size:'small'
                            },
                            on:{
                                click:()=>{
                                    this.$store.commit('repositoryOut/edit',params.row);
                                    this.edit();
                                }
                            }
                        },'入库')
                    ])
                }

            }
        }]
        check(){
            this.checkModalShow=true;
        }
        edit(){
            this.editModalShow=true;
        }
        create(){
            this.createModalShow=true;
        }
        pageChange(page:number){
            this.$store.commit('repositoryOut/setCurrentPage',page);
            this.getpage();
        }
        pagesizeChange(pagesize:number){
            this.$store.commit('repositoryOut/setPageSize',pagesize);
            this.getpage();
        }
        async getpage(){
            this.pagerequest.maxResultCount=this.pageSize;
            this.pagerequest.skipCount=(this.currentPage-1)*this.pageSize;

            await this.$store.dispatch({
                type:'repositoryOut/getAll',
                data:this.pagerequest
            })

            this.pageItemCodeRequest.maxResultCount=10000;
            this.pageItemCodeRequest.skipCount=0;
            this.pageItemCodeRequest.itemTypes = [1604];

            let page = await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            })
            this.inReasonList = (page.items as Array<any>).filter(x=>x.itemType === 1604)
        }
        get list(){
            return this.$store.state.repositoryOut.list;
        }
        get pageSize(){
            return this.$store.state.repositoryOut.pageSize;
        }
        get totalCount(){
            return this.$store.state.repositoryOut.totalCount;
        }
        get currentPage(){
            return this.$store.state.repositoryOut.currentPage;
        }
        get loading(){
            return this.$store.state.repositoryOut.loading;
        }
        async created(){
            await this.getpage();
        }
    }
</script>