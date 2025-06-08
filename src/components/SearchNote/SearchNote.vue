<script setup lang="ts">
// import Fuse from 'fuse.js';
// // import { injectStrict } from "@/utils/symbols"
// // import { NoteKey } from '@/symbols/note';
// // import { searchNoteProps } from './types'

// // const { menuIndex, subMenuIndex, toTop, noteData } = injectStrict(NoteKey)

// const modelValue = defineModel()

// // const props = defineProps(searchNoteProps)
// // console.log(props);

// // onRenderTracked((event) => {
// //     console.log("onRenderTracked", event);
// //     // debugger
// // })

// // onRenderTriggered((event) => {
// //     console.log("onRenderTriggered", event);
// // })

// const inputRef: any = ref(null)
// const input = ref("")
// const resultData = ref<AnyObj[]>([])
// const router = useRouter()
// const selectSearch = ref(-1)

// const fuse = new Fuse(noteData.value, {
//     keys: ['title', 'tags'],
//     minMatchCharLength: 2,
//     isCaseSensitive: false,
//     includeScore: false,
//     includeMatches: false,
//     useExtendedSearch: true,
//     // shouldSort: false,
//     threshold: 0.2,
// })

// const handleKeyUp = (e: any) => {
//     if (e.key === 'Enter') {
//         // 执行相应的操作
//         // console.log('Enter key was pressed');
//         if (selectSearch.value <= -1) return
//         handleSelectSearch(resultData.value[selectSearch.value])
//     } if (e.key === 'Escape') {
//         handleChangeShow()
//     } else if (e.key === 'ArrowUp') {
//         if (selectSearch.value <= 0) return
//         // console.log('ArrowUp');
//         selectSearch.value -= 1
//     } else if (e.key === 'ArrowDown') {
//         if (selectSearch.value >= resultData.value.length - 1) return
//         // console.log('ArrowDown');
//         selectSearch.value += 1
//     }
// }

// watch(
//     () => modelValue.value,
//     () => {
//         if (modelValue.value) {
//             nextTick(() => {
//                 inputRef.value.focus()
//             })
//             input.value = ''
//             resultData.value = []
//             window.addEventListener('keyup', handleKeyUp);
//         } else {
//             window.removeEventListener('keyup', handleKeyUp);
//         }
//     }
// )

// const inputStr = (e: string) => {
//     console.log(e);
//     const str = e.replace(/\s+/g, '|');
//     const result = fuse.search(str)
//     // console.log(result);
//     resultData.value = result
// }

// const handleChangeShow = () => {
//     modelValue.value = !modelValue.value
// }

// const handleSelectSearch = (item: AnyObj) => {
//     // console.log(item.item);
//     menuIndex.value = item.item.menuIndex
//     subMenuIndex.value = item.item.subMenuIndex
//     router.push({ path: `/detail/${item.item.title || ""}` })
//     toTop(0)
//     handleChangeShow()
// }
</script>
<template>
    <Teleport to="body">
        <div>222</div>
        <!-- <div class="search-box" @click.self="handleChangeShow" v-show="modelValue">
            <div class="content">
                <div class="search-bar">
                    <el-input ref="inputRef" class="input" v-model="input" placeholder="Search Note" @input="inputStr"
                        clearable />
                </div>
                <div class="list">
                    <div class="no-data" v-show="resultData.length <= 0">No Data</div>
                    <el-scrollbar class="result" v-show="resultData.length > 0">
                        <div :class="selectSearch === index ? 'item active' : 'item'"
                            v-for="(item, index) of resultData" :key="index" @click="handleSelectSearch(item)">
                            {{ item.item.title }}
                            <el-tag v-for="tag in item.item.tags" class="tag" type='info' :key="tag" effect="dark"
                                round>
                                {{ tag }}
                            </el-tag>
                        </div>
                    </el-scrollbar>
                </div>
                <div class="search-footer">
                    <div class="icon-item">
                        <div class="icon-svg">
                            <svg width="15" height="15" aria-label="回车键" role="img">
                                <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="1.2">
                                    <path d="M12 3.53088v3c0 1-1 2-2 2H4M7 11.53088l-3-3 3-3"></path>
                                </g>
                            </svg>
                        </div>
                        <span>选择</span>
                    </div>
                    <div class="icon-item">
                        <div class="icon-svg">
                            <svg width="15" height="15" aria-label="向下键" role="img">
                                <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="1.2">
                                    <path d="M7.5 3.5v8M10.5 8.5l-3 3-3-3"></path>
                                </g>
                            </svg>
                        </div>
                        <div class="icon-svg">
                            <svg width="15" height="15" aria-label="向上键" role="img">
                                <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="1.2">
                                    <path d="M7.5 11.5v-8M10.5 6.5l-3-3-3 3"></path>
                                </g>
                            </svg>
                        </div>
                        <span>切换</span>
                    </div>
                    <div class="icon-item">
                        <div class="icon-svg">
                            <svg width="15" height="15" aria-label="Esc 键" role="img">
                                <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="1.2">
                                    <path
                                        d="M13.6167 8.936c-.1065.3583-.6883.962-1.4875.962-.7993 0-1.653-.9165-1.653-2.1258v-.5678c0-1.2548.7896-2.1016 1.653-2.1016.8634 0 1.3601.4778 1.4875 1.0724M9 6c-.1352-.4735-.7506-.9219-1.46-.8972-.7092.0246-1.344.57-1.344 1.2166s.4198.8812 1.3445.9805C8.465 7.3992 8.968 7.9337 9 8.5c.032.5663-.454 1.398-1.4595 1.398C6.6593 9.898 6 9 5.963 8.4851m-1.4748.5368c-.2635.5941-.8099.876-1.5443.876s-1.7073-.6248-1.7073-2.204v-.4603c0-1.0416.721-2.131 1.7073-2.131.9864 0 1.6425 1.031 1.5443 2.2492h-2.956">
                                    </path>
                                </g>
                            </svg>
                        </div>
                        <span>关闭</span>
                    </div>
                </div>
            </div>
        </div> -->
    </Teleport>
</template>

<style lang="scss" scoped>
.search-box {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;

    .content {
        width: 560px;
        margin: 60px auto auto;
        border-radius: 6px;
        background: #242424;
        position: relative;

        .search-bar {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 12px 12px 0;

            .input {
                background: transparent !important;

            }
        }

        .list {
            min-height: 200px;
            padding: 20px;

            .no-data {
                width: 100%;
                height: 200px;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #fff;
            }

            .result {
                height: 400px;

                .item {
                    height: 50px;
                    display: flex;
                    background: #2c2c2c;
                    border-radius: 4px;
                    align-items: center;
                    padding: 0 10px;
                    color: #fff;
                    cursor: pointer;

                    .tag {
                        padding: 0 10px;
                        margin-left: 10px;
                    }
                }

                .item+.item {
                    margin-top: 10px;
                }

                .item:hover {
                    background-color: #409eff;
                }

                .active {
                    background-color: #409eff;
                }
            }
        }

        .search-footer {
            padding: 10px;
            display: flex;
            align-items: center;
            color: #fff;

            .icon-item {
                display: flex;
                font-size: 0.75em;
                margin-right: 10px;
            }

            .icon-svg {
                align-items: center;
                background: rgba(125, 125, 125, .1);
                border-radius: 2px;
                display: flex;
                height: 18px;
                justify-content: center;
                margin-right: .4em;
                padding: 0 0 1px;
                color: #a3a6ad;
                border: 0;
                width: 20px;
            }
        }
    }
}

:deep(.el-input__inner),
:deep(.el-input__wrapper) {
    background: transparent !important;
    height: 56px;
    color: #fff;
}
</style>