import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import Inc from '../../entities/public/inc'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface IncState extends ListState<Inc>{
    editInc:Inc;
}
class IncModule extends ListModule<IncState,any,Inc>{//公司主档
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<Inc>(),
        loading:false,
        editInc:new Inc()
    }
    actions={
        async getAll(context:ActionContext<IncState,any>,payload:any){
            context.commit('updatestate',{loading:true})
            let reponse=await Ajax.post('/api/services/app/Inc/GetAll',payload.data);
            context.commit('updatestate',{loading:false})
            let page=reponse.data.result as PageResult<Inc>;
            context.commit('updatestate',{totalCount:page.totalCount})
            return page;
        },
        /*async create(context:ActionContext<IncState,any>,payload:any){
            await Ajax.post('/api/services/app/Inc/Create',payload.data);
        },
        async update(context:ActionContext<IncState,any>,payload:any){
            await Ajax.post('/api/services/app/Inc/Update',payload.data);
        },
        async delete(context:ActionContext<IncState,any>,payload:any){
            await Ajax.post('/api/services/app/Inc/Delete',payload.data);
        },*/
        async get(context:ActionContext<IncState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/Inc/Get',payload.data);
            return reponse.data.result as Inc;
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
       updatestate(state:IncState,payload:any){
            Object.keys(payload).map(j=>{
                state[j]=payload[j]
            })
        }
        
    }
}
const incModule=new IncModule();
export default incModule;