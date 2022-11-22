import React from 'react'
import './Store.css'
import { useSelector, useDispatch } from 'react-redux'
import { ResetSingleProduct } from '../redux/actions/productActions';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';




const Store = () => {
    const dispatch = useDispatch();

    const Meds = useSelector((state) => state.medsReducer.items)

    if (Meds.length === 0) {
        window.location.replace("/")
    }

    const Reset = (id, itemQuantity) => {
        dispatch(ResetSingleProduct(id, itemQuantity))
    }

    return (
            <div className='storeItems container'>
                {/* {
                    Meds.length > 0 && Meds.filter((item) => item.Mix === false).map((item, index) => {
                        return (
                            <div className={item.Quantity <= 0 ? 'storeItem dangers' : 'storeItem'} key={index}>
                                <p className='Name'>{item.Name}</p>
                                <p className='Quantity'>{item.Quantity} : gm</p>
                                <button className={item.Quantity===item.QuantityOverMonth? 'hide': ' '} onClick={()=>{Reset(item._id,item.Quantity)}}>Monthly Reset</button>
                            </div>
                        )
                    })
                } */}
                <Row xs={1} md={2} lg={3} xl={4} className="g-4">
                    {
                        Meds.length > 0 && Meds.filter((item) => item.Mix === false).map((item, index) => {
                            return (
                                <Col key={index}>
                                    <Card className={item.Quantity <= 0 ? 'storeItem dangers' : 'storeItem'} key={index}>
                                        <Card.Body>
                                            <Card.Title className='Name'>{item.Name}</Card.Title>
                                            <Card.Text className='Quantity' > {item.Quantity} : gm </Card.Text>
                                            <Button className={item.Quantity === item.QuantityOverMonth ? 'hide' : ' '} onClick={() => { Reset(item._id, item.Quantity) }} variant="primary">Monthly Reset</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        })
                    }
                </Row>
            </div>
    )
}

export default Store
