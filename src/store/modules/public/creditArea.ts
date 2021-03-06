import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import CreditArea from '../../entities/public/creditArea'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface CreditAreaState extends ListState<CreditArea>{
    editCreditArea:CreditArea;
}
class CreditAreaModule extends ListModule<CreditAreaState,any,CreditArea>{//区域
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<CreditArea>(),
        loading:false,
        editCreditArea:new CreditArea()
    }
    actions={
        async getAll(context:ActionContext<CreditAreaState,any>,payload:any){
            context.commit('updatestate',{loading:true})
            let reponse=await Ajax.post('/api/services/app/CreditArea/GetAll',payload.data);
            context.commit('updatestate',{loading:false})
            let page=reponse.data.result as PageResult<CreditArea>;
            context.commit('updatestate',{totalCount:page.totalCount})
            return page;
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
       updatestate(state:CreditAreaState,payload:any){
            Object.keys(payload).map(j=>{
                state[j]=payload[j]
            })
        }
        
    }
}
const creditAreaModule=new CreditAreaModule();
export default creditAreaModule;