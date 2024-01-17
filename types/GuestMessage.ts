import { Message } from '@prisma/client'
import { MinimalClerkUser } from './MinimalClerkUser'

export type GuestMessage = MinimalClerkUser & Message
