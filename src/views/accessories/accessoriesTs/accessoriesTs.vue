<template>
    <div>
        <Card dis-hover>
            <div class="page-body">
                <Form ref="queryForm" :model="Form1" :label-width="80" label-position="left" inline>
                    <Row :gutter="16">
                        <Col span="6">
                            <FormItem :label="L('主配件')+':'" style="width:100%">
                                <Select :placeholder="L('Select')" v-model="Form1.accessoriesMainTypeAuto" @on-change="accessoriesMainNameChange">
                                    <Option v-for="item in accessoriesList" :value="item.id" :key="item.id">{{ item.accessoriesMainName }}</Option>
                                </Select>
                            </FormItem>
                        </Col>   
                        <Col span="6">
                            <FormItem :label="L('次配件')+':'" style="width:100%">
                                <Select :placeholder="L('Select')" v-model="Form1.accessoriesTypeAuto">
                                    <Option v-for="item in accessoriesTypeList" :value="item.id" :key="item.id">{{ item.accessoriesTypeName}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem :label="L('厂商')+':'" style="width:100%">
                                <Select :placeholder="L('Select')" v-model="Form1.supplier">
                                    <Option v-for="item in itemTypeList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Button @click="create" icon="android-add" type="primary" size="large">{{L('Add')}}</Button>
                        <Button icon="ios-search" type="primary" size="large" @click="checkaccess" class="toolbar-btn">{{L('Find')}}</Button> <!--@click="getpage"-->
                    </Row>
                </Form>
                <div class="margin-top-10">
                    <Table :loading="loading" :columns="columns" :no-data-text="L('NoDatas')" border :data="Form1.list">
                    </Table>
                    <Page  show-sizer class-name="fengpage" :total="totalCount" class="margin-top-10" @on-change="pageChange" @on-page-size-change="pagesizeChange" :page-size="pageSize" :current="currentPage"></Page>
                </div>
            </div>
        </Card>
        <create-accessoriesTs v-model="createModalShow" @save-success="getpage"></create-accessoriesTs>
        <edit-accessoriesTs :information="newlist" v-model="editModalShow" @save-success="getpage"></edit-accessoriesTs>
    </div>
</template>
<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '@/lib/util'
    import AbpBase from '@/lib/abpbase'
    import PageRequest from '@/store/entities/page-request'
    import CreateAccessoriesTs from './create-accessoriesTs.vue'
    import EditAccessoriesTs from './edit-accessoriesTs.vue'
    
    class PageAccessoriesTsRequest extends PageRequest{
        keyword:string='';
        from:Date;
        to:Date;
        accessoriesTypeAuto:number;
        supplier:number;
        accessoriesMainTypeAuto:number;
    }
    class PageItemCodeRequest extends PageRequest{
        keyword:string='';
        from:Date;
        to:Date;
        itemTypes:Array<number>
    }
    class PageAccessoriesMainTypeRequest extends PageRequest{
        keyword:string='';
        from:Date;
        to:Date;
    }
    class PageAccessoriesTypeRequest extends PageRequest{
        keyword:string='';
        from:Date;
        to:Date;
    }

    @Component({
        components:{CreateAccessoriesTs,EditAccessoriesTs}
    })
    export default class AccessoriesTss extends AbpBase{
        edit(a){
            this.editModalShow=true;
            this.newlist=a;
        }
       
        pagerequest:PageAccessoriesTsRequest=new PageAccessoriesTsRequest();
        pageAccessoriesMainTypeRequest:PageAccessoriesMainTypeRequest=new PageAccessoriesMainTypeRequest();
        pageItemCodeRequest:PageItemCodeRequest=new PageItemCodeRequest();
        pageAccessoriesTypeRequest:PageAccessoriesTypeRequest=new PageAccessoriesTypeRequest();
        itemcodelist:any=null;
        createModalShow:boolean=false;
        editModalShow:boolean=false;
        partslist:any=[];
        supplier:number=null;
        newlist:object=null;
        get loading(){
            return this.$store.state.accessoriesTs.loading;
        }
        create(){
            this.createModalShow=true;
        }
        pageChange(page:number){
            this.$store.commit('accessoriesTs/setCurrentPage',page);
            this.getpage();
        }
        pagesizeChange(pagesize:number){
            this.$store.commit('accessoriesTs/setPageSize',pagesize);
            this.getpage();
        }
        //查询
        checkaccess(){
            if(this.Form1.accessoriesMainTypeAuto!=null){
                this.pagerequest.accessoriesMainTypeAuto=this.Form1.accessoriesMainTypeAuto;
            }
            if(this.Form1.accessoriesTypeAuto!=null){
                this.pagerequest.accessoriesTypeAuto=this.Form1.accessoriesTypeAuto;
            }
            if(this.Form1.supplier!=null){
                this.pagerequest.supplier=this.Form1.supplier;
            }
            this.getpage();
        }
        get accessoriesList(){//主配件
            return this.$store.state.accessoriesMainType.list;
        };
        get accessoriesTypeList(){//次配件
            return this.partslist;
        };
        get itemTypeList(){//厂商
            return this.itemcodelist;
        };
        //二级菜单
        async accessoriesMainNameChange(val:number){
            this.Form1.accessoriesTypeAuto=null;//清空第二个select的选项
            this.partslist=[];//清空次配件上一次的数据
            //console.log(val);
            this.pageAccessoriesTypeRequest.maxResultCount=10000;
            this.pageAccessoriesTypeRequest.skipCount=0;
            
            await this.$store.dispatch({
                type:'accessoriesType/getAll',
                data:this.pageAccessoriesTypeRequest
            }).then(res=>{
                //console.log(res.items)
                res.items.map(i=>{
                    if(i.accessoriesMainTypeAuto==val){
                        this.partslist.push(i)
                    }
                })
                //console.log(this.partslist)
            })
        }

        async getpage(){
            this.pagerequest.maxResultCount=this.pageSize;
            this.pagerequest.skipCount=(this.currentPage-1)*this.pageSize;

            await this.$store.dispatch({
                type:'accessoriesTs/getAll',
                data:this.pagerequest
            }).then(a=>{
                this.Form1.list=a.items;
            })
        }
        async getList(){
            this.pageAccessoriesMainTypeRequest.maxResultCount=10000;
            this.pageAccessoriesMainTypeRequest.skipCount=0;
            
            await this.$store.dispatch({
                type:'accessoriesMainType/getAll',
                data:this.pageAccessoriesMainTypeRequest
            })
            
            this.pageItemCodeRequest.maxResultCount=10000;
            this.pageItemCodeRequest.skipCount=0;
            this.pageItemCodeRequest.itemTypes = [883];
            
            this.itemcodelist=(await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            })).items
        }
        get pageSize(){
            return this.$store.state.accessoriesTs.pageSize;
        }
        get totalCount(){
            return this.$store.state.accessoriesTs.totalCount;
        }
        get currentPage(){
            return this.$store.state.accessoriesTs.currentPage;
        }
        columns=[{
            title:this.L('厂商名称'),
            render:(h:any,params:any)=>{
                return h('span',params.row.itemCode.itemName)
            },
        },{
            title:this.L('主配件名称'),
            render:(h:any,params:any)=>{
                return h('span',params.row.accessoriesType.accessoriesMainType.accessoriesMainName)
            },
        },{
            title:this.L('次配件名称'),
            render:(h:any,params:any)=>{
                return h('span',params.row.accessoriesType.accessoriesTypeName)
            },
        },{
            title:this.L('采购价'),
            key:'purchasePrice'
        },{
            title:this.L('成本价'),
            key:'costPrice'
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
                                //this.$store.commit('accessoriesTs/edit',params.row);
                                this.edit(params.row);
                                console.log(params.row)
                            }
                        }
                    },this.L('Edit'))
                ])
            }
        }]
        Form1={//显示的数据
            accessoriesMainTypeAuto:null,
            accessoriesTypeAuto:null,
            supplier:null,
            list:[]
        }
        async created(){
            this.getpage();
            this.getList();
        }
    }
    
</script>