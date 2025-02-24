import React from 'react';
import { AppBar, Toolbar, Typography, Fab, Link, Badge, Avatar } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { APP_URL } from '../config/config';
import { connect } from 'react-redux';
import { Product } from '../redux/products/types';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

interface AppProps {
    cartProductsList: Product[];
    wishlistProductsList: Product[];
}

class AppHeader extends React.Component<AppProps> {
    render() {
        const { cartProductsList, wishlistProductsList } = this.props;
        const cartContent = cartProductsList.length;
        const wishlistContent = wishlistProductsList.length;
        return (
            <React.Fragment>
                <AppBar className="appHeader">
                    <Toolbar>
                        <div className="cartHeading">
                            <Link href={`${APP_URL}/`}>
                                <h3>Shopping Cart</h3>
                            </Link>
                        </div>
                        <div className="cartIcon">
                            <Link href={`${APP_URL}/wishlist`}>
                                <Badge badgeContent={wishlistContent} color="secondary">
                                    <FavoriteIcon style={{ color: 'white' }} />
                                </Badge>
                            </Link>
                        </div>
                        <div className="cartIcon">
                            <Link href={`${APP_URL}/cart`}>
                                <Badge badgeContent={cartContent} color="secondary">
                                    <ShoppingCartIcon style={{ color: 'white' }} />
                                </Badge>
                            </Link>
                        </div>
                        <div className="cartIcon">
                            <Avatar className="avatarIcon">
                                <AccountCircleIcon style={{ fontSize: '30px' }} />
                            </Avatar>
                        </div>
                    </Toolbar>
                </AppBar>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: any) => ({
    cartProductsList: state.products.addedToCart,
    wishlistProductsList: state.products.addedToWishlist,
});

export default connect(mapStateToProps)(AppHeader);
