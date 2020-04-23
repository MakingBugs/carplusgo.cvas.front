<template>
    <div>
        <Modal
         :title="L('Create')"
         :value="value"
         @on-ok="save"
         @on-visible-change="visibleChange"
        >
            <Form ref="accessoriesTypeForm"  label-position="top" :rules="accessoriesTypeRule" :model="accessoriesType">
                <FormItem :label="L('主配件')" prop="accessoriesMainTypeAuto">
                    <Select v-model="accessoriesType.accessoriesMainTypeAuto" :loading="loadingAccessoriesMainTypeList">
                        <Option v-for="item in accessoriesMainTypeList" :value="item.id" :key="item.id">{{ item.accessoriesMainName }}</Option>
                    </Select>
                </FormItem>
                <FormItem :label="L('次配件')" prop="accessoriesTypeName">
                    <Input v-model="accessoriesType.accessoriesTypeName" :maxlength="1024" :minlength="2"/>
                </FormItem>
                <FormItem :label="L('厂商进价')" prop="purchasePrice">
                    <Input v-model="accessoriesType.purchasePrice" :maxlength="1024" :minlength="2"/>
                </FormItem>
                <FormItem :label="L('配件售价')" prop="sellingPrice">
                    <Input v-model="accessoriesType.sellingPrice" :maxlength="1024" :minlength="2"/>
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
    import Util from '@/lib/util'
    import AbpBase from '@/lib/abpbase'
    import PageRequest from '@/store/entities/page-request'
    import AccessoriesType from '@/store/entities/accessories/accessoriesType';

    class PageAccessoriesMainTypeRequest extends PageRequest{
        keyword:string='';
        from:Date;
        to:Date;
    }

    @Component
    export default class CreateAccessoriesType extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        accessoriesType:AccessoriesType=new AccessoriesType();
        pageaccessoriesMainTypeRequest:PageAccessoriesMainTypeRequest=new PageAccessoriesMainTypeRequest();
        save(){
            (this.$refs.accessoriesTypeForm as any).validate(async (valid:boolean)=>{
                if(valid){
                    await this.$store.dispatch({
                        type:'accessoriesType/create',
                        data:this.accessoriesType
                    });
                    (this.$refs.accessoriesTypeForm as any).resetFields();//resetFields 重置
                    this.$emit('save-success');
                    this.$emit('input',false);
                }
            })
        }
        cancel(){
            (this.$refs.accessoriesTypeForm as any).resetFields();
            this.$emit('input',false);
        }
        visibleChange(value:boolean){
            if(!value){
                this.$emit('input',value);
            }
            else{
                this.getList();
            }
        }
        get accessoriesMainTypeList(){//主配件
            return this.$store.state.accessoriesMainType.list;
        };
        get loadingAccessoriesMainTypeList(){
            return this.$store.state.accessoriesMainType.loading;
        }
        async getList(){
            this.pageaccessoriesMainTypeRequest.maxResultCount=10000;
            this.pageaccessoriesMainTypeRequest.skipCount=0;
            
            await this.$store.dispatch({
                type:'accessoriesMainType/getAll',
                data:this.pageaccessoriesMainTypeRequest
            })
        }
        accessoriesTypeRule={//验证
            accessoriesTypeName:[{required:true,message:this.L('FieldIsRequired',undefined,this.L('accessoriesTypeName')),trigger: 'blur'}],
            purchasePrice:[{required:true,message:this.L('FieldIsRequired',undefined,this.L('purchasePrice')),trigger: 'blur'}],
            sellingPrice:[{required:true,message:this.L('FieldIsRequired',undefined,this.L('sellingPrice')),trigger: 'blur'}],
        }
    }
</script>
