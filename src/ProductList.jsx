import React, { useState, useEffect } from 'react';
import './ProductList.css';
import CartItem from './CartItem';

// ✅ Redux
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from '../CartSlice';

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const [showPlants, setShowPlants] = useState(false);

  // ✅ Local map to disable "Add to Cart" once added
  const [addedToCart, setAddedToCart] = useState({});

  // ✅ Redux hooks
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // ✅ Keep local addedToCart in sync with Redux cart
  useEffect(() => {
    const mapped = {};
    cartItems.forEach((it) => {
      mapped[it.name] = true;
    });
    setAddedToCart(mapped);
  }, [cartItems]);

  const plantsArray = [
    {
      category: 'Air Purifying Plants',
      plants: [
        {
          name: 'Snake Plant',
          image:
            'https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg',
          description:
            'Produces oxygen at night, improving air quality.',
          cost: '$15',
        },
        {
          name: 'Spider Plant',
          image:
            'https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg',
          description:
            'Filters formaldehyde and xylene from the air.',
          cost: '$12',
        },
        {
          name: 'Peace Lily',
          image:
            'https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg',
          description:
            'Removes mold spores and purifies the air.',
          cost: '$18',
        },
        {
          name: 'Boston Fern',
          image:
            'https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg',
          description:
            'Adds humidity to the air and removes toxins.',
          cost: '$20',
        },
        {
          name: 'Rubber Plant',
          image:
            'https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg',
          description:
            'Easy to care for and effective at removing toxins.',
          cost: '$17',
        },
        {
          name: 'Aloe Vera',
          image:
            'https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg',
          description:
            'Purifies the air and has healing properties for skin.',
          cost: '$14',
        },
      ],
    },
    // You can add more categories here…
  ];

  // ✅ Inline styles (kept as in your file; fixed alignItems typo)
  const styleObj = {
    backgroundColor: '#4CAF50',
    color: '#fff!important',
    padding: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '20px',
  };

  const styleObjUl = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '1100px',
  };

  const styleA = {
    color: 'white',
    fontSize: '30px',
    textDecoration: 'none',
  };

  // ✅ Navigation handlers
  const handleHomeClick = (e) => {
    e.preventDefault();
    onHomeClick();
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowPlants(true);
    setShowCart(false);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  // ✅ Task 4: Add to cart via Redux
  const handleAddToCart = (plant) => {
    // Dispatch full product object; your slice will add quantity=1 or increment if exists
    dispatch(addItem(plant));
    // Local badge toggle – also kept for immediate visual feedback
    setAddedToCart((prev) => ({
      ...prev,
      [plant.name]: true,
    }));
  };

  // ✅ Task 4: total quantity badge (from Redux)
  const calculateTotalQuantity = () => {
    return cartItems
      ? cartItems.reduce((total, item) => total + item.quantity, 0)
      : 0;
  };

  return (
    <div>
      {/* Navbar */}
      <div className="navbar" style={styleObj}>
        <div className="tag">
          <div className="luxury">
            <img
              src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png"
              alt="Paradise Nursery Logo"
            />
            <a href="/" onClick={handleHomeClick}>
              <div>
                <h3 style={{ color: 'white' }}>Paradise Nursery</h3>
                <i style={{ color: 'white' }}>Where Green Meets Serenity</i>
              </div>
            </a>
          </div>
        </div>

        <div style={styleObjUl}>
          <div>
            <a href="#" onClick={handlePlantsClick} style={styleA}>
              Plants
            </a>
          </div>

          {/* Cart with badge */}
          <div>
            <a href="#" onClick={handleCartClick} style={styleA}>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <h1 className="cart" style={{ margin: 0 }}>🛒</h1>
                <span
                  aria-label="Cart items count"
                  style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-12px',
                    background: 'red',
                    color: 'white',
                    borderRadius: '50%',
                    padding: '3px 8px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    lineHeight: 1,
                    minWidth: '22px',
                    textAlign: 'center',
                  }}
                >
                  {calculateTotalQuantity()}
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Body */}
      {!showCart ? (
        // ⭐ Product cards
        <div className="product-grid">
          {plantsArray.map((categoryObj, catIndex) => (
            <div key={catIndex}>
              <h2>{categoryObj.category}</h2>

              <div className="plants-container">
                {categoryObj.plants.map((plant, index) => {
                  const alreadyInCart =
                    addedToCart[plant.name] ||
                    cartItems.some((ci) => ci.name === plant.name);

                  return (
                    <div className="product-card" key={index}>
                      <img
                        src={plant.image}
                        alt={plant.name}
                        className="product-image"
                      />
                      <h3>{plant.name}</h3>
                      <p>{plant.description}</p>
                      <p>
                        <strong>Cost:</strong> {plant.cost}
                      </p>

                      <button
                        onClick={() => handleAddToCart(plant)}
                        disabled={alreadyInCart}
                        className={alreadyInCart ? 'btn-disabled' : ''}
                        aria-disabled={alreadyInCart}
                        aria-label={
                          alreadyInCart
                            ? `${plant.name} already added to cart`
                            : `Add ${plant.name} to cart`
                        }
                      >
                        {alreadyInCart ? 'Added to Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;