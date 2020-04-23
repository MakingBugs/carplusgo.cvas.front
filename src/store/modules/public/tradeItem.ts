import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import TradeItem from '../../entities/public/tradeItem'
import Ajax from '@/lib/ajax'
import PageResult from '@/store/entities/page-result';

interface TradeItemState extends ListState<TradeItem>{
    editTradeItem:TradeItem;
    selectList:Array<TradeItem>
    selectLoading:boolean
}
class TradeItemModule extends ListModule<TradeItemState,any,TradeItem>{//对象档
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<TradeItem>(),
        loading:false,
        editTradeItem:new TradeItem(),
        selectList:new Array<TradeItem>(),
        selectLoading:false,
    }
    actions={
        async getAll(context:ActionContext<TradeItemState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.post('/api/services/app/TradeItem/GetAll',payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<TradeItem>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
        },
        async getSelectAll(context:ActionContext<TradeItemState,any>,payload:any){
            context.state.selectLoading=true;
            let reponse=await Ajax.post('/api/services/app/TradeItem/GetAll',payload.data);
            context.state.selectLoading=false;
            let page=reponse.data.result as PageResult<TradeItem>;
            context.state.selectList=page.items;
        },
        async create(context:ActionContext<TradeItemState,any>,payload:any){
            await Ajax.post('/api/services/app/TradeItem/Create',payload.data);
        },
        async update(context:ActionContext<TradeItemState,any>,payload:any){
            await Ajax.post('/api/services/app/TradeItem/Update',payload.data);
        },
        async get(context:ActionContext<TradeItemState,any>,payload:any){
            let reponse=await Ajax.post('/api/services/app/TradeItem/Get',payload);
            return reponse.data.result as TradeItem;
        }
    };
    mutations={
        setCurrentPage(state:TradeItemState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:TradeItemState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:TradeItemState,tradeItem:TradeItem){
            state.editTradeItem=tradeItem;
        }
    }
}
const tradeItemModule=new TradeItemModule();
export default tradeItemModule;