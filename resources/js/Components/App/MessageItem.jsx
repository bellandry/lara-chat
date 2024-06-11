import { usePage } from "@inertiajs/react"
import ReactMarkdown from "react-markdown"
import UserAvatar from "./UserAvatar"
import { formatDateBubble } from "./helpers/format-date"

const MessageItem = ({ message }) => {
  const currentUser = usePage().props.auth.user

  return (
    <div
      className={`chat pt-2 ${message.sender_id === currentUser.id ? "chat-end" : "chat-start"}`}
    >
      {<UserAvatar user={message.sender} />}

      <div className="chat-header py-2">
        <p className="font-semibold">
          {message.sender_id !== currentUser.id && message.sender.name}
          <span className="text-xs opacity-80 p-1 ml-3">
            {formatDateBubble(message.created_at)}
          </span>
        </p>
      </div>
      <div
        className={`chat-bubble max-w-3xl relative ${message.sender_id === currentUser.id && "bg-blue-700/50 dark:bg-gray-950 dark:text-gray-300 text-gray-800"}`}
      >
        <div className="chat-message">
          <div className="chat-message-content">
            <ReactMarkdown>{message.message}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageItem