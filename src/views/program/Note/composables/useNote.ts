import note from '@/assets/data/github-note.json'

const noteData = ref<AnyObj[]>([])
const menuIndex = ref('0')
const subMenuIndex = ref('0')

export function useNote() {
  function init() {
    const data = Object.entries(note)
    const length = data.length
    for (let i = 0; i < length; i++) {
      const obj: AnyObj = {}
      obj.menuName = data[i][0]
      const subMenu: AnyObj[] = data[i][1]
      for (let j = 0; j < subMenu.length; j++) {
        const searchItem: AnyObj = {
          menuIndex: String(i),
          subMenuIndex: undefined
        }
        // subMenu[j].color = colorJson[randomNum(24)][randomNum(16)]
        searchItem.subMenuIndex = String(j)
        Object.assign(searchItem, subMenu[j])
        // searchData.value.push(searchItem)
      }
      obj.subMenu = subMenu
      noteData.value.push(obj)
    }
  }
  return { noteData, menuIndex, subMenuIndex, init }
}
