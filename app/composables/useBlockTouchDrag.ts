import type { Node } from '@tiptap/pm/model'
import type { Editor } from '@tiptap/vue-3'

const moveBlock = (editor: Editor, from: number, to: number) => {
  const { state, view } = editor
  const blocks: Node[] = []
  state.doc.forEach((node) => blocks.push(node))
  const [block] = blocks.splice(from, 1)
  blocks.splice(to, 0, block)
  view.dispatch(state.tr.replaceWith(0, state.doc.content.size, blocks))
}

export const useBlockTouchDrag = (editor: Editor) => {
  const start = (event: PointerEvent) => {
    const handle = event.currentTarget as HTMLElement
    const from = editor.state.selection.$from.index(0)
    const { left } = editor.view.dom.getBoundingClientRect()
    let to = from

    const move = (moveEvent: PointerEvent) => {
      const found = editor.view.posAtCoords({ left: left + 1, top: moveEvent.clientY })
      if (found) to = editor.state.doc.resolve(found.pos).index(0)
    }

    const end = () => {
      handle.removeEventListener('pointermove', move)
      if (to !== from) moveBlock(editor, from, to)
    }

    handle.setPointerCapture(event.pointerId)
    handle.addEventListener('pointermove', move)
    handle.addEventListener('pointerup', end, { once: true })
    handle.addEventListener('pointercancel', end, { once: true })
  }

  return { start }
}
