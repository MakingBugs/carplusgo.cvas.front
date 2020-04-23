<template>
    <div>
        <Card dis-hover>
            <div class="page-body">
                <Form ref="queryForm" :label-width="80" label-position="right" inline>
                    <Row :gutter="16">
                        <Col span="6">
                            <FormItem label="证件名称" style="width:100%">
                                <Input v-model="pagerequest.carCertificateName" placeholder="请输入证件名称"/>
                            </FormItem>
                        </Col> 
                        <col span="6">
                            <Button icon="ios-search" type="primary" size="large" @click="getpage" class="toolbar-btn">查找</Button>&nbsp;&nbsp;
                            <Button @click="create" icon="android-add" type="primary" size="large">新增</Button>
                        </col>
                    </Row>
                    <Row>
                        <col span="12">
                            <h3>资料笔数：{{totalCount}}笔</h3>
                        </col>
                    </Row>
                </Form>
                <div class="margin-top-10">
                    <Table :loading="loading" :columns="columns" border :data="list">
                    </Table>
                    <Page  show-sizer class-name="fengpage" :total="totalCount" class="margin-top-10" @on-change="pageChange" @on-page-size-change="pagesizeChange" :page-size="pageSize" :current="currentPage"></Page>
                </div>
            </div>
        </Card>
        <create-vehicleCertificate v-model="createModalShow" @save-success="getpage"></create-vehicleCertificate>
        <edit-vehicleCertificate v-model="editModalShow" @save-success="getpage"></edit-vehicleCertificate>
    </div>
</template>

<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '@/lib/util'
    import AbpBase from '@/lib/abpbase'
    import PageRequest from '@/store/entities/page-request'
    import publicclass from '@/lib/publicclass'
    import CarCertificate from '@/store/entities/vehicleScheduling/carCertificate'
    import CreateVehicleCertificate from './create-vehicleCertificate.vue'
    import EditVehicleCertificate from './edit-vehicleCertificate.vue'
    
    class PageVehicleCertificateRequest extends PageRequest{
        carCertificateName:string='';
    }

    @Component({
        components:{CreateVehicleCertificate,EditVehicleCertificate}
    })
    export default class VehicleCertificate extends AbpBase{//仓库区域维护
        pagerequest:PageVehicleCertificateRequest=new PageVehicleCertificateRequest();
        carCertificate:CarCertificate=new CarCertificate();
        editModalShow:boolean=false;
        createModalShow:boolean=false;
        adminModalShow:boolean=false;
        columns=[{
                title:'证件名称',
                align: 'center',
                tooltip:true,
                key:'carCertificateName'
          },{
                title:'数量',
                align: 'center',
                tooltip:true,
                key:'qty'
          },{
              title:'停/启用',
              width:150,
              align: 'center',
              tooltip:true,
              render: (h:any, params:any) => {
                return h('div',[
                    h('i-switch',{
                        props: {//这里可以设置它的属性
                            value: params.row.isStop === 1,     //设置它的值比如：true或false
                            //disabled: !params.row.online     // 设置是否可以操作，变灰
                        },
                        on: { //操作事件
                            'on-change':async (value)=>{ //值发生了改变调用方法
                                this.carCertificate = Util.extend(true,{},params.row)
                                this.carCertificate.isStop=value? 1 : 0;
                                this.carCertificate.carCertificateRightList=[];
                                await this.$store.dispatch({
                                    type:'carCertificate/update',
                                    data:this.carCertificate
                                });
                                this.getpage()
                            }
                        }
                    })
                ])
            }
          },{
              title:'维护',
              width:150,
              key:'Actions',
              align: 'center',
              render:(h:any,params:any)=>{
                return h('div',[
                  h('Button',{
                      props:{
                          type:'primary',
                          size:'small'
                      },
                      on:{
                          click:()=>{
                              this.$store.commit('carCertificate/edit',params.row);
                              this.edit();
                          }
                      }
                  },'维护')
                ])
              }
        }]

        edit(){//修改弹出框
            this.editModalShow=true;
        }
        create(){//添加弹出框
            this.createModalShow=true;
        }
        pageChange(page:number){
            this.$store.commit('carCertificate/setCurrentPage',page);
            this.getpage();
        }
        pagesizeChange(pagesize:number){
            this.$store.commit('carCertificate/setPageSize',pagesize);
            this.getpage();
        }
        async getpage(){
            this.pagerequest.maxResultCount=this.pageSize;
            this.pagerequest.skipCount=(this.currentPage-1)*this.pageSize;

            await this.$store.dispatch({
                type:'carCertificate/getAll',
                data:this.pagerequest
            })
        }
        get list(){
            return this.$store.state.carCertificate.list;
        }
        get pageSize(){
            return this.$store.state.carCertificate.pageSize;
        }
        get totalCount(){
            return this.$store.state.carCertificate.totalCount;
        }
        get currentPage(){
            return this.$store.state.carCertificate.currentPage;
        }
        get loading(){
            return this.$store.state.carCertificate.loading;
        }
        async created(){
            await this.getpage();
        }
    }
</script>