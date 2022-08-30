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
  const [clientSecret, setSecret] = useState<string>('')

  const handleCreatePayment = async () => {
    fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
        mutation CreatePayment {
          createPayment {
            secret
          }
        }
      `,
      }),
    })
      .then((res) => res.json())
      .then((result) => setSecret(result.data.createPayment.secret))
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

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'https://example.com/order/123/complete',
      },
    })

    if (result.error) {
      console.log(result.error.message)
    } else {
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled={!stripe}>Submit</button>
    </form>
  )
}

export default Payment
