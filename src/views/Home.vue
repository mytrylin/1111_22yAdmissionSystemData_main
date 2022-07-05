<template>
  <banner></banner>
  <div class="admission">
    <section class="tunlistSect tunlistSect_inner" :class="{ vtech : orderbyQueryShow }">
      <!-- title -->
      <div class="titleBox">
        <h2><b>{{ nowYears }}年</b>{{ nowTypeCN }}個人申請入學校系查榜</h2>
        <p  class="title__default"  v-if="detaPercentage">第二階段 {{ percent }}已放榜<span>（{{ educationListed }}／{{ educationSum }}）</span></p>
      </div>
        <!-- list head -->
        <headBox :titleOne="'放榜日'" :titleTwo="'代號'" :titleThree="'學校'"></headBox>
        <!-- list content -->
        <article class="tunlist__contentBox">
          <ul class="tunlist__container">
            <li class="tunlist__list" v-for="item in schoolArray" :key="item">
              <div class="tunlist__top">
                <div class="tunlist__date" v-if="item.admissionType == 0">
                  <mark class="tunlist__date-part">部分放榜</mark>
                  <time v-if="showWidth">{{ item.admissionDate }}</time>
                  <time v-else>{{ item.admissionDateM }}</time>
                </div>
                <div class="tunlist__date" v-else-if="item.admissionType == 1">
                  <mark class="tunlist__date-released" v-if="item.admissionYearAPI >= item.admissionYear">已放榜</mark>
                  <!-- <mark class="tunlist__date-released" v-else>同步中</mark> -->
                </div>
                <div class="tunlist__date" v-else>
                  <template v-if="item.admissionYearAPI >= item.admissionYear">
                     <time v-if="showWidth">{{ item.admissionDate }}</time>
                    <time v-else>{{ item.admissionDateM }}</time>
                  </template>
                </div>
                <div class="tunlist__school">
                  <p class="tunlist__number">{{ item.schoolCode }}</p>
                  <h3 class="tunlist__name">{{ item.schoolName }}</h3>
                </div>
              </div>
              <div class="tunlist__bottom">
                <button class="tunlist__btn" @click="schoolCodeFn(`${item.schoolCode}`)">查詢</button>
              </div>
            </li>
          </ul>
        </article>
    </section>
  </div>
</template>

<script>
  import { computed } from 'vue';
  // import { useParams, useAlertFourSkills, userDeviceFns, useAlertSchoolOpens, changeMetas } from '@/composition-api/index';
  import { useParams, useAlertFourSkills, userDeviceFns, useAlertSchoolOpens } from '@/composition-api/index';
  import { useListStore } from '@/stores/fetchData';
  import { useUserParameter } from '@/stores/useParameter';
  import { storeToRefs } from 'pinia';
  import { useRoute, useRouter } from 'vue-router'
  import {  GetADMList } from '@/api/index'
  import headBox from '@/components/headBox.vue';
  import banner from '@/components/basic/banner.vue';
  import _ from "lodash"
  export default {  
    components: {
      headBox,
      banner,
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

      const router = useRouter();
      const { SEOUrl, nowType, nowYears, nowTypeCN, orderbyQueryShow } = useParams();

      const {width, showWidth} = userDeviceFns(props.num);
  
      
      const useList = useListStore();
      const { data, totalpage, totalrecord, schoolArray, educationSum, educationListed } = storeToRefs(useList);

      // const showList = ref(false)
      // fetchData(pageshow)
      useList.fetchData(1);

      // watch(fetching, () => {
      //   showList.value = fetching.value ?  false : true
      // })


      const percent = computed(() => {
        return Math.round(educationListed.value / educationSum.value * 10000) / 100.00 + "%"
        // return (educationListed.value / educationSum.value).toFixed(3) * 100 || 0
      })

   

      const detaPercentage = computed(() => {
        return  !_.isEmpty(educationSum)
      })



      const route = useRoute();
      
      // 20220623 四技原本關閉改道大學邏輯隱藏，因為要改成統測 (目前統測是四技)
      // if(route.query.type === '2'){
      //   useAlertFourSkills(router);
      //   return;
      // }

      const schoolCodeFn = (schoolCode) => {
        GetADMList(`type=${nowType.value}&years=${nowYears.value}&schoolCode=${schoolCode}&examType=${route.query.examType}`).then(res => {
            if(res.dataLists === null){
              useAlertSchoolOpens(router)
            }else{
              router.push(`/education?type=${nowType.value}&years=${nowYears.value}&schoolCode=${schoolCode}&examType=${route.query.examType}`);
            }
        })
      }
      
      const fullPathRoute = route.fullPath.split('/')[1];

      const useParameter = useUserParameter();
      const { examTypeHome } = storeToRefs(useParameter);
      examTypeHome.value = route.query.examType
     
      

      return {
        schoolCodeFn,
        showWidth , width,
        nowType,
        nowYears,
        nowTypeCN,
        data,
        totalpage,
        totalrecord,
        schoolArray,
        educationListed,
        educationSum,
        percent,
        SEOUrl,
        fullPathRoute,
        router,
        detaPercentage,
        orderbyQueryShow

        // showList,
        // fetching,
      }
    }
  }
</script>