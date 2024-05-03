import { OrganizationExtended } from './OrganizationExtended'

export class OrganizationsPreviewResponse {
  public organizations: OrganizationExtended[]
  public allOrganizationsCount: number

  constructor(orgs: OrganizationExtended[], allOrgsCount: number) {
    this.organizations = orgs
    this.allOrganizationsCount = allOrgsCount
  }
}
