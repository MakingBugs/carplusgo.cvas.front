import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import RepositoryOutCertificate from '../../entities/vehicleScheduling/repositoryOutCertificate'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface RepositoryOutCertificateState extends ListState<RepositoryOutCertificate>{
    editRepositoryOutCertificate:RepositoryOutCertificate;
}
class RepositoryOutCertificateModule extends ListModule<RepositoryOutCertificateState,any,RepositoryOutCertificate>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<RepositoryOutCertificate>(),
        loading:false,
        editRepositoryOutCertificate:new RepositoryOutCertificate(),
    }
    actions={
        async getAll(context:ActionContext<RepositoryOutCertificateState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/RepositoryOutCertificate/GetAll',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<RepositoryOutCertificate>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
        },
        async create(context:ActionContext<RepositoryOutCertificateState,any>,payload:any){
            await Ajax.post('/api/services/app/RepositoryOutCertificate/Create',payload.data);
        },
        async update(context:ActionContext<RepositoryOutCertificateState,any>,payload:any){
            await Ajax.post('/api/services/app/RepositoryOutCertificate/Update',payload.data);
        },
        async delete(context:ActionContext<RepositoryOutCertificateState,any>,payload:any){
            await Ajax.post('/api/services/app/RepositoryOutCertificate/Delete',payload.data);
        },
        async get(context:ActionContext<RepositoryOutCertificateState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/RepositoryOutCertificate/Get',payload);
            return reponse.data.result as RepositoryOutCertificate;
        }
    };
    mutations={
        setCurrentPage(state:RepositoryOutCertificateState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:RepositoryOutCertificateState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:RepositoryOutCertificateState,repositoryOutCertificate:RepositoryOutCertificate){
            state.editRepositoryOutCertificate=repositoryOutCertificate;
        }
}
}
const repositoryOutCertificateModule=new RepositoryOutCertificateModule();
export default repositoryOutCertificateModule;
