import { EventFilterQuery } from '../enums/EventFilterQuery'

export type EventQueryOptions = {
  eventId?: string | null
  userId?: string | null
  guestId?: string | null
  organizationId?: string | null
  filter?: EventFilterQuery | null
  search?: string | null
  skip?: string | null
  take?: string | null
}
