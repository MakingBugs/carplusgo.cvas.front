<template>
    <div>
        <Modal
         :title="L('Edit')"
         :value="value"
         @on-ok="save"
         @on-visible-change="visibleChange"
        >
            <Form ref="accessoriesMainTypeForm"  label-position="top" :rules="accessoriesMainTypeRule" :model="accessoriesMainType">
                <FormItem :label="L('主配件名称')" prop="accessoriesMainName">
                    <Input v-model="accessoriesMainType.accessoriesMainName" :maxlength="1024" :minlength="2"/>
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
    import AccessoriesMainType from '@/store/entities/accessories/accessoriesMainType';
    @Component
    export default class EditAccessoriesMainType extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        accessoriesMainType:AccessoriesMainType=new AccessoriesMainType();
        save(){
            (this.$refs.accessoriesMainTypeForm as any).validate(async (valid:boolean)=>{
                if(valid){
                    await this.$store.dispatch({
                        type:'accessoriesMainType/update',
                        data:this.accessoriesMainType
                    });
                    (this.$refs.accessoriesMainTypeForm as any).resetFields();//resetFields 重置
                    this.$emit('save-success');
                    this.$emit('input',false);
                }
            })
        }
        cancel(){
            (this.$refs.accessoriesMainTypeForm as any).resetFields();
            this.$emit('input',false);
        }
        visibleChange(value:boolean){
            if(!value){
                this.$emit('input',value);
            }else{
                this.accessoriesMainType=Util.extend(true,{},this.$store.state.accessoriesMainType.editAccessoriesMainType);
            }
        }
        accessoriesMainTypeRule={//验证
            accessoriesMainName:[{required:true,message:this.L('FieldIsRequired',undefined,this.L('accessoriesMainName')),trigger: 'blur'}]
        }
    }
</script>
