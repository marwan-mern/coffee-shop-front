import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer';
import Navbars from './components/Navbars';
import Home from './components/Home';
import Store from './components/Store';
import AddToStock from './components/AddToStock';
import Report from './components/Report';
import Tables from './components/Tables';
// import AddProduct from './components/AddProduct';





function App() {
  return (
    <div className="App">
            <img className='coverImg' alt='Cover' src='./assets/Cover.jpg' />
      <BrowserRouter>
        <Navbars />
        <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/store" exact element={<Store/>} />
          <Route path="/AddToStock" exact element={<AddToStock/>} />
          <Route path="/report" exact element={<Report/>} />
          <Route path="/StoreTables" exact element={<Tables/>} />
          {/* <Route path="/AddProduct" exact element={<AddProduct/>} /> */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
