import { DataQueryOptions } from '../DataQueryOptions'
import { EventFilterQuery } from '../enums/EventFilterQuery'

export interface EventQueryOptions extends DataQueryOptions {
  eventId?: string | null
  userId?: string | null // is the host of the event
  guestId?: string | null // has an invite to the event
  organizationId?: string | null
  organizationMemberId?: string | null
  filter?: EventFilterQuery | null
  isPublic?: string | null // doens't require qr code access
}
