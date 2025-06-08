import type { PluginItem, CachePlugin } from '@/symbols/desktop'
import { nanoid } from 'nanoid'
import { usePluginStoreHook } from '@/stores/plugin'
const { setPluginConfig, updatePluginConfig } = usePluginStoreHook()
// 动态导入所有程序的配置文件
const pluginConfigModules = import.meta.glob('@/views/plugin/*/config.ts', { eager: true })

const pluginList = ref<PluginItem[]>([])
console.log('init Plugin hook')

export function usePlugin() {
  function initPlugin() {
    const pluginConfig = getPluginConfig()
    const result: PluginItem[] = []
    pluginConfig.forEach((item) => {
      result.push(createDesktopPlugin(item))
    })

    console.log('🚀 ~ initPlugin ~ result:', result)

    pluginList.value = result
  }

  function getPluginConfig() {
    const modulesArray: AnyObj[] = Object.entries(pluginConfigModules).filter(Boolean)

    let result: CachePlugin[] = []
    // 遍历模块数组
    result = modulesArray.map((item) => {
      // 获取文件夹路径
      const folderArray = item[0].split('/').slice(0, -1).filter(Boolean)
      // 获取配置数据
      const configData: PluginConfig = item[1].default

      // console.log(configData)
      const folder = folderArray.slice(-1)[0]
      const cacheItem: CachePlugin = {
        ...configData,
        folder: folder,
        nanoid: nanoid()
      }
      const mixinConfig = setPluginConfig(cacheItem)
      // 返回包含配置数据、路径和文件夹的对象
      return mixinConfig
    })
    return result
  }

  function updatePlugin(item: Partial<CachePlugin>) {
    const findIndex = pluginList.value.findIndex((value) => value.props.nanoid === item.nanoid)
    if (findIndex >= 0) {
      Object.assign(pluginList.value[findIndex].props, item)
      updatePluginConfig(pluginList.value[findIndex].props)
    }
  }

  function createDesktopPlugin(item: CachePlugin) {
    // 异步加载插件组件
    const tem = defineAsyncComponent(() => import(`@/views/plugin/${item.folder}/${item.name}.vue`))

    const result: PluginItem = {
      component: shallowRef(tem),
      props: item
    }
    return result
  }
  return { pluginList, initPlugin, updatePlugin }
}
