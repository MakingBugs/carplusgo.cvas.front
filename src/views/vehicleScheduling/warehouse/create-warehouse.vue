<template>
  <div>
    <Modal
    title='新增区域'
    :value="value"
    @on-visible-change="visibleChange">
      <Form ref="Form" :rules="checkForm" :model="repository" :label-width="80">
        <FormItem label="区域" style="width:100%" prop="areaID">
          <Select v-model="repository.areaID" clearable>
            <Option v-for="item in areaList" :value="item.id" :key="item.id">{{ item.areaName }}</Option>
          </Select>
        </FormItem>
        <FormItem label="仓库类型" style="width:100%" prop="repositoryType">
          <Select v-model="repository.repositoryType" clearable>
              <Option :value=1>调度</Option>
              <Option :value=2>网约车</Option>
              <Option :value=3>专车</Option>
              <Option :value=4>处分</Option>
          </Select>
        </FormItem>
        <FormItem label="仓库名称" style="width:100%" prop="repositoryName">
          <Input v-model="repository.repositoryName" placeholder="请输入仓库名称"/>
        </FormItem>
      </Form>
      <div slot="footer">
          <Button @click="cancel">取消</Button>
          <Button @click="save" type="primary">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '@/lib/util'
    import AbpBase from '@/lib/abpbase'
    import PageRequest from '@/store/entities/page-request'
    import publicclass from '../../../lib/publicclass'
    import Repository from '@/store/entities/vehicleScheduling/repository'

    class PageLocationRequest extends PageRequest{
    }

    @Component
    export default class CreateWarehouse extends AbpBase{
      @Prop({type:Boolean,default:false}) value!:boolean;
      repository:Repository=new Repository();
      pageLocationRequest:PageLocationRequest=new PageLocationRequest();
      save(){
        (this.$refs.Form as any).validate(async (valid:boolean)=>{
          if(valid){
              this.repository.isStop=1;
              var locationNow = (this.areaList as Array<any>).find(x=>x.id === this.repository.areaID);
              this.$Modal.confirm({
                  title:'是否确认存储？',
                  content:'区域：['+locationNow.areaName+']<br/>仓库类型：['+this.GetRepositoryTypeName(this.repository.repositoryType)+']<br/>仓库名称：['+this.repository.repositoryName+']',
                  okText:'确定',
                  cancelText:'取消',
                  onOk:async()=>{
                      await this.$store.dispatch({
                          type:'repository/create',
                          data:this.repository
                      });
                      (this.$refs.Form as any).resetFields();
                      this.$emit('save-success');
                      this.$emit('input',false);
                  }
              });
          }
        })
      }
      cancel(){
          (this.$refs.Form as any).resetFields();
          this.$emit('input',false);
      }
      visibleChange(value:boolean){
          if(!value){
              this.$emit('input',value);
          }else{
              this.getList()
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
        this.pageLocationRequest.maxResultCount=10000;
        this.pageLocationRequest.skipCount=0;
        await this.$store.dispatch({
            type:'location/getAll',
            data:this.pageLocationRequest
        })
      }
      get areaList(){
        return this.$store.state.location.list;
      }
      checkForm={//验证
        areaID:[{required: true,message:'请选择区域'}],
        repositoryType:[{required: true,message:'请选择仓库类型'}],
        repositoryName:[{required: true,message:'请输入仓库名称',trigger: 'blur'}]
      }
    }
</script>