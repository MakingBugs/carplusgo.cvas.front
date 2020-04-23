<template>
    <div>
        <Modal
         title='车辆随车证件维护'
         :value="value"
         @on-ok="save"
         @on-visible-change="visibleChange"
        >
            <Form ref="vehicleCertificateForm" :rules="checkForm" :model="carCertificate" :label-width="80">
                <FormItem label="证件名称" prop="carCertificateName">
                    <Input v-model="carCertificate.carCertificateName"/>
                </FormItem>
                <FormItem label="数量" prop="qty">
                    <Input v-model="carCertificate.qty"/>
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
    import CarCertificate from '@/store/entities/vehicleScheduling/carCertificate'
    import CarCertificateRight from '@/store/entities/vehicleScheduling/carCertificateRight'
    import ItemCode from '@/store/entities/public/itemCode';

    class PageItemCodeRequest extends PageRequest{
        itemTypes:Array<number>
    }

    class PageCarCertificateRightRequest extends PageRequest{
        carCertificateID:Number
    }

    @Component
    export default class EditVehicleCertificate extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        carCertificate:CarCertificate=new CarCertificate();
        pageItemCodeRequest:PageItemCodeRequest=new PageItemCodeRequest();
        pageCarCertificateRightRequest:PageCarCertificateRightRequest=new PageCarCertificateRightRequest();
        save(){
            (this.$refs.vehicleCertificateForm as any).validate(async (valid:boolean)=>{
                if(valid){
                    this.carCertificate.carCertificateRightList = this.$store.state.carCertificateRight.fromItemCodeList.map(x=>{
                        return {
                            id:x.id,
                            carCertificateID:x.carCertificateID,
                            oilID:x.oilID,
                            selected:x.selected,
                            oilType:x.oilType,
                        }
                    });
                    this.$Modal.confirm({
                        title:this.L('Tips'),
                        content:this.L('是否确认存储？<br/>证件名称：【'+this.carCertificate.carCertificateName+'】<br/>数量：【'+this.carCertificate.qty+'】'),
                        okText:this.L('Yes'),
                        cancelText:this.L('No'),
                        onOk:async()=>{
                            await this.$store.dispatch({
                                type:'carCertificate/update',
                                data:this.carCertificate
                            });
                            (this.$refs.vehicleCertificateForm as any).resetFields();
                            this.$emit('save-success');
                            this.$emit('input',false);
                        }
                    });
                }
            })
        }
        cancel(){
            (this.$refs.vehicleCertificateForm as any).resetFields();
            this.$emit('input',false);
        }
        visibleChange(value:boolean){
            if(!value){
                this.$emit('input',value);
            }else{
                this.carCertificate=Util.extend(true,{},this.$store.state.carCertificate.editCarCertificate);
                this.getList();
            }
        }
        async getList(){
            this.pageItemCodeRequest.maxResultCount=10000;
            this.pageItemCodeRequest.skipCount=0;
            this.pageItemCodeRequest.itemTypes = [231];
            
            await this.$store.dispatch({
                type:'carCertificateRight/getAllFromItemCode',
                data:this.pageItemCodeRequest
            });

            this.pageCarCertificateRightRequest.maxResultCount=10000;
            this.pageCarCertificateRightRequest.skipCount=0;
            this.pageCarCertificateRightRequest.carCertificateID = this.carCertificate.id;
            
            await this.$store.dispatch({
                type:'carCertificateRight/getAll',
                data:this.pageCarCertificateRightRequest
            });

            this.$store.commit('carCertificateRight/editFromItemCodeList',this.carCertificate.id);
        }
        get loading(){
            return this.$store.state.carCertificateRight.loading;
        }
        get list(){
            return this.$store.state.carCertificateRight.fromItemCodeList;
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
                                this.$store.commit('carCertificateRight/setfromItemCodeList',{
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
            carCertificateName:[{required: true,message:'请输入证件名称'}],
            qty:[{required: true,validator:this.validateNumber}]
        }
    }
</script>