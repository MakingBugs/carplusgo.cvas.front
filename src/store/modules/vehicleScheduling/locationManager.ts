import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import LocationManager from '../../entities/vehicleScheduling/locationManager'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface LocationManagerState extends ListState<LocationManager>{
    editLocationManager:LocationManager;
}
class LocationManagerModule extends ListModule<LocationManagerState,any,LocationManager>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<LocationManager>(),
        loading:false,
        editLocationManager:new LocationManager(),
    }
    actions={
        async getAll(context:ActionContext<LocationManagerState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/LocationManager/GetAll',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<LocationManager>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
        },
        async create(context:ActionContext<LocationManagerState,any>,payload:any){
            await Ajax.post('/api/services/app/LocationManager/Create',payload.data);
        },
        async update(context:ActionContext<LocationManagerState,any>,payload:any){
            await Ajax.post('/api/services/app/LocationManager/Update',payload.data);
        },
        async delete(context:ActionContext<LocationManagerState,any>,payload:any){
            await Ajax.post('/api/services/app/LocationManager/Delete',payload.data);
        },
        async get(context:ActionContext<LocationManagerState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/LocationManager/Get',payload);
            return reponse.data.result as LocationManager;
        }
    };
    mutations={
        setCurrentPage(state:LocationManagerState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:LocationManagerState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:LocationManagerState,locationManager:LocationManager){
            state.editLocationManager=locationManager;
        }
}
}
const locationManagerModule=new LocationManagerModule();
export default locationManagerModule;
