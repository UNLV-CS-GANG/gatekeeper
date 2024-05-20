import { Member } from '@prisma/client'
import { MinimalClerkUser } from '../MinimalClerkUser'

export type MemberInfo = MinimalClerkUser & Member
