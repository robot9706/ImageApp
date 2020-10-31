import { Typography } from '@material-ui/core';
import React from 'react';
import LoginCard from '../components/LoginCard';
import styled from "styled-components";

const PageWrapper = styled.div`{
    flex: 1 1 auto;
    display: flex;
    justify-content: center;
    align-items: center;
}`;

export default class MainPage extends React.Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return <PageWrapper>
            <div>
                <LoginCard />
            </div>
        </PageWrapper>;
    }
};
