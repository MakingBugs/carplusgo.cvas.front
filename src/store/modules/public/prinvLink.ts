import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import PRInvLink from '../../entities/public/prinvLink'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface PRInvLinkState extends ListState<PRInvLink>{
    editPRInvLink:PRInvLink;
}
class PRInvLinkModule extends ListModule<PRInvLinkState,any,PRInvLink>{//维修记录和发票关联档
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<PRInvLink>(),
        loading:false,
        editPRInvLink:new PRInvLink()
    }
    actions={
        async getAll(context:ActionContext<PRInvLinkState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/PRInvLink/GetAll',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<PRInvLink>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
            return page;
        },
        async create(context:ActionContext<PRInvLinkState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/PRInvLink/Create',payload.data);
            let page=reponse.data.result as PageResult<PRInvLink>;
            return page;
        },
        async update(context:ActionContext<PRInvLinkState,any>,payload:any){
            await Ajax.post('/api/services/app/PRInvLink/Update',payload.data);
        },
        async delete(context:ActionContext<PRInvLinkState,any>,payload:any){
            await Ajax.post('/api/services/app/PRInvLink/Delete',payload.data);
        },
        async get(context:ActionContext<PRInvLinkState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/PRInvLink/Get',payload.data);
            return reponse.data.result as PRInvLink;
        }
    };
    mutations={
        setCurrentPage(state:PRInvLinkState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:PRInvLinkState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:PRInvLinkState,prinvLink:PRInvLink){
            state.editPRInvLink=prinvLink;
        }
    }
}
const prinvLinkModule=new PRInvLinkModule();
export default prinvLinkModule;