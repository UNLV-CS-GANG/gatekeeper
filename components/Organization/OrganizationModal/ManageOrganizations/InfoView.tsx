import InfoList from '@/components/Common/Preview/InfoList/InfoList'
import InfoListItem from '@/components/Common/Preview/InfoList/InfoListItem'
import ToggleVisibility from '@/components/Common/Preview/InfoList/ToggleVisibility'
import ModalFooter from '@/components/Common/Modal/ModalFooter'
import getName from '@/lib/getName'
import { OrganizationExtended } from '@/types/Organization/OrganizationExtended'
import { OrganizationModalView } from '@/types/Organization/OrganizationModalView'
import { User } from '@clerk/nextjs/dist/types/server'
import { LockClosedIcon, UserIcon } from '@heroicons/react/20/solid'
import { Dispatch, SetStateAction } from 'react'

export default function InfoView({
  organization,
  owner,
  setView,
}: {
  organization: OrganizationExtended
  owner: User | null
  setView: Dispatch<SetStateAction<OrganizationModalView>>
}) {
  return (
    <>
      <div className="p-4 sm:px-7 sm:py-6">
        <div className="pb-4">
          <div className="flex place-items-center space-x-1.5">
            {organization.joinCode && <LockClosedIcon className="h-5 w-5 text-gray-600" />}
            <h1 className="text-xl font-medium sm:text-2xl">{organization.name}</h1>
          </div>
        </div>

        <InfoList>
          <InfoListItem label="Members">{`${organization.members.length}/100000`}</InfoListItem>
          <InfoListItem label="Owner">{owner ? getName(owner as User) : 'Loading...'}</InfoListItem>
          <InfoListItem label="Link Code">
            <ToggleVisibility data={organization.linkCode} />
          </InfoListItem>
          <InfoListItem label="Join Code">
            <ToggleVisibility data={organization.joinCode ?? 'N/A'} />
          </InfoListItem>
          <InfoListItem label="Ongoing Events">{'000'}</InfoListItem>
          <InfoListItem label="Upcoming Event">{'Test'}</InfoListItem>
        </InfoList>
      </div>
      <ModalFooter>
        <div className="flex h-full place-items-center justify-between px-3">
          <div className="flex space-x-2.5">
            <button
              className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-colors duration-200 hover:bg-slate-200 hover:text-gray-800"
              // onClick={() => setView(OrganizationModalView.DELETE)}
            >
              Delete
            </button>
            <button
              className="rounded-lg bg-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-colors duration-200 hover:bg-gray-400 hover:text-gray-800 disabled:pointer-events-none disabled:opacity-40"
              // onClick={() => setView(OrganizationModalView.EDIT)}
            >
              Edit
            </button>
          </div>
          <button
            className="rounded-lg bg-gray-600 px-5 py-2.5 text-sm font-semibold text-gray-200 shadow-sm transition-colors duration-200 hover:bg-gray-700 hover:text-gray-100"
            onClick={() => setView(OrganizationModalView.MEMBER_LIST)}
          >
            <div className="flex space-x-2">
              <p>Member List</p>
              <div className="flex place-items-center space-x-0.5">
                <UserIcon className="h-5 w-4" />
                <p>{organization.members.length}</p>
              </div>
            </div>
          </button>
        </div>
      </ModalFooter>
    </>
  )
}
