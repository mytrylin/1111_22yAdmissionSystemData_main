<template>
  <div id="freshman-job-list" class="container" data-aos="fade-up">
    <h2 class="swiper__title" data-aos="fade-up">
      <img src="assets/img/freshman_gift/icon_worktitle.svg" class="swiper__title-img" alt="">
      熱門打工機會<span v-if="type==1">（依照考生錄取學校推薦）</span>：
    </h2>
    <div class="parttime__contentBox" data-aos="fade-down">
      <div class="parttime__wrapper">

        <article class="parttime__list" v-for="(item, index) in finalJobList" :key="index">
          <h2 class="parttime__title" data-aos="fade-up">
            <img src="@/assets/img/freshman_gift/icon_flag.svg" class="parttime__title-img" alt="">
            {{item.title}}
          </h2>

          <template v-if="item.jobList.length!=0">
            <div class="parttime__box" v-for="job in item.jobList" :key="job.employeeNo">
              <a class="parttime__text-work" :href="'https://www.1111.com.tw/job/'+job.employeeNo" target="_blank">
                <h4> {{job.position0}} </h4>
              <span> {{job.oorgan}} </span>
              </a>
              <h3 class="parttime__pay"> {{job.salshow}} </h3>
              <button type="apply" class="parttime__btn" @click="toUrl('https://www.1111.com.tw/job/'+job.employeeNo)">應徵</button>
            </div>

            <div data-aos="fade-up">
              <button type="submit" class="parttime__more-btn" @click="toUrl(item.link)">查看更多機會 →</button>
            </div>
          </template>
          <template v-else>
            目前無打工機會!
          </template>
        </article>
        
      </div>
    </div>
  </div>
</template>
<script>
import {ref, onMounted} from 'vue';
import { getParttimgJob } from '../composition-api/useApi'
import { randData } from '@/composition-api/useFn'
export default {
  name: 'freshmanJob',
  props: {
    // 1 111年考生 2 非111年考生
    type: String,
    // 111年考生正取與備取科系資料
    freshmanSchool: Array
  },
  setup(props) {
    const jobOtherList = ref([
      {
        title: '時薪180 UP',
        apiUrl: '?ssi=1&tt=2,4&sa=5',
        link: 'https://parttime.1111.com.tw/jobList.asp?ssi=1&tt=2,4&sa=5&agent=parttime_mid_highsalary',
        jobList: []
      },
      {
        title: '假日打工',
        apiUrl: '?ssi=1&tt=2,4&wk=8',
        link: 'https://parttime.1111.com.tw/jobList.asp?ssi=1&tt=2,4&wk=8&agent=parttime_mid_weekend',
        jobList: []
      },
      {
        title: '短期彈性',
        apiUrl: '?ssi=1&tt=2,4&ks=短期',
        link: 'https://parttime.1111.com.tw/jobList.asp?ssi=1&tt=2,4&ks=%E7%9F%AD%E6%9C%9F&agent=parttime_mid_shorttime',
        jobList: []
      },
      {
        title: '現領日薪',
        apiUrl: '?ssi=1&tt=2,4&ks=領現,日薪,日領',
        link: 'https://parttime.1111.com.tw/jobList.asp?ssi=1&tt=2,4&ks=%E9%A0%98%E7%8F%BE,%E6%97%A5%E8%96%AA,%E6%97%A5%E9%A0%98&agent=parttime_mid_dayCash',
        jobList: []
      },
      {
        title: '門市打工',
        apiUrl: '?ssi=1&tt=2,4&ks=門市,量販,超市,賣場',
        link: 'https://parttime.1111.com.tw/jobList.asp?ssi=1&tt=2,4&ks=%E9%96%80%E5%B8%82,%E9%87%8F%E8%B2%A9,%E8%B6%85%E5%B8%82,%E8%B3%A3%E5%A0%B4&agent=parttime_mid_storeclerk',
        jobList: []
      },
      {
        title: '辦公室打工',
        apiUrl: '?ssi=1&tt=2,4&ks=會計,行政,文書,內勤,資料輸入,辦公室',
        link: 'https://parttime.1111.com.tw/jobList.asp?ssi=1&tt=2,4&ks=%E6%9C%83%E8%A8%88,%E8%A1%8C%E6%94%BF,%E6%96%87%E6%9B%B8,%E5%85%A7%E5%8B%A4,%E8%B3%87%E6%96%99%E8%BC%B8%E5%85%A5,%E8%BE%A6%E5%85%AC%E5%AE%A4&agent=parttime_mid_office',
        jobList: []
      }
    ])
    const jobSchoolList = ref([])
    const finalJobList = ref([])
    onMounted(async() => {
      if(props.type==1) {

        props.freshmanSchool.map( item => {
          jobSchoolList.value.push({
            title: item.split('_')[1],
            apiUrl: '?ssi=3&sc='+item.split('_')[11],
            link: 'https://parttime.1111.com.tw/jobList.asp?ssi=3&sc='+item.split('_')[11],
            jobList: []
          })
        })
        finalJobList.value = jobSchoolList.value
      }
      else if(props.type==2) {
        finalJobList.value = jobOtherList.value
      }
      finalJobList.value.forEach(async(item) => {       
        item.jobList = await getParttimgJob(item.apiUrl)
        if(item.jobList.length!=0) item.jobList = randData(item.jobList,3)
        else item.jobList = []
      })
      setTimeout(() => {
        document.documentElement.scrollTop = document.getElementById('freshman-job-list').offsetTop - 100
      }, 0);
    })
    function toUrl(url) {
      window.open(url)
    }
    return {
      finalJobList,
      toUrl
    }
  }
}
</script>