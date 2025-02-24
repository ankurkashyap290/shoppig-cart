import React from 'react';
import { Typography, Card, CardContent, CardMedia, IconButton, TextField, Button } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { Product } from '../redux/products/types';
import { removeCartItem, addToWishlist, updateTotalAmount } from '../redux/products/actions';
import { productReducer } from '../redux/products/reducer';

interface AppProps {
    product: Product;
    cartTotalAmount: string;
    removeCartItem: typeof removeCartItem;
    addToWishlist: typeof addToWishlist;
    updateTotalAmount: typeof updateTotalAmount;
}
class ProductCard extends React.Component<AppProps> {
    state = { productCounter: 1 };

    componentDidMount = () => {
        const { product } = this.props;
        this.setState({ productCounter: product.quantity });
    };

    handleDecrement = () => {
        const { productCounter } = this.state;
        const { product, updateTotalAmount } = this.props;

        if (productCounter === 1) {
            null;
        } else {
            const decrementedCounter = productCounter - 1;
            this.setState({ productCounter: decrementedCounter });
            const temp = parseFloat(product.price.replace('$', ''));
            const price = parseFloat((temp * decrementedCounter).toFixed(2));

            updateTotalAmount(product, temp, 'decrement', decrementedCounter);
            return `$${price}`;
        }
    };

    handleIncrement = () => {
        const { productCounter } = this.state;
        const { product, updateTotalAmount } = this.props;
        const incrementedCounter = productCounter + 1;
        this.setState({ productCounter: incrementedCounter });
        const temp = parseFloat(product.price.replace('$', ''));

        const price = parseFloat((temp * incrementedCounter).toFixed(2));
        updateTotalAmount(product, temp, 'increment', incrementedCounter);
        return `$${price}`;
    };

    productsPriceCalculation = () => {
        const { productCounter } = this.state;
        const { product } = this.props;
        const temp = parseFloat(product.price.replace('$', ''));
        const price = parseFloat((temp * productCounter).toFixed(2));
        return `$${price}`;
    };

    addedToWishList = (item: Product) => {
        const { addToWishlist, removeCartItem } = this.props;
        addToWishlist(item);
        console.log('item', item);
        removeCartItem(item);
    };

    removeFromCart = (item: Product) => {
        const { removeCartItem } = this.props;
        removeCartItem(item);
    };

    render() {
        const { product } = this.props;
        const { productCounter } = this.state;

        return (
            <React.Fragment>
                <Card style={{ height: '300px', marginTop: '20px' }}>
                    <div className="cartItemImage">
                        <CardMedia image={product.image} title="Product Image" style={{ height: '200px' }} />
                        <div className="productTotalQuantity">
                            <IconButton onClick={this.handleDecrement}>
                                <RemoveCircleOutlineIcon />
                            </IconButton>
                            <TextField
                                id="outlined-bare"
                                margin="normal"
                                variant="outlined"
                                value={productCounter}
                                classes={{
                                    root: 'cartProductTextField',
                                }}
                            />
                            <IconButton onClick={this.handleIncrement}>
                                <AddCircleOutlineIcon />
                            </IconButton>
                        </div>
                        <div className="productTotalPrice">
                            <Typography gutterBottom variant="body2">
                                <span className="productSpecs"> Price</span> : {this.productsPriceCalculation()}
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
                            <Button size="large" className="button" onClick={() => this.addedToWishList(product)}>
                                {' '}
                                Add To Wishlist
                            </Button>
                        </div>
                        <div>
                            <Button size="large" className="button" onClick={() => this.removeFromCart(product)}>
                                Remove From Cart
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </React.Fragment>
        );
    }
}

export default ProductCard;
