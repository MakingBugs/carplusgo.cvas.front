import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../../list-module'
import ListState from '../../list-state'
import AccountingTitle from '@/store/entities/finance/accounting/accountingTitle'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface AccountingTitleState extends ListState<AccountingTitle>{
    editAccountingTitle:AccountingTitle;
}
class AccountingTitleModule extends ListModule<AccountingTitleState,any,AccountingTitle>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<AccountingTitle>(),
        loading:false,
        editAccountingTitle:new AccountingTitle()
    }
    actions={
        async getAll(context:ActionContext<AccountingTitleState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/AccountingTitle/GetAll',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<AccountingTitle>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
        },
        async create(context:ActionContext<AccountingTitleState,any>,payload:any){
            await Ajax.post('/api/services/app/AccountingTitle/Create',payload.data);
        },
        async update(context:ActionContext<AccountingTitleState,any>,payload:any){
            await Ajax.post('/api/services/app/AccountingTitle/Update',payload.data);
        },
        async delete(context:ActionContext<AccountingTitleState,any>,payload:any){
            await Ajax.post('/api/services/app/AccountingTitle/Delete',payload.data);
        },
        async get(context:ActionContext<AccountingTitleState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/AccountingTitle/Get',payload);
            return reponse.data.result as AccountingTitle;
        }
    };
    mutations={
        setCurrentPage(state:AccountingTitleState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:AccountingTitleState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:AccountingTitleState,accountingTitle:AccountingTitle){
            state.editAccountingTitle=accountingTitle;
        }
    }
}
const accountingTitleModule=new AccountingTitleModule();
export default accountingTitleModule;