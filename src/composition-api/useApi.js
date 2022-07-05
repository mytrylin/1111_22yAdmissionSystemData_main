import { ref, reactive } from "vue";
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia';
import {useUserFreshman} from "@/stores/useFreshman"
import { useUserLoading } from '@/stores/loading';
import { usedataStore, useListStore } from '@/stores/fetchData';
import { useUserStore } from '@/stores/user';

import { GetADMSysData, GetADMList, talentNo , RSVCreate, popularJob, GetTicketData, GetUniversityData, GetUniversityBanner } from '@/api/index'
import _ from "lodash"
export function routeFn(route){
  let query = ''
  let count = 0

  Object.keys(route).forEach(item => {
      if (route[item] !== '' && count === 0) {
        count++
        query += `${item}=${route[item]}`
      } else if(route[item] !== '' && count !== 0) {
        query += `&${item}=${route[item]}`
      }
  })
  return{query}
}

export async function getList(pageshow) {
  const route = useRoute()
  let { query } = routeFn(route.query);
  const url = ref('')
  const useData = useListStore();
  // API 打近來前將useData 清空
  useData.$reset()

 

  const data = ref([])
  const totalpage = ref(0)
  const totalrecord = ref(0)

  // 如果連結路徑是LOGO近來 examType 會是空值 window.location
  const homeRouter = 'type=2&years=111&examType=2'
  _.isEmpty(query) ? location.search = homeRouter  : '';

  query = query.replace('schoolType', 'type')

  url.value =  _.isEmpty(query) ? homeRouter + '&pageshow=' : query + '&page=1&pageshow='

  await GetADMList(url.value + pageshow).then(res => {
    if( !_.isEmpty(res)){
      if(!_.isEmpty(res.dataLists)) {
        data.value = res.dataLists
        totalpage.value = res.totalpage
        totalrecord.value = res.totalrecord
      }
    }
  })

  return {
    data,
    totalpage,
    totalrecord
  };
}

export async function getData(page, pageQuery) {
  const route = useRoute();
  const query = ref('')
  const useData = usedataStore();
  const { noInformation } = storeToRefs(useData);
  if(_.isEmpty(route)) {
    query.value = pageQuery
  } else {
    query.value = routeFn(route.query).query
  }

  const nowPage = ref(page)

  const data = ref([])
  const totalpage = ref(0)
  const totalrecord = ref(0);
  
  
  const removeTypeRouter = query.value.split("&");
  // aa.slice(1,)
  
  await GetADMSysData(removeTypeRouter.slice(1, 7).join("&") + '&pageshow=10&page=' + nowPage.value).then(res => {
    const useLoading = useUserLoading();
    const { isLoading, isLoadings } = storeToRefs(useLoading);

    if(!_.isEmpty(res)){
      data.value = res.dataLists
      totalpage.value = res.totalpage
      totalrecord.value = res.totalrecord
      isLoading.value = false;
      isLoadings.value = false;
    }
    if(_.isEmpty(res)){
      isLoading.value = false;
      noInformation.value = true;
      // console.log(2);
    }
  }).catch(err => {
    console.log(err);
    if(_.isEmpty(err) ){
      // isLoading.value = false;
      noInformation.value = true;
      // console.log(3);
    }
  });
  // .catch(err => {
    
  // }

  return {
    data,
    totalpage,
    totalrecord,
  }
}

export async function login() {
  const loginUrl = ref('')
  loginUrl.value = location.host == 'event.1111.com.tw' ? 'https://www.1111.com.tw/login/index?ReturnUrl=' + location.href + '&IsThirdParty=true' : 'http://192.168.1.234/talents/memberlogin.asp?ref=' + location.href + '&IsThirdParty=true'

  const useUserTalentNo = useUserStore();
  const { usersTalentNo, users, usersLoginType} = storeToRefs(useUserTalentNo);
  await talentNo().then(res => {
    if(!_.isEmpty(res)){
      users.value = res
      usersTalentNo.value = res.talentNo
      usersLoginType.value = res.loginType
    }
  });

  return{
    usersTalentNo
  }

}

export async function loginFreshmanApi(postData) {
  const store = useUserFreshman();

  await RSVCreate(postData)
     .then(res => {
        if(res.status == 1) {
          store.freshmanLogin = false
        }
        if(res.status == -1) {
            alert('此應試碼也許不是111年度的應試碼唷！再請您確認一下，如果還是無法報名，請聯繫活動單位。謝謝您！')
        } else if (res.status == 1) {
          alert('應試碼登入成功')
        } else {
          setTimeout(()=> {
            alert(res.msg)
          }, 1000)
        }
     })
     .catch(err => {
       console.log(err);
     });

}

export async function getParttimgJob(apiUrl) {
  let data = []
  await popularJob(apiUrl)
  .then( res => {
    data = res.jobList
  })
  return data
}

export async function getFreshmanData(parameter) {
  
  let data = {}
  await GetADMSysData(parameter)
  .then( res => {
    res.dataLists ? data = res.dataLists[0] : data = null
  })
  return data
}

export async function universityData(parameter) {
  let data = ''
  await GetUniversityData(parameter)
  .then(res => {
    if(!_.isEmpty(res)){
      data = res.dataList
    }
  })
  return data
}

export async function universityBanner(codeNo) {
  let data = ''
  await GetUniversityBanner(codeNo)
  .then(res => {
    if(!_.isEmpty(res)){
      data = res.imgUrl
    }
  })
  return data
}