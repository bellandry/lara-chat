import ConversationHeader from '@/Components/App/ConversationHeader';
import MessageInput from '@/Components/App/MessageInput';
import MessageItem from '@/Components/App/MessageItem';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import ChatLayout from '@/Layouts/ChatLayout';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';
import { useEffect, useRef, useState } from 'react';

function Home({ messages, selectedConversation }) {
    const [localMessages, setLocalMessages] = useState([])
    const messagesCtrRef = useRef(null)

    useEffect(() => {
        setTimeout(() => {
            if (messagesCtrRef.current) {
                messagesCtrRef.current.scrollTop = messagesCtrRef.current.scrollHeight
            }
        }, 300)
    }, [selectedConversation])

    useEffect(() => {
        setLocalMessages(messages ? messages.data.reverse() : [])
    }, [messages])

    return (
        <>
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
                    <div ref={messagesCtrRef} className="flex-1 h-[calc(100%-11rem)] overflow-y-auto p-5 transition-all">
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
                                {localMessages.map((message) => (
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
        </>
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