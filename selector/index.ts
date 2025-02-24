import { createSelector } from 'reselect';
import { Product } from '../redux/products/types';
//@ts-ignore
const getProducts = (state: any) => state.products.products;
const getProductCategory = (state: any) => state.products.selectedCategory;
const getProductFilter = (state: any) => state.products.selectedFilter;
const getCurrentChangedFilter = (state: any) => state.products.currentFilter;
//@ts-ignore
export const getProductsList = createSelector(
    [getProductCategory, getProductFilter, getProducts, getCurrentChangedFilter],
    (selectedCategory, selectedFilter, products, currentFilter) => {
        if (currentFilter === '') {
            return products;
        } else {
            const filterKeys = Object.keys(selectedFilter);

            return products.filter((product: Product) => {
                return filterKeys.every(key => {
                    if (!selectedFilter[key].length) return true;
                    //@ts-ignore
                    if (Array.isArray(product[key])) {
                        //@ts-ignore
                        return product[key].some(keyEle => selectedFilter[key].includes(keyEle));
                    }
                    if (key === 'minPrice' || key === 'maxPrice') {
                        const productPrice = parseFloat(product.price.replace('$', ''));
                        const maxPrice = parseFloat(selectedFilter.maxPrice.replace('$', ''));
                        const minPrice = parseFloat(selectedFilter.minPrice.replace('$', ''));

                        return minPrice <= productPrice && maxPrice >= productPrice;
                    }
                    //@ts-ignore
                    return selectedFilter[key].includes(product[key]);
                });
            });
        }
    },
);
