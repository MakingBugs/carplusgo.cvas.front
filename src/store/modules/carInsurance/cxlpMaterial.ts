import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import CXLPMaterial from '../../entities/carInsurance/cxlpMaterial'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface CXLPMaterialState extends ListState<CXLPMaterial>{
    editCXLPMaterial:CXLPMaterial;
}
class CXLPMaterialModule extends ListModule<CXLPMaterialState,any,CXLPMaterial>{//车险资料附件表
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<CXLPMaterial>(),
        loading:false,
        editCXLPMaterial:new CXLPMaterial()
    }
    actions={
        async getAll(context:ActionContext<CXLPMaterialState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/CXLPMaterial/GetAll',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<CXLPMaterial>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
            return page;
        },
        async create(context:ActionContext<CXLPMaterialState,any>,payload:any){
            await Ajax.post('/api/services/app/CXLPMaterial/Create',payload.data);
        },
        async update(context:ActionContext<CXLPMaterialState,any>,payload:any){
            await Ajax.post('/api/services/app/CXLPMaterial/Update',payload.data);
        },
        async delete(context:ActionContext<CXLPMaterialState,any>,payload:any){
            await Ajax.post('/api/services/app/CXLPMaterial/Delete',payload.data);
        },
        async get(context:ActionContext<CXLPMaterialState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/CXLPMaterial/Get',payload);
            return reponse.data.result as CXLPMaterial;
        }
    };
    mutations={
        setCurrentPage(state:CXLPMaterialState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:CXLPMaterialState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:CXLPMaterialState,cxlpMaterial:CXLPMaterial){
            state.editCXLPMaterial=cxlpMaterial;
        }
    }
}
const cxlpMaterialModule=new CXLPMaterialModule();
export default cxlpMaterialModule;