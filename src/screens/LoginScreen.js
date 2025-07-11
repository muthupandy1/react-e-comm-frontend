import React, { useState, useEffect } from 'react'
import { Link, useNavigate, redirect, useLocation } from 'react-router-dom'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';

import FormContainer from './FormContainer';


import Loader from '../components/Loader';
import Message from '../components/Message';
import { login } from '../actions/userActions';


function LoginScreen() {
    const location = useLocation();
    const dispatch = useDispatch()
    const navigate = useNavigate();


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // const redirect = location.search ? location.search.split("=")[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin


    useEffect(() => {
        if (userInfo) {
            navigate('/')
        }

    }, [userInfo, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
        console.log('submitted');
    }



    return (
        <FormContainer >
            <h1>Sign In</h1>

            {error && <Message variant={'danger'}>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler} >
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>

                    <Button type='submit' variant='primary'>Sign In</Button>
                </Form.Group>
            </Form>

            <Row className='py-3'>
                <Col>
                    New Customer
                    ? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen