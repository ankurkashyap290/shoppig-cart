import {
    Product,
    PRODUCTS_FETCH_REQUEST,
    PRODUCTS_FETCH_RECEIVED,
    PRODUCTS_CATEGORY_FILTER,
    PRODUCTS_FILTER,
    ADD_TO_CART,
    VIEW_CART_ITEM,
    REMOVE_CART_ITEM,
    ADD_TO_WISHLIST,
    VIEW_WISHLIST_ITEM,
    REMOVE_WISHLIST_ITEM,
    UPDATE_TOTAL_AMOUNT,
    REQUEST_ERROR,
    ProductActionTypes,
    Pagination,
} from './types';

export function requestFetchProducts(pagination: Pagination): ProductActionTypes {
    return {
        type: PRODUCTS_FETCH_REQUEST,
        payload: { pagination },
    };
}
export function receivedFetchProducts(products: Product[], pagination: Pagination): ProductActionTypes {
    return {
        type: PRODUCTS_FETCH_RECEIVED,
        payload: { products, pagination },
    };
}
export function productsCategoryFilter(value: string): ProductActionTypes {
    return {
        type: PRODUCTS_CATEGORY_FILTER,
        payload: { value },
    };
}
export function productsFilter(filterType: string, filterValue: string): ProductActionTypes {
    return {
        type: PRODUCTS_FILTER,
        payload: { filterType, filterValue },
    };
}
export function addToCart(product: Product): ProductActionTypes {
    return {
        type: ADD_TO_CART,
        payload: { product },
    };
}
export function viewCartItem(cartItemList: Product[]): ProductActionTypes {
    return {
        type: VIEW_CART_ITEM,
        payload: { cartItemList },
    };
}
export function removeCartItem(product: Product): ProductActionTypes {
    return {
        type: REMOVE_CART_ITEM,
        payload: { product },
    };
}
export function addToWishlist(product: Product): ProductActionTypes {
    return {
        type: ADD_TO_WISHLIST,
        payload: { product },
    };
}
export function viewWishlistItem(wishlist: Product[]): ProductActionTypes {
    return {
        type: VIEW_WISHLIST_ITEM,
        payload: { wishlist },
    };
}
export function removeWishlistItem(product: Product): ProductActionTypes {
    return {
        type: REMOVE_WISHLIST_ITEM,
        payload: { product },
    };
}
export function updateTotalAmount(
    product: Product,
    value: number,
    counterType: string,
    counter: number,
): ProductActionTypes {
    return {
        type: UPDATE_TOTAL_AMOUNT,
        payload: { product, value, counterType, counter },
    };
}
export function errorRequestProduct(error: string): ProductActionTypes {
    return {
        type: REQUEST_ERROR,
        payload: { error },
    };
}
