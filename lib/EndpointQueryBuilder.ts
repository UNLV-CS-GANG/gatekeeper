import { EventQueryOptions } from '@/types/Event/EventQueryOptions'

export class EndpointQueryBuilder {
  private endpoint: string

  // append to endpoint that may or may not already have queries
  public addQuery(query: keyof EventQueryOptions, value: string | number | null | undefined) {
    if (value) {
      if (this.endpoint.includes('?')) this.endpoint += `&${query}=${value}`
      else this.endpoint += `?${query}=${value}`
    }
  }

  // getter
  public getEndpoint() {
    return this.endpoint
  }

  constructor(baseEndpoint: string) {
    this.endpoint = baseEndpoint
  }
}
