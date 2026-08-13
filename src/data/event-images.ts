export function getEventHeroImage(event: { image: string; detailImage?: string }): string {
  return event.detailImage || event.image;
}
