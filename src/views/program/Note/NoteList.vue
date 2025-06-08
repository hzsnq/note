<script lang="ts" setup>
import { SidebarMenu, NoteDetail } from './components'
import { NoteKey } from './symbols/note';
import { useNote } from "./composables/useNote"

const scrollbarRef = ref<any>(null)
const { noteData, init, menuIndex, subMenuIndex } = useNote()
init()


function toTop(value: number) {
    scrollbarRef.value!.setScrollTop(value)
}

provide(NoteKey, { noteData, toTop, menuIndex, subMenuIndex })

</script>

<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="260px" class="app-right">
                <el-scrollbar>
                    <SidebarMenu></SidebarMenu>
                </el-scrollbar>
            </el-aside>
            <el-main class="app-main">
                <el-scrollbar ref="scrollbarRef" class="scroll">
                    <NoteDetail></NoteDetail>
                </el-scrollbar>
            </el-main>
        </el-container>
    </div>
</template>

<style lang="scss" scoped>
.common-layout {
    background: #f0f2f5;
    width: 80vw;
    min-width: 600px;


    .app-right {
        padding: 0;
        height: calc(100vh - 150px);
        background: #545c64;
    }

    .app-main {
        padding: 0;
        margin: 0;
        height: calc(100vh - 150px);

        .scroll {
            height: calc(100vh - 150px);
        }
    }
}
</style>
