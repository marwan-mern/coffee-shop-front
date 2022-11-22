import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Tables.css'
import api from '../api/items.js'
import { UpdateOrder, RemoveTableFromOrders, BuyTodayProduct } from '../redux/actions/productActions';

import CheckToPrint from './CheckToPrint';
import { useReactToPrint } from 'react-to-print';

import Modal from 'react-bootstrap/Modal';




const Tables = () => {
    const Tables = useSelector((state) => state.AddedTables.Tables)
    const dispatch = useDispatch();

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const [PrintTableNumber, setPrintTableNumber] = useState(1)

    if (Tables.length === 0) {
        window.location.replace("/")
    }

    const EditOrder = (tableNumber, tableOrdersIndex) => {
        dispatch(UpdateOrder(tableNumber, tableOrdersIndex))
    }

    const PrintCheckOfOrder = (tableNumber, orders, TotalCost) => {
        dispatch(BuyTodayProduct(tableNumber, orders, TotalCost))
        setShow(true);
    }

    const RemoveTable = (tableNumber) => {
        dispatch(RemoveTableFromOrders(tableNumber))
    }
    const Print = () => {
        handlePrint()
    }

    useEffect(() => {
        // dispatch(fetchProducts())
        async function fetchTablesData() {
            const responseTables = await api.get('/Tables')
            dispatch({ type: 'AllTables', payload: responseTables.data })
        }
        fetchTablesData()
    }, [dispatch])

    return (
        <div className='TablesContainer'>
            {
                Tables.length > 0 && Tables.map((table, index) => {
                    return (
                        <div key={index} className={table.orders.uniqueIds.length === 0 ? 'Tables green' : 'Tables red'}>
                            <p className='Name'>Table Number : {table.uniqueId}</p>
                            <div >
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                            <th>Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                {
                                                    table.orders.types.length > 0 && table.orders.types.map((orderItemtype, i) => {
                                                        return (
                                                            <p key={`a` + i}>{orderItemtype}</p>
                                                        )
                                                    })
                                                }
                                            </td>
                                            <td>
                                                {
                                                    table.orders.quantities.length > 0 && table.orders.quantities.map((orderItemQuantity, i) => {
                                                        return (
                                                            <p key={`b` + i}>{orderItemQuantity}</p>
                                                        )
                                                    })
                                                }
                                            </td>
                                            <td>
                                                {
                                                    table.orders.prices.length > 0 && table.orders.prices.map((orderItemPrice, i) => {
                                                        return (
                                                            <p key={`c` + i}>{orderItemPrice}</p>

                                                        )
                                                    })
                                                }
                                            </td>
                                            <td>
                                                {
                                                    table.orders.quantities.length > 0 && table.orders.quantities.map((orderItemQuantity, i) => {
                                                        return (
                                                            <div key={`d` + i} className='Edit'>
                                                                <span onClick={() => { EditOrder(table.uniqueId, i) }} className='editButton' tablenumber={table.id} tableordersindex={i}>Remove</span>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className='TotalCostDiv'>
                                    <p className='TotalCost' key={`e` + index} >Total Cost : {table.TotalCost} $</p>
                                </div>
                                <div className='RemoveTableDiv'>
                                    <button className='printButton' key={`f` + index} onClick={() => { PrintCheckOfOrder(table.uniqueId, table.orders, table.TotalCost) }}>Confirm Order</button>
                                    <CheckToPrint ref={componentRef} tableNumber={PrintTableNumber} />
                                    <button className='DeleteButton' key={`h` + index} onClick={() => { RemoveTable(table.uniqueId) }}>Empty Table</button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            <div className='PrintDiv'>
                <select className='SelectPrint' value={PrintTableNumber} onChange={(e)=>{setPrintTableNumber(e.target.value)}}>
                    {
                        Tables.length > 0 && Tables.map((table,index)=>{
                            return(
                            <option key={index} value={table.uniqueId}>Table {table.uniqueId}</option>
                            )
                        })
                    }
                </select>
                <button className='printButton'  onClick={() => { Print() }}>Print Check</button>
            </div>

            <Modal  show={show} onHide={handleClose}>
                <Modal.Body className='ModalSettingSucess'>Confirmed Successfully Please Empty The Table</Modal.Body>
            </Modal>
        </div>
    )
}

export default Tables
