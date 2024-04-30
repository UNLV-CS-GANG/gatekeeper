import { FilterOption } from '@/types/FilterOption'
import { BoltIcon, BriefcaseIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline'

export const eventFilterOptions: FilterOption[] = [
  {
    icon: BriefcaseIcon,
    title: 'All',
    noFilter: true,
  },
  {
    icon: ClockIcon,
    title: 'Upcoming',
    noFilter: false,
  },
  {
    icon: BoltIcon,
    title: 'Active',
    noFilter: false,
  },
  {
    icon: CheckCircleIcon,
    title: 'Complete',
    noFilter: false,
  },
]
