import { Menu, Transition } from "@headlessui/react"
import { EllipsisVerticalIcon, LockClosedIcon, LockOpenIcon, ShieldCheckIcon, UserIcon } from '@heroicons/react/24/solid'
import axios from "axios"
import { Fragment } from "react"

const UserOptionsDropdown = ({ conversation }) => {

  const onBlockUser = () => {
    if (!conversation.is_user) {
      return
    }
    axios.post(route(user.blockUnblock), conversation.id)
      .then((res) => {
        console.log(err)
      })
      .catch((err) => {
        console.log(err)
      });
  }
  const changeUserRole = () => {
    if (conversation.is_user) {
      return
    }
    axios.post(route('user.changeRole', conversation.id))
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex justify-center items-center w-8 h-8 rounded-full hover:bg-gray-950/75">
          <EllipsisVerticalIcon className="w-5 h-5" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-75"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-600 rounded-md bg-white dark:bg-gray-900 shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="p-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={onBlockUser}
                  className={`${active ? "bg-gray-950/60 text-gray-300" : "text-gray-500"} group flex w-full items-center gap-2 rounded-lg py-2 px-2 text-sm data-[focus]:bg-white/10`}>
                  {conversation.blocked_at && (
                    <>
                      <LockOpenIcon className="w-4 h-4 mr-2" />
                      Débloquer
                    </>
                  )}
                  {!conversation.blocked_at && (
                    <>
                      <LockClosedIcon className="w-4 h-4 mr-2" />
                      Bloquer
                    </>
                  )}
                </button>
              )}
            </Menu.Item>
          </div>
          <div className="p-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={changeUserRole}
                  className={`${active ? "bg-gray-950/60 text-gray-300" : "text-gray-500"} group flex w-full items-center gap-2 rounded-lg py-2 px-2 text-sm data-[focus]:bg-white/10`}>
                  {conversation.is_admin && (
                    <>
                      <UserIcon className="w-4 h-4 mr-2" />
                      Retirer admin
                    </>
                  )}
                  {!conversation.blocked_at && (
                    <>
                      <ShieldCheckIcon className="w-4 h-4 mr-2" />
                      Nommer admin
                    </>
                  )}
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default UserOptionsDropdown