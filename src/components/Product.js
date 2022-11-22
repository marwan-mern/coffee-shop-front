import React, { useState } from 'react'
import './Product.css'
import { UpdateSingleProduct, UpdateMixProduct, AddOrderToTable } from '../redux/actions/productActions';
import { useDispatch, useSelector } from 'react-redux'

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import api from '../api/items'
import Modal from 'react-bootstrap/Modal';






const Product = ({ ProductItem }) => {

    const [Amount, setAmount] = useState();
    const Id = ProductItem._id;
    const Tables = useSelector((state) => state.AddedTables.Tables)
    const dispatch = useDispatch();
    const [NoItemInStore, setNoItemInStore] = useState();

    const [TableNumber, setTableNumber] = useState();


    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);

    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);

    const [show3, setShow3] = useState(false);
    const handleClose3 = () => setShow3(false);

    const [show4, setShow4] = useState(false);
    const handleClose4 = () => setShow4(false);

    const [show5, setShow5] = useState(false);
    const handleClose5 = () => setShow5(false);

    const [show6, setShow6] = useState(false);
    const handleClose6 = () => setShow6(false);

    const ChooseTable=()=>{
        setShow6(true)
        // handleClose6()
    }


    const Enter = async (uniqueId, amount, Quantity, Name, Price, defaultValue) => {
        let makeMixOrder = [];
        console.log(TableNumber)
        // let NumberOfTable = prompt("Table Number?")

        if (TableNumber <= Tables.length && TableNumber > 0) {

            if (ProductItem.combination.ids.length === 1) {
                if (Quantity > 0) {
                    dispatch(UpdateSingleProduct(Id, amount, Quantity, Name, Price, defaultValue))
                    dispatch(AddOrderToTable(uniqueId, TableNumber, amount, ProductItem))
                    setShow5(true)
                    // dispatch(BuyTodayProduct(amount , Name ,Price))
                } else {
                    // alert("No More " + Name + " In The Store")
                    setShow1(true)
                }
            } else {
                const map = ProductItem.combination.ids.map(async (id, index) => {
                    // console.log(api)
                    const MixedItem = await api.get(`/meds/search`, { params: { searchItem: id } })
                    console.log(MixedItem)
                    if (MixedItem.data[0].Quantity <= 0) {
                        // alert("No More " + MixedItem.data[0].Name + " In The Store")
                        setNoItemInStore(MixedItem.data[0].Name)
                        setShow4(true)
                    }
                    else {
                        makeMixOrder.push(index)
                    }
                })
                await Promise.all(map);
                if (makeMixOrder.length === ProductItem.combination.ids.length) {
                    console.log(makeMixOrder);
                    dispatch(UpdateMixProduct(Id, amount, Quantity, Name, Price, ProductItem.combination));
                    dispatch(AddOrderToTable(uniqueId, TableNumber, amount, ProductItem));
                    setShow5(true)
                } else {
                    console.log(makeMixOrder);
                    console.log(ProductItem.combination.ids);
                    // alert(`Can't Make ${Name}`);
                    setShow2(true)
                }

            }

        } else (
            // alert('Wrong Number')
            setShow3(true)

        )
        handleClose6()
    }

    return (
        // <div className={ProductItem.Quantity <= 0 ? 'danger Card' : 'Card'}>
        //     <p className='Name' >
        //         {ProductItem.Name}
        //     </p>
        //     <div>
        //         {
        //             ProductItem.Mix === false ? <p className={ProductItem.Quantity <= 0 ? 'danger Quantity' : 'Quantity'}>Total Quantity : {ProductItem.Quantity} {ProductItem.QuantityUnit} </p> : <p className='Quantity'> Quantity : -</p>
        //         }
        //     </div>
        //     <p className='QuantityPerCup'>
        //         {
        //             ProductItem.default ? `Quantity Per One : ${ProductItem.default} ${ProductItem.QuantityUnit} ` : 'Quantity Per Cup : -'
        //         }
        //     </p>

        //     <p className='Price'>
        //         Price : {Amount > 1 ? ProductItem.Price * Amount : ProductItem.Price} $
        //     </p>
        //     <div className='data'>
        //         <input className='DataInput' type='number' min={0} placeholder='Enter Amount' onChange={(e) => { setAmount(e.target.value) }} />
        //         <button onClick={() => { Enter(ProductItem.uniqueId,Amount, ProductItem.Quantity, ProductItem.Name, ProductItem.Price,ProductItem.default) }}>Enter</button>
        //     </div>
        // </div>
        <>
            <Col>
                <Card className={ProductItem.Quantity <= 0 ? 'danger Card' : 'Card'}>
                    <Card.Body>
                        <Card.Title className='Name'>{ProductItem.Name}</Card.Title>
                        <Card.Text >
                            {
                                ProductItem.Mix === false ? <span className={ProductItem.Quantity <= 0 ? 'danger Quantity' : 'Quantity'}>Total Quantity : {ProductItem.Quantity} {ProductItem.QuantityUnit} </span> : <span className='Quantity'> Quantity : -</span>
                            }
                        </Card.Text>
                        <Card.Text >
                            {
                                ProductItem.default ? <span className='QuantityPerCup'> Quantity Per One : {ProductItem.default} {ProductItem.QuantityUnit}  </span> : <span className='QuantityPerCup'>Quantity Per Cup : -</span>
                            }
                        </Card.Text>
                        <Card.Text className='Price'>
                            <span className='Price'>Price : {Amount > 1 ? ProductItem.Price * Amount : ProductItem.Price} $</span>
                        </Card.Text>
                        <Form.Control type="number" min={0} placeholder='Enter Amount' onChange={(e) => { setAmount(e.target.value) }} />
                        <Button className='w-100' onClick={() => { ChooseTable() }} variant="primary">Enter</Button>
                    </Card.Body>
                </Card>
            </Col>

            <Modal show={show1} onHide={handleClose1}>
                <Modal.Body className='ModalSetting'>{`No More  ${ProductItem.Name} In The Store`}</Modal.Body>
            </Modal>
            <Modal show={show2} onHide={handleClose2}>
                <Modal.Body className='ModalSetting'>{`Can't Make ${ProductItem.Name}`}</Modal.Body>
            </Modal>
            <Modal show={show3} onHide={handleClose3}>
                <Modal.Body className='ModalSetting'>Wrong Table Number</Modal.Body>
            </Modal>
            <Modal show={show4} onHide={handleClose4}>
                <Modal.Body className='ModalSetting'>{`No More ${NoItemInStore} In The Store`}</Modal.Body>
            </Modal>

            <Modal show={show5} onHide={handleClose5}>
                <Modal.Body className='ModalSettingSucess'>{`Added ${ProductItem.Name} To Table `}</Modal.Body>
            </Modal>

            <Modal show={show6} onHide={handleClose6}>
                <Modal.Header closeButton>
                    <Modal.Title>Buy Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Table Number</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Table Number"
                                autoFocus
                                onChange={(e)=>{setTableNumber(e.target.value)}}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose6}>
                        Close
                    </Button>
                    <Button variant="success" onClick={()=>{Enter(ProductItem.uniqueId, Amount, ProductItem.Quantity, ProductItem.Name, ProductItem.Price, ProductItem.default)}}>
                        Enter
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Product
