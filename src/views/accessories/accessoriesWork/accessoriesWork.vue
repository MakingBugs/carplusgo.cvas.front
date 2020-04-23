<template>
    <div>
        <Card dis-hover>
            <div class="page-body">
                <Form :label-width="80" :model="Form1" inline>
                    <Row :gutter="16">
                        <Col span="6">
                            <FormItem :label="L('Keyword')+':'" style="width:100%">
                                <Select :placeholder="L('Select')">
                                    <Option value="0">试算单号</Option>
                                    <Option value="1">车号</Option>
                                </Select>
                            </FormItem>
                        </Col> 
                        <Col span="6">
                            <Input v-model="pagerequest.keyword" :placeholder="L('请输入...')"></Input>
                        </Col> 
                        <Col span="6">
                            <Button icon="ios-search" type="primary" size="large" @click="getpage" class="toolbar-btn">{{L('Find')}}</Button>
                            <Button type="warning" size="large" @click="send" class="toolbar-btn">{{L('送签')}}</Button>
                        </Col>
                    </Row>
                </Form>
                <div class="margin-top-10">
                    <Table :columns="columns" :no-data-text="L('NoDatas')" border :data="Form1.accessoriesworklist">
                    </Table>
                    <Page  show-sizer class-name="fengpage" :total="totalCount" class="margin-top-10" @on-change="pageChange" @on-page-size-change="pagesizeChange" :page-size="pageSize" :current="currentPage"></Page>
                </div>
            </div>
        </Card>
        <edit-accessoriesWork :information="newlist" v-model="editModalShow" @save-success="getpage"></edit-accessoriesWork>
    </div>
</template>
<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '@/lib/util'
    import AbpBase from '@/lib/abpbase'
    import PageRequest from '@/store/entities/page-request'
    import EditAccessoriesWork from './edit-accessoriesWork.vue'
    
    class PageAccessoriesWorkRequest extends PageRequest{
        keyword:string='';
        from:Date;
        to:Date;
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
        components:{EditAccessoriesWork}
    })
    export default class AccessoriesWorks extends AbpBase{
        edit(a){
            this.editModalShow=true;
            this.newlist=a;
        }
        pagerequest:PageAccessoriesWorkRequest=new PageAccessoriesWorkRequest();
        pageItemCodeRequest:PageItemCodeRequest=new PageItemCodeRequest();
        pageAccessoriesMainTypeRequest:PageAccessoriesMainTypeRequest=new PageAccessoriesMainTypeRequest();
        pageAccessoriesTypeRequest:PageAccessoriesTypeRequest=new PageAccessoriesTypeRequest();
        editModalShow:boolean=false;
        newlist:object=null;
        // get list(){
        //     return this.$store.state.accessoriesWork.list;
        // };
        // get loading(){
        //     return this.$store.state.accessoriesWork.loading;
        // }
        pageChange(page:number){
            this.$store.commit('accessoriesWork/setCurrentPage',page);
            this.getpage();
        }
        pagesizeChange(pagesize:number){
            this.$store.commit('accessoriesWork/setPageSize',pagesize);
            this.getpage();
        }
        async getpage(){
            this.pagerequest.maxResultCount=this.pageSize;
            this.pagerequest.skipCount=(this.currentPage-1)*this.pageSize;

            await this.$store.dispatch({
                type:'accessoriesWork/getAll',
                data:this.pagerequest
            })
        }
        get pageSize(){
            return this.$store.state.accessoriesWork.pageSize;
        }
        get totalCount(){
            return this.$store.state.accessoriesWork.totalCount;
        }
        get currentPage(){
            return this.$store.state.accessoriesWork.currentPage;
        }
        Form1={
            accessoriesworklist:[{
                ordersAuto: 1,
                cusName: '笑笑',
                makNo: '@@000003',
                clasen: '大7 SUV',
                accessary: '3256.00',
                SCDT: '1900/01/01',
                preOverDT:'1900/01/01',
                salesName:'陈诚',
                incName:'格上出行',
                status:'暂存'
            },{
                ordersAuto: 2,
                cusName: '哈哈',
                makNo: '@@000004',
                clasen: '大7 SUV',
                accessary: '3432.00',
                SCDT: '1900/01/01',
                preOverDT:'1900/01/01',
                salesName:'华夫格和',
                incName:'格上出行',
                status:'暂存'
            }] //Table列表
        }
        columns=[
        {
            title:this.L('选择'),
            width: 60,
            align: 'center',
            render:(h:any,params:any)=>{
                return h('div',[
                    h('Checkbox',{
                        on:{
                            click:()=>{
                                //this.$store.commit('request/edit',params.row);
                                this.edit(params.row);
                            }
                        }
                    })
                ])
            }
        },{
            title:this.L('派工单号'),
            key:'accessoriesWorkAuto',
        },{
            title:this.L('试算单号'),
            key:'ordersAuto',
        },{
            title:this.L('客户名称'),
            key:'cusName',
        },{
            title:this.L('车牌号'),
            key:'makNo',
        },{
            title:this.L('车型'),
            key:'clasen',
        },{
            title:this.L('试算价格'),
            key:'accessary',
        },{
            title:this.L('送修日期'),
            key:'SCDT',
        },{
            title:this.L('预计完工'),
            key:'preOverDT',
        },{
            title:this.L('营业人员'),
            key:'salesName',
        },{
            title:this.L('开票信息'),
            key:'incName',
        },{
            title:this.L('状态'),
            key:'status',
        },{
            title:this.L('Actions'),
            key:'Actions',
            width:150,
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
                                //this.$store.commit('accessoriesWork/edit',params.row);
                                this.edit(params.row);
                                /**
                                 * 1.查询出基本信息
                                 * 2.查询是否安装GPS：Orders,OrdersFee,Orders_GPS 三张表 where FeeType_Auto=2 根据Orders_Auto查 
                                 * 3.查询试算配件明细并显示在table上：Orders，OrdersAccessary，ItemCode，AccessoriesType，AccessoriesMainType，根据Orders_Auto查
                                 */
                            }
                        }
                    },this.L('选择'))
                ])
            }
        }]
       
       //送签
        send(){
            //1.判断是否选中
            // if(){
                
            // }
            // else{
            //     this.$Message.warning('请选择一行数据');
            // }
        }
        
        async created(){
            this.getpage();
        }
    }
    
</script>