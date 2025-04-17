import { defineStore } from "pinia";
import { reqCode, reqUser } from "@/api/api.ts";
import type { LoginParams, UserLoginInfo, Userinfo } from "@/api/type.ts";
import type { UserState } from "@/store/interface/index.ts";
const userStore = defineStore("User", {
  state: (): UserState => {
    return {
      visiable: false,
      code: "",
      userInfo: {} as Userinfo,
    };
  },
  actions: {
    async getCode(phone: string) {
      let res: any = await reqCode(phone);
      if (res.code == 200) {
        this.code = res.data;
        return "ok";
      } else {
        return Promise.reject(new Error(res.message));
      }
    },
    async userLogin(user: LoginParams) {
      let res: UserLoginInfo = await reqUser(user);
      if (res.code == 200) {
        this.userInfo = res.data;
        return "ok";
      } else {
        return Promise.reject(new Error(res.message));
      }
    },
    loginOut() {
      this.userInfo = { name: "", token: "" };
    },
    setUserinfo(obj: any) {
      this.userInfo = obj
    }
  },
  getters: {
    getUserinfo(state:UserState){
      return state.userInfo
    }
  },
});

export default userStore;
