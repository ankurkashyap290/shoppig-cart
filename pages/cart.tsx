import React from 'react';
import { Typography, Card, Grid, Divider, Button } from '@material-ui/core';
import {
    viewCartItem,
    removeCartItem,
    addToWishlist,
    updateTotalAmount,
    viewWishlistItem,
} from '../redux/products/actions';
import { Product, Pagination } from '../redux/products/types';
import { connect } from 'react-redux';
import ProductCard from '../components/ProductCard';

interface AppProps {
    pagination: Pagination;
    viewCartItem: typeof viewCartItem;
    removeCartItem: typeof removeCartItem;
    addToWishlist: typeof addToWishlist;
    updateTotalAmount: typeof updateTotalAmount;
    viewWishlistItem: typeof viewWishlistItem;
    cartProductsList: Product[];
    cartTotalAmount: string;
}

class CartItems extends React.Component<AppProps> {
    componentDidMount = () => {
        const { viewCartItem, viewWishlistItem } = this.props;
        const cartItemList = JSON.parse(localStorage.getItem('cart-items') || '[]');
        viewCartItem(cartItemList);
        const wishlist = JSON.parse(localStorage.getItem('wishlist-items') || '[]');
        viewWishlistItem(wishlist);
    };

    render() {
        const { cartProductsList, cartTotalAmount, removeCartItem, addToWishlist, updateTotalAmount } = this.props;

        return (
            <React.Fragment>
                <div className="cartList">
                    <div className="itemsList">
                        {cartProductsList.length && cartProductsList.length > 0
                            ? cartProductsList.map(product => (
                                  <ProductCard
                                      key={product.id}
                                      product={product}
                                      removeCartItem={removeCartItem}
                                      addToWishlist={addToWishlist}
                                      updateTotalAmount={updateTotalAmount}
                                      cartTotalAmount={cartTotalAmount}
                                  />
                              ))
                            : 'No Products Found'}
                    </div>
                    <div className="itemsTotal">
                        <Card style={{ marginTop: '20px', padding: '20px' }}>
                            <Typography gutterBottom variant="h6" component="h2" className="cartTotal">
                                Price Details
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <Typography gutterBottom variant="h6" component="h2" className="cartTotal">
                                        Price({cartProductsList.length} Items)
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} style={{ textAlign: 'right' }}>
                                    <Typography gutterBottom variant="h6" component="h2" className="cartTotal">
                                        {cartTotalAmount}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <Typography gutterBottom variant="h6" component="h2" className="cartTotal">
                                        Delivery
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} style={{ textAlign: 'right' }}>
                                    <Typography gutterBottom variant="h6" component="h2" className="cartTotal">
                                        {/* {deliveryCharges ? 'DeliveryCharges' : 'Free'} */}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Divider variant="middle" />
                            <Grid container spacing={3} style={{ paddingTop: '20px' }}>
                                <Grid item xs={6}>
                                    <Typography gutterBottom variant="h6" component="h2" className="cartTotal">
                                        Total Payable
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} style={{ textAlign: 'right' }}>
                                    <Typography gutterBottom variant="h6" component="h2" className="cartTotal">
                                        {cartTotalAmount}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <div>
                                <Button size="large" className="button">
                                    Place Order
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: any) => ({
    cartProductsList: state.products.addedToCart,
    cartTotalAmount: state.products.cartTotalAmount,
});

export default connect(
    mapStateToProps,
    {
        viewCartItem,
        removeCartItem,
        addToWishlist,
        updateTotalAmount,
        viewWishlistItem,
    },
)(CartItems);
