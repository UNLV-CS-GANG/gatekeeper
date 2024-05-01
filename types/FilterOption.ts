import { EventFilterQuery } from './enums/EventFilterQuery'

/* eslint-disable @typescript-eslint/no-explicit-any */
export type FilterOption = {
  icon: any
  title: string
  query: EventFilterQuery
  noFilter: boolean
}
