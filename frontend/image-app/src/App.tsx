import React from 'react';

import { Provider } from 'react-redux'
import { store } from './redux/store';
import { createBrowserHistory } from 'history';

import { Router, Switch, Redirect, Route } from "react-router-dom";
import styled from "styled-components";

import AppHeader from './components/AppHeader';
import MainPage from './routes/MainPage';
import AdminPage from './routes/AdminPage';
import ImageViewDialog from './components/ImageViewDialog';
import { Entry } from './api';

export const history = createBrowserHistory();

const NoMatch = () => <Redirect to="/" />

const PageWrapper = styled.div`{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
}`;

export default class App extends React.Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return <Provider store={store}>
            <PageWrapper>
                <Router history={history}>
                    <AppHeader />
                    <Switch>
                        <Route exact path={"/"} component={MainPage} />
                        <Route exact path={"/admin"} component={AdminPage} />
                        <Route exact component={NoMatch} />
                    </Switch>
                    <ImageViewDialog />
                </Router>
            </PageWrapper>
        </Provider>;
    }
};
