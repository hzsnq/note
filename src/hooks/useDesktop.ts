import { useTheme } from '@/hooks/useTheme'
import { useColors } from '@/hooks/useColors'
import { useDesktopStoreHook } from '@/stores/desktop'

const { cacheIsActiveProgram, cacheIsSettingProgram, setSettingProgram, setActiveProgram } =
  useDesktopStoreHook()
const { getRandomColor } = useColors()
const { changeTheme } = useTheme()

//当前桌面显示颜色文字等
const colorItem = ref<Color>(getRandomColor())
//当前桌面设置程序
const isSettingProgram = ref<string>('')
//当前桌面选中程序
const isActiveApplication = ref<string>('')
//是否设置桌面配置
const isSettingDesktop = ref<boolean>(false)
//是否设置桌面插件
const isSettingPlugin = ref<boolean>(false)

console.log('init Desktop hook')

export function useDesktop() {
  /**
   * 初始化背景颜色的函数
   * 将当前颜色项的十六进制值设置为文档的根元素的自定义属性 --color-bg
   */
  function initDesktop() {
    // 获取当前颜色项的十六进制值
    const hex = colorItem.value.hex
    // 将 --color-bg 属性设置为当前颜色项的十六进制值
    document.documentElement.style.setProperty('--color-bg', hex)

    isActiveApplication.value = cacheIsActiveProgram
    isSettingProgram.value = cacheIsSettingProgram

    watchEffect(() => {
      if (isActiveApplication.value) {
        setActiveProgram(isActiveApplication.value)
      }
      setSettingProgram(isSettingProgram.value)
    })
  }

  /**
   * 处理主题变化的函数
   * @param {MouseEvent} e - 鼠标事件对象
   * @param {Color} item - 颜色对象，可选参数，如果未提供则获取随机颜色
   * 更新颜色项并调用 changeTheme 函数来改变主题
   */
  const handleChangeTheme = (e: MouseEvent, item?: Color) => {
    // 如果未提供颜色项，则获取随机颜色
    item = item ? item : getRandomColor()
    // 更新颜色项的值
    colorItem.value = item
    // 调用 changeTheme 函数来改变主题
    changeTheme(e, item.hex)
  }

  // 返回包含颜色数据和处理主题变化方法的对象
  return {
    colorItem,
    isSettingProgram,
    isActiveApplication,
    isSettingDesktop,
    isSettingPlugin,
    handleChangeTheme,
    initDesktop
  }
}
