<script lang="ts" setup>
import { Menu, SwitchFilled } from '@element-plus/icons-vue'
import { useDateTime } from '@/hooks/useDateTime';
import { DesktopKey, type Application } from '@/symbols/desktop'
import { injectStrict } from '@/utils/symbols'
import { useApplication } from '@/hooks/useApplication'

const { dateText, updateTime, } = useDateTime()
const { applicationData, } = useApplication()
const { isActiveApplication, isSettingDesktop, isSettingPlugin } = injectStrict(DesktopKey)
const activeApplication = ref<Application>()
let timerID: any = null

onMounted(() => {
    updateTime();
    timerID = setInterval(updateTime, 1000);
})


watchEffect(() => {
    if (isActiveApplication.value) {
        const find = applicationData.value.find((val) => val.props.nanoid === isActiveApplication.value);
        find && (activeApplication.value = find)
    } else {
        activeApplication.value = undefined
    }
})

const handleShowDesktopSetting = () => {
    isSettingDesktop.value = !isSettingDesktop.value
}

const handleShowPluginSetting = () => {
    isSettingPlugin.value = !isSettingPlugin.value
}

onUnmounted(() => {
    clearInterval(timerID);
})
</script>

<template>
    <div class="bar-wrapper">
        <div class="bar">
            <div class="container">
                <div class="left">{{ activeApplication?.props.title || '' }}</div>
                <div class="right">
                    <div class="item" @click="handleShowPluginSetting">
                        <el-icon class="icon">
                            <SwitchFilled />
                        </el-icon>
                    </div>
                    <div class="item" @click="handleShowDesktopSetting">
                        <el-icon class="icon">
                            <Menu />
                        </el-icon>
                    </div>
                    <div class="item">{{ dateText }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.bar-wrapper {
    width: 100%;
    height: var(--desktop-bar-height);
    font-size: 16px;
    cursor: pointer;

    .bar {
        width: 100%;
        height: var(--desktop-bar-height);
        position: fixed;
        z-index: 1024;
        left: 0;
        top: 0;
        backdrop-filter: blur(3px);
        // outline: 1px solid #0002;
        background: rgba($color: #000, $alpha: 0.1);

        .container {
            height: 100%;
            // min-width: 1240px;
            padding: 0 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .left,
            .right {
                flex: 1;
            }

            .right {
                display: flex;
                align-items: center;
                justify-content: flex-end;

                .item {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 24px;
                    padding: 0 6px;
                    border-radius: 6px;

                    .icon {
                        font-size: 16px;
                    }
                }

                .item:hover {
                    background: rgba($color: #000, $alpha: 0.3);
                }
            }
        }
    }
}
</style>