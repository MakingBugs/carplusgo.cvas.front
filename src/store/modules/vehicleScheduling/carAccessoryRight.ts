import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import CarAccessoryRight from '../../entities/vehicleScheduling/carAccessoryRight'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';
import ItemCode from '@/store/entities/public/itemCode'
import Util from '@/lib/util'

interface CarAccessoryRightState extends ListState<CarAccessoryRight>{
    editCarAccessoryRight:CarAccessoryRight;
    fromItemCodeList:Array<CarAccessoryRight>;
}
class CarAccessoryRightModule extends ListModule<CarAccessoryRightState,any,CarAccessoryRight>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<CarAccessoryRight>(),
        loading:false,
        editCarAccessoryRight:new CarAccessoryRight(),
        fromItemCodeList: new Array<CarAccessoryRight>(),
    }
    actions={
        async getAll(context:ActionContext<CarAccessoryRightState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/CarAccessoryRight/GetAll',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<CarAccessoryRight>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
        },
        async getAllFromItemCode(context:ActionContext<CarAccessoryRightState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/ItemCode/GetItemCodeByItemTypes',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<ItemCode>;
            context.state.fromItemCodeList = page.items.map(x=>{
                var carAccessoryRight = new CarAccessoryRight();
                carAccessoryRight.oilID = x.num;
                carAccessoryRight.selected = 0;
                carAccessoryRight.oilType = 231;
                carAccessoryRight.itemCode = x;
                return carAccessoryRight;
            });
        },
        async create(context:ActionContext<CarAccessoryRightState,any>,payload:any){
            await Ajax.post('/api/services/app/CarAccessoryRight/Create',payload.data);
        },
        async update(context:ActionContext<CarAccessoryRightState,any>,payload:any){
            await Ajax.post('/api/services/app/CarAccessoryRight/Update',payload.data);
        },
        async delete(context:ActionContext<CarAccessoryRightState,any>,payload:any){
            await Ajax.post('/api/services/app/CarAccessoryRight/Delete',payload.data);
        },
        async get(context:ActionContext<CarAccessoryRightState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/CarAccessoryRight/Get',payload);
            return reponse.data.result as CarAccessoryRight;
        }
    };
    mutations={
        setCurrentPage(state:CarAccessoryRightState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:CarAccessoryRightState,pagesize:number){
            state.pageSize=pagesize;
        },
        setfromItemCodeList(state:CarAccessoryRightState,data:any){
            state.fromItemCodeList = state.fromItemCodeList.map(x=>{
                var temp = Util.extend(true,{},x);
                if(x.oilID===data.oilID){
                    temp.selected = data.value?1:0;
                }
                return temp;
            });
        },
        edit(state:CarAccessoryRightState,carAccessoryRight:CarAccessoryRight){
            state.editCarAccessoryRight=carAccessoryRight;
        },
        editFromItemCodeList(state:CarAccessoryRightState,carAccessoryId:number){
            state.fromItemCodeList = state.fromItemCodeList.map(x=>{
                var carAccessoryRight = new CarAccessoryRight();
                var getCarAccessoryRight = state.list.find(y=>y.carAccessoryID===carAccessoryId &&y.oilID === x.oilID)
                carAccessoryRight.id = !!getCarAccessoryRight?getCarAccessoryRight.id:0;
                carAccessoryRight.carAccessoryID = carAccessoryId;
                carAccessoryRight.oilID = x.oilID;
                carAccessoryRight.selected = !!getCarAccessoryRight?getCarAccessoryRight.selected:0;
                carAccessoryRight.oilType = 231;
                carAccessoryRight.itemCode = x.itemCode;
                return carAccessoryRight;
            })
        }
    }
}
const carAccessoryRightModule=new CarAccessoryRightModule();
export default carAccessoryRightModule;
