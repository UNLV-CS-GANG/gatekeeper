import { Organization, User } from '@prisma/client'

export interface OrganizationExtended extends Organization {
  owner: User
  members: User[]
  admins: User[]
}
