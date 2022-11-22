import React, { useState } from 'react'
import './AddToStock.css'
import { useSelector, useDispatch } from 'react-redux'
import { AddSingleProductToStore } from '../redux/actions/productActions';

import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Modal from 'react-bootstrap/Modal';


const AddToStock = () => {
    const dispatch = useDispatch();

    const Meds = useSelector((state) => state.medsReducer.items)
    // console.log(Meds.length)

    if (Meds.length === 0) {
        window.location.replace("/")
    }
    const [AddedAmount, setAddedAmount] = useState(0)

    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
     
    
    const AddToStore = (id, itemAmount, name, price, OldQuantity, QuantityOverMonth) => {
        if (itemAmount > 0) {
            dispatch(AddSingleProductToStore(id, itemAmount, name, price, OldQuantity, QuantityOverMonth))
            setShow2(true)
        } else {
            setShow(true);
            // alert("Please Add Valid Amount More Than Zero")
        }
    }

    return (
        <div className='AddTostoreItems container'>
            <Modal  show={show} onHide={handleClose}>
                <Modal.Body className='ModalSetting'>Please Add Valid Amount More Than Zero</Modal.Body>
            </Modal>

            <Modal  show={show2} onHide={handleClose2}>
                <Modal.Body className='ModalSettingSucess'>Added Successfully</Modal.Body>
            </Modal>

            <Row xs={1} md={2} lg={3} xl={4} className="g-4">
                {
                    Meds.length > 0 && Meds.filter((item) => item.Mix === false).map((item, index) => {
                        return (
                            // <div className='storeItem' key={index}>
                            //     <p className='Name'>{item.Name}</p>
                            //     <p className='Quantity'>{item.Quantity} : gm</p>
                            //     <div className='data'>
                            //         <input className='DataInput' type='number' min={0} placeholder='The Added Amount' onChange={(e) => { setAddedAmount(e.target.value) }} />
                            //         {item.UpdatedToday === true ? <p className='Added'>Has Been Added Today</p> : <button onClick={() => { AddToStore(item._id, AddedAmount, item.Name, item.Price, item.Quantity, item.QuantityOverMonth) }}>Add To Store </button>}
                            //     </div>
                            // </div>
                            <Col key={index} >
                                <Card className='storeItem' >
                                    <Card.Body>
                                        <Card.Title className='Name'>{item.Name}</Card.Title>
                                        <Card.Text className='Quantity' > {item.Quantity} : gm </Card.Text>
                                        <Form.Control type="number" className='mb-2' min={0} placeholder='The Added Amount' onChange={(e) => { setAddedAmount(e.target.value) }} />
                                        {item.UpdatedToday === true ? <Card.Text className='Added'>Has Been Added Today</Card.Text> : <Button onClick={() => { AddToStore(item._id, AddedAmount, item.Name, item.Price, item.Quantity, item.QuantityOverMonth) }} variant="primary">Add To Store</Button>}
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

export default AddToStock
