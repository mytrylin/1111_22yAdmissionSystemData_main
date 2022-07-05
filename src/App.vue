<template>
  <!-- <metainfo>
    <template v-slot:title="{ content }">{{
      content ? `${content}` : `111年度大學及四技查榜服務︱入學榜單查詢-1111人力銀行`
    }}</template>
  </metainfo> -->
  <main class="App">
      <loading v-if="isLoading" />
      <header-component></header-component>
      <router-view  :key="$route.fullPath"></router-view>
      <footer-component></footer-component>
  </main>
</template>

<script>
// import { useActiveMeta } from "vue-meta/dist/vue-meta.esm-browser";
// import { useVueMetas } from '@/composition-api/index.js'
import footer from '@/components/basic/footer.vue';
import header from '@/components/basic/header.vue';
import loading from '@/components/loading.vue';
// import schema from '@/components/basic/schema.vue';
import { storeToRefs } from 'pinia';
import { useUserLoading } from '@/stores/loading';
import { onMounted } from 'vue';
import AOS from "aos";
export default {
  name: 'App',
  components: {
      'footer-component': footer,
      'header-component': header,
      loading,
      // schema
  },
  setup () {
    const useLoading = useUserLoading();
    const { isLoading } = storeToRefs(useLoading);

    onMounted(()=> {
      // Aos
      AOS.init({
        duration: 1200,
      });
    });

    // meta
    // useVueMetas()
    // const metainfo = useActiveMeta();
  
    return{
      isLoading,
      // metainfo,
    }
  }
}
</script>

