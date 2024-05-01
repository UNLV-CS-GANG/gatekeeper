import { FilterOption } from '@/types/FilterOption'
import { EventFilterQuery } from '@/types/enums/EventFilterQuery'
import { BoltIcon, NewspaperIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline'

export const eventFilterOptions: FilterOption[] = [
  {
    icon: NewspaperIcon,
    title: 'All',
    query: EventFilterQuery.ALL,
    noFilter: true,
  },
  {
    icon: ClockIcon,
    title: 'Upcoming',
    query: EventFilterQuery.UPCOMING,
    noFilter: false,
  },
  {
    icon: BoltIcon,
    title: 'Active',
    query: EventFilterQuery.ACTIVE,
    noFilter: false,
  },
  {
    icon: CheckCircleIcon,
    title: 'Complete',
    query: EventFilterQuery.COMPLETE,
    noFilter: false,
  },
]
