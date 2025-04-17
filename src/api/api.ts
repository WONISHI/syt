//@ts-ignore
import request from "@/utils/axios.ts";
import type {
  HospitalResponseData,
  HospitalLevelAndRegionResponseData,
  HospitalInfo,
  HospitalDetail,
  DeparmentResponseData,
  LoginParams,
  UserLoginInfo,
  WXloginResponseData,
  HospitalWordData,
  DoctorResponseData,
  UserResponseData,
  DoctorInfoData,
  submitOrder,
  OrderResponseData,
  Qrcode,
  PayResult,
  UserInfoResponseData,
  CertationTypeResponseData,
  UserOrderInfoResponseData,
  AlluserResponseData,
  AllOrderStateResponseDate,
  AddOrUpdateUser
} from "@/api/type.ts";
enum API {
  //获取已有的医院的数据接口地址
  HOSPITAL_URL = "/hosp/hospital/",
  //获取医院等级与地区的接口
  HOSPITALLEVELANDERGION_URL = "/cmn/dict/findByDictCode/",
  //根据关键字医院的名字获取数据
  HOSPITALINFO_URL = "/hosp/hospital/findByHosname/",
  //医院详情
  HOSPIALTATL_URL = "/hosp/hospital/",
  // 获取某个医院科室的接口
  HOSPITALDEPARMENT_URL = "/hosp/hospital/department/",
  // 获取验证码接口
  GETUSERCODE_URL = "/sms/send/",
  // 用户登录信息
  USERLOGIN_URL = '/user/login',
  //获取微信登录需要的参数
  WXLOGIN_URL = '/user/weixin/getLoginParam',
  //获取可预约排班数据
  REGISTERED_ROOM = '/hosp/hospital/auth/getBookingScheduleRule/',
  //获取医院某一天的排班时间
  HOSPITALDOCTOR_URL = '/hosp/hospital/auth/findScheduleList/',
  //获取某一账号下就诊人的信息
  GETUSER_URL = '/user/patient/auth/findAll',
  //获取挂号医生的信息
  GEIDOCTOR_URL = '/hosp/hospital/getSchedule/',
  //提交订单，获取订单号码接口
  SUBMITORDER_URL = '/order/orderInfo/auth/submitOrder/',
  //获取订单详情的方法
  GETORDERINFO_URL = '/order/orderInfo/auth/getOrderInfo/',
  //取消订单的接口
  ORDERCANCEL_URL = '/order/orderInfo/auth/cancelOrder/',
  //获取支付订单二维码接口
  QRCODE_URL = '/order/weixin/creatNative/',
  //查询订单支付的结果
  PAYRESULT_URL = '/order/weixin/queryPayStatus/',
  //获取当前账号用户信息
  USERINFO_URL = '/user/auth/getUserInfo',
  //获取证件的类型的接口地址
  CERIFICATIONTYPE_URL = '/cmn/dict/findByDictCode/',
  //用户认证的结构
  USERCERTATION_URL = '/user/auth/userAuah',
  //获取用户订单号的数据
  USERORDERINFO_URL = '/order/orderInfo/auth/',
  //获取全部就诊人的信息
  ALLUSER_URL = '/user/patient/auth/findAll',
  //获取订单的状态数据
  ORDERSTATE_URL = '/order/orderInfo/auth/getStatusList',
  //获取城市的数据
  CITY_URL = '/cmn/dict/findByParentId/',
  //新增就诊人接口
  ADDUSER_URL = '/user/patient/auth/save',
  //更新已有的就诊人接口
  UPPATEUSER_URL = '/user/patient/auth/update',
  //删除已有的就诊人
  DELETEUSER_URL='/user/patient/auth/remove/'
}
//获取已有的医院的数据接口地址
export const reqHospital = (
  page: number,
  limit: number,
  hostype = "",
  districtCode = ""
) =>
  request.get<any, HospitalResponseData>(
    API.HOSPITAL_URL +
    `${page}/${limit}?hostype=${hostype}&districtCode=${districtCode}`
  );
//获取医院等级与地区的接口
export const reqHospitalLevalAndRegion = (dictCode: string) =>
  request.get<any, HospitalLevelAndRegionResponseData>(
    API.HOSPITALLEVELANDERGION_URL + `${dictCode}`
  );

//根据关键字医院的名字获取数据
export const reqHospitalInfo = (hosname: string) =>
  request.get<any, HospitalInfo>(API.HOSPITALINFO_URL + `${hosname}`);

//获取医院详情
export const reqHospitalDetail = (hoscode: string) =>
  request.get<any, HospitalDetail>(API.HOSPIALTATL_URL + hoscode);

// 获取某个医院科室的接口
export const reqHospitalDeparment = (hoscode: string) =>
  request.get<any, DeparmentResponseData>(API.HOSPITALDEPARMENT_URL + hoscode);

// 获取验证码接口
export const reqCode = (phone: string) =>
  request.get<any>(API.GETUSERCODE_URL + phone);

//用户登录信息
export const reqUser = (data: LoginParams) => request.post<any, UserLoginInfo>(API.USERLOGIN_URL, data)
//获取微信扫码登录生成二维码需要参数接口
export const reqweiLogin = (wxRedirectUri: string) => request.get<any, WXloginResponseData>(API.WXLOGIN_URL + `?wxRedirectUri=${wxRedirectUri}`)
//获取可预约排班数据
export const getBookingScheduleRule = (page: number, limit: number, hoscode: string, depcode: string) => request.get<any, HospitalWordData>(API.REGISTERED_ROOM + `${page}/${limit}/${hoscode}/${depcode}`)
//获取医院某一天的排班时间
export const gethospitaldoctor = (hoscode: string, depcode: string, workDate: string) => request.get<any, DoctorResponseData>(API.HOSPITALDOCTOR_URL + `${hoscode}/${depcode}/${workDate}`)
//获取某一账号下就诊人的信息
export const getuserdoc = () => request.get<any, UserResponseData>(API.GETUSER_URL)
//获取挂号医生的信息
export const reqDdoctorInfo = (scheduleId: string) => request.get<any, DoctorInfoData>(API.GEIDOCTOR_URL + scheduleId)
//提交订单，获取订单号码接口
export const reqSubmitOrder = (hoscode: string, scheduleId: string, patientId: string) => request.post<any, submitOrder>(API.SUBMITORDER_URL + `${hoscode}/${scheduleId}/${patientId}`)
//获取订单详情的方法
export const reqOrderInfo = (id: string) => request.get<any, OrderResponseData>(API.GETORDERINFO_URL + id)
//取消订单的接口
export const reqCancelOrder = (id: string) => request.get<any>(API.ORDERCANCEL_URL + id)
//获取支付订单二维码接口
export const reqQrcode = (orderId: string) => request.get<any, Qrcode>(API.QRCODE_URL + orderId)
//查询订单支付的结果
export const reqQueryPayState = (orderId: string) => request.get<any, PayResult>(API.PAYRESULT_URL + orderId)
//获取当前账号用户信息
export const reqUserinfo = () => request.get<any, UserInfoResponseData>(API.USERINFO_URL)
//获取证件的类型的接口地址
export const reqCertationType = (CertificatesType = 'CertificatesType') => request.get<any, CertationTypeResponseData>(API.CERIFICATIONTYPE_URL + CertificatesType)
//用户认证的结构
export const reqUserCertation = (data: any) => request.post<any, any>(API.USERCERTATION_URL, data)
//获取用户订单号的数据
export const reqUserOrderInfo = (page: number, limit: number, patientId: string, orderStatus: string) => request.get<any, UserOrderInfoResponseData>(API.USERORDERINFO_URL + `${page}/${limit}?patientId=${patientId}&orderStatus=${orderStatus}`)
//获取全部就诊人的信息
export const reqAllUser = () => request.get<any, AlluserResponseData>(API.ALLUSER_URL)
//获取订单的状态数据
export const reqOrderState = () => request.get<any, AllOrderStateResponseDate>(API.ORDERSTATE_URL)
//获取城市的数据
export const reqCity = (parentId: string) => request.get<any, any>(API.CITY_URL + parentId)
//新增就诊人接口和更新已有的就诊人接口
export const reqAddOrUpdateUser = (data: AddOrUpdateUser) => {
  if (data.id) {
    return request.put<any,any>(API.UPPATEUSER_URL, data)
  } else {
    return request.post<any,any>(API.ADDUSER_URL, data)
  }
}
//删除已有的就诊人
export const reqRemoveUser=(id:number)=>request.delete<any,any>(API.DELETEUSER_URL+id)

