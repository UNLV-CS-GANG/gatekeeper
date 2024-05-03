import { EventFilterQuery } from './enums/EventFilterQuery'
import { OrganizationFilterQuery } from './enums/OrganizationFilterQuery'

/* eslint-disable @typescript-eslint/no-explicit-any */
export type FilterOption = {
  icon: any
  title: string
  query: EventFilterQuery | OrganizationFilterQuery
  noFilter: boolean
}
