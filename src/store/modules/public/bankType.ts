import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import BankType from '../../entities/public/bankType'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface BankTypeState extends ListState<BankType>{
    editBankType:BankType;
}
class BankTypeModule extends ListModule<BankTypeState,any,BankType>{//银行表
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<BankType>(),
        loading:false,
        editBankType:new BankType()
    }
    actions={
        async getAll(context:ActionContext<BankTypeState,any>,payload:any){
            context.commit('updatestate',{loading:true})
            let reponse=await Ajax.post('/api/services/app/BankType/GetAll',payload.data);
            context.commit('updatestate',{loading:false})
            let page=reponse.data.result as PageResult<BankType>;
            context.commit('updatestate',{totalCount:page.totalCount})
            return page;
        },
        async create(context:ActionContext<BankTypeState,any>,payload:any){
            await Ajax.post('/api/services/app/BankType/Create',payload.data);
        },
        async update(context:ActionContext<BankTypeState,any>,payload:any){
            await Ajax.post('/api/services/app/BankType/Update',payload.data);
        },
        async delete(context:ActionContext<BankTypeState,any>,payload:any){
            await Ajax.post('/api/services/app/BankType/Delete',payload.data);
        },
        async get(context:ActionContext<BankTypeState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/BankType/Get',payload.data);
            return reponse.data.result as BankType;
        }
    };
    mutations={
        /*
        修改 state 所用方法，payload 参数为 要修改的字段对象，格式为：
                {
                    要修改的state ：要传入的值，
                    ...
                }
        注意：此方法只支持传入一级对象，不支持多级。
        */
       updatestate(state:BankTypeState,payload:any){
            Object.keys(payload).map(j=>{
                state[j]=payload[j]
            })
        }
        
    }
}
const bankTypeModule=new BankTypeModule();
export default bankTypeModule;