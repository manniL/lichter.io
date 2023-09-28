import { format } from 'date-fns'

export function formatDateStringToHumanReadable(date: string) {
  return format(new Date(date), 'MMMM d, yyyy')
}