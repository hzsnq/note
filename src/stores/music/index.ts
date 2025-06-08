import store from '@/stores'

export const useMusicStore = defineStore(
  'musicStore',
  () => {
    const musicList = ref<AnyObj[]>([])

    function setMusicList(list: AnyObj[]) {
      musicList.value = list
    }

    return { musicList, setMusicList }
  },
  {
    persist: {
      // debug: true,
      // CONFIG OPTIONS HERE
      key: 'Music',
      pick: ['musicList'],
      storage: localStorage
    }
  }
)

/** 在 setup 外使用 */
export function useMusicStoreHook() {
  return useMusicStore(store)
}
