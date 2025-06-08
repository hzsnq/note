import colorJson from '@/assets/data/color.json'

const colorList: Color[] = colorJson.reduce((prev, cur) => {
  return [...prev, ...cur]
}, [])

// console.log(colorList)

/**
 * useColors 钩子函数，用于管理颜色相关的数据和操作
 * @returns {Object} 包含颜色数据和获取随机颜色的方法
 */
export function useColors() {
  /**
   * 获取随机颜色的函数
   * @returns {Color} 从颜色列表中随机选择的一个颜色对象
   */
  function getRandomColor() {
    // 生成一个随机索引，范围是颜色列表的长度
    const randomIndex = Math.floor(Math.random() * colorList.length)
    // 返回颜色列表中对应索引的颜色对象
    return colorList[randomIndex]
  }

  // 返回包含颜色数据和获取随机颜色方法的对象
  return { colorJson, colorList, getRandomColor }
}
