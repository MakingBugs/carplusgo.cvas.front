<template>
    <div>
        <Modal
         :title="L('维修记录')"
         :value="value" 
         :width="1200"
         :repairitems="repairitems"
         @on-ok="save"
         @on-visible-change="visibleChange"
        >
            <Form ref="carRepairForm" :label-width="100">
            <Card dis-hover>
            <div class="page-body">
                <div class="margin-top-10">
                    <h3 style="text-align:center">维修记录</h3>
                    <Table :columns="columns1" border :data="carFixLog">
                    </Table>
                </div>
                <div class="margin-top-10">
                    <h3 style="text-align:center">交修记录</h3>
                    <Table :columns="columns3" border :data="carRepairLog">
                    </Table>
                </div>
            </div>
            </Card>
            </Form>
            <div slot="footer">
                <Button @click="save">{{L('确定')}}</Button>
            </div>
        </Modal>
    </div>
</template>
<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '../../../lib/util'
    import AbpBase from '../../../lib/abpbase'
    import PageRequest from '@/store/entities/page-request'
    import Inc from '../../../store/entities/public/inc';
    import Clasen from '../../../store/entities/car/clasen';
    import CarFixItem from './carFixItem.vue'

    class PageCarRepairRequest extends PageRequest{
        maxResultCount=10000
        skipCount=0
        carBaseAuto:number=null;
    }
    class PageCarFixRequest extends PageRequest{
        maxResultCount=10000
        skipCount=0
        makNo:string='';
        status:Array<any>=[];
    }
    class PageIncRequest extends PageRequest{//公司别
        maxResultCount=10000
        skipCount=0
    }
    class PageItemCodeRequest extends PageRequest{
        maxResultCount=10000
        skipCount=0
        itemTypes:Array<number>
    }

    @Component({
        components:{CarFixItem}
    })
    export default class CheckCarFix extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        @Prop({type:Object,default:null}) repairitems:any;//传值
        pageCarRepairRequest:PageCarRepairRequest=new PageCarRepairRequest();
        pageCarFixRequest:PageCarFixRequest=new PageCarFixRequest()
        pageIncRequest:PageIncRequest=new PageIncRequest();//公司别
        pageItemCodeRequest:PageItemCodeRequest=new PageItemCodeRequest();
        carFixLog:any=[];//维修记录
        newCarFix:any=[];
        carRepairLog:any=[];//交修记录 
        newCarRepair:any=[];

        save(){
            (this.$refs.carRepairForm as any).resetFields();
            this.carFixLog=[];
            this.newCarFix=[];
            this.newCarRepair=[];
            this.carRepairLog=[];
            this.$emit('input',false);
        }
        async visibleChange(value:boolean){
            if(!value){
                this.carFixLog=[];
                this.newCarFix=[];
                this.newCarRepair=[];
                this.carRepairLog=[];
                this.$emit('input',value);
            }else{
                await this.getList();
            }
        }
        async getList(){
            //根据车号查询维修记录
            this.pageCarFixRequest.makNo=this.repairitems.makNo;
            await this.$store.dispatch({
                type:'carFix/getAll',
                data:this.pageCarFixRequest
            }).then(res=>{
                res.items.forEach(async (x) => {
                    await this.getClasenandInc(x,x.carBase.clasenAuto,x.carBase.incAuto);
                    await this.getCarFixItem(x,x.carFixItem);
                    this.newCarFix.push(x);
                });
                this.carFixLog=this.newCarFix;//维修记录 
            })
            //根据车号查询交修记录
            this.pageCarRepairRequest.carBaseAuto=this.repairitems.carbaseauto;
            await this.$store.dispatch({
                type:'carRepair/getAll',
                data:this.pageCarRepairRequest
            }).then(res=>{
                res.items.forEach(async (x) => {
                    await this.getClasenandInc(x,x.carBase.clasenAuto,x.carBase.incAuto);
                    this.newCarRepair.push(x);
                });
                this.carRepairLog=this.newCarRepair;
            })
        }
    //获取类别名
    async getCarFixItem(data,carFixItem){
        this.pageItemCodeRequest.itemTypes = [511];
        await this.$store.dispatch({
            type:'itemCode/GetItemCodeByItemTypes',
            data:this.pageItemCodeRequest
        }).then(res=>{
            res.items.map(x=>{
                carFixItem.map(i=>{
                    if(x.num==i.itemType){
                        this.$set(i,'itemTypeD',x.itemName);//插入明细数组
                    }
                })
            })
        });
    }
    //获取车型和公司名称
    async getClasenandInc(data,clasenid,incid){
        if(clasenid!=null&&clasenid!=0){
            var clas=new Clasen();
            clas.id=clasenid;
                await this.$store.dispatch({
                    type:'clasen/get',
                    data:clas
                }).then(res=>{
                    this.$set(data,'clasenName',res.clasenName);//插入车型到数组
                })
        }
        if(incid!=null&&incid!=0){
            await this.$store.dispatch({
                type:'inc/getAll',
                data:this.pageIncRequest
            }).then(res=>{
                res.items.map(i=>{
                    if(incid==i.id){
                        var inc=new Inc();
                        inc.id=incid;
                        this.$store.dispatch({
                            type:'inc/get',
                            data:inc
                        }).then(res=>{
                            this.$set(data,'incName',res.sname);//插入公司名称到数组
                        })
                    }
                })
            })
        }
    }
    columns1=[{
            type: 'expand',
            width:50,
            align: 'center',
            fixed: 'left',
            tooltip:true,
            render: (h, params) => {
                return h(CarFixItem, {
                    props: {
                        row: params.row,
                    }
                })
            }
        },{
            title:'车牌号码',
            key:'makNo'
        },{
            title:'车型',
            key:'clasenName'
        },{
            title:'维修日期',
            key:'fixDt',
            render:(h:any,params:any)=>{
                return h('span',new Date(params.row.fixDt).toLocaleDateString())
            }
        },{
            title:'维修里程',
            key:'km'
        },{
            title:'维修类别',
            key:'fixTypeName',
            render:(h:any,params:any)=>{
                return h('span',params.row.itemCodeFixTypeData==null?'':params.row.itemCodeFixTypeData.itemName)
            }
        },{
            title:'实付金额',
            key:'realAmount'
        },{
            title:'维修厂',
            key:'supplierName',
            render:(h:any,params:any)=>{
                return h('span',params.row.supplier==null?'':params.row.supplier.sname)
            }
        },{
            title:'公司别',
            key:'incName'
        },{
            title:'建档日期',
            key:'cdt',
            render:(h:any,params:any)=>{
                return h('span',new Date(params.row.cdt).toLocaleDateString())
            }
        },{
            title:'送件批号',
            key:'carFixBatchTno'
    }]
    columns3=[{
            title:'交修单号',
            key:'id'
        },{
            title:'车牌号码',
            render:(h:any,params:any)=>{
                return h('span',params.row.carBase.makNo)
            }
        },{
            title:'车型',
            key:'clasenName'
        },{
            title:'交修人',
            key:'repairName'
        },{
            title:'交修日期',
            render:(h:any,params:any)=>{
                return h('span',new Date(params.row.repairDt).toLocaleDateString())
            }
        },{
            title:'行驶里程',
            key:'km'
        },{
            title:'交修类别',
            render:(h:any,params:any)=>{
                return h('span',params.row.repairTypeItemCode.itemName)
            }
        },{
            title:'维修厂商',
            render:(h:any,params:any)=>{
                return h('span',params.row.supplier==null?'':params.row.supplier.fname)
            }
        },{
            title:'送修问题',
            key:'repairProblem'
        },{
            title:'作业项目',
            key:'operatingItem'
        },{
            title:'交修建议',
            key:'repairRecommendation'
        },{
            title:'状态',
            render:(h:any,params:any)=>{
                var text='';
                if(params.row.status==0){
                    text='暂存';
                }else if(params.row.status==10){
                    text='送签中';
                }else if(params.row.status==5){
                    text='驳回';
                }else if(params.row.status==20){
                    text='核准';
                }else if(params.row.status==30){
                    text='完工';
                }
                return h('span',text);
            }
    }]
    }
</script>