import React from 'react';
import { Container, Grid, Button, CircularProgress, Typography } from '@material-ui/core';
import { addToCart, viewWishlistItem, removeWishlistItem, viewCartItem } from '../redux/products/actions';
import { Product } from '../redux/products/types';
import { connect } from 'react-redux';
import { getProductsList } from '../selector';
import WishlistProduct from '../components/WishlistProduct';
import ProductCardContent from '../components/ProductCardContent';
import { APP_URL } from '../config/config';
interface AppProps {
    products: Product[];
    viewCartItem: typeof viewCartItem;
    addToCart: typeof addToCart;
    cartProductsList: Product[];
    viewWishlistItem: typeof viewWishlistItem;
}

class ProductDesc extends React.Component<AppProps> {
    state = { selectedProduct: null, productId: 0 };
    componentDidMount = () => {
        const search = window.location.search;
        const { viewCartItem, viewWishlistItem } = this.props;
        const cartItems = JSON.parse(localStorage.getItem('cart-items') || '[]');
        const wishlistItems = JSON.parse(localStorage.getItem('wishlist-items') || '[]');
        viewCartItem(cartItems);
        viewWishlistItem(wishlistItems);
        if (search) {
            const tempArr = search.split('=');
            const id = Number(tempArr[1]);
            this.setState({ productId: id });
        }
    };

    handleAddToCart = (e: any, product: Product) => {
        e.stopPropagation();
        const { addToCart } = this.props;
        addToCart(product);
        window.location.href = `${APP_URL}/cart`;
    };

    render() {
        const { productId } = this.state;
        const { products } = this.props;
        const product = products.filter((item: Product) => item.id == productId);

        return (
            <React.Fragment>
                <Container className="productDescContainer">
                    {product.length && product.length > 0 ? (
                        <Grid container spacing={3}>
                            <Grid item lg={6} style={{ textAlign: 'center' }}>
                                <img src={product[0].image} alt="productDesc" height="400px" />
                                <div>
                                    <Button
                                        size="large"
                                        className="button"
                                        onClick={e => this.handleAddToCart(e, product[0])}
                                    >
                                        ADD TO CART
                                    </Button>
                                    <Button size="large" className="button">
                                        BUY NOW
                                    </Button>
                                </div>
                            </Grid>

                            <Grid item lg={6}>
                                <ProductCardContent product={product[0]} />
                                {product[0].description ? (
                                    <Typography gutterBottom variant="body2">
                                        <span className="productSpecs">Description</span> : {product[0].description}
                                    </Typography>
                                ) : null}
                            </Grid>
                        </Grid>
                    ) : (
                        <CircularProgress />
                    )}
                </Container>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: any) => ({
    products: getProductsList(state),
});

export default connect(
    mapStateToProps,
    {
        viewWishlistItem,
        addToCart,
        removeWishlistItem,
        viewCartItem,
    },
)(ProductDesc);
