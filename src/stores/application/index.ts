import store from '@/stores'
import type { CacheApplication, IApplicationWrapper } from '@/symbols/desktop'

export const useApplicationStore = defineStore(
  'applicationStore',
  () => {
    const cacheApplication = ref<CacheApplication[]>([])

    function setCache(props: IApplicationWrapper) {
      const index = cacheApplication.value.findIndex((item) => item.props.name === props.title)
      if (index >= 0) {
        cacheApplication.value[index].props = props
      } else {
        cacheApplication.value.push({
          props
        })
      }
    }

    function deleteCache(nanoid: string) {
      cacheApplication.value = cacheApplication.value.filter((item) => {
        return item.props.nanoid !== nanoid
      })
    }

    function updateCache(props: IApplicationWrapper) {
      const index = cacheApplication.value.findIndex((item) => item.props.nanoid === props.nanoid)
      if (index >= 0) {
        cacheApplication.value[index].props = props
      }
    }

    function getCache() {
      return cacheApplication.value
    }

    return {
      cacheApplication,
      setCache,
      deleteCache,
      getCache,
      updateCache
    }
  },
  {
    persist: {
      // debug: true,
      // CONFIG OPTIONS HERE
      key: 'Application',
      pick: ['cacheApplication', 'cacheIsActive', 'cacheIsSetting'],
      storage: localStorage
    }
  }
)

/** 在 setup 外使用 */
export function useApplicationStoreHook() {
  return useApplicationStore(store)
}
