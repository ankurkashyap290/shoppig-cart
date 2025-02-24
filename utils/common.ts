import { Product } from '../redux/products/types';

export function setCartItems(product: Product) {
    let cartItems = JSON.parse(localStorage.getItem('cart-items') || '[]');
    const index = cartItems.findIndex((item: Product) => item.id === product.id);
    if (index === -1) {
        const tempProduct = { ...product, quantity: 1, singleProductPrice: product.price };
        cartItems.push({ ...tempProduct });
        localStorage.setItem('cart-items', JSON.stringify(cartItems));
        return true;
    }
}
export function updateTotalAmount(product: Product, price: number, quantity: number) {
    let cartItems = JSON.parse(localStorage.getItem('cart-items') || '[]');
    const index = cartItems.findIndex((item: Product) => item.id === product.id);

    if (index != -1) {
        cartItems.splice(index, 1);

        const tempProduct = {
            ...product,
            quantity: quantity,
            singleProductPrice: '$'.concat((price * quantity).toFixed(2).toString()),
        };
        cartItems.push({ ...tempProduct });
        localStorage.setItem('cart-items', JSON.stringify(cartItems));
        return true;
    }
}

export function removeCartItems(product: Product) {
    let cartItems = JSON.parse(localStorage.getItem('cart-items') || '[]');
    let found = cartItems.findIndex((item: Product) => item.id === product.id);
    if (found === -1) {
        cartItems;
    } else {
        cartItems.splice(found, 1);
    }
    localStorage.setItem('cart-items', JSON.stringify(cartItems));
    return true;
}

export function setWishlistItems(product: Product) {
    let wishlistItems = JSON.parse(localStorage.getItem('wishlist-items') || '[]');
    const index = wishlistItems.findIndex((item: Product) => item.id === product.id);
    if (index === -1) {
        wishlistItems.push({ ...product });
        localStorage.setItem('wishlist-items', JSON.stringify(wishlistItems));
        return true;
    }
}

export function removeWishlistItems(product: Product) {
    let wishlistItems = JSON.parse(localStorage.getItem('wishlist-items') || '[]');
    let found = wishlistItems.findIndex((item: Product) => item.id === product.id);
    if (found === -1) {
        wishlistItems;
    } else {
        wishlistItems.splice(found, 1);
    }
    localStorage.setItem('wishlist-items', JSON.stringify(wishlistItems));
    return true;
}
