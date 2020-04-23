<template>
    <div>
        <Card dis-hover>
            <div class="page-body">
                <Form ref="queryForm" :label-width="80" label-position="left" inline>
                    <Row :gutter="16">
                        <Col span="6">
                            <FormItem :label="L('Keyword')+':'" style="width:100%">
                                <Input v-model="pagerequest.keyword" :placeholder="L('主配件名称')"></Input>
                            </FormItem>
                        </Col> 
                        <col span="6">
                            <Button icon="ios-search" type="primary" size="large" @click="getpage" class="toolbar-btn">{{L('Find')}}</Button>
                        </col>
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
        <create-accessoriesMainType v-model="createModalShow" @save-success="getpage"></create-accessoriesMainType>
        <edit-accessoriesMainType v-model="editModalShow" @save-success="getpage"></edit-accessoriesMainType>
    </div>
</template>
<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '@/lib/util'
    import AbpBase from '@/lib/abpbase'
    import PageRequest from '@/store/entities/page-request'
    import CreateAccessoriesMainType from './create-accessoriesMainType.vue'
    import EditAccessoriesMainType from './edit-accessoriesMainType.vue'
    
    class PageAccessoriesMainTypeRequest extends PageRequest{
        keyword:string='';
        from:Date;
        to:Date;
    }
    
    @Component({
        components:{CreateAccessoriesMainType,EditAccessoriesMainType}
    })
    export default class AccessoriesMainTypes extends AbpBase{
        edit(){
            this.editModalShow=true;
        }
       
        pagerequest:PageAccessoriesMainTypeRequest=new PageAccessoriesMainTypeRequest();
        
        createModalShow:boolean=false;
        editModalShow:boolean=false;
        get list(){
            return this.$store.state.accessoriesMainType.list;
        };
        get loading(){
            return this.$store.state.accessoriesMainType.loading;
        }
        create(){
            this.createModalShow=true;
        }
        pageChange(page:number){
            this.$store.commit('accessoriesMainType/setCurrentPage',page);
            this.getpage();
        }
        pagesizeChange(pagesize:number){
            this.$store.commit('accessoriesMainType/setPageSize',pagesize);
            this.getpage();
        }
        async getpage(){
            this.pagerequest.maxResultCount=this.pageSize;
            this.pagerequest.skipCount=(this.currentPage-1)*this.pageSize;

            await this.$store.dispatch({
                type:'accessoriesMainType/getAll',
                data:this.pagerequest
            })
        }
        get pageSize(){
            return this.$store.state.accessoriesMainType.pageSize;
        }
        get totalCount(){
            return this.$store.state.accessoriesMainType.totalCount;
        }
        get currentPage(){
            return this.$store.state.accessoriesMainType.currentPage;
        }
        columns=[{
            title:this.L('主配件名称'),
            key:'accessoriesMainName',
            width:500
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
                            //marginRight:'5px'
                            width:'60px'
                        },
                        on:{
                            click:()=>{
                                this.$store.commit('accessoriesMainType/edit',params.row);
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