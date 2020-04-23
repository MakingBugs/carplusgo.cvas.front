import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import UseCarApply from '../../entities/vehicleScheduling/useCarApply'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface UseCarApplyState extends ListState<UseCarApply>{
  updateUseCarApply:UseCarApply
}
class UseCarApplyModule extends ListModule<UseCarApplyState,any,UseCarApply>{//厂商
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list:new Array<UseCarApply>(),
        loading:false,
        updateUseCarApply:new UseCarApply()
    }
    actions={
        async getAll(context:ActionContext<UseCarApplyState,any>,payload:any){
            context.commit('updatestate',{loading:true})
            let reponse=await Ajax.post('/api/services/app/UseCarApply/GetAll',payload.data);
            context.commit('updatestate',{loading:false})
            let page=reponse.data.result as PageResult<UseCarApply>;
            context.commit('updatestate',{totalCount:page.totalCount})
            return page
        },
        async create(context:ActionContext<UseCarApplyState,any>,payload:any){
            let reponse = await Ajax.post('/api/services/app/UseCarApply/Create',payload.data);
            let page=reponse.data.result as PageResult<UseCarApply>;
            return page
        },
        async update(context:ActionContext<UseCarApplyState,any>,payload:any){
          let reponse=await Ajax.post('/api/services/app/UseCarApply/Update',payload.data);
          let page=reponse.data.result as PageResult<UseCarApply>;
          return page
        },
        async delete(context:ActionContext<UseCarApplyState,any>,payload:any){
            await Ajax.post('/api/services/app/UseCarApply/Delete',payload.data);
        },
        async get(context:ActionContext<UseCarApplyState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/UseCarApply/Get',payload.data);
            return reponse.data.result as UseCarApply;
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
        updatestate(state:UseCarApplyState,payload:any){
            Object.keys(payload).map(j=>{
              state[j]=payload[j]
            })
        }
    }
}
const useCarApplyModule=new UseCarApplyModule();
export default useCarApplyModule;