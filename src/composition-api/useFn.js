import { ref } from "vue";
export function useErrorImage() {
    const img = ref('~@/assets/img/freshman_gift/default_img.png');
    function errorImage(event) {
        event.target.src = img.value;
        console.clear();
    }
    return{
        errorImage
    }
}

export function randData(arr,size) {
    let newArr = []
    for(let i=0; i<size; i++) {
      let randNum = Math.floor(Math.random()*arr.length)
      newArr.push(arr[randNum])
      arr.splice(randNum,1)
    }
    return newArr
  }
