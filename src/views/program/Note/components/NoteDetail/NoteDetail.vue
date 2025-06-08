<script setup lang="ts">
import MarkdownIt from 'markdown-it'
import markdownItHighlightjs from 'markdown-it-highlightjs'
import markdownItCodeCopy from 'markdown-it-code-copy'
// import markdownItAnchor from 'markdown-it-anchor'
// import markdownItTocDoneRight from 'markdown-it-toc-done-right'
// import markdownItTableOfContents from 'markdown-it-table-of-contents'
import 'highlight.js/styles/Rainbow.css'

import { injectStrict } from "@/utils/symbols"
import { NoteKey } from '../../symbols/note';

const { menuIndex, subMenuIndex, noteData } = injectStrict(NoteKey)
const loading = ref(true)
const content = ref<any>("")
// const router = useRouter()

// const timeStr = new Date().getTime()
// console.log(timeStr);
const md = new MarkdownIt({
    html: true,
    xhtmlOut: true,
    typographer: true,
    linkify: true,
    typography: true
}
)
// 配置代码高亮插件
md.use(markdownItHighlightjs)
// 配置生成菜单
// md.use(markdownItAnchor, {
//     permalink: true, permalinkBefore: true, permalinkSymbol: '⭐️'
// })

// md.use(markdownItAnchor, {
//     permalink: markdownItAnchor.permalink.linkAfterHeader({
//         style: 'visually-hidden',
//         assistiveText: title => ``,
//         visuallyHiddenClass: 'visually-hidden',
//         // wrapper: ['<div class="wrapper">', '</div>']
//     })
// })
// md.use(markdownItTableOfContents, {
//     includeLevel: [2, 3],
//     transformLink: function (str: any) {
//         // return `1111111detail/${getNoteName(location.hash)}/#${str}`
//         return `jsvascript:void(0)`
//     }
// })
// md.use(markdownItTocDoneRight)

// 配置代码块复制插件 报错用不了
md.use(markdownItCodeCopy, {
    element: `<div>copy</div>`,
    // onSuccess: function (str: any) {
    //     console.log(timeStr, arguments);
    //     console.log(str.clearSelection);
    // }
})

onMounted(() => {
    getNoteContent()
})

function getNoteContent() {
    const url = noteData.value[menuIndex.value].subMenu[subMenuIndex.value]?.url;
    if (!url) {
        loading.value = false
        return
    };
    loading.value = true
    fetch(url, { mode: 'cors' }).then(res => res.text()).then(value => {
        // console.log(value);
        loading.value = false;
        content.value = md.render(value || "")
    })
    // jsonp(url)
    //     .then(response => {
    //         // console.log(response);
    //         loading.value = false;
    //         // content.value = response || "";
    //         content.value = md.render(response || "")
    //     })
    //     .catch(err => {
    //         loading.value = false;
    //         console.log(err);
    //     });
}

watch(
    () => [menuIndex.value, subMenuIndex.value],
    () => {
        // console.log(menuIndex.value, subMenuIndex.value);
        if (menuIndex.value !== "-1" && subMenuIndex.value !== "-1") {
            getNoteContent()
        }
    }
)

onUnmounted(() => {
    // console.log('组件销毁');
});

// function getNoteName(input: any) {
//     const matches = input.split("/")
//     if (matches.length >= 3) {
//         return matches[2]
//     }
//     return 'str';
// }

</script>

<template>
    <div class="content-box" v-loading="loading">
        <div class="content" v-html="content"></div>
        <!-- <div class="table-content"></div> -->
    </div>
</template>

<style lang="scss">
.content-box {
    display: flex;
    justify-content: space-between;
    min-height: calc(100vh - 150px);
    position: relative;
    padding: 20px;

    .content {
        width: 100%;
        min-width: 400px;
        // position: absolute;

        p {
            line-height: 1.8;
            margin-bottom: 16px;
        }

        h2,
        h3,
        h4,
        pre {
            margin: 16px 0;
        }
    }

    .table-content {
        width: 260px;
        overflow: hidden;
    }

    .table-of-contents {
        width: 260px;
        position: absolute;
        overflow: hidden;
        top: 60px;
        right: 0;
        // font-size: 16px;
        // background: #fff;

        ul {
            list-style: none;

            li+li {
                padding-top: 10px;
            }

            a {
                position: relative;
            }

            .active::after {
                content: "";
                position: absolute;
                top: 0;
                left: -10px;
                width: 2px;
                height: 100%;
                background: rgb(74, 75, 157);
                transition: 0.5s linear;
            }
        }
    }
}
</style>