import UsersIcon from "./UsersIcon"

const GroupAvatar = () => {
  return (
    <>
      <div className="avatar placeholder">
        <div className="bg-gray-600 text-gray-300 rounded-full w-8">
          <span className="text-xl">
            <UsersIcon className='w-4' />
          </span>
        </div>
      </div>
    </>
  )
}

export default GroupAvatar