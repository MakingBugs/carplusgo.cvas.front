import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import AccBank from '../../entities/public/accBank'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface AccBankState extends ListState<AccBank>{
    editAccBank:AccBank;
}
class AccBankModule extends ListModule<AccBankState,any,AccBank>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<AccBank>(),
        loading:false,
        editBankType:new AccBank()
    }
    actions={
        async getAll(context:ActionContext<AccBankState,any>,payload:any){
            context.commit('updatestate',{loading:true})
            let reponse=await Ajax.post('/api/services/app/AccBank/GetAll',payload.data);
            context.commit('updatestate',{loading:false})
            let page=reponse.data.result as PageResult<AccBank>;
            return page;
        },
        async create(context:ActionContext<AccBankState,any>,payload:any){
            await Ajax.post('/api/services/app/AccBank/Create',payload.data);
        },
        async update(context:ActionContext<AccBankState,any>,payload:any){
            await Ajax.post('/api/services/app/AccBank/Update',payload.data);
        },
        async delete(context:ActionContext<AccBankState,any>,payload:any){
            await Ajax.post('/api/services/app/AccBank/Delete',payload.data);
        },
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
       updatestate(state:AccBankState,payload:any){
            Object.keys(payload).map(j=>{
                state[j]=payload[j]
            })
        }
        
    }
}
const accBankModule=new AccBankModule();
export default accBankModule;