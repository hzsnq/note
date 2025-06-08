import type { InjectionKey } from 'vue'

/**
 * @description:  处理inject注入属性 undefined 问题
 */
export function injectStrict<T>(key: InjectionKey<T>, fallback?: T) {
  const resolved = inject(key, fallback)
  if (!resolved) {
    throw new Error(`Could not resolve ${key.description}`)
  }
  return resolved
}
