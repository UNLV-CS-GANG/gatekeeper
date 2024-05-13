import { Dispatch, SetStateAction, useState } from 'react'
import Modal from '../../../Common/Modal/Modal'
import { OrganizationExtended } from '@/types/Organization/OrganizationExtended'
import List from '@/components/Common/List/List'
import ListItem from '@/components/Common/List/ListItem'
import { LockClosedIcon } from '@heroicons/react/20/solid'
import getName from '@/lib/getName'
import { User } from '@clerk/nextjs/dist/types/server'
import useLoadData from '@/hooks/useLoadData'

export default function OrganizationModal({
  organization,
  isOpen,
  setIsOpen,
}: {
  organization: OrganizationExtended
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) {
  const [owner, setOwner] = useState<User | null>(null)
  useLoadData((user: User) => setOwner(user), `/api/clerk/user?id=${organization.ownerId}`)

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className="p-4 sm:px-7 sm:py-6">
        <div className="pb-4">
          <div className="flex place-items-center space-x-1.5">
            {organization.joinCode && <LockClosedIcon className="h-5 w-5 text-gray-600" />}
            <h1 className="text-xl font-medium sm:text-2xl">{organization.name}</h1>
          </div>
        </div>

        <List>
          <ListItem label="Members">{`${organization.members.length}/100000`}</ListItem>
          <ListItem label="Owner">{owner ? getName(owner as User) : 'Loading...'}</ListItem>
          <ListItem label="Ongoing Events">{'000'}</ListItem>
          <ListItem label="Upcoming Event">{'Test'}</ListItem>
        </List>

        <button className="w-full rounded-lg bg-gray-600 px-5 py-2.5 text-sm font-semibold text-gray-200 shadow-sm transition-colors duration-200 hover:bg-gray-700 hover:text-gray-100">
          Join Organization
        </button>
      </div>
    </Modal>
  )
}
