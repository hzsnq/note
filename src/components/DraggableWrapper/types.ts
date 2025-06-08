import type { ExtractPropTypes } from 'vue'
import {
  baseProps,
  //   makeArrayProp,
  makeBooleanProp,
  makeNumberProp,
  //   makeNumberProp,
  makeRequiredProp,
  makeStringProp
} from '../common/props'

export const draggableWrapperProps = {
  ...baseProps,
  /**
   * 窗口横坐标
   * @default 0
   * @type {number}
   */
  containerClass: { ...makeStringProp('desktop-content') },
  /**
   * 窗口横坐标
   * @default 0
   * @type {number}
   */
  x: { ...makeNumberProp(0), ...makeRequiredProp(Number) },
  /**
   * 窗口纵坐标
   * @default 0
   * @type {number}
   */
  y: { ...makeNumberProp(0), ...makeRequiredProp(Number) },
  /**
   * 是否显示窗口
   * @default true
   * @type {boolean}
   */
  isShow: { ...makeBooleanProp(true) },
  /**
   * 是否可拖动
   * @default false
   * @type {boolean}
   */
  isDraggable: { ...makeBooleanProp(false) },
  /**
   * 是否显示设置
   * @default false
   * @type {boolean}
   */
  isShowHide: { ...makeBooleanProp(false) }
}

export type DraggableWrapperProps = ExtractPropTypes<typeof draggableWrapperProps>
