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
    ProductState,
} from './types';

const initialState: ProductState = {
    loading: false,
    products: [],
    selectedProduct: null,
    error: null,
    selectedFilter: {
        category: [],
        brand: [],
        shirtSize: [],
        shoeSize: [],
        color: [],
        fabricMaterial: [],
        soleMaterial: [],
        jewelleryType: [],
        jewelleryMaterial: [],
        minPrice: '$0.0',
        maxPrice: '$100.0',
    },
    currentFilter: '',
    selectedCategory: '',
    addedToCart: [],
    pagination: {
        total: 0,
        page: 1,
        pageSize: 12,
    },
    addedToWishlist: [],
    cartTotalAmount: '$0.0',
};

export function productReducer(state = initialState, action: ProductActionTypes): ProductState {
    switch (action.type) {
        case PRODUCTS_FETCH_REQUEST:
            return { ...state, loading: true };
        case PRODUCTS_FETCH_RECEIVED:
            return {
                ...state,
                loading: false,
                products: [...action.payload.products],
                pagination: { ...action.payload.pagination },
            };
        case PRODUCTS_CATEGORY_FILTER:
            return {
                ...state,
                loading: false,
                selectedCategory: action.payload.value,
            };
        case PRODUCTS_FILTER:
            const selectedFilter = { ...state.selectedFilter };
            if (action.payload.filterType === 'minPrice' || action.payload.filterType === 'maxPrice') {
                action.payload.filterType === 'minPrice'
                    ? (selectedFilter.minPrice = action.payload.filterValue)
                    : (selectedFilter.maxPrice = action.payload.filterValue);
            } else {
                // @ts-ignore
                if (selectedFilter[`${action.payload.filterType}`].includes(action.payload.filterValue)) {
                    // @ts-ignore
                    const index = selectedFilter[`${action.payload.filterType}`].indexOf(action.payload.filterValue);
                    // @ts-ignore

                    selectedFilter[`${action.payload.filterType}`].splice(index, 1);
                } else {
                    // @ts-ignore
                    selectedFilter[`${action.payload.filterType}`].push(action.payload.filterValue);
                }
            }

            return {
                ...state,
                loading: false,
                selectedFilter: { ...selectedFilter },
                currentFilter: action.payload.filterType,
            };

        case ADD_TO_CART:
            let cartItems = [...state.addedToCart];
            const index = cartItems.findIndex(product => product.id === action.payload.product.id);
            if (index === -1) {
                cartItems.push({ ...action.payload.product });
            }
            return {
                ...state,
                loading: false,
                addedToCart: [...cartItems],
            };
        case VIEW_CART_ITEM:
            const temp = [...action.payload.cartItemList];
            let tempPrice = 0.0;
            temp.map(item => {
                const itemPrice = parseFloat(item.singleProductPrice.replace('$', ''));
                tempPrice += itemPrice;
            });
            const totalAmountToPay = '$'.concat(tempPrice.toFixed(2).toString());

            return {
                ...state,
                loading: false,
                addedToCart: [...action.payload.cartItemList],
                cartTotalAmount: totalAmountToPay,
            };
        case REMOVE_CART_ITEM:
            let cartItem = [...state.addedToCart];
            const foundIndex: number = cartItem.findIndex(item => item.id === action.payload.product.id);
            if (foundIndex === -1) {
                cartItem;
            } else {
                cartItem.splice(foundIndex, 1);
            }
            let tempAmount = 0.0;

            cartItem.map(item => {
                const itemPrice = parseFloat(item.price.replace('$', ''));
                tempAmount += itemPrice;
            });

            const totalCartAmount = '$'.concat(tempAmount.toFixed(2).toString());

            return {
                ...state,
                loading: false,
                addedToCart: [...cartItem],
                cartTotalAmount: totalCartAmount,
            };
        case ADD_TO_WISHLIST:
            const wishlistItems = [...state.addedToWishlist];
            const indexFounded = wishlistItems.findIndex(product => product.id === action.payload.product.id);
            if (indexFounded === -1) {
                wishlistItems.push({ ...action.payload.product });
            }
            return {
                ...state,
                loading: false,
                addedToWishlist: [...wishlistItems],
            };
        case VIEW_WISHLIST_ITEM:
            return {
                ...state,
                loading: false,
                addedToWishlist: [...action.payload.wishlist],
            };
        case REMOVE_WISHLIST_ITEM:
            let wishlistItem = [...state.addedToWishlist];
            const foundedIndex: number = wishlistItem.findIndex(item => item.id === action.payload.product.id);
            if (foundedIndex === -1) {
                wishlistItem;
            } else {
                wishlistItem.splice(foundedIndex, 1);
            }
            return {
                ...state,
                loading: false,
                addedToWishlist: [...wishlistItem],
            };
        case UPDATE_TOTAL_AMOUNT:
            const prevAmountsString = state.cartTotalAmount;
            const prevAmount = parseFloat(prevAmountsString.replace('$', ''));
            let tempTotal = 0;
            if (action.payload.counterType === 'increment') {
                tempTotal = prevAmount + action.payload.value;
            } else {
                tempTotal = prevAmount - action.payload.value;
            }
            const totalAmount = '$'.concat(tempTotal.toFixed(2).toString());
            return {
                ...state,
                loading: false,
                cartTotalAmount: totalAmount,
            };
        case REQUEST_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };
        default:
            return state;
    }
}
