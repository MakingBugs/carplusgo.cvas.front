<template>
    <div>
        <Modal
         :title="'外观部位维护'"
         :value="value"
         @on-ok="save"
         @on-visible-change="visibleChange"
        >
            <Col span="12">
                <Form ref="repositoryOutCarPartForm"  label-position="top" :rules="repositoryOutCarPartRule" :model="repositoryOutCarPart">
                    <FormItem :label="'外观部位'" prop="carPartID">
                        <Select v-model="repositoryOutCarPart.carPartID" disabled>
                            <Option v-for="item in carPartList" :value="item.id" :key="item.id">{{ item.carPartName }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem :label="'状态'" prop="status">
                        <Select v-model="repositoryOutCarPart.status" clearable>
                            <Option v-for="item in carPartStatusList" :value="item.num" :key="item.num">{{ item.itemName }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem :label="'备注'" prop="memo">
                        <Input v-model="repositoryOutCarPart.memo" type="textarea" :rows="4" :maxlength="1024"/>
                    </FormItem>
                </Form>
            </Col>
            <Col span="12">
                <img src="../../../../images/vehicleparts.png">
            </Col>
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
    import CarBase from '@/store/entities/car/carbase'
    import RepositoryOutCarPart from '@/store/entities/vehicleScheduling/repositoryOutCarPart'
    import ItemCode from '@/store/entities/public/itemCode';

    class PageItemCodeRequest extends PageRequest{
        maxResultCount=10000
        skipCount=0
        itemTypes:Array<number>
    }

    class PageCarPartRightRequest extends PageRequest{
        maxResultCount=10000
        skipCount=0
        oilID:Number;
    }

    @Component
    export default class EditRepositoryOutCarPart extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        @Prop({type:Array,default:[]}) data:Array<RepositoryOutCarPart>;
        repositoryOutCarPart:RepositoryOutCarPart=new RepositoryOutCarPart();
        pageItemCodeRequest:PageItemCodeRequest=new PageItemCodeRequest();
        pageCarPartRightRequest:PageCarPartRightRequest=new PageCarPartRightRequest();
        carBase:CarBase=new CarBase();
        carPartStatusList:ItemCode[]=[];
        save(){
            (this.$refs.repositoryOutCarPartForm as any).validate(async (valid:boolean)=>{
                if(valid){
                    var temp = this.carPartList.find(x=>x.id === this.repositoryOutCarPart.carPartID);
                    var tempCarPartStatus = this.carPartStatusList.find(x=>x.num === this.repositoryOutCarPart.status);
                    this.$Modal.confirm({
                        title:this.L('Tips'),
                        content:this.L('是否确认存储？<br/>外观部位：【'+((!!temp)? temp.carPartName:'')+'】<br/>状态：【'+((!!tempCarPartStatus)? tempCarPartStatus.itemName:'')+'】<br/>备注：【'+this.repositoryOutCarPart.memo+'】'),
                        okText:this.L('Yes'),
                        cancelText:this.L('No'),
                        onOk:async()=>{
                            this.data = this.data.map(x=>{
                                if(x.carPartID === this.repositoryOutCarPart.carPartID){
                                    x.status= this.repositoryOutCarPart.status
                                    x.memo = this.repositoryOutCarPart.memo
                                }
                                return x;
                            });
                            (this.$refs.repositoryOutCarPartForm as any).resetFields();
                            this.$emit('input',false);
                        }
                    });
                }
            })
        }
        cancel(){
            (this.$refs.repositoryOutCarPartForm as any).resetFields();
            this.$emit('input',false);
        }
        visibleChange(value:boolean){
            if(!value){
                this.$emit('input',value);
            }else{
                this.carBase=Util.extend(true,{},this.$store.state.carbase.editCarBase);
                this.repositoryOutCarPart=Util.extend(true,{},this.$store.state.repositoryOutCarPart.editRepositoryOutCarPart);
                this.getList();
            }
        }
        async getList(){
            this.pageCarPartRightRequest.oilID = this.carBase.oil
            await this.$store.dispatch({
                type:'carPart/getAll',
                data:this.pageCarPartRightRequest
            })

            this.pageItemCodeRequest.itemTypes = [1602];

            let page = await this.$store.dispatch({
                type:'itemCode/GetItemCodeByItemTypes',
                data:this.pageItemCodeRequest
            })

            this.carPartStatusList = (page.items as Array<any>).filter(x=>x.itemType === 1602)
        }
        get carPartList(){
            var list = [];
            (this.$store.state.carPartRight.list as Array<any>).map(x=>{
                if(list.every(y=>y.id !== x.carPartID)){
                    list.push(x.carPart);
                }
            })
            return list
        }
        repositoryOutCarPartRule={
            status:[{required:true,message:'请选择状态'}],
            memo:[{required:this.repositoryOutCarPart.status === 4,message:'请输入备注'}]
        }
    }
</script>

