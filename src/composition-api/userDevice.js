import { ref , onUnmounted, onMounted} from 'vue'

export function userDeviceFn(num) {
    const width = ref(window.innerWidth)
    
    const showWidth = ref(true);

    function reportWindowSize() {
        
        width.value > num  ? showWidth.value = true : showWidth.value =  false
        width.value = window.innerWidth;
    }

    reportWindowSize();

    onMounted(() => {
        window.addEventListener('resize', reportWindowSize, true)
    });

    onUnmounted(() => {
        window.removeEventListener('resize', reportWindowSize);
    });

    return {showWidth, width};
}


