import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import app from './modules/app'
import session from './modules/session'
import account from './modules/account'
import user from './modules/user'
import role from './modules/role'
import tenant from './modules/tenant'
import accountingTitle from './modules/finance/accounting/accountingTitle'
import accountingEntryConfig from './modules/finance/accounting/accountingEntryConfig'
import insuranceType from './modules/insure/insuranceType'
import insurancePreset from './modules/insure/insurancePreset'
import insuranceApproval from './modules/insure/insuranceApproval'
import insuranceDetail from './modules/insure/insuranceDetail'
import insurancePolicy from './modules/insure/insurancePolicy'
import itemCode from './modules/public/itemCode'
import supplier from './modules/public/supplier'
import tradeItem from './modules/public/tradeItem'
import accessoriesMainType from './modules/accessories/accessoriesMainType'
import accessoriesType from './modules/accessories/accessoriesType'
import accessoriesTs from './modules/accessories/accessoriesTs'
import orders from './modules/orders/orders'
import accessoriesWork from './modules/accessories/accessoriesWork'
import factorybrand from './modules/car/factorybrand'
import clasen from './modules/car/clasen'
import brand from './modules/car/brand'
import request from './modules/accessories/request'
import accessories from './modules/accessories/accessories'
import carRepair from './modules/carfix/carRepair'
import inc from './modules/public/inc'
import additionalItem from './modules/carfix/additionalItem'
import carFix from './modules/carfix/carFix'
import ordersfeetype from './modules/ordersfeetype/ordersfeetype'
import bankType from './modules/public/bankType'
import carFixItem from './modules/carfix/carFixItem'
import lKRTotal from './modules/public/lKRTotal'
import bankDetail from './modules/public/bankDetail'
import carbase from './modules/car/carbase'
import contect from './modules/public/contect'
import supplierContect from './modules/public/supplierContect'
import accBank from './modules/public/accBank'
import creditProvince from './modules/public/creditProvince'
import creditCity from './modules/public/creditCity'
import creditArea from './modules/public/creditArea'
import carFixBatch from './modules/carfix/carFixBatch'
import carFixBatchT from './modules/carfix/carFixBatchT'
import cxlp from './modules/carInsurance/cxlp'
import mobileOrder from './modules/mobile/mobileOrder'
import operationTarget from './modules/mobile/operationTarget'
import targetConfig from './modules/mobile/targetConfig'
import prinv from './modules/public/prinv'
import prinvLink from './modules/public/prinvLink'
import fileUpload from './modules/public/fileUpload'
import readyBPM from './modules/public/readyBPM'
import rrlkr from './modules/carInsurance/rrlkr'
import cxlpMaterial from './modules/carInsurance/cxlpMaterial'
import cxlpDZF from './modules/carInsurance/cxlpDZF'
import cxlpRecord from './modules/carInsurance/cxlpRecord'
import cxlpFee from './modules/carInsurance/cxlpFee'
import cxlpPFDetail from './modules/carInsurance/cxlpPFDetail'
import cxlpSupplement from './modules/carInsurance/cxlpSupplement'
import customer from './modules/public/customer'
import insure2 from './modules/insure/insure2'
import carMemo from './modules/car/carMemo'
import location from './modules/vehicleScheduling/location'
import locationManager from './modules/vehicleScheduling/locationManager'
import repository from './modules/vehicleScheduling/repository'
import repositoryManager from './modules/vehicleScheduling/repositoryManager'
import vEmp from './modules/public/vEmp'
import unit from './modules/public/unit'
import useCarApply from './modules/vehicleScheduling/useCarApply'
import carCertificate from './modules/vehicleScheduling/carCertificate'
import carCertificateRight from './modules/vehicleScheduling/carCertificateRight'
import carAccessory from './modules/vehicleScheduling/carAccessory'
import carAccessoryRight from './modules/vehicleScheduling/carAccessoryRight'
import carPart from './modules/vehicleScheduling/carPart'
import carPartRight from './modules/vehicleScheduling/carPartRight'
import takeCar from './modules/vehicleScheduling/takeCar'
import takeCarApply from './modules/vehicleScheduling/takeCarApply'
import repositoryOut from './modules/vehicleScheduling/repositoryOut'
import repositoryOutAccessory from './modules/vehicleScheduling/repositoryOutAccessory'
import repositoryOutCarPart from './modules/vehicleScheduling/repositoryOutCarPart'
import repositoryOutCertificate from './modules/vehicleScheduling/repositoryOutCertificate'
import repositoryOutFile from './modules/vehicleScheduling/repositoryOutFile'

const store = new Vuex.Store({
    state: {
        //
    },
    mutations: {
        //
    },
    actions: {

    },
    modules: {
        app,
        session,
        account,
        user,
        role,
        tenant,
        accountingTitle,
        accountingEntryConfig,
        insuranceType,
        insurancePreset,
        insuranceApproval,
        insuranceDetail,
        insurancePolicy,
        itemCode,
        supplier,
        tradeItem,
        accessoriesMainType,
        accessoriesType,
        accessoriesTs,
        factorybrand,
        clasen,
        brand,
        orders,
        accessoriesWork,
        request,
        accessories,
        carRepair,
        inc,
        additionalItem,
        carFix,
        ordersfeetype,
        bankType,
        carFixItem,
        lKRTotal,
        bankDetail,
        carbase,
        creditProvince,
        creditCity,
        creditArea,
        carFixBatch,
        carFixBatchT,
        cxlp,
        mobileOrder,
        operationTarget,
        targetConfig,
        prinv,
        prinvLink,
        contect,
        supplierContect,
        accBank,
        fileUpload,
        readyBPM,
        rrlkr,
        cxlpMaterial,
        cxlpDZF,
        cxlpRecord,
        cxlpFee,
        cxlpPFDetail,
        cxlpSupplement,
        customer,
        insure2,
        carMemo,
        location,
        locationManager,
        vEmp,
        unit,
        useCarApply,
        repository,
        repositoryManager,
        carCertificate,
        carCertificateRight,
        carAccessory,
        carAccessoryRight,
        carPart,
        carPartRight,
        takeCar,
        takeCarApply,
        repositoryOut,
        repositoryOutAccessory,
        repositoryOutCarPart,
        repositoryOutCertificate,
        repositoryOutFile,
    }
});
export default store;