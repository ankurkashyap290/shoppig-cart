import React from 'react';
import Layout from '../components/Layout';
import { requestFetchProducts } from '../redux/products/actions';
import { Pagination, Product } from '../redux/products/types';
import { Provider } from 'react-redux';
import AppStore from '../redux/store';
import withRedux from 'next-redux-wrapper';
import '../styles/index.less';

interface AppProps {
    products: Product[];
    pagination: Pagination;
    requestFetchProducts: typeof requestFetchProducts;
}

class MyApp extends React.Component<AppProps> {
    static async getInitialProps({ Component, ctx }: { Component: any; ctx: any }) {
        const { store } = ctx;
        // @ts-ignore
        store.dispatch(requestFetchProducts());

        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
        return { pageProps };
    }
    componentDidMount() {
        // @ts-ignore
        this.props.store.dispatch(requestFetchProducts());
    }
    render() {
        // @ts-ignore
        const { Component, pageProps, store } = this.props;
        return (
            <Provider store={store}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </Provider>
        );
    }
}

export default withRedux(AppStore)(MyApp);
