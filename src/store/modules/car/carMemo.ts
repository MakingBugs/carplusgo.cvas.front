import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import CarMemo from '../../entities/car/carMemo'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface CarMemoState extends ListState<CarMemo>{
    editCarMemo:CarMemo;
}
class CarMemoModule extends ListModule<CarMemoState,any,CarMemo>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<CarMemo>(),
        loading:false,
        editCarMemo:new CarMemo(),
    }
    actions={
        async getAll(context:ActionContext<CarMemoState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/CarMemo/GetAll',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<CarMemo>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
            return page;
        },
        async create(context:ActionContext<CarMemoState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/CarMemo/Create',payload.data);
            let page=reponse.data.result as PageResult<CarMemo>;
            return page
        },
        async update(context:ActionContext<CarMemoState,any>,payload:any){
            await Ajax.post('/api/services/app/CarMemo/Update',payload.data);
        },
        async delete(context:ActionContext<CarMemoState,any>,payload:any){
            await Ajax.post('/api/services/app/CarMemo/Delete',payload.data);
        },
        async get(context:ActionContext<CarMemoState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/CarMemo/Get',payload.data);
            return reponse.data.result as CarMemo;
        }
    };
    mutations={
        setCurrentPage(state:CarMemoState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:CarMemoState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:CarMemoState,carMemo:CarMemo){
            state.editCarMemo=carMemo;
        }
    }
}
const carMemoModule=new CarMemoModule();
export default carMemoModule;