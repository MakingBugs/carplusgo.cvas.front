import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import TakeCarApply from '../../entities/vehicleScheduling/takeCarApply'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';
import TakeCar from '@/store/entities/vehicleScheduling/takeCar'

interface TakeCarApplyState extends ListState<TakeCarApply>{
    editTakeCarApply:TakeCarApply;
}
class TakeCarApplyModule extends ListModule<TakeCarApplyState,any,TakeCarApply>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<TakeCarApply>(),
        loading:false,
        editTakeCarApply:new TakeCarApply(),
    }
    actions={
        async getAll(context:ActionContext<TakeCarApplyState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/TakeCarApply/GetAll',payload.data);
            let page=reponse.data.result as PageResult<TakeCarApply>;
            context.state.totalCount=page.totalCount;
            var ids = page.items.map(x=> x.id)
            let takeCarReponse=await Ajax.post('/api/services/app/TakeCar/GetAll',{
                maxResultCount:1000,
                skipCount:0,
                ids:ids,
            });
            context.state.loading=false;
            let takeCarPage = takeCarReponse.data.result as PageResult<TakeCar>;
            context.state.list=page.items.map(x=>{
                if(!!takeCarPage.items){
                    x.takeCarList = takeCarPage.items.filter(y=>y.carTakeApplyID === x.id)
                }
                return x
            })
        },
        async create(context:ActionContext<TakeCarApplyState,any>,payload:any){
            await Ajax.post('/api/services/app/TakeCarApply/Create',payload.data);
        },
        async update(context:ActionContext<TakeCarApplyState,any>,payload:any){
            payload.data.location=null;
            payload.data.clasenData=null;
            payload.data.itemStatusCode=null;
            payload.data.takeCarList=null;
            payload.data.itemTypeCode=null;
            payload.data.factoryBrand=null;
            payload.data.brandData=null;
            await Ajax.post('/api/services/app/TakeCarApply/Update',payload.data);
        },
        async delete(context:ActionContext<TakeCarApplyState,any>,payload:any){
            await Ajax.post('/api/services/app/TakeCarApply/Delete',payload.data);
        },
        async get(context:ActionContext<TakeCarApplyState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/TakeCarApply/Get',payload);
            return reponse.data.result as TakeCarApply;
        }
    };
    mutations={
        setCurrentPage(state:TakeCarApplyState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:TakeCarApplyState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:TakeCarApplyState,takeCarApply:TakeCarApply){
            state.editTakeCarApply=takeCarApply;
        }
}
}
const takeCarApplyModule=new TakeCarApplyModule();
export default takeCarApplyModule;
