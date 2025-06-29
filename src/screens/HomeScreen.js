import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux'


import Loader from '../components/Loader';
import Message from '../components/Message';
import Product from './../components/Product';
import { listProducts } from '../actions/productActions';


function HomeScreen() {

    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { error, loading, products } = productList


    // const [products, setProducts] = useState([])

    useEffect(() => {
        dispatch(listProducts())

        // async function fetchProducts() {
        //     const { data } = await axios.get("/api/products/")
        //     setProducts(data);
        // }
        // fetchProducts();

    }, [dispatch]
    )

    // const products = [];

    return (
        <div>
            <h1 className='my-4'> Latest Products</h1>
            {loading ? <Loader /> : error ? <Message variant={
                'danger'
            }>{error}</Message> :
                <Row>
                    {products ? (
                        products.map(product => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))
                    ) : (
                        loading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p>Error: {error}</p>
                        ) : null
                    )}
                </Row>
            }
        </div>
    )
}

export default HomeScreen