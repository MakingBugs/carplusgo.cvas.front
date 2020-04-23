import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import CXLPRecord from '../../entities/carInsurance/cxlpRecord'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface CXLPRecordState extends ListState<CXLPRecord>{
    editCXLPRecord:CXLPRecord;
}
class CXLPRecordModule extends ListModule<CXLPRecordState,any,CXLPRecord>{//处理进度表
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<CXLPRecord>(),
        loading:false,
        editCXLPRecord:new CXLPRecord()
    }
    actions={
        async getAll(context:ActionContext<CXLPRecordState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/CXLPRecord/GetAll',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<CXLPRecord>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
            return page;
        },
        async create(context:ActionContext<CXLPRecordState,any>,payload:any){
            await Ajax.post('/api/services/app/CXLPRecord/Create',payload.data);
        },
        async update(context:ActionContext<CXLPRecordState,any>,payload:any){
            await Ajax.post('/api/services/app/CXLPRecord/Update',payload.data);
        },
        async delete(context:ActionContext<CXLPRecordState,any>,payload:any){
            await Ajax.post('/api/services/app/CXLPRecord/Delete',payload.data);
        },
        async get(context:ActionContext<CXLPRecordState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/CXLPRecord/Get',payload);
            return reponse.data.result as CXLPRecord;
        }
    };
    mutations={
        setCurrentPage(state:CXLPRecordState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:CXLPRecordState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:CXLPRecordState,cxlpRecord:CXLPRecord){
            state.editCXLPRecord=cxlpRecord;
        }
    }
}
const cxlpRecordModule=new CXLPRecordModule();
export default cxlpRecordModule;