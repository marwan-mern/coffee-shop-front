import React, { useRef } from 'react'
import './Report.css'
import { useDispatch, useSelector } from 'react-redux';
import { DeleteAddedItemReport } from '../redux/actions/productActions';

import ComponentToPrint from './ComponentToPrint';
import { useReactToPrint } from 'react-to-print';

import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


const Report = () => {

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const dispatch = useDispatch();
    const gain = useSelector((state) => state.TotalGain.gain)
    const lackedItems = useSelector((state) => state.getlack.lack)
    const Meds = useSelector((state) => state.medsReducer.items)
    const AddedProducts = useSelector((state) => state.getDailyAdded.Added)
    const BuyTodayProducts = useSelector((state) => state.getBuyToday.BuyToday)
    let AddedTodayCost = 0;

    const print = () => {
        if (BuyTodayProducts.length > 1500) {
            handlePrint()
        } else {
            console.log(BuyTodayProducts.length)
        }
    }

    if (Meds.length === 0) {
        window.location.replace("/")
    }

    const LackedItemsArray = [];
    const ProductsQuantityArray = [];
    const ProductsAddedToday = [];
    const AllProductNameWithMontlySell = [];
    const AllStoreProductsNameWithQuantityWithCost = [];
    let BuyTodayArray = [];


    Meds.length > 0 && Meds.filter((item) => item.Mix === false).map((item) => {
        return (
            AllProductNameWithMontlySell.push(`Name :${item.Name}`, `The Sold Quantity In This Month :${(item.QuantityOverMonth - item.Quantity)}`)

        )
    })
    Meds.length > 0 && Meds.filter((item) => item.Mix === false).map((item) => {
        return (
            AllStoreProductsNameWithQuantityWithCost.push(`Name :${item.Name}`, `Quantity :${item.Quantity}`, `Total Cost:${item.Quantity * item.Price}`)

        )
    })

    Meds.length > 0 && Meds.map((Product) => {
        return (ProductsQuantityArray.push(Product.Name, Product.Quantity))
    })

    lackedItems.map((lackedItem) => {
        return (
            LackedItemsArray.push(lackedItem.Name)
        )
    })

    AddedProducts && AddedProducts.map((product) => {
        return (AddedTodayCost = AddedTodayCost + product.Quantity * product.Price,
            ProductsAddedToday.push(`Name:${product.Name}`, `Quantity:${product.Quantity}`))
    })

    BuyTodayProducts.length > 0 && BuyTodayProducts.map((product,index) => {
        return (
            BuyTodayProducts.length < 1500 ? (BuyTodayArray.push(`Check Number:${index+1}`,`Date:${product.Date}`,`Table Number:${product.TableNumber}`,`Products:${product.orders.types}`,`Quantities:${product.orders.quantities}`,`Total Cost:${product.TotalCost}`))
                : (
                    BuyTodayArray = [],
                    BuyTodayArray.push(`More Than 1500 product sold tonight Its Better to take the pdf report`)
                )
        )
    })


console.log(BuyTodayProducts)



    if (gain.length === 0) {
        window.location.replace("/")
    }


    const DailyReset = async (id) => {
        dispatch(DeleteAddedItemReport(id))
    }




    return (
        <div className='ReportContainer container'>

            {/* <div className='Daily'> */}
            <ComponentToPrint ref={componentRef} />
            <Row xs={1} md={2} lg={3} className="g-4 d-flex justify-content-center align-items-center">
                <Col className='Daily'>
                    <Card className='AddedToday' >
                        <Card.Body>
                            <Card.Title className='AddedTitle'>Today Added Items Need To Reset After Sending The Daily Report</Card.Title>
                            <Button variant="success"><a onClick={() => { print() }} className='SendReport text-decoration-none' href={'https://wa.me/2001067889532?text=' +
                                'Daily Gain Is :' + gain + "%0a" +
                                '_ Lacked Items In The Store :' + LackedItemsArray + "%0a" +
                                '_ Items Sold today :' + BuyTodayArray + "%0a" +
                                '_ Added Items today In the Store With Quantity:' + ProductsAddedToday + "%0a" +
                                '_ Added Today Cost:' + AddedTodayCost + "%0a" +
                                '_ Total Profit Is :' + (gain - AddedTodayCost)} rel='noreferrer' target="_blank"><span style={{ color: `white` }}>Send WhatsApp Daily Report</span>
                            </a></Button>
                        </Card.Body>
                    </Card>
                    <div className='AddedItems container'>
                        <Row xs={1}  className="g-4">
                            {
                                AddedProducts && AddedProducts.map((product) => {
                                    return (
                                        <Col key={product._id} >
                                            <Card className='AddedItem' >
                                                <Card.Body>
                                                    <Card.Title className='AddedItemName'>{product.Name}</Card.Title>
                                                    <Button variant="primary" onClick={() => { DailyReset(product._id) }}><p style={{ color: `white` }}>Daily Reset For {product.Name}</p> </Button>
                                                </Card.Body>
                                            </Card>
                                        </Col>

                                    )
                                })
                            }
                        </Row>
                    </div>
                </Col>

                <Col >
                    <Card className='Montly' >
                        <Card.Body>
                            <Card.Title className='AddedTitle'>Don't Forget To Reset All The Items In The Store After Sending The Montly Report</Card.Title>
                            <Button variant="success"><a className='SendReport text-decoration-none' href={'https://wa.me/2001067889532?text=' +
                                'Monthly Report :' + AllProductNameWithMontlySell + "%0a"
                            } rel='noreferrer' target="_blank"><span style={{ color: `white` }}>Send WhatsApp Montly Report</span>
                            </a></Button>
                        </Card.Body>
                    </Card>
                </Col>
                {/* <div className='AddedToday'>
                    <p className='AddedTitle'>Today Added Items Need To Reset After Sending The Daily Report</p>

                    <a onClick={() => { print() }} className='SendReport' href={'https://wa.me/2001067889532?text=' +
                        'Daily Gain Is :' + gain + "%0a" +
                        '_ Lacked Items In The Store :' + LackedItemsArray + "%0a" +
                        '_ Items Sold today :' + BuyTodayArray + "%0a" +
                        '_ Added Items today In the Store With Quantity:' + ProductsAddedToday + "%0a" +
                        '_ Added Today Cost:' + AddedTodayCost + "%0a" +
                        '_ Total Profit Is :' + (gain - AddedTodayCost)} rel='noreferrer' target="_blank">Send WhatsApp Daily Report
                    </a>

                    <div className='AddedItems'>
                        {
                            AddedProducts && AddedProducts.map((product) => {
                                return (
                                    <div className='AddedItem' key={product._id}>
                                        <p className='AddedItemName'>{product.Name}</p>
                                        <button onClick={() => { DailyReset(product._id) }}>Daily Reset For {product.Name}</button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div> */}
                {/* </div> */}

                {/* <div className='Montly'>
                    <p className='AddedTitle'>Don't Forget To Reset All The Items In The Store After Sending The Montly Report</p>
                    <a className='SendReport' href={'https://wa.me/2001067889532?text=' +
                        'Monthly Report :' + AllProductNameWithMontlySell + "%0a"
                    } rel='noreferrer' target="_blank">Send WhatsApp Montly Report
                    </a>
                </div> */}

                <Col >
                    <Card className='Montly' >
                        <Card.Body>
                            <Button variant="success"> <a className='SendReport text-decoration-none' href={'https://wa.me/2001067889532?text=' +
                                'Store Report :' + AllStoreProductsNameWithQuantityWithCost + "%0a"
                            } rel='noreferrer' target="_blank"><span style={{ color: `white` }}>Send WhatsApp Store Report</span></a></Button>
                        </Card.Body>
                    </Card>
                </Col>

                {/* <div className='Montly'>
                    <a className='SendReport' href={'https://wa.me/2001067889532?text=' +
                        'Store Report :' + AllStoreProductsNameWithQuantityWithCost + "%0a"
                    } rel='noreferrer' target="_blank">Send WhatsApp Store Report</a>
                </div> */}

            </Row>



        </div>
    )
}

export default Report
