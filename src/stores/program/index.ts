import store from '@/stores'
// import type { DefaultProgram } from '@/symbols/application'
// import { deepMerge } from '@/utils'
export const useProgramStore = defineStore(
  'programStore',
  () => {
    const programSetting = ref<DefaultConfig[]>([])

    function setSetting(item: DefaultConfig) {
      let mixinConfig: DefaultConfig = item

      const index = programSetting.value.findIndex((value) => value.name === item.name)
      if (index >= 0) {
        // console.log(item, programSetting.value[index])

        mixinConfig = Object.assign(item, programSetting.value[index])
        programSetting.value[index] = mixinConfig
      } else {
        programSetting.value.push(item)
      }

      return mixinConfig
    }

    function updateSetting(item: DefaultConfig) {
      const index = programSetting.value.findIndex((value) => value.name === item.name)
      if (index >= 0) {
        programSetting.value[index] = Object.assign(programSetting.value[index], item)
      }
    }

    function deleteSetting(name: string) {
      programSetting.value = programSetting.value.filter((value) => value.name !== name)
    }

    function getSetting() {
      return programSetting.value
    }

    return { programSetting, setSetting, getSetting, deleteSetting, updateSetting }
  },
  {
    persist: {
      // debug: true,
      // CONFIG OPTIONS HERE
      key: 'Program',
      pick: ['programSetting'],
      storage: localStorage
    }
  }
)

/** 在 setup 外使用 */
export function useProgramStoreHook() {
  return useProgramStore(store)
}
