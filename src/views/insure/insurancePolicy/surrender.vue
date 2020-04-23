<template>
    <div>
        <Modal
         title="退保"
         :value="value"
         @on-ok="save"
         @on-visible-change="visibleChange"
        >
            <Form ref="surrenderForm"  label-position="top" :rules="surrenderRule" :model="surrenderRequest">
                <FormItem label="批单号" prop="serialNumber">
                    <Input v-model="surrenderRequest.serialNumber" :maxlength="50"/>
                </FormItem>
                <FormItem label="保险结束日期" prop="endTime">
                    <DatePicker  v-model="surrenderRequest.endTime" type="date" format="yyyy-MM-dd" style="width:100%" placement="bottom-end" :placeholder="L('SelectDate')"></DatePicker>
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
    class SurrenderRequest {
        serialNumber:String='';
        endTime:Date=new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate(),0,0,0);
        insurancePolicyIds:Array<any>
    }

    @Component({})
    export default class Surrender extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        @Prop({type:Array,default:[]}) data:Array<any>;
        surrenderRequest:SurrenderRequest = new SurrenderRequest();
        async save(){
            this.surrenderRequest.insurancePolicyIds=this.data.map(x=>x.id);
            (this.$refs.surrenderForm as any).validate(async (valid:boolean)=>{
                if(valid){
                    await this.$store.dispatch({
                        type:'insurancePolicy/surrender',
                        data:this.surrenderRequest
                    });
                    (this.$refs.surrenderForm as any).resetFields();
                    this.$emit('save-success');
                    this.$emit('input',false);
                }
            })
        }
        cancel(){  
            (this.$refs.surrenderForm as any).resetFields();
            this.$emit('input',false);
        }
        visibleChange(value:boolean){
            if(!value){
                this.$emit('input',value);
            }
        }
        surrenderRule={
            endTime:[{required: true,type:'date',message:'请选择时间',trigger: 'blur'}]
        }
    }
</script>