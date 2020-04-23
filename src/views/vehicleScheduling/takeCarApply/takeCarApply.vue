<template>
    <div>
        <Card dis-hover>
            <div class="page-body">
                <Form ref="queryForm" :label-width="80" label-position="right" inline>
                    <Row :gutter="16">
                        <Col span="6">
                            <FormItem :label="'申请日期:'" style="width:100%">
                                <DatePicker  v-model="applyDate" type="daterange" format="yyyy-MM-dd" style="width:100%" placement="bottom-end" :placeholder="L('SelectDate')"></DatePicker>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem :label="'提领状态:'" style="width:100%">
                                <Select v-model="pagerequest.status" clearable>
                                    <Option v-for="item in statusList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <Checkbox v-model="pagerequest.isStatus">显示提领完成、取消请领申请</Checkbox>
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
                    <Table :loading="loading" :columns="columns" border :data="list">
                    </Table>
                    <Page  show-sizer class-name="fengpage" :total="totalCount" class="margin-top-10" @on-change="pageChange" @on-page-size-change="pagesizeChange" :page-size="pageSize" :current="currentPage"></Page>
                </div>
            </div>
        </Card>
        <edit-takeCarApply v-model="takeCarApplyShow" @save-success="getpage"></edit-takeCarApply>
    </div>
</template>

<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '@/lib/util'
    import AbpBase from '@/lib/abpbase'
    import PageRequest from '@/store/entities/page-request'
    import EditTakeCarApply from './edit-takeCarApply.vue'
    
    class PageTakeCarApplyRequest extends PageRequest{
        takeDateForm:Date;
        takeDateTo:Date;
        status:Number;
        isStatus:Boolean=false;
    }
        
    class PageItemCodeRequest extends PageRequest{
        itemTypes:Array<number>
    }

    @Component({
        components:{EditTakeCarApply}
    })
    export default class TakeCarApply extends AbpBase{
        pageItemCodeRequest:PageItemCodeRequest=new PageItemCodeRequest();
        pagerequest:PageTakeCarApplyRequest=new PageTakeCarApplyRequest();
        takeCarApplyShow:Boolean=false;
        applyDate:Date[]=[];
        columns=[{
            title:'申请日期',
            align: 'center',
            tooltip:true,
            key:'creationTime',
            render:(h:any,params:any)=>{
                return h('span',new Date(params.row.creationTime).toLocaleDateString())
            }
        },{
            title:'申请事由',
            align: 'center',
            tooltip:true,
            key:'type',
            render:(h:any,params:any)=>{
                return h('span',!!params.row.itemTypeCode?params.row.itemTypeCode.itemName:'')
            }
        },{
            title:'预估提领日期',
            align: 'center',
            tooltip:true,
            key:'takeDate',
            render:(h:any,params:any)=>{
                return h('span',new Date(params.row.takeDate).toLocaleDateString())
            }
        },{
            title:'预估提领台数',
            align: 'center',
            tooltip:true,
            key:'takeQty'
        },{
            title:'提领车型',
            align: 'center',
            tooltip:true,
            key:'clasenName',
            render:(h:any,params:any)=>{
                return h('span',!!params.row.clasenData?params.row.clasenData.clasenName:'')
            }
        },{
            title:'提领区域',
            align: 'center',
            tooltip:true,
            key:'areaName',
            render:(h:any,params:any)=>{
                return h('span',!!params.row.location?params.row.location.areaName:'')
            }
        },{
            title:'提领状态',
            align: 'center',
            tooltip:true,
            key:'status',
            render:(h:any,params:any)=>{
                return h('span',!!params.row.itemStatusCode?params.row.itemStatusCode.itemName:'')
            }
        },{
            title:'已选取台数',
            align: 'center',
            tooltip:true,
            render:(h:any,params:any)=>{
                return h('span',!!params.row.takeCarList?params.row.takeCarList.length:0)
            }
        },{
            title:'实际提领台数',
            align: 'center',
            tooltip:true,
            render:(h:any,params:any)=>{
                return h('span',!!params.row.takeCarList?(params.row.takeCarList as Array<any>).filter(x=>x.status === 30).length:0)
            }
        },{
            title:this.L('Actions'),
            key:'Actions',
            align: 'center',
            render:(h:any,params:any)=>{
                if(params.row.status === 10 || params.row.status === 20){
                    return h('div',[
                        h('Button',{
                            props:{
                                type:'primary',
                                size:'small'
                            },
                            on:{
                                click:()=>{
                                    this.$store.commit('takeCarApply/edit',params.row);
                                    this.take();
                                }
                            }
                        },'选取车辆')
                    ])
                }
            }
        }]
        take(){
            this.takeCarApplyShow=true;
        }
        pageChange(page:number){
            this.$store.commit('takeCarApply/setCurrentPage',page);
            this.getpage();
        }
        pagesizeChange(pagesize:number){
            this.$store.commit('takeCarApply/setPageSize',pagesize);
            this.getpage();
        }
        async getpage(){
            this.pagerequest.maxResultCount=this.pageSize;
            this.pagerequest.skipCount=(this.currentPage-1)*this.pageSize;

            if (this.applyDate.length>0) {
                this.pagerequest.takeDateForm=this.applyDate[0];
            }
            if (this.applyDate.length>1) {
                this.pagerequest.takeDateTo=this.applyDate[1];
            }

            await this.$store.dispatch({
                type:'takeCarApply/getAll',
                data:this.pagerequest
            })

            this.pageItemCodeRequest.maxResultCount=10000;
            this.pageItemCodeRequest.skipCount=0;
            this.pageItemCodeRequest.itemTypes = [1606];

            let page = await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            })
        }
        get statusList(){
            return (this.$store.state.itemCode.list as Array<any>).filter(x=>x.itemType === 1606)
        }
        get list(){
            return this.$store.state.takeCarApply.list;
        }
        get pageSize(){
            return this.$store.state.takeCarApply.pageSize;
        }
        get totalCount(){
            return this.$store.state.takeCarApply.totalCount;
        }
        get currentPage(){
            return this.$store.state.takeCarApply.currentPage;
        }
        get loading(){
            return this.$store.state.takeCarApply.loading;
        }
        async created(){
            await this.getpage();
        }
    }
</script>