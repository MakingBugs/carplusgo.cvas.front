import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import OrdersFeeType from '../../entities/ordersfeetype/ordersfeetype'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface OrdersFeeTypeState extends ListState<OrdersFeeType>{

}
class OrdersFeeTypeModule extends ListModule<OrdersFeeTypeState,any,OrdersFeeType>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<OrdersFeeType>(),
        loading:false,
    }
    actions={
        async GetOrdersFeeTypeByInc(context:ActionContext<OrdersFeeTypeState,any>,payload:any){
            context.commit('updatestate',{loading:true})
            let reponse=await Ajax.post('/api/services/app/OrderFeeType/GetOrdersFeeTypeByInc',payload.data);
            context.commit('updatestate',{loading:false})
            let page=reponse.data.result as PageResult<OrdersFeeType>;
            return page;
        },
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
       updatestate(state:OrdersFeeTypeState,payload:any){
            Object.keys(payload).map(j=>{
                state[j]=payload[j]
            })
        }
        
    }
}
const ordersFeeTypeModule=new OrdersFeeTypeModule();
export default ordersFeeTypeModule;