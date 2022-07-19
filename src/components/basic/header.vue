<template>
   <header>
        <!-- navbar -->
        <nav class="navbar navbar-expand-lg navbar-light fixed-top">
            <div class="container">
                <div class="navbar_content">
                   <router-link class="navbar_logo"  to="/" title="查榜服務">
                      <img src="@/assets/img/main/logo.svg" alt="1111放榜服務提供給您最即時的放榜資訊，網羅全台灣大學榜單與四技榜單，掌握第一手各校系" title="查榜服務" srcset="">       
                    </router-link>
                    <button class="navbar-toggler" type="button" @click="show = !show" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div v-if="show" class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ml-auto">                
                        <li class="nav-item dropdown" v-for="item in header" :key="item.id">
                            <a class="nav-link dropdown-toggle" title="最新榜單" :class="{new_link : item.id == 2}" :href="item.url" :id="`navbarDropdown_${item.id}`" role="button" data-toggle="dropdown" aria-expanded="false">
                                {{item.title}}
                                <img v-if="item.id == 2" src="assets/img/main/icon_menu_new.svg" alt="111年統測最新榜單" title="111年統測最新榜單">
                            </a>
                            <div class="dropdown-menu"  :aria-labelledby="`navbarDropdown_${item.id}`">
                                <router-link v-for="itemChild in item.child" :key="item.id" class="dropdown-item" @click="widthFn"  :to="itemChild.url" >
                                  {{itemChild.title}}
                                </router-link>
                            </div>
                        </li>
                        <li class="nav-item">
                          <router-link class="nav-link text-nowrap"  @click="widthFn" to="/freshman" >新鮮人新手包</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>
<script>
import {reactive, ref, onMounted, onUnmounted, watch} from 'vue';
export default {
  name:'headerComponents',
  props: {
  },
  setup () {
    const show = ref(true);
    const width = ref(window.screen.width);
    const widthFn = () => {
      width.value < 991 ? show.value = false : show.value = true;
    }
    const move = (e) => {
      width.value = e.target.screen.width;
      widthFn();
    }

    onMounted(() => {
      window.addEventListener('resize', move);
    });

    onUnmounted(() => {
        window.removeEventListener("resize", move);
    });
    const header = reactive(
      [   
          {
              id: '1',
              title: '大學申請入學查榜',
              child: [
                  {
                    id: '11',
                    title: '111年查榜',
                    url: '/?type=1&years=111&examType=1'
                  },
                  {
                    id: '12',
                    title: '110年查榜',
                    url: '/?type=1&years=110&examType=1'
                  },
                  // {
                  //   id: '13',
                  //   title: '109年查榜',
                  //   url: '/?type=1&years=109'
                  // }
              ]
          },
          {
              id: '2',
              title: '統測甄選入學查榜',
              child: [
                  {
                    id: '21',
                    title: '111年科大查榜',
                    url: '/?type=2&years=111&examType=2'
                  },
                  // {
                  //   id: '22',
                  //   title: '110年查榜',
                  //   url: '/?type=2&years=110&examType=2'
                  // },
                  // {
                  //   id: '23',
                  //   title: '109年查榜',
                  //   url: '/?type=2&years=109'
                  // }
                  {
                    id: '21',
                    title: '111年大學查榜',
                    url: '/?type=1&years=111&examType=2'
                  },
              ]
          },
          {
              id: '3',
              title: '姓名查榜',
              child: [
                  {
                    id: '31',
                    title: '111年查榜',
                    url: '/inquire?years=111&searchType=1&examType=1'
                  },
                  {
                    id: '32',
                    title: '110年查榜',
                    url: '/inquire?years=110&searchType=1&examType=1'
                  },
                  // {
                  //   id: '33',
                  //   title: '109年查榜',
                  //   url: '/inquire?years=109&searchType=1'
                  // }
              ]
          },
          {
              id: '4',
              title: '應試號碼查榜',
              child: [
                  {
                    id: '41',
                    title: '111年查榜',
                    url: '/inquire?years=111&searchType=2&examType=1'
                  },
                  {
                    id: '42',
                    title: '110年查榜',
                    url: '/inquire?years=110&searchType=2&examType=1'
                  },
                  // {
                  //   id: '43',
                  //   title: '109年查榜',
                  //   url: '/inquire?years=109&searchType=2'
                  // }
              ]
          },
          // {
          //     id: '5',
          //     title: '考區查榜',
          //     child: [
          //         {
          //           id: '51',
          //           title: '111年查榜',
          //           url: ''
          //         },
          //         {
          //           id: '52',
          //           title: '101年查榜',
          //           url: ''
          //         },
          //         {
          //           id: '53',
          //           title: '109年查榜',
          //           url: ''
          //         }
          //     ]
          // }
      ]
    )
    return{
      header,
      show,
      widthFn
    }
  }
}
</script>