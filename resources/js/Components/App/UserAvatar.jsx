
const UserAvatar = ({ online = null, user, profile = false }) => {
  const onlineClass = online === true ? "online" : online === false ? "offline" : ""
  const sizeClass = profile ? "w-40" : "w-8"

  return (
    <>
      {user.avatar_url && (
        <div className={`chat-image avatar ${onlineClass}`}>
          <div className={`rounded-full ${sizeClass}`}>
            <img src={user.avatar_url} />
          </div>
        </div>
      )}
      {!user.avatar_url && (
        <div className={`chat-image avatar placeholder ${onlineClass}`}>
          <div className={`bg-gray-600 text-gray-300 rounded-full ${sizeClass}`}>
            <span className="text-xl">
              {user.name.substring(0, 1)}
            </span>
          </div>
        </div>
      )}
    </>
  )
}

export default UserAvatar