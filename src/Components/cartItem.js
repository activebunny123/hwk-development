import addfromCart from './../App.js';
import removeItem from './../App.js';
import cartState from './../App.js';
import './cartItem.css';

export default function cartItem(item) {
    return (
        <div class="cartum">
            {item.name}
            <div className="cart-op">
                <button class="cart-button" id="add" onClick={() => addfromCart(item)}>+</button>
                <h4>{item.itemcount}</h4>
                <button class="cart-button" id="remove" onClick={() => removeItem(item,1)}>-</button>
                <button class="cart-button" id="remove-all" onClick={() => removeItem(item, Number(cartState.cartitems.find(cartitem => cartitem.name == item.name).itemcount))}>Remove All</button>
            </div>
        </div>
    )
}