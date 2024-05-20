import { Dispatch, SetStateAction, useState } from 'react'
import Modal from '../../../Common/Modal/Modal'
import { OrganizationModalView } from '@/types/Organization/OrganizationModalView'
import InfoView from './InfoView'
import { OrganizationExtended } from '@/types/Organization/OrganizationExtended'
import MemberListView from './MemberListView'
import { User } from '@clerk/nextjs/dist/types/server'
import useLoadData from '@/hooks/useLoadData'
import { MemberInfo } from '@/types/Organization/MemberInfo'
import MemberView from './MemberView'

export default function OrganizationModal({
  organization,
  isOpen,
  setIsOpen,
}: {
  organization: OrganizationExtended
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) {
  const [view, setView] = useState<OrganizationModalView>(OrganizationModalView.INFO)
  const [owner, setOwner] = useState<User | null>(null)
  const [members, setMembers] = useState<MemberInfo[]>([])
  const [focusMember, setFocusMember] = useState<{ member: MemberInfo; index: number }>()
  const [isLoading, setIsLoading] = useState(false)

  useLoadData((user: User) => setOwner(user), `/api/clerk/user?id=${organization.ownerId}`)
  useLoadData((data) => setMembers(data), `/api/clerk/user?organizationId=${organization.id}`)

  function removeMemberInClient() {
    const tempMembers = [...members]
    tempMembers.splice(focusMember?.index as number, 1)
    setMembers(tempMembers)
  }

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      {view === OrganizationModalView.INFO && <InfoView organization={organization} owner={owner} setView={setView} />}
      {view === OrganizationModalView.MEMBER_LIST && (
        <MemberListView
          organization={organization}
          members={members}
          setView={setView}
          onClickMember={(member: MemberInfo, index: number) => {
            setFocusMember({ member, index })
            setView(OrganizationModalView.MEMBER)
          }}
        />
      )}
      {view === OrganizationModalView.MEMBER && (
        <MemberView
          organization={organization}
          member={focusMember?.member}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          onDelete={removeMemberInClient}
          setView={setView}
        />
      )}
    </Modal>
  )
}
