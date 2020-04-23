<template>
    <div>
        <Modal
         :title="L('车辆明细')"
         :value="value" 
         :width="1200"
         :information="information"
         @on-ok="save"
         @on-visible-change="visibleChange"
         fullscreen
        >
            <Form ref="carFixForm" :rules="checkform" :model="Form1" :label-width="100">
                <Divider>车辆信息</Divider>
                <Row>
                    <Col span="6">
                        <FormItem :label="L('车牌号码')" style="width:100%" prop="makNo">
                            <Input v-model="Form1.makNo" :maxlength="50" @on-blur="MakNoCarInfo" readonly/>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label="L('厂牌')" style="width:100%" prop="brandName">
                            <p>{{Form1.brandName}}</p>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label="L('车型')" style="width:100%" prop="clasenName">
                            <p>{{Form1.clasenName}}</p>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem :label="L('契约编号')" style="width:100%" prop="orderNo">
                            <p>{{Form1.orderNo}}</p>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button @click="cancel">{{L('Cancel')}}</Button>
            </div>
        </Modal>
    </div>
</template>

<script lang="ts">
import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
import Util from '../../../lib/util'
import AbpBase from '../../../lib/abpbase'
import PageRequest from '@/store/entities/page-request'
@Component
    export default class CarFixDetailQuery extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        @Prop({type:Object,default:null}) information:any;//传值

        cancel(){
            (this.$refs.carBaseForm as any).resetFields();
            this.$emit('input',false);
        }

        async visibleChange(value:boolean){
            if(!value){
                this.$emit('input',value);
            }else{
                this.Form1=Util.extend(true,{},this.information);
            }
        }
        Form1={

        }

    }
</script>