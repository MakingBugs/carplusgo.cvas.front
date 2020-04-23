<template>
    <div>
        <Card dis-hover>
            <div class="page-body">
                <Form :label-width="80" :model="Form1" inline>
                    <Row :gutter="16">
                        <Col span="6">
                            <FormItem :label="L('Keyword')+':'" style="width:100%">
                                <Select :placeholder="L('Select')">
                                    <Option value="1">试算单号</Option>
                                    <Option value="2">派工单号</Option>
                                    <Option value="3">车牌号码</Option>
                                </Select>
                            </FormItem>
                        </Col> 
                        <Col span="6">
                            <Input v-model="pagerequest.keyword" :placeholder="L('请输入...')"></Input>
                        </Col> 
                        <Col span="6">
                            <Button icon="ios-search" type="primary" size="large" @click="getpage" class="toolbar-btn">{{L('Find')}}</Button>
                            <Button type="warning" size="large" @click="accessoriessend" class="toolbar-btn">{{L('送件')}}</Button>
                            <Button type="warning" size="large" @click="accessoriesexport" class="toolbar-btn">{{L('配件缺件导出')}}</Button>
                        </Col>
                    </Row>
                </Form>
                <div class="margin-top-10" ref="table">
                    <Table :columns="columns" :no-data-text="L('NoDatas')" border :data="Form1.requestlist">
                    </Table>
                    <Page  show-sizer class-name="fengpage" :total="totalCount" class="margin-top-10" @on-change="pageChange" @on-page-size-change="pagesizeChange" :page-size="pageSize" :current="currentPage"></Page>
                </div>
            </div>
        </Card>
        <edit-request :information="newlist" v-model="editModalShow" @save-success="getpage"></edit-request>
    </div>
</template>
<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '@/lib/util'
    import AbpBase from '@/lib/abpbase'
    import PageRequest from '@/store/entities/page-request'
    import EditRequest from './edit-request.vue'
    
    class PageRequestRequest extends PageRequest{
        keyword:string='';
        from:Date;
        to:Date;
    }
    
    @Component({
        components:{EditRequest}
    })
    export default class Request extends AbpBase{
        edit(a){
            this.editModalShow=true;
            this.newlist=a;
        }
        pagerequest:PageRequestRequest=new PageRequestRequest();
        editModalShow:boolean=false;
        newlist:object=null;
        
        // get loading(){
        //     return this.$store.state.request.loading;
        // }
        pageChange(page:number){
            this.$store.commit('request/setCurrentPage',page);
            this.getpage();
        }
        pagesizeChange(pagesize:number){
            this.$store.commit('request/setPageSize',pagesize);
            this.getpage();
        }
        async getpage(){
            this.pagerequest.maxResultCount=this.pageSize;
            this.pagerequest.skipCount=(this.currentPage-1)*this.pageSize;

            await this.$store.dispatch({
                type:'request/getAll',
                data:this.pagerequest
            })
        }
        get pageSize(){
            return this.$store.state.request.pageSize;
        }
        get totalCount(){
            return this.$store.state.request.totalCount;
        }
        get currentPage(){
            return this.$store.state.request.currentPage;
        }
        Form1={
            requestlist:[{
                ordersAuto: 1,
                accessoriesWorkAuto: 1,
                itemName: '苏州名骏百盛',
                totalAmt: '2000.00',
                makNo: '苏E0M2M8',
                requestAuto: '',
                statusD:'',
                reqUserN:'',
                RDT:'',
                isGPSD:'否',
                GPSNO:'',
                GPSTypeD:''
            },{
                ordersAuto: 2,
                accessoriesWorkAuto: 2,
                itemName: '苏州车上居',
                totalAmt: '3256.00',
                makNo: '@@000002',
                requestAuto: '',
                statusD:'',
                reqUserN:'',
                RDT:'',
                isGPSD:'否',
                GPSNO:'',
                GPSTypeD:''
            }]
        }
        columns=[
        {
            title:this.L('送件'),
            width: 60,
            align: 'center',
            id:'sendcheck',
            render:(h:any,params:any)=>{
                return h('div',[
                    h('Checkbox',{
                        props:{
                            id:'sendcheck',
                            name:'checks'
                        },
                        on:{
                            click:()=>{
                                //console.log("请款送件："+params.row)
                            }
                        }
                    })
                ])
            }
        },{
            title:this.L('月结'),
            width: 65,
            align: 'center',
            render:(h:any,params:any)=>{
                return h('div',[
                    h('Checkbox',{
                        props:{
                            id:'exportcheck',
                            name:'checks'
                        },
                        on:{
                            click:()=>{
                                console.log("配件缺件导出："+params.row)
                            }
                        }
                    })
                ])
            }
        },{
            title:this.L('试算单号'),
            key:'ordersAuto',
        },{
            title:this.L('派工单号'),
            key:'accessoriesWorkAuto',
        },{
            title:this.L('厂商'),
            key:'itemName',
        },{
            title:this.L('金额'),
            key:'totalAmt',
        },{
            title:this.L('车牌号码'),
            key:'makNo',
        },{
            title:this.L('请款单号'),
            key:'requestAuto',
        },{
            title:this.L('请款单状态'),
            key:'statusD',
        },{
            title:this.L('请款人'),
            key:'reqUserN',
        },{
            title:this.L('请款日期'),
            key:'RDT',
        },{
            title:this.L('是否安装GPS'),

            key:'isGPSD',
        },{
            title:this.L('GPS序号'),
            key:'GPSNO',
        },{
            title:this.L('GPS类别'),
            key:'GPSTypeD',
        },{
            title:this.L('Actions'),
            key:'Actions',
            width:110,
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
                                //this.$store.commit('request/edit',params.row);
                                this.edit(params.row);
                                console.log(params.row)
                            }
                        }
                    },this.L('选择'))
                ])
            }
        }]

       /**请款送件 */
        accessoriessend(){
            //1.判断是否选中
            // if(){
                
            // }
            // else{
            //     this.$Message.warning('请选择一行数据');
            // }
        }
        /**缺件配件导出 */
        accessoriesexport(){

        }
        async created(){
            this.getpage();
        }
    }
    
</script>