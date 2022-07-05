<template>
    <a class="e__card" :href="'https://university.1111.com.tw/nw1221-graduation.asp?codeno='+item.codeNo" target="_blank">
        <figure class="e__card-img">
            <img class="card-image" v-lazy="'https://university.1111.com.tw'+item.imgUrl" alt="">
        </figure>
        <h3 class="e__card-firstTitle-uv"> {{item.schoolName}} </h3>
        <div class="e__card-footer">
            <h3 class="e__card-subTitle-uv"> {{item.departmantName}} </h3>
            <a :href="'https://university.1111.com.tw/nw1221-graduation.asp?codeno='+item.codeNo" target="_blank" class="detail__admission">畢業出路</a>
        </div>
    </a>
</template>
    
<script>
// import defaultImg from '@/assets/img/freshman_gift/default_img.png'
export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  setup() {
    function errorDefault(event) {
      event.target.src = defaultImg
    }
    return {
      errorDefault
    }
  }
}
</script>
<style scope>
    .card-image{
      height: 130px;
    }
</style>