<template>
    <div>
        <Card dis-hover>
            <div class="page-body">
                <Form ref="queryForm" :label-width="80" label-position="left" inline>
                    <Row :gutter="16">
                        <Col span="6">
                            <FormItem :label="L('Keyword')+':'" style="width:100%">
                                <Select :placeholder="L('Select')" v-model="pagerequest.bankType">
                                    <Option v-for="item in ddlbankTypeList" :value="item.id" :key="item.id">{{ item.bankNameT }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem style="width:100%">
                                <Input v-model="pagerequest.keyword"></Input>
                            </FormItem>
                        </Col> 
                    </Row>
                    <Row>
                        <Button @click="create" icon="android-add" type="primary" size="large">{{L('Add')}}</Button>
                        <Button icon="ios-search" type="primary" size="large" @click="getpage" class="toolbar-btn">{{L('Find')}}</Button>
                    </Row>
                </Form>
                <div class="margin-top-10">
                    <Table :loading="loading" :columns="columns" :no-data-text="L('NoDatas')" border :data="banklist">
                    </Table>
                    <!-- <Page show-sizer class-name="fengpage" :total="totalCount" class="margin-top-10" @on-change="pageChange" @on-page-size-change="pagesizeChange" :page-size="pageSize" :current="currentPage"></Page> -->
                    <Page show-sizer :total="totalCount" :current="currentPage"  @on-change="PageChange" @on-page-size-change="pageSizeChange" ></Page>
                </div>
            </div>
        </Card>
        <create-bankDetail v-model="createModalShow" @save-success="getpage"></create-bankDetail>
        <edit-bankDetail v-model="editModalShow" :information="newlist" @save-success="getpage"></edit-bankDetail>
    </div>
</template>
<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '@/lib/util'
    import AbpBase from '@/lib/abpbase'
    import PageRequest from '@/store/entities/page-request'
    import CreateBankDetail from './create-bankDetail.vue'
    import EditBankDetail from './edit-bankDetail.vue'
    
    class PageBankDetailRequest extends PageRequest{
        keyword:any=null;
        bankType:any=null;
        from:Date;
        to:Date;
    }
    class PageBankTypeRequest extends PageRequest{//银行别
        keyword:string='';
        from:Date;
        to:Date;
    }
    
    @Component({
        components:{CreateBankDetail,EditBankDetail}
    })
    export default class BankDetail extends AbpBase{
        edit(a){
            this.editModalShow=true;
            this.newlist=a;//传值
        }
       
        pagerequest:PageBankDetailRequest=new PageBankDetailRequest();
        pageBankTypeRequest:PageBankTypeRequest=new PageBankTypeRequest();//银行别
        createModalShow:boolean=false;
        editModalShow:boolean=false;
        bankTypeList:any=null;//银行列表
        newlist:object=null;//传值
        banklist:any=[];//银行明细
        get loading(){
            return this.$store.state.bankDetail.loading;
        }
        create(){
            this.createModalShow=true;
        }
        
        get totalCount(){//数据总数
        return this.$store.state.bankDetail.totalCount
        }
        get currentPage(){//当前页码
            return this.$store.state.bankDetail.currentPage;
        }
        get skipCount(){//跳过条数
            return (this.$store.state.bankDetail.currentPage-1)*this.$store.state.bankDetail.pageSize
        }
        //更新当前页码
        PageChange(page:number){
            this.$store.commit('bankDetail/updatestate',{currentPage:page});
            this.pagerequest.skipCount=this.skipCount;
            this.getpage();
        }
        //更新每页显示条数
        pageSizeChange(pagesize:number){
            this.$store.commit('bankDetail/updatestate',{pageSize:pagesize});
            this.getpage();
        }
        async getpage(){
            this.pagerequest.maxResultCount=this.$store.state.bankDetail.pageSize;

            await this.$store.dispatch({
                type:'bankDetail/getAll',
                data:this.pagerequest
            }).then(res=>{
                this.banklist=res.items;
            })
        }
        async getList(){
            /**银行别 */
            this.pageBankTypeRequest.maxResultCount=10000;
            this.pageBankTypeRequest.skipCount=0;
            await this.$store.dispatch({
                type:'bankType/getAll',
                data:this.pageBankTypeRequest
            }).then(res=>{
                this.bankTypeList=res.items;
            })
        }
        get ddlbankTypeList(){
            return this.bankTypeList;
        }
        columns=[{
                title:this.L('银行别'),
                render:(h:any,params:any)=>{
                    return h('span',params.row.bankTypeData==null?'':params.row.bankTypeData.bankNameT)
                }
            },{
                title:this.L('银行支行名称'),
                key:'bankName'
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
                        },this.L('Edit'))
                    ])
                }
        }]
        async created(){
            this.getList();
            this.getpage();
        }
        
     
    }
    
</script>