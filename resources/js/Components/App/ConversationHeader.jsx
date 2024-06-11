import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import { Link } from "@inertiajs/react"
import GroupAvatar from "./GroupAvatar"
import UserAvatar from "./UserAvatar"

const ConversationHeader = ({ selectedConversation, online = null }) => {
  return (
    <>
      {selectedConversation && (
        <div className="p-3 flex justify-between items-center border-b border-gray-600">
          <div className="flex items-center gap-3">
            <Link
              href={route("dashboard")}
              className="inline-block sm:hidden"
            >
              <ArrowLeftIcon className="w-6 h-6 text-gray-200" />

            </Link>
            {selectedConversation.is_user && (
              <UserAvatar user={selectedConversation} online={online} />
            )}
            {selectedConversation.is_group && <GroupAvatar />}
            <div>
              <h3>{selectedConversation.name}</h3>
              {selectedConversation.is_group && (
                <p className="text-xs text-gray-300">
                  {selectedConversation.users.length} membres
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ConversationHeader