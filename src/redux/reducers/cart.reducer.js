import { createReducer } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { CART_ACTION } from '../constants';

const initialState = {
  cartList: {
    data: [],
    load: false,
    error: null,
  }
}

const cartReducer = createReducer(initialState, {
  [CART_ACTION.GET_CART_LIST]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      cartList: {
        ...state.cartList,
        data,
      },
    }
  },

  [CART_ACTION.ADD_TO_CART]: (state, action) => {
    const { id, name, price, count } = action.payload;
    const cartData = [...state.cartList.data];
    const cartIndex = cartData.findIndex((item) => item.productId === id);
    if (cartIndex !== -1) {
      cartData.splice(cartIndex, 1, {
        ...cartData[cartIndex],
        count: cartData[cartIndex].count + count,
      });
      localStorage.setItem('cart', JSON.stringify(cartData))
      return {
        ...state,
        cartList: {
          ...state.cartList,
          data: cartData,
        },
      }
    } else {
      const newCartData = [
        ...cartData,
        {
          id: uuidv4(),
          productId: id,
          name,
          price,
          count,
        }
      ]
      localStorage.setItem('cart', JSON.stringify(newCartData));
      return {
        ...state,
        cartList: {
          ...state.cartList,
          data: newCartData,
        },
      }
    }
  },

  [CART_ACTION.MINUS_ITEM_COUNT]: (state, action) => {
    const { index } = action.payload;
    const newCartData = [...state.cartList.data];
    newCartData.splice(index, 1, {
      ...newCartData[index],
      count: newCartData[index].count - 1,
    });
    localStorage.setItem('cart', JSON.stringify(newCartData));
    return {
      ...state,
      cartList: {
        ...state.cartList,
        data: newCartData,
      },
    }
  },

  [CART_ACTION.PLUS_ITEM_COUNT]: (state, action) => {
    const { index } = action.payload;
    const newCartData = [...state.cartList.data];
    newCartData.splice(index, 1, {
      ...newCartData[index],
      count: newCartData[index].count + 1,
    });
    localStorage.setItem('cart', JSON.stringify(newCartData));
    return {
      ...state,
      cartList: {
        ...state.cartList,
        data: newCartData,
      },
    }
  },

  [CART_ACTION.DELETE_CART_ITEM]: (state, action) => {
    const { index } = action.payload;
    const newCartData = [...state.cartList.data];
    newCartData.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(newCartData));
    return {
      ...state,
      cartList: {
        ...state.cartList,
        data: newCartData,
      },
    }
  },

  [CART_ACTION.CLEAR_CART_LIST]: (state, action) => {
    localStorage.removeItem('cart');
    return {
      ...state,
      cartList: {
        ...state.cartList,
        data: [],
      },
    }
  },
});

export default cartReducer;
