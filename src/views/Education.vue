<template>
  <banner></banner>
  <div class="Education">
    <section class="tunlistSect tunlistSect_inner" :class="{ vtech : orderbyQueryShow }">
      <!-- title -->
      <article class="titleBox">
        <h2><b>{{ nowYears }}年</b>{{ nowTypeCN }}個人申請入學校系查榜</h2>
        <h3><span  class="title__id">{{ nowSchoolCode }}</span>{{ nowSchoolName }}</h3>
      </article>
      <!-- back btn -->
      <back :className="'headBox__mt-change-wide'" :link="`/?type=${userTypeSchool}&years=${nowYears}&examType=${examTypeHome}`" :btnName="`返回學校查詢`"/>
      <!-- list head -->
      <headBox :titleOne="'放榜日'" :titleTwo="'代號'" :titleThree="'系名'"></headBox>
        <!-- list content -->
        <article class="tunlist__contentBox">
          <ul class="tunlist__container">
            <li class="tunlist__list" v-for="item in data" :key="item">
              <div class="tunlist__top">
                <div class="tunlist__date"> 
                  <mark class="tunlist__date-part" v-if="item.OnlineDataCount === 0 && !admissionTimeOut && getToday === item.admissionDate">更新中</mark>
                  <time v-if="showWidth">{{ item.admissionDate }}</time>
                  <time v-else>{{ item.admissionDateM }}</time>
                </div>
                <div class="tunlist__school">
                  <p class="tunlist__number">{{ item.educationCode }}</p>
                  <h3 class="tunlist__name">{{ item.educationName }}</h3>
                </div>
              </div>
              <div class="tunlist__bottom">
                <router-link :to="'/result?type='+userTypeSchool+'&years=' + nowYears + '&orderby=1&schoolType=' + nowType + '&schoolCode=' + nowSchoolCode  + '&educationCode=' + item.educationCode + '&examType=' + examType">
                  <button class="tunlist__btn">查詢</button>
                </router-link>
              </div>
            </li>
          </ul>
          <p v-if="nowSchoolCode === '001' && nowYears === '111'" class="mt-3">備註：111年度國立臺灣大學榜單，係以考生之「報名編號」呈現</p>
        </article>
    </section>
  </div>
</template>

<script>
  import { useRoute } from 'vue-router'
  // import { useParams, userDeviceFns, changeMetas } from '@/composition-api/index';
  import { useParams, userDeviceFns } from '@/composition-api/index';
  import { useListStore } from '@/stores/fetchData';
  import { useUserParameter } from '@/stores/useParameter';
  import { storeToRefs } from 'pinia';
  import back from '@/components/back.vue';
  import headBox from '@/components/headBox.vue';
  import banner from '@/components/basic/banner.vue';
  export default {
    components: {
      back,
      headBox
    },
    props: {
        num: {
          type: Number,
          default: 576,
        },
    },
    setup(props) {
      // meta
      // changeMetas()

      const { SEOUrl, domain, nowYears, nowType, nowTypeCN, nowSchoolCode, orderbyQueryShow } = useParams();

      const useList = useListStore();
      const { data, totalpage, totalrecord, nowSchoolName, admissionTimeOut } = storeToRefs(useList);
      
      
       const {width, showWidth} = userDeviceFns(props.num);

      // fetchData(pageshow)
      useList.fetchData(9999);

      // watch(fetching, () => {
      //   showList.value = fetching.value ?  false : true
      // })
       
      const route = useRoute()
      const useParameter = useUserParameter();
      const { queryName, examTypeHome, userTypeSchool } = storeToRefs(useParameter);
      queryName.value = route.name
      userTypeSchool.value = route.query.type


    
      //取得今日(系統日期)
      const getTodayDate = ()  =>{
          const fullDate = new Date();
          const MM = (fullDate.getMonth() + 1) >= 10 ? (fullDate.getMonth() + 1) : ("0" + (fullDate.getMonth() + 1));
          const dd = fullDate.getDate() < 10 ? ("0"+fullDate.getDate()) : fullDate.getDate();
          const today =  MM + "/" + dd;
          return today;
      }
      const getToday =  getTodayDate()
      // console.log(getTodayDate());
        // const getTodayDateWhole = `${getTodayDate()}T00:00:00`
      
      const fullPathRoute = route.fullPath.split('/')[1];


      const examType =  route.query.examType;

      return {
        showWidth,
        domain,
        data,
        totalpage,
        totalrecord,
        nowYears,
        nowType,
        nowTypeCN,
        nowSchoolCode,
        nowSchoolName,
        admissionTimeOut,
        getToday,
        SEOUrl,
        fullPathRoute,
        examType,
        examTypeHome,
        userTypeSchool,
        orderbyQueryShow
        // showList
      }

    }
  }
</script>