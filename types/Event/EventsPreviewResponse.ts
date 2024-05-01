import EventExtended from './EventExtended'

export class EventsPreviewResponse {
  public events: EventExtended[]
  public allEventsCount: number

  constructor(events: EventExtended[], allEventsCount: number) {
    this.events = events
    this.allEventsCount = allEventsCount
  }
}
