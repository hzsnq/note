<script setup lang="ts">
import { injectStrict } from "@/utils/symbols"
import { NoteKey } from '../../symbols/note';

const { toTop, menuIndex, subMenuIndex, noteData } = injectStrict(NoteKey)


const handleChangeMenu = (index: number, index1: number) => {
    if (String(index) === menuIndex.value && subMenuIndex.value === String(index1)) {
        return
    }
    menuIndex.value = String(index)
    subMenuIndex.value = String(index1)
    // router.push({ path: `/detail/${item1.title || ""}` })
    toTop(0)
}

const handleShowMenu = (key: number) => {
    if (String(key) === menuIndex.value && subMenuIndex.value === "-1") {
        return
    }
    menuIndex.value = String(key)
    subMenuIndex.value = "-1"
    // router.push('/content')
}
</script>

<template>
    <div class="menu">
        <div class="menu-title">Note Menu</div>
        <el-menu active-text-color="#ffd04b" background-color="#545c64" text-color="#fff" :unique-opened="true"
            :default-active="menuIndex + '-' + subMenuIndex" :default-openeds="[menuIndex]">

            <el-sub-menu :index="String(index)" v-for="(item, index) in noteData" :key="String(index)">
                <template #title>
                    <div class="flex" @click="handleShowMenu(index)">{{ item.menuName }}</div>
                </template>
                <el-menu-item :index="String(index) + '-' + String(index1)" v-for="(item1, index1) in item.subMenu"
                    :key="index1" @click="handleChangeMenu(index, index1)">
                    {{ item1.title }}
                </el-menu-item>
            </el-sub-menu>
        </el-menu>
    </div>
</template>

<style lang="scss" scoped>
.menu {
    user-select: none;
}

.flex {
    display: flex;
    width: 100%;
}

.menu-title {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    color: #fff;
    font-size: 40px;
}

.el-menu {
    border: none;
    height: 100%;
    width: 100% !important;
}
</style>