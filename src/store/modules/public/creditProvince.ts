import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import CreditProvince from '../../entities/public/creditProvince'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface CreditProvinceState extends ListState<CreditProvince>{
    editCreditProvince:CreditProvince;
}
class CreditProvinceModule extends ListModule<CreditProvinceState,any,CreditProvince>{//省份
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<CreditProvince>(),
        loading:false,
        editCreditProvince:new CreditProvince()
    }
    actions={
        async getAll(context:ActionContext<CreditProvinceState,any>,payload:any){
            context.commit('updatestate',{loading:true})
            let reponse=await Ajax.post('/api/services/app/CreditProvince/GetAll',payload.data);
            context.commit('updatestate',{loading:false})
            let page=reponse.data.result as PageResult<CreditProvince>;
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
       updatestate(state:CreditProvinceState,payload:any){
            Object.keys(payload).map(j=>{
                state[j]=payload[j]
            })
        }
        
    }
}
const creditProvinceModule=new CreditProvinceModule();
export default creditProvinceModule;