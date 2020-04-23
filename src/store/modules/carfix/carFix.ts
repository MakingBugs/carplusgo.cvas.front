import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import CarFix from '../../entities/carfix/carFix'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface CarFixState extends ListState<CarFix>{
    editCarFix:CarFix;
}
class CarFixModule extends ListModule<CarFixState,any,CarFix>{//维修表
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<CarFix>(),
        loading:false,
        editCarFix:new CarFix()
    }
    actions={
        async getAll(context:ActionContext<CarFixState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/CarFix/GetAll',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<CarFix>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
            return page;
        },
        async create(context:ActionContext<CarFixState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/CarFix/Create',payload.data);
            let page=reponse.data.result as PageResult<CarFix>;
            return page
        },
        async update(context:ActionContext<CarFixState,any>,payload:any){
            await Ajax.post('/api/services/app/CarFix/Update',payload.data);
        },
        async delete(context:ActionContext<CarFixState,any>,payload:any){
            await Ajax.post('/api/services/app/CarFix/Delete',payload.data);
        },
        async get(context:ActionContext<CarFixState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/CarFix/Get',payload.data);
            return reponse.data.result as CarFix;
        }
    };
    mutations={
        setCurrentPage(state:CarFixState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:CarFixState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:CarFixState,carFix:CarFix){
            state.editCarFix=carFix;
        }
    }
}
const carFixModule=new CarFixModule();
export default carFixModule;