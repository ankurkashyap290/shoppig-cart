import React from 'react';
import { Typography, Card, CardContent, CardMedia, Button } from '@material-ui/core';
import { Product } from '../redux/products/types';
import { removeWishlistItem, addToCart } from '../redux/products/actions';

interface AppProps {
    product: Product;
    removeWishlistItem: typeof removeWishlistItem;
    addToCart: typeof addToCart;
}
class WishlistProduct extends React.Component<AppProps> {
    state = { productCounter: 1 };

    addedToCart = (item: Product) => {
        const { addToCart, removeWishlistItem } = this.props;
        addToCart(item);
        removeWishlistItem(item);
    };

    removeFromWishlist = (item: Product) => {
        const { removeWishlistItem } = this.props;
        removeWishlistItem(item);
    };

    render() {
        const { product } = this.props;
        return (
            <React.Fragment>
                <Card style={{ height: '300px', marginTop: '20px' }}>
                    <div className="cartItemImage">
                        <CardMedia image={product.image} title="Product Image" style={{ height: '200px' }} />

                        <div className="productTotalPrice">
                            <Typography gutterBottom variant="body2">
                                <span className="productSpecs"> Price</span> : {product.price}
                            </Typography>
                        </div>
                    </div>
                    <CardContent className="cartItemContent">
                        <Typography gutterBottom variant="h6" component="h2">
                            {product.name}
                        </Typography>
                        {product.category === 'Clothes' ? (
                            <div>
                                <Typography gutterBottom variant="body2">
                                    <span className="productSpecs">Size</span> : {product.shirtSize.join(', ')}
                                </Typography>
                                <Typography gutterBottom variant="body2">
                                    <span className="productSpecs"> Material</span> :{' '}
                                    {product.fabricMaterial.join(', ')}
                                </Typography>
                            </div>
                        ) : null}
                        {product.category === 'Shoes' ? (
                            <div>
                                <Typography gutterBottom variant="body2">
                                    <span className="productSpecs"> Size</span> : {product.shoeSize.join(', ')}
                                </Typography>
                                <Typography gutterBottom variant="body2">
                                    <span className="productSpecs"> Material</span> : {product.soleMaterial.join(', ')}
                                </Typography>
                            </div>
                        ) : null}
                        {product.category === 'Shoes' || 'Clothes' ? (
                            <Typography gutterBottom variant="body2">
                                <span className="productSpecs"> Color </span>: {product.color.join(', ')}
                            </Typography>
                        ) : null}{' '}
                        {product.category === 'Jewellery' ? (
                            <div>
                                <Typography gutterBottom variant="body2">
                                    <span className="productSpecs"> Type</span> : {product.jewelleryType}
                                </Typography>
                                <Typography gutterBottom variant="body2">
                                    <span className="productSpecs"> Material</span> :{' '}
                                    {product.jewelleryMaterial.join(', ')}
                                </Typography>
                            </div>
                        ) : null}
                        <div>
                            <Button size="large" className="button" onClick={() => this.addedToCart(product)}>
                                {' '}
                                Move To Cart
                            </Button>{' '}
                        </div>
                        <div>
                            <Button size="large" className="button" onClick={() => this.removeFromWishlist(product)}>
                                Remove From Wishlist
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </React.Fragment>
        );
    }
}

export default WishlistProduct;
