import './App.css';
import { useState } from 'react';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import Footer from './components/Layout/Footer';
import CartContextProvider from './components/Store/CartContextProvider';
function App() {
  const [isShowCart,setShowCart]=useState(false);
  const showCartHandler=()=>{
    setShowCart(true);
  }
  const hideCartHandler=()=>{
    setShowCart(false);
  }
  return (
    <CartContextProvider>
     {isShowCart && <Cart onHideCart={hideCartHandler}/>}
      <Header onShowCart={showCartHandler}/>
      <Meals/>
      <Footer/>
    </CartContextProvider>
  );
}

export default App;
