<template>
    <div>
        <Card dis-hover>
            <div class="page-body">
                <Form ref="queryForm" :label-width="100" label-position="left" inline>
                    <Row :gutter="16">            
                        <Col span="8">
                            <FormItem :label="'目标开始时间:'" style="width:100%">
                                <DatePicker  v-model="creationTime" type="datetimerange" format="yyyy-MM-dd" style="width:100%" placement="bottom-end" :placeholder="L('SelectDate')"></DatePicker>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Button @click="create" icon="android-add" type="primary" size="large">{{L('Add')}}</Button>
                        <Button icon="ios-search" type="primary" size="large" @click="getpage" class="toolbar-btn">{{L('Find')}}</Button>
                    </Row>
                </Form>
                <div class="margin-top-10">
                    <Table :loading="loading" :columns="columns" :no-data-text="L('NoDatas')" border :data="list">
                    </Table>
                    <Page  show-sizer class-name="fengpage" :total="totalCount" class="margin-top-10" @on-change="pageChange" @on-page-size-change="pagesizeChange" :page-size="pageSize" :current="currentPage"></Page>
                </div>
            </div>
        </Card>
        <create-targetConfig v-model="createModalShow" @save-success="getpage"></create-targetConfig>
        <edit-targetConfig v-model="editModalShow" @save-success="getpage"></edit-targetConfig>
    </div>
</template>
<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '@/lib/util'
    import AbpBase from '@/lib/abpbase'
    import PageRequest from '@/store/entities/page-request'
    import CreateTargetConfig from './create-targetConfig.vue'
    import EditTargetConfig from './edit-targetConfig.vue'
    
    class PageTargetConfigRequest extends PageRequest{
        from:Date;
        to:Date;
    }
    
    @Component({
        components:{CreateTargetConfig,EditTargetConfig}
    })
    export default class TargetConfigs extends AbpBase{
        edit(){
            this.editModalShow=true;
        }
       
        pagerequest:PageTargetConfigRequest=new PageTargetConfigRequest();
        creationTime:Date[]=[];
        createModalShow:boolean=false;
        editModalShow:boolean=false;
        get list(){
            return this.$store.state.targetConfig.list;
        };
        get loading(){
            return this.$store.state.targetConfig.loading;
        }
        create(){
            this.createModalShow=true;
        }
        pageChange(page:number){
            this.$store.commit('targetConfig/setCurrentPage',page);
            this.getpage();
        }
        pagesizeChange(pagesize:number){
            this.$store.commit('targetConfig/setPageSize',pagesize);
            this.getpage();
        }
        async getpage(){
            
            this.pagerequest.maxResultCount=this.pageSize;
            this.pagerequest.skipCount=(this.currentPage-1)*this.pageSize;

            if (this.creationTime.length>0) {
                this.pagerequest.from=this.creationTime[0];
            }
            if (this.creationTime.length>1) {
                this.pagerequest.to=this.creationTime[1];
            }
            await this.$store.dispatch({
                type:'targetConfig/getAll',
                data:this.pagerequest
            })
        }
        get pageSize(){
            return this.$store.state.targetConfig.pageSize;
        }
        get totalCount(){
            return this.$store.state.targetConfig.totalCount;
        }
        get currentPage(){
            return this.$store.state.targetConfig.currentPage;
        }
        columns=[{
            title:'目标周期',
            width:150,
            key:'unit',
            render:(h:any,params:any)=>{
                switch (params.row.unit) {
                    case 1:
                        return h('span','年')
                    case 2:
                        return h('span','月')
                    case 3:
                        return h('span','日')
                    case 4:
                        return h('span','小时')
                    case 5:
                        return h('span','分钟')
                    case 6:
                        return h('span','秒')
                    case 7:
                        return h('span','周')
                }
            }
        },{
            title:'开始时间',
            key:"from",
            width:150,
            render:(h:any,params:any)=>{
                return h('span',new Date(params.row.from).toLocaleDateString())
            }
        },{
            title:'结束时间',
            key:"to",
            width:150,
            render:(h:any,params:any)=>{
                return h('span',new Date(params.row.to).toLocaleDateString())
            }
        },{
            title:'订单金额',
            width:150,
            key:'orderAmount'
        },{
            title:'订单数',
            width:150,
            key:'orderCount'
        },{
            title:'上线司机数',
            width:150,
            key:'onlineDriverNum'
        },{
            title:'司机日均单量',
            width:150,
            key:'driverDailyOrderNum'
        },{
            title:'新增注册数',
            width:150,
            key:'registerUserNum'
        },{
            title:'日活跃数',
            width:150,
            key:'dailyActivityNum'
        },{
            title:this.L('Actions'),
            key:'Actions',
            width:150,
            fixed:'right',
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
                                this.$store.commit('targetConfig/edit',params.row);
                                this.edit();
                            }
                        }
                    },this.L('Edit')),
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
                                                type:'targetConfig/delete',
                                                data:params.row
                                            })
                                            await this.getpage();
                                        }
                                })
                            }
                        }
                    },this.L('Delete'))
                ])
            }
        }]
        async created(){
            this.getpage();
        }
    }
</script>