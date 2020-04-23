<template>
    <div>
        <Modal
         :title="L('Create')"
         :value="value"
         @on-ok="save"
         @on-visible-change="visibleChange"
        >
            <Form ref="targetConfigForm"  label-position="top" :rules="targetConfigRule" :model="targetConfig">
                <FormItem :label="'目标周期'" prop="unit">
                    <Select v-model="targetConfig.unit">
                        <Option :value=2>月</Option>
                        <Option :value=3>日</Option>
                    </Select>
                </FormItem>
                <FormItem :label="'时间选择'" prop="time">
                    <DatePicker v-if="targetConfig.unit===3"  v-model="creationTime" type="daterange" style="width:100%" placement="bottom-end" :placeholder="L('SelectDate')"></DatePicker>
                    <DatePicker v-if="targetConfig.unit===2"  v-model="targetConfig.from" type="month" style="width:100%" placement="bottom-end" :placeholder="L('SelectDate')"></DatePicker>
                </FormItem>
                <FormItem label="订单金额" prop="orderAmount">
                    <Input v-model="targetConfig.orderAmount"/>
                </FormItem>
                <FormItem label="订单数" prop="orderCount">
                    <Input v-model="targetConfig.orderCount"/>
                </FormItem>
                <FormItem label="上线司机数" prop="onlineDriverNum">
                    <Input v-model="targetConfig.onlineDriverNum"/>
                </FormItem>
                <FormItem label="司机日均单量" prop="driverDailyOrderNum">
                    <Input v-model="targetConfig.driverDailyOrderNum"/>
                </FormItem>
                <FormItem label="新增注册数" prop="registerUserNum">
                    <Input v-model="targetConfig.registerUserNum"/>
                </FormItem>
                <FormItem label="日活跃数" prop="dailyActivityNum">
                    <Input v-model="targetConfig.dailyActivityNum"/>
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
    @Component
    export default class CreateTargetConfig extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        targetConfig:any={};
        creationTime:Date[]=[];
        save(){
            if(this.targetConfig.unit===3 && this.creationTime.length>0){
                this.targetConfig.from=this.creationTime[0];
                this.targetConfig.to=this.creationTime[1];
            }
            (this.$refs.targetConfigForm as any).validate(async (valid:boolean)=>{
                if(valid){
                    await this.$store.dispatch({
                        type:'targetConfig/create',
                        data:this.targetConfig
                    });
                    (this.$refs.targetConfigForm as any).resetFields();
                    this.$emit('save-success');
                    this.$emit('input',false);
                    this.creationTime=[];
                }
            })
        }
        cancel(){
            (this.$refs.targetConfigForm as any).resetFields();
            this.$emit('input',false);
            this.creationTime=[];
        }
        visibleChange(value:boolean){
            if(!value){
                this.$emit('input',value);
                this.creationTime=[];
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
        validateNumber(rule:any, value:any, callback:Function){
            value = String(value).trim();
            if (!value) {
                callback(new Error('值不能为空'));
            }
            if (!isFinite(value)) {
                callback(new Error('请输入数字'));
            }
            callback();
        }
        targetConfigRule={
            orderAmount:[{validator:this.validateNumber, trigger: 'blur'}],
            orderCount:[{validator:this.validateInteger, trigger: 'blur'}],
            onlineDriverNum:[{validator:this.validateInteger, trigger: 'blur'}],
            driverDailyOrderNum:[{validator:this.validateInteger, trigger: 'blur'}],
            registerUserNum:[{validator:this.validateInteger, trigger: 'blur'}],
            dailyActivityNum:[{validator:this.validateInteger, trigger: 'blur'}],
        }
    }
</script>
