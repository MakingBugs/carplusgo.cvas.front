import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import Customer from '../../entities/public/customer'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface CustomerState extends ListState<Customer>{
    editCustomer:Customer;
    selectList:Array<Customer>;
}
class CustomerModule extends ListModule<CustomerState,any,Customer>{//厂商
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list:new Array<Customer>(),
        loading:false,
        editCustomer:new Customer(),
        selectList:new Array<Customer>(),
    }
    actions={
        async getAll(context:ActionContext<CustomerState,any>,payload:any){
            context.commit('updatestate',{loading:true})
            let reponse=await Ajax.post('/api/services/app/Customer/GetAll',payload.data);
            context.commit('updatestate',{loading:false})
            let page=reponse.data.result as PageResult<Customer>;
            context.commit('updatestate',{totalCount:page.totalCount})
            return page
        },
        async create(context:ActionContext<CustomerState,any>,payload:any){
            let reponse = await Ajax.post('/api/services/app/Customer/Create',payload.data);
            let page=reponse.data.result as PageResult<Customer>;
            return page
        },
        async update(context:ActionContext<CustomerState,any>,payload:any){
            await Ajax.post('/api/services/app/Customer/Update',payload.data);
        },
        async delete(context:ActionContext<CustomerState,any>,payload:any){
            await Ajax.post('/api/services/app/Customer/Delete',payload.data);
        },
        async get(context:ActionContext<CustomerState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/Customer/Get',payload.data);
            return reponse.data.result as Customer;
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
        updatestate(state:CustomerState,payload:any){
            Object.keys(payload).map(j=>{
                state[j]=payload[j]
            })
        }
    }
}
const customerModule=new CustomerModule();
export default customerModule;