import { Invite, Event } from '@prisma/client'

interface EventExtended extends Event {
  invites: Invite[]
}

export default EventExtended
