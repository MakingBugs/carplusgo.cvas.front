import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import AdditionalItem from '../../entities/carfix/additionalItem'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface AdditionalItemState extends ListState<AdditionalItem>{
    editAdditionalItem:AdditionalItem;
}
class AdditionalItemModule extends ListModule<AdditionalItemState,any,AdditionalItem>{//交修追加表
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<AdditionalItem>(),
        loading:false,
        editAdditionalItem:new AdditionalItem()
    }
    actions={
        async getAll(context:ActionContext<AdditionalItemState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/AdditionalItem/GetAll',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<AdditionalItem>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
            return page;
        },
        async create(context:ActionContext<AdditionalItemState,any>,payload:any){
            await Ajax.post('/api/services/app/AdditionalItem/Create',payload.data);
        },
        async update(context:ActionContext<AdditionalItemState,any>,payload:any){
            await Ajax.post('/api/services/app/AdditionalItem/Update',payload.data);
        },
        async delete(context:ActionContext<AdditionalItemState,any>,payload:any){
            await Ajax.post('/api/services/app/AdditionalItem/Delete',payload.data);
        },
        async get(context:ActionContext<AdditionalItemState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/AdditionalItem/Get',payload);
            return reponse.data.result as AdditionalItem;
        }
    };
    mutations={
        setCurrentPage(state:AdditionalItemState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:AdditionalItemState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:AdditionalItemState,additionalItem:AdditionalItem){
            state.editAdditionalItem=additionalItem;
        }
    }
}
const additionalItemModule=new AdditionalItemModule();
export default additionalItemModule;