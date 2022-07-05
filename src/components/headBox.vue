<template >
    <div class="tunlist__headBox">
        <ul class="tunlist__head-container">
            <li class="tunlist__head-list"><span>{{titleOne}}</span><span>{{titleTwo}}</span><span>{{titleThree}}</span></li>
            <li class="tunlist__head-list"><span>{{titleOne}}</span><span>{{titleTwo}}</span><span>{{titleThree}}</span></li>
            <li class="tunlist__head-list"><span>{{titleOne}}</span><span>{{titleTwo}}</span><span>{{titleThree}}</span></li>
        </ul>
    </div>
</template>
<script>
export default {
    name:'headBoxComponents',
    props: {
        titleOne: {
            type: String,
            default: '放榜日',
        },
        titleTwo: {
            type: String,
            default: '代號',
        },
        titleThree: {
            type: String,
            default: '學校',
        }
    },
}
</script>
<style lang="">
    
</style>