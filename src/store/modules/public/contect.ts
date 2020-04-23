import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import Contect from '../../entities/public/contect'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface ContectState extends ListState<Contect>{
    editContect:Contect;
}
class ContectModule extends ListModule<ContectState,any,Contect>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<Contect>(),
        loading:false,
        editContect:new Contect()
    }
    actions={
        async GetAll(context:ActionContext<ContectState,any>,payload:any){
            context.commit('updatestate',{loading:true})
            let reponse=await Ajax.post('/api/services/app/Contect/GetAll',payload.data);
            context.commit('updatestate',{loading:false})
            let page=reponse.data.result as PageResult<Contect>;
            return page;
        },
        /*async create(context:ActionContext<BankTypeState,any>,payload:any){
            await Ajax.post('/api/services/app/BankType/Create',payload.data);
        },
        async update(context:ActionContext<BankTypeState,any>,payload:any){
            await Ajax.post('/api/services/app/BankType/Update',payload.data);
        },
        async delete(context:ActionContext<BankTypeState,any>,payload:any){
            await Ajax.post('/api/services/app/BankType/Delete',payload.data);
        },
        async get(context:ActionContext<IBankTypeState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/BankType/Get',payload);
            return reponse.data.result as BankType;
        }*/
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
       updatestate(state:ContectState,payload:any){
            Object.keys(payload).map(j=>{
                state[j]=payload[j]
            })
        }
        
    }
}
const contectModule=new ContectModule();
export default contectModule;