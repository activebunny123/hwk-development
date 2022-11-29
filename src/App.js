import './App.css';
import dimsumData from "./data.json"
import dimsumItem from './Components/dimsumItem';
import cartItem from './Components/cartItem';
import { useState } from "react";
// imports for radio select
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
// imports for slider
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

function App() {
  const [cartState, setCartState] = useState({cartitems: [], totalPrice: Number(0)})
  // define new state equivalent to dimsumItem
  const [displaydata, setdisplaydata] = useState(dimsumData)
  const sortbyPriceLH = (cpy) => {
    return(cpy.sort((a, b) => a.price - b.price))
  }
  const sortbyPriceHL = (cpy) => {
    return(cpy.sort((a, b) => b.price - a.price))
  }

  const sortbyAZ = (cpy) => {
    return(cpy.sort((a,b) => a.name.localeCompare(b.name)))
  }

  //Reset every filter to default
  const resetAll = () => {
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

  const removeItem = (item,num) => {
    var idx = cartState.cartitems.findIndex(cartitem => cartitem.name == item.name);
    var cpy = [...cartState.cartitems];
    cpy[idx].itemcount = cpy[idx].itemcount - num;
    if (cpy[idx].itemcount == 0) {
      cpy.splice(idx, 1);
    }
    var itemprice = Number(dimsumData.find(datum => datum.name == item.name).price);
    var pricecpy = Number(cartState.totalPrice);
    pricecpy = pricecpy - num*itemprice;
    setCartState({
      cartitems: cpy,
      totalPrice: pricecpy
    })
  }

  const addfromCart = (item) => {
    var idx = cartState.cartitems.findIndex(cartitem => cartitem.name == item.name);
    var cpy = [...cartState.cartitems];
    cpy[idx].itemcount = cpy[idx].itemcount + 1;
    var itemprice = Number(dimsumData.find(datum => datum.name == item.name).price);
    var pricecpy = Number(cartState.totalPrice);
    pricecpy = pricecpy + itemprice;
    setCartState({
      cartitems: cpy,
      totalPrice: pricecpy
    })
  }

  const methods = [
    'steamed',
    'baked',
    'fried'
  ];

  const tastes = [
    'savory',
    'spicy',
    'sweet'
  ];

  const sortFunctionalities = [
    'price low to high',
    'price high to low',
    'alphabetical A-Z'
  ]

  // // -------------------- DROP-DOWN FILTERS ----------------------
  // // Radio Select
  const [methodFilter, setmethodFilter] = useState('all');   
  const [tasteFilter, settasteFilter] = useState('all');
  const [sortFunc, setsortFunc] = useState('none');
  const [priceRange, setpriceRange] = useState([3,9]);

  function methodradioselect() {
    const handleChange = (event) => {
      console.log(event.target.value);
      setmethodFilter(event.target.value);
    }
    return (
      <div>
        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">Select Cooking Method</FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={methodFilter}
            onChange={handleChange}
            row
          >
            <FormControlLabel value='all' control={<Radio size="small" onChange={handleChange}/>} label='all' />
            {methods.map((method) => (<FormControlLabel value={method} control={<Radio size="small" onChange={handleChange}/>} label={method} />))}
            {/* <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" /> */}
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
  function tasteradioselect() {
    const handleChange = (event) => {
      settasteFilter(event.target.value)
    }
    return (
      <div>
        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">Select Taste</FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={tasteFilter}
            onChange={handleChange}
            row
          >
            <FormControlLabel value='all' control={<Radio size="small"/>} label='all' />
            {tastes.map((taste) => (<FormControlLabel value={taste} control={<Radio size="small"/>} label={taste} />))}
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
  function sortradioselect() {
    const handleChange = (event) => {
      setsortFunc(event.target.value)
    }
    return (
      <div>
        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">Sort</FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={sortFunc}
            onChange={handleChange}
            row
          >
            <FormControlLabel value='none' control={<Radio size="small"/>} label='none' />
            {sortFunctionalities.map((func) => (<FormControlLabel value={func} control={<Radio size="small"/>} label={func} />))}
          </RadioGroup>
        </FormControl>
      </div>
    );
  }

  function priceSlider() {
    const handleChange = (event, newValue) => {
      setpriceRange(newValue);
    };
    return (
      <Box sx={{ width: 300 }}>
        <Slider
          aria-label="Price"
          value={priceRange}
          //getAriaValueText={valuetext}
          valueLabelDisplay="auto"
          onChange={handleChange}
          step={0.5}
          marks
          min={3}
          max={9}
          size="small"
        />
      </Box>
    );
  }

  function applyFilters() {
    setdisplaydata(dimsumData);
    var cpy = [...dimsumData] 
    if (methodFilter != 'all') {cpy = cpy.filter(datum => datum.method == methodFilter);}
    if (tasteFilter != 'all') {cpy = cpy.filter(datum => datum.taste == tasteFilter)}
    cpy = cpy.filter(datum => datum.price >= priceRange[0] && datum.price <= priceRange[1])
    if (sortFunc != 'none') {
      if (sortFunc == 'price low to high') {cpy = sortbyPriceLH(cpy)}
      if (sortFunc == 'price high to low') {cpy = sortbyPriceHL(cpy)}
      if (sortFunc ==  'alphabetical A-Z') {cpy = sortbyAZ(cpy)}
    }
    setdisplaydata(cpy);
  }

  function display(){
    if(displaydata.length > 0){
      return(
        displaydata.map((datum) => (
          <div className="dimsumItem">
            {dimsumItem(datum)}
            <button id="btn-addtoCart" onClick={() => {addItem(datum)}}>Add to Cart</button>
          </div>
        )
      )
      )
    }
    else {
      return (
        <div>No Such Item o(╥﹏╥)o</div>
      )
    }
  }
  //applyFilters();
  return (
    <div className="App">
      <div id="title">
        <h1>Golden Dragon Dim Sum Palace</h1>
        <div id="filter-container">
          <div class="filter">{methodradioselect()}</div>
          <div class="filter">{tasteradioselect()}</div>
          <div class="filter">{sortradioselect()}</div>
          <div class="filter" id="pricesliderdiv">
            <div>Select Price Range</div>
            <div id="priceslider">{priceSlider()}</div>
          </div>
        </div>
        <div id="title-buttons">
            <button class="title-button" onClick={() => applyFilters()}>Apply Filters</button>
            <button class="title-button" onClick={() => resetAll()}>Remove All Filters</button>
          </div>
      </div>
      <div id="grid-container">
        <div id="menu">
          <h2>Menu Items</h2>
          <div id="items">
            {console.log(displaydata)}
            {display()}
          </div>
        </div>
        <div id="cart">
          <h2>Your Cart</h2>
          <div id="cart-items-sec">
            <h3 class="subtitle">Item(s)</h3>
            <div>
              {cartState.cartitems.map((item) => (
                <div className="cart-item">
                  {cartItem(item)}
                  <div className="cart-op">
                    <button class="cart-button" id="add" onClick={() => addfromCart(item)}>+</button>
                    <h4>{item.itemcount}</h4>
                    <button class="cart-button" id="remove" onClick={() => removeItem(item,1)}>-</button>
                    <button class="cart-button" id="remove-all" onClick={() => removeItem(item, Number(cartState.cartitems.find(cartitem => cartitem.name == item.name).itemcount))}>Remove All</button>
                  </div>
                </div>
              ))
              }
            </div>
            <div>
              <h3 class="subtitle">Total Price: ${Math.round(cartState.totalPrice*100)/100}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
