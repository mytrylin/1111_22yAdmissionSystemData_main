import {get, post} from '@/api/default/httpConfig';
import {ref} from 'vue'

const domain = ref('');
domain.value = location.host == 'event.1111.com.tw' ? 'https://event.1111.com.tw' : 'http://192.168.1.234'
const university_domain = ref('')
university_domain.value = location.host == 'event.1111.com.tw' ? 'https://university.1111.com.tw' : 'http://192.168.1.234/zone/1111university'
const E02_domain = ref('')
E02_domain.value = location.host == 'event.1111.com.tw' ? 'https://www.1111.com.tw' : 'http://192.168.1.234'

export const GetADMList = (parameter) => get(`${domain.value}/eventAPI/api/22yADM/Back/GetADMList?${parameter}`);
export const GetADMSysData = (parameter) => get(`${domain.value}/eventAPI/api/22yADM/Back/GetADMSysData?${parameter}`);
export const talentNo = () => get(`${domain.value}/eventAPI/tool/api_check_talentNo.asp`);
export const RSVCreate = p => post(`${domain.value}/eventAPI/api/22yADM/RSVCreate`, p); 
export const popularJobNo = () => get('https://parttime.1111.com.tw/jobList_data.asp'); // 熱門打工 未登入使用
export const popularJobYes = (parameter) => get(`https://parttime.1111.com.tw/jobList.asp?ssi=3&sc=${parameter}`); // 熱門打工 已登入使用
export const popularJob = (parameter) => get(`https://parttime.1111.com.tw/jobList_data.asp${parameter}`); // 熱門打工 已登入使用
export const GetUniversityData = (parameter) => get(`${domain.value}/zoneAPI/1111university/get_data.asp?apitype=search_list${parameter}`)
export const GetUniversityBanner = (codeNo) => get(`${E02_domain.value}/zoneAPI/api/UniversityNet/GetCollegeBannerInfo?codeNo=${codeNo}`)
// export const GetADMList = (parameter) => get(`/eventAPI/api/22yADM/Back/GetADMList?${parameter}`);
// export const GetADMSysData = (parameter) => get(`/eventAPI/api/22yADM/Back/GetADMSysData?${parameter}`);
// export const talentNo = () => get(`/eventAPI/tool/api_check_talentNo.asp`);
