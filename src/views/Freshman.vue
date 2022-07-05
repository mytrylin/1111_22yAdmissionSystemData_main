<template>
      <banner></banner>
     <!--身分確認 -->
        <section class="freshmanSect">
            <div class="container" data-aos="fade-up">
                <figure class="freshman__img text-center" data-aos="fade-up">
                    <img src="@/assets/img/freshman_gift/img_student.svg" alt="">
                </figure>
                 <div class="form-group row" data-aos="fade-right">
                  <header>
                    <h2>是否為111年度考生？</h2>
                  </header>
                    <div class="form-check">
                        <!-- checked -->
                        <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="1" v-model="option">
                        <label class="form-check-label" for="gridRadios1"><div class="freshman__check"></div>是</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="2" v-model="option">
                        <label class="form-check-label" for="gridRadios2"><div class="freshman__check"></div>否</label>
                    </div>
                  </div>
                  <div class="form-group row" data-aos="fade-left" data-aos-anchor-placement="top-bottom" v-show="option==1">
                    <label for="examNumberInput" class="col-form-label">應試號碼查詢</label>
                    <input type="text" v-model="ticketNum" class="form-control" id="examNumberInput" placeholder="請輸入">
                  </div>
                  <div class="form-group row">
                      <button type="submit" class="freshman__btn" @click="submit">搜尋</button>
                  </div>

            </div>
        </section>
         <!-- work Swiper -->
        
        <!-- parttimeSect -->
        <section class="parttimeSect" v-if="searchJobPage">
            <freshmanJob type="1" v-if="option_slowy==1 && freshmanSchool.length!=0" :freshman-school="freshmanSchool" :key="ticketNum_slowly"></freshmanJob>
            <freshmanJob type="2" v-if="option_slowy==2"></freshmanJob>
        </section>
        
        <!-- universitySect -->
        <section class="universitySect">
            <keep-alive>
                <freshmanSwiper type="1" v-if="option_slowy==1 && freshmanSchool.length!=0" :freshman-school="freshmanSchool" :key="ticketNum_slowly"></freshmanSwiper>
            </keep-alive>
            <keep-alive>
                <freshmanSwiper type="2" v-if="option_slowy==2"></freshmanSwiper>
            </keep-alive>
        </section>
        <!-- memberSect -->
        <section class="memberSect" v-if="searchJobPage">
            <div class="container" data-aos="fade-up">
                <h2 class="member__firstTitle" data-aos="fade-up">搶先獲得1111會員卡</h2>
                <p class="member__text" data-aos="fade-down">享受多采多姿的大學生活前，先為自己的未來鋪路！取得專屬會員卡提早取得被知名企業看見的機會。還能解鎖各項1111會員專屬推薦唷！</p>
                <img class="member__img" src="@/assets/img/freshman_gift/card.png" alt="1111黃金會員卡" data-aos="flip-down"  data-aos-delay="500">
                <div class="member__footer">
                    <a href="https://event.1111.com.tw/event22/2022membercard/" target="_blank" rel="noopener noreferrer" class="freshman__btn">立即取卡</a>
                </div>
            </div>
        </section>
     
</template>
    
<script >
// @ is an alias to /src
import { popularJobNo } from '@/api/index';
import { useUserStore } from '@/stores/user';
import { useUserLoading } from '@/stores/loading';
import { storeToRefs } from 'pinia';
import banner from '@/components/basic/banner.vue';
import freshmanJob from '@/components/freshmanJob.vue';
import freshmanSwiper from '@/components/freshmanSwiper.vue';
import { getFreshmanData } from '@/composition-api/useApi'
import {ref, computed} from 'vue';
import _ from "lodash";
export default {
 components: {
    banner,
    freshmanJob,
    freshmanSwiper
  },
  setup(){

    // footer 樣式調整用
    document.getElementsByTagName('body')[0].className = 'Freshman-body';
    // login
    const userStore = useUserStore();
    const useLoading = useUserLoading();
    const { usersTalentNo } =  storeToRefs(userStore);
    const { isLoading } = storeToRefs(useLoading)
    isLoading.value = false
    process.env.NODE_ENV==='development' ? usersTalentNo.value = '50136105' : userStore.fetchUsers()
    const ticketNum = ref('')
    const ticketNum_slowly = ref('')
    // 10004716
    // 是否為111年度考生？
    const option = ref();
    const option_slowy = ref();
    const searchJobPage = ref(false)
    const ticketNumData = ref({})
    const freshmanSchool = ref([])
    
    async function submit (){
        if(usersTalentNo.value === ""){
            if(confirm('請先登入/註冊才可以報名查榜服務新鮮人新手包唷！')) {
             location.href = location.host === "192.168.1.234" ? "http://192.168.1.234/talents/memberlogin.asp?ref=" + 'http://192.168.1.234/event22/22yAdmissionSystem/freshman'+"&IsThirdParty=true" : "https://www.1111.com.tw/login/index?ReturnUrl=" + "https://event.1111.com.tw/event22/22yAdmissionSystem/freshman" + "&IsThirdParty=true";
          } else return
        }else if(_.isEmpty(option.value)){
            alert("請勾選是否為111年度考生？")
        }else if(_.isEmpty(ticketNum.value) && option.value==1){
            alert("請輸入應試碼")
        }else{
            option_slowy.value = option.value
            ticketNum_slowly.value = ticketNum.value
            freshmanSchool.value = []
            let examType = ticketNumCheckExamType(ticketNum_slowly.value)
            if(option_slowy.value==1) {
                ticketNumData.value = 
                await getFreshmanData(`years=111&typeRef=${examType}&schoolType=1&seachType=2&distinctName=1&examType=${examType}&pageshow=1&page=1&ticketNum=${ticketNum_slowly.value}`)

                if(ticketNumData.value) {
                    freshmanSchool.value = filterticketNumData(ticketNumData.value)
                    searchJobPage.value = true
                } else {
                    alert('查無此應試碼資料')
                }
                
            }
            else if(option_slowy.value==2) {
                searchJobPage.value = true
            }
            
        }
    }

    function filterticketNumData(data) {
        const set = new Set();
        let admit = data.get_info.split(',').filter(el => el);
        let wating = data.wait_info.split(',').filter(el => el);
        let summaryList = [...admit, ...wating]
        summaryList = summaryList.filter(item => !set.has(item.split('_')[11]) ? set.add(item.split('_')[11]) : false)
        return summaryList
    }

    function ticketNumCheckExamType(ticketNum) {
        if(ticketNum.slice(0,1)==1) return 1
        else return 2
    }
    
    return {
        ticketNum,
        ticketNum_slowly,
        submit,
        option,
        option_slowy,
        searchJobPage,
        freshmanSchool
    }
  }
}
</script>

<style>
.Freshman-body  footer{margin-top: 0; border-top: 1px solid #fff;}
.freshman__btn:hover{text-decoration: initial;}
html{scroll-behavior: smooth;}
</style>