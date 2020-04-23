import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';
import ReadyBPM from '@/store/entities/public/readyBPM';

interface ReadyBPMState extends ListState<ReadyBPM>{
    editReadyBPM:ReadyBPM;
}
class ReadyBPMModule extends ListModule<ReadyBPMState,any,ReadyBPM>{//BPM关联
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<ReadyBPM>(),
        loading:false,
        editReadyBPM:new ReadyBPM()
    }
    actions={
        async getAll(context:ActionContext<ReadyBPMState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/ReadyBPM/GetAll',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<ReadyBPM>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
            return page;
        },
        async create(context:ActionContext<ReadyBPMState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/ReadyBPM/Create',payload.data);
            let page=reponse.data.result as PageResult<ReadyBPM>;
            return page;
        },
        async update(context:ActionContext<ReadyBPMState,any>,payload:any){
            await Ajax.post('/api/services/app/ReadyBPM/Update',payload.data);
        },
        async delete(context:ActionContext<ReadyBPMState,any>,payload:any){
            await Ajax.post('/api/services/app/ReadyBPM/Delete',payload.data);
        },
        async get(context:ActionContext<ReadyBPMState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/ReadyBPM/Get',payload);
            return reponse.data.result as ReadyBPM;
        }
    };
    mutations={
        setCurrentPage(state:ReadyBPMState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:ReadyBPMState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:ReadyBPMState,readyBPM:ReadyBPM){
            state.editReadyBPM=readyBPM;
        }
    }
}
const readyBPMModule=new ReadyBPMModule();
export default readyBPMModule;