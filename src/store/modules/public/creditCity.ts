import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import CreditCity from '../../entities/public/creditCity'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface CreditCityState extends ListState<CreditCity>{
    editCreditCity:CreditCity;
}
class CreditCityModule extends ListModule<CreditCityState,any,CreditCity>{//城市
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<CreditCity>(),
        loading:false,
        editCreditCity:new CreditCity()
    }
    actions={
        async getAll(context:ActionContext<CreditCityState,any>,payload:any){
            context.commit('updatestate',{loading:true})
            let reponse=await Ajax.post('/api/services/app/CreditCity/GetAll',payload.data);
            context.commit('updatestate',{loading:false})
            let page=reponse.data.result as PageResult<CreditCity>;
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
       updatestate(state:CreditCityState,payload:any){
            Object.keys(payload).map(j=>{
                state[j]=payload[j]
            })
        }
        
    }
}
const creditCityModule=new CreditCityModule();
export default creditCityModule;