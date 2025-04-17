//定义首页模块ts数据类型
export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}
//代表已有的医院数据的ts类型
export interface HospitalData {
  id: string;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: {
    hostypeString: string;
    fullAddress: string;
  };
  hoscode: string;
  hosname: string;
  hostype: string;
  provinceCode: string;
  cityCode: string;
  districtCode: string;
  address: string;
  logoData: string;
  intro: string;
  route: string;
  status: number;
  bookingRule: {
    cycle: number;
    releaseTime: string;
    stopTime: string;
    quitDay: number;
    quitTime: string;
    rule: string[];
  };
}

//存储全部已有医院的数组类型
export type Content = HospitalData[];

//获取已有医院接口返回的数据ts类型
export interface HospitalResponseData extends HospitalData, ResponseData {
  data: {
    content: Content;
    pageable: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    pageNumber: number;
    pageSize: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
    tatolPages: number;
    totalElements: number;
    last: boolean;
    first: boolean;
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    numberOfElements: number;
    size: number;
    number: number;
    empty: boolean;
  };
}
//代表医院等级或者地区数据ts类型
export interface HospitalLevelAndRegion {
  id: number;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: {};
  parentId: number;
  name: string;
  value: string;
  dictCode: string;
  hasChildren: boolean;
}

export type HospitalLevelAndRegionArr = HospitalLevelAndRegion[];

//获取等级或医院地区接口返回数据类型
export interface HospitalLevelAndRegionResponseData extends ResponseData {
  data: HospitalLevelAndRegionArr;
}

//
export interface HospitalInfo extends ResponseData {
  data: Content;
}

// 定义医院详情
export interface ResponseDatailData {
  bookingRule: {
    cycle: number;
    releaseTime: string;
    stopTime: string;
    quitDay: number;
    quitTime: string;
    rule: string[];
  };
  hospital: {
    id: string;
    createTime: string;
    updateTime: string;
    isDeleted: number;
    param: {
      hostypeString: string;
      fullAddress: string;
    };
    hoscode: string;
    hosname: string;
    hostype: string;
    provinceCode: string;
    cityCode: string;
    districtCode: string;
    address: string;
    logoData: string;
    intro: null;
    route: string;
    status: number;
    bookingRule: null;
  };
}
//余元详情返回数据ts
export interface HospitalDetail extends ResponseData {
  data: ResponseDatailData;
}

//代表医院科室的数据
export interface Deparment {
  depcode: string;
  depname: string;
  children?: Deparment[];
}

//代表存储科室数组数据
export type DeparmentArr = Deparment[];

//获取科室接口返回的数据类型
export interface DeparmentResponseData extends ResponseData {
  data: DeparmentArr;
}

// 用户登录接口需要携带参数类型
export interface LoginParams {
  phone: string;
  code: string;
}

// 登录接口返回用户信息数据
export interface Userinfo {
  name: string;
  token: string;
}
export interface UserLoginInfo extends ResponseData {
  data: Userinfo;
}


export interface WXLogin {
  redirectUri: string,
  appid: string,
  scope: string,
  state: string
}
//获取微信扫码登录生成二维码需要参数接口
export interface WXloginResponseData extends ResponseData {
  data: WXLogin
}

//获取可预约排班数据
export interface baseMap {
  workDateString: string,
  releaseTime: string,
  bigname: string,
  stopTime: string,
  depname: string,
  hosname: string,
}

export interface WorkMap {
  workDate: string,
  workDateMD: string,
  dayofWeek: string,
  docCount: string,
  reservedNumber: null,
  availableNumber: number,
  status: number
}

export type BookingScheduleList = WorkMap[]

export interface HospitalWordData extends ResponseData {
  data: {
    total: number,
    bookingScheduleList: BookingScheduleList,
    baseMap: baseMap
  }
}
//获取医院某一天的排班时间
export interface Doctor {
  id: string,
  createTime: string,
  updateTime: string,
  isDeleted: string,
  param: {
    dayofWeek: string,
    depname: string,
    hosname: string
  },
  hoscode: string,
  depcode: string,
  title: string,
  docname: string,
  skill: string,
  workDate: string,
  workTime: number,
  reservedNumber: number,
  availableNumber: number,
  amount: number,
  status: number,
  hosScheduleId: string
}

export type DocArr = Doctor[]

export interface DoctorResponseData extends ResponseData {
  data: DocArr
}

//代表就诊人员数据ts
export interface User {
  id: string,
  createTime: string
  updateTime: string,
  isDeleted: number,
  param: {
    certificatesTypeString: string,
    contactsCertificatesTypeString: string,
    cityString: null,
    fullAddress: string
    districtString: null,
    provinceString: null
  }
  userId: string,
  name: string,
  certificatesType: string,
  certificatesNo: string
  sex: number,
  birthdate: string,
  phone: string,
  isMarry: number,
  address: string,
  contactsName: string,
  contactsCertificatesType: string,
  contactsCertificatesNo: string,
  contactsPhone: string,
  isInsure: number,
  cardNo: null,
  status: string
}

export type UserArr = User[]
export interface UserResponseData extends ResponseData {
  data: UserArr
}

//获取挂号医生的信息
export interface DoctorInfoData extends ResponseData {
  data: Doctor
}

//提交订单，获取订单号码接口
export interface submitOrder extends ResponseData {
  data: number
}

//获取订单详情的方法
export interface OrderInfo {
  id: number,
  createTime: string,
  updateTime: string,
  idDeleted: number,
  param: {
    orderStatusString: string
  }
  userId: number,
  outTradeNo: string,
  hoscode: string,
  hosname: string,
  depcode: string,
  depname: string,
  schedname: string,
  scheduleId: string,
  title: string,
  reserveDate: string,
  reserveTime: number,
  patientId: string,
  patientName: string,
  hosRecordId: string,
  number: number,
  fetchTime: string,
  fetchAddress: string,
  amount: number,
  quitTime: string,
  orderStatus: number
}

export interface OrderResponseData extends ResponseData {
  data: OrderInfo
}

//获取支付订单二维码接口
export interface PayInfo {
  codeUrl: string,
  orderId: number,
  totalFee: number,
  resultCode: string
}

export interface Qrcode extends ResponseData {
  data: PayInfo

}

//查询订单支付的结果
export interface PayResult extends ResponseData {
  data: boolean
}

//获取当前账号用户信息
export interface UserInfo {
  id: string,
  createTime: string,
  updateTime: string,
  isDeleted: number,
  param: {

  },
  openid: null,
  nickName: null,
  phone: string,
  name: string,
  certificatesType: string,
  certificatesNo: string,
  certificatesUrl: string,
  authStatus: number,
  status: number
}

export interface UserInfoResponseData extends ResponseData {
  data: UserInfo
}

//获取证件的类型的接口地址
export interface CertationType {
  id: string,
  createTime: string,
  updateTime: string,
  isDeleted: number,
  param: {

  },
  parentId: null,
  name: string,
  value: string,
  dictCode: string,
  hasChildren: boolean
}

export type CertationArr = CertationType[];

export interface CertationTypeResponseData extends ResponseData {
  data: CertationArr
}

//用户认证的结构
export interface UserParams {
  certificatesNo: string,
  certificatesType: string,
  certificatesUrl: string,
  name: string
}

//获取用户订单号的数据
export interface Order {
  id: number,
  createTime: string,
  updateTime: string,
  isDeleted: number,
  param: {
    orderStatusString: string
  },
  userId: number,
  outTradeNo: string,
  hoscode: string,
  depcode: string,
  depname: string,
  scheduleId: null,
  title: string,
  reserveDate: string,
  reserveTime: string,
  patientId: number,
  patientName: string,
  patientPhone: string,
  hosRecordId: string,
  number: number,
  fetchTime: string,
  fetchAddress: string,
  amount: number,
  quitTime: string,
  orderSatus: number
}

export type Records = Order[];
export interface UserOrderInfoResponseData extends ResponseData {
  data: {
    records: Records,
    total: number,
    size: number,
    current: number,
    orders: [],
    hitCount: boolean,
    searchCount: boolean,
    pages: number
  }
}
//获取全部就诊人的信息
export interface AlluserResponseData extends ResponseData {
  data: UserArr
}
//获取订单的状态数据
export interface OrderStatus {
  comment: string,
  status: number
}

export type AllOrderState = OrderStatus[]

export interface AllOrderStateResponseDate extends ResponseData {
  data: AllOrderState
}

//新增就诊人接口和更新已有的就诊人接口
export interface AddOrUpdateUser{
  id?:string,
  name:string,
  certificatesType:string,
  certiicatesNo:string,
  sex:number,
  birthdate:string,
  phone:string,
  isMarry:number,
  isInsure:number,
  addressSelected:string[],
  address:string,
  contactsName:string,
  contactsCertificatesType:string,
  contactsCertificatesNo:string,
  contactsPhone:string,
}

