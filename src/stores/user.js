import { getUser } from '@/composition-api/index.js';
import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    users: [],
    usersTalentNo: '',
    usersLoginType: ''
  }),
  actions: {
    async fetchUsers() {
      const res = await getUser();
      this.$state.users = res;
    }
  }
})