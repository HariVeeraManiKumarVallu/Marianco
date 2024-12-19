import Stripe from 'stripe'

const isDevelopment = process.env.NODE_ENV === 'development'

const stripeSecretKey = isDevelopment
  ? process.env.STRIPE_TEST_SECRET_KEY
  : process.env.STRIPE_SECRET_KEY

if (!stripeSecretKey) {
  throw new Error(
    `${
      isDevelopment ? 'STRIPE_TEST_SECRET_KEY' : 'STRIPE_SECRET_KEY'
    } is missing. Please set the environment variable.`
  )
}

const stripe = new Stripe(stripeSecretKey, {
  typescript: true,
  apiVersion: '2024-10-28.acacia',
})

export default stripe
