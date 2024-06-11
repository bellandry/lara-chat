import ConversationItem from '@/Components/App/ConversationItem'
import PencilSquareIcon from '@/Components/App/PencilSquareIcon'
import TextInput from '@/Components/TextInput'
import { usePage } from '@inertiajs/react'
import { useEffect, useState } from 'react'

const ChatLayout = ({ children }) => {
  const page = usePage()
  const conversations = page.props.conversations
  const selectedConversation = page.props.selectedConversation
  const [localConversations, setLocalConversations] = useState([])
  const [sortedConversations, setSortedConversations] = useState([])
  const [onlineUsers, setOnlineUsers] = useState({})

  const isUserOnline = (userId) => onlineUsers[userId]

  useEffect(() => {
    setSortedConversations(
      localConversations.sort((a, b) => {
        if (a.blocked_at && b.blocked_at) {
          return a.blocked_at > b.blocked_at ? 1 : -1
        } else if (a.blocked_at) {
          return 1
        } else if (b.blocked_at) {
          return -1
        }
        if (a.last_message_date && b.last_message_date) {
          return b.last_message_date.localeCompare(
            a.last_message_date
          )
        } else if (a.last_message_date) {
          rerurn - 1
        } else if (b.last_message_date) {
          return 1
        } else {
          return 0
        }
      })
    )
  }, [localConversations])

  useEffect(() => {
    setLocalConversations(conversations)
  }, [conversations])

  useEffect(() => {
    Echo.join('online')
      .here((users) => {
        const onlineUsersObject = Object.fromEntries(
          users.map((user) => [user.id, user])
        )

        setOnlineUsers((prev) => {
          return { ...prev, ...onlineUsersObject }
        })
      })
      .joining((user) => {
        setOnlineUsers((prev) => {
          const updatedUsers = { ...prev }
          updatedUsers[user.id] = user
          return updatedUsers
        })
      })
      .leaving((user) => {
        setOnlineUsers((prev) => {
          const updatedUsers = { ...prev }
          delete updatedUsers[user.id]
          return updatedUsers
        })
      })
      .error((error) => {
        console.log('error', error)
      })

    return () => {
      Echo.leave('online')
    }
  }, [])

  const onSearch = (e) => {
    const search = e.target.value.toLowerCase()
    setLocalConversations(
      conversations.filter((conversations) => {
        return (
          conversations.name.toLowerCase().includes(search)
        )
      })
    )
  }

  return (
    <>
      <div className='flex-1 w-full flex h-full overflow-hidden'>
        <div
          className={`transition-all w-full h-full sm:w-[220px] md:w-[300px] dark:text-gray-300 dark:bg-gray-950 bg-gray-400 flex flex-col
          ${selectedConversation ? "-ml-[100%] sm:ml-0" : ""}`}
        >
          <div className='flex items-center justify-between py-2 px-3 text-xl font-medium'>
            Mes conversations
            <div
              className='tooltip tooltip-left'
              data-tip="Créer un groupe"
            >
              <button className='text-gray-700 dark:text-gray-400 hover:text-gray-500'>
                <PencilSquareIcon className='w-4 h-4 inline-block ml-2' />
              </button>
            </div>
          </div>
          <div className='p-3'>
            <TextInput
              onKeyPress={onSearch}
              placeholder='Recherchez un utilisateur ou un groupe'
              className='w-full text-sm'
            />
          </div>
          <div className="flex-1 overflow-y-auto">
            {sortedConversations && sortedConversations.map((conversation) => (
              <ConversationItem
                key={`${conversation.is_group ? 'group_' : 'user_'}${conversation.id}`}
                conversation={conversation}
                online={!!isUserOnline(conversation.id)}
                selectedConversation={selectedConversation}
              />
            ))
            }
          </div>
        </div>
        <div className="flex-1 h-full flex-col">
          {children}
        </div>
      </div>
    </>
  )
}

export default ChatLayout