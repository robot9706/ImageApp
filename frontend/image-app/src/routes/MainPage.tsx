import { Typography } from '@material-ui/core';
import React from 'react';
import LoginCard from '../components/LoginCard';
import styled from "styled-components";
import { connect } from "react-redux";
import ImageExplorer from '../components/ImageExplorer';

const mapStateToProps = (store: any) => {
    return {
        isLoggedIn: store.user.token !== null
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
    };
};

const PageWrapper = styled.div`{
    flex: 1 1 auto;
    display: flex;
    justify-content: center;
    align-items: center;
}`;

const PageWrapperInPlaceScroll = styled.div`{
    flex: 1 1 auto;
}`;

type ActualProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
class MainPage extends React.Component<ActualProps> {
    constructor(props: any) {
        super(props);
    }

    render() {
        if (!this.props.isLoggedIn) {
            return <PageWrapper>
                <LoginCard />
            </PageWrapper>
        }

        return <PageWrapperInPlaceScroll>
            <ImageExplorer />
        </PageWrapperInPlaceScroll>;
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);