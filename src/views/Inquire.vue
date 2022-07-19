<template>
  <banner></banner>
  <!-- list -->
  <section class="tunlistSect tunlistSect_inner">
      <!-- title -->
      <article class="titleBox">
        <!--  -->
        <h1><b>{{years}}年</b>大學/四技<span>{{searchTypeName}}查榜</span></h1>
      </article>
      <!-- list head --> 
      <template  v-for="item in bachelorSearch" :key='item'>
        <search :item="item" :years="years" @Combination="setNun"/>
      </template>
  </section>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import { ref, computed } from "vue";
// import { useAlertFourSkills, changeMetas } from '@/composition-api/index.js'
import { useAlertFourSkills } from '@/composition-api/index.js'
import { useUserParameter } from '@/stores/useParameter';
import { useUserLoading } from "@/stores/loading";
import { storeToRefs } from 'pinia';
import search from '@/components/search.vue';
import banner from '@/components/basic/banner.vue';

export default {
  name:'Inquire',
  components: {
    search,
    banner,
  },
  setup () {
    // meta
    // changeMetas()

    // route
    const route = useRoute();
    const router = useRouter();
    const years = ref(route.query.years);
    const useLoading = useUserLoading();
    const { isLoadings, isLoading } = storeToRefs(useLoading);
    isLoadings.value = false
    isLoading.value = false
    
    const searchType = ref(route.query.searchType);


    const searchTypeName = computed(() => {
      return (searchType.value == 1) ? name = '姓名' : name = '應試號碼';
    });
    const useParameter = useUserParameter();
    const { queryName, ticketInput } = storeToRefs(useParameter);
    queryName.value = route.name
 

    // 標題 與  search components
    const schoolType = ref('大學/四技');
    const bachelor = ref(
      [
        {
          type: 1,
          school: '申請入學'
        },
        {
          type: 2,
          school: '統測甄選'
        }
      ]
    ) 

    // 隱藏110年 統測 搜尋
    const bachelor110 = ref(
      [
        {
          type: 1,
          school: '申請入學'
        }
      ]
    ) 

    const bachelorSearch = computed(() => {
      return  years.value == 110 ? bachelor110.value : bachelor.value
    })


    // search components 子傳父
    const typeRef = ref("0");
    const searchInput = ref('');

    // console.log('route', route.query.examType);
    const examTypeRouter = ref();
    const setNun = (type, search) => {
      typeRef.value = type;
      searchInput.value = search;
      typeRef.value === '2' ? examTypeRouter.value = 2 :  examTypeRouter.value = 1;
      
      (typeRef.value === '1') ? schoolType.value = '大學' : schoolType.value = '統測甄選';
      goToCourses(type, years.value, 1, searchType.value, examTypeRouter.value)
      // goToCourses(type, years.value, 1, searchType.value, route.query.examType)
    };
    

    /**
      * 資料獲取
      * @param {ticketNum} a - 應試碼 or 名子
    */
    const verification = (ticketNum) => {
      ticketInput.value = ticketNum
      var category = '';
       const seach = ref(route.query.searchType);
      (seach.value == 1) ? category = `&name=${ticketNum}` :  category =  `&ticketNum=${ticketNum}`;
      return category;
    };

    
    /**
      * 資料獲取
      * @param {typeRef} a - 抓取 大學  or 四技 搜尋框 (自訂)
      * @param {years} a - 年分
      * @param {schoolType} a - 大學  or 四技
      * @param {searchType} a - 姓名 or 應試碼 
    */
    const goToCourses = (typeRef, years, schoolType,searchType, examType) => {
      var ticket = verification(searchInput.value);
      router.push(`/result?years=${years}&typeRef=${typeRef}&schoolType=${schoolType}&searchType=${searchType}${ticket}&distinctName=1&examType=${examType}`);
    };
    
    return{
      years,
      schoolType,
      searchInput,
      bachelor,
      setNun,
      typeRef,
      searchType,
      searchTypeName,
      bachelorSearch
    }
  }
}
</script>

<style>

</style>