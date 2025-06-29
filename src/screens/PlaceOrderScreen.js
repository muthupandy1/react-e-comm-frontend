// eslint-disable-next-line
import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, ListGroup, Row, Image, Card, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import Message from './../components/Message';
import { createOrder } from '../actions/orderActions';
import CheckOutSteps from '../components/CheckOutSteps'
import { ORDER_CREATE_RESET } from '../constants/orderConstants';

function PlaceOrderScreen() {

    const dispatch = useDispatch();
    // const location = useLocation();
    const navigate = useNavigate();

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, error, success } = orderCreate

    const cart = useSelector(state => state.cart)


    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 10).toFixed(2)
    cart.taxPrice = Number(0.082 * cart.itemsPrice).toFixed(2)
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)


    useEffect(() => {
        if (!cart.paymentMethod) {
            navigate('/payment')
        }
    }, [cart.paymentMethod, navigate])


    useEffect(() => {
        if (success) {
            navigate(`/order/${order._id}`)
            dispatch({ type: ORDER_CREATE_RESET })
        }
    }, [success, navigate, order, dispatch])

    const placeOrder = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        }))
        console.log('order placeOrder');
    }
    return (
        <div>
            <CheckOutSteps step1 step2 step3 step4 />

            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>

                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Shipping:</strong>
                                {/* {cart.shippingAddress}, */}
                                {cart.shippingAddress.address},
                                {cart.shippingAddress.city},
                                {""}
                                {cart.shippingAddress.postalCode},
                                {""}
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method:</strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            {cart.cartItems.length === 0
                                ? <Message variant='info'> Your cart is empty</Message>
                                : (<ListGroup>{cart.cartItems.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={2}>
                                                <Image src={item.image} fluid></Image>
                                            </Col>
                                            <Col >
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={1}>{item.price} </Col>
                                            <Col md={4}>{item.qty}x{item.price} = ${(item.price * item.qty).toFixed(2)} </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                                </ListGroup>)}
                        </ListGroup.Item>

                    </ListGroup>
                </Col>


                {/* Col -2 */}
                <Col md={4}>
                    <Card >

                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                        </ListGroup>

                        <ListGroup.Item >
                            <Row>
                                <Col>Item:</Col>
                                <Col>${cart.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping:</Col>
                                <Col>${cart.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Tax:</Col>
                                <Col>${cart.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Total:</Col>
                                <Col>${cart.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            {error && <Message variant='danger'>{error}</Message>}
                        </ListGroup.Item>

                        <Button type='button' className='btn-block' disabled={cart.cartItems.length === 0} onClick={placeOrder}>Place Order</Button>

                    </Card>
                </Col>
            </Row>

        </div>
    )
}

export default PlaceOrderScreen

