import { defineStore } from 'pinia'

export const useUserFreshman = defineStore({
  id: 'freshman',
  state: () => ({
    freshmanLogin: true, // 新鮮人 登入且驗證成功為 false
  }),
//   actions: {
   
//   }
})

