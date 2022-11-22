import React from 'react'
import { useSelector } from 'react-redux'


const CheckToPrint = React.forwardRef((props, ref) => {
    let Tables = useSelector((state) => state.AddedTables.Tables[props.tableNumber - 1])
    // console.log(props.tableNumber)
    // console.log(Tables)


    return (
        <div className='TablesContainer' style={{ display: `none` }}>

            <table ref={ref}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            {
                                Tables.orders.types.length > 0 && Tables.orders.types.map((orderItemtype, i) => {
                                    return (
                                        <p key={`a` + i}>{orderItemtype}</p>
                                    )
                                })
                            }
                        </td>
                        <td>
                            {
                                Tables.orders.quantities.length > 0 && Tables.orders.quantities.map((orderItemQuantity, i) => {
                                    return (
                                        <p key={`b` + i}>{orderItemQuantity}</p>
                                    )
                                })
                            }
                        </td>
                        <td>
                            {
                                Tables.orders.prices.length > 0 && Tables.orders.prices.map((orderItemPrice, i) => {
                                    return (
                                        <p key={`c` + i}>{orderItemPrice}</p>

                                    )
                                })
                            }
                        </td>
                    </tr>
                    <tr>
                        <td className=''>Table Number : {Tables.orders.types.length > 0 && Tables.uniqueId}</td>
                        <td className=''>Total Cost : {Tables.orders.types.length > 0 && Tables.TotalCost}</td>
                    </tr>
                </tbody>

            </table>
        </div>
    )
});

export default CheckToPrint
