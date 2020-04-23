import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import SupplierContect from '../../entities/public/supplierContect'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface SupplierContectState extends ListState<SupplierContect>{
    editContect:SupplierContect;
}
class SupplierContectModule extends ListModule<SupplierContectState,any,SupplierContect>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<SupplierContect>(),
        loading:false,
        editContect:new SupplierContect()
    }
    actions={
        async GetAll(context:ActionContext<SupplierContectState,any>,payload:any){
            context.commit('updatestate',{loading:true})
            let reponse=await Ajax.post('/api/services/app/SupplierContect/GetAll',payload.data);
            context.commit('updatestate',{loading:false})
            let page=reponse.data.result as PageResult<SupplierContect>;
            return page;
        },
        async Create(context:ActionContext<SupplierContectState,any>,payload:any){
            await Ajax.post('/api/services/app/SupplierContect/Create',payload.data);
        },
        async Update(context:ActionContext<SupplierContectState,any>,payload:any){
            await Ajax.post('/api/services/app/SupplierContect/Update',payload.data);
        },
        async Delete(context:ActionContext<SupplierContectState,any>,payload:any){
            await Ajax.post('/api/services/app/SupplierContect/Delete',payload.data);
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
       updatestate(state:SupplierContectState,payload:any){
            Object.keys(payload).map(j=>{
                state[j]=payload[j]
            })
        }
        
    }
}
const supplierContectModule=new SupplierContectModule();
export default supplierContectModule;