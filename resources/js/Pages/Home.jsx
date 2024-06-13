import ConversationHeader from '@/Components/App/ConversationHeader';
import MessageInput from '@/Components/App/MessageInput';
import MessageItem from '@/Components/App/MessageItem';
import { UserEventBus } from '@/EventBus';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import ChatLayout from '@/Layouts/ChatLayout';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';

function Home({ messages, selectedConversation }) {
    const [localMessages, setLocalMessages] = useState([])
    const [noMoreMessages, setNoMoreMessages] = useState(false)
    const [scrollFromBottom, setScrollFromBottom] = useState(0)
    const messagesCtrRef = useRef(null)
    const loadMoreIntersect = useRef(null)
    const { on } = UserEventBus()

    const loadMoreMessages = useCallback(() => {
        if (noMoreMessages) return

        const firstMessage = localMessages[0]
        axios.get(route('message.loadOlder', firstMessage.id))
            .then(({ data }) => {
                if (data.data.length === 0) {
                    setNoMoreMessages(true)
                    return
                }
                const scrollHeight = messagesCtrRef.current.scrollHeight
                const scrollTop = messagesCtrRef.current.scrollTop
                const clientHeight = messagesCtrRef.current.clientHeight
                const tmpScrollFromBottom = scrollTop - scrollHeight - clientHeight
                setScrollFromBottom(tmpScrollFromBottom)

                setLocalMessages((prevMessages) => {
                    return [...data.data.reverse(), ...prevMessages]
                })
            })
    }, [localMessages])

    const messageCreated = (message) => {
        if (selectedConversation
            && selectedConversation.is_group &&
            selectedConversation.id == message.group_id
        ) {
            setLocalMessages((prevMessages) => [...prevMessages, message])
        }

        if (selectedConversation &&
            selectedConversation.is_user &&
            (selectedConversation.id == message.sender_id || selectedConversation.id == message.reciever_id)
        ) {
            setLocalMessages((prevMessages) => [...prevMessages, message])
        }
    }

    useEffect(() => {
        setTimeout(() => {
            if (messagesCtrRef.current) {
                messagesCtrRef.current.scrollTop = messagesCtrRef.current.scrollHeight
            }
        }, 100)

        const offCreated = on('message.created', messageCreated)

        return () => {
            offCreated()
        }
    }, [selectedConversation])

    useEffect(() => {
        setLocalMessages(messages ? messages.data.reverse() : [])
    }, [messages])

    useEffect(() => {
        if (messagesCtrRef.current && scrollFromBottom != null) {
            messagesCtrRef.current.scrollTop = messagesCtrRef.current.scrollHeight - messagesCtrRef.current.offsetHeight - scrollFromBottom
        }

        if (noMoreMessages) return

        const observer = new IntersectionObserver(
            (entries) =>
                entries.forEach(
                    (entry) => entry.isIntersecting && loadMoreMessages()
                ),
            {
                rootMargin: "0px 0px 250px 0px"
            }
        )

        if (loadMoreIntersect.current) {
            setTimeout(() => {
                observer.observe(loadMoreIntersect.current)
            }, 100)
        }

        return () => {
            observer.disconnect()
        }
    }, [localMessages])

    return (
        <div className='h-[calc(100%-11rem)] sm:h-[calc(100%-8rem)]'>
            {!messages && (
                <div className="flex flex-col gap-6 justify-center items-center text-center h-full">
                    <div className='text-xl md:text-2xl p-16 text-slate-700 dark:text-gray-400'>
                        Sélectionnez une conversation pour voir les messages
                    </div>
                    <ChatBubbleLeftRightIcon className="opacity-50 inline-block w-32 h-32" />
                </div>
            )}
            {messages && (
                <>
                    <ConversationHeader
                        selectedConversation={selectedConversation}
                    />
                    <div ref={messagesCtrRef} className="flex-1 h-full overflow-y-auto p-5 transition-all">
                        {localMessages.length === 0 && (
                            <div className="flex justify-center items-center h-full">
                                <div className="flex flex-col gap-6 text-lg text-gray-4OO">
                                    Aucun Message
                                    <ChatBubbleLeftRightIcon className="opacity-50 inline-block w-32 h-32" />
                                </div>
                            </div>
                        )}
                        {localMessages.length > 0 && (
                            <div className="flex-1 flex-col">
                                <div ref={loadMoreIntersect}></div>
                                {localMessages.map((message,) => (
                                    <MessageItem
                                        key={message.id}
                                        message={message}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                    <MessageInput conversation={selectedConversation} />
                </>
            )}
        </div>
    );
}

Home.layout = (page) => {
    return (
        <Authenticated user={page.props.auth.user} >
            <ChatLayout children={page} />
        </Authenticated>
    )
}

export default Home