export type ThemeName = 'default' | 'dark' | 'light'

interface ThemeList {
  title: string
  name: ThemeName
}

const theme = ref<ThemeName>('default')

const themeList: ThemeList[] = [
  {
    title: '默认',
    name: 'default'
  },
  {
    title: '黑暗',
    name: 'dark'
  },
  {
    title: '白天',
    name: 'light'
  }
]
const setTheme = (name: ThemeName) => {
  theme.value = name
}

/** 在 html 根元素上挂载 class */
function addHtmlClass(value: ThemeName) {
  document.documentElement.classList.add(value)
}

/** 在 html 根元素上移除其他主题 class */
function removeHtmlClass(value: ThemeName) {
  const otherThemeNameList = themeList.map((item) => item.name).filter((name) => name !== value)
  document.documentElement.classList.remove(...otherThemeNameList)
}

function initTheme() {
  watchEffect(() => {
    const value = theme.value
    removeHtmlClass(value)
    addHtmlClass(value)
  })
}

const changeTheme = (e: MouseEvent, hex: string) => {
  document.documentElement.style.setProperty('--x', e.clientX + 'px')
  document.documentElement.style.setProperty('--y', e.clientY + 'px')

  const handler = () => {
    document.documentElement.style.setProperty('--color-bg', hex)
    // setTheme(theme.value === 'default' ? 'dark' : 'default')
  }

  ;(document as any).startViewTransition
    ? (document as any).startViewTransition(handler)
    : handler()
}
console.log('init Theme hook')

export function useTheme() {
  return {
    themeList,
    initTheme,
    setTheme,
    changeTheme
  }
}
