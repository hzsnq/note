import { useProgramStoreHook } from '@/stores/program'
import { useApplicationStoreHook } from '@/stores/application'
import type { Program, DefaultProgram } from '@/symbols/desktop'

import { useColors } from '@/hooks/useColors'
import { nanoid } from 'nanoid'

const { getCache } = useApplicationStoreHook()
const { setSetting, getSetting, deleteSetting, updateSetting } = useProgramStoreHook()
const { getRandomColor } = useColors()

//程序坞程序数据
const programData = ref<Program[]>([])
// 动态导入所有程序的配置文件
const programConfigModules = import.meta.glob('@/views/program/*/config.ts', {
  eager: true,
  import: 'default'
})
// 动态导入所有程序的图标文件
const iconModules: AnyObj = import.meta.glob('@/views/program/*/icons/*.png', {
  eager: true,
  import: 'default'
})
console.log('init Program hook')

export function useProgram() {
  /**
   * 导出程序配置
   * @returns {DefaultProgram[]} 导出的程序配置列表
   */
  function createProgramList() {
    let result: DefaultProgram[] = []
    const defaultConfigList = getDefaultConfig()

    result = defaultConfigList.map((item) => {
      const mixinData = setSetting(item)
      return {
        name: mixinData.name,
        icon: mixinData.icon,
        path: '',
        folder: mixinData.folder,
        window: {
          title: mixinData.title,
          width: mixinData.width,
          height: mixinData.height,
          x: mixinData.x,
          y: mixinData.y,
          isSetting: mixinData.isSetting
        }
      }
    })
    return result
  }

  function getDefaultConfig() {
    // 将模块转换为数组
    const modulesArray: AnyObj[] = Object.entries(programConfigModules).filter(Boolean)

    let result: DefaultConfig[] = []
    // 遍历模块数组
    result = modulesArray.map((item) => {
      // 获取文件夹路径
      const folderArray = item[0].split('/').slice(0, -1).filter(Boolean)
      // 获取配置数据
      const configData: ProgramConfig = item[1]

      // console.log(configData)
      const folder = folderArray.slice(-1)[0]

      // 返回包含配置数据、路径和文件夹的对象
      return {
        name: configData.name,
        icon: configData.icon,
        title: configData.window?.title,
        folder: folder,
        width: configData.window?.width,
        height: configData.window?.height,
        x: configData.window?.x,
        y: configData.window?.y,
        isSetting: configData.isSetting
      }
    })

    return result
  }

  /**
   * 初始化程序列表
   * @returns {void}
   */
  function initProgram() {
    // 存储程序列表的数组
    const result: Program[] = []
    // 从缓存中获取程序数据
    const cacheValue = getCache()
    // 获取导出的程序列表
    const programList = createProgramList()
    // 遍历程序列表
    for (let i = 0; i < programList.length; i++) {
      // 获取当前程序
      const program = programList[i]
      // 在缓存中查找当前程序
      const find = cacheValue.find((val) => {
        // 如果缓存中的程序名称与当前程序名称相同，则返回该程序
        return val.props.name === program.name
      })
      // 将当前程序添加到结果数组中
      result.push({
        // 如果找到缓存中的程序，则使用缓存中的程序ID，否则生成一个新的ID
        nanoid: find ? find.props.nanoid : nanoid(),
        // 获取一个随机颜色
        color: getRandomColor(),
        // 将当前程序的其他属性添加到结果数组中
        ...program
      })
    }
    // 打印初始化后的程序列表
    console.log('🚀 ~ initProgram ~ result:', result)
    // 将结果数组赋值给程序数据
    programData.value = result
  }

  function getProgramSetting(name: string) {
    const cacheSetting = getSetting()
    return cacheSetting.find((val) => val.name === name)
  }

  function resetProgramConfig(name: string) {
    deleteSetting(name)
    const item = getDefaultConfig().find((val) => val.name === name)
    item && setSetting(item)
    return item
  }

  //计算程序显示的图标
  const requireImgUrl = computed(() => {
    return (folder: Program['folder'], icon: Program['icon']) => {
      const path = `/src/views/program/${folder}/icons/${icon}` // 要写绝对或者相对路径
      return iconModules[path]
    }
  })

  //计算程序显示的样式
  const itemComputed = computed(() => {
    return (item: Color) => {
      return {
        background: item?.hex || '#fff',
        color: item?.fontColor || '#fff'
      }
    }
  })

  //计算程序显示的名称
  const nameComputed = computed(() => {
    return (item: Program, num?: number) => {
      return item.window?.title.substring(0, num ? num : 1).toLocaleUpperCase()
    }
  })
  return {
    programData,
    requireImgUrl,
    itemComputed,
    nameComputed,
    initProgram,
    getProgramSetting,
    updateSetting,
    resetProgramConfig
  }
}
