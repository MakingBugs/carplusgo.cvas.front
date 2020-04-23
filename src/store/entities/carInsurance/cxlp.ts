import Entity from '../entity'
import CarBase from '../car/carbase';
import Order from '../order/order';
import ItemCode from '../public/itemCode';
import InsurancePolicy from '../insure/insurancePolicy';

export default class CXLP extends Entity<number>{
    cxlpNO:string;	        //出险编号	nvarchar
    makNO:string;	        //车号	nchar
    caseTime:Date;	        //出险时间	datetime
    caseAddr:string;	    //出险地点	nvarchar
    driver:string;	        //驾驶人	nvarchar
    reporter:string;	    //报案人	nvarchar
    phone1:string;	        //电话1	nvarchar
    phone2:string;	        //电话2	nvarchar
    lossValue:number;	    //划痕、玻璃单碎、其他	int
    lossOtherRemark:string;	//划痕、玻璃单碎、其他的备注	nvarchar
    caseType:number;	    //案件类别	int
    caseStatus:number;	    //案件处理状态	int
    insureNo:string;	    //保险单号	nvarchar
    accidentType:number;	//事故类型	int
    isInjured:number;	    //是否人伤	int
    qjdbRemark:string;	    //缺件待补备注	nvarchar
    suser:string;	        //送件人	varchar
    sdt:Date;	            //送件时间	datetime
    sRemark:string;	        //送件说明	nvarchar
    accountName:string;	    //账户名称	varchar
    acountBank:string;	    //开户行	varchar
    bankAccount:string;	    //银行账号	varchar
    zfContractors:number;	//转付承办人	int
    zfdt:Date;	            //转付日期	datetime
    causeType:number;	    //肇责情况	int
    jfNeedFile:number;	    //警方应备文件	bigint
    jfMakeFile:number;	    //警方已交文件	bigint
    jfNeedFileNum:number;	//警方应备文件数量	bigint
    jfMakeFileNum:number;	//警方已交文件数量	bigint
    wfNeedFile:number;	    //我方应备文件	bigint
    wfMakeFile:number;	    //我方已交文件	bigint
    wfNeedFileNum:number;	//我方应备文件数量	bigint
    wfMakeFileNum:number;	//我方已交文件数量	bigint
    tijiaoren:string;	    //资料提交人	nvarchar
    tijiaoDT:Date;	        //资料提交日期	datetime
    jieshouren:string;	    //资料接收人	nvarchar
    jieshouDT:Date;	        //资料接收日期	datetime
    insurePFAmount:string;	//交强险赔付金额	decimal
    insureDPFAmount:string;	//商业险赔付金额	decimal
    sspfRemark:string;	    //损失赔付备注	nvarchar
    insureDZAmount:string;	//交强险到账金额	decimal
    insureDZDT:Date;	    //交强险到账日期	datetime
    insureDZAccount:string;	//交强险到账账户	nvarchar
    insureDDZAmount:string;	//商业险到账金额	decimal
    insureDDZDT:Date;	    //商业险到账日期	datetime
    insureDDZAccount:string;//商业险到账账户	nvarchar
    dzfpfAmount:string;	    //对肇方赔付金额	decimal
    dzfpfDT:Date;	        //对肇方赔付日期	datetime
    dzpfRemark:string;	    //到账赔付备注	nvarchar
    querenAmount:string;	//确认金额	decimal
    daoZhangDT:Date;	    //到帐日	datetime
    zhuanFuType:number;	    //转付方式	int
    zhuanFuDT:Date;	        //转付日期	datetime
    shouKuanRen:string;	    //收款人	nvarchar
    shouKuanRenID:string;	//收款认证	nvarchar
    shouKuanFang:string;	//收款方	nvarchar
    shouKuanBank:string;	//收款方开户银行	nvarchar
    shouKuanAccount:string;	//收款方账号	nvarchar
    status:number;	        //案件状态(暂存、审核中、审核完毕、驳回等)	int
    cuser:number;	        //建立人	bigint
    cdt:Date;	            //建立时间	datetime
    muser:number;	        //修改人	bigint
    mdt:Date;	            //修改时间	datetime
    yiJueDT:Date;	        //已决日期	datetime
    tjclFile:number;	    //提交材料value之和	bigint
    tjclNum:number;	        //提交材料数量	bigint
    qjdbFile:number;	    //缺件待补value之和	bigint
    qjdbNum:number;	        //缺件待补数量	bigint
    hh:string;	            //提交时间之时	char
    mm:string;	            //提交时间之分	char
    wfPercent:string;	    //我方负百分比	nchar
    orderauto:number;	    //order_auto	bigint
    endDT:Date;	            //EndDT	datetime
    insureAuto:number;	    //Insure_Auto	bigint
    carBaseAuto:number;	    //CarBase_Auto	bigint
    requestStatus:number;	//RequestStatus	int
    requestDT:Date;	        //RequestDT	datetime
    requestUser:number;	    //RequestUser	bigint
    isTrn:number;	        //IsTrn	int
    lossValueN:number;	    //LossValueN	int
    csic:number;
    ctic:number;
    carBase:CarBase;
    insurancePolicy:InsurancePolicy;
    order:Order;
    caseStatusItemCode:ItemCode;
    CaseTypeItemCode:ItemCode;
}