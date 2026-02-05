import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // ----------------------------
  // 🔢 Calculate total amount of all items in cart
  // ----------------------------
  const calculateTotalAmount = () => {
    return cart
      .reduce((total, item) => {
        const price = parseFloat(item.cost.substring(1)); // remove '$'
        return total + price * item.quantity;
      }, 0)
      .toFixed(2);
  };

  // ----------------------------
  // 🛒 Continue Shopping
  // ----------------------------
  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  // ----------------------------
  // ➕ Increment quantity
  // ----------------------------
  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,       // or id if you used id in reducer
        quantity: item.quantity + 1,
      })
    );
  };

  // ----------------------------
  // ➖ Decrement quantity
  // ----------------------------
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          name: item.name,
          quantity: item.quantity - 1,
        })
      );
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // ----------------------------
  // ❌ Remove item
  // ----------------------------
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // ----------------------------
  // 🧮 Calculate subtotal for one item
  // ----------------------------
  const calculateTotalCost = (item) => {
    const unitPrice = parseFloat(item.cost.substring(1));
    return (unitPrice * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>

      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />

            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>

              {/* Quantity Section */}
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>

                <span className="cart-item-quantity-value">{item.quantity}</span>

                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>

              <div className="cart-item-total">
                Total: ${calculateTotalCost(item)}
              </div>

              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>

      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
        <br />
        <button className="get-started-button1">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;