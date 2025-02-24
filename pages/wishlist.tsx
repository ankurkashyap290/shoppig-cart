import React from 'react';
import { Container, Button } from '@material-ui/core';
import { addToCart, viewWishlistItem, removeWishlistItem, viewCartItem } from '../redux/products/actions';
import { Product } from '../redux/products/types';
import { connect } from 'react-redux';
import WishlistProduct from '../components/WishlistProduct';

interface AppProps {
    viewWishlistItem: typeof viewWishlistItem;
    wishlistProducts: Product[];
    cartTotalAmount: string;
    removeWishlistItem: typeof removeWishlistItem;
    addToCart: typeof addToCart;
    viewCartItem: typeof viewCartItem;
}

class WishlistItems extends React.Component<AppProps> {
    componentDidMount = () => {
        const { viewCartItem, viewWishlistItem } = this.props;
        const cartItemList = JSON.parse(localStorage.getItem('cart-items') || '[]');
        viewCartItem(cartItemList);
        const wishlist = JSON.parse(localStorage.getItem('wishlist-items') || '[]');
        viewWishlistItem(wishlist);
    };

    render() {
        const { wishlistProducts, removeWishlistItem, addToCart } = this.props;
        return (
            <React.Fragment>
                <div className="wishlist">
                    <Container maxWidth="sm">
                        {wishlistProducts.length && wishlistProducts.length > 0 ? (
                            wishlistProducts.map(product => (
                                <WishlistProduct
                                    key={product.id}
                                    product={product}
                                    removeWishlistItem={removeWishlistItem}
                                    addToCart={addToCart}
                                />
                            ))
                        ) : (
                            <div style={{ textAlign: 'center' }}>
                                <h2>No Products Found !</h2>
                                <Button size="large" className="button">
                                    Shop
                                </Button>
                            </div>
                        )}
                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: any) => ({
    wishlistProducts: state.products.addedToWishlist,
});

export default connect(
    mapStateToProps,
    {
        viewWishlistItem,
        addToCart,
        removeWishlistItem,
        viewCartItem,
    },
)(WishlistItems);
