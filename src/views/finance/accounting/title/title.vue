<template>
    <div>
        <Card dis-hover>
            <div class="page-body">
                <Form ref="queryForm" :label-width="80" label-position="left" inline>
                    <Row :gutter="16">
                        <Col span="6">
                            <FormItem :label="L('Keyword')+':'" style="width:100%">
                                <Input v-model="pagerequest.keyword" :placeholder="L('Name')+'/'+L('Code')"></Input>
                            </FormItem>
                        </Col>                 
                        <Col span="6">
                            <FormItem :label="L('IsActive')+':'" style="width:100%">
                                <!--Select should not set :value="'All'" it may not trigger on-change when first select 'NoActive'(or 'Actived') then select 'All'-->
                                <Select :placeholder="L('Select')" @on-change="isActiveChange">
                                    <Option value="All">{{L('All')}}</Option>
                                    <Option value="Actived">{{L('Actived')}}</Option>
                                    <Option value="NoActive">{{L('NoActive')}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem :label="L('CreationTime')+':'" style="width:100%">
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
        <create-title v-model="createModalShow" @save-success="getpage"></create-title>
        <edit-title v-model="editModalShow" @save-success="getpage"></edit-title>
    </div>
</template>
<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '@/lib/util'
    import AbpBase from '@/lib/abpbase'
    import PageRequest from '@/store/entities/page-request'
    import CreateTitle from './create-title.vue'
    import EditTitle from './edit-title.vue'
    
    class PageAccountingTitleRequest extends PageRequest{
        keyword:string='';
        isActive:boolean=null;
        from:Date;
        to:Date;
    }
    
    @Component({
        components:{CreateTitle,EditTitle}
    })
    export default class AccountingTitles extends AbpBase{
        edit(){
            this.editModalShow=true;
        }
       
        pagerequest:PageAccountingTitleRequest=new PageAccountingTitleRequest();
        creationTime:Date[]=[];
        
        createModalShow:boolean=false;
        editModalShow:boolean=false;
        get list(){
            return this.$store.state.accountingTitle.list;
        };
        get loading(){
            return this.$store.state.accountingTitle.loading;
        }
        create(){
            this.createModalShow=true;
        }
        isActiveChange(val:string){
            if(val==='Actived'){
                this.pagerequest.isActive=true;
            }else if(val==='NoActive'){
                this.pagerequest.isActive=false;
            }else{
                this.pagerequest.isActive=null;
            }
        }
        pageChange(page:number){
            this.$store.commit('accountingTitle/setCurrentPage',page);
            this.getpage();
        }
        pagesizeChange(pagesize:number){
            this.$store.commit('accountingTitle/setPageSize',pagesize);
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
                type:'accountingTitle/getAll',
                data:this.pagerequest
            })
        }
        get pageSize(){
            return this.$store.state.accountingTitle.pageSize;
        }
        get totalCount(){
            return this.$store.state.accountingTitle.totalCount;
        }
        get currentPage(){
            return this.$store.state.accountingTitle.currentPage;
        }
        columns=[{
            title:this.L('Name'),
            key:'name'
        },{
            title:this.L('Code'),
            key:'code'
        },{
            title:this.L('Level'),
            key:'level'
        },{
            title:this.L('AccountingElementType'),
            key:'accountingElementType',
            render:(h:any,params:any)=>{
                switch (params.row.accountingElementType) {
                    case 1:
                        return h('span',this.L("Asset"));
                    case 2:
                        return h('span',this.L("Liability"));
                    case 3:
                        return h('span',this.L("OwnersEquity"));
                    case 4:
                        return h('span',this.L("Revenue"));
                    case 5:
                        return h('span',this.L("Expense"));
                    case 6:
                        return h('span',this.L("Cost"));
                    default:
                        return h('span',params.row.accountingElementType);
                }
            }
        },{
            title:this.L('IsActive'),
            render:(h:any,params:any)=>{
                return h('span',params.row.isActive?this.L('Yes'):this.L('No'))
            }
        },{
            title:this.L('CreationTime'),
            key:'creationTime',
            render:(h:any,params:any)=>{
                return h('span',new Date(params.row.creationTime).toLocaleDateString())
            }
        },{
            title:this.L('Actions'),
            key:'Actions',
            width:150,
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
                                this.$store.commit('accountingTitle/edit',params.row);
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
                                                type:'accountingTitle/delete',
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