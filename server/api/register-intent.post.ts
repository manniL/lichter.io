import Stripe from 'stripe'

// TODO: Runtime config
const { stripeSecretKey } = useRuntimeConfig()

const stripe = new Stripe(stripeSecretKey, { apiVersion: '2022-11-15' })

export default defineEventHandler(async (event) => {
  try {
    const params = await readBody(event)
    const missingAttrs = !params
      ? ['all']
      : ['amount', 'donationType', 'email', 'message'].filter(k => !Object.keys(params).includes(k))
    if (missingAttrs.length) {
      return errorFn('The following attributes are missing ' + missingAttrs, 422)
    }
    console.log('Entered the zone')

    const { amount, donationType, email, message } = params

    try {
      const { data } = await stripe.customers.list({
        limit: 1,
        email
      })

      const isCustomerKnown = data.length
      try {
        const customer = isCustomerKnown
          ? data[0]
          : await stripe.customers.create({
            email
          })

        console.log('Custom is ready, id ' + customer.id)

        try {
          const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'eur',
            description: 'Donation',
            statement_descriptor: 'Thanks 4 the donation!',
            customer: customer.id,
            metadata: { donation_type: donationType, message }
          })

          console.log('Intent created!')

          return { statusCode: 200, body: JSON.stringify({ secret: paymentIntent.client_secret }) }
        } catch (e) {
          return errorFn('Something went wrong while creating the payment intent', 500, e)
        }
      } catch (e) {
        return errorFn('Something went wrong while creating the donator', 500, e)
      }
    } catch (e) {
      return errorFn('Something went wrong while retrieving the donator list', 500, e)
    }
  } catch (e) {
    return errorFn('Unknown error', 500, e)
  }
})

const errorFn = (message: string, statusCode = 500, error?: unknown) => {
  if (error) {
    console.error(error)
  }
  console.error(message)
  return { statusCode, body: JSON.stringify({ message }) }
}
