import { Invite } from '@prisma/client'
import { MinimalClerkUser } from './MinimalClerkUser'

export type Guest = MinimalClerkUser & Invite
