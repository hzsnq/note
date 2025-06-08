<script lang="ts" setup>
import { useColors } from '@/hooks/useColors'
import { useDesktop } from '@/hooks/useDesktop';

const { handleChangeTheme } = useDesktop();
const { colorList } = useColors()
type List = Color[][]
const list = ref<List>([])

onMounted(() => {
    // console.log(colorList.value)
    function groupArray(array: Array<any>, groupSize: number) {
        return Array.from({ length: Math.ceil(array.length / groupSize) }, (_, i) =>
            array.slice(i * groupSize, i * groupSize + groupSize)
        );
    }
    list.value = groupArray(colorList, 10)
})


const styleComputed = computed(() => {
    return (item: Color) => {
        return {
            background: item.hex,
            color: item?.fontColor || '#fff'
        }
    }
})

const handleMouseEnter = (line: number, index: number) => {
    const i = line % 2 === 0 ? index + 1 : index - 1

    document.querySelector('#hover' + line + '_' + index)?.classList.add('scale1')
    document.querySelector('#hover' + line + '_' + (index - 1))?.classList.add('scale2')
    document.querySelector('#hover' + line + '_' + (index + 1))?.classList.add('scale2')
    document.querySelector('#hover' + (line - 1) + '_' + i)?.classList.add('scale2')
    document.querySelector('#hover' + (line - 1) + '_' + index)?.classList.add('scale2')
    document.querySelector('#hover' + (line + 1) + '_' + i)?.classList.add('scale2')
    document.querySelector('#hover' + (line + 1) + '_' + index)?.classList.add('scale2')
}

const handleMouseLeave = (line: number, index: number) => {
    const i = line % 2 === 0 ? index + 1 : index - 1

    document.querySelector('#hover' + line + '_' + index)?.classList.remove('scale1')
    document.querySelector('#hover' + line + '_' + (index - 1))?.classList.remove('scale2')
    document.querySelector('#hover' + line + '_' + (index + 1))?.classList.remove('scale2')
    document.querySelector('#hover' + (line - 1) + '_' + i)?.classList.remove('scale2')
    document.querySelector('#hover' + (line - 1) + '_' + index)?.classList.remove('scale2')
    document.querySelector('#hover' + (line + 1) + '_' + i)?.classList.remove('scale2')
    document.querySelector('#hover' + (line + 1) + '_' + index)?.classList.remove('scale2')
}


</script>

<template>
    <div class="container">
        <div class="line" v-for="(item, index) in list" :key="index">
            <template v-for="(i, n) in item" :key="n.hex">
                <div class="item font-st" :id="'hover' + index + '_' + n" :style="styleComputed(i)"
                    @mouseenter="handleMouseEnter(index, n)" @mouseleave="handleMouseLeave(index, n)"
                    @click="handleChangeTheme($event, i)">
                    {{ i.name }}
                </div>
            </template>
        </div>
    </div>
</template>

<style lang="scss" scoped>
$n: 10;
$size: calc(60vw / $n);

.container {
    width: 60vw;
    height: var(--application-max-height);
    overflow-y: scroll;
    overflow-x: hidden;
    background: #e3e3e3;

    .line {
        display: flex;

        &:nth-child(even) {
            transform: translateX(- calc($size / 2));
        }

        &:nth-child(n+2) {
            margin-top: - calc($size / 6);
        }

        .item {
            flex-shrink: 0;
            width: $size;
            height: $size;
            background: #000;
            clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%);
            cursor: pointer;
            transition: 0.3s ease;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 18px;
        }

        .scale1 {
            transform: scale(1.2);
        }

        .scale2 {
            transform: scale(0.8);
        }
    }
}
</style>