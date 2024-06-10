import UsersIcon from "./UsersIcon"

const GroupAvatar = () => {
  return (
    <>
      <div className="avatar placeholder">
        <div className="bg-gray-800 text-gray-400 rounded-full w-8">
          <span className="text-xl">
            <UsersIcon className='w-4' />
          </span>
        </div>
      </div>
    </>
  )
}

export default GroupAvatar