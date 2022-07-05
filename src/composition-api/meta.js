
import { useMeta } from "vue-meta/dist/vue-meta.esm-browser";
import { reactive, watch, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

export function useVueMeta() {
  const route = useRoute();

  const meta = reactive({
    title: "111年度大學及四技查榜服務︱入學榜單查詢-1111人力銀行",
    description:
      "111年度年度(2022)學測、統測、指考放榜交叉查詢，可依姓名、應試碼、考區等不同查榜功能，快速查詢錄取結果",
    keywords: "大學放榜、大學申請入學、四技放榜、四技申請入學、放榜、姓名查榜、應試碼查榜",
    url: "https://event.1111.com.tw/event22/22yAdmissionSystem/",
    image:
      "https://event.1111.com.tw/event22/22yAdmissionSystem/assets/img/Banner.jpg",
  });

  useMeta({
    title: meta.title,
    link: {
      rel: "canonical",
      href: meta.url
    },
    meta: [
      {
        name: "title",
        content: meta.title,
      },
      {
        name: "Description",
        content: meta.description,
      },
      {
        name: "keywords",
        content: meta.keywords,
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:locale",
        content: "zh_TW",
      },
      {
        property: "og:title",
        content: meta.title,
      },
      {
        property: "og:url",
        content: meta.url,
      },
      {
        property: "og:image",
        content: meta.image,
      },
      {
        property: "og:site_name",
        content: meta.title,
      },
      {
        property: "og:description",
        content: meta.description,
      },
      {
        name: "robots",
        content: "max-image-preview:large, max-video-preview:-1",
      },
      {
        "http-equiv": "Content-Language",
        content: "zh-Hant",
      },
    ],
    htmlAttrs: {
      lang: "zh-Hant-TW",
      class: "first-class",
    },
    twitter: {
      title: meta.title,
      description: meta.description,
      keywords: meta.keywords,
      "image:src": meta.image,
      site: meta.url,
      url: meta.url
    },
    script: [
      {
        src: "application/ld+json",
        json: [
          {
            "@context": "http://schema.org/",
            "@type": "WebSite",
            name: meta.title,
            url: meta.url,
            description: meta.description,
            potentialAction: {
              "@type": "SearchAction",
              target:
                "https://event.1111.com.tw/event22/22yAdmissionSystem/result?years=111&typeRef=1&schoolType=1&seachType=2&ticketNum={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          },
          {
            "@context": "http://schema.org",
            "@type": "Organization",
            name: "1111人力銀行",
            url: "https://www.1111.com.tw",
            logo: "https://www.1111.com.tw/images102/logo0504.png",
            contactPoint: [
              {
                "@type": "ContactPoint",
                telephone: "+886-02-8787-1111",
                contactType: "customer service",
                areaServed: ["TW"],
                availableLanguage: ["Chinese"],
              },
            ],
            sameAs: [
              "https://www.facebook.com/1111jobbank",
              "https://twitter.com/1111jobbanknews",
              "https://www.youtube.com/user/1111JobBankNEWS",
              "https://www.linkedin.com/company/1111-job-bank",
            ],
          },
        ],
      },
    ],
  });

  return {
    useVueMeta
  };
}

export function changeMeta() {
  const route = useRoute();
  const fullPathRoute = route.fullPath.split('/')[1];

  const meta = reactive({
    title: "111年度大學及四技查榜服務︱入學榜單查詢-1111人力銀行",
    description:
      "111年度年度(2022)學測、統測、指考放榜交叉查詢，可依姓名、應試碼、考區等不同查榜功能，快速查詢錄取結果",
    keywords: "大學放榜、大學申請入學、四技放榜、四技申請入學、放榜、姓名查榜、應試碼查榜",
    url: "https://event.1111.com.tw/event22/22yAdmissionSystem/",
    image:
      "https://event.1111.com.tw/event22/22yAdmissionSystem/assets/img/Banner.jpg",
  });

  watch(route, () => {
    meta.url = meta.url + fullPathRoute
    useMeta({
      link: {
        rel: "canonical",
        href: meta.url
      }
    });
  },{
    immediate: true
  })

  watch(route.query.seachType, () => {
    switch (route.query.seachType) {
      case 1:
      case '1':
        console.log('route.fullPath', route.fullPath)
        meta.title = '111年度大學及四技姓名查榜︱入學榜單查詢-1111人力銀行'
        meta.keywords = '姓名查榜、大學放榜、大學申請入學、四技放榜、四技申請入學、放榜'
        break;
      case 2:
      case '2':
        meta.title = '111年度大學及四技應試號碼查榜︱入學榜單查詢-1111人力銀行'
        meta.keywords = '應試號碼查榜、大學放榜、大學申請入學、四技放榜、四技申請入學、放榜'
        break;
      default:
        meta.title = '111年度大學及四技查榜服務︱入學榜單查詢-1111人力銀行'
        meta.keywords = '大學放榜、大學申請入學、四技放榜、四技申請入學、放榜、姓名查榜、應試碼查榜'

      }

      useMeta({
        title: meta.title,
        link: {
          rel: "canonical",
          href: meta.url
        },
        meta: [
          {
            name: "title",
            content: meta.title,
          },
          {
            name: "Description",
            content: meta.description,
          },
          {
            name: "keywords",
            content: meta.keywords,
          },
          {
            property: "og:title",
            content: meta.title,
          },
          {
            property: "og:url",
            content: meta.url,
          },
          {
            property: "og:image",
            content: meta.image,
          },
          {
            property: "og:site_name",
            content: meta.title,
          },
          {
            property: "og:description",
            content: meta.description,
          },
        ],
        twitter: {
          title: meta.title,
          description: meta.description,
          keywords: meta.keywords,
          "image:src": meta.image,
          site: meta.url,
          url: meta.url
        },
        script: [
          {
            src: "application/ld+json",
            json: [
              {
                "@context": "http://schema.org/",
                "@type": "WebSite",
                name: meta.title,
                url: meta.url,
                description: meta.description,
                potentialAction: {
                  "@type": "SearchAction",
                  target:
                    "https://event.1111.com.tw/event22/22yAdmissionSystem/result?years=111&typeRef=1&schoolType=1&seachType=2&ticketNum={search_term_string}",
                  "query-input": "required name=search_term_string",
                },
              },
              {
                "@context": "http://schema.org",
                "@type": "Organization",
                name: "1111人力銀行",
                url: "https://www.1111.com.tw",
                logo: "https://www.1111.com.tw/images102/logo0504.png",
                contactPoint: [
                  {
                    "@type": "ContactPoint",
                    telephone: "+886-02-8787-1111",
                    contactType: "customer service",
                    areaServed: ["TW"],
                    availableLanguage: ["Chinese"],
                  },
                ],
                sameAs: [
                  "https://www.facebook.com/1111jobbank",
                  "https://twitter.com/1111jobbanknews",
                  "https://www.youtube.com/user/1111JobBankNEWS",
                  "https://www.linkedin.com/company/1111-job-bank",
                ],
              },
            ],
          },
        ],
      });
  },{
    immediate: true
  })



  return {
    changeMeta
  };
}