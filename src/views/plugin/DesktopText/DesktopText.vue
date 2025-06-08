<script lang="ts" setup>
import { useDesktop } from '@/hooks/useDesktop';

const { colorItem } = useDesktop();

// const { color } = defineProps<{
//     color: Color
// }>();
let color = reactive(colorItem.value)
watchEffect(() => {
    Object.assign(color, colorItem.value)
})
const fullText = ref(color.sentence);
const sentence = ref('');
const sentenceFrom = ref('');
const typingDelay = 200 // 打字间隔时间，单位毫秒
const typeSpeed = 100 // 打字速度，单位毫秒
let timer: any = null
// console.log(color);
onMounted(() => {
    typeText()
})

function typeText() {
    if (sentence.value.length === fullText.value.length) {
        fullText.value = color.sentenceFrom;
        sentenceFrom.value = '';
        clearTimeout(timer)
        typeText2()
        // 所有文本已经打印完毕
        return;
    }
    // 继续打字
    const char = fullText.value.charAt(sentence.value.length);
    sentence.value += char;
    timer = setTimeout(typeText, typingDelay + typeSpeed);
}

function typeText2() {
    if (sentenceFrom.value.length === fullText.value.length) {
        fullText.value = '';
        clearTimeout(timer)
        // 所有文本已经打印完毕
        return;
    }
    const char = fullText.value.charAt(sentenceFrom.value.length);
    sentenceFrom.value += char;
    timer = setTimeout(typeText2, typingDelay + typeSpeed);
}

watch(color, () => {
    clearTimeout(timer)
    fullText.value = color.sentence;
    sentence.value = '';
    sentenceFrom.value = '';
    typeText()
})

onBeforeUnmount(() => {
    clearTimeout(timer)
})
</script>

<template>
    <div class="item-bottom font-st">
        <div class="text">
            <div class="sentence">
                <span v-for="(item, index) in sentence.split('')" :key="item + index">
                    {{ item }}
                    <br v-if="
                        item === '，' ||
                        item === '。' ||
                        item === '；' ||
                        item === '、' ||
                        item === '：'
                    ">
                </span>
            </div>
            <div class="from">
                <span v-for="(item, index) in sentenceFrom.split('')" :key="item + index">
                    {{ item }}
                    <br v-if="item === ' '">
                </span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.item-bottom {
    // position: absolute;
    // right: 100px;
    // top: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    .text {
        writing-mode: vertical-rl;
    }

    .sentence {
        font-size: 30px;

        span {
            opacity: 0;
            animation: show 1.6s linear forwards;
        }
    }

    .from {
        font-size: 20px;
        margin-right: 10px;
        position: relative;

        span {
            opacity: 0;
            animation: show 1.6s linear forwards;

            &:first-child {
                &:before {
                    content: "「";
                    position: relative;
                    top: -1px;
                }
            }

            &:last-child {
                &:after {
                    content: "」";
                    position: relative;
                    bottom: 1px;
                }
            }
        }
    }

}

@keyframes show {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}
</style>