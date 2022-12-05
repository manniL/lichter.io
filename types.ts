export type Talk = {
  title: string
  description: string
  eventName: string
  location: string
  date: string
  eventUrl?: string
  slidesUrl?: string
  videoUrl?: string
  isWorkshop?: true
}

export type DonationLinkInfo = {
  url: string,
  name: string,
  description: string,
  slug: string,
  amountInCent: number,
}