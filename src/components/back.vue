<template>
    <div :class="className" class="container d-flex justify-content-center justify-content-md-end mt-2 px-0"> 
        <router-link class="btn__sm-text" :to="link" :title="btnName">{{btnName}}</router-link>
    </div>
</template>
    
<script >
export default {
  props: {
    link: {
      type: String,
      default: "",
    },
    btnName:{
      type: String,
      default: "返回",
    },
    className:{
      type: String,
      default: "headBox__mt-change",
    }
  },
  setup() {
 
    return {
    };
  },
};
</script>
    
<style>
    
</style>