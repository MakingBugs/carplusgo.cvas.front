<template>
    <div>
        <Modal
         title='新增车辆随车配件'
         :value="value"
         @on-ok="save"
         @on-visible-change="visibleChange"
        >
            <Form ref="vehicleAccessoriesForm" :rules="checkForm" :model="carAccessory" :label-width="80">
                <FormItem label="配件名称" prop="carAccessoryName">
                    <Input v-model="carAccessory.carAccessoryName"/>
                </FormItem>
                <FormItem label="数量" prop="qty">
                    <Input v-model="carAccessory.qty"/>
                </FormItem>
                <Table :loading="loading" :columns="columns" border :data="list"></Table>
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
    import CarAccessory from '@/store/entities/vehicleScheduling/carAccessory'
    import CarAccessoryRight from '@/store/entities/vehicleScheduling/carAccessoryRight'
    import ItemCode from '@/store/entities/public/itemCode';

    class PageItemCodeRequest extends PageRequest{
        itemTypes:Array<number>
    }

    @Component
    export default class CreateVehicleAccessories extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        carAccessory:CarAccessory=new CarAccessory();
        pageItemCodeRequest:PageItemCodeRequest=new PageItemCodeRequest();
        save(){
            (this.$refs.vehicleAccessoriesForm as any).validate(async (valid:boolean)=>{
                if(valid){
                    this.carAccessory.isStop=1;
                    this.carAccessory.carAccessoryRightList = this.$store.state.carAccessoryRight.fromItemCodeList.map(x=>{
                        return {
                            oilID:x.oilID,
                            selected:x.selected,
                            oilType:x.oilType,
                        }
                    });
                    this.$Modal.confirm({
                        title:this.L('Tips'),
                        content:this.L('是否确认存储？<br/>配件名称：【'+this.carAccessory.carAccessoryName+'】<br/>数量：【'+this.carAccessory.qty+'】'),
                        okText:this.L('Yes'),
                        cancelText:this.L('No'),
                        onOk:async()=>{
                            await this.$store.dispatch({
                                type:'carAccessory/create',
                                data:this.carAccessory
                            });
                            (this.$refs.vehicleAccessoriesForm as any).resetFields();
                            this.$emit('save-success');
                            this.$emit('input',false);
                        }
                    });
                }
            })
        }
        cancel(){
            (this.$refs.vehicleAccessoriesForm as any).resetFields();
            this.$emit('input',false);
        }
        visibleChange(value:boolean){
            if(!value){
                this.$emit('input',value);
            }else{
                this.getList();
            }
        }
        async getList(){
            this.pageItemCodeRequest.maxResultCount=10000;
            this.pageItemCodeRequest.skipCount=0;
            this.pageItemCodeRequest.itemTypes = [231];
            
            await this.$store.dispatch({
                type:'carAccessoryRight/getAllFromItemCode',
                data:this.pageItemCodeRequest
            });
        }
        get loading(){
            return this.$store.state.carAccessoryRight.loading;
        }
        get list(){
            return this.$store.state.carAccessoryRight.fromItemCodeList;
        }
        columns=[{
                title:'燃油类型',
                align: 'center',
                tooltip:true,
                render: (h:any, params:any) => {
                    return h('span',params.row.itemCode?params.row.itemCode.itemName:'')
                }
          },{
              title:'停/启用',
              width:150,
              align: 'center',
              tooltip:true,
              render: (h:any, params:any) => {
                return h('div',[
                    h('i-switch',{
                        props: {//这里可以设置它的属性
                            value: params.row.selected === 1,     //设置它的值比如：true或false
                            //disabled: !params.row.online     // 设置是否可以操作，变灰
                        },
                        on: { //操作事件
                            'on-change':async (value)=>{ //值发生了改变调用方法
                                this.$store.commit('carAccessoryRight/setfromItemCodeList',{
                                    oilID:params.row.oilID,
                                    value:value
                                });
                            }
                        }
                    })
                ])
            }
          }]
        validateNumber(rule:any, value:any, callback:Function){
            value = String(value).trim();
            if (!value) {
                callback(new Error('值不能为空'));
            }
            if (!isFinite(value)) {
                callback(new Error('请输入数值'));
            }
            callback();
        }
        checkForm={//验证
            carAccessoryName:[{required: true,message:'请输入配件名称'}],
            qty:[{required: true,validator:this.validateNumber}]
        }
    }
</script>