import Stripe from 'stripe'
import type { DonationLinkInfo } from '~/types'

const { stripeSecretKey } = useRuntimeConfig()
const stripe = new Stripe(stripeSecretKey, { apiVersion: '2022-11-15' })

export default defineEventHandler(async (): Promise<DonationLinkInfo[]> => {
  const allPaymentLinks = await stripe.paymentLinks.list()
  const paymentLinksForWebsite = allPaymentLinks.data
    .filter(l => l.active && l.after_completion.redirect?.url.startsWith('https://www.lichter.io'))

  const linksWithDetails = await Promise.all(
    paymentLinksForWebsite.map(async l => detailsForPaymentLink(l))
  )

  return linksWithDetails
})

async function detailsForPaymentLink (link: Stripe.PaymentLink) {
  const itemDetails = await itemDetailsForPaymentLinkById(link.id)
  return {
    url: link.url,
    ...itemDetails
  }
}

async function itemDetailsForPaymentLinkById (id: string) {
  const { data } = (await stripe.paymentLinks.listLineItems(id))
  const [firstItem] = data
  const { price } = firstItem

  const { id: slug, unit_amount: amountInCent, product: productId } = price!

  const { description, name } = await stripe.products.retrieve(productId as string)

  return {
    name: name.replace('Donation -', '').trim(),
    description: description ?? '',
    slug: slug.replace('donation-', ''),
    amountInCent: amountInCent as number
  }
}