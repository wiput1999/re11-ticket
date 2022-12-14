import { useCreatePaymentMutation } from '@codegen/client'
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { NextPage } from 'next'
import { useState } from 'react'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STIPRE_PUBLIC_KEY as string
)

const Payment: NextPage = () => {
  const [clientSecret, setSecret] = useState<string | null>(null)

  const [createPaymentMutation, {}] = useCreatePaymentMutation()

  const handleCreatePayment = async () => {
    const { data } = await createPaymentMutation()

    const secret = data?.createPayment.secret

    if (!secret) {
      return
    }

    setSecret(secret)
  }

  return (
    <div className="container mx-auto">
      <h1 onClick={handleCreatePayment}>Create Payment Intent</h1>
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentChild />
        </Elements>
      )}
    </div>
  )
}

const PaymentChild = () => {
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    const origin =
      typeof window !== 'undefined' && window.location.origin
        ? window.location.origin
        : ''

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${origin}/completed`,
      },
    })

    if (result.error) {
      console.log(result.error.message)
    } else {
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement
        options={{ fields: { billingDetails: { email: 'never' } } }}
      />
      <button disabled={!stripe}>Submit</button>
    </form>
  )
}

export default Payment
