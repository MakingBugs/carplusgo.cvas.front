<template>
  <div>
    <Divider orientation="left">出车资料</Divider>
    <Form :disabled="this.ButtonType!=3? true:false"  :label-width="90" ref="Form" :model="Form" inline>
      <Row type="flex" justify="start">
        <Col span="6">
          <FormItem label="实际出车时间" style="width:100%" prop="">
            <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" :editable="false" placeholder="请选择日期时间..." style="width:100%"></DatePicker>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="出车里程" style="width:100%">
            <InputNumber :min="1" style="width:90%"></InputNumber> KM
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="领车人" style="width:100%">
            <Input placeholder="请输入..." style="width: 100%" />
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="出车单位" style="width:100%">
            <Select>
              <Option value="1"></Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row type="flex" justify="start">
        <Col span="18">
          <FormItem label="出车备注" style="width:100%">
            <Input placeholder="请输入..." style="width: 100%" />
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="出车人员" style="width:100%">
            <Select>
              <Option value="1"></Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </div>
</template>

<script lang="ts">
  import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
  import Util from '@/lib/util'
  import AbpBase from '@/lib/abpbase'
  import PageRequest from '@/store/entities/page-request'
  import publicclass from '@/lib/publicclass'
  
  @Component({
      components:{}
  })
  export default class extends AbpBase{
    @Prop({type:Number,default:1}) ButtonType!:number;

    FormDisabled:boolean=false;//是否禁用整个表单
    Form={

    }
  }
</script>

<style lang="less">
.readonly{
  background-color: #EEEEEE!important;
  text-align: center;
}
</style>