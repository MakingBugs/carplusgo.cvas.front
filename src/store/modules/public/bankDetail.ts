import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import BankDetail from '../../entities/public/bankDetail'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result'

interface BankDetailState extends ListState<BankDetail>{
    editBankDetail:BankDetail;
}
class BankDetailModule extends ListModule<BankDetailState,any,BankDetail>{//银行明细表
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<BankDetail>(),
        loading:false,
        editBankDetail:new BankDetail()
    }
    actions={
        async getAll(context:ActionContext<BankDetailState,any>,payload:any){
            context.commit('updatestate',{loading:true})
            let reponse=await Ajax.post('/api/services/app/BankDetail/GetAll',payload.data);
            context.commit('updatestate',{loading:false})
            let page=reponse.data.result as PageResult<BankDetail>;
            context.commit('updatestate',{totalCount:page.totalCount})
            return page;
        },
        async create(context:ActionContext<BankDetailState,any>,payload:any){
            await Ajax.post('/api/services/app/BankDetail/Create',payload.data);
        },
        async update(context:ActionContext<BankDetailState,any>,payload:any){
            await Ajax.post('/api/services/app/BankDetail/Update',payload.data);
        },
        async delete(context:ActionContext<BankDetailState,any>,payload:any){
            await Ajax.post('/api/services/app/BankDetail/Delete',payload.data);
        },
        async get(context:ActionContext<BankDetailState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/BankDetail/Get',payload);
            return reponse.data.result as BankDetail;
        }
    };
    mutations={
        /*setCurrentPage(state:BankDetailState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:BankDetailState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:BankDetailState,bankDetail:BankDetail){
            state.editBankDetail=bankDetail;
        },*/


        /*
        修改 state 所用方法，payload 参数为 要修改的字段对象，格式为：
                {
                    要修改的state ：要传入的值，
                    ...
                }
        注意：此方法只支持传入一级对象，不支持多级。
        */
       updatestate(state:BankDetailState,payload:any){
            Object.keys(payload).map(j=>{
                state[j]=payload[j]
            })
        }
        
    }
}
const bankDetailModule=new BankDetailModule();
export default bankDetailModule;