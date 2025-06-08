<script lang="ts" setup>
import { Close, SemiSelect, Operation } from '@element-plus/icons-vue'
import { useDraggable, useMousePressed } from '@vueuse/core'
import { programWrapperProps } from './types'
import { injectStrict } from "@/utils/symbols"
import { DesktopKey } from '@/symbols/desktop';
import { useApplication } from '@/hooks/useApplication'

//当前组件ref
const el = ref<HTMLElement | null>(null)
//定义数据与方法
const props = defineProps(programWrapperProps)
const { isActiveApplication, isSettingProgram } = injectStrict(DesktopKey)
const { deleteApplication, updateApplication } = useApplication()
const isShow = ref(true)

// console.log(props);

//监听移动事件
const { x, y } = useDraggable(el, {
    initialValue: { x: props.x, y: props.y },
    containerElement() {
        return document.querySelector('.desktop-wrapper') as HTMLElement
    },
})

//监听是否选中当前窗口
const { pressed } = useMousePressed({ target: el })

//设置窗口位置等属性
const customComputed = computed(() => {
    return {
        left: x.value + 'px',
        top: y.value + 'px',
        zIndex: isActiveApplication.value === props.nanoid ? '1023' : 'auto',
        boxShadow: isActiveApplication.value === props.nanoid ? '0 0 10px rgba(0, 0, 0, 0.5)' : 'none',
        minWidth: props.width + 'px',
        minHeight: props.height + 'px',
    }
})

const customStyle = computed(() => {
    return `top-hand ${isActiveApplication.value === props.nanoid ? 'active' : ''}`
})

//监听窗口拖动点击设置当前窗口在最上方显示
watchEffect(() => {
    //设置当前窗口选中
    if (pressed.value) {
        if (isActiveApplication.value === props.nanoid) return
        isActiveApplication.value = props.nanoid
    }
    //设置当前窗口显示
    if (isActiveApplication.value === props.nanoid) {
        isShow.value = true
    }

    if (x.value, y.value) {
        const copyProps = Object.assign({}, props, { x: x.value, y: y.value })
        updateApplication(copyProps)
    }
})

watch(props, () => {
    // console.log(props);

    x.value = props.x
    y.value = props.y
    const copyProps = Object.assign({}, props, { x: x.value, y: y.value })
    updateApplication(copyProps)
})

//销毁当前窗口
const handleCloseWrapper = () => {
    deleteApplication(props.nanoid)
    isActiveApplication.value = ''
}

//隐藏当前窗口
const handleHideWrapper = () => {
    isShow.value = false
    isActiveApplication.value = ''
}

//设置窗口
const handleSetting = () => {
    isSettingProgram.value = props.name
}
</script>

<template>
    <!-- <Teleport to=".desktop"> -->
    <div class="program-wrapper" v-show="isShow" ref="el" :style="customComputed">
        <div :class="customStyle">
            <div class="left">
                <el-icon class="icon" @click="handleCloseWrapper">
                    <Close />
                </el-icon>
                <el-icon class="icon" @click="handleHideWrapper">
                    <SemiSelect />
                </el-icon>
            </div>
            <div class="title">{{ props.title }}</div>
            <div class="right">
                <el-icon class="edit" @click="handleSetting" v-if="props.isSetting">
                    <Operation />
                </el-icon>
            </div>
        </div>
        <div class="wrapper">
            <slot name="content"></slot>
        </div>
    </div>
    <!-- </Teleport> -->
</template>

<style lang="scss" scoped>
@use './index.scss'
</style>