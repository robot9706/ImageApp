import React from 'react';

import styled from "styled-components";
import { connect } from "react-redux";
import { onUserLogout } from '../redux/user';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LogOutIcon from '@material-ui/icons/SubdirectoryArrowRight';

const mapStateToProps = (store: any) => {
    return {
        isLoggedIn: store.user.token !== null,
        username: store.user.name
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        logout: () => {
            dispatch(onUserLogout());
        }
    };
};

const ActionsContainer = styled.div`{
    display: flex;
    align-items: center;
}`;

const LogoutButton = styled.div`{
    cursor: pointer;
    margin-left: 0.5rem;
}`;

type ActualProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
class AppHeader extends React.Component<ActualProps> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" style={{ flexGrow: 1 }}>Image App</Typography>
                        {
                            this.props.isLoggedIn ? (
                                <ActionsContainer>
                                    <Typography variant="h6">{this.props.username}</Typography>
                                    <LogoutButton onClick={(() => {
                                        this.props.logout();
                                    }).bind(this)}>
                                        <LogOutIcon />
                                    </LogoutButton>
                                </ActionsContainer>
                            ) : null
                        }
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);