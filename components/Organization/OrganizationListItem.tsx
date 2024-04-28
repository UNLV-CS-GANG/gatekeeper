'use client'

import { useState } from 'react'
import OrganizationModal from './OrganizationModal'
import classNames from '@/lib/classNames'
import { OrganizationExtended } from '@/types/Organization/OrganizationExtended'

export default function OrganizationListItem({ organization }: { organization: OrganizationExtended }) {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  return (
    <>
      <li
        className={classNames('h-48 cursor-pointer bg-white text-sm', isHovering ? 'drop-shadow-xl' : 'drop-shadow-md')}
        onClick={() => setModalIsOpen(true)}
        key={organization.id}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="grid h-full grid-cols-1 content-between p-4">
          <div>
            <p className="text-lg font-medium text-gray-600">{organization.name}</p>
            <p className="font-medium text-gray-500">Members: {organization.members.length}</p>
          </div>
          <p className="font-medium text-gray-500">{organization.joinCode ? 'Private' : 'Public'}</p>
        </div>
      </li>

      <OrganizationModal organization={organization} isOpen={modalIsOpen} setIsOpen={setModalIsOpen} />
    </>
  )
}
