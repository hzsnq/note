<script lang="ts" setup>
import { Minus, Plus } from '@element-plus/icons-vue'
import { useDraggable } from '@vueuse/core'
import { draggableWrapperProps } from './types'
import { DesktopKey } from '@/symbols/desktop';
import { injectStrict } from '@/utils/symbols';
import { usePlugin } from '@/hooks/usePlugin';

//当前组件ref
const el = ref<HTMLElement | null>(null)
//定义数据与方法
const props = defineProps(draggableWrapperProps)
const { isSettingPlugin } = injectStrict(DesktopKey)
const { updatePlugin } = usePlugin()
//监听移动事件
const { x, y } = useDraggable(el, {
    initialValue: { x: props.x, y: props.y },
    disabled: !props.isDraggable,
    containerElement() {
        const container = `.${props.containerClass}`
        return document.querySelector(container) as HTMLElement
    },
})

//设置窗口位置等属性
const styleComputed = computed(() => {
    return {
        position: 'absolute' as 'absolute',
        left: x.value + 'px',
        top: y.value + 'px',
        display: isSettingPlugin.value ? 'block' : props.isShow ? `block` : `none`,
    }
})
const classComputed = computed(() => {
    return isSettingPlugin.value ? `draggable show-hide` : `draggable`
})

watch(props, () => {
    // console.log(props);

    // x.value = props.x
    // y.value = props.y
    // const copyProps = Object.assign({}, props, { x: x.value, y: y.value })
    // updateApplication(copyProps)
})

watch([x, y], () => {
    if (x.value, y.value) {
        updatePlugin({ x: x.value, y: y.value, nanoid: props.nanoid })
    }
})
//隐藏插件
const handleHidePlugin = () => {
    updatePlugin({ isShow: !props.isShow, nanoid: props.nanoid })
}
</script>

<template>
    <div ref="el" :class="classComputed" :style="styleComputed">
        <div class="hide" @click="handleHidePlugin">
            <el-icon v-show="props.isShow">
                <Minus />
            </el-icon>
            <el-icon v-show="!props.isShow">
                <Plus />
            </el-icon>
        </div>
        <slot name="content">
        </slot>
    </div>
</template>

<style lang="scss" scoped>
@use "./index.scss"
</style>
