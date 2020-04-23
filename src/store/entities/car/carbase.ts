import Entity from '../entity'
import Brand from './brand';
import Clasen from './clasen';
import ItemCode from '../public/itemCode';
import FactoryBrand from './factorybrand';
import Inc from '../public/inc';
import Order from '../order/order';
import CreditProvince from '../public/creditProvince';
import CreditCity from '../public/creditCity';
import CreditArea from '../public/creditArea';

//车籍实体类
export default class CarBase extends Entity<number>{
    incAuto:number;//公司别
    inc:Inc;
    depAuto:number;	//保管單位
    sgAuto:number;	//倉庫別	
    km:number;	//里程數	int
    makNo:string;	//车牌号码	nvarchar
    makColor:string;	//车牌颜色	nvarchar
    linceNo:string;//	登记证号	nvarchar
    linceDt:Date;//	登记日期	datetime
    brandAuto:number;//	厂牌ID
    brand:Brand;//	厂牌
    clasenAuto:number;//	车型ID
    clasen:Clasen;//	车型
    clasenCode:string;//	车辆型号	nvarchar
    makDt:Date;//	领照日期	datetime
    cc:number;//	排气量	int
    percnt:number;//	座位数	int
    wheel:number;//	轮胎数	int
    carColor:string;//	车身颜色	nvarchar
    engNo:string;//	发动机号	nvarchar
    carNo:string//	车架号	nvarchar
    carDt:Date;//	出厂日期	datetime
    oil:number;//	燃油种类	int
    listPrice:number;//	牌价	decimal
    carType:number//	车辆性质	int
    clasenVer:string;//	配置版本	nvarchar
    manufacturer:number;//	制造厂商	bigint
    supplier:number;//	购入厂商	bigint
    createPlace:string;//	汽车产地	nvarchar
    useType:number;//	使用性质	int
    itemType:number;
    itemCode:ItemCode;
    category:number;//	车种	int
    insurePercnt:number;//	车险座位别	int
    isBusiness:number;//	车险性质别	int
    keyCount:number;//	备用钥匙	int
    usePlace:string;//	车辆使用地	nvarchar
    memo:string;//	备注	nvarchar
    isImport:number;//	进口车	int
    mtnFirst:number;//	首保	int
    mtnSecond:number;//	二保	int
    mtnCycle:number;//	定保	int
    yearCheckDT:Date;//	年审截止	datetime
    roadCheckDT:Date;//	养路费截止	datetime
    mtnFirstMonth:number;//	第一次保養月數	int
    mtnSecondMonth:number;//	第二次保養月數	int
    status:number;//	狀態	int
    cuser:number;//	建立人	int
    cdt:Date;//	建立時間	datetime
    muser:number;//	修改人	int
    mdt:Date;//	修改時間	datetime
    deptNo:string;//	會計部門序號	varchar
    getAmt:number;//	取得金額	decimal
    carTax:number;//	車輛購置稅	decimal
    accessary:number;//	配件總額	decimal
    carAmt:number;//	車輛總進價	decimal
    marketValue:number;//	目前市價	decimal
    marketDt:number;//	市價日期	datetime
    sellAmt:number;//	出售金額	decimal
    sellDt:Date;//	出售日期	datetime
    es:number;//	排放标准	int
    bstype:number;//	变速类型 	int
    jcdt:Date;//	交车日期	datetime
    bkdt:Date;//	拨款日期	datetime
    newBrand:string;
    newClasen:string;
    newFactory:string;
    factoryBrandAuto:number;//总厂牌ID
    factoryBrand:FactoryBrand;//总厂牌
    rentCarType:number;
    makStatus:number;
    sellInvoice:string;
    isYearCheck:number;	//是否在年审数据中显示(0:是；1：否)	int
    carTaxMode:number;
    ton:number;
    esremark:string;
    isEas:number;//	Eas固定资产卡片标志	int
    easAsstAct:number;//	EAS辅助账标志	int
    easCarbaseAuto:number;
    provinceCode:number;
    creditProvince:CreditProvince;
    cityCode:number;
    creditCity:CreditCity;
    areaCode:string;
    creditArea:CreditArea;
    order:Order;
}