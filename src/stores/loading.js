import { defineStore } from 'pinia'

export const useUserLoading = defineStore({
  id: 'Loading',
  state: () => ({
    isLoading: true,
    isLoadings: true,
    refCount: 0,
  }),
  actions: {
    loading() {
      if (this.$state.isLoading === true) {
        this.$state.refCount++;
      } else if (this.$state.refCount !== 0) {
        this.$state.refCount--;
        this.$state.isLoading = false;
      }
    }
  }
})