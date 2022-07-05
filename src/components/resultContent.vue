<template>
  <!-- list head -->
  <div class="detail__headBox">
    <ul  class="detail__head-container" :class="{ detail__search: nowEducationCode == '' }" >
      <li class="detail__head-list">
        <div class="detail__head-top">
          <b class="detail__head-top-beforeGroup" v-if="nowEducationCode !== ''"><span>錄取</span><span>狀態</span></b>
          <b class="detail__head-top-afterGroup" ><span>應試碼</span><span>姓名</span></b>
        </div>
        <div class="detail__head-bottom">
          <b class="detail__head-bottom-before">二階段通過校系</b>
          <b class="detail__head-bottom-center">校系介紹</b>
          <b class="detail__head-bottom-after" ><span>甄試</span><span>結果</span></b>
        </div>
      </li>
    </ul>
  </div>
  <!-- list content -->
  <article v-if="!isLoadings" class="detail__contentBox">
    <ul
      class="detail__container"
      :class="{ detail__search: nowEducationCode == '' }"
    >
      <li class="detail__list" v-for="item in data" :key="item">
        <div class="detail__top">
          <div class="detail__status" v-if="nowEducationCode !== ''">
            <span
              v-if="
                item.type == '正取' &&
                item.ranking !== 0 &&
                isMusicEducation !== 1
              "
              class="detail__admission"
            >
              <b v-if="item.studentType != ''" class="detail__type">{{
                item.studentType
              }}</b>
              {{ item.type + item.ranking }}
            </span>
            <span
              v-else-if="
                item.type == '正取' &&
                item.ranking !== 0 &&
                isMusicEducation == 1
              "
              class="detail__admission"
            >
              <b v-if="item.studentType != ''" class="detail__type">{{
                item.studentType
              }}</b>
              {{ " " + item.type + item.ranking }}
            </span>
            <span
              v-else-if="
                item.type == '正取' &&
                item.ranking == 0 &&
                isMusicEducation == 1
              "
              class="detail__admission"
            >
              <b v-if="item.studentType != ''" class="detail__type">{{
                item.studentType
              }}</b>
              {{ " " + item.type }}
            </span>
            <span v-else :class=" item.type == '正取' ? 'detail__admission' : 'detail__alternate' ">
              <b v-if="item.studentType != ''" class="detail__type">{{item.studentType}}</b>
              <template v-if="item.type == '正取'">{{ item.type }}</template>
              <template v-else>{{ item.type + item.ranking }}</template>
            </span>
          </div>
          <div class="detail__info">
            <img
              alt="ticketNum"
              :src="'data:image/png;base64,' + item.Base64_ticketNum"
            />
            <img
              alt="name"
              :src="'data:image/png;base64,' + item.Base64_name"
            />
          </div>
        </div>
        <ul class="detail__school-container">
          <template v-for="(Titem, Tindex) in item.total_info" :key="Titem">
            <li
              v-if="item.show"
              class="detail__school-list"
              :class="Titem.finalChoose == '1' ? 'detail__confirm' : ''"
            >
              <resultList
                :Titem="Titem"
                :nowYears="nowYears"
                :noInformation="noInformation"
                :type="type"
                :examTypeHome="examTypeHome"
              />
            </li>
            <template v-else>
              <li
                v-if="Tindex < 3"
                class="detail__school-list"
                :class="Titem.finalChoose == '1' ? 'detail__confirm' : ''"
              >
                <resultList
                  :Titem="Titem"
                  :nowYears="nowYears"
                  :noInformation="noInformation"
                  :type="type"
                  :examTypeHome="examTypeHome"
                />
              </li>
              <li v-else-if="Tindex == 3" class="detail__close">
                <button
                  v-if="nowYears == '111'"
                  @click="check_login(item)"
                  class="detail__close-btn"
                >
                  查看更多<img
                    src="@/assets/img/main/icon_arrow_more.svg"
                    alt="查看更多"
                    srcset=""
                  />
                </button>
                <button
                  v-else
                  @click="item.show = true"
                  class="detail__close-btn"
                >
                  查看更多<img
                    src="@/assets/img/main/icon_arrow_more.svg"
                    alt="查看更多"
                    srcset=""
                  />
                </button>
              </li>
            </template>
          </template>
        </ul>
      </li>
    </ul>
  </article>
</template>

<script>
import resultList from "@/components/resultList.vue";
import { ref, inject } from "vue";
export default {
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    nowEducationCode: {
      type: String,
      default: "",
    },
    noInformation: {
      type: Boolean,
      default: true,
    },
    isMusicEducation: {
      type: Number,
      default: 0,
    },
    nowYears: {
      type: String,
      default: "",
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
  components: {
    resultList,
  },
  setup(props) {
    const isLoadings = inject("isLoadings");
    const usersTalentNoInject = inject("usersTalentNo");
    // userStore.fetchUsers();

    document.cookie = window.location.search;
    const getCookie = (name) => {
      let cookieAry = document.cookie.split(";");
      let cookieKey = [];
      let userData = {};

      for (let i = 0; i < cookieAry.length; i++) {
        cookieKey = cookieAry[i].split("=")[0].trim();
        if (cookieKey == `${name}`) {
          userData = cookieAry[i].trim();
        }
      }
      return userData;
    };

    const cookieRouter = getCookie("?years");
    const cookieRouterWin =
      window.location.host === "192.168.1.234"
        ? "http://192.168.1.234/event22/22yAdmissionSystem/result" +
          cookieRouter
        : "https://event.1111.com.tw/event22/22yAdmissionSystem/result" +
          cookieRouter;
    const cookieRouterWin_encodeURI = encodeURIComponent(cookieRouterWin);

    // console.log('cookieRouter', cookieRouter);
    // console.log('cookieRouterWin', cookieRouterWin);
    // console.log('cookieRouterWin_encodeURI', cookieRouterWin_encodeURI);

    const loginType = ref(false);
    function check_login(item) {
      if (usersTalentNoInject.value == "") {
        alert("您目前尚未登入，登入後即可查看考生完整的錄取校系");
        location.href =
          location.host === "192.168.1.234"
            ? "http://192.168.1.234/talents/memberlogin.asp?ref=" +
              cookieRouterWin_encodeURI +
              "&IsThirdParty=true"
            : "https://www.1111.com.tw/login/index?ReturnUrl=" +
              cookieRouterWin_encodeURI +
              "&IsThirdParty=true";
      }
      // else if (usersLoginType.value !== 4) {
      //     alert('未雙認證');
      //     window.location.href = 'https://www.1111.com.tw/Member/MemberData?autoRun=doubleverify';
      //     loginType.value = true
      // }
      else {
        item.show = true;
      }
    }
    return {
      check_login,
      loginType,
      isLoadings
    };
  },
};
</script>

<style>
</style>