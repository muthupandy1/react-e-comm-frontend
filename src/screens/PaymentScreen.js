import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Col, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from './FormContainer';
import { savePaymentMethod } from '../actions/cartActions';

import CheckOutSteps from '../components/CheckOutSteps';

function PaymentScreen() {

    const location = useLocation();
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart;

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    if (!shippingAddress.address) {
        navigate('/shipping')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
        console.log("placeorder");
    }

    return (
        <FormContainer>
            <CheckOutSteps step1 step2 step3 />

            <Form onSubmit={submitHandler}>

                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='PayPal or CreditCard'
                            id='paypal'
                            name='paymentMethod'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                        </Form.Check>
                    </Col>
                </Form.Group>

                <Button type='submit' variant='primary'>Continue</Button>

            </Form>
        </FormContainer>)
}

export default PaymentScreen

