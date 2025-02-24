import { takeEvery, put, fork, call } from 'redux-saga/effects';
import {
    RequestProductsFetchAction,
    PRODUCTS_FETCH_REQUEST,
    ProductsAddedToCart,
    ADD_TO_CART,
    UPDATE_TOTAL_AMOUNT,
    REMOVE_CART_ITEM,
    ADD_TO_WISHLIST,
    REMOVE_WISHLIST_ITEM,
    ProductsRemoveFromCart,
    ProductsAddedToWishlist,
    ProductsRemoveFromWishlist,
    TotalAmountUpdated,
} from './types';
import { receivedFetchProducts, errorRequestProduct } from './actions';
import { get } from '../../services';
import {
    setCartItems,
    removeCartItems,
    updateTotalAmount,
    setWishlistItems,
    removeWishlistItems,
} from '../../utils/common';

export function* fetchProducts(action: RequestProductsFetchAction) {
    const payload = action.payload;
    const response = yield call(get, '/products.json');
    if (response.success) {
        let pagination = { ...payload.pagination };
        pagination.total = parseInt(response.headers['x-total-count'], 10);
        yield put(receivedFetchProducts(response.data, pagination));
    } else {
        yield put(errorRequestProduct(response.error));
    }
}
export function* addCartItems(action: ProductsAddedToCart) {
    yield call(setCartItems, action.payload.product);
}
export function* updateCartItems(action: TotalAmountUpdated) {
    yield call(updateTotalAmount, action.payload.product, action.payload.value, action.payload.counter);
}
export function* removeCartItemsList(action: ProductsRemoveFromCart) {
    yield call(removeCartItems, action.payload.product);
}
export function* addWishlistItems(action: ProductsAddedToWishlist) {
    yield call(setWishlistItems, action.payload.product);
}
export function* removeWishlist(action: ProductsRemoveFromWishlist) {
    yield call(removeWishlistItems, action.payload.product);
}
export function* watchRequests() {
    yield takeEvery(PRODUCTS_FETCH_REQUEST, fetchProducts);
    yield takeEvery(ADD_TO_CART, addCartItems);
    yield takeEvery(UPDATE_TOTAL_AMOUNT, updateCartItems);

    yield takeEvery(REMOVE_CART_ITEM, removeCartItemsList);
    yield takeEvery(ADD_TO_WISHLIST, addWishlistItems);
    yield takeEvery(REMOVE_WISHLIST_ITEM, removeWishlist);
}

export default function* root() {
    yield fork(watchRequests);
}
