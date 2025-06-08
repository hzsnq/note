import type { ExtractPropTypes } from 'vue'
import {
  baseProps,
  makeBooleanProp,
  //   makeArrayProp,
  makeNumberProp,
  //   makeNumberProp,
  // makeRequiredProp,
  makeStringProp
} from '../common/props'

export const programWrapperProps = {
  ...baseProps,
  /**
   * 应用名称
   * @default ''
   * @type {string}
   */
  name: { ...makeStringProp('') },
  /**
   * 窗口标题
   * @default ''
   * @type {string}
   */
  title: { ...makeStringProp('') },
  /**
   * 窗口横坐标
   * @default 0
   * @type {number}
   */
  x: { ...makeNumberProp(0) },
  /**
   * 窗口纵坐标
   * @default 0
   * @type {number}
   */
  y: { ...makeNumberProp(0) },
  /**
   * 窗口宽度
   * @default 300
   * @type {number}
   */
  width: { ...makeNumberProp(300) },
  /**
   * 窗口高度
   * @default 300
   * @type {number}
   */
  height: { ...makeNumberProp(300) },
  /**
   * 是否可设置
   * @default true
   * @type {number}
   */
  isSetting: { ...makeBooleanProp(true) }
}

export type ProgramWrapperProps = ExtractPropTypes<typeof programWrapperProps>
