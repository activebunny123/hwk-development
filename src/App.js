import logo from './logo.svg';
import './App.css';
import dimsumData from "./data.json"
import dimsumItem from './Components/dimsumItem';
import Select from 'react-select'
import cartItem from './Components/cartItem';
import { useState } from "react";

function App() {
  const [cartState, setCartState] = useState({cartitems: [], totalPrice: Number(0)})
  // define new state equivalent to dimsumItem
  const [displaydata, setdisplaydata] = useState(dimsumData);


  const sortbyPrice = () => {
    var cpy = [...displaydata];
    cpy.sort((a, b) => a.price - b.price);
    setdisplaydata(
      cpy
    )
  }

  const resetSort = () => {
    setdisplaydata(dimsumData)
  }

  const addItem = (datum) => {
    if (!cartState.cartitems.some(cartitem => cartitem.name == datum.name)) {
      setCartState( {
        cartitems: [...cartState.cartitems, {
          name: datum.name,
          itemcount: Number(1)
        }],
        totalPrice: Number(cartState.totalPrice) + Number(datum.price)
      })
    } else {
      var idx = cartState.cartitems.findIndex(cartitem => cartitem.name == datum.name);
      var cpy = cartState.cartitems;
      cpy[idx].itemcount = cpy[idx].itemcount + 1;
      setCartState({
        cartitems: cpy,
        totalPrice: Number(cartState.totalPrice) + Number(datum.price)
      })
    }
  }

  const removeItem = (item) => {
    var idx = cartState.cartitems.findIndex(cartitem => cartitem.name == item.name);
    var cpy = [...cartState.cartitems];
    cpy[idx].itemcount = cpy[idx].itemcount - 1;
    if (cpy[idx].itemcount == 0) {
      cpy.splice(idx, 1);
    }
    var itemprice = Number(dimsumData.find(datum => datum.name == item.name).price);
    var pricecpy = Number(cartState.totalPrice);
    pricecpy = pricecpy - itemprice;
    setCartState({
      cartitems: cpy,
      totalPrice: pricecpy
    })
  }

  return (
    <div className="App">
      <div id="title">
        <h1>Golden Dragon Dim Sum Palace</h1>
        <button onClick={() => sortbyPrice()}>sort by Price</button>
        <button onClick={() => resetSort()}>Remove All Sort</button>
      </div>
      <div id="items">
        {displaydata.map((datum) => (
            <div className="dimsumItem">
              {dimsumItem(datum)}
              <button onClick={() => {addItem(datum)}}>Add to Cart</button>
            </div>
          )
        )}
      </div>
      <div id="cart">
        <div id="cart-items-sec">
          <h3>Items</h3>
          <div>
            {cartState.cartitems.map((item) => (
              console.log(cartState),
              <div className="cart-item">
                {cartItem(item)};
                <button onClick={() => removeItem(item)}>Remove One</button>
              </div>
            ))
            }
          </div>
          <div>
            <h3>Total Price: {Math.round(cartState.totalPrice*100)/100}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
