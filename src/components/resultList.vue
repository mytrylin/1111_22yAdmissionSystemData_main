<template>  

    <router-link  v-bind="$attrs" v-if="orderbyQuery !== undefined" class="detail__school-name" :to="`/result?type=${Titem.schoolType}&years=${nowYears}&orderby=1&schoolType=${Titem.schoolType}&schoolCode=${Titem.schoolNum}&educationCode=${Titem.departmentNum}&examType=${examTypeHome}`">
    <h3 >
      <span>{{ Titem.schoolName }}</span>{{ Titem.educationName }}
    </h3>
  </router-link>
 
    <router-link  v-bind="$attrs" v-else class="detail__school-name" :to="`/result?type=${Titem.schoolType}&years=${nowYears}&orderby=1&schoolType=${Titem.schoolType}&schoolCode=${Titem.schoolNum}&educationCode=${Titem.departmentNum}&examType=${type}`">
    <h3 >
      <span>{{ Titem.schoolName }}</span>{{ Titem.educationName }}
    </h3>
  </router-link>
  <button @click="educationBtn" v-if="Titem.TUNsid === '' && Titem.TUNeducationCode === '' " class="detail__school-btn"><img src="@/assets/img/main/icon_info.svg" :alt="Titem.schoolName + Titem.educationName" :title="Titem.schoolName + Titem.educationName"></button>
  <a v-else  v-bind="$attrs" class="detail__school-btn" target="_blank" :href="'https://university.1111.com.tw/company.asp?sid='+ Titem.TUNsid +'&codeNo=' + Titem.TUNeducationCode"><img src="@/assets/img/main/icon_info.svg" :alt="Titem.schoolName + Titem.educationName" :title="Titem.schoolName + Titem.educationName"></a>
  <div class="detail__status">
    <span :class="Titem.type == '正取' ? 'detail__admission' : 'detail__alternate'">
      <template v-if="Titem.orderBy !== '0' && Titem.studentType == ''">
        {{ Titem.type + Titem.orderBy }}
      </template>
      <template v-else-if="Titem.orderBy !== '0' && Titem.studentType !== ''">
        <b v-if="Titem.studentType != 0" class="detail__type">{{Titem.studentType}}</b>
        {{' '+ Titem.type + Titem.orderBy }}
      </template>
      <template v-else-if="Titem.orderBy == '0' && Titem.studentType !== ''">
        <b v-if="Titem.studentType != 0" class="detail__type">{{Titem.studentType}}</b>
        {{  ' '+ Titem.type }}
      </template>
      <template v-else>
        {{ Titem.type }}
      </template>
    </span>
  </div>
</template>

<script>

import { useRouter, useRoute } from 'vue-router';
import { useUserParameter } from "@/stores/useParameter";
import { storeToRefs } from "pinia";
import { inject } from "vue";
import { login } from '@/composition-api/useApi';
export default {
  props: {
    Titem: {
      type: Object,
      default: () => ({}),
    },
    noInformation:{
      type: Boolean,
      default: true,
    },
    nowYears: {
      type: String,
      default: '',
    },
    type:{
      type: String,
      default: "",
    },
    examTypeHome:{
      type: String,
      default: "",
    }
  },
  setup(props) {
    const router = useRouter();
    const route = useRoute();
    const sid = props.Titem.TUNsid;
    const educationCode = props.Titem.TUNeducationCode;
    const educationBtn = () => {
      props.noInformation == false ? sid === '' && educationCode === '' ?  router.push('/'): '': ''
    }

    const useParameter = useUserParameter();
    const { queryName } = storeToRefs(useParameter);

    const orderbyQuery =  route.query.orderby;

    const routeProvide = inject("route");

    return{educationBtn, queryName, orderbyQuery, routeProvide}

  }
}
</script>

<style>

</style>