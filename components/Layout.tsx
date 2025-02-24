import * as React from 'react';
import AppHeader from './AppHeader';

type Props = {
    title?: string;
};

const Layout: React.FunctionComponent<Props> = ({ children }) => {
    return (
        <React.Fragment>
            <AppHeader />

            {children}

            {/* <footer>
          <hr />
          <span>Shopping Cart Example ©2019 Created by MindzHub</span>
        </footer> */}
        </React.Fragment>
    );
};

export default Layout;
