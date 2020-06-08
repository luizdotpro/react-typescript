import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { StoreProvider } from './Store'
import { Router, RouteComponentProps } from '@reach/router'
import HomePage from "./HomePage"
import FavPage from "./FavPage"

const RouterPage = (props: { pageComponent: JSX.Element } & RouteComponentProps) => props.pageComponent

ReactDOM.render(<StoreProvider>
    <Router>
        <App path='/' >
            <RouterPage default pageComponent={<HomePage />} path="/" />
            <RouterPage pageComponent={<FavPage />} path="/faves" />
        </App>
    </Router>
</StoreProvider>, document.getElementById('root'));
