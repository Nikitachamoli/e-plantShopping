import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },

  reducers: {

    // ✅ ADD ITEM TO CART
    addItem: (state, action) => {
      const plant = action.payload;

      const existingItem = state.items.find(
        (item) => item.name === plant.name
      );

      if (existingItem) {
        existingItem.quantity += 1;     // increase quantity
      } else {
        state.items.push({ ...plant, quantity: 1 }); 
      }
    },

    // ✅ REMOVE ITEM FROM CART
    removeItem: (state, action) => {
      const plantName = action.payload; // name of plant to remove
      state.items = state.items.filter(
        (item) => item.name !== plantName
      );
    },

    // ✅ UPDATE QUANTITY OF CART ITEM
    updateQuantity: (state, action) => {
      const { name, amount } = action.payload;

      const item = state.items.find(
        (item) => item.name === name
      );

      if (item) {
        item.quantity = amount;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;