import React from 'react'
import { useSelector } from 'react-redux'


const ComponentToPrint = React.forwardRef((props, ref) => {
    const BuyTodayProducts = useSelector((state) => state.getBuyToday.BuyToday)

    return (
        <div  className='TablesContainer' style={{display:`none`}}>
            <table ref={ref}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Price</th>
                        <th>Date/Time</th>
                    </tr>
                </thead>
                <tbody>
                    {BuyTodayProducts.length > 0 && BuyTodayProducts.map((table, index) => {
                        return (
                            <tr key={index}>
                                 <td>
                                    <p>{index+1}</p>
                                </td>
                                <td>
                                    <p>{table.Name}</p>
                                </td>
                                <td>
                                    <p>{table.Amount}</p>

                                </td>
                                <td>
                                    <p>{table.Price}</p>
                                </td>
                                <td>
                                    <p>{table.Date}</p>
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
            )
            )
        </div>
    )
});

export default ComponentToPrint
