<template>
    <div>
        <Modal
         :title="L('Create')"
         :value="value"
         @on-ok="save"
         @on-visible-change="visibleChange"
        >
            <Form ref="accessoriesTsForm"  label-position="top" :rules="accessoriesTsRule" :model="accessoriesTs">
                <FormItem :label="L('主配件')" prop="mainparts">
                    <Select v-model="mainparts" :loading="loadingAccessoriesList" @on-change="accessoriesMainNameChange">
                        <Option v-for="item in accessoriesList" :value="item.id" :key="item.id">{{ item.accessoriesMainName }}</Option>
                    </Select>
                </FormItem>
                <FormItem :label="L('次配件')"  prop="accessoriesTypeAuto">
                    <Select v-model="Form1.accessoriesTypeAuto">
                        <Option v-for="item in accessoriesTypeList" :value="item.id" :key="item.id">{{ item.accessoriesTypeName}}</Option>
                    </Select>
                </FormItem>
                <FormItem :label="L('厂商')" prop="supplier">
                    <Select v-model="accessoriesTs.supplier">
                        <Option v-for="item in itemTypeList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                    </Select>
                </FormItem>
                <FormItem :label="L('采购价')" prop="purchasePrice">
                    <Input v-model="accessoriesTs.purchasePrice" :maxlength="50"/>
                </FormItem>
                <FormItem :label="L('成本价')" prop="costPrice">
                    <Input v-model="accessoriesTs.costPrice" :maxlength="50"/>
                </FormItem>
                <FormItem :label="L('配件售价')" prop="sellingPrice">
                    <Input v-model="accessoriesTs.sellingPrice" :maxlength="50"/>
                </FormItem>
                <FormItem :label="L('Item类别')" prop="itemType" style="display:none;">
                    <Input v-model="accessoriesTs.itemType" :maxlength="50"/>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click="cancel">{{L('Cancel')}}</Button>
                <Button @click="save" type="primary">{{L('OK')}}</Button>
            </div>
        </Modal>
    </div>
</template>
<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '../../../lib/util'
    import AbpBase from '../../../lib/abpbase'
    import PageRequest from '@/store/entities/page-request'
    import AccessoriesTs from '@/store/entities/accessories/accessoriesTs';

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
    class PageItemCodeRequest extends PageRequest{
        keyword:string='';
        from:Date;
        to:Date;
        itemTypes:Array<number>
    }

    @Component
    export default class CreateAccessoriesTs extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        accessoriesTs:AccessoriesTs=new AccessoriesTs();
        pageItemCodeRequest:PageItemCodeRequest=new PageItemCodeRequest();
        pageAccessoriesTypeRequest:PageAccessoriesTypeRequest=new PageAccessoriesTypeRequest();
        pageAccessoriesMainTypeRequest:PageAccessoriesMainTypeRequest=new PageAccessoriesMainTypeRequest();
        itemcodelist:any=null;
        partslist:any=[];
        mainparts:number=null;
        itemType:number=883;
        save(){
            (this.$refs.accessoriesTsForm as any).validate(async (valid:boolean)=>{
                if(valid){
                    this.accessoriesTs.accessoriesTypeAuto=this.Form1.accessoriesTypeAuto;//赋值给次配件
                    console.log(this.accessoriesTs.accessoriesTypeAuto)
                    await this.$store.dispatch({
                        type:'accessoriesTs/create',
                        data:this.accessoriesTs
                    });
                    (this.$refs.accessoriesTsForm as any).resetFields();
                    this.$emit('save-success');
                    this.$emit('input',false);
                    
                    this.mainparts=null;
                    this.accessoriesTs.accessoriesTypeAuto=null;
                    this.accessoriesTs.supplier=null;
                    this.accessoriesTs.purchasePrice=null;
                    this.accessoriesTs.costPrice=null;
                    this.accessoriesTs.sellingPrice=null;
                }
            })
        }
        cancel(){
            (this.$refs.accessoriesTsForm as any).resetFields();
            this.$emit('input',false);
            this.mainparts=null;
            this.accessoriesTs.accessoriesTypeAuto=null;
            this.accessoriesTs.supplier=null;
            this.accessoriesTs.purchasePrice=null;
            this.accessoriesTs.costPrice=null;
            this.accessoriesTs.sellingPrice=null;
        }
        visibleChange(value:boolean){
            if(!value){
                this.$emit('input',value);
            }else{
                this.getList();
            }
        }
        //二级菜单
        async accessoriesMainNameChange(val){
            this.Form1.accessoriesTypeAuto=null;//清空第二个select的选项
            this.partslist=[];//清空次配件上一次的数据
            this.pageAccessoriesTypeRequest.maxResultCount=10000;
            this.pageAccessoriesTypeRequest.skipCount=0;
            
            await this.$store.dispatch({
                type:'accessoriesType/getAll',
                data:this.pageAccessoriesTypeRequest
            }).then(res=>{
                res.items.map(i=>{
                    if(i.accessoriesMainTypeAuto==val){
                        this.partslist.push(i)
                    }
                })
                if(this.accessoriesTypeList.length<1){
                    console.log("该主配件没有次配件");
                }
                // else{
                //     this.accessoriesTs.accessoriesTypeAuto = this.accessoriesTypeList[0].id;//每次加载给第一个赋值
                // }
            })
        }

        get accessoriesList(){//主配件
            return this.$store.state.accessoriesMainType.list;
        };
        get loadingAccessoriesList(){
            return this.$store.state.accessoriesMainType.loading;
        }
        get accessoriesTypeList(){//次配件
            return this.partslist;
        };
        get itemTypeList(){//厂商
            return this.itemcodelist;
        };
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
        Form1={
            accessoriesTypeAuto:null
        }
        accessoriesTsRule={
            purchasePrice:[{required:true,message:this.L('FieldIsRequired',undefined,this.L('PurchasePrice')),trigger: 'blur'}],
            costPrice:[{required:true,message:this.L('FieldIsRequired',undefined,this.L('CostPrice')),trigger: 'blur'}],
            sellingPrice:[{required:true,message:this.L('FieldIsRequired',undefined,this.L('SellingPrice')),trigger: 'blur'}],
        }
    }
</script>
