import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import AccessoriesTs from '../../entities/accessories/accessoriesTs'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface AccessoriesTsState extends ListState<AccessoriesTs>{
    editAccessoriesTs:AccessoriesTs;
}
class AccessoriesTsModule extends ListModule<AccessoriesTsState,any,AccessoriesTs>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<AccessoriesTs>(),
        loading:false,
        editAccessoriesTs:new AccessoriesTs(),
    }
    actions={
        async getAll(context:ActionContext<AccessoriesTsState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/AccessoriesTs/GetAll',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<AccessoriesTs>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
            return page;
        },
        async create(context:ActionContext<AccessoriesTsState,any>,payload:any){
            await Ajax.post('/api/services/app/AccessoriesTs/Create',payload.data);
        },
        async update(context:ActionContext<AccessoriesTsState,any>,payload:any){
            await Ajax.post('/api/services/app/AccessoriesTs/Update',payload.data);
        },
        async delete(context:ActionContext<AccessoriesTsState,any>,payload:any){
            await Ajax.post('/api/services/app/AccessoriesTs/Delete',payload.data);
        },
        async get(context:ActionContext<AccessoriesTsState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/AccessoriesTs/Get',payload);
            return reponse.data.result as AccessoriesTs;
        }
    };
    mutations={
        setCurrentPage(state:AccessoriesTsState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:AccessoriesTsState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:AccessoriesTsState,accessoriesTs:AccessoriesTs){
            state.editAccessoriesTs=accessoriesTs;
        },

        /*
        修改 state 所用方法，payload 参数为 要修改的字段对象，格式为：
                {
                    要修改的state ：要传入的值，
                    ...
                }
        注意：此方法只支持传入一级对象，不支持多级。
        */
        updatestate(state:AccessoriesTsState,payload:any){
            Object.keys(payload).map(j=>{
                state[j]=payload[j]
            })
        }
    }
}
const accessoriesTsModule=new AccessoriesTsModule();
export default accessoriesTsModule;