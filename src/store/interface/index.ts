import type { ResponseDatailData, DeparmentArr, Userinfo } from "@/api/type.ts";

// HosPitalDetail

export interface DetailState {
  hospitalInfo: ResponseDatailData;
  deparmentArr: DeparmentArr;
}

// 用户仓库的相关参数
export interface UserState {
  visiable: boolean;
  code: string;
  userInfo: Userinfo;
}
