import { FaceSmileIcon, HandThumbUpIcon, PaperAirplaneIcon, PaperClipIcon, PhotoIcon } from "@heroicons/react/24/solid"
import { useState } from "react"
import NewMessageInput from "./NewMessageInput"

const MessageInput = () => {
  const [newMessage, setNewMessage] = useState("")
  const [inputErrorMessage, setInputErrorMessage] = useState("")
  const [messageSending, setMessageSending] = useState(false)

  return (
    <>
      <div className="flex sm:flex-nowrap flex-wrap items-start border-t border-gray-700 py-3">
        <div className=" order-2 flex p-2 sm:py-2 sm:px-0  xs:order-1">
          <button className="p-1 text-gray-400 relative dark:hover:text-gray-300 hover:text-gray-600">
            <PaperClipIcon className="w-6 md:w-7" />
            <input
              type="file"
              multiple
              className="absolute left-0 top-0 right-0 bottom-0 z-20 opacity-0 cursor-pointer"
            />
          </button>
          <button className="p-1 text-gray-400 relative dark:hover:text-gray-300 hover:text-gray-600">
            <PhotoIcon className="w-6 md:w-7" />
            <input
              type="file"
              multiple
              accept="image/*"
              className="absolute left-0 top-0 right-0 bottom-0 z-20 opacity-0 cursor-pointer"
            />
          </button>
        </div>
        <div className="order-1 px-3 basis-full flex-1 relative xs:p-0">
          <div className="flex">
            <NewMessageInput
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button className="btn rounded-l-none bg-gray-950">
              {messageSending ? (
                <span className="loading loading-dots loading-md"></span>
              ) : (
                <>
                  <span className="hidden md:block">Envoyer</span>
                  <PaperAirplaneIcon className="w-6" />
                </>
              )}
            </button>
          </div>
          {inputErrorMessage && (
            <p className="text-xs text-red-400">
              {inputErrorMessage}
            </p>
          )}
        </div>
        <div className=" flex justify-end ml-auto order-3 p-2 sm:py-2 sm:px-0 sm:pr-2 xs:order-3">
          <button className="p-1 text-gray-400  hover:text-gray-600 dark:hover:text-gray-300">
            <FaceSmileIcon className="w-6 md:w-7" />
          </button>
          <button className="p-1 text-gray-400  hover:text-gray-600 dark:hover:text-gray-300">
            <HandThumbUpIcon className="w-6 md:w-7" />
          </button>
        </div>
      </div>
    </>
  )
}

export default MessageInput