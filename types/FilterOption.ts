import { EventFilterQuery } from './Event/EventFilterQuery'
import { OrganizationFilterQuery } from './Organization/OrganizationFilterQuery'

/* eslint-disable @typescript-eslint/no-explicit-any */
export type FilterOption = {
  icon: any
  title: string
  query: EventFilterQuery | OrganizationFilterQuery
  noFilter: boolean
}
