import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from "react-router-dom"


function Product({ product }) {
    return (
        <Card className='my-3 p-2 rounded'>
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} />
            </Link>

            {/*card body*/}
            <Card.Body >
                <Link to={`/product/${product._id}`} >
                    <Card.Title >
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as="div">
                    <div className='my-3'>
                        <Rating value={product.rating} text={`${product.numReviews} reviews`} color={"#f8e825"} />
                    </div>
                </Card.Text>

                <Card.Title as="h3">
                    ${product.price}
                </Card.Title>

            </Card.Body>

        </Card>

    )
}

export default Product