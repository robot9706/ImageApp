import { Typography } from '@material-ui/core';
import React from 'react';
import LoginCard from '../components/LoginCard';
import styled from "styled-components";
import { connect } from "react-redux";

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

type ActualProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
class MainPage extends React.Component<ActualProps> {
    constructor(props: any) {
        super(props);
    }

    renderNotLoggedIn() {
        return <div>
            <LoginCard />
        </div>;
    }

    renderLoggedIn() {
        return <React.Fragment>

        </React.Fragment>;
    }

    render() {
        return <PageWrapper>
            { this.props.isLoggedIn ? this.renderLoggedIn() : this.renderNotLoggedIn() }
        </PageWrapper>;
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);