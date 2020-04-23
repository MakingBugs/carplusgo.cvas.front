<template>
    <div>
        <Modal
         :title="'取消入库'"
         :value="value"
         @on-ok="save"
         @on-visible-change="visibleChange"
        >
            <Form ref="repositoryOutForm"  label-position="top" :rules="repositoryOutRule" :model="repositoryOut">
                <FormItem :label="'取消原因'" prop="rejectMemo">
                    <Input v-model="repositoryOut.rejectMemo" type="textarea" :rows="4" :maxlength="1024"/>
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
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator'
    import Util from '@/lib/util'
    import AbpBase from '@/lib/abpbase'
    import PageRequest from '@/store/entities/page-request'
    import CarBase from '@/store/entities/car/carbase'
    import RepositoryOut from '@/store/entities/vehicleScheduling/repositoryOut'


    @Component
    export default class CreateRepositoryOut extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        repositoryOut:RepositoryOut=new RepositoryOut();
        save(){
            (this.$refs.repositoryOutForm as any).validate(async (valid:boolean)=>{
                if(valid){
                    this.$Modal.confirm({
                        title:this.L('Tips'),
                        content:'是否取消入库',
                        okText:this.L('Yes'),
                        cancelText:this.L('No'),
                        onOk:async()=>{
                            this.repositoryOut.status = 35
                            await this.$store.dispatch({
                                type:'repositoryOut/create',
                                data:this.repositoryOut
                            });
                            this.$emit('save-success');
                            (this.$refs.repositoryOutForm as any).resetFields();
                            this.$emit('input',false);
                        }
                    });
                }
            })
        }
        cancel(){
            (this.$refs.repositoryOutForm as any).resetFields();
            this.$emit('input',false);
        }
        visibleChange(value:boolean){
            if(!value){
                this.$emit('input',value);
            }else{
                this.repositoryOut=Util.extend(true,{},this.$store.state.repositoryOut.editRepositoryOut);
            }
        }
        repositoryOutRule={
            rejectMemo:[{required:true,message:'请输入取消原因'}]
        }
    }
</script>

