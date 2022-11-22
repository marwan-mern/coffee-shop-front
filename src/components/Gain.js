import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import './Gain.css'
import { ResetDailyGain, ResetBuyTodaty } from '../redux/actions/productActions';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Modal from 'react-bootstrap/Modal';



const Gain = () => {
    const dispatch = useDispatch();


    const GetGain = () => {
        let Password = prompt("What is Your Password?")
        if (Password === '123') {
            document.getElementById('Gain').classList.remove('hidden')
        } else (
            // alert('Wrong Password')
            setShow(true)

        )
    }

    const ResetGain = () => {
        let Password = prompt("What is Your Password?")
        if (Password === '123') {
            dispatch(ResetDailyGain())
            dispatch(ResetBuyTodaty())
        } else (
            // alert('Wrong Password')
            setShow(true)

        )
    }

    const HideGain = () => {
        document.getElementById('Gain').classList.add('hidden')
    }

    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);


    return (<>
        <NavDropdown title="Gain Settings" className='navItem' id="collasible-nav-dropdown">
            <NavDropdown.Item ><button className='ResetGain' onClick={() => { ResetGain() }}>
                Reset Daily gain
            </button>
            </NavDropdown.Item>
            <NavDropdown.Item ><button className='ShowGain' onClick={() => { GetGain() }} >
                Show Daily Gain
            </button>
            </NavDropdown.Item>
            <NavDropdown.Item ><button className='HideGain' onClick={() => { HideGain() }}>
                Hide Daily Gain
            </button></NavDropdown.Item>
        </NavDropdown>

        <Modal show={show} onHide={handleClose}>
            <Modal.Body className='ModalSetting'>Wrong Password</Modal.Body>
        </Modal>
    </>
        // <div className='GainContainer'>
        //     <p id='Gain' className='Gain'>
        //         Total Gain : <span className='GainValue'> {gain} $</span>
        //     </p>
        //     <div className='GainDiv'>
        //         <button className='ResetGain' onClick={()=>{ResetGain()}}>
        //             Reset Daily gain
        //         </button>
        //         <button className='ShowGain' onClick={() => { GetGain() }} >
        //             Show Daily Gain
        //         </button>
        //         <button className='HideGain' onClick={() => { HideGain() }}>
        //             Hide Daily Gain
        //         </button>
        //     </div>
        // </div>
    )
}

export default Gain
