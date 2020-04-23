import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import ItemCode from '../../entities/public/itemCode'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface ItemCodeState extends ListState<ItemCode>{
    editItemCode:ItemCode;
}
class ItemCodeModule extends ListModule<ItemCodeState,any,ItemCode>{//类别明细表
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<ItemCode>(),
        loading:false,
        editItemCode:new ItemCode()
    }
    actions={
        async GetItemCodeByItemTypes(context:ActionContext<ItemCodeState,any>,payload:any){
            context.commit('updatestate',{loading:true})
            let reponse=await Ajax.post('/api/services/app/ItemCode/GetItemCodeByItemTypes',payload.data);
            context.commit('updatestate',{loading:false})
            let page=reponse.data.result as PageResult<ItemCode>;
            context.commit('updatestate',{totalCount:page.totalCount})
            context.state.list=page.items;
            return page;
        },
        /*async create(context:ActionContext<ItemCodeState,any>,payload:any){
            await Ajax.post('/api/services/app/ItemCode/Create',payload.data);
        },
        async update(context:ActionContext<ItemCodeState,any>,payload:any){
            await Ajax.post('/api/services/app/ItemCode/Update',payload.data);
        },
        async get(context:ActionContext<ItemCodeState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/ItemCode/GetItemCodeByID',payload);
            return reponse.data.result as ItemCode;
        }*/
    };
    mutations={
        /*setCurrentPage(state:ItemCodeState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:ItemCodeState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:ItemCodeState,itemCode:ItemCode){
            state.editItemCode=itemCode;
        },*/


        /*
        修改 state 所用方法，payload 参数为 要修改的字段对象，格式为：
                {
                    要修改的state ：要传入的值，
                    ...
                }
        注意：此方法只支持传入一级对象，不支持多级。
        */
       updatestate(state:ItemCodeState,payload:any){
            Object.keys(payload).map(j=>{
                state[j]=payload[j]
            })
        }
        
    }
}
const itemCodeModule=new ItemCodeModule();
export default itemCodeModule;