<template>
    <div class='desktop'>
        <div class="desktop-bg">
            <DesktopBar />
            <div class="desktop-wrapper">
                <DesktopWrapper />
                <ProgramDock />
                <SettingWrapper v-if="isSettingProgram" />
                <DesktopSetting v-if="isSettingDesktop"></DesktopSetting>
                <template v-for="item in applicationData" :key="item.props.nanoid">
                    <ProgramWrapper :="item.props">
                        <template #content>
                            <component :is="item.component"></component>
                        </template>
                    </ProgramWrapper>
                </template>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ProgramDock, DesktopWrapper, SettingWrapper, DesktopBar, DesktopSetting } from './index';
import { DesktopKey } from '@/symbols/desktop';
import { useApplication } from '@/hooks/useApplication';
import { useDesktop } from '@/hooks/useDesktop';
import { usePlugin } from '@/hooks/usePlugin';
import { useProgram } from '@/hooks/useProgram';
import { emitter, HandlerProgram } from '@/utils/mitt';

const { applicationData, initApplication } = useApplication()
const { isActiveApplication, isSettingDesktop, isSettingPlugin, isSettingProgram, initDesktop } = useDesktop()
const { initProgram } = useProgram()
const { initPlugin } = usePlugin()

onMounted(() => {
    //初始化桌面配置
    initDesktop()
    //初始化应用程序
    initApplication()
    //初始化程序坞程序
    initProgram()
    //初始化桌面插件
    initPlugin()

    //dosomething
    emitter.on(HandlerProgram.UpdateProgram, updateApp)
})

function updateApp(item: DefaultConfig) {
    const index = applicationData.value.findIndex((val) => val.props.name === item.name)
    Object.assign(applicationData.value[index].props, item)
}
provide(DesktopKey, { isActiveApplication, isSettingProgram, isSettingDesktop, isSettingPlugin })
</script>

<style lang="scss" scoped>
.desktop {
    background: var(--color-bg);
    height: 100vh;
    position: relative;
    transition: 0.5s linear;
    overflow: hidden;
    cursor: pointer;
    // min-width: 1240px;

    .desktop-bg {
        width: 100%;
        height: 100vh;
        background-image: url(@/assets/images/grain.png);
        position: absolute;
        top: 0;
        left: 0;
        color: #fff;
    }

    .desktop-wrapper {
        position: relative;
        width: 100%;
        height: calc(100vh - var(--desktop-bar-height));
    }
}
</style>