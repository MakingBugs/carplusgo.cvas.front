import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import CarFixItem from '../../entities/carfix/carFixItem'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface CarFixItemState extends ListState<CarFixItem>{
    editCarFixItem:CarFixItem;
}
class CarFixItemModule extends ListModule<CarFixItemState,any,CarFixItem>{//维修配件明细表
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<CarFixItem>(),
        loading:false,
        editCarFixItem:new CarFixItem()
    }
    actions={
        async getAll(context:ActionContext<CarFixItemState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/CarFixItem/GetAll',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<CarFixItem>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
            return page;
        },
        async create(context:ActionContext<CarFixItemState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/CarFixItem/Create',payload.data);
            let page=reponse.data.result as PageResult<CarFixItem>;
            return page
        },
        async update(context:ActionContext<CarFixItemState,any>,payload:any){
            await Ajax.post('/api/services/app/CarFixItem/Update',payload.data);
        },
        async delete(context:ActionContext<CarFixItemState,any>,payload:any){
            await Ajax.post('/api/services/app/CarFixItem/Delete',payload.data);
        },
        async get(context:ActionContext<CarFixItemState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/CarFixItem/Get',payload);
            return reponse.data.result as CarFixItem;
        }
    };
    mutations={
        setCurrentPage(state:CarFixItemState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:CarFixItemState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:CarFixItemState,carFixItem:CarFixItem){
            state.editCarFixItem=carFixItem;
        }
    }
}
const carFixItemModule=new CarFixItemModule();
export default carFixItemModule;