import { DataQueryOptions } from '../DataQueryOptions'
import { OrganizationFilterQuery } from '../enums/OrganizationFilterQuery'

export interface OrganizationQueryOptions extends DataQueryOptions {
  organizationId?: string | null
  userId?: string | null
  memberId?: string | null
  filter?: OrganizationFilterQuery | null
  isPublic?: string | null
}
