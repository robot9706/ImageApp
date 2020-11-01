import { Store } from '@material-ui/icons';
import React from 'react';

import { Provider } from 'react-redux'
import { store } from './redux/store';

import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
import styled from "styled-components";

import AppHeader from './components/AppHeader';
import MainPage from './routes/MainPage';

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
                <BrowserRouter basename="/">
                    <AppHeader />
                    <Switch>
                        <Route exact path={"/"} component={MainPage} />
                        <Route exact component={NoMatch} />
                    </Switch>
                </BrowserRouter>
            </PageWrapper>
        </Provider>;
    }
};
