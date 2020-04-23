<template>
    <div>
        <Card dis-hover>
            <div class="page-body">
                <Form ref="queryForm" :label-width="80" label-position="left" inline>
                    <Row :gutter="16">
                        <Col span="6">
                            <FormItem :label="L('Keyword')+':'" style="width:100%">
                                <Input v-model="pagerequest.keyword"></Input>
                            </FormItem>
                        </Col> 
                        <col span="6">
                            <Button icon="ios-search" type="primary" size="large" @click="getpage" class="toolbar-btn">{{L('Find')}}</Button>
                        </col>
                    </Row>
                </Form>
                <div class="margin-top-10">
                    <Table :loading="loading" :columns="columns" :no-data-text="L('NoDatas')" border :data="Form1.carlist">
                    </Table>
                    <Page  show-sizer class-name="fengpage" :total="totalCount" class="margin-top-10" @on-change="pageChange" @on-page-size-change="pagesizeChange" :page-size="pageSize" :current="currentPage"></Page>
                </div>
            </div>
        </Card>
        <check-cardetail :information="newlist" v-model="editModalShow" @save-success="getpage"></check-cardetail>
    </div>
</template>
<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '@/lib/util'
    import AbpBase from '@/lib/abpbase'
    import PageRequest from '@/store/entities/page-request'
    import CheckCardetail from './check-cardetail.vue'
    
    class PageCarFixRequest extends PageRequest{
        keyword:string='';
        from:Date;
        to:Date;
    }
    
    @Component({
        components:{}
    })
    export default class CarFixQuerys extends AbpBase{
        edit(a){
            this.editModalShow=true;
            this.newlist=a;//传值
        }
        pagerequest:PageCarFixRequest=new PageCarFixRequest();
        editModalShow:boolean=false;
        newlist:object=null;//传值
        get list(){
            return this.$store.state.carFix.list;
        };
        get loading(){
            return //this.$store.state.carFix.loading;
        }
        pageChange(page:number){
            this.$store.commit('carFix/setCurrentPage',page);
            this.getpage();
        }
        pagesizeChange(pagesize:number){
            this.$store.commit('carFix/setPageSize',pagesize);
            this.getpage();
        }
        async getpage(){
            this.pagerequest.maxResultCount=this.pageSize;
            this.pagerequest.skipCount=(this.currentPage-1)*this.pageSize;

            // await this.$store.dispatch({
            //     type:'carFix/getAll',
            //     data:this.pagerequest
            // })
        }
        get pageSize(){
            return this.$store.state.carFix.pageSize;
        }
        get totalCount(){
            return this.$store.state.carFix.totalCount;
        }
        get currentPage(){
            return this.$store.state.carFix.currentPage;
        }
        Form1={
            carlist:[{
                makNo: '苏B2212G',
                brandName: '吉利汽车',
                clasenName:'大7 SUV',
                incName: '格上出行',
                supplierName:'杭州维修厂商',
                incFname:'格上出行服务有限公司'
            }]
        }
        columns=[{
                title:'车牌号',
                key:'makNo'
            },{
                title:'厂牌',
                key:'brandName'
                // render:(h:any,params:any)=>{
                //     return h('span',params.row.brand.brandName)
                // }
            },{
                title:'车型',
                key:'clasenName'
                // render:(h:any,params:any)=>{
                //     return h('span',params.row.clasen.clasenName)
                // }
            },{
                title:'公司别',
                key:'incName'
                // render:(h:any,params:any)=>{
                //     return h('span',params.row.inc.sname)
                // }
            },{
                title:this.L('维修厂商'),
                key:'supplierName'
            },{
                title:this.L('客户名称'),
                key:'incFname',
                // render:(h:any,params:any)=>{
                //     return h('span',params.row.inc.fname)
                // }
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
                                    this.edit(params.row);
                                }
                            }
                        },this.L('查看明细'))
                    ])
                }
            }]
        async created(){
            this.getpage();
        }
        /**
         * 车籍信息查询：出险详情、维修厂商、车籍资料、维修次数、交修详情、运营反馈
         */
    }
    
</script>