import { getDatas, getLists, userStudentTypes, useAlertSchoolOpens } from '@/composition-api/index.js';
import { defineStore } from 'pinia'
import _ from "lodash"
export const usedataStore = defineStore({
  id: 'data',
  state: () => ({
    data: [],
    dataLength: 0,
    totalpage: 0,
    totalrecord: 0,
    noInformation: false
  }),
  actions: {
    async fetchData(page, query) {
      const res = await getDatas(page, query)
      if (_.isEmpty(res.data.value)) {
        this.$state.noInformation = true
      } else {
        // 分頁只需要資料是否有值故在此計算
        this.$state.dataLength = res.data.value.length;
        this.$state.noInformation = false;
        this.$state.totalpage = res.totalpage.value
        this.$state.totalrecord = res.totalrecord.value

        // console.log(res.data.value);
        this.$state.data = res.data.value.map(item => {

          let studentType = ''
          const { studentChoose} = userStudentTypes();

          query.type == 2 ? studentChoose[5].show = '外加' : '';

          studentChoose.forEach(Mitem => {
            if(Mitem.value == item.studentType) studentType = Mitem.show
          })

          item = { 
            name: item.name,
            ticketNum: item.ticketNum,
            type: item.type,
            ranking: item.ranking,
            studentType: studentType,
            total_info: [],
            Base64_ticketNum: item.Base64_ticketNum,
            Base64_name: item.Base64_name,
            get_info: item.get_info.length > 0 ? item.get_info.split(',') : '',
            wait_info: item.wait_info.length > 0 ? item.wait_info.split(',') : '',
            show: true,
          }

          // item.type == 0 ? item.type = '0' : item.type == 1 ? item.type = '正取' : item.type == 2 ? item.type = '備取' : item.type == 3 ? item.type = '外島' : item.type = '原住⺠'
          item.type == 0 ? item.type = '0' : item.type == 1 ? item.type = '正取' : item.type == 2 ? item.type = '備取' : item.type == 3 ? item.type = '正取' : item.type = '正取'
      
          let Tindex = 0

          !_.isEmpty(item.get_info) ? item.get_info.map(Gitem => {
            if(Gitem.split('_')[0] == '') {
              return
            } else {
              Tindex = Tindex + 1
            }

            // studentChoose.forEach(item => {
            //   console.log(Gitem);
            //   // if(item.value == Gitem.split('_')[6]) studentType = item.show
            // })

            // console.log(studentType);

            item.total_info[Tindex-1] = {
              'orderBy': Gitem.split('_')[0],
              'type': '正取',
              'schoolName': Gitem.split('_')[1],
              'educationName': Gitem.split('_')[2],
              'TUNsid': Gitem.split('_')[3],
              'TUNeducationCode': Gitem.split('_')[4],
              'finalChoose': Gitem.split('_')[5],
              'schoolNum': Gitem.split('_')[7],
              'departmentNum': Gitem.split('_')[8],
              'studentType': Gitem.split('_')[9],
              'schoolType': Gitem.split('_')[10],
              'schoolcode_sc': Gitem.split('_')[11],
            }
            return item
          }) : ''
          

          !_.isEmpty(item.wait_info) ? item.wait_info.map(Gitem => {
            if(Gitem.split('_')[0] == '') {
              return
            } else {
              Tindex = Tindex + 1 
            }

            item.total_info[Tindex-1] = {
              'orderBy': Gitem.split('_')[0],
              'type': '備取',
              'schoolName': Gitem.split('_')[1],
              'educationName': Gitem.split('_')[2],
              'TUNsid': Gitem.split('_')[3],
              'TUNeducationCode': Gitem.split('_')[4],
              'finalChoose': Gitem.split('_')[5],
              'schoolNum': Gitem.split('_')[7],
              'departmentNum': Gitem.split('_')[8],
              'studentType': Gitem.split('_')[9],
              'schoolType': Gitem.split('_')[10],
              'schoolcode_sc': Gitem.split('_')[11],
            }
            return item
          }) : ''

          item.show = item.total_info.length > 3 ? false : true 

          item.total_info.forEach(element => {
            studentChoose.forEach(item => {
              if(item.value == element.studentType){
                element.studentType = item.show
              }
            });
            
          });

          
          // if(element.value == studentChoose.value) element.studentType = studentChoose.show

          // 
          return item
        })
      }
    }
  }
})

export const useListStore = defineStore({
  id: 'list',
  state: () => ({
    data: [],
    schoolArray: [],
    educationSum: 0,
    educationListed: 0,
    nowSchoolName: '',
    nowEducationName: '',
    isMusicEducation: '',
    totalpage: 0,
    totalrecord: 0,
    quotaTotal: 0,
    admissionTime: true,
    admissionTimeOut: true,
    // fetching: true,
  }),
  actions: {
    async fetchData(pageshow) {
      // this.$state.fetching = true

      const res = await getLists(pageshow);
      if(!_.isEmpty(res.data.value)){

        // 抓取開始日期
        const admissionData = res.data.value[0].admissionDate;
        if(!_.isEmpty(admissionData)){
          // console.log('admissionData', admissionData);
          // console.log('localeTimeObj', getTodayDateWhole);
  
          const dataTime = new Date(admissionData);
          // console.log('當日00', dataTime.getTime() <  Date.now());
          (dataTime.getTime() <  Date.now()) ? this.$state.admissionTime = true : this.$state.admissionTime = false
          // // 抓取開始日期最後時間

          const admissionDateLise = admissionData.slice(0, 10)
          const admissionDateOut = new Date(admissionDateLise + `T23:59:59`)
        
          // console.log('當日23', admissionDateLises.getTime() <  Date.now());
          if(admissionDateOut.getTime() <  Date.now()) {this.$state.admissionTimeOut = true}else {this.$state.admissionTimeOut = false}
        }


      }
        
      if(!_.isEmpty(res.data.value)) {
        this.$state.data = res.data.value.map(item => {
          item = { 
            OnlineDataCount: item.OnlineDataCount,
            educationName: item.educationName,
            educationCode: item.educationCode,
            admissionDateM: !_.isEmpty(item.admissionDate) ? item.admissionDate.split('T')[0].split('-')[1] + '/' + item.admissionDate.split('T')[0].split('-')[2] : '',
            admissionDate: !_.isEmpty(item.admissionDate) ? item.admissionDate.split('T')[0].split('-')[1] + '/' + item.admissionDate.split('T')[0].split('-')[2] : '',
          }
          return item
        })

        this.$state.schoolArray = !_.isEmpty(res.data.value[0].schoolArray) ? res.data.value[0].schoolArray.split(',').map(item => {
          item = {
            schoolCode: item.split('_')[0],
            schoolName: item.split('_')[1],
            educationSum: item.split('_')[2].replace('(', '').replace(')', ''),
            admissionDate: item.split('_')[3].split('-')[1] + '/' + item.split('_')[3].split('-')[2],
            admissionDateM: item.split('_')[3].split('-')[1] + '/' + item.split('_')[3].split('-')[2],
            admissionType: item.split('_')[4],
            admissionYearAPI: item.split('_')[3].split('-')[0], // 以防如果沒有時間的狀態_API 回傳的西元年
            // admissionYear: new Date().getFullYear() // 今年的西元年
            admissionYear: 2020 // 目前資料室從2020年開始
          }
          return item
        }) : ''
        if(!_.isEmpty(this.$state.schoolArray)){
          this.$state.schoolArray.forEach(element => {
            const data = element.admissionDateM
            const dataM = data.split('').slice(1, 5).join("");
            element.admissionDateM = dataM
          });
        }

        this.$state.data.forEach(element => {
          const data = element.admissionDateM
          const dataM = data.split('').slice(1, 5).join("");
          element.admissionDateM = dataM

         
        });

        this.$state.educationSum = res.data.value[0].schoolArray.length > 0 ? res.data.value[0].schoolArray.split(',')[0].split('_')[6] : 0
        this.$state.educationListed = res.data.value[0].schoolArray.length > 0 ? res.data.value[0].schoolArray.split(',')[0].split('_')[5] : 0

        this.$state.nowSchoolName = res.data.value[0].schoolName
        this.$state.nowEducationName = res.data.value[0].educationName

        this.$state.isMusicEducation = res.data.value[0].isMusicEducation
        this.$state.totalpage = res.totalpage.value
        this.$state.totalrecord = res.totalrecord.value
        this.$state.quotaTotal = res.data.value[0].quotaGet + res.data.value[0].quotaOutlying + res.data.value[0].quotaVision + res.data.value[0].quotaAboriginal

        // this.$state.fetching = false


        
      }
    }
  }
})

