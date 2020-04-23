import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import CarCertificate from '../../entities/vehicleScheduling/carCertificate'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface CarCertificateState extends ListState<CarCertificate>{
    editCarCertificate:CarCertificate;
}
class CarCertificateModule extends ListModule<CarCertificateState,any,CarCertificate>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<CarCertificate>(),
        loading:false,
        editCarCertificate:new CarCertificate(),
    }
    actions={
        async getAll(context:ActionContext<CarCertificateState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/CarCertificate/GetAll',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<CarCertificate>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
        },
        async create(context:ActionContext<CarCertificateState,any>,payload:any){
            await Ajax.post('/api/services/app/CarCertificate/Create',payload.data);
        },
        async update(context:ActionContext<CarCertificateState,any>,payload:any){
            await Ajax.post('/api/services/app/CarCertificate/Update',payload.data);
        },
        async delete(context:ActionContext<CarCertificateState,any>,payload:any){
            await Ajax.post('/api/services/app/CarCertificate/Delete',payload.data);
        },
        async get(context:ActionContext<CarCertificateState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/CarCertificate/Get',payload);
            return reponse.data.result as CarCertificate;
        }
    };
    mutations={
        setCurrentPage(state:CarCertificateState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:CarCertificateState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:CarCertificateState,carCertificate:CarCertificate){
            state.editCarCertificate=carCertificate;
        }
}
}
const carCertificateModule=new CarCertificateModule();
export default carCertificateModule;
