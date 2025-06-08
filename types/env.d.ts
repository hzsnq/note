/// <reference types="vite/client" />
declare module 'markdown-it'
declare module 'markdown-it-code-copy'
declare module 'markdown-it-table-of-contents'
declare module 'APlayer'

interface AnyObj {
  [key: string]: any
}

type NullType<T> = T | null

type Partial<T> = { [P in keyof T]: T[P] }

interface DefaultConfig {
  name: string
  icon: string
  title: string
  folder: string
  width?: number
  height?: number
  x?: number
  y?: number
  isSetting?: boolean
}

interface ProgramConfig {
  name: DefaultConfig['name']
  icon: DefaultConfig['icon']
  window: {
    title: DefaultConfig['title']
    width?: DefaultConfig['width']
    height?: DefaultConfig['height']
    x?: DefaultConfig['x']
    y?: DefaultConfig['y']
  }
  isSetting?: DefaultConfig['isSetting']
}

interface PluginConfig {
  name: string
  isShow: boolean
  isDraggable: boolean
  x?: number
  y?: number
}

interface Color {
  name: string
  hex: string
  fontColor?: string
  sentence: string
  sentenceFrom: string
  category: string
}

interface DesktopConfig {
  plugin: PluginConfig
  background?: string
  color: Color
  theme: string
}

interface ENV {
  VITE_APP_TITLE: string
  VITE_PROGRAM_PATH: string
  VITE_PLUGIN_PATH: string
  VITE_WEBSOCKET_PATH: string
  VITE_MUSIC_PATH: string
  [key: string]: any
}
