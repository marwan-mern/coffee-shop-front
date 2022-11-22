import React from 'react';
import './Navbar.css'
import { Link } from 'react-router-dom';
import { FcHome } from "react-icons/fc";
import { FaWarehouse } from "react-icons/fa";
import { FaCommentMedical } from "react-icons/fa";
import { FaClinicMedical } from "react-icons/fa";
// import { CgEditMarkup } from "react-icons/cg";
import { GiRoundTable } from "react-icons/gi";
// import { HiMenu } from "react-icons/hi";

import { useSelector } from 'react-redux'


import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Gain from './Gain';












const Navbars = () => {
  const gain = useSelector((state) => state.TotalGain.gain)

  return (
    <Navbar fixed="top" collapseOnSelect expand="lg" bg="light" variant="light">
      <Container >
        <Navbar.Brand >
          <Link to={'/'} className='logo'>CO<span>MP</span>A<span>NY</span><span> </span><span>Coffee</span></Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/" className='navItem'><FcHome /><span>Home</span></Nav.Link>
          <Nav.Link as={Link} to="/store" className='navItem'><FaWarehouse /><span>Store</span></Nav.Link>
          <Nav.Link as={Link} to="/AddToStock" className='navItem'><FaClinicMedical /><span>Add To Stock</span></Nav.Link>
          <Nav.Link as={Link} to="/report" className='navItem'><FaCommentMedical /><span>Report</span></Nav.Link>
          <Nav.Link as={Link} to="/StoreTables" className='navItem'><GiRoundTable /><span>Tables</span></Nav.Link>
          <Gain />
        </Nav>
        </Navbar.Collapse>
        <Navbar.Brand >
        <span id='Gain' className='Gain'>Total Gain : <span className='GainValue'> {gain} $</span></span>
        </Navbar.Brand>
      </Container>
    </Navbar>

//  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
// <Container>
//   <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
//   <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//   <Navbar.Collapse id="responsive-navbar-nav">
//     <Nav className="me-auto">
//       <Nav.Link href="#features">Features</Nav.Link>
//       <Nav.Link href="#pricing">Pricing</Nav.Link>
//     </Nav>
//   </Navbar.Collapse>
// </Container>
// </Navbar>

    // <div className='navbar'>
    //   <Link to={'/'} className='logo'>CO<span>MP</span>A<span>NY</span><span> </span><span>Coffee</span></Link>
    //   <div className='navItems'>
    //     <div className='navItem'>
    //       <FcHome />
    //       <Link to={`/`}> Home</Link>
    //     </div>
    //     <div className='navItem'>
    //       <FaWarehouse />
    //       <Link to={`/store`}> Store</Link>
    //     </div>
    //     <div className='navItem'>
    //       <FaClinicMedical />
    //       <Link to={`/AddToStock`}> Add To Stock</Link>
    //     </div>
    //     <div className='navItem'>
    //       <FaCommentMedical />
    //       <Link to={`/report`}> Report</Link>
    //     </div>
    //     <div className='navItem'>
    //       <GiRoundTable />
    //       <Link to={`/StoreTables`}>Tables</Link>
    //     </div>
    //   </div>

    // </div>
  )
}

export default Navbars
