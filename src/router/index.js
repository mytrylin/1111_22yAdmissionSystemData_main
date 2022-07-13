import { createRouter, createWebHistory, useRouter } from 'vue-router'

const router = createRouter ({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/index.asp',
      name: 'asp',
      component: () => import('../views/Home.vue'),
      meta: {
        title: '111年度大學及四技查榜服務︱入學榜單查詢-1111人力銀行'
      }
    },
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue'),
      props: route => ({ type: route.query.type, years: route.query.years, examType: route.query.examType }),
      meta: {
        title: '111年度大學及四技查榜服務︱入學榜單查詢-1111人力銀行'
      }
    },
    {
      path: '/education',
      name: 'Education',
      component: () => import('../views/Education.vue'),
      props: route => ({ type: route.query.type, years: route.query.years, schoolCode: route.query.schoolCode, examType: route.query.examType }),
      meta: {
        title: '111年度大學及四技查榜服務︱入學榜單查詢-1111人力銀行'
      }
    },
    {
      path: '/inquire',
      name: 'Inquire',
      component: () => import('../views/Inquire.vue'),
      props: route => ({years: route.query.years, seachType: route.query.seachType, examType: route.query.examType}),
      meta: {
        title: '111年度大學及四技查榜服務︱入學榜單查詢-1111人力銀行'
      }
    },
    {
      path: '/result',
      name: 'Result',
      component: () => import('../views/Result.vue'),
      props: route => ({ schoolType: route.query.schoolType, years: route.query.years, schoolCode: route.query.schoolCode, educationCode: route.query.educationCode, examType: route.query.examType }),
      meta: {
        title: '111年度大學及四技查榜服務︱入學榜單查詢-1111人力銀行'
      }
    },
    {
      path: '/freshman',
      name: 'Freshman',
      component: () => import('../views/Freshman.vue'),
    },
    {
      path: '/:catchAll(.*)',
      name: '404',
      redirect:'/?type=2&years=111&examType=2'
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ left: 0, top: 0 , behavior: 'smooth'})
      }, 300)
    })
  }
})

router.beforeEach((to, from, next) => {
  const title = to.query.seachType == 1 ? "111年度大學及四技姓名查榜︱入學榜單查詢-1111人力銀行" : to.query.seachType == 2 ? "111年度大學及四技應試號碼查榜︱入學榜單查詢-1111人力銀行" : "111年度大學及四技查榜服務︱入學榜單查詢-1111人力銀行"
  const keywords = to.query.seachType == 1 ? "姓名查榜、大學放榜、大學申請入學、四技放榜、四技申請入學、放榜" : to.query.seachType == 2 ? "應試號碼查榜、大學放榜、大學申請入學、四技放榜、四技申請入學、放榜" : "大學放榜、大學申請入學、四技放榜、四技申請入學、放榜、姓名查榜、應試碼查榜"
  const url = 'https://www.1111.com.tw' + to.href
  document.title = title;
  document.querySelector('meta[name="title"]') ? document.querySelector('meta[name="title"]').content = title : ''
  document.querySelector('meta[name="keywords"]') ? document.querySelector('meta[name="keywords"]').content = keywords : ''
  document.querySelector('meta[name="twitter:title"]') ? document.querySelector('meta[name="twitter:title"]').content = title : ''
  document.querySelector('meta[name="twitter:url"]') ? document.querySelector('meta[name="twitter:url"]').content = url : ''
  document.querySelector('meta[name="twitter:keywords"]') ? document.querySelector('meta[name="twitter:keywords"]').content = keywords : ''
  document.querySelector('meta[property="og:keywords"]') ? document.querySelector('meta[property="og:keywords"]').content = keywords : ''
  document.querySelector('meta[property="og:site_name"]') ? document.querySelector('meta[property="og:site_name"]').content = title : ''
  document.querySelector('meta[property="og:url"]') ? document.querySelector('meta[property="og:url"]').content = url : ''
  document.querySelector('link[rel="canonical"]') ? document.querySelector('link[rel="canonical"]').href = url : ''
  next()
});

export default router