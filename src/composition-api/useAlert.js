// import { ref } from "vue";

export function useAlertFourSkill(router) {
    alert('四技申請入學查榜即將開放,敬請期待!');
    router.push('/');
}

export function useAlertSchoolOpen() {
    alert('尚未放榜,敬請期待!');
}