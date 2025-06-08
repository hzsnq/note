<script lang="ts" setup>
import { useDraggable } from '@vueuse/core'
interface Position {
    initX: number | undefined,
    initY: number | undefined,

}
let width = window.innerWidth;
let height = window.innerHeight;
const scale = width / height

let wrapperWidth = 300 * scale;
let wrapperHeight = 300 / scale;

const { initX, initY } = defineProps<Position>()
const el = ref<HTMLElement | null>(null)
const el2 = ref<HTMLElement | null>(null)
// console.log(initX, initY);

// console.log(Math.floor(((initX || 0) / width) * wrapperWidth), Math.floor(((initY || 0) / height) * wrapperHeight));

const { x, y } = useDraggable(el, {
    initialValue: { x: Math.floor(((initX || 0) / width) * wrapperWidth), y: Math.floor(((initY || 0) / height) * wrapperHeight) },
    containerElement: el2
})
// console.log(x.value, y.value);


const emits = defineEmits(['setPosition'])

//设置窗口位置等属性
const customComputed = computed(() => {
    return {
        left: x.value + 'px',
        top: y.value + 'px',
    }
})

const customComputed2 = computed(() => {
    return {
        width: wrapperWidth + 'px',
        height: wrapperHeight + 'px',
    }
})

watch([x, y], () => {
    // console.log(x.value, y.value);

    const xValue = (x.value / wrapperWidth) * width
    const yValue = (y.value / wrapperHeight) * height
    // console.log(xValue, yValue);

    emits('setPosition', Math.floor(xValue), Math.floor(yValue))
})
</script>

<template>
    <div class="position" ref="el2" :style="customComputed2">
        <div class="wrapper" ref="el" :style="customComputed"></div>
    </div>
</template>

<style lang="scss" scoped>
.position {
    position: relative;
    border: 1px solid #ccc;

    .wrapper {
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 4px;
        background: #000;
        // transition: 0.1s ease-in-out;
    }
}
</style>