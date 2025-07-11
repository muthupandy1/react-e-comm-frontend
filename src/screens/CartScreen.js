import React, { useEffect } from 'react'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';


import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions';


function CartScreen(history) {
    const { id } = useParams();
    const location = useLocation();
    const dispatch = useDispatch()
    const navigate = useNavigate();
    // const [qty] = useSearchParams();
    // const qty = location.search

    const productId = (id);
    let qty = location.search ? Number(location.search.split('=')[1]) : 1;
    console.log('productId:', productId);
    console.log('qty:', qty);



    const cart = useSelector(state => state.cart)
    const { cartItems } = cart;
    console.log('cartItems:', cartItems);

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])


    const removeFromCartHandler = (id) => {
        console.log('remove', id);
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {

        // navigate('/login?redirect=shipping')
        navigate('/shipping')
        console.log('checkout');
    }

    return (
        <Row>
            <Col md={8} ><h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (<Message variant={'info'}>Your cart is empty <Link to='/'> Go Back</Link>
                </Message>) :

                    <ListGroup variant='flush'>
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.product} >
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/products/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        ${item.price}
                                    </Col>
                                    <Col md={3}>
                                        <Form.Control as="select" value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                            {[...Array(item.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col md={1}>
                                        <Button type='button'
                                            variant='light'
                                            onClick={() => removeFromCartHandler(item.product)}>

                                            <i className='fas fa-trash'></i>

                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>))}
                    </ListGroup>}

            </Col>
            <Col md={4} className='p-2' variant='flush'>
                <Card >
                    <ListGroup variant='flush' >

                        <ListGroup.Item>
                            <h2>Sub Total({cartItems.reduce((acc, item) => acc + item.qty, 0)})items</h2>
                            ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </ListGroup.Item>

                        <ListGroup.Item style={{ textAlign: 'center' }}>
                            <Button type='button' className='btn-black' disabled={cartItems.length === 0} onClick={checkoutHandler}> Proceed to Check Out</Button>
                        </ListGroup.Item>

                    </ListGroup>
                </Card>
            </Col>
        </Row>)
}

export default CartScreen