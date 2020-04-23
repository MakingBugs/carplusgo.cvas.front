import {Store,Module,ActionContext} from 'vuex' 
import ListModule from '../list-module' 
import ListState from '../list-state' 
import Ajax from '../../../lib/ajax' 
import Excel from '../../../lib/excel' 
import PageResult from '@/store/entities/page-result'
 
interface MobileOrderState extends ListState<any>{ 
    exportLoading:boolean
} 
class MobileOrderModule extends ListModule<MobileOrderState,any,any>{ 
    state={ 
        totalCount:0, 
        currentPage:1, 
        pageSize:10, 
        list: new Array<any>(), 
        loading:false, 
        exportLoading:false,
    } 
    actions={ 
        async getAll(context:ActionContext<MobileOrderState,any>,payload:any){ 
            context.state.loading=true; 
            let reponse=await Ajax.post('/api/services/app/MobileOrder/GetAll',payload.data); 
            context.state.loading=false; 
            let page=reponse.data.result as PageResult<any>; 
            context.state.totalCount=page.totalCount; 
            context.state.list=page.items; 
        }, 
        async exportAll(context:ActionContext<MobileOrderState,any>,payload:any){ 
            context.state.exportLoading=true; 
            let reponse=await Ajax.post('/api/services/app/MobileOrder/ExportAll',payload.data.pagerequest); 
            let page=reponse.data.result as PageResult<any>;
            let params = { 
                title: payload.data.columns.map(value=>value.title), 
                key: payload.data.columns.map(value=>value.key), 
                data: page.items, 
                autoWidth: true, 
                filename: "订单数据" 
            }; 
            Excel.export_array_to_excel(params) 
            context.state.exportLoading=false; 
        } 
    }; 
    mutations={ 
        setCurrentPage(state:MobileOrderState,page:number){ 
            state.currentPage=page; 
        }, 
        setPageSize(state:MobileOrderState,pagesize:number){ 
            state.pageSize=pagesize; 
        } 
    } 
} 
const mobileOrderModule=new MobileOrderModule(); 
export default mobileOrderModule;