import { FilterOption } from '@/types/FilterOption'
import { OrganizationFilterQuery } from '@/types/enums/OrganizationFilterQuery'
import { BoltIcon, BuildingOffice2Icon, BoltSlashIcon } from '@heroicons/react/24/outline'

export const organizationFilterOptions: FilterOption[] = [
  {
    icon: BuildingOffice2Icon,
    title: 'All',
    query: OrganizationFilterQuery.ALL,
    noFilter: true,
  },
  {
    icon: BoltIcon,
    title: 'Owned By Me',
    query: OrganizationFilterQuery.OWNED_BY_ME,
    noFilter: false,
  },
  {
    icon: BoltSlashIcon,
    title: 'Not Owned By Me',
    query: OrganizationFilterQuery.NOT_OWNED_BY_ME,
    noFilter: false,
  },
]
