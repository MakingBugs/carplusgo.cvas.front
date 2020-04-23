import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../../list-module'
import ListState from '../../list-state'
import AccountingEntryConfig from '@/store/entities/finance/accounting/accountingEntryConfig'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface AccountingEntryConfigState extends ListState<AccountingEntryConfig>{
    editAccountingEntryConfig:AccountingEntryConfig;
    selectList:Array<AccountingEntryConfig>
    selectLoading:boolean
}
class AccountingEntryConfigModule extends ListModule<AccountingEntryConfigState,any,AccountingEntryConfig>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<AccountingEntryConfig>(),
        loading:false,
        editAccountingEntryConfig:new AccountingEntryConfig(),
        selectList:new Array<AccountingEntryConfig>(),
        selectLoading:false,
    }
    actions={
        async getAll(context:ActionContext<AccountingEntryConfigState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/AccountingEntryConfig/GetAll',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<AccountingEntryConfig>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
        },
        async getSelectAll(context:ActionContext<AccountingEntryConfigState,any>,payload:any){
            context.state.selectLoading=true;
            let reponse=await Ajax.post('/api/services/app/AccountingEntryConfig/GetAll',payload.data);
            context.state.selectLoading=false;
            let page=reponse.data.result as PageResult<AccountingEntryConfig>;
            context.state.selectList=page.items;
        },
        async create(context:ActionContext<AccountingEntryConfigState,any>,payload:any){
            await Ajax.post('/api/services/app/AccountingEntryConfig/Create',payload.data);
        },
        async update(context:ActionContext<AccountingEntryConfigState,any>,payload:any){
            await Ajax.post('/api/services/app/AccountingEntryConfig/Update',payload.data);
        },
        async delete(context:ActionContext<AccountingEntryConfigState,any>,payload:any){
            await Ajax.post('/api/services/app/AccountingEntryConfig/Delete',payload.data);
        },
        async get(context:ActionContext<AccountingEntryConfigState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/AccountingEntryConfig/Get',payload);
            return reponse.data.result as AccountingEntryConfig;
        }
    };
    mutations={
        setCurrentPage(state:AccountingEntryConfigState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:AccountingEntryConfigState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:AccountingEntryConfigState,accountingEntryConfig:AccountingEntryConfig){
            state.editAccountingEntryConfig=accountingEntryConfig;
        }
    }
}
const accountingEntryConfigModule=new AccountingEntryConfigModule();
export default accountingEntryConfigModule;