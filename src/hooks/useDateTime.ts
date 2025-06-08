const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

export function useDateTime() {
  const dateAll = ref('')
  const dateText = ref('')
  const timeAll = ref('')
  function updateTime() {
    const cd = new Date()
    const year = zeroPadding(cd.getFullYear(), 4)
    const month = zeroPadding(cd.getMonth() + 1, 2)
    const date = zeroPadding(cd.getDate(), 2)
    const hours = zeroPadding(cd.getHours(), 2)
    const minutes = zeroPadding(cd.getMinutes(), 2)
    const seconds = zeroPadding(cd.getSeconds(), 2)
    timeAll.value = `${hours}:${minutes}:${seconds}`
    dateAll.value = `${year}:${month}:${date} ${week[cd.getDay()]}`
    dateText.value = `${month}月${date}日 ${week[cd.getDay()]} ${hours}:${minutes}`
  }

  function zeroPadding(num: number, digit: number) {
    let zero = ''
    for (let i = 0; i < digit; i++) {
      zero += '0'
    }
    return (zero + num).slice(-digit)
  }
  return { dateAll, dateText, timeAll, updateTime }
}
