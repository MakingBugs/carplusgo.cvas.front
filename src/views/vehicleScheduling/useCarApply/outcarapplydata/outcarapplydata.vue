<template>
  <div>
    <Divider orientation="left">出车申请资料</Divider>
    <Form v-if="show" :label-width="90" ref="Form" :model="Form" inline>
      <Row type="flex" justify="start">
        <Col span="6">
          <FormItem label="出车事由" style="width:100%">
            <div class="readonly">{{Form.userReasonData.itemName}}</div>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="出车区域" style="width:100%">
            <div class="readonly">{{Form.location.areaName}}</div>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="出车仓库" style="width:100%">
            <div class="readonly">{{Form.repository.repositoryName}}</div>
          </FormItem>
        </Col>
      </Row>
      <Row type="flex" justify="start">
        <Col span="6">
          <FormItem label="预定用车时间" style="width:100%">
            <div class="readonly">{{new Date(Form.preUseDT)|FormatDate("yyyy-MM-dd hh:mm")}}</div>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="预定还车时间" style="width:100%">
            <div class="readonly">{{new Date(Form.preReutrnDT)|FormatDate("yyyy-MM-dd hh:mm")}}</div>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="车型" style="width:100%">
            <div class="readonly">{{(Form.clasen.brand.factoryBrand.factoryBrandName+" "+Form.clasen.brand.brandName+" "+Form.clasen.clasenName)}}</div>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="排气量" style="width:100%">
            <div class="readonly">{{Form.cc}}</div>
          </FormItem>
        </Col>
      </Row>
      <!--公务车；主管用车；-->
      <Row v-if="Form.useReason==1|Form.useReason==2" type="flex" justify="start">
        <Col span="6">
          <FormItem label="用车单位" style="width:100%">
            <div class="readonly">{{Form.userData.depName}}</div>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="用车人" style="width:100%">
            <div class="readonly">{{Form.userData.fName}}</div>
          </FormItem>
        </Col>
      </Row>
      <!--网约车-->
      <Row v-if="Form.useReason==3" type="flex" justify="start">
        <Col span="6">
          <FormItem label="用车人" style="width:100%">
            <div class="readonly">{{Form.user}}</div>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="用车人电话" style="width:100%">
            <div class="readonly">{{Form.tel}}</div>
          </FormItem>
        </Col>
      </Row>
      <!--公开车；替代车；长租；短租-->
      <Row v-if="Form.useReason==4|Form.useReason==5|Form.useReason==6|Form.useReason==7" type="flex" justify="start">
        <Col span="12">
          <FormItem label="客户名称" style="width:100%">
            <div class="readonly">{{Form.customerName}}</div>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="用车人" style="width:100%">
            <div class="readonly">{{Form.user}}</div>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="用车人电话" style="width:100%">
            <div class="readonly">{{Form.tel}}</div>
          </FormItem>
        </Col>
      </Row>
      <Row type="flex" justify="start">
        <Col span="12">
          <FormItem label="申请备注" style="width:100%">
            <div class="readonly">{{Form.useMemo}}</div>
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
  import PublicClass from '@/lib/publicclass'
  
  @Component({
    components:{}
  })
  export default class extends AbpBase{
    show:boolean=false//是否渲染
    Form={}

    /**填充数据 */
    SetData(data){
      this.Form=data
      this.show=true
    }
  }
</script>

<style lang="less">
.readonly{
  height: 32px;
  background-color: #EEEEEE!important;
  text-align: center;
}
</style>