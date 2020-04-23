import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import CarBase from '../../entities/car/carbase'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface CarBaseState extends ListState<CarBase>{
    editCarBase:CarBase;
    selectList:Array<CarBase>;
    selectLoading:Boolean;
}
class CarBaseModule extends ListModule<CarBaseState,any,CarBase>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<CarBase>(),
        selectList: new Array<CarBase>(),
        loading:false,
        selectLoading:false,
        editCarBase:new CarBase(),
    }
    actions={
      async getAll(context:ActionContext<CarBaseState,any>,payload:any){
        context.state.loading=true;
        let reponse=await Ajax.post('/api/services/app/CarBase/GetAll',payload.data);
        context.state.loading=false;
        let page=reponse.data.result as PageResult<CarBase>;
        context.state.totalCount=page.totalCount;
        context.state.list=page.items;
        return page;
      },
      async SelectCarBase(context:ActionContext<CarBaseState,any>,payload:any){
        context.state.loading=true;
        let reponse=await Ajax.post('/api/services/app/CarBase/SelectCarBase',payload.data);
        context.state.loading=false;
        let page=reponse.data.result as PageResult<CarBase>;
        context.state.totalCount=page.totalCount;
        context.state.list=page.items;
        return page;
      },
      async SelectCarByJurisdiction(context:ActionContext<CarBaseState,any>,payload:any){
        context.commit('updatestate',{loading:true})
        let reponse=await Ajax.post('/api/services/app/CarBase/SelectCarByJurisdiction',payload.data);
        context.commit('updatestate',{loading:false})
        let page=reponse.data.result as PageResult<CarBase>;
        context.commit('updatestate',{totalCount:page.totalCount})
        context.state.list=page.items;
        return page;
      },
      async selectAll(context:ActionContext<CarBaseState,any>,payload:any){
        context.state.selectLoading=true;
        let reponse=await Ajax.post('/api/services/app/CarBase/SelectCarBase',payload.data);
        context.state.selectLoading=false;
        let page=reponse.data.result as PageResult<CarBase>;
        context.state.selectList=page.items;
      },
      async SelectMaxCarBaseId(context:ActionContext<CarBaseState,any>,payload:any){
        context.state.loading=true;
        let reponse=await Ajax.post('/api/services/app/CarBase/SelectMaxCarBaseId',payload.data);
        context.state.loading=false;
        let page=reponse.data.result as PageResult<CarBase>;
        context.state.totalCount=page.totalCount;
        context.state.list=page.items;
        return page;
      },
      async createAll(context:ActionContext<CarBaseState,any>,payload:any){
        await Ajax.post('/api/services/app/CarBase/CreateAll',payload.data);
      },
      async create(context:ActionContext<CarBaseState,any>,payload:any){
        await Ajax.post('/api/services/app/CarBase/Create',payload.data);
      },
      async update(context:ActionContext<CarBaseState,any>,payload:any){
        await Ajax.post('/api/services/app/CarBase/Update',payload.data);
      },
      async delete(context:ActionContext<CarBaseState,any>,payload:any){
        await Ajax.post('/api/services/app/CarBase/Delete',payload.data);
      },
      async get(context:ActionContext<CarBaseState,any>,payload:any){
        let reponse=await Ajax.post('/api/services/app/CarBase/Get',payload);
        return reponse.data.result as CarBase;
      }
    };
    mutations={
        setCurrentPage(state:CarBaseState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:CarBaseState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:CarBaseState,carBase:CarBase){
            state.editCarBase=carBase;
        },
        /*
        修改 state 所用方法，payload 参数为 要修改的字段对象，格式为：
                {
                    要修改的state ：要传入的值，
                    ...
                }
        注意：此方法只支持传入一级对象，不支持多级。
        */
      updatestate(state:CarBaseState,payload:any){
        Object.keys(payload).map(j=>{
            state[j]=payload[j]
        })
      }
    }
}
const carBaseModule=new CarBaseModule();
export default carBaseModule;