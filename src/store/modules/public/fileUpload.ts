import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import FileUpload from '../../entities/public/fileUpload'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface FileUploadState extends ListState<FileUpload>{
    editFileUpload:FileUpload;
}
class FileUploadModule extends ListModule<FileUploadState,any,FileUpload>{//收款人信息表
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<FileUpload>(),
        loading:false,
        editFileUpload:new FileUpload()
    }
    actions={
        async getAll(context:ActionContext<FileUploadState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/FileUpload/GetAll',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<FileUpload>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
            return page;
        },
        async create(context:ActionContext<FileUploadState,any>,payload:any){
            await Ajax.post('/api/services/app/FileUpload/Create',payload.data);
        },
        async update(context:ActionContext<FileUploadState,any>,payload:any){
            await Ajax.post('/api/services/app/FileUpload/Update',payload.data);
        },
        async delete(context:ActionContext<FileUploadState,any>,payload:any){
            await Ajax.post('/api/services/app/FileUpload/Delete',payload.data);
        },
        async get(context:ActionContext<FileUploadState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/FileUpload/Get',payload);
            return reponse.data.result as FileUpload;
        },
        async SaveBPMFile(context:ActionContext<FileUploadState,any>,payload:any){
            await Ajax.post('/api/services/app/FileUpload/SaveBPMFile',payload.data);
        }
    };
    mutations={
        setCurrentPage(state:FileUploadState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:FileUploadState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:FileUploadState,fileUpload:FileUpload){
            state.editFileUpload=fileUpload;
        }
    }
}
const fileUploadModule=new FileUploadModule();
export default fileUploadModule;