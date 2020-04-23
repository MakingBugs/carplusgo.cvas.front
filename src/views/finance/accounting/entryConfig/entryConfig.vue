<template>
    <div>
        <Card dis-hover>
            <div class="page-body">
                <Form ref="queryForm" :label-width="80" label-position="left" inline>
                    <Row :gutter="16">
                        <Col span="6">
                            <FormItem :label="L('Keyword')+':'" style="width:100%">
                                <Input v-model="pagerequest.keyword" :placeholder="L('Name')+'/'+L('Code')"></Input>
                            </FormItem>
                        </Col>                 
                        <Col span="6">
                            <FormItem :label="L('IsActive')+':'" style="width:100%">
                                <!--Select should not set :value="'All'" it may not trigger on-change when first select 'NoActive'(or 'Actived') then select 'All'-->
                                <Select :placeholder="L('Select')" @on-change="isActiveChange">
                                    <Option value="All">{{L('All')}}</Option>
                                    <Option value="Actived">{{L('Actived')}}</Option>
                                    <Option value="NoActive">{{L('NoActive')}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem :label="L('CreationTime')+':'" style="width:100%">
                                <DatePicker  v-model="creationTime" type="datetimerange" format="yyyy-MM-dd" style="width:100%" placement="bottom-end" :placeholder="L('SelectDate')"></DatePicker>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Button @click="create" icon="android-add" type="primary" size="large">{{L('Add')}}</Button>
                        <Button icon="ios-search" type="primary" size="large" @click="getpage" class="toolbar-btn">{{L('Find')}}</Button>
                    </Row>
                </Form>
                <div class="margin-top-10">
                    <tree-table expand-key="name" :expand-type="false" :selectable="false" :columns="columns" :empty-text="L('NoDatas')" border :data="list">
                        <template slot-scope="{ row }" slot="accountingTitleCode">
                            <span>{{ getAccountingTitleCode(row) }}</span>
                        </template>
                        <template slot-scope="{ row }" slot="accountingTitleName">
                            <span>{{ getAccountingTitleName(row) }}</span>
                        </template>
                        <template slot-scope="{ row }" slot="elementChangeDirection">
                            <span>{{ getElementChangeDirection(row.elementChangeDirection) }}</span>
                        </template>
                        <template slot-scope="{ row }" slot="isActive">
                            <span>{{ row.isActive?getLocalize('Yes'):getLocalize('No') }}</span>
                        </template>
                        <template slot-scope="{ row }" slot="creationTime">
                            <span>{{ new Date(row.creationTime).toLocaleDateString() }}</span>
                        </template>
                        <template slot-scope="{ row }" slot="actions">
                            <div>
                                <Button @click="editClick(row)" type="primary" size="small">{{ getLocalize('Edit') }}</Button>
                                <Button @click="deleteClick(row)" type="error" size="small" class="toolbar-btn">{{ getLocalize('Delete') }}</Button>
                            </div>
                        </template>
                    </tree-table>
                    <Page  show-sizer class-name="fengpage" :total="totalCount" class="margin-top-10" @on-change="pageChange" @on-page-size-change="pagesizeChange" :page-size="pageSize" :current="currentPage"></Page>
                </div>
            </div>
        </Card>
        <create-entryConfig v-model="createModalShow" @save-success="getpage"></create-entryConfig>
        <edit-entryConfig v-model="editModalShow" @save-success="getpage"></edit-entryConfig>
    </div>
</template>
<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '@/lib/util'
    import AbpBase from '@/lib/abpbase'
    import PageRequest from '@/store/entities/page-request'
    import CreateEntryConfig from './create-entryConfig.vue'
    import EditEntryConfig from './edit-entryConfig.vue'
    import TreeTable from 'tree-table-vue'
    
    class PageAccountingEntryConfigRequest extends PageRequest{
        keyword:string='';
        isActive:boolean=null;
        isMaster:boolean=null;
        from:Date;
        to:Date;
    }
    
    @Component({
        components:{CreateEntryConfig,EditEntryConfig,TreeTable}
    })
    export default class AccountingEntryConfigs extends AbpBase{
        edit(){
            this.editModalShow=true;
        }
       
        pagerequest:PageAccountingEntryConfigRequest=new PageAccountingEntryConfigRequest();
        creationTime:Date[]=[];
        
        createModalShow:boolean=false;
        editModalShow:boolean=false;
        get list(){
            return this.$store.state.accountingEntryConfig.list;
        };
        get loading(){
            return this.$store.state.accountingEntryConfig.loading;
        }
        create(){
            this.createModalShow=true;
        }
        isActiveChange(val:string){
            if(val==='Actived'){
                this.pagerequest.isActive=true;
            }else if(val==='NoActive'){
                this.pagerequest.isActive=false;
            }else{
                this.pagerequest.isActive=null;
            }
        }
        pageChange(page:number){
            this.$store.commit('accountingEntryConfig/setCurrentPage',page);
            this.getpage();
        }
        pagesizeChange(pagesize:number){
            this.$store.commit('accountingEntryConfig/setPageSize',pagesize);
            this.getpage();
        }
        async getpage(){
            
            this.pagerequest.maxResultCount=this.pageSize;
            this.pagerequest.skipCount=(this.currentPage-1)*this.pageSize;

            if (this.creationTime.length>0) {
                this.pagerequest.from=this.creationTime[0];
            }
            if (this.creationTime.length>1) {
                this.pagerequest.to=this.creationTime[1];
            }
            this.pagerequest.isMaster = true;

            await this.$store.dispatch({
                type:'accountingEntryConfig/getAll',
                data:this.pagerequest
            })
        }
        get pageSize(){
            return this.$store.state.accountingEntryConfig.pageSize;
        }
        get totalCount(){
            return this.$store.state.accountingEntryConfig.totalCount;
        }
        get currentPage(){
            return this.$store.state.accountingEntryConfig.currentPage;
        }
        columns=[{
            title:this.L('Name'),
            key:'name'
        },{
            title:this.L('AccountingTitleCode'),
            key:'accountingTitleCode',
            type: 'template',
            template:'accountingTitleCode'
        },{
            title:this.L('AccountingTitleName'),
            key:'accountingTitleName',
            type: 'template',
            template:'accountingTitleName'
        },{
            title:this.L('Sort'),
            key:'sort'
        },{
            title:this.L('ElementChangeDirection'),
            key:'elementChangeDirection',
            type: 'template',
            template:'elementChangeDirection'
        },{
            title:this.L('IsActive'),
            key:'isActive',
            type: 'template',
            template:'isActive'
        },{
            title:this.L('CreationTime'),
            key:'creationTime',
            type: 'template',
            template:'creationTime'
        },{
            title:this.L('Actions'),
            key:'actions',
            type: 'template',
            template:'actions',
            width:150,
        }]
        getLocalize(val:string){
            return this.L(val);
        }
        getAccountingTitleCode(row) {
            if(row.accountingTitle){
                return row.accountingTitle.code;
            }
        }
        getAccountingTitleName(row) {
            if(row.accountingTitle){
                return row.accountingTitle.name;
            }
        }
        getElementChangeDirection(elementChangeDirection) {
            switch (elementChangeDirection) {
                case 1:
                    return this.L("Increase");
                case 2:
                    return this.L("Decrease");
                default:
                    return elementChangeDirection;
            }
        }
        editClick(row){
            this.$store.commit('accountingEntryConfig/edit',row);
            this.edit();
        }
        async deleteClick(row){
            this.$Modal.confirm({
                title:this.L('Tips'),
                content:this.L('DeleteConfirm'),
                okText:this.L('Yes'),
                cancelText:this.L('No'),
                onOk:async()=>{
                    await this.$store.dispatch({
                        type:'accountingEntryConfig/delete',
                        data:row
                    })
                    await this.getpage();
                }
            })
        }
        async created(){
            this.getpage();
        }
    }
</script>