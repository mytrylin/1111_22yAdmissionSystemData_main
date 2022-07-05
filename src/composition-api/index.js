import { getList, getData, login, routeFn } from "./useApi.js";
import { useParam } from "./useParams.js";
import { useAlertFourSkill, useAlertSchoolOpen } from "./useAlert"; 
import { userDeviceFn } from "./userDevice";
import { userStudentType } from "./userStudentType";
// import { useVueMeta, changeMeta } from "./meta";

export const useParams = useParam;
export const getLists = getList;
export const getDatas = getData;
export const getUser = login;
export const useAlertFourSkills = useAlertFourSkill;
export const useAlertSchoolOpens = useAlertSchoolOpen;
export const getQuery = routeFn;
export const userDeviceFns = userDeviceFn;
export const userStudentTypes = userStudentType;
// export const useVueMetas = useVueMeta;
// export const changeMetas = changeMeta;
