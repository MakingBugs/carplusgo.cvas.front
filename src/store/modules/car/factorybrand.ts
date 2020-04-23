import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import FactoryBrand from '@/store/entities/car/factorybrand'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface FactoryBrandtate extends ListState<FactoryBrand>{
}
class FactoryBrandModule extends ListModule<FactoryBrandtate,any,FactoryBrand>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<FactoryBrand>(),
        loading:false,
    }
    actions={
        async GetAll(context:ActionContext<FactoryBrandtate,any>,payload:any){
            context.commit('updatestate',{loading:true})
            let reponse=await Ajax.post('/api/services/app/FactoryBrand/GetAll',payload.data);
            context.commit('updatestate',{loading:false})
            let page=reponse.data.result as PageResult<FactoryBrand>;
            return page;
        },
        /*async create(context:ActionContext<ItemCodeState,any>,payload:any){
            await Ajax.post('/api/services/app/ItemCode/Create',payload.data);
        },
        async update(context:ActionContext<ItemCodeState,any>,payload:any){
            await Ajax.post('/api/services/app/ItemCode/Update',payload.data);
        },
        async delete(context:ActionContext<ItemCodeState,any>,payload:any){
            await Ajax.post('/api/services/app/ItemCode/Delete',payload.data);
        },
        async get(context:ActionContext<ItemCodeState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/ItemCode/Get',payload);
            return reponse.data.result as ItemCode;
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
       updatestate(state:FactoryBrandtate,payload:any){
            Object.keys(payload).map(j=>{
                state[j]=payload[j]
            })
        }
        
    }
}
const factoryBrandModule=new FactoryBrandModule();
export default factoryBrandModule;