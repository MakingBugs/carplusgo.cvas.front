<template>
    <div>
        <Modal
         title='新增区域'
         :value="value"
         @on-ok="save"
         @on-visible-change="visibleChange"
        >
            <Form ref="warehouseAreaForm" :rules="checkForm" :model="location" :label-width="80">
                <FormItem label="区域名称" prop="areaName">
                    <Input v-model="location.areaName"/>
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
    import Location from '@/store/entities/vehicleScheduling/location'

    @Component
    export default class CreateWarehouseArea extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        location:Location=new Location();
        save(){
            (this.$refs.warehouseAreaForm as any).validate(async (valid:boolean)=>{
                if(valid){
                    this.location.isStop=1;
                    this.$Modal.confirm({
                        title:this.L('Tips'),
                        content:this.L('是否确认存储？区域名称：【'+this.location.areaName+'】'),
                        okText:this.L('Yes'),
                        cancelText:this.L('No'),
                        onOk:async()=>{
                            await this.$store.dispatch({
                                type:'location/create',
                                data:this.location
                            });
                            (this.$refs.warehouseAreaForm as any).resetFields();
                            this.$emit('save-success');
                            this.$emit('input',false);
                        }
                    });
                }
            })
        }
        cancel(){
            (this.$refs.warehouseAreaForm as any).resetFields();
            this.$emit('input',false);
        }
        visibleChange(value:boolean){
            if(!value){
                this.$emit('input',value);
            }
        }
        checkForm={//验证
            areaName:[{required: true,message:'请输入区域名称',trigger: 'blur'}]
        }
    }
</script>