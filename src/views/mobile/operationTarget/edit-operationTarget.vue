<template>
    <div>
        <Modal
         title="编辑营运指标"
         :value="value"
         @on-ok="save"
         @on-visible-change="visibleChange"
        >
            <Form ref="operationTargetForm"  label-position="top" :rules="operationTargetRule" :model="operationTarget">
                <FormItem label="在岗人数" prop="onDutyDriverCount">
                    <Input v-model="operationTarget.onDutyDriverCount"/>
                </FormItem>
                <FormItem label="招募数" prop="recruitDriverCount">
                    <Input v-model="operationTarget.recruitDriverCount"/>
                </FormItem>
                <FormItem label="离职数" prop="quitDriverCount">
                    <Input v-model="operationTarget.quitDriverCount"/>
                </FormItem>
                <FormItem label="车辆总数" prop="carCount">
                    <Input v-model="operationTarget.carCount"/>
                </FormItem>
                <FormItem label="可营运车辆数" prop="operationCarCount">
                    <Input v-model="operationTarget.operationCarCount"/>
                </FormItem>
                <FormItem label="事故车辆数" prop="accidentCarCount">
                    <Input v-model="operationTarget.accidentCarCount"/>
                </FormItem>
                <FormItem label="在厂车辆数" prop="maintenanceCarCount">
                    <Input v-model="operationTarget.maintenanceCarCount"/>
                </FormItem>
                <FormItem label="投诉司机数" prop="complaintDriverUserCount">
                    <Input v-model="operationTarget.complaintDriverUserCount"/>
                </FormItem>
                <FormItem label="投诉APP数" prop="complaintAppUserCount">
                    <Input v-model="operationTarget.complaintAppUserCount"/>
                </FormItem>
                <FormItem label="用车体验不佳" prop="complaintCarUserCount">
                    <Input v-model="operationTarget.complaintCarUserCount"/>
                </FormItem>
                <FormItem label="重点工作事项" prop="mainWorkItems">
                    <Input v-model="operationTarget.mainWorkItems" type="textarea" :autosize="true"/>
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
    @Component
    export default class EditOperationTarget extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        operationTarget:any={};
        created(){
            
        }
        save(){
            (this.$refs.operationTargetForm as any).validate(async (valid:boolean)=>{
                if(valid){
                    await this.$store.dispatch({
                        type:'operationTarget/update',
                        data:this.operationTarget   
                    });
                    (this.$refs.operationTargetForm as any).resetFields();
                    this.$emit('save-success');
                    this.$emit('input',false);
                }
            })
        }
        cancel(){
            (this.$refs.operationTargetForm as any).resetFields();
            this.$emit('input',false);
        }
        visibleChange(value:boolean){
            if(!value){
                this.$emit('input',value);
            }else{
                this.operationTarget=Util.extend(true,{},this.$store.state.operationTarget.editOperationTarget);
            }
        }
        validateInteger(rule:any, value:any, callback:Function){
            value = String(value).trim();
            if (!value) {
                callback(new Error('值不能为空'));
            }
            if (!Number.isInteger(Number(value))) {
                callback(new Error('请输入整数'));
            }
            callback();
        }
        operationTargetRule={
            onDutyDriverCount:[{validator:this.validateInteger, trigger: 'blur'}],
            recruitDriverCount:[{validator:this.validateInteger, trigger: 'blur', }],
            quitDriverCount:[{validator:this.validateInteger, trigger: 'blur', }],
            carCount:[{validator:this.validateInteger, trigger: 'blur', }],
            operationCarCount:[{validator:this.validateInteger, trigger: 'blur', }],
            accidentCarCount:[{validator:this.validateInteger, trigger: 'blur', }],
            maintenanceCarCount:[{validator:this.validateInteger, trigger: 'blur', }],
            complaintDriverUserCount:[{validator:this.validateInteger, trigger: 'blur', }],
            complaintAppUserCount:[{validator:this.validateInteger, trigger: 'blur', }],
            complaintCarUserCount:[{validator:this.validateInteger, trigger: 'blur', }],
            mainWorkItems:[{required: false, max:500 , message:"输入重点工作事项", trigger: 'blur'}],
        }
    }
</script>

