import { Action } from 'redux';
export interface Product {
    id: number;
    category: string;
    brand: string;
    shirtSize: string[];
    shoeSize: string[];
    image: string;
    price: string;
    name: string;
    color: string[];
    description: string;
    fabricMaterial: string[];
    soleMaterial: string[];
    jewelleryType: string;
    jewelleryMaterial: string[];
    quantity: number;
    singleProductPrice: string;
}

export interface Pagination {
    total: number;
    pageSize: number;
    page: number;
}
export interface StringArray {
    [index: string]: string;
}
export interface Filters {
    category: string[];
    brand: string[];
    shirtSize: string[];
    shoeSize: string[];
    color: string[];
    fabricMaterial: string[];
    soleMaterial: string[];
    jewelleryType: string[];
    jewelleryMaterial: string[];
    minPrice: string;
    maxPrice: string;
}

export interface ProductState {
    loading: boolean;
    products: Product[];
    selectedProduct: Product | null;
    error: string | null;
    addedToCart: Product[];
    addedToWishlist: Product[];
    selectedCategory: string;
    selectedFilter: Filters;
    pagination: Pagination;
    cartTotalAmount: string;
    currentFilter: string;
}

export const PRODUCTS_FETCH_REQUEST = 'products/FETCH_REQUEST';
export const PRODUCTS_FETCH_RECEIVED = 'products/FETCH_RECEIVED';
export const PRODUCTS_CATEGORY_FILTER = 'products/PRODUCTS_CATEGORY_FILTER';
export const PRODUCTS_FILTER = 'products/PRODUCTS_FILTER';
export const ADD_TO_CART = 'products/ADD_TO_CART';
export const VIEW_CART_ITEM = 'products/VIEW_CART_ITEM';
export const REMOVE_CART_ITEM = 'products/REMOVE_CART_ITEM';
export const ADD_TO_WISHLIST = 'products/ADD_TO_WISHLIST';
export const VIEW_WISHLIST_ITEM = 'products/VIEW_WISHLIST_ITEM';
export const REMOVE_WISHLIST_ITEM = 'products/REMOVE_WISHLIST_ITEM';
export const UPDATE_TOTAL_AMOUNT = 'products/UPDATE_TOTAL_AMOUNT';
export const REQUEST_ERROR = 'products/ERROR';

export interface RequestProductsFetchAction extends Action {
    type: typeof PRODUCTS_FETCH_REQUEST;
    payload: { pagination: Pagination };
}
export interface ReceivedProductsFetchAction extends Action {
    type: typeof PRODUCTS_FETCH_RECEIVED;
    payload: { products: Product[]; pagination: Pagination };
}
export interface ProductsCategoryFilter extends Action {
    type: typeof PRODUCTS_CATEGORY_FILTER;
    payload: { value: string };
}
export interface ProductsFilter extends Action {
    type: typeof PRODUCTS_FILTER;
    payload: { filterType: string; filterValue: string };
}
export interface ProductsAddedToCart extends Action {
    type: typeof ADD_TO_CART;
    payload: { product: Product };
}
export interface ProductsInCart extends Action {
    type: typeof VIEW_CART_ITEM;
    payload: { cartItemList: Product[] };
}
export interface ProductsRemoveFromCart extends Action {
    type: typeof REMOVE_CART_ITEM;
    payload: { product: Product };
}
export interface ProductsAddedToWishlist extends Action {
    type: typeof ADD_TO_WISHLIST;
    payload: { product: Product };
}
export interface ProductsInWishlist extends Action {
    type: typeof VIEW_WISHLIST_ITEM;
    payload: { wishlist: Product[] };
}
export interface ProductsRemoveFromWishlist extends Action {
    type: typeof REMOVE_WISHLIST_ITEM;
    payload: { product: Product };
}
export interface TotalAmountUpdated extends Action {
    type: typeof UPDATE_TOTAL_AMOUNT;
    payload: { product: Product; value: number; counterType: string; counter: number };
}
export interface ErrorRequestAction extends Action {
    type: typeof REQUEST_ERROR;
    payload: { error: string };
}

export type ProductActionTypes =
    | RequestProductsFetchAction
    | ReceivedProductsFetchAction
    | ProductsCategoryFilter
    | ProductsFilter
    | ProductsAddedToCart
    | ProductsInCart
    | ProductsRemoveFromCart
    | ProductsAddedToWishlist
    | ProductsInWishlist
    | ProductsRemoveFromWishlist
    | TotalAmountUpdated
    | ErrorRequestAction;
