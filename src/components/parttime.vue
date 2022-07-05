<template>
  <div class="promoteSect">
    <article class="titleBox">
      <h2><span>專屬大學生的</span>各式打工賺零用錢機會</h2>
    </article>
    <div class="container">
      <div class="row">
        <div class="col-6 col-md-3">
          <a class="promote__card" :href="`https://parttime.1111.com.tw/jobList.asp?ssi=3&sc=${schoolcode_sc}&agent=ewo_tunlist`" target="_blank">
            <figure class="promote__card-content">
              <img
                class="promote__card-img"
                src="@/assets/img/promote/icon_school.svg"
                alt=""
              />
            </figure>
            <div class="promote__card-btn">學校附近</div>
          </a>
        </div>
        <div class="col-6 col-md-3">
          <a
            class="promote__card"
            href="https://parttime.1111.com.tw/jobList.asp?ssi=1&tt=2,4&sa=5&agent=ewo_tunlist"
            target="_blank"
          >
            <figure class="promote__card-content">
              <img
                class="promote__card-img"
                src="@/assets/img/promote/icon_high_paying.svg"
                alt=""
              />
            </figure>
            <div class="promote__card-btn">高薪打工</div>
          </a>
        </div>
        <div class="col-6 col-md-3">
          <a
            class="promote__card"
            href="https://parttime.1111.com.tw/jobList.asp?ssi=1&tt=2,4&ks=%E7%9F%AD%E6%9C%9F&agent=ewo_tunlist"
            target="_blank"
          >
            <figure class="promote__card-content">
              <img
                class="promote__card-img"
                src="@/assets/img/promote/icon_short_term.svg"
                alt=""
              />
            </figure>
            <div class="promote__card-btn">短期打工</div>
          </a>
        </div>
        <div class="col-6 col-md-3">
          <a
            class="promote__card"
            href="https://parttime.1111.com.tw/jobList.asp?ssi=1&tt=2,4&ks=%E6%9C%83%E8%A8%88,%E8%A1%8C%E6%94%BF,%E6%96%87%E6%9B%B8,%E5%85%A7%E5%8B%A4,%E8%B3%87%E6%96%99%E8%BC%B8%E5%85%A5,%E8%BE%A6%E5%85%AC%E5%AE%A4&agent=ewo_tunlist"
            target="_blank"
          >
            <figure class="promote__card-content">
              <img
                class="promote__card-img"
                src="@/assets/img/promote/icon_office.svg"
                alt=""
              />
            </figure>
            <div class="promote__card-btn">辦公打工</div>
          </a>
        </div>
      </div>
      <div class="row">
        <a 
          class="promote__card-morebtn"
          href="https://university.1111.com.tw/zone/university/index.asp"
          target="_blank"
        > 前往校園版討論 </a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    schoolcode_sc: {
      type: String,
      default: () => ({}),
    },
  }
};
</script>