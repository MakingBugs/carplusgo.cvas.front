<template>
    <div>
        <Modal
         :title="'取消领用'"
         :value="value"
         @on-ok="save"
         @on-visible-change="visibleChange"
        >
            <Form ref="takeCarApplyForm"  label-position="top" :rules="takeCarApplyRule" :model="takeCarApply">
                <FormItem :label="'取消原因'" prop="cancelMemo">
                    <Input v-model="takeCarApply.cancelMemo" type="textarea"/>
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
    import TakeCarApply from '@/store/entities/vehicleScheduling/takeCarApply'
    @Component
    export default class CancelTakeCarApply extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        takeCarApply:TakeCarApply=new TakeCarApply();
        save(){
            (this.$refs.takeCarApplyForm as any).validate(async (valid:boolean)=>{
                if(valid){
                    this.$Modal.confirm({
                        title:'是否确定取消领用',
                        okText:this.L('Yes'),
                        cancelText:this.L('No'),
                        onOk:async()=>{
                            this.takeCarApply.status = 15;
                            this.$store.commit('takeCarApply/edit',this.takeCarApply);
                            var updateTakeCarApply = Util.extend(true,{},this.takeCarApply);
                            await this.$store.dispatch({
                                type:'takeCarApply/update',
                                data:updateTakeCarApply
                            });
                            (this.$refs.takeCarApplyForm as any).resetFields();
                            this.$emit('save-success');
                            this.$emit('input',false);
                        }
                    })

                }
            })
        }
        cancel(){
            (this.$refs.takeCarApplyForm as any).resetFields();
            this.$emit('input',false);
        }
        visibleChange(value:boolean){
            if(!value){
                this.$emit('input',value);
            }else{
                this.takeCarApply=Util.extend(true,{},this.$store.state.takeCarApply.editTakeCarApply);
            }
        }
        takeCarApplyRule={
            cancelMemo:[{required: true,message:'请输入取消原因',trigger: 'blur'}],
        }
    }
</script>

