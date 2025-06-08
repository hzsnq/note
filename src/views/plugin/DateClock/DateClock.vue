<script lang="ts" setup>
import { useDateTime } from '@/hooks/useDateTime';
const { dateAll, timeAll, updateTime, } = useDateTime()

let timerID = setInterval(updateTime, 1000);
updateTime();
onUnmounted(() => {
    clearInterval(timerID);
})
</script>

<template>
    <div id="clock">
        <p class="date">{{ dateAll }}</p>
        <p class="time">{{ timeAll }}</p>
        <!-- <p class="text">还只是年轻</p> -->
    </div>
</template>

<style lang="scss" scoped>
#clock {
    font-family: 'Share Tech Mono', monospace;
    text-align: center;
    // position: absolute;
    // left: 50%;
    // top: 8%;
    // transform: translateX(-50%);
    color: #daf6ff;
    text-shadow: 0 0 20px rgba(10, 175, 230, 1), 0 0 20px rgba(10, 175, 230, 0);

    .time {
        letter-spacing: 0.05em;
        font-size: 80px;
        padding: 5px 0;
    }

    .date {
        letter-spacing: 0.1em;
        font-size: 24px;
    }

    .text {
        letter-spacing: 0.1em;
        font-size: 12px;
        padding: 20px 0 0;
    }
}
</style>