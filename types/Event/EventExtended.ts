import { Invite, Event, Organization } from '@prisma/client'

interface EventExtended extends Event {
  invites: Invite[]
  organization: Organization
}

export default EventExtended
