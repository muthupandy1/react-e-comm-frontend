import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

function Footer() {
    return (
        <div>
            <Container>
                <Row>
                    <Col className='text-center py-3'>    
                                    copyright @Eshop
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Footer