<template>
    <div>
        <Modal
         title='新增区域管理员'
         :value="value"
         @on-ok="save"
         @on-visible-change="visibleChange"
        >
            <Form ref="repositoryManagerForm" :rules="checkForm" :model="repositoryManager" :label-width="80">
                <FormItem label="区域名称">
                    <H3>{{!!repository.location?repository.location.areaName:''}}</H3>
                </FormItem>
                <FormItem label="仓库类型">
                  <h3>{{GetRepositoryTypeName(repository.repositoryType)}}</h3>
                </FormItem>
                <FormItem label="仓库名称">
                  <h3>{{repository.repositoryName}}</h3>
                </FormItem>
                <FormItem label="管理员单位" prop="depCode">
                    <Select v-model="depCode" filterable clearable @on-change="getList">
                        <Option v-for="item in unitList" :value="item.unitId" :key="item.unitId">{{ item.unitName }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="管理员" prop="managerID">
                    <Select v-model="repositoryManager.managerID" filterable clearable>
                        <Option v-for="item in userList" :value="item.userAuto" :key="item.userAuto">{{ item.fName }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="库长" prop="managerCheck">
                    <i-switch v-model="managerCheck">
                    </i-switch>
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
    import Repository from '@/store/entities/vehicleScheduling/repository'
    import RepositoryManager from '@/store/entities/vehicleScheduling/repositoryManager'
    import VEmp from '@/store/entities/public/vEmp'

    class PageVEmpRequest extends PageRequest{
        depCode:string
    }

    class PageUnitRequest extends PageRequest{
    }
    @Component
    export default class CreateAdmin extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        repositoryManager:RepositoryManager=new RepositoryManager();
        vEmpPagerequest:PageVEmpRequest=new PageVEmpRequest();
        unitPagerequest:PageUnitRequest=new PageUnitRequest();
        repository:Repository=new Repository();
        depCode:string=null;
        managerCheck:Boolean=false;
        save(){
            (this.$refs.repositoryManagerForm as any).validate(async (valid:boolean)=>{
                if(valid){
                    this.repositoryManager.isStop=1;
                    this.repositoryManager.repositoryID=this.repository.id;
                    this.repositoryManager.isManager=this.managerCheck?1:0
                    var user = (this.userList as Array<VEmp>).find(x=>x.userAuto.toString()===this.repositoryManager.managerID.toString())
                    this.$Modal.confirm({
                        title:this.L('Tips'),
                        content:this.L('是否确认存储？<br/>区域名称：【'
                          +this.repository.location.areaName
                          +'】<br/>仓库类型：【'
                          +this.GetRepositoryTypeName(this.repository.repositoryType)
                          +'】<br/>仓库名称：【'
                          +this.repository.repositoryName
                          +'】<br/>管理员单位：【'
                          +user.depName
                          +'】<br/>管理员：【'
                          +user.fName
                          +'】<br/>库长：【'
                          +(this.managerCheck?'是':'否')+'】'),
                        okText:this.L('Yes'),
                        cancelText:this.L('No'),
                        onOk:async()=>{
                            await this.$store.dispatch({
                                type:'repositoryManager/create',
                                data:this.repositoryManager
                            });
                            (this.$refs.repositoryManagerForm as any).resetFields();
                            this.$emit('save-success');
                            this.$emit('input',false);
                            this.depCode=null;
                            this.managerCheck=false;
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
            (this.$refs.repositoryManagerForm as any).resetFields();
            this.$emit('input',false);
            this.depCode=null;
            this.managerCheck=false;
        }
        visibleChange(value:boolean){
            if(!value){
                this.$emit('input',value);
            }else{
                this.repository=Util.extend(true,{},this.$store.state.repository.editRepository);
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
            this.repositoryManager.managerID=null;
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