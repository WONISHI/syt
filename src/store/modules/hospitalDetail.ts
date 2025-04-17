import { defineStore } from "pinia";
import { reqHospitalDetail, reqHospitalDeparment } from "@/api/api.ts";
import type {
  HospitalDetail,
  DeparmentResponseData,
  DeparmentArr,
} from "@/api/type.ts";
import type { DetailState } from "@/store/interface/index.ts";
import type { ResponseDatailData } from "@/api/type.ts";
const useDetailStore = defineStore("Detail", {
  state: (): DetailState => {
    return {
      hospitalInfo: {} as ResponseDatailData,
      deparmentArr: [] as DeparmentArr,
    };
  },
  actions: {
    async getHospital(hoscode: string | any) {
      let res: HospitalDetail = await reqHospitalDetail(hoscode);
      if (res.code == 200) {
        this.hospitalInfo = res.data;
      }
    },
    async getDeparment(hoscode: string | any) {
      let res: DeparmentResponseData = await reqHospitalDeparment(hoscode);
      if (res.code == 200) {
        this.deparmentArr = res.data;
      }
    },
  },
  getters: {},
});

export default useDetailStore;
