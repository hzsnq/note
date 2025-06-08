<script lang="ts" setup>
import { useDesktop } from '@/hooks/useDesktop';
import { usePlugin } from '@/hooks/usePlugin';

const { pluginList } = usePlugin()
const { colorItem, handleChangeTheme } = useDesktop();

const colorStyle = computed(() => {
    return {
        color: colorItem.value?.fontColor || '#fff'
    }
})

onMounted(() => {
})

</script>

<template>
    <div class="box" :style="colorStyle" @dblclick.self="handleChangeTheme($event)">
        <div class="desktop-content" @dblclick.self="handleChangeTheme($event)">
            <template v-for="item in pluginList" :key="item.props.nanoid">
                <DraggableWrapper :="item.props" v-if="item.props.isDraggable">
                    <template #content>
                        <component :is="item.component"></component>
                    </template>
                </DraggableWrapper>
                <component :is="item.component" v-else></component>
            </template>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.box {
    height: 100%;

    .desktop-content {
        width: 100%;
        // min-width: 1240px;
        height: var(--desktop-height);
        cursor: pointer;
        // background: forestgreen;
    }
}
</style>