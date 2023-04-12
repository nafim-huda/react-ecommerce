import { useState, FormEvent } from 'react';
import { useSelector } from 'react-redux'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { StripeCardElement } from '@stripe/stripe-js'; 


import { selectCartTotal } from '../../store/cart/cart.selector'
import { selectCurrentUser } from '../../store/user/user.selector'

import { BUTTON_TYPE_CLASSES } from '../button/button.component'

import { PaymentFormContainer, FormContainer, PaymentButton } from './payment-form.styles'


/* Type Guard for our card element in our payment confirmation call */
// if our stripe card element is not null -> then our card element is cast to a stripe card element and returned
// as a stripe card element 
const ifValidCardPayment = (card: StripeCardElement | null): card is StripeCardElement => card !== null;


const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const amount = useSelector(selectCartTotal)
    const currentUser = useSelector(selectCurrentUser)
    const [isProcessingPayment, setIsProcessingPayment ] = useState(false)

    const paymentHandler = async (e: FormEvent<HTMLFormElement>) => {
        /* prevent any submission default events */
        e.preventDefault();

        if(!stripe || !elements) {
            return;
        }

        // started payment transaction
        setIsProcessingPayment(true);

        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount: amount * 100 }),
        }).then((res) => res.json());

        const { paymentIntent: { client_secret }} = response;

        const cardDetails = elements.getElement(CardElement)
        if(!ifValidCardPayment(cardDetails)) return;

        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                // need to perform a type guard check to ensure card is never "null"
                card: cardDetails,
                billing_details: {
                    name: currentUser ? currentUser.displayName: 'Guest',
                }
            }
        });
        // we have just finished processing a payment or reached an error -> set processing payment to false
        setIsProcessingPayment(false)

        if(paymentResult.error) {
            alert(paymentResult.error);
        } else {
            if(paymentResult.paymentIntent.status === 'succeeded') {
                alert('Payment Successful')
            }
        }
    }
    return (
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                <h2>Credit Card Payment: </h2>
                <CardElement />
                <PaymentButton 
                    isLoading={isProcessingPayment}
                    buttonType={BUTTON_TYPE_CLASSES.inverted}
                    > 
                        Pay Now 
                </PaymentButton>
            </FormContainer>
        </PaymentFormContainer>
    )
}

export default PaymentForm