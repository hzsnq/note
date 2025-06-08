import type { InjectionKey, Ref } from 'vue'

interface Note {
  noteData: Ref<AnyObj[]>
  menuIndex: Ref<any>
  subMenuIndex: Ref<any>
  toTop: (value: number) => void
}

/**
 * @description Popup InjectionKey Symbol
 */
export const NoteKey: InjectionKey<Note> = Symbol('note')
