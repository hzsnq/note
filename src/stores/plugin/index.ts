import store from '@/stores'
import type { CachePlugin } from '@/symbols/desktop'
export const usePluginStore = defineStore(
  'pluginStore',
  () => {
    const pluginList = ref<CachePlugin[]>([])

    function setPluginConfig(item: CachePlugin) {
      let mixinConfig: CachePlugin = item

      const index = pluginList.value.findIndex((value) => value.name === item.name)
      if (index >= 0) {
        // console.log(item, programSetting.value[index])

        mixinConfig = Object.assign(item, pluginList.value[index])
        pluginList.value[index] = mixinConfig
      } else {
        pluginList.value.push(item)
      }

      return mixinConfig
    }

    function updatePluginConfig(item: CachePlugin) {
      const index = pluginList.value.findIndex((value) => value.name === item.name)
      if (index >= 0) {
        pluginList.value[index] = item
      }
    }
    return { pluginList, setPluginConfig, updatePluginConfig }
  },
  {
    persist: {
      // debug: true,
      // CONFIG OPTIONS HERE
      key: 'Plugin',
      pick: ['pluginList'],
      storage: localStorage
    }
  }
)

/** 在 setup 外使用 */
export function usePluginStoreHook() {
  return usePluginStore(store)
}
