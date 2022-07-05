import { defineStore } from 'pinia'

export const useUserParameter = defineStore({
  id: 'parameter',
  state: () => ({
    queryName: '' , // 紀錄 rouer 名子
    ticketInput: '',
    examTypeHome: '', // 給大學與統測用記錄router用
    userTypeSchool: '' // 判斷大學 / 四技
  }),
//   actions: {
   
//   }
})