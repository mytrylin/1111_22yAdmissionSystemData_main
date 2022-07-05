<template>
    <a class="e__card" :href="`https://www.1111.com.tw/job/${item.employeeNo}/`" target="_blank">
        <figure class="e__card-img">
            <img :src="`https://images.1111.com.tw/oad/${item.organNo}.jpg`" alt="" @error="errorImage">
        </figure>
        <span class="e__card-text-work">{{item.position}}</span>
        <h4 class="e__card-subTitle-work">{{item.oorgan}}</h4>
        <h3 class="e__card-firstTitle-work">{{item.salshow}}</h3>
    </a>
</template>
<script>
import _ from "lodash";
import {ref} from "vue";
export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {

    return {
    }
  }
}
</script>
<style>
    
</style>