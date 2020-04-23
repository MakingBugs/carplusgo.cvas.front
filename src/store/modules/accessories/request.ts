import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import Request from '../../entities/accessories/request'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface RequestState extends ListState<Request>{
    editRequest:Request;
}
class RequestModule extends ListModule<RequestState,any,Request>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<Request>(),
        loading:false,
        editRequest:new Request()
    }
    actions={
        async getAll(context:ActionContext<RequestState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/Request/GetAll',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<Request>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
            return page;
        },
        async create(context:ActionContext<RequestState,any>,payload:any){
            await Ajax.post('/api/services/app/Request/Create',payload.data);
        },
        async update(context:ActionContext<RequestState,any>,payload:any){
            await Ajax.post('/api/services/app/Request/Update',payload.data);
        },
        async get(context:ActionContext<RequestState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/Request/Get',payload);
            return reponse.data.result as Request;
        }
    };
    mutations={
        setCurrentPage(state:RequestState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:RequestState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:RequestState,request:Request){
            state.editRequest=request;
        }
    }
}
const requestModule=new RequestModule();
export default requestModule;