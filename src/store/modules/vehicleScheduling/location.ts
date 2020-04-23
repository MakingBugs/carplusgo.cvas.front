import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import Location from '../../entities/vehicleScheduling/location'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface LocationState extends ListState<Location>{
    editLocation:Location;
}
class LocationModule extends ListModule<LocationState,any,Location>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<Location>(),
        loading:false,
        editLocation:new Location(),
    }
    actions={
        async getAll(context:ActionContext<LocationState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/Location/GetAll',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<Location>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
        },
        async create(context:ActionContext<LocationState,any>,payload:any){
            await Ajax.post('/api/services/app/Location/Create',payload.data);
        },
        async update(context:ActionContext<LocationState,any>,payload:any){
            await Ajax.post('/api/services/app/Location/Update',payload.data);
        },
        async delete(context:ActionContext<LocationState,any>,payload:any){
            await Ajax.post('/api/services/app/Location/Delete',payload.data);
        },
        async get(context:ActionContext<LocationState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/Location/Get',payload);
            return reponse.data.result as Location;
        }
    };
    mutations={
        setCurrentPage(state:LocationState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:LocationState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:LocationState,location:Location){
            state.editLocation=location;
        }
}
}
const locationModule=new LocationModule();
export default locationModule;
