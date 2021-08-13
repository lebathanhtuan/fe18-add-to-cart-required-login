import { createAction } from '@reduxjs/toolkit';
import { CART_ACTION } from '../constants';

export const getCartListAction = createAction(CART_ACTION.GET_CART_LIST);
export const addToCartAction = createAction(CART_ACTION.ADD_TO_CART);
export const plusItemCountAction = createAction(CART_ACTION.PLUS_ITEM_COUNT);
export const minusItemCountAction = createAction(CART_ACTION.MINUS_ITEM_COUNT);
export const deleteCartItemAction = createAction(CART_ACTION.DELETE_CART_ITEM);
export const clearCartListAction = createAction(CART_ACTION.CLEAR_CART_LIST);
