<template>
    <section class="titleSect">
        <h2>
            <picture>
                <source media="(min-width:1400px)" :srcset="imgRouter.pcImg">
                <source media="(min-width:576px)" :srcset="imgRouter.mdImg">
                  <img :src="imgRouter.mImg" alt="2022大學與統測放榜交叉查詢，掌握第一手放榜資訊" :title="imgRouter.alt">
            </picture>
        </h2>
    </section>
</template>
    
<script>
import {ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router'
import pcImgA from '@/assets/img/main/inner_title_pc.jpg';
import mdImgA from '@/assets/img/main/inner_title_md.jpg';
import mImgA from '@/assets/img/main/inner_title_m.jpg';
import pcImgB from '@/assets/img/freshman_gift/freshman_title_pc.jpg';
import mdImgB from '@/assets/img/freshman_gift/freshman_title_md.jpg';
import mImgB from '@/assets/img/freshman_gift/freshman_title_m.jpg';
export default {
  name: 'banner',
  setup () {
        const route = useRoute()
        const imgRouter = computed(() => {
            const routerName = ref(route.name);
            const isRouter = routerName.value === 'Freshman';
            // console.log('isRouter', routerName);
            return {
                pcImg: isRouter ? pcImgB : pcImgA,
                mdImg: isRouter ? mdImgB : mdImgA,
                mImg: isRouter ? mImgB : mImgA,
                alt: '2022大學/四技放榜交叉查詢 查榜服務',
            }
        })
    
    return{
        imgRouter
    }
  }
}
</script>