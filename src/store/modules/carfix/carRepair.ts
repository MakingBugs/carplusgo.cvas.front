import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import CarRepair from '../../entities/carfix/carRepair'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface CarRepairState extends ListState<CarRepair>{
    editCarRepair:CarRepair;
}
class CarRepairModule extends ListModule<CarRepairState,any,CarRepair>{//交修主档
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<CarRepair>(),
        loading:false,
        editCarRepair:new CarRepair()
    }
    actions={
        async getAll(context:ActionContext<CarRepairState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/CarRepair/GetAll',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<CarRepair>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
            return page;
        },
        async create(context:ActionContext<CarRepairState,any>,payload:any){
            await Ajax.post('/api/services/app/CarRepair/Create',payload.data);
        },
        async update(context:ActionContext<CarRepairState,any>,payload:any){
            await Ajax.post('/api/services/app/CarRepair/Update',payload.data);
        },
        async delete(context:ActionContext<CarRepairState,any>,payload:any){
            await Ajax.post('/api/services/app/CarRepair/Delete',payload.data);
        },
        async get(context:ActionContext<CarRepairState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/CarRepair/Get',payload.data);
            return reponse.data.result as CarRepair;
        }
    };
    mutations={
        setCurrentPage(state:CarRepairState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:CarRepairState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:CarRepairState,carRepair:CarRepair){
            state.editCarRepair=carRepair;
        }
    }
}
const carRepairModule=new CarRepairModule();
export default carRepairModule;