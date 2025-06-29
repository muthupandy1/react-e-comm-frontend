import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux';

import Message from '../components/Message';
import Rating from '../components/Rating';
import { listProductDetails } from '../actions/productActions';



function ProductScreen() {
  const [qty, setQty] = useState(1)
  const navigate = useNavigate();


  // const [product, setProduct] = useState([])
  const { id } = useParams();


  const dispatch = useDispatch()
  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  useEffect(() => {

    dispatch(listProductDetails(id))

    // async function fetchProduct() {

    //   const { data } = await axios.get(`/api/products/${id}`)

    //   setProduct(data);

    // }
    // fetchProduct();
  }, [dispatch, id])


  // let product = {}


  // const { id } = useParams();

  // const product = products.find((p) => p._id === (id));


  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`)
  }

  return (
    < div >

      <Link to='/' className='btn btn-light my-3'>Go Back</Link>
      {loading ? <p>Loading...</p>
        : error ? <Message variant="danger">{error}</Message>
          : (<Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid></Image>
            </Col>

            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  {product.name}
                </ListGroup.Item>

                <ListGroup.Item>
                  <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'f8e825'} />
                </ListGroup.Item>

                <ListGroup.Item>
                  Price: ${product.price}
                </ListGroup.Item>

                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>

              </ListGroup>
            </Col>

            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col><strong>${product.price}</strong></Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? "In stock" : "out of stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col xs="auto" className='my-1'>Qty</Col>
                        <Col>
                          <Form.Control as="select" value={qty} onChange={(e) => setQty(e.target.value)}>
                            {[...Array(product.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}


                  <ListGroup.Item className='m-2'>
                    <Row>
                      <Button onClick={addToCartHandler} className='btn-block' type='button' disabled={product.countInStock === 0}>Add To Cart
                      </Button>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>

              </Card>
            </Col>
          </Row>)}




    </ div>
  )
}

export default ProductScreen