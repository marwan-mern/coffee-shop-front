import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMeds, FindLackedItems } from '../redux/actions/productActions';
// import { SearchItems } from '../redux/actions/productActions';
import Form from 'react-bootstrap/Form';



import './Home.css';
import Product from './Product.js'
// import SearchProduct from './SearchProduct.js'

import { FcSearch } from "react-icons/fc";
import { FaWindowClose } from "react-icons/fa";
import Row from 'react-bootstrap/Row';

import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';




const Home = () => {
    const dispatch = useDispatch();
    const Meds = useSelector((state) => state.medsReducer.items)

    // const Searched = useSelector((state) => state.getSearched.Searched)
    const [CloseSearch, setCloseSearch] = useState(true)
    const lackedItems = useSelector((state) => state.getlack.lack)
    const [searchItem, setsearchItem] = useState(``)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    const searc = new RegExp(searchItem, `i`)
    const data = Meds.length > 0 && Meds.filter((item) => searc.test(item.Name))

    //Types from data base And add All
    const Medtypes = Meds.length > 0 && Meds.map((medecine) => {
        return medecine.type
    })
    const MenuItemsArray = Medtypes.length > 0 && Medtypes.filter((Medecine, index, self) => {
        return self.indexOf(Medecine) === index
    })
    MenuItemsArray.length > 0 && MenuItemsArray.unshift("All")


    const [MenuType, setMenuType] = useState('All')
    const [SelectedItem, setSeletedItem] = useState(' ')

    useEffect(() => {
        dispatch(fetchMeds())
        dispatch(FindLackedItems())
    }, [dispatch])

    const ChangeMenuType = (type) => {
        setMenuType(type)
    }
    const search = (searchItem) => {
        // dispatch(SearchItems(searchItem))
        setCloseSearch(false)
    }
    const close = () => {
        setCloseSearch(true)
        setsearchItem('')
    }

    return (
        <div className='Homecontainer' >
            <div className='Search container'>
                <div className='SearchDiv'>
                    <Form.Control type="text" placeholder='Search' value={searchItem} onChange={(e) => { setsearchItem(e.target.value) }} />
                    {/* <input className='SearchInput' placeholder='Search' type='text' value={searchItem} onChange={(e) => { setsearchItem(e.target.value) }}></input> */}
                    <span className='SearchLogo' onClick={() => { search(searchItem) }}><FcSearch /></span>
                </div>
                <div className={CloseSearch ? 'SearchData container hide' : 'SearchData container'}>
                    <span className='closeSearch' onClick={() => { close() }}><FaWindowClose /></span>
                    <p className='SearchTitle'>Search Results</p>
                    <Row xs={1} md={2} lg={3} className="g-4">
                        {data.length > 0 ? data.map((item) => {
                            return (<div key={item._id}>
                                <Product ProductItem={item} />
                            </div>
                            )
                        })
                            :
                            <p className='SearchWarning'>No Product With That Name </p>
                        }
                    </Row>

                </div>
            </div>
            <div className='MenuItems'>
                {MenuItemsArray.length > 0 && MenuItemsArray.map((item, index) => {
                    return (
                        <span className={SelectedItem === item ? 'MenuItem active' : ' MenuItem'} onClick={(e) => {
                            ChangeMenuType(e.target.innerText);
                            setSeletedItem(item)
                        }} key={item}>{item}</span>
                    )
                })}
            </div>
            <div className='ProductItems container'>
                <Row xs={1} md={2} lg={3} className="g-4">
                    {
                        MenuType === 'All' ? (
                            Meds.length > 0 && Meds.map((Product_item) => {
                                return (<div key={Product_item._id}>
                                    <Product ProductItem={Product_item} />
                                </div>
                                )
                            })
                        ) : (

                            Meds.length > 0 && Meds.filter((item) => item.type === MenuType).map((Product_item) => {
                                return (<div key={Product_item._id}>
                                    <Product ProductItem={Product_item} />
                                </div>
                                )
                            })
                        )

                    }
                </Row>

            </div>
            {/* <div className='lackItems'>
                <p className='lackItemsTitle'>lacked Items from the store</p>
                <div className='lackItemsList'>
                    {
                        lackedItems.length > 0 && lackedItems.map((lackedItem, index) => {
                            return (
                                <p className='LackedItem' key={lackedItem._id}>{lackedItem.Name}</p>
                            )
                        })
                    }
                </div>
            </div> */}
            <div>
                <Button className='lackItems' variant="danger" onClick={handleShow}>
                    Show Lacked Items
                </Button>

                <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title className='lackItemsTitle' >lacked Items from the store</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                    {
                        lackedItems.length > 0 && lackedItems.map((lackedItem, index) => {
                            return (
                                <p className='btn btn-danger w-100 pe-none LackedItem' key={lackedItem._id}>{lackedItem.Name}</p>
                            )
                        })
                    }
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
        </div>
    )
}

export default Home
