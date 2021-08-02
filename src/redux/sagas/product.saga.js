import { put, takeEvery } from "redux-saga/effects";
import axios from 'axios';
import { REQUEST, SUCCESS, FAILURE, PRODUCT_ACTION } from '../constants';
import { SERVER_API_URL } from './apiUrl';

function* getProductListSaga(action) {
  try {
    const categoryId = action.payload?.categoryId;
    const searchKey = action.payload?.searchKey;
    const result = yield axios({
      method: 'GET',
      url: `${SERVER_API_URL}/products`,
      params: {
        _sort: 'id',
        _order: 'desc',
        ...categoryId && { categoryId },
        ...searchKey && { q: searchKey }
      }
    });
    yield put({
      type: SUCCESS(PRODUCT_ACTION.GET_PRODUCT_LIST),
      payload: {
        data: result.data
      },
    });
  } catch (e) {
    yield put({ type: FAILURE(PRODUCT_ACTION.GET_PRODUCT_LIST), payload: e.message });
  }
}

function* getProductDetailSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios.get(`${SERVER_API_URL}/products/${id}?_expand=category`);
    yield put({
      type: SUCCESS(PRODUCT_ACTION.GET_PRODUCT_DETAIL),
      payload: {
        data: result.data
      },
    });
  } catch (e) {
    yield put({ type: FAILURE(PRODUCT_ACTION.GET_PRODUCT_DETAIL), payload: e.message });
  }
}

function* createProductSaga(action) {
  try {
    const { data } = action.payload;
    const result = yield axios.post(`${SERVER_API_URL}/products`, data);
    yield put({
      type: SUCCESS(PRODUCT_ACTION.CREATE_PRODUCT),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({ type: FAILURE(PRODUCT_ACTION.CREATE_PRODUCT), payload: e.message });
  }
}

function* editProductSaga(action) {
  try {
    const { id, data } = action.payload;
    const result = yield axios.patch(`${SERVER_API_URL}/products/${id}`, data);
    yield put({
      type: SUCCESS(PRODUCT_ACTION.EDIT_PRODUCT),
      payload: {
        data: result.data,
      }
    });
  } catch (e) {
    yield put({ type: FAILURE(PRODUCT_ACTION.EDIT_PRODUCT), payload: e.message });
  }
}

function* deleteProductSaga(action) {
  try {
    const { id } = action.payload;
    yield axios.delete(`${SERVER_API_URL}/products/${id}`);
    yield put({
      type: SUCCESS(PRODUCT_ACTION.DELETE_PRODUCT),
      payload: { id }
    });
  } catch (e) {
    yield put({ type: FAILURE(PRODUCT_ACTION.DELETE_PRODUCT), payload: e.message });
  }
}

export default function* productSaga() {
  yield takeEvery(REQUEST(PRODUCT_ACTION.GET_PRODUCT_LIST), getProductListSaga);
  yield takeEvery(REQUEST(PRODUCT_ACTION.GET_PRODUCT_DETAIL), getProductDetailSaga);
  yield takeEvery(REQUEST(PRODUCT_ACTION.CREATE_PRODUCT), createProductSaga);
  yield takeEvery(REQUEST(PRODUCT_ACTION.EDIT_PRODUCT), editProductSaga);
  yield takeEvery(REQUEST(PRODUCT_ACTION.DELETE_PRODUCT), deleteProductSaga);
}
