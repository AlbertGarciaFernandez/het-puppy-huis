export type EventStatus = "upcoming" | "past";

export function getEventsByStatus<T extends { status: EventStatus }>(events: T[], status: EventStatus): T[] {
  return events.filter((event) => event.status === status);
}
