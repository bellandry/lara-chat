import { useEffect, useRef } from 'react'

const NewMessageInput = ({ value, onChange, onSend = null }) => {
  const input = useRef()

  const onInputKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.prevent.default()
      onSend()
    }
  }

  const onChangeEvent = (e) => {
    setTimeout(() => {
      adjustHeight()
    }, 100)
    onChange(e)
  }

  const adjustHeight = () => {
    setTimeout(() => {
      input.current.style.height = "auto"
      input.current.style.height = input.current.scrollHeight + 1 + "px"
    }, 200)
  }

  useEffect(() => {
    adjustHeight()
  }, [value])

  return (
    <textarea
      ref={input}
      value={value}
      rows="1"
      placeholder="Ecrivez votre message"
      onKeyDown={onInputKeyDown}
      onChange={(e) => onChangeEvent(e)}
      className="input input-bordered w-full rounded-r-none resize-none overflow-y-auto max-h-36"
    >
    </textarea>
  )
}

export default NewMessageInput