<template>
  <loading v-if="loadingSwitch" />
  <div class="container" data-aos="fade-up">
    <h2 class="swiper__title" data-aos="fade-up">
      <img src="@/assets/img/freshman_gift/icon_universitytitle.svg" class="swiper__title-img" alt="">
      <div>各校系職涯探索：</div>
    </h2>
    <!-- university Swiper -->
    <div class="swiper__contentBox" data-aos="fade-down">
      <experience :class-name="`universitySwiper`" :itemList="itemList" :delay="5000" :prev="`swiper__prev-uv`"
        :next="`swiper__next-uv`">
        <template v-slot:next>
          <img src="@/assets/img/main/icon_swiper_next_color_main.svg" alt="" data-aos="fade-right">
        </template>
        <template v-slot:prev>
          <img src="@/assets/img/main/icon_swiper_prev_color_main.svg" alt="" data-aos="fade-left">
        </template>
        <template v-slot:slide>
          <SwiperSlide v-for="(item, index) in itemList" :key="index">
            <!-- <article> -->
            <cardB :item="item"></cardB>
            <!-- </article> -->
          </SwiperSlide>
        </template>
      </experience>
    </div>
  </div>
</template>

<script>
import {ref, onMounted} from 'vue';
import { SwiperSlide } from "swiper/vue";
import experience from '@/components/ExperienceSwiper.vue';
import cardB from '@/components/card/cardB.vue';

import loading from "@/components/loading.vue";

import { universityBanner, universityData } from '@/composition-api/useApi'
import { randData } from '@/composition-api/useFn'
export default {
  name: 'freshmanSwiper',
  props: {
    // 1 111年考生 2 非111年考生
    type: String,
    // 111年考生正取與備取科系資料
    freshmanSchool: Array
  },
  components: {
    SwiperSlide,
    experience,
    cardB,  
    loading
  },
  setup(props) {
    const itemList = ref([]);
    const university_domain = location.host == 'event.1111.com.tw' ? 'https://university.1111.com.tw' : 'http://192.168.1.234/zone/1111university'
    const loadingSwitch = ref(true)

    onMounted(async() => {
      loadingSwitch.value = true
      if(props.type==1) {
        await getadmitSchool()
      }
      else if(props.type==2) {
        await getRandomSchool()
      }      
    })
    async function getadmitSchool() {
      props.freshmanSchool.forEach(async(item) => {
        await universityBanner(item.split('_')[4].substring(0,6)+'0000')
        .then(bannerUrl => {
          itemList.value.push({
            schoolName: item.split('_')[1],
            departmantName: item.split('_')[2],
            codeNo: item.split('_')[4],
            imgUrl: universityImgUrlAdjust(bannerUrl)
          })
        })        
      })
      loadingSwitch.value = false
    }
    let insert = item => new Promise(resolve => {
      universityData('&topCodeNo='+item.topCodeNo)
      .then(result => {
        return result[0]
      })
      .then( departmaneData => {
        universityBanner(item.topCodeNo)
        .then(bannerUrl => {
          itemList.value.push({
            schoolName: departmaneData.topTW,
            departmantName: departmaneData.CodeTW,
            codeNo: departmaneData.CodeNo,
            imgUrl: universityImgUrlAdjust(bannerUrl)
          })
          resolve()
        })        
      }) 
    })
    function getRandomSchool() {
      let schoolList = []
      universityData('&schoolonly=1&pageShow=20').
      then(res => {
        schoolList = randData(res,6)
        let resolvedPromisesArray  = []
        schoolList.forEach(item => {
          resolvedPromisesArray.push(
            insert(item)
          )
          
        })
        Promise.all(resolvedPromisesArray)
        .then(() => {
          loadingSwitch.value = false
        })
      })
      
    }

    function universityImgUrlAdjust(imgUrl) {
      return imgUrl.replace('/zone/1111university','').replace('/zone/school_fresh/school/img/schoolfresh_img_upload/','/img/img_upload/')
    }

    return {
      itemList,
      loadingSwitch
    }
  }
}
</script>