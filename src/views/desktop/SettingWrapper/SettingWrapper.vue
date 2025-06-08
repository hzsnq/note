<script lang="ts" setup>
import { useProgram } from '@/hooks/useProgram'
import { ChoosePosition } from './components'
import { DesktopKey } from '@/symbols/desktop';
import { injectStrict } from '@/utils/symbols';
import { emitter, HandlerProgram } from '@/utils/mitt'

const { getProgramSetting, requireImgUrl, updateSetting, resetProgramConfig } = useProgram()
const { isSettingProgram } = injectStrict(DesktopKey)
const drawer = ref(false)
const isInit = ref(false)
const watchDeb = ref()
const isInput = ref(false)
const ruleForm = reactive<DefaultConfig>({
    name: '',
    icon: '',
    title: '',
    width: 0,
    height: 0,
    folder: '',
    x: 0,
    y: 0
})

function initConfigValue(find: DefaultConfig) {
    // console.log(ruleForm, find);
    ruleForm.folder = find.folder
    ruleForm.icon = find.icon
    ruleForm.width = find.width
    ruleForm.height = find.height
    ruleForm.x = find.x
    ruleForm.y = find.y
    ruleForm.title = find.title
    ruleForm.name = find.name
    isInit.value = true
}
const drawerHeader = computed(() => {
    return `应用设置-${ruleForm.name}`
})
watchEffect(() => {
    if (isSettingProgram.value && !drawer.value) {
        drawer.value = true
        const find = getProgramSetting(isSettingProgram.value)
        if (find) {
            initConfigValue(find)
        } else {
            isSettingProgram.value = ''
        }
    }
})

watchDeb.value = watch(ruleForm, () => {
    isInput.value = true
    updateSetting(ruleForm)
})

const handleClose = (done: () => void) => {
    closeFn()
    done()
}

const handleResetConfig = () => {
    isInit.value = false
    const item = resetProgramConfig(ruleForm.name)
    setTimeout(() => {
        item && initConfigValue(item)
    }, 0);
}

function closeFn() {
    isSettingProgram.value = '';
    if (isInput.value) {
        emitter.emit(HandlerProgram.UpdateProgram, ruleForm)
        isInput.value = false
    }
    watchDeb.value()
    isInit.value = false
}

function setPosition(x: number, y: number) {
    ruleForm.x = x;
    ruleForm.y = y;
}
</script>

<template>
    <el-drawer v-model="drawer" direction="ltr" :title="drawerHeader" size="40%" header-class="drawer-header"
        :before-close="handleClose">
        <el-tabs tab-position="top">
            <el-tab-pane label="应用设置">
                <el-form :model="ruleForm" status-icon>
                    <el-form-item label="应用名称" prop="name">
                        <el-input v-model="ruleForm.name" autocomplete="off" :disabled="true" />
                    </el-form-item>
                    <el-form-item label="应用图标" prop="icon">
                        <el-input v-model="ruleForm.icon" autocomplete="off">
                            <template #prepend>src/views/program/{{ ruleForm.folder }}/icons/</template>
                        </el-input>
                        <img class="icons" :src="requireImgUrl(ruleForm.folder, ruleForm.icon)" />
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="窗口设置">
                <el-form :model="ruleForm" status-icon>
                    <el-form-item label="窗口标题" prop="title">
                        <el-input v-model="ruleForm.title" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="窗口宽度" prop="width">
                        <el-input-number v-model="ruleForm.width" type="number" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="窗口高度" prop="height">
                        <el-input-number v-model="ruleForm.height" type="number" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="窗口坐标" prop="x">
                        <div>
                            <div>
                                <el-text>x：{{ ruleForm.x }}</el-text>
                            </div>
                            <div>
                                <el-text>y：{{ ruleForm.y }}</el-text>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="选择坐标">
                        <ChoosePosition :initX="ruleForm.x" :initY="ruleForm.y" @setPosition="setPosition"
                            v-if="isInit">
                        </ChoosePosition>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="其他设置">
                <el-button type="primary" round @click="handleResetConfig">重置配置</el-button>
            </el-tab-pane>
        </el-tabs>
    </el-drawer>
</template>

<style lang="scss">
.drawer-header {
    margin-bottom: 0;
}
</style>
<style lang="scss" scoped>
.icons {
    width: 60px;
    height: 60px;
    margin: 10px;
}
</style>