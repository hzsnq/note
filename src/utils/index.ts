/**
 * JSONP 请求函数
 * @param {String} url - 请求的 URL
 * @param {Object} params - 请求参数
 * @param {String} callbackName - JSONP 回调函数名
 * @returns {Promise} - 返回 Axios 的 Promise 对象
 */
export function jsonp(url: string, params: any = {}, callbackName = 'callback') {
  // 构建查询字符串
  const queryString = Object.keys(params)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&')

  // 拼接完整的 URL
  const jsonpUrl = `${url}?${queryString}&${callbackName}=__jsonpCallback`
  const window1: any = window

  // 创建一个新的 script 元素
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = jsonpUrl

    // 定义回调函数
    window1['__jsonpCallback'] = (data: any) => {
      resolve(data) // 成功时返回数据
      document.body.removeChild(script) // 请求完成后移除 script 标签
      delete window1['__jsonpCallback'] // 清理全局回调
    }

    // script.onload = function () {
    //     console.log(arguments);
    // }

    script.onerror = () => {
      reject(new Error('JSONP请求失败')) // 处理请求错误
      document.body.removeChild(script) // 移除 script 标签
      delete window1['__jsonpCallback'] // 清理全局回调
    }
    document.body.appendChild(script) // 将 script 标签插入文档
  })
}

/**
 * 深度合并多个对象
 * @param target - 目标对象
 * @param sources - 源对象数组
 * @returns 合并后的目标对象
 */
export function deepMerge<T extends object>(target: T, ...sources: T[]): T {
  for (const source of sources) {
    if (source === undefined || source === null) {
      continue // 跳过未定义或空值
    }
    for (const [key, value] of Object.entries(source) as [keyof T, T[keyof T]][]) {
      if (value instanceof Object) {
        if (target[key] === undefined) {
          target[key] = Array.isArray(value) ? ([] as any) : ({} as any)
        }
        deepMerge(target[key] as any, value) // 递归合并内嵌的对象
      } else {
        target[key] = value // 基本类型直接赋值
      }
    }
  }
  return target
}

type DataType =
  | 'Number'
  | 'String'
  | 'Boolean'
  | 'Object'
  | 'Function'
  | 'Null'
  | 'Undefined'
  | 'Symbol'
  | 'BigInt'
  | 'Array'
  | 'Date'
  | 'RegExp'

/**
 * 通用且精确的类型判断
 * @param value 需要判断的值
 * @param expectedType 预期的类型
 * @returns 如果值符合预期类型则返回 true，否则返回 false
 */
const isType = (value: unknown, expectedType: DataType) => {
  const GET_TYPE = Object.prototype.toString

  const typeTag = `[object ${expectedType}]`

  return GET_TYPE.call(value) === typeTag
}

/**
 * 判断是否为 null
 * @param value 需要判断的值
 * @returns 如果 value 是 Null，则返回 true，否则返回 false
 */
export const isNull = (value: unknown) => {
  return isType(value, 'Null')
}

/**
 * 下载文件
 * @param fileUrl 文件URL
 * @param fileName 文件名称
 */
export const downloadFile = (fileUrl: string, fileName: string) => {
  const a = document.createElement('a')
  a.href = fileUrl
  a.download = fileName
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
