<script lang="ts" setup>

import { DesktopKey } from '@/symbols/desktop'
import { injectStrict } from '@/utils/symbols'

const { isSettingDesktop } = injectStrict(DesktopKey)
const drawer = ref(true)

const handleClose = (done: () => void) => {
    isSettingDesktop.value = !isSettingDesktop.value
    done()
}
</script>

<template>
    <el-drawer v-model="drawer" direction="btt" :with-header="false" modal-class="modal-class" size="50%" :modal="true"
        :before-close="handleClose">
    </el-drawer>
</template>

<style lang="scss">
.modal-class {
    background: rgba($color: #000, $alpha: 0);
}

.el-drawer.btt {
    width: 80%;
    left: 50%;
    margin-left: -40%;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    background-color: rgba($color: #000, $alpha: 0.7);
}
</style>