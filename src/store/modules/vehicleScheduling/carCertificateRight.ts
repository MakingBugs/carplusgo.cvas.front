import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import CarCertificateRight from '../../entities/vehicleScheduling/carCertificateRight'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';
import ItemCode from '@/store/entities/public/itemCode'
import Util from '@/lib/util'

interface CarCertificateRightState extends ListState<CarCertificateRight>{
    editCarCertificateRight:CarCertificateRight;
    fromItemCodeList:Array<CarCertificateRight>;
}
class CarCertificateRightModule extends ListModule<CarCertificateRightState,any,CarCertificateRight>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<CarCertificateRight>(),
        loading:false,
        editCarCertificateRight:new CarCertificateRight(),
        fromItemCodeList: new Array<CarCertificateRight>(),
    }
    actions={
        async getAll(context:ActionContext<CarCertificateRightState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/CarCertificateRight/GetAll',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<CarCertificateRight>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
        },
        async getAllFromItemCode(context:ActionContext<CarCertificateRightState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/ItemCode/GetItemCodeByItemTypes',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<ItemCode>;
            context.state.fromItemCodeList = page.items.map(x=>{
                var carCertificateRight = new CarCertificateRight();
                carCertificateRight.oilID = x.num;
                carCertificateRight.selected = 0;
                carCertificateRight.oilType = 231;
                carCertificateRight.itemCode = x;
                return carCertificateRight;
            });
        },
        async create(context:ActionContext<CarCertificateRightState,any>,payload:any){
            await Ajax.post('/api/services/app/CarCertificateRight/Create',payload.data);
        },
        async update(context:ActionContext<CarCertificateRightState,any>,payload:any){
            await Ajax.post('/api/services/app/CarCertificateRight/Update',payload.data);
        },
        async delete(context:ActionContext<CarCertificateRightState,any>,payload:any){
            await Ajax.post('/api/services/app/CarCertificateRight/Delete',payload.data);
        },
        async get(context:ActionContext<CarCertificateRightState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/CarCertificateRight/Get',payload);
            return reponse.data.result as CarCertificateRight;
        }
    };
    mutations={
        setCurrentPage(state:CarCertificateRightState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:CarCertificateRightState,pagesize:number){
            state.pageSize=pagesize;
        },
        setfromItemCodeList(state:CarCertificateRightState,data:any){
            state.fromItemCodeList = state.fromItemCodeList.map(x=>{
                var temp = Util.extend(true,{},x);
                if(x.oilID===data.oilID){
                    temp.selected = data.value?1:0;
                }
                return temp;
            });
        },
        edit(state:CarCertificateRightState,carCertificateRight:CarCertificateRight){
            state.editCarCertificateRight=carCertificateRight;
        },
        editFromItemCodeList(state:CarCertificateRightState,carCertificateId:number){
            state.fromItemCodeList = state.fromItemCodeList.map(x=>{
                var carCertificateRight = new CarCertificateRight();
                var getCarCertificateRight = state.list.find(y=>y.carCertificateID===carCertificateId &&y.oilID === x.oilID)
                carCertificateRight.id = !!getCarCertificateRight?getCarCertificateRight.id:0;
                carCertificateRight.carCertificateID = carCertificateId;
                carCertificateRight.oilID = x.oilID;
                carCertificateRight.selected = !!getCarCertificateRight?getCarCertificateRight.selected:0;
                carCertificateRight.oilType = 231;
                carCertificateRight.itemCode = x.itemCode;
                return carCertificateRight;
            })
        }
    }
}
const carCertificateRightModule=new CarCertificateRightModule();
export default carCertificateRightModule;
