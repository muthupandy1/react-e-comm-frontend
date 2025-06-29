import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from './FormContainer';
import { saveShippingAddress } from '../actions/cartActions';
import CheckOutSteps from '../components/CheckOutSteps';

function ShippingScreen() {

    // const location = useLocation();
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart;


    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)



    const submitHandler = (e) => {
        e.preventDefault()
        console.log("shipping address");
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        navigate('/payment');
    };


    return (
        <FormContainer>
            <CheckOutSteps step1 step2 />
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter address'
                        value={address ? address : ""}
                        onChange={(e) => setAddress(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter city'
                        value={city ? city : ""}
                        onChange={(e) => setCity(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='postalCode'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter Postal Code'
                        value={postalCode ? postalCode : ""}
                        onChange={(e) => setPostalCode(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter Country'
                        value={country ? country : ""}
                        onChange={(e) => setCountry(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen