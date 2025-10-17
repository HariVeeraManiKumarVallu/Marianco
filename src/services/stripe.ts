// Square is used; stub Stripe so imports compile
const stripe = {
  async createCheckoutSession(..._args: any[]) {
    return { id: 'stub' };
  },
  async createPaymentIntent(..._args: any[]) {
    return { client_secret: 'stub' };
  },
};

export default stripe;

export function getStripeServer() {
  return null;
}
