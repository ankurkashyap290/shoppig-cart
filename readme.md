Setup project:

Initial setup

1. clone repo(react-next-shopping-cart)
2. cd react-next-shopping-cart
3. yarn init
4. yarn add next react react-dom
5. yarn add @types/next @types/react
6. created pages folder an index.tsx

Material UI

1. yarn add @material-ui/core @material-ui/icon @material-ui/lab
2. yarn add @zeit/next-less less
3. yarn add next-redux-saga next-redux-wrapper
4. yarn add redux redux-logger redux-saga redux-thunk

Eslint And Prettier

1. yarn add eslint eslint-config-airbnb eslint-config-prettier eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react"--dev
2. yarn add @typescript-eslint/parser @typescript-eslint/eslint-plugin --dev
3. yarn add husky lint-staged prettier stylelint stylelint-config-prettier stylelint-config-standard --dev

Redux

1. created action, reducer, saga and store to fetch product list.
2. created types.ts to define all the types.
3. Connected with redux using 'withRedux(AppStore)'.
4. Dispatch an action to fetch products, getInitialProps function, then use <Provider store={store}>.
5. In all the other pages use the store by using 'connect'.

Less File

1. In next.config.js configure the less module using following code
   const withLess = require('@zeit/next-less');
   module.exports = withLess();
2. Create a less file in the folder, import the less file and add class as 'className="example"'.
