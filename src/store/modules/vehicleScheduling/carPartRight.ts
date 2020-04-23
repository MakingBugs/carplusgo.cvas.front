import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import CarPartRight from '../../entities/vehicleScheduling/carPartRight'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';
import ItemCode from '@/store/entities/public/itemCode'
import Util from '@/lib/util'

interface CarPartRightState extends ListState<CarPartRight>{
    editCarPartRight:CarPartRight;
    fromItemCodeList:Array<CarPartRight>;
}
class CarPartRightModule extends ListModule<CarPartRightState,any,CarPartRight>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<CarPartRight>(),
        loading:false,
        editCarPartRight:new CarPartRight(),
        fromItemCodeList: new Array<CarPartRight>(),
    }
    actions={
        async getAll(context:ActionContext<CarPartRightState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/CarPartRight/GetAll',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<CarPartRight>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
        },
        async getAllFromItemCode(context:ActionContext<CarPartRightState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/ItemCode/GetItemCodeByItemTypes',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<ItemCode>;
            context.state.fromItemCodeList = page.items.map(x=>{
                var carPartRight = new CarPartRight();
                carPartRight.oilID = x.num;
                carPartRight.selected = 0;
                carPartRight.oilType = 231;
                carPartRight.itemCode = x;
                return carPartRight;
            });
        },
        async create(context:ActionContext<CarPartRightState,any>,payload:any){
            await Ajax.post('/api/services/app/CarPartRight/Create',payload.data);
        },
        async update(context:ActionContext<CarPartRightState,any>,payload:any){
            await Ajax.post('/api/services/app/CarPartRight/Update',payload.data);
        },
        async delete(context:ActionContext<CarPartRightState,any>,payload:any){
            await Ajax.post('/api/services/app/CarPartRight/Delete',payload.data);
        },
        async get(context:ActionContext<CarPartRightState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/CarPartRight/Get',payload);
            return reponse.data.result as CarPartRight;
        }
    };
    mutations={
        setCurrentPage(state:CarPartRightState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:CarPartRightState,pagesize:number){
            state.pageSize=pagesize;
        },
        setfromItemCodeList(state:CarPartRightState,data:any){
            state.fromItemCodeList = state.fromItemCodeList.map(x=>{
                var temp = Util.extend(true,{},x);
                if(x.oilID===data.oilID){
                    temp.selected = data.value?1:0;
                }
                return temp;
            });
        },
        edit(state:CarPartRightState,carPartRight:CarPartRight){
            state.editCarPartRight=carPartRight;
        },
        editFromItemCodeList(state:CarPartRightState,carPartId:number){
            state.fromItemCodeList = state.fromItemCodeList.map(x=>{
                var carPartRight = new CarPartRight();
                var getCarPartRight = state.list.find(y=>y.carPartID===carPartId &&y.oilID === x.oilID)
                carPartRight.id = !!getCarPartRight?getCarPartRight.id:0;
                carPartRight.carPartID = carPartId;
                carPartRight.oilID = x.oilID;
                carPartRight.selected = !!getCarPartRight?getCarPartRight.selected:0;
                carPartRight.oilType = 231;
                carPartRight.itemCode = x.itemCode;
                return carPartRight;
            })
        }
    }
}
const carPartRightModule=new CarPartRightModule();
export default carPartRightModule;
