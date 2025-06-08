<script lang="ts" setup>
import 'APlayer/dist/APlayer.min.css';
import APlayer from 'APlayer';
import { useMusicStore } from '@/stores/music';
import { wrapperEnv } from '@/utils/env'
//103943093 netease
//8599271622 tencent
//gcid_3zmy1ieqzhaz0f5 kugou
const id = ref('103943093')
const server = ref('netease')
const { musicList, setMusicList } = useMusicStore()
const { VITE_MUSIC_PATH } = wrapperEnv

onMounted(() => {
    getMusicList()
})

function getMusicList() {
    if (musicList.length) {
        new APlayer({
            container: document.getElementById('aplayer'),
            lrcType: 0,
            fixed: true,
            audio: musicList
        });
        return musicList
    } else {
        let list = []
        fetch(`${VITE_MUSIC_PATH}?server=${server.value}&type=playlist&id=${id.value}&r=${Math.random()}`, { mode: 'cors' }).then(res => res.text()).then(value => {
            list = JSON.parse(value)
            setMusicList(list)
            new APlayer({
                container: document.getElementById('aplayer'),
                lrcType: 0,
                fixed: true,
                audio: list
            });
        })
    }
}
</script>

<template>
    <div class="music">
        <!-- <meting-js :id="id" :server="server" type="playlist" mini="true" fixed="true" autoplay="false" loop="all"
            order="list" preload="auto" list-folded="false" list-max-height="500px" lrc-type="1">
        </meting-js> -->
        <div id="aplayer"></div>
    </div>
</template>

<style lang="scss" scoped>
.music {
    width: 600px;
    color: #000;
    user-select: none;
}
</style>

<style lang="scss">
.aplayer-lrc {
    width: 300px !important;
    right: 0 !important;
    left: auto !important;
}
</style>