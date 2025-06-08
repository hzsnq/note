import mitt, { type Emitter } from 'mitt'
enum HandlerProgram {
  UpdateProgram = 'UpdateProgram'
}
type Events = {
  [key in HandlerProgram]: any
} & {
  update: (item: DefaultConfig) => void
}
const emitter: Emitter<Events> = mitt<Events>()

emitter.on(HandlerProgram.UpdateProgram, function updateApp(item: DefaultConfig) {
  console.log('🚀 ~ emitter.on ~ UpdateProgram: 开始执行', item)
})
export { emitter, HandlerProgram }
