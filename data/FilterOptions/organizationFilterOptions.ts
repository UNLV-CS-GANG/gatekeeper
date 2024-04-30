import { FilterOption } from '@/types/FilterOption'
import { BoltIcon, BuildingOffice2Icon, BoltSlashIcon } from '@heroicons/react/24/outline'

export const organizationFilterOptions: FilterOption[] = [
  {
    icon: BuildingOffice2Icon,
    title: 'All',
    noFilter: true,
  },
  {
    icon: BoltIcon,
    title: 'Owned By Me',
    noFilter: false,
  },
  {
    icon: BoltSlashIcon,
    title: 'Not Owned By Me',
    noFilter: false,
  },
]
