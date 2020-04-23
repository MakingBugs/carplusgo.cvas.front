import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import Supplier from '../../entities/public/supplier'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface SupplierState extends ListState<Supplier>{
    editSupplier:Supplier;
    selectList:Array<Supplier>;
}
class SupplierModule extends ListModule<SupplierState,any,Supplier>{//厂商
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list:new Array<Supplier>(),
        loading:false,
        editSupplier:new Supplier(),
        selectList:new Array<Supplier>(),
    }
    actions={
        async getAll(context:ActionContext<SupplierState,any>,payload:any){
            context.commit('updatestate',{loading:true})
            let reponse=await Ajax.post('/api/services/app/Supplier/GetAll',payload.data);
            context.commit('updatestate',{loading:false})
            let page=reponse.data.result as PageResult<Supplier>;
            context.commit('updatestate',{totalCount:page.totalCount})
            return page
        },
        async selectAll(context:ActionContext<SupplierState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/Supplier/GetAll',payload.data);
            let page=reponse.data.result as PageResult<Supplier>;
            context.state.selectList = page.items;
        },
        async create(context:ActionContext<SupplierState,any>,payload:any){
            let reponse = await Ajax.post('/api/services/app/Supplier/Create',payload.data);
            let page=reponse.data.result as PageResult<Supplier>;
            return page
        },
        async update(context:ActionContext<SupplierState,any>,payload:any){
            await Ajax.post('/api/services/app/Supplier/Update',payload.data);
        },
        async delete(context:ActionContext<SupplierState,any>,payload:any){
            await Ajax.post('/api/services/app/Supplier/Delete',payload.data);
        },
        async get(context:ActionContext<SupplierState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/Supplier/Get',payload.data);
            return reponse.data.result as Supplier;
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
        updatestate(state:SupplierState,payload:any){
            Object.keys(payload).map(j=>{
                state[j]=payload[j]
            })
        }
    }
}
const supplierModule=new SupplierModule();
export default supplierModule;