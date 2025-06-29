import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../components/Loader';
import Message from '../components/Message';

import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import { getUserDetails, updateUserProfile } from '../actions/userActions';

function ProfileScreen() {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    // const redirect = location.search ? location.search.split("=")[1] : '/'


    //user Detail
    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    //user Login
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    //user updateProfile
    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    useEffect(() => {
        if (!userInfo) {
            navigate('/')
        } else {
            if (!user || !user.name || success) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, navigate, userInfo, user, success])


    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('password do not match')
        }
        else {
            console.log('updated');
            dispatch(updateUserProfile({
                'id': user._id,
                // 'name': user.name,
                // 'email': user.email,
                // 'password': user.password,
                name,
                email,
                password,
            }))
            setMessage('')

        }
    }



    return (
        <Row>
            <Col md={3}> <h2>User Profile</h2>
                {message && <Message variant={'danger'}>{message}</Message>}
                {error && <Message variant={'danger'}>{error}</Message>}
                {loading && <Loader />}

                <Form onSubmit={submitHandler} >
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type='name'
                            placeholder='Enter Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='passwordConfirm'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary'>Update</Button>

                </Form>
            </Col>
            <Col md={9}> <h2>My Orders</h2> </Col>
        </Row>)
}

export default ProfileScreen