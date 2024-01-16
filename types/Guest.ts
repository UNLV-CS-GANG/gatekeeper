import { Invite } from '@prisma/client'

type MinimalClerkUser = {
  firstName: string
  lastName: string
  username: string
  email: string
  imageUrl: string
}

export type Guest = MinimalClerkUser & Invite
