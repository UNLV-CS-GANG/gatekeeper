import ModalFooter from '@/components/Common/Modal/ModalFooter'
import Loader from '@/components/State/Loader'
import getDateTime from '@/lib/getDateTime'
import getName from '@/lib/getName'
import { MemberInfo } from '@/types/Organization/MemberInfo'
import { OrganizationExtended } from '@/types/Organization/OrganizationExtended'
import { OrganizationModalView } from '@/types/Organization/OrganizationModalView'
import { Dispatch, SetStateAction } from 'react'

export default function MemberView({
  organization,
  member,
  setView,
  isLoading,
  setIsLoading,
  onDelete,
}: {
  organization: OrganizationExtended
  member: MemberInfo | undefined
  setView: Dispatch<SetStateAction<OrganizationModalView>>
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
  onDelete: () => void
}) {
  async function deleteMember() {
    try {
      setIsLoading(true)

      if (member) {
        const { status } = await fetch(`/api/member?id=${member.id}`, {
          method: 'DELETE',
        })
        console.log('delete status:', status)

        // const emailRes = await fetch(`/api/email?to=${member.email}&template=invite-revoked`, {
        //   method: 'POST',
        //   body: JSON.stringify({
        //     title: event.title,
        //     username: getName(guest),
        //   } as InviteRevokedProps),
        // })

        onDelete()
        setView(OrganizationModalView.INFO)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="p-4 sm:px-7 sm:py-6">
        <div className="pb-8">
          <h1 className="text-xl font-medium sm:text-2xl">{getName(member as MemberInfo)}</h1>
          <p className="text-sm text-gray-500 sm:text-base">
            {member?.joinedAt ? `Ticket scanned ${getDateTime(new Date(member.joinedAt))}` : 'Ticket not yet scanned'}
          </p>
        </div>
        <ul className="flex flex-col space-y-2 sm:space-y-0">
          <li className="sm:flex">
            <p className="w-1/5 text-sm font-semibold uppercase text-gray-500">Email</p>
            <p className="w-4/5 text-gray-800">{member?.email}</p>
          </li>
          <li className="sm:flex">
            <p className="w-1/5 text-sm font-semibold uppercase text-gray-500">Joined</p>
            <p className="w-4/5 text-gray-800">{getDateTime(new Date(member?.joinedAt as Date))}</p>
          </li>
        </ul>
      </div>

      <ModalFooter>
        <div className="flex h-full place-items-center justify-between px-3">
          <button
            className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-colors duration-200 hover:bg-slate-200 hover:text-gray-800"
            onClick={() => setView(OrganizationModalView.INFO)}
          >
            Back
          </button>
          <button
            className="rounded-lg bg-gray-600 px-5 py-2.5 text-sm font-semibold text-gray-200 shadow-sm transition-colors duration-200 hover:bg-gray-700 hover:text-gray-100 disabled:opacity-50 hover:disabled:bg-gray-600 hover:disabled:text-gray-200"
            onClick={deleteMember}
            disabled={organization.ownerId == member?.userId}
          >
            Remove Member
          </button>
        </div>
      </ModalFooter>

      <Loader isLoading={isLoading} text="Revoking invite" />
    </>
  )
}
