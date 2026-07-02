import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './UI Pages/HomePages/Home.jsx';
import StockPage from './UI Pages/StockPages/Stock.jsx';
import StockCategory from './UI Pages/StockPages/StocksOfParticularCategory/StocksOfParticularCategory.jsx';
import ParticularStock from './UI Pages/StockPages/ParticularStockUI/ParticularStockUI.jsx';
import LogIn from './UI Pages/OtherPages/Login.jsx';
import SignUp from './UI Pages/OtherPages/SignUp.jsx';
import AddMoney from './UI Pages/OtherPages/AddMoney.jsx';
import Holdings from './UI Pages/OtherPages/Holdings.jsx';
import AllOrders from './UI Pages/OtherPages/AllOrders.jsx';
import ReportError from './UI Pages/OtherPages/ReportBug.jsx';
import SearchedStock from './UI Pages/OtherPages/SearchedStockDisplay.jsx';
import Learn from './UI Pages/OtherPages/LearnPage.jsx';
import About from './UI Pages/OtherPages/AboutPage.jsx';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/stocks' element={<StockPage/>} />
        <Route path='/stocks/category' element={<StockCategory/>} />
        {/*<Route path='/stocks/category/stock' element={<ParticularStock/>} />*/}
        <Route path="/stock/:id" element={<ParticularStock />} />
        <Route path='/login' element={<LogIn/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/addmoney' element={<AddMoney/>}/>
        <Route path='/holdings' element={ <Holdings/> }/>
        <Route path='/allorders' element={ <AllOrders/> }/>
        <Route path='/reporterror' element={ <ReportError/> }/>
        <Route path='/searched-stock' element={ <SearchedStock/> }/>
        <Route path='/learn' element={ <Learn/> }/>
        <Route path='/about' element={ <About/> }/>
      </Routes>
    </Router>
  )
}

export default App