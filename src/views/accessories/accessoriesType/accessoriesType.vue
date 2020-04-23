<template>
    <div>
        <Card dis-hover>
            <div class="page-body">
                <Form ref="queryForm" :label-width="80" label-position="left" inline>
                    <Row :gutter="16">
                        <Col span="6">
                            <FormItem :label="L('Keyword')+':'" style="width:100%">
                                <Input v-model="pagerequest.keyword" :placeholder="L('次配件名称')"></Input>
                            </FormItem>
                        </Col>  
                        <Col span="6">
                            <Button icon="ios-search" type="primary" size="large" @click="getpage" class="toolbar-btn">{{L('Find')}}</Button>
                        </Col> 
                    </Row>
                    <Row>
                        <Button @click="create" icon="android-add" type="primary" size="large">{{L('Add')}}</Button>
                    </Row>
                </Form>
                <div class="margin-top-10">
                    <Table :loading="loading" :columns="columns" :no-data-text="L('NoDatas')" border :data="list">
                    </Table>
                    <Page  show-sizer class-name="fengpage" :total="totalCount" class="margin-top-10" @on-change="pageChange" @on-page-size-change="pagesizeChange" :page-size="pageSize" :current="currentPage"></Page>
                </div>
            </div>
        </Card>
        <create-accessoriesType v-model="createModalShow" @save-success="getpage"></create-accessoriesType>
        <edit-accessoriesType v-model="editModalShow" @save-success="getpage"></edit-accessoriesType>
    </div>
</template>
<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '@/lib/util'
    import AbpBase from '@/lib/abpbase'
    import PageRequest from '@/store/entities/page-request'
    import CreateAccessoriesType from './create-accessoriesType.vue'
    import EditAccessoriesType from './edit-accessoriesType.vue'
    
    class PageAccessoriesTypeRequest extends PageRequest{
        keyword:string='';
        from:Date;
        to:Date;
    }
    
    @Component({
        components:{CreateAccessoriesType,EditAccessoriesType}
    })
    export default class AccessoriesTypes extends AbpBase{
        edit(){
            this.editModalShow=true;
        }
       
        pagerequest:PageAccessoriesTypeRequest=new PageAccessoriesTypeRequest();
        
        createModalShow:boolean=false;
        editModalShow:boolean=false;
        get list(){
            return this.$store.state.accessoriesType.list;
        };
        get loading(){
            return this.$store.state.accessoriesType.loading;
        }
        create(){
            this.createModalShow=true;
        }
        pageChange(page:number){
            this.$store.commit('accessoriesType/setCurrentPage',page);
            this.getpage();
        }
        pagesizeChange(pagesize:number){
            this.$store.commit('accessoriesType/setPageSize',pagesize);
            this.getpage();
        }
        async getpage(){
            
            this.pagerequest.maxResultCount=this.pageSize;
            this.pagerequest.skipCount=(this.currentPage-1)*this.pageSize;
            
            await this.$store.dispatch({
                type:'accessoriesType/getAll',
                data:this.pagerequest
            })
        }
        get pageSize(){
            return this.$store.state.accessoriesType.pageSize;
        }
        get totalCount(){
            return this.$store.state.accessoriesType.totalCount;
        }
        get currentPage(){
            return this.$store.state.accessoriesType.currentPage;
        }
        columns=[{
            title:this.L('主配件名称'),
            render:(h:any,params:any)=>{
                return h('span',params.row.accessoriesMainType.accessoriesMainName)
            },
        },{
            title:this.L('次配件名称'),
            key:'accessoriesTypeName'
        },{
            title:this.L('厂商进价'),
            key:'purchasePrice'
        },{
            title:this.L('配件售价'),
            key:'sellingPrice'
        },{
            title:this.L('Actions'),
            key:'Actions',
            width:200,
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
                                this.$store.commit('accessoriesType/edit',params.row);
                                this.edit();
                            }
                        }
                    },this.L('Edit'))
                ])
            }
        }]
        async created(){
            this.getpage();
        }
        
     
    }
    
</script>