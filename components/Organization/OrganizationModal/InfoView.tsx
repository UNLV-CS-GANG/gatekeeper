import List from '@/components/Common/List/List'
import ListItem from '@/components/Common/List/ListItem'
import { OrganizationExtended } from '@/types/Organization/OrganizationExtended'
import { OrganizationModalView } from '@/types/Organization/OrganizationModalView'
import { Dispatch, SetStateAction } from 'react'

export default function InfoView({
  organization,
  setView,
}: {
  organization: OrganizationExtended
  setView: Dispatch<SetStateAction<OrganizationModalView>>
}) {
  return (
    <>
      <div className="p-4 sm:px-7 sm:py-6">
        <div className="pb-4">
          <h1 className="text-xl font-medium sm:text-2xl">{organization.name}</h1>
        </div>
      </div>

      <List>
        <ListItem label="Members">{`${organization.members.length}/100000`}</ListItem>
        <ListItem label="Owner">{'temp'}</ListItem>
      </List>
    </>
  )
}
