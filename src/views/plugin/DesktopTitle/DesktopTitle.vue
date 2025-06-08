<script lang="ts" setup>
import { useDesktop } from '@/hooks/useDesktop';

const { colorItem } = useDesktop();

// const { color } = defineProps<{
//     color: Color
// }>();
let color = reactive(colorItem.value)
watchEffect(() => {
    Object.assign(color, colorItem.value)
})
const name = ref(color.name);
const category = ref(color.category);

watch(color, () => {
    category.value = '';
    name.value = '';
    setTimeout(() => {
        category.value = color.category;
        name.value = color.name;
    }, 1)
})

const showComputed = computed(() => {
    return (item: string) => {
        return item ? 'show' : ''
    }
})
</script>

<template>
    <div class="content-name font-st">
        <div class="text" :class="showComputed(name)">
            {{ name }}
        </div>
        <div class="category" :class="showComputed(category)">
            {{ category }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
.content-name {
    // position: absolute;
    // top: 8%;
    // right: 100px;

    .text {
        writing-mode: vertical-lr;
        font-size: 80px;

        &.show {
            opacity: 0;
            animation: show 1s linear forwards;
        }
    }

    .category {
        position: absolute;
        font-size: 40px;
        writing-mode: vertical-lr;
        right: -10px;
        bottom: 0;

        &.show {
            opacity: 0;
            animation: show 1.5s linear forwards;
        }
    }
}

@keyframes show {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}
</style>