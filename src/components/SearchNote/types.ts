import type { ExtractPropTypes, PropType } from 'vue'

export const makeStringProp = <T>(defaultVal: T) => ({
  type: String as unknown as PropType<T>,
  default: defaultVal
})

export const searchNoteProps = {
  text: makeStringProp(''),
  name: makeStringProp('')
}

export type ButtonProps = ExtractPropTypes<typeof searchNoteProps>
