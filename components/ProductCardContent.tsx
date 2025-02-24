import React from 'react';
import { Product } from '../redux/products/types';
import { Typography } from '@material-ui/core';

interface AppProps {
    product: Product;
}

class ProductCardContent extends React.Component<AppProps> {
    render() {
        const { product } = this.props;

        return (
            <div>
                <Typography gutterBottom variant="h6" component="h2">
                    {product.name}
                </Typography>
                <Typography gutterBottom variant="h4">
                    {product.price}
                </Typography>
                {/* {product.userRatings ? (
                    <Typography gutterBottom variant='body2'>
                        {product.userRatings}
                    </Typography>
                ) : null}
                {product.availableOffer ? (
                    <Typography gutterBottom variant='body2'>
                        {product.availableOffer}
                    </Typography>
                ) : null}
                 {product.deliveryCharges ? (
                    <Typography gutterBottom variant='body2'>
                        {product.deliveryCharges}
                    </Typography>
                ) : null}
                 {product.seller ? (
                    <Typography gutterBottom variant='body2'>
                        {product.seller}
                    </Typography>
                ) : null} */}
                {product.category === 'Clothes' ? (
                    <div>
                        <Typography gutterBottom variant="body2">
                            <span className="productSpecs">Size</span> : {product.shirtSize.join(', ')}
                        </Typography>
                        <Typography gutterBottom variant="body2">
                            <span className="productSpecs"> Material</span> : {product.fabricMaterial.join(', ')}
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
                            <span className="productSpecs"> Material</span> : {product.jewelleryMaterial.join(', ')}
                        </Typography>
                    </div>
                ) : null}
            </div>
        );
    }
}

export default ProductCardContent;
