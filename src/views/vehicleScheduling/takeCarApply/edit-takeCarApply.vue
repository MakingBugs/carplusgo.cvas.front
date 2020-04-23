<template>
    <div>
        <Modal
         title='车辆取用整备作业'
         :value="value"
         fullscreen
         @on-visible-change="visibleChange"
        >
            <Collapse v-model="collapseValue">
                    <Panel name="1">
                        车辆提领申请信息
                        <div slot="content">
                            <Form ref="queryForm" :label-width="80" label-position="right" inline>  
                                <Row :gutter="20">
                                    <Col :xs="24" :md="12" :xxl="6">
                                        <FormItem :label="'申请事由:'" style="width:100%">
                                            <Select v-model="takeCarApply.type" disabled>
                                                <Option v-for="item in typeList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <Col :xs="24" :md="12" :xxl="6">
                                        <FormItem :label="'提领区域:'" style="width:100%">
                                            <Input v-model="areaName" disabled :maxlength="50"/>
                                        </FormItem>
                                    </Col>
                                    <Col :xs="24" :md="12" :xxl="6">
                                        <FormItem :label="'申请日期:'" style="width:100%">
                                            <DatePicker v-model="takeCarApply.creationTime" format="yyyy-MM-dd" disabled style="width:100%"/>
                                        </FormItem>
                                    </Col>
                                    <Col :xs="24" :md="12" :xxl="6">
                                        <FormItem :label="'预估提领日期:'" style="width:100%">
                                            <DatePicker v-model="takeCarApply.takeDate" format="yyyy-MM-dd" disabled style="width:100%"/>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row :gutter="20" class="margin-top-10">
                                    <Col :xs="24" :md="12" :xxl="6">
                                        <FormItem :label="'预估提领台数:'" style="width:100%">
                                            <Input v-model="takeCarApply.takeQty" disabled :maxlength="50"/>
                                        </FormItem>
                                    </Col>
                                    <Col :xs="24" :md="12" :xxl="6">
                                        <FormItem :label="'提领状态:'" style="width:100%">
                                            <Select v-model="takeCarApply.status" disabled>
                                                <Option v-for="item in statusList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <Col :xs="24" :md="12" :xxl="12">
                                        <FormItem :label="'车型:'" style="width:100%">
                                            <Input v-model="clasenName" disabled :maxlength="50"/>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row :gutter="20" class="margin-top-10">
                                    <col span="6">
                                        <Button v-if="isShowButton" type="primary" size="large" @click="finishTakeCarApply" class="toolbar-btn">完成领用</Button>
                                        <Button v-if="isShowButton" type="error" size="large" @click="cancelTakeCarApply" class="toolbar-btn">取消领用</Button>
                                    </col>
                                </Row>
                            </Form>
                        </div>
                    </Panel>
                    <Panel name="2">
                        选取车辆信息
                        <div slot="content">
                            <Row :gutter="20" class="margin-top-10">
                                <col span="6">
                                    <Button v-if="isShowButton" type="primary" size="large" @click="createShowTakeCar" class="toolbar-btn">新增车辆</Button>
                                </col>
                            </Row>
                            <Table class="margin-top-10" :columns="columns" :loading="loading" :no-data-text="L('NoDatas')" border :data="list">
                            </Table>
                        </div>
                    </Panel>
                </Collapse>
            <div slot="footer">
                <Button @click="cancel">关闭</Button>
            </div>
            <create-takeCar v-model="createShow" @save-success="getpage"></create-takeCar>
            <cancel-takeCarApply v-model="cancelShow" @save-success="getpage"></cancel-takeCarApply>
        </Modal>
    </div>
</template>

<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '@/lib/util'
    import AbpBase from '@/lib/abpbase'
    import PageRequest from '@/store/entities/page-request'
    import TakeCarApply from '@/store/entities/vehicleScheduling/takeCarApply'
    import CancelTakeCarApply from './cancel-takeCarApply.vue'
    import CreateTakeCar from './create-takeCar.vue'

    class PageTakeCarRequest extends PageRequest{
        ids:any[]=[];
    }

    class PageItemCodeRequest extends PageRequest{
        itemTypes:Array<number>
    }

    @Component({
        components:{CreateTakeCar,CancelTakeCarApply}
    })
    export default class EditTakeCarApply extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        cancelShow:Boolean=false;
        createShow:Boolean=false;
        takeCarApply:TakeCarApply=new TakeCarApply();
        pageItemCodeRequest:PageItemCodeRequest=new PageItemCodeRequest();
        pagerequest:PageTakeCarRequest=new PageTakeCarRequest();
        collapseValue:Array<string>=["1","2"]
        cancel(){
            this.$emit('save-success');
            this.$emit('input',false);
        }
        finishTakeCarApply(){
            this.$Modal.confirm({
                    title:'是否确定领用完成',
                    okText:this.L('Yes'),
                    cancelText:this.L('No'),
                    onOk:async()=>{
                        this.takeCarApply.status = 30;
                        this.$store.commit('takeCarApply/edit',this.takeCarApply);
                        var updateTakeCarApply = Util.extend(true,{},this.takeCarApply);
                        await this.$store.dispatch({
                            type:'takeCarApply/update',
                            data:updateTakeCarApply
                        })
                        await this.getpage();
                    }
            })
        }
        cancelTakeCarApply(){
            this.cancelShow = true;
        }
        createShowTakeCar(){
            this.createShow = true;
        }
        get isShowButton(){
            return this.takeCarApply.status !== 15 && this.takeCarApply.status !== 30
        }
        get areaName(){
            return (!!this.takeCarApply.location) ? this.takeCarApply.location.areaName : '';
        }
        get clasenName(){
            return (!!this.takeCarApply.clasenData) ? this.takeCarApply.clasenData.clasenName : '';
        }
        async visibleChange(value:boolean){
            if(!value){
                this.$emit('input',value);
            }else{
                await this.getpage();
            }
        }
        async getpage(){
            this.takeCarApply=Util.extend(true,{},this.$store.state.takeCarApply.editTakeCarApply);
            this.pagerequest.maxResultCount=1000;
            this.pagerequest.skipCount=0;
            this.pagerequest.ids=[this.takeCarApply.id]

            await this.$store.dispatch({
                type:'takeCar/getAll',
                data:this.pagerequest
            })

            this.pageItemCodeRequest.maxResultCount=10000;
            this.pageItemCodeRequest.skipCount=0;
            this.pageItemCodeRequest.itemTypes = [1606,1609,411];

            let page = await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            })
        }
        get loading(){
            return this.$store.state.takeCar.loading;
        }
        get list(){
            return this.$store.state.takeCar.list;
        }
        get statusList(){
            return (this.$store.state.itemCode.list as Array<any>).filter(x=>x.itemType === 1606)
        }
        get typeList(){
            return (this.$store.state.itemCode.list as Array<any>).filter(x=>x.itemType === 1609)
        }
        get isBusinessList(){
            return (this.$store.state.itemCode.list as Array<any>).filter(x=>x.itemType === 411)
        }
        columns=[{
            title:'车牌号码',
            align: 'center',
            tooltip:true,
            render: (h:any, params:any) => {
                return h('span',(!!params.row.carBase)?params.row.carBase.makNo:'')
            }
        },{
            title:'发动机号',
            align: 'center',
            tooltip:true,
            render: (h:any, params:any) => {
                return h('span',(!!params.row.carBase)?params.row.carBase.engNo:'')
            }
        },{
            title:'车架号',
            align: 'center',
            tooltip:true,
            render: (h:any, params:any) => {
                return h('span',(!!params.row.carBase)?params.row.carBase.carNo:'')
            }
        },{
            title:'车色',
            align: 'center',
            tooltip:true,
            render: (h:any, params:any) => {
                return h('span',(!!params.row.carBase)?params.row.carBase.carColor:'')
            }
        },{
            title:'上牌日',
            align: 'center',
            tooltip:true,
            render: (h:any, params:any) => {
                return h('span',(!!params.row.carBase)?new Date(params.row.carBase.makDt).toLocaleDateString():'')
            }
        },{
            title:'车险性质别',
            align: 'center',
            tooltip:true,
            render: (h:any, params:any) => {
                if(!!params.row.carBase){
                    var temp = this.isBusinessList.find(x=>x.num === params.row.carBase.isBusiness);
                    return h('span',(!!temp)? temp.itemName:'')
                }else{
                    return h('span','')
                }
            }
        },{
            title:'区域',
            align: 'center',
            tooltip:true,
            render: (h:any, params:any) => {
                return h('span', (!!params.row.carBase) &&(!!params.row.carBase.repository) && (!!params.row.repository.location)?params.row.carBase.repository.location.areaName:'')
            }
        },{
            title:'仓库',
            align: 'center',
            tooltip:true,
            render: (h:any, params:any) => {
                return h('span',(!!params.row.carBase) &&(!!params.row.carBase.repository)?params.row.carBase.repository.repositoryName:'')
            }
        },{
            title:'状态',
            align: 'center',
            tooltip:true,
            render: (h:any, params:any) => {
                return h('span',(!!params.row.itemStatusCode)?params.row.itemStatusCode.itemName:'')
            }
        },{
            title:this.L('Actions'),
            key:'Actions',
            align: 'center',
            tooltip:true,
            render:(h:any,params:any)=>{ 
                if(this.isShowButton && (params.row.status === 0 || params.row.status === 15 || params.row.status === 35)){
                    return h('div',[
                        h('Button',{
                            props:{
                                type:'error',
                                size:'small'
                            },
                            on:{
                                click:async ()=>{
                                    this.$Modal.confirm({
                                            title:this.L('Tips'),
                                            content:'是否确定删除',
                                            okText:this.L('Yes'),
                                            cancelText:this.L('No'),
                                            onOk:async()=>{
                                                await this.$store.dispatch({
                                                    type:'takeCar/delete',
                                                    data:params.row
                                                })
                                                await this.getpage();
                                                var editTakeCarApply = Util.extend(true,{},this.$store.state.takeCarApply.editTakeCarApply)
                                                editTakeCarApply.takeCarList = editTakeCarApply.takeCarList.filter(x=>x.id !== params.row.id);
                                                this.$store.commit('takeCarApply/edit',editTakeCarApply);
                                            }
                                    })
                                }
                            }
                        },this.L('Delete'))
                    ])
                }else{
                    return h('div','')
                }
                
            }
        }]
    }
</script>