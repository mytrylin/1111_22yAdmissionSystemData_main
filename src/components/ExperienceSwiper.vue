<template>
   <div class="swiper__contentBox" >
        <div class="swiper-button-next"  :class="next">
            <slot name="next"></slot>
        </div>
        <div class="swiper-button-prev" :class="prev">
            <slot name="prev"></slot>
        </div>
        <Swiper 
            :class='`${className}`'
            :modules="modules"
            :spaceBetween="10"
            :slides-per-group="3"
            :loop="true"
            :centeredSlides="false"
            :autoplay="{delay: `${delay}`, pauseOnMouseEnter:true}"
            :pagination="{ clickable: true }"
            :waitForTransition="true"
            :navigation="{nextEl: `.swiper-button-next.${next}`, prevEl: `.swiper-button-prev.${prev}`}"
            :breakpoints="{
            '425': {
                slidesPerView: 3,
                spaceBetween: 15,
            },
            '768': {
                slidesPerView: 3,
                spaceBetween: 15,
            },
            '1024': {
                slidesPerView: 3,
                spaceBetween: 25,
            },
            }"
          @mouseleave="stopSwip($event)"
          @mouseenter="startSwip($event)"
        >
          <slot name="slide"></slot>
        </Swiper>
    </div>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper } from "swiper/vue";
// import {ref} from 'vue';
// Import Swiper styles
import "swiper/css";
// import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination, Autoplay} from "swiper";


export default {
  components: {
    Swiper,
  },
  props: {
    itemList: {
      type: Array,
      default: () => [],
    },
    className:{
      type: String,
      default: '',
    },
    delay:{
      type: Number
    },
    next:{
      type: String,
      default: '',
    },
    prev:{
      type: String,
      default: '',
    }
  },
  setup() {
    const stopSwip = (event) => {
      event.target.swiper.$el[0].swiper.autoplay.start()
    };
    const startSwip = (event) => {
      event.target.swiper.$el[0].swiper.autoplay.stop()
    }
    return {
      stopSwip,
      startSwip,
      modules: [Navigation, Pagination, Autoplay,],
    };
  },
};
</script>

<style scoped>
.swiper-button-next, .swiper-button-prev {
    /* position: absolute; */
    /* top: 50%; */
    /* width: calc(var(--swiper-navigation-size)/ 44 * 27); */
    /* height: var(--swiper-navigation-size); */
    /* margin-top: calc(0px - (var(--swiper-navigation-size)/ 2)); */
    /* z-index: 10; */
    /* cursor: pointer; */
    /* display: flex; */
    /* align-items: center; */
    /* justify-content: center; */
    /* color: var(--swiper-navigation-color,var(--swiper-theme-color)); */
}
.swiper-button-next:after, .swiper-button-prev:after {
    display: none;
}
</style>