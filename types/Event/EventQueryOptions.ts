import { DataQueryOptions } from '../DataQueryOptions'
import { EventFilterQuery } from '../enums/EventFilterQuery'

export interface EventQueryOptions extends DataQueryOptions {
  eventId?: string | null
  userId?: string | null
  guestId?: string | null
  organizationId?: string | null
  organizationMemberId?: string | null
  filter?: EventFilterQuery | null
  isPublic?: string | null
}
