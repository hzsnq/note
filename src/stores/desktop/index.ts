import store from '@/stores'

export const useDesktopStore = defineStore(
  'desktopStore',
  () => {
    const cacheIsActiveProgram = ref<string>('')
    const cacheIsSettingProgram = ref<string>('')

    function setActiveProgram(nanoid: string) {
      cacheIsActiveProgram.value = nanoid
    }
    function setSettingProgram(title: string) {
      cacheIsSettingProgram.value = title
    }

    return { cacheIsActiveProgram, cacheIsSettingProgram, setActiveProgram, setSettingProgram }
  },
  {
    persist: {
      // debug: true,
      // CONFIG OPTIONS HERE
      key: 'Desktop',
      pick: ['cacheIsActiveProgram', 'cacheIsSettingProgram'],
      storage: localStorage
    }
  }
)

/** 在 setup 外使用 */
export function useDesktopStoreHook() {
  return useDesktopStore(store)
}
