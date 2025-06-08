import type { Component, InjectionKey, Ref } from 'vue'

export interface DefaultProgram {
  path: string
  folder: string
  name: string
  icon: string
  window: {
    title: string
    width?: number
    height?: number
    x?: number
    y?: number
    isSetting?: boolean
  }
}

export interface Program extends DefaultProgram {
  nanoid: string
  color: Color
}

export interface IApplicationWrapper {
  title: string
  name: string
  nanoid: string
  x: number
  y: number
  width?: number
  height?: number
  isSetting?: boolean
}

export interface CacheApplication {
  props: IApplicationWrapper
}

export interface Application extends CacheApplication {
  component: Component | any
}

export interface CachePlugin extends PluginConfig {
  folder: string
  nanoid: string
}

export interface PluginItem {
  component: Component | any
  props: CachePlugin
}

interface Desktop {
  isActiveApplication: Ref<string>
  isSettingProgram: Ref<string>
  isSettingDesktop: Ref<boolean>
  isSettingPlugin: Ref<boolean>
}

/**
 * @description Popup InjectionKey Symbol
 */
export const DesktopKey: InjectionKey<Desktop> = Symbol('desktop')
