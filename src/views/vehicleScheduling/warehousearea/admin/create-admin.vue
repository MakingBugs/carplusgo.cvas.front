<template>
    <div>
        <Modal
         title='新增区域管理员'
         :value="value"
         @on-ok="save"
         @on-visible-change="visibleChange"
        >
            <Form ref="locationManagerForm" :rules="checkForm" :model="locationManager" :label-width="80">
                <FormItem label="区域名称" prop="areaName">
                    <H3>{{location.areaName}}</H3>
                </FormItem>
                <FormItem label="仓库类型" prop="repositoryType">
                    <Select v-model="locationManager.repositoryType" clearable>
                        <Option :value=1>调度</Option>
                        <Option :value=2>网约车</Option>
                        <Option :value=3>专车</Option>
                        <Option :value=4>处分</Option>
                    </Select>
                </FormItem>
                <FormItem label="管理员单位" prop="depCode">
                    <Select v-model="depCode" filterable clearable @on-change="getList">
                        <Option v-for="item in unitList" :value="item.unitId" :key="item.unitId">{{ item.unitName }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="管理员" prop="empID">
                    <Select v-model="locationManager.empID" filterable clearable>
                        <Option v-for="item in userList" :value="item.userAuto" :key="item.userAuto">{{ item.fName }}</Option>
                    </Select>
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
    import LocationManager from '@/store/entities/vehicleScheduling/locationManager'
    import VEmp from '@/store/entities/public/vEmp'

    class PageVEmpRequest extends PageRequest{
        depCode:string
    }

    class PageUnitRequest extends PageRequest{
    }
    @Component
    export default class CreateAdmin extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        locationManager:LocationManager=new LocationManager();
        vEmpPagerequest:PageVEmpRequest=new PageVEmpRequest();
        unitPagerequest:PageUnitRequest=new PageUnitRequest();
        location:Location=new Location();
        depCode:string=null;
        save(){
            (this.$refs.locationManagerForm as any).validate(async (valid:boolean)=>{
                if(valid){
                    this.locationManager.isStop=1;
                    this.locationManager.areaID=this.location.id;
                    var user = (this.userList as Array<VEmp>).find(x=>x.userAuto.toString()===this.locationManager.empID.toString())
                    this.$Modal.confirm({
                        title:this.L('Tips'),
                        content:this.L('是否确认存储？<br/>仓库类型：【'+this.GetRepositoryTypeName(this.locationManager.repositoryType)+'】<br/>管理员单位：【'+user.depName+'】<br/>管理员：【'+user.fName+'】'),
                        okText:this.L('Yes'),
                        cancelText:this.L('No'),
                        onOk:async()=>{
                            await this.$store.dispatch({
                                type:'locationManager/create',
                                data:this.locationManager
                            });
                            (this.$refs.locationManagerForm as any).resetFields();
                            this.$emit('save-success');
                            this.$emit('input',false);
                        }
                    });
                }
            })
        }
        get userList(){
            return this.$store.state.vEmp.list;
        }
        get unitList(){
            return this.$store.state.unit.list;
        }
        cancel(){
            (this.$refs.locationManagerForm as any).resetFields();
            this.$emit('input',false);
        }
        visibleChange(value:boolean){
            if(!value){
                this.$emit('input',value);
            }else{
                this.location=Util.extend(true,{},this.$store.state.location.editLocation);
                this.getList();
            }
        }
        GetRepositoryTypeName(value:Number){
            switch (value) {
                case 1:
                    return '调度'
                case 2:
                    return '网约车'
                case 3:
                    return '专车'
                case 4:
                    return '处分'
            }
        }
        async getList(){
            this.locationManager.empID=null;
            this.vEmpPagerequest.skipCount=0;
            this.vEmpPagerequest.maxResultCount=10000;
            this.vEmpPagerequest.depCode=this.depCode;
            await this.$store.dispatch({
                type:'vEmp/getAll',
                data:this.vEmpPagerequest
            })

            this.unitPagerequest.skipCount=0;
            this.unitPagerequest.maxResultCount=10000;
            await this.$store.dispatch({
                type:'unit/getAll',
                data:this.unitPagerequest
            })
        }
        checkForm={
        }
    }
</script>