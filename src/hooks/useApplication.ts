import { useApplicationStoreHook } from '@/stores/application'
import { useProgramStoreHook } from '@/stores/program'
import type { Application, Program, IApplicationWrapper } from '@/symbols/desktop'

const { setCache, deleteCache, getCache, updateCache } = useApplicationStoreHook()
const { getSetting } = useProgramStoreHook()
//应用程序总数据
const applicationData = ref<Application[]>([])

console.log('init Application hook')

export function useApplication() {
  /**
   * 设置应用程序
   * @param item - 应用程序项
   * @param program - 程序
   */
  function setApplication(item: Application) {
    const p = applicationData.value.find((value) => value.props.title === item.props.title)
    if (!p) {
      applicationData.value.push(item)
      setCache(item.props)
    }
  }

  /**
   * 删除应用程序
   * @param nanoid - 应用程序的 nanoid
   */
  function deleteApplication(nanoid: string) {
    // 从 programData 中过滤掉具有指定 nanoid 的应用程序项
    applicationData.value = applicationData.value.filter((value) => value.props.nanoid !== nanoid)
    // 删除指定 nanoid 的缓存
    deleteCache(nanoid)
  }

  /**
   * 更新应用程序
   * @param props - 应用程序包装器
   */
  function updateApplication(props: IApplicationWrapper) {
    // 更新缓存中的应用程序属性
    updateCache(props)
  }

  /**
   * 创建应用程序
   * @param item - 程序
   * @param props - 应用程序包装器
   * @returns 应用程序项
   */
  function createApplication(item: DefaultConfig, props: IApplicationWrapper) {
    // 异步加载应用程序组件
    const tem = defineAsyncComponent(
      () => import(`@/views/program/${item.folder}/${item.name}.vue`)
    )
    const result: Application = {
      props: props,
      component: shallowRef(tem)
    }
    return result
  }

  /**
   * 初始化应用程序
   */
  function initApplication() {
    const result: Application[] = []
    const value = getCache()
    const programList = getSetting()
    if (!value || !programList) return
    for (let i = 0; i < value.length; i++) {
      const program = programList.find((val) => val.name === value[i].props.name) as DefaultConfig
      const params = createApplication(program, value[i].props)
      result.push(params)
    }
    applicationData.value = result

    console.log('🚀 ~ initApplication ~ result:', result)
  }

  /**
   * 处理添加应用程序
   * @param item - 程序
   */
  function handleAddApplication(item: Program) {
    const props: IApplicationWrapper = {
      nanoid: item.nanoid,
      name: item.name,
      ...item.window,
      title: item.window?.title || item.name,
      x: item.window?.x ?? Math.floor(Math.random() * 500),
      y: item.window?.y ?? 40
    }
    // console.log(props)
    const programList = getSetting()
    const program = programList.find((val) => val.name === item.name) as DefaultConfig
    const params = createApplication(program, props)
    setApplication(params)
  }

  return {
    applicationData,
    deleteApplication,
    initApplication,
    updateApplication,
    handleAddApplication
  }
}
