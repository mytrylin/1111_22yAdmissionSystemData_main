<template>
    <template v-if="!showWidth">
      <nav aria-label="Page navigation" class="paginator_mb d-lg-none d-xl-none" v-if="(nowPage == '1' && dataLength >= 10) || nowPage > '1'">
        <ul class="pagination justify-content-center">
            <li class="page_item" :class="nowPage == '1' ? 'disabled' : ''"><button class="page_link" @click="changePage(1)"></button></li>
            <li class="page_item" :class="nowPage == '1' ? 'disabled' : ''"><button class="page_link" @click="changePage(parseInt(nowPage) - 1)">上一頁</button></li>
            <li class="page_item active">
              <select class="page_select" v-model="nowPage" @change="changePage(nowPage)" >
                <option v-for="page in totalpage" :key="page" :value="page">{{ page }}</option>
              </select>
            </li>
            <li class="page_item" :class="nowPage == totalpage ? 'disabled' : ''"><button class="page_link" @click="changePage(parseInt(nowPage) + 1)">下一頁</button></li>
            <li class="page_item" :class="nowPage == totalpage ? 'disabled' : ''"><button class="page_link" @click="changePage(totalpage)"></button></li>

            <li class="page_item">
              <div class="input_group">
                <input type="text" class="form_control" placeholder="欲前往頁數" aria-label="欲前往頁數" v-model="enterPage" @keyup.enter="changePage(enterPage)">
                <div class="input_group_append">
                  <button class="page_link" @click="changePage(enterPage)"></button>
                </div>
              </div>
            </li>
          </ul>
        <p class="page_total">第&nbsp;{{ nowPage }}&nbsp;頁&nbsp;/&nbsp;共&nbsp;{{ totalpage }}&nbsp;頁</p>
      </nav>
    </template> 
    <!-- paginator pc-->
    <template v-else>
      <nav aria-label="Page navigation" class="paginator_pc d-none d-lg-block">
        <ul class="pagination justify-content-center">
            <li class="page_item" :class="nowPage == '1' ? 'disabled' : ''"><button class="page_link" @click="changePage(1)"></button></li>
            <li class="page_item" :class="nowPage == '1' ? 'disabled' : ''"><button class="page_link" @click="changePage(parseInt(nowPage) - 1)">上一頁</button></li>
            <li
              v-for="page in pages" :key="page" :value="page"
              class="page_item"
              :class="page == nowPage ? 'active' : ''"
              @click="changePage(page)"
            >
              <button class="page_link">{{ page }}</button>
            </li>
            <li class="page_item" :class="nowPage == totalpage ? 'disabled' : ''"><button class="page_link" @click="changePage(parseInt(nowPage) + 1)">下一頁</button></li>
            <li class="page_item" :class="nowPage == totalpage ? 'disabled' : ''"><button class="page_link" @click="changePage(totalpage)"></button></li>
            <li class="page_item">
                <div class="input_group">
                    <input type="text" class="form_control" placeholder="欲前往頁數" aria-label="欲前往頁數" v-model="enterPage" @keyup.enter="changePage(enterPage)">
                    <div class="input_group_append">
                        <button class="page_link" @click="changePage(enterPage)"></button>
                    </div>
                </div>
            </li>
        </ul>
        <p class="page_total">第&nbsp;{{ nowPage }}&nbsp;頁&nbsp;/&nbsp;共&nbsp;{{ totalpage }}&nbsp;頁</p>
      </nav>
    </template> 
</template>
    
<script>
import { useParams, getQuery, userDeviceFns } from "@/composition-api/index";
// import { usedataStore } from "@/stores/fetchData";
// import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { ref, computed } from "vue";
import { inject } from "vue";
export default ({
  props: {
    num: {
      type: Number,
      default: 991,
    }, 
    totalpage: {
      type: Number,
      default: 0,
    },
    totalrecord: {
      type: Number,
      default: 0,
    },
  },
  emits: ['changePageEmitBtn'],
  setup(props, { emit }) {
    const isLoadings = inject("isLoadings");
    const dataLength = inject("dataLength");
    const enterPage = ref(null)
  
    const nowPage = ref(1);
    const clickPage = ref(1);
    async function changePage(page) {
      if(page == '') return

      clickPage.value = page;
      isLoadings.value = true;
      enterPage.value = ""

      if (page < 1) {
        nowPage.value = 1;
      } else if (page > props.totalpage) {
        nowPage.value = props.totalpage;
      } else {
        nowPage.value = page;
      }
      emit("changePageEmitBtn", nowPage);
    }

    // const maxViewPage = ref(10)
    // const startPage = computed(() => {
    //    if(clickPage.value === 1){
    //     return 1
    //   }
    //   if(clickPage.value === props.totalpage){
    //     return props.totalpage - maxViewPage.value + 1
    //   }
    //   return clickPage.value - 1
    // });


    // const endPage = computed(() => {
    //    return Math.min(startPage.value + maxViewPage.value, props.totalpage)
    // });

    // const pages = computed(() => {
    //   let pageArr = [];
    //   for(let i = startPage.value; i<= endPage.value; i+=1){
    //     pageArr.push(i)
    //   }
    //   return pageArr.length <　10 ?  endPage.value :   pageArr
    // });


    const maxViewPage = ref(5)

    const pages = computed(() => {
      let pageArr = []
      nowPage.value = parseInt(nowPage.value)
      
      if(props.totalpage < maxViewPage.value) {
        for(let i = 1; i <= props.totalpage; i++) {
          pageArr.push(i)
        }
      } else if (nowPage.value + 2 > props.totalpage) {
        for(let i = props.totalpage -4; i <= props.totalpage; i++) {
          pageArr.push(i)
        }
      } else {
        if(nowPage.value -2 > 0) {
          for(let i = nowPage.value -2; i <= nowPage.value +2; i++) {
            pageArr.push(i)
          }
        } else {
          for(let i = 1; i <= maxViewPage.value; i++) {
            pageArr.push(i)
          }
        }
      }
      return pageArr
    });


    // RWD  切換
    const {width, showWidth} = userDeviceFns(props.num);
    return {
      pages,
      width, showWidth,
      clickPage,
      nowPage,
      changePage,
      dataLength,
      isLoadings,
      enterPage
    };
  }
  
})
</script>
    
<style>
    
</style>