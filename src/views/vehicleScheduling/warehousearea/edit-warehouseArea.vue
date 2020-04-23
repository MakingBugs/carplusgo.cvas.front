<template>
    <div>
        <Modal
         title='维护区域'
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
    import publicclass from '../../../lib/publicclass'

    @Component
    export default class EditWarehouseArea extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        location:Location=new Location();
        save(){
            (this.$refs.warehouseAreaForm as any).validate(async (valid:boolean)=>{
                if(valid){
                    this.$Modal.confirm({
                        title:this.L('Tips'),
                        content:"是否确认修改？区域名称：【"+this.location.areaName+"】",
                        okText:this.L('Yes'),
                        cancelText:this.L('No'),
                        onOk:async()=>{
                            await this.$store.dispatch({
                                type:'location/update',
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
            }else{
                this.location=Util.extend(true,{},this.$store.state.location.editLocation);
            }
        }
        checkForm={//验证
            areaName:[publicclass.Check.required.text]
        }
    }
</script>