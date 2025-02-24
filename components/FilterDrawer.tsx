import React from 'react';
import { productsFilter } from '../redux/products/actions';
import { Product } from '../redux/products/types';
import { FormControl, Slider, Input, FormControlLabel, Checkbox } from '@material-ui/core';
import { shirtSize, shoeSize, fabricMaterial, soleMaterial, jewelleryMaterial, jewelleryType } from '../config/config';

interface AppProps {
    productsList: Product[];
    filteredProductList: Product[];

    productsFilter: typeof productsFilter;
}

class FilterDrawer extends React.Component<AppProps> {
    state = { selectedCategory: '', minPrice: 0.0, maxPrice: 100.0, appliedFilter: [''] };

    checkAppliedFilter = (elem: any) => {
        const { appliedFilter } = this.state;

        const foundedIndex = appliedFilter.indexOf(elem);
        if (foundedIndex === -1) {
            appliedFilter.push(elem);
        } else {
            appliedFilter.splice(foundedIndex, 1);
        }
    };

    handleCategoryMenu = (elem: string) => {
        this.checkAppliedFilter(elem);
        const { productsFilter } = this.props;
        this.setState({ selectedCategory: elem });
        productsFilter('category', elem);
    };

    handleBrandMenu = (elem: string) => {
        this.checkAppliedFilter(elem);
        const { productsFilter } = this.props;
        productsFilter('brand', elem);
    };

    handleSizeMenu = (elem: any) => {
        this.checkAppliedFilter(elem);
        const { selectedCategory } = this.state;
        const { productsFilter } = this.props;
        if (selectedCategory === 'Clothes') {
            productsFilter('shirtSize', elem);
        } else if (selectedCategory === 'Shoes') {
            productsFilter('shoeSize', elem);
        }
    };

    handleMaterialMenu = (elem: string) => {
        this.checkAppliedFilter(elem);
        const { selectedCategory } = this.state;
        const { productsFilter } = this.props;
        if (selectedCategory === 'Clothes') {
            productsFilter('fabricMaterial', elem);
        } else if (selectedCategory === 'Shoes') {
            productsFilter('soleMaterial', elem);
        }
    };

    handleColorMenu = (elem: string) => {
        this.checkAppliedFilter(elem);
        const { productsFilter } = this.props;
        productsFilter('color', elem);
    };

    handleJewelleryTypeMenu = (elem: string) => {
        this.checkAppliedFilter(elem);
        const { productsFilter } = this.props;
        productsFilter('jewelleryType', elem);
    };

    handleJewelleryMaterialMenu = (elem: string) => {
        this.checkAppliedFilter(elem);
        const { productsFilter } = this.props;
        productsFilter('jewelleryMaterial', elem);
    };

    handlePriceMenu = (evt: any, value: any) => {
        const { productsFilter } = this.props;
        this.setState({ minPrice: value[0], maxPrice: value[1] });
        this.checkAppliedFilter('minPrice');
        this.checkAppliedFilter('maxPrice');
        productsFilter('minPrice', '$'.concat(value[0].toFixed(2).toString()));
        productsFilter('maxPrice', '$'.concat(value[1].toFixed(2).toString()));
    };

    render() {
        //@ts-ignore
        const { productsList } = this.props;
        const { selectedCategory, minPrice, maxPrice, appliedFilter } = this.state;

        let category: string[] = [];
        let brands: string[] = [];
        let color: string[] = [];

        productsList.map((product: Product) => {
            if (category.includes(product.category)) {
                return category;
            } else {
                return category.push(product.category);
            }
        });

        productsList.map((product: Product) => {
            if (brands.includes(product.brand)) {
                return brands;
            } else {
                return brands.push(product.brand);
            }
        });
        productsList.map((product: Product) => {
            product.color.map((elem: string) => {
                if (color.includes(elem)) {
                    return color;
                } else {
                    return color.push(elem);
                }
            });
        });

        return (
            <React.Fragment>
                <h5>Category</h5>
                {category.map(elem => (
                    <FormControl component="fieldset" fullWidth key={elem}>
                        <FormControlLabel
                            control={<Checkbox onChange={() => this.handleCategoryMenu(elem)} value={elem} />}
                            label={elem}
                            className={appliedFilter.includes(elem) ? 'selectedFilter' : 'categoryFilter'}
                        />
                    </FormControl>
                ))}
                <h5>Brand</h5>
                {brands.map(elem => (
                    <FormControl component="fieldset" fullWidth key={elem}>
                        <FormControlLabel
                            control={<Checkbox onChange={() => this.handleBrandMenu(elem)} value={elem} />}
                            label={elem}
                            className={appliedFilter.includes(elem) ? 'selectedFilter' : 'categoryFilter'}
                        />
                    </FormControl>
                ))}
                {selectedCategory === 'Clothes' ? (
                    <div>
                        <h5>Available Size</h5>
                        {shirtSize.map(elem => (
                            <FormControl component="fieldset" fullWidth key={elem}>
                                <FormControlLabel
                                    control={<Checkbox onChange={() => this.handleSizeMenu(elem)} value={elem} />}
                                    label={elem}
                                    className={appliedFilter.includes(elem) ? 'selectedFilter' : 'categoryFilter'}
                                />
                            </FormControl>
                        ))}

                        <h5>Fabric Material</h5>
                        {fabricMaterial.map(elem => (
                            <FormControl component="fieldset" fullWidth key={elem}>
                                <FormControlLabel
                                    control={<Checkbox onChange={() => this.handleMaterialMenu(elem)} value={elem} />}
                                    label={elem}
                                    className={appliedFilter.includes(elem) ? 'selectedFilter' : 'categoryFilter'}
                                />
                            </FormControl>
                        ))}
                        <h5>Color</h5>
                        {color.map(elem => (
                            <FormControl component="fieldset" fullWidth key={elem}>
                                <FormControlLabel
                                    control={<Checkbox onChange={() => this.handleColorMenu(elem)} value={elem} />}
                                    label={elem}
                                    className={appliedFilter.includes(elem) ? 'selectedFilter' : 'categoryFilter'}
                                />
                            </FormControl>
                        ))}
                    </div>
                ) : null}
                {selectedCategory === 'Shoes' ? (
                    <div>
                        <h5>Available Size</h5>
                        {shoeSize.map(elem => (
                            <FormControl component="fieldset" fullWidth key={elem}>
                                <FormControlLabel
                                    control={<Checkbox onChange={() => this.handleSizeMenu(elem)} value={elem} />}
                                    label={elem}
                                    //@ts-ignore
                                    className={appliedFilter.includes(elem) ? 'selectedFilter' : 'categoryFilter'}
                                />
                            </FormControl>
                        ))}
                        <h5>Sole Material</h5>
                        {soleMaterial.map(elem => (
                            <FormControl component="fieldset" fullWidth key={elem}>
                                <FormControlLabel
                                    control={<Checkbox onChange={() => this.handleMaterialMenu(elem)} value={elem} />}
                                    label={elem}
                                    className={appliedFilter.includes(elem) ? 'selectedFilter' : 'categoryFilter'}
                                />
                            </FormControl>
                        ))}

                        <h5>Color</h5>
                        {color.map(elem => (
                            <FormControl component="fieldset" fullWidth key={elem}>
                                <FormControlLabel
                                    control={<Checkbox onChange={() => this.handleColorMenu(elem)} value={elem} />}
                                    label={elem}
                                    className={appliedFilter.includes(elem) ? 'selectedFilter' : 'categoryFilter'}
                                />
                            </FormControl>
                        ))}
                    </div>
                ) : null}
                {selectedCategory === 'Jewellery' ? (
                    <div>
                        <h5>Jewellery Type</h5>
                        {jewelleryType.map(elem => (
                            <FormControl component="fieldset" fullWidth key={elem}>
                                <FormControlLabel
                                    control={
                                        <Checkbox onChange={() => this.handleJewelleryTypeMenu(elem)} value={elem} />
                                    }
                                    label={elem}
                                    className={appliedFilter.includes(elem) ? 'selectedFilter' : 'categoryFilter'}
                                />
                            </FormControl>
                        ))}
                        <h5>Jewellery Material</h5>
                        {jewelleryMaterial.map(elem => (
                            <FormControl component="fieldset" fullWidth key={elem}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            onChange={() => this.handleJewelleryMaterialMenu(elem)}
                                            value={elem}
                                        />
                                    }
                                    label={elem}
                                    className={appliedFilter.includes(elem) ? 'selectedFilter' : 'categoryFilter'}
                                />
                            </FormControl>
                        ))}
                    </div>
                ) : null}
                <h5>Price</h5>
                <Slider
                    className="priceSlider"
                    value={[minPrice, maxPrice]}
                    aria-labelledby="range-slider"
                    onChange={this.handlePriceMenu}
                />
                <Input
                    value={minPrice}
                    className="priceInput"
                    onChange={evt => this.handlePriceMenu(evt, [Number(evt.target.value), maxPrice])}
                    inputProps={{
                        step: 10,
                        min: 0,
                        max: 100,
                        type: 'number',
                    }}
                />
                To
                <Input
                    value={maxPrice}
                    className="priceInput"
                    onChange={evt => this.handlePriceMenu(evt, [minPrice, Number(evt.target.value)])}
                    inputProps={{
                        step: 10,
                        min: 0,
                        max: 100,
                        type: 'number',
                    }}
                />
            </React.Fragment>
        );
    }
}

export default FilterDrawer;
