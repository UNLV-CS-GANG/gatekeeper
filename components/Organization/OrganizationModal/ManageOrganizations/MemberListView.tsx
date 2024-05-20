import UserList from '@/components/Common/Preview/UserList/UserList'
import UserListData from '@/components/Common/Preview/UserList/UserListData'
import UserListRow from '@/components/Common/Preview/UserList/UserListRow'
import getDateTime from '@/lib/getDateTime'
import getName from '@/lib/getName'
import { MemberInfo } from '@/types/Organization/MemberInfo'
import { OrganizationExtended } from '@/types/Organization/OrganizationExtended'
import { OrganizationModalView } from '@/types/Organization/OrganizationModalView'
import { Dispatch, SetStateAction } from 'react'

export default function MemberListView({
  organization,
  members,
  setView,
  onClickMember,
}: {
  organization: OrganizationExtended
  members: MemberInfo[]
  setView: Dispatch<SetStateAction<OrganizationModalView>>
  onClickMember: (member: MemberInfo, index: number) => void
}) {
  return (
    <div className="p-4 sm:px-7 sm:py-6">
      <div className="pb-4">
        <h1 className="text-xl font-medium sm:text-2xl">{organization.name}</h1>
      </div>

      <p className="pb-1 font-medium text-gray-600">{`Member List (${members.length})`}</p>
      <UserList>
        {members.length > 0 &&
          members.map((member, i) => (
            <UserListRow
              onClick={() => {
                onClickMember(member, i)
              }}
              key={i}
            >
              <UserListData isFront={true}>
                <p className="font-medium text-gray-800">{getName(member)}</p>
                <p className="text-gray-700">{member.email}</p>
              </UserListData>
              <UserListData>{getDateTime(new Date(member.joinedAt))}</UserListData>
            </UserListRow>
          ))}
      </UserList>

      <button
        className="mt-8 w-full rounded-lg bg-gray-600 px-5 py-2.5 text-sm font-semibold text-gray-200 shadow-sm transition-colors duration-200 hover:bg-gray-700 hover:text-gray-100"
        onClick={() => setView(OrganizationModalView.INFO)}
      >
        Back
      </button>
    </div>
  )
}
