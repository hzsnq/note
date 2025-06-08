<script lang="ts" setup>
requestAnimationFrame(() => {
    console.log('1');
})
requestIdleCallback(() => {
    console.log('2');
})
</script>

<template>
    <div class="wrapper">
        <div class="tj"></div>
    </div>
</template>

<style lang="scss" scoped>
.wrapper {
    width: 300px;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;

    .tj {
        width: 200px;
        height: 200px;
        background: #fff;
        border-right: 100px solid #000;
        // position: relative;
        // // bottom: 0;
        // // left: 0;
        border-radius: 50%;
        animation: rotate 2s linear infinite;

        &::before {
            content: "";
            width: 100px;
            height: 100px;
            background: #fff;
            // border-right: 50px solid #000;
            border: 40px solid #000;
            position: absolute;
            bottom: 0;
            left: 50%;
            border-radius: 50%;
        }

        &::after {
            content: "";
            width: 100px;
            height: 100px;
            background: #000;
            border: 40px solid #fff;
            border-radius: 50%;
            position: absolute;
            top: 0;
            left: 50%;
            border-radius: 50%;
        }
    }
}


@keyframes rotate {
    from {
        transform: rotate(0);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>