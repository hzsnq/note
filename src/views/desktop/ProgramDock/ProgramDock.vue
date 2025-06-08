<script lang="ts" setup>
import { injectStrict } from "@/utils/symbols";
import { DesktopKey, type Program } from '@/symbols/desktop';
import { useProgram } from '@/hooks/useProgram';
import { emitter, HandlerProgram } from "@/utils/mitt";
import { useApplication } from '@/hooks/useApplication'

const { handleAddApplication } = useApplication()
const { requireImgUrl, programData, itemComputed, nameComputed } = useProgram()
const { isActiveApplication } = injectStrict(DesktopKey)

onMounted(() => {
    emitter.on(HandlerProgram.UpdateProgram, updateApp)
})

function updateApp(item: DefaultConfig) {
    const index = programData.value.findIndex((val) => val.name === item.name)
    // console.log(index);
    programData.value[index].name = item.name
    programData.value[index].icon = item.icon
    programData.value[index].window.title = item.title
    programData.value[index].window.x = item.x
    programData.value[index].window.y = item.y
    programData.value[index].window.width = item.width
    programData.value[index].window.height = item.height
}

const handleShowApplication = (item: Program) => {
    console.log(item);

    handleAddApplication(item)
    isActiveApplication.value = item.nanoid
}

</script>

<template>
    <div class="docker">
        <div class="docker-item" v-for="item in programData" :key="item.nanoid">
            <div class="img" :style="itemComputed(item.color)" @click="handleShowApplication(item)">
                <div class="name">{{ nameComputed(item, 3) }}</div>
                <template v-if="requireImgUrl(item.folder, item.icon)">
                    <img class="icon" :src="requireImgUrl(item.folder, item.icon)" />
                </template>
                <span v-else>{{ nameComputed(item) }}</span>
            </div>
            <div class="active" v-show="isActiveApplication === item.nanoid"></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.docker {
    --p: 2px;
    --w: 80px;
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1024;
    display: flex;
    justify-content: center;
    padding: var(--p);

    border-radius: 16px;
    backdrop-filter: blur(3px);
    // outline: 1px solid #0002;
    background: rgba($color: #000, $alpha: 0.1);

    .docker-item {
        --s: 1;
        width: var(--w);
        aspect-ratio: 1;
        padding: 0 var(--p);
        scale: var(--s);
        margin: 0 calc((var(--w) * var(--s) - var(--w))/2);
        transform-origin: bottom;
        transition: 0.3s ease;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        position: relative;

        .img {
            width: 60px;
            height: 60px;
            // background: #fff;
            border-radius: 12px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 24px;
            position: relative;

            .name {
                width: 60px;
                display: flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                top: -20px;
                left: 50%;
                transform: translateX(-50%);
                font-size: 12px;
                color: #e8e8e8;
                opacity: 0;
                transition: 0.3s ease;
            }

            .icon {
                display: block;
                width: 90%;
                height: 90%;
                object-fit: cover;
            }
        }

        &:hover {
            --s: 1.8;

            .name {
                opacity: 1;
            }
        }

        &:has(+ .docker-item:hover),
        &:hover+.docker-item {
            --s: 1.6;
        }

        &:has(+ .docker-item+.docker-item:hover),
        &:hover+.docker-item+.docker-item {
            --s: 1.4;
        }

        &:has(+ .docker-item+.docker-item+.docker-item:hover),
        &:hover+.docker-item+.docker-item+.docker-item {
            --s: 1.2;
        }

        .active {
            width: 4px;
            height: 4px;
            background: rgba($color: #fff, $alpha: 0.6);
            position: absolute;
            bottom: 2px;
            left: 50%;
            transform: translateX(-50%);
            border-radius: 50%;
        }
    }
}
</style>