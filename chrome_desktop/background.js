/* eslint-disable no-undef */
chrome.action.onClicked.addListener(() => {
  // 使用 chrome.runtime.getURL 获取插件内部页面的URL
  const internalPageUrl = chrome.runtime.getURL('./dist/index.html')

  // 在新标签页中打开插件页面
  chrome.tabs.create({ url: internalPageUrl })
})
