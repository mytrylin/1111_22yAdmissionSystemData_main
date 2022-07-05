import { ref, computed } from "vue";
import { useRoute } from 'vue-router'

export function useParam() {
  const route = useRoute()
  const domain = ref('')
  const nowYears = ref(0)
  const nowType = ref(0)
  const nowTypeCN = ref('')
  const nowTypeInquire  = ref('');
  const nowSchoolCode = ref(0)
  const nowSchoolName = ref('')
  const nowEducationCode = ref(0)
  const nowEducationName = ref('')
  const nowTicketNum = ref('')
  const nowName = ref('')
  const typeRefName =  ref('')

  // seo  資料 改 router 調用
  // const SEOTitle = route.query.seachType == 1 ? "111年度大學及四技姓名查榜︱入學榜單查詢-1111人力銀行" : route.query.seachType == 2 ? "111年度大學及四技應試號碼查榜︱入學榜單查詢-1111人力銀行" : "111年度大學及四技查榜服務︱入學榜單查詢-1111人力銀行"
  // const SEOKeywords = "大學放榜、大學申請入學、四技放榜、四技申請入學、放榜、姓名查榜、應試碼查榜"
  // const SEODescription = "111年度年度(2022)學測、統測、指考放榜交叉查詢，可依姓名、應試碼、考區等不同查榜功能，快速查詢錄取結果！"
  // const SEOImg = "https://event.1111.com.tw/event22/22yAdmissionSystem/assets/img/og.jpg"
  // const SEOUrl = "https://event.1111.com.tw/event22/22yAdmissionSystem/"


  nowType.value = route.query.type || route.query.nowType || 1
  nowTypeCN.value = route.query.examType == '2' ? '統測甄選' : '大學';
  nowTypeInquire.value = route.query.seachType == '1' ? '姓名' : '應試號碼';
  nowYears.value = route.query.years || 111
  nowSchoolCode.value = route.query.schoolCode
  nowEducationCode.value = route.query.educationCode
  nowTicketNum.value = route.query.ticketNum
  nowName.value = route.query.name
  nowSchoolName.value = ''
  nowEducationName.value = ''
  domain.value = location.host == 'event.1111.com.tw' ? 'http://event.1111.com.tw' : 'http://192.168.1.234'
  typeRefName.value = route.query.typeRef == '1' ? '大學' : '統測甄選';

  // 判斷是否為學測
  const orderbyQueryShow = computed(() => {
    return  route.query.examType == 2 ? true : false
  })

  return {
    domain,
    nowYears,
    nowType,
    nowTypeCN,
    nowTypeInquire,
    nowSchoolCode,
    nowSchoolName,
    nowEducationCode,
    nowEducationName,
    nowTicketNum,
    nowName,
    typeRefName,
    orderbyQueryShow
    // SEOTitle,
    // SEOKeywords,
    // SEODescription,
    // SEOImg,
    // SEOUrl,
    
  };
}