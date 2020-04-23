<template>
    <div>
        <Card dis-hover>
            <div class="page-body">
                <Form ref="queryForm" :label-width="80" label-position="left" inline>
                    <Row :gutter="16">
                        <Col span="6">
                            <FormItem :label="'名称:'" style="width:100%">
                                <Input v-model="pagerequest.keyword" :placeholder="'名称'" />
                            </FormItem>
                        </Col>                 
                        <Col span="6">
                            <FormItem :label="L('IsActive')+':'" style="width:100%">
                                <Select :placeholder="L('Select')" @on-change="isActiveChange">
                                    <Option value="All">{{L('All')}}</Option>
                                    <Option value="Actived">{{L('Actived')}}</Option>
                                    <Option value="NoActive">{{L('NoActive')}}</Option>
                                </Select>
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
        <create-insuranceType v-model="createModalShow" @save-success="getpage"></create-insuranceType>
        <edit-insuranceType v-model="editModalShow" @save-success="getpage"></edit-insuranceType>
    </div>
</template>
<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '@/lib/util'
    import AbpBase from '@/lib/abpbase'
    import PageRequest from '@/store/entities/page-request'
    import CreateInsuranceType from './create-insuranceType.vue'
    import EditInsuranceType from './edit-insuranceType.vue'
    
    class PageInsuranceTypeRequest extends PageRequest{
        keyword:string='';
        isActive:boolean=null;
        from:Date;
        to:Date;
    }
    
    @Component({
        components:{CreateInsuranceType,EditInsuranceType}
    })
    export default class InsuranceTypes extends AbpBase{
        edit(){
            this.editModalShow=true;
        }
       
        pagerequest:PageInsuranceTypeRequest=new PageInsuranceTypeRequest();
        
        createModalShow:boolean=false;
        editModalShow:boolean=false;
        get list(){
            return this.$store.state.insuranceType.list;
        };
        get loading(){
            return this.$store.state.insuranceType.loading;
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
            this.$store.commit('insuranceType/setCurrentPage',page);
            this.getpage();
        }
        pagesizeChange(pagesize:number){
            this.$store.commit('insuranceType/setPageSize',pagesize);
            this.getpage();
        }
        async getpage(){
            this.pagerequest.maxResultCount=this.pageSize;
            this.pagerequest.skipCount=(this.currentPage-1)*this.pageSize;
            
            await this.$store.dispatch({
                type:'insuranceType/getAll',
                data:this.pagerequest
            })
        }
        get pageSize(){
            return this.$store.state.insuranceType.pageSize;
        }
        get totalCount(){
            return this.$store.state.insuranceType.totalCount;
        }
        get currentPage(){
            return this.$store.state.insuranceType.currentPage;
        }
        columns=[{
            title:'名称',
            key:'name'
        },{
            title:'备注',
            key:'remark'
        },{
            title:this.L('IsActive'),
            render:(h:any,params:any)=>{
                return h('span',params.row.isActive?this.L('Yes'):this.L('No'))
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
                                this.$store.commit('insuranceType/edit',params.row);
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
                                                type:'insuranceType/delete',
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