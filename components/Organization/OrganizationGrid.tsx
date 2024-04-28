import OrganizationListItem from './OrganizationListItem'
import { OrganizationExtended } from '@/types/Organization/OrganizationExtended'
import OrganizationListItemLoading from './OrganizationListItemLoading'
import NoData from '../State/NoData'

export default function OrganizationGrid({
  organizations,
  isLoadingOrganizations,
  itemsToDisplay,
}: {
  organizations: OrganizationExtended[]
  isLoadingOrganizations: boolean
  itemsToDisplay: number
}) {
  return (
    <ul className="sm:gap-5 lg:grid lg:grid-cols-2 xl:grid-cols-3">
      {isLoadingOrganizations &&
        new Array(itemsToDisplay).fill(0).map((_: number, i: number) => <OrganizationListItemLoading key={i} />)}

      {!isLoadingOrganizations &&
        organizations.length > 0 &&
        organizations.map((org: OrganizationExtended, i: number) => (
          <OrganizationListItem key={i} organization={org} />
        ))}

      {!isLoadingOrganizations && organizations.length === 0 && (
        <li className="flex h-48 place-items-center justify-center bg-white drop-shadow-md">
          <NoData />
        </li>
      )}
    </ul>
  )
}
