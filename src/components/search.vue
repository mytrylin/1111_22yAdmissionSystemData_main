<template>
    <div class="searchBox" :id="item.type" ref="type">
        <div class="search__container">
            <h3 class="search__title">【{{item.school}}】{{nowTypeInquire}}查榜</h3>
            <div class="search__group">
                <input class="search__input" type="text" :placeholder="`請輸入${nowTypeInquire}`" @keyup.enter="handleProps" v-model="searchInput">
                <button class="search__btn" @click="handleProps">搜尋</button>
            </div>
            <template v-if="item.school === '申請入學'"><p v-if="nowTypeInquire == '應試號碼' && years == '111'" class="mt-3">備註：欲查詢111年度國立臺灣大學榜單，請搜尋「報名編號」</p></template>
        </div>
    </div>
</template>

<script>
import {ref, computed, onMounted} from "vue";
import { useParams  } from '@/composition-api/index';
export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    years: {
      type: String,
      default: '',
    }
  },
  setup(props, { emit }) {
    const { nowTypeInquire } = useParams();
    const searchInput = ref('');
    const type = ref(null);
    
    const handleProps = () => {
        const typeRef = `${type.value.id}`;
        const search = `${searchInput.value}`;
        emit("Combination", typeRef, search);
    };
    return {
        searchInput,
        handleProps,
        type,
        nowTypeInquire
        // emit: context.emit,
    }
  }
}
</script>

<style>

</style>