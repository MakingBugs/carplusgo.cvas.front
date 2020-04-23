<template>
  <div>
    <Row class="expand-row">
        <Col span="6">
            <span class="expand-key">保险公司: </span>
            <span class="expand-value">{{ row.insurancesuppliername }}</span>
        </Col>
        <Col span="6">
            <span class="expand-key">保险年度: </span>
            <span class="expand-value">{{ row.insureyearname }}</span>
        </Col>
        <Col span="6">
            <span class="expand-key">投保类型: </span>
            <span class="expand-value">{{ row.customercarename }}</span>
        </Col>
    </Row>
    <Row class="expand-row">
        <Col span="6">
            <span class="expand-key">车险性质别: </span>
            <span class="expand-value">{{ row.insuretypename }}</span>
        </Col>
        <Col span="6">
            <span class="expand-key">车险座位别: </span>
            <span class="expand-value">{{ row.insurepercntname }}</span>
        </Col>
        <Col span="6">
            <span class="expand-key">座位数: </span>
            <span class="expand-value">{{ row.seating }}</span>
        </Col>
        <Col span="6">
            <span class="expand-key">汽车产地: </span>
            <span class="expand-value">{{ row.carplacename }}</span>
        </Col>
    </Row>
    <Table :disabled-hover="true" border width="100%" :columns="header" :data="row.insurancecontent"></Table>
  </div>
</template>

<script lang="ts">
import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
import AbpBase from '@/lib/abpbase'

@Component({})
export default class Order extends AbpBase{
  @Prop({type:Object,default:null}) row:object;
  header=[
        {
            align: 'center',
            title: '险种',
            key:'insureName'
        },
        {
            align: 'center',
            title: '保额',
            key:'insureLimit'
        },
        {
            align: 'center',
            title: '标准保费',
            key:'orgAmt'
        },
        {
            align: 'center',
            title: '计价保费',
            key:'rateAmt'
        },
        {
            align: 'center',
            title: '备注',
            key:''
        },
    ]
}
</script>

<style lang="less" scoped>
.expand-row{
    margin-bottom: 16px;
    margin-left: 100px;
}
</style>