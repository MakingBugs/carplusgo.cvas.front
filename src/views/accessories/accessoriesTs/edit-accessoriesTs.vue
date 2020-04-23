<template>
    <div>
        <Modal
         :title="L('Edit')"
         :value="value" 
         :information="information"
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
                    <Select v-model="accessoriesTs.accessoriesTypeAuto">
                        <Option v-for="item in accessoriesTypeList" :value="item.id" :key="item.id">{{ item.accessoriesTypeName }}</Option>
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
    export default class EditAccessoriesTs extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        @Prop({type:Object,default:null}) information:any;
        accessoriesTs:AccessoriesTs=new AccessoriesTs();
        pageItemCodeRequest:PageItemCodeRequest=new PageItemCodeRequest();
        pageAccessoriesTypeRequest:PageAccessoriesTypeRequest=new PageAccessoriesTypeRequest();
        pageAccessoriesMainTypeRequest:PageAccessoriesMainTypeRequest=new PageAccessoriesMainTypeRequest();
        itemcodelist:any=null;
        partslist:any=[];
        mainparts:number=null;
        save(){
            (this.$refs.accessoriesTsForm as any).validate(async (valid:boolean)=>{
                if(valid){
                    await this.$store.dispatch({
                        type:'accessoriesTs/update',
                        data:this.accessoriesTs
                    });
                    (this.$refs.accessoriesTsForm as any).resetFields();
                    this.$emit('save-success');
                    this.$emit('input',false);
                }
            })
        }
        
        cancel(){
            (this.$refs.accessoriesTsForm as any).resetFields();
            this.$emit('input',false);
        }
       async visibleChange(value:boolean){
            if(!value){
                this.$emit('input',value);
            }else{
                this.getList();
                this.mainparts=this.information.accessoriesType.accessoriesMainTypeAuto;
                this.accessoriesMainNameChange(this.mainparts);
                this.accessoriesTs=Util.extend(true,{},this.information);
            }
        }
        //二级菜单
        async accessoriesMainNameChange(val:number){
            this.accessoriesTs.accessoriesTypeAuto=null;//清空第二个select的选项
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
                this.accessoriesTs.accessoriesTypeAuto=this.information.accessoriesTypeAuto
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
        accessoriesTsRule={
            // purchasePrice:[{required:true,message:this.L('FieldIsRequired',undefined,this.L('purchasePrice')),trigger: 'blur'}],
            // costPrice:[{required:true,message:this.L('FieldIsRequired',undefined,this.L('costPrice')),trigger: 'blur'}],
            // sellingPrice:[{required:true,message:this.L('FieldIsRequired',undefined,this.L('sellingPrice')),trigger: 'blur'}],
        }
        
    }
</script>
