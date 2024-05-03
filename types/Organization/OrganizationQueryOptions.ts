import { DataQueryOptions } from '../DataQueryOptions'
import { OrganizationFilterQuery } from './OrganizationFilterQuery'

export interface OrganizationQueryOptions extends DataQueryOptions {
  organizationId?: string | null
  userId?: string | null // is the owner of
  memberId?: string | null // is a member of
  filter?: OrganizationFilterQuery | null
  isPublic?: string | null
}
