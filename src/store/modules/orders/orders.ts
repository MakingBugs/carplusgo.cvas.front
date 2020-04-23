import {Store,Module,ActionContext,GetterTree} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import Orders from '../../entities/orders/orders'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface OrdersState extends ListState<Orders>{

}
class OrdersModule extends ListModule<OrdersState,any,Orders>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<Orders>(),
        loading:false
    }
    actions={
        async GetOrdersList(context:ActionContext<OrdersState,any>,payload:any){
            context.commit('updatestate',{loading:true})
            let reponse=await Ajax.post('/api/services/app/OrdersList/GetOrdersList',payload.data);
            context.commit('updatestate',{loading:false})
            let page=reponse.data.result as PageResult<Orders>;
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
       updatestate(state:OrdersState,payload:any){
            Object.keys(payload).map(j=>{
                //state.hasOwnProperty(j)
                state[j]=payload[j]
            })
        }
    };
    // getters={
    //     skipCount(state:OrdersState){
    //         return (state.currentPage-1)*state.pageSize
    //     }
    // }
}
const ordersModule=new OrdersModule();
export default ordersModule;