import React from 'react';
import {
    requestFetchProducts,
    productsFilter,
    addToCart,
    viewCartItem,
    addToWishlist,
    viewWishlistItem,
} from '../redux/products/actions';
import { Product, Pagination } from '../redux/products/types';
import { connect } from 'react-redux';
import {
    Grid,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
    Link,
    CardActions,
    IconButton,
    Fab,
    CircularProgress,
} from '@material-ui/core';
import { getProductsList } from '../selector';
import FilterDrawer from '../components/FilterDrawer';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ProductDesc from './product-description';
import { APP_URL } from '../config/config';
import ProductCardContent from '../components/ProductCardContent';

interface AppProps {
    products: Product[];
    pagination: Pagination;
    productsList: Product[];
    cartProductsList: Product[];
    requestFetchProducts: typeof requestFetchProducts;
    productsFilter: typeof productsFilter;
    viewCartItem: typeof viewCartItem;
    addToCart: typeof addToCart;
    addToWishlist: typeof addToWishlist;
    viewWishlistItem: typeof viewWishlistItem;
}

class ShoppingCartApp extends React.Component<AppProps> {
    componentDidMount = () => {
        const cartItems = JSON.parse(localStorage.getItem('cart-items') || '[]');
        const { viewCartItem } = this.props;
        viewCartItem(cartItems);
        const wishlistItems = JSON.parse(localStorage.getItem('wishlist-items') || '[]');
        const { viewWishlistItem } = this.props;
        viewWishlistItem(wishlistItems);
    };

    handleAddToCart = (e: any, product: Product) => {
        e.stopPropagation();
        const { addToCart } = this.props;
        addToCart(product);
    };

    handleAddToWishlist = (e: any, product: Product) => {
        e.stopPropagation();
        const { addToWishlist } = this.props;
        addToWishlist(product);
    };

    render() {
        const { products, productsList, productsFilter, cartProductsList } = this.props;
        console.log('products***', products);
        return (
            <React.Fragment>
                {products.length && products.length > 0 ? (
                    <div>
                        <div className="sideFilterDrawer">
                            <FilterDrawer
                                productsList={productsList}
                                productsFilter={productsFilter}
                                filteredProductList={products}
                            />
                        </div>
                        <div className="productList">
                            <Grid container spacing={2} direction="row">
                                {products.map((product: Product) => (
                                    <Grid item xs={12} lg={3} sm={6} md={4} xl={3} key={product.id}>
                                        <Link href={`${APP_URL}/product-description?id=${product.id}`}>
                                            <Card className="card">
                                                <CardActionArea>
                                                    <CardMedia
                                                        component="img"
                                                        alt="Contemplative Reptile"
                                                        image={product.image}
                                                        title={product.name}
                                                    />
                                                    <CardContent className="productName">
                                                        <p>{product.name}</p>
                                                        <h5>{product.price}</h5>
                                                    </CardContent>
                                                </CardActionArea>
                                                {/* <CardActions disableSpacing>
                                            <IconButton
                                                aria-label='add to favorites'
                                                onClick={e => this.handleAddToWishlist(e, product)}
                                                className='alreadyAddedProduct'
                                            >
                                                <FavoriteIcon />
                                            </IconButton>
                                            <IconButton
                                                aria-label='share'
                                                onClick={e => this.handleAddToCart(e, product)}
                                                className='alreadyAddedProduct'
                                            >
                                                <AddShoppingCartIcon />
                                            </IconButton>
                                        </CardActions> */}
                                            </Card>
                                        </Link>
                                    </Grid>
                                ))}
                            </Grid>
                        </div>
                    </div>
                ) : (
                    <CircularProgress className="sideFilterDrawer" />
                )}
            </React.Fragment>
        );
    }
}
const mapStateToProps = (state: any) => ({
    productsList: state.products.products,
    cartProductsList: state.products.addedToCart,
    products: getProductsList(state),
});

export default connect(
    mapStateToProps,
    {
        productsFilter,
        addToCart,
        viewCartItem,
        addToWishlist,
        viewWishlistItem,
    },
)(ShoppingCartApp);
