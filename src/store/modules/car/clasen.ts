import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import Clasen from '@/store/entities/car/clasen'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface ClasenState extends ListState<Clasen>{
}
class ClasenModule extends ListModule<ClasenState,any,Clasen>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<Clasen>(),
        loading:false,
    }
    actions={
        async GetAll(context:ActionContext<ClasenState,any>,payload:any){
            context.commit('updatestate',{loading:true})
            let reponse=await Ajax.post('/api/services/app/Clasen/GetAll',payload.data);
            context.commit('updatestate',{loading:false})
            let page=reponse.data.result as PageResult<Clasen>;
            return page;
        },
        /*async create(context:ActionContext<ClasenState,any>,payload:any){
            await Ajax.post('/api/services/app/Clasen/Create',payload.data);
        },
        async update(context:ActionContext<ClasenState,any>,payload:any){
            await Ajax.post('/api/services/app/Clasen/Update',payload.data);
        },
        async delete(context:ActionContext<ClasenState,any>,payload:any){
            await Ajax.post('/api/services/app/Clasen/Delete',payload.data);
        },*/
        async get(context:ActionContext<ClasenState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/Clasen/Get',payload.data);
            return reponse.data.result as Clasen;
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
       updatestate(state:ClasenState,payload:any){
            Object.keys(payload).map(j=>{
                state[j]=payload[j]
            })
        }
        
    }
}
const clasenModule=new ClasenModule();
export default clasenModule;