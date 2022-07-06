<template>
  <banner></banner>
  <div>
    <loading v-if="isLoadings" />
    <section class="tunlistSect tunlistSect_inner" :class="{ vtech : orderbyQueryShow }">
      <!-- 大學申請 -->
      <template v-if="nowEducationCode !== undefined">
        <!-- title -->
        <article class="titleBox">
          <h2><b>{{ nowYears }}年</b>{{ nowTypeCN }}個人申請入學校系查榜</h2>
          <h3>
            <span  class="title__id">{{ nowEducationCode }}</span>
            <router-link  class="title__school" :to="`/education?type=${userTypeSchool}&years=${nowYears}&schoolCode=${nowSchoolCode}&examType=${examTypeHome}`">{{ nowSchoolName }}</router-link>
            <span  class="title__department">{{ nowEducationName }}</span>
          </h3>
          <p class="title__default">招收名額：<span>{{ quotaTotal }}人</span></p>
        </article>
        <!-- back btn -->
        <back :className="'headBox__mt-change'" :link="`/education?type=${userTypeSchool}&years=${nowYears}&schoolCode=${nowSchoolCode}&examType=${examTypeHome}`" :btnName="`返回學系查詢`"/>
        <template v-if="!noInformation">
          <resultContent
            :data="data"
            :nowEducationCode="nowEducationCode"
            :noInformation="noInformation"
            :isMusicEducation="isMusicEducation"
            :nowYears="nowYears"
            :type="route.query.typeRef"
            :examTypeHome="examTypeHome"
          />
        </template>
        <!-- nodata content -->
        <template v-else>
          <article v-if="!isLoadings" class="resultBox">
            <template v-if="!admissionTimeOut">
              <div class="result__container">
                <p v-if="!admissionTime" class="result__msg">
                  您所選擇的校系尚未放榜!敬請期待!
                </p>
                <p v-else class="result__msg">
                  您所選擇的校系榜單更新中唷！敬請期待。
                </p>
              </div>
            </template>
            <template v-else>
              <div class="result__container">
                <p class="result__msg">本系今年無榜單唷！</p>
              </div>
            </template>
          </article>
        </template>
      </template>
      <!-- 應試碼/姓名 -->
      <template v-else>
        <!-- title -->
        <article class="titleBox">
          <h2>
            <b>{{ nowYears }}年</b>{{ typeRefName}}<span>{{ nowTypeInquire }}查榜</span>
          </h2>
          <p class="title__default">搜尋結果</p>
          <p class="title__search">
            <b v-if="nowTicketNum !== undefined" class="title__txt">{{nowTicketNum}}</b>
            <b v-else class="title__txt">{{ nowName }}</b>
            <b class="title__result" v-if="!noInformation">
              <template v-if="queryName.value === 'Inquire'">共{{ totalrecord }}人</template>
              <template v-else-if="queryName.value === 'Education'">共{{ quotaTotal }}人</template>
              <template v-else> 共{{ totalrecord }}人</template>
            </b>
          </p>
        </article>
        <!-- back btn -->
        <back :className="'headBox__mt-change'" :link="`/inquire?years=${nowYears}&seachType=${nowTypeInquire === '姓名' ? 1 : 2}`" :btnName="`返回${nowTypeInquire}查詢`"/>
        <template v-if="!noInformation">
          <resultContent
            :data="data"
            :nowEducationCode="nowEducationCode"
            :noInformation="noInformation"
            :isMusicEducation="isMusicEducation"
            :nowYears="nowYears"
            :type="route.query.typeRef"
            :examTypeHome="examTypeHome"
          />
        </template>
        <!-- nodata content -->
        <article v-if="!isLoadings" class="resultBox">
          <template v-if="noInformation">
            <div class="result__container">
              <p v-if="nowTicketNum !== undefined" class="result__msg"> 查無此{{ nowTypeInquire }}，<br />請確認年份以及{{nowTypeInquire}}是否選擇與輸入正確。
              </p>
              <p v-else class="result__msg">查無此考生{{ nowTypeInquire }}<br />請確認年份以及考生{{nowTypeInquire}}是否選擇與輸入正確。
              </p>
            </div>
          </template>
        </article>
      </template>
    </section>
    <!-- paginator -->
    <template v-if="!noInformation">
        <pagination v-if="totalpage !== 1" :totalpage="totalpage" :totalrecord="totalrecord" @changePageEmitBtn="changePageBtn"/>
    </template>
    <!-- parttime -->
    <template v-if="!check_nowEducationCode && !check_total_info">
      <parttime :schoolcode_sc="data[0].total_info[0].schoolcode_sc"/>
    </template>
  </div>
</template>
<script>
import { ref, defineComponent, provide, computed } from "vue";
import _ from "lodash"
import { useRoute } from "vue-router";
import { useParams, getQuery } from "@/composition-api/index";
// import { useParams, getQuery, userDeviceFns, changeMetas } from "@/composition-api/index";
import { useUserStore } from "@/stores/user";
import { usedataStore, useListStore } from "@/stores/fetchData";
import { useUserParameter } from "@/stores/useParameter";
import { useUserLoading } from "@/stores/loading";
import { storeToRefs } from "pinia";
import loading from "@/components/loading.vue";
import resultContent from "@/components/resultContent.vue";
import back from '@/components/back.vue';
import pagination from '@/components/pagination.vue';
import parttime from '@/components/parttime.vue';
import banner from '@/components/basic/banner.vue';
export default defineComponent({
  components: {
    loading,
    resultContent,
    back,
    pagination,
    parttime,
    banner
  },
  setup() {
    // meta
    // changeMetas()
    // title 
    const { SEOUrl, nowYears, nowType, nowTypeCN, nowSchoolCode, nowEducationCode, nowTicketNum, nowName, nowTypeInquire, typeRefName, orderbyQueryShow } = useParams();
    const useList = useListStore();
    const { nowSchoolName, nowEducationName, isMusicEducation, quotaTotal, admissionTime, admissionTimeOut} = storeToRefs(useList);
    useList.fetchData(1);

    // data
    const useData = usedataStore();
    const { data, dataLength, noInformation, totalrecord, totalpage } =  storeToRefs(useData);
    const route = useRoute();
    const fullPathRoute = route.fullPath.split('/')[1];

  
    const useLoading = useUserLoading();
    const { isLoadings } = storeToRefs(useLoading);
    provide('isLoadings', isLoadings);
    provide("dataLength", dataLength);
    provide("route", route);
    // login
    const userStore = useUserStore();
    const {  usersTalentNo } = storeToRefs(userStore);
    provide("usersTalentNo", usersTalentNo);
    userStore.fetchUsers();

    // const totalShow = ref(false);
    // if (nowYears.value === "111") {
    //   console.log(1);
    //   totalShow.value = true;
    // }

    
    // check total_info
    const check_total_info = computed(() => {
      return  _.isEmpty(data.value[0]?.total_info)
    })

    // check nowEducationCode
    const check_nowEducationCode = computed(() => {
      return  _.isEmpty(nowEducationCode.value)
    })
  
    // 分頁組件傳遞按鈕
    async function  changePageBtn(nowPage){
      await useData.fetchData(nowPage.value, getQuery(route.query).query);
      window.scrollTo(0, 0);
    }


    useData.fetchData(1, route.query);

    // const dataList = data.value;
    // dataList.forEach((element) => {
    //   if (element.total_info.length > 3) {
    //     totalShow.value = true;
    //   } else {
    //     totalShow.value = false;
    //   }
    // });

    const useParameter = useUserParameter();
    const { queryName, ticketInput, examTypeHome, userTypeSchool } = storeToRefs(useParameter);
    userTypeSchool.value = route.query.type
    examTypeHome.value = route.query.examType
    

    const peopleNum = ref(0);

    // 如果沒輸入直接到查無資料
    if (ticketInput.value === "") {
      // isLoadings.value = false
      noInformation.value = true;
    }

    // footer 樣式調整用 (只有在 大學申請/統測需要 加上 "mt-0")
    !_.isEmpty( route.query.orderby) ? document.getElementsByTagName('footer')[0].className = 'mt-0' : '';
    

    return {
      queryName,
      quotaTotal,
      // totalShow,
      changePageBtn,
      data,
      totalpage,
      totalrecord,
      // seachType,
      isLoadings,
      noInformation,
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
      isMusicEducation,
      typeRefName,
      admissionTime,
      admissionTimeOut,
      SEOUrl,
      fullPathRoute,
      check_total_info,
      check_nowEducationCode,
      examTypeHome,
      userTypeSchool,
      route,
      orderbyQueryShow
    };
  },
});
</script>
