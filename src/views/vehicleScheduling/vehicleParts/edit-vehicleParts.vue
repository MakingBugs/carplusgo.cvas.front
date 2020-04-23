<template>
    <div>
        <Modal
         title='车辆随车部位维护'
         :value="value"
         @on-ok="save"
         @on-visible-change="visibleChange"
        >
            <Form ref="vehiclePartsForm" :rules="checkForm" :model="carPart" :label-width="80">
                <FormItem label="部位名称" prop="carPartName">
                    <Input v-model="carPart.carPartName"/>
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
    import CarPart from '@/store/entities/vehicleScheduling/carPart'
    import CarPartRight from '@/store/entities/vehicleScheduling/carPartRight'
    import ItemCode from '@/store/entities/public/itemCode';

    class PageItemCodeRequest extends PageRequest{
        itemTypes:Array<number>
    }

    class PageCarPartRightRequest extends PageRequest{
        carPartID:Number
    }

    @Component
    export default class EditVehicleParts extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        carPart:CarPart=new CarPart();
        pageItemCodeRequest:PageItemCodeRequest=new PageItemCodeRequest();
        pageCarPartRightRequest:PageCarPartRightRequest=new PageCarPartRightRequest();
        save(){
            (this.$refs.vehiclePartsForm as any).validate(async (valid:boolean)=>{
                if(valid){
                    this.carPart.carPartRightList = this.$store.state.carPartRight.fromItemCodeList.map(x=>{
                        return {
                            id:x.id,
                            carPartID:x.carPartID,
                            oilID:x.oilID,
                            selected:x.selected,
                            oilType:x.oilType,
                        }
                    });
                    this.$Modal.confirm({
                        title:this.L('Tips'),
                        content:this.L('是否确认存储？<br/>部位名称：【'+this.carPart.carPartName+'】'),
                        okText:this.L('Yes'),
                        cancelText:this.L('No'),
                        onOk:async()=>{
                            await this.$store.dispatch({
                                type:'carPart/update',
                                data:this.carPart
                            });
                            (this.$refs.vehiclePartsForm as any).resetFields();
                            this.$emit('save-success');
                            this.$emit('input',false);
                        }
                    });
                }
            })
        }
        cancel(){
            (this.$refs.vehiclePartsForm as any).resetFields();
            this.$emit('input',false);
        }
        visibleChange(value:boolean){
            if(!value){
                this.$emit('input',value);
            }else{
                this.carPart=Util.extend(true,{},this.$store.state.carPart.editCarPart);
                this.getList();
            }
        }
        async getList(){
            this.pageItemCodeRequest.maxResultCount=10000;
            this.pageItemCodeRequest.skipCount=0;
            this.pageItemCodeRequest.itemTypes = [231];
            
            await this.$store.dispatch({
                type:'carPartRight/getAllFromItemCode',
                data:this.pageItemCodeRequest
            });

            this.pageCarPartRightRequest.maxResultCount=10000;
            this.pageCarPartRightRequest.skipCount=0;
            this.pageCarPartRightRequest.carPartID = this.carPart.id;
            
            await this.$store.dispatch({
                type:'carPartRight/getAll',
                data:this.pageCarPartRightRequest
            });

            this.$store.commit('carPartRight/editFromItemCodeList',this.carPart.id);
        }
        get loading(){
            return this.$store.state.carPartRight.loading;
        }
        get list(){
            return this.$store.state.carPartRight.fromItemCodeList;
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
                                this.$store.commit('carPartRight/setfromItemCodeList',{
                                    oilID:params.row.oilID,
                                    value:value
                                });
                            }
                        }
                    })
                ])
            }
          }]
        checkForm={//验证
            carPartName:[{required: true,message:'请输入部位名称'}]
        }
    }
</script>