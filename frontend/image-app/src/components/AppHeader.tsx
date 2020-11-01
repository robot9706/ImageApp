import React from 'react';

import styled from "styled-components";
import { connect } from "react-redux";
import { onUserLogout } from '../redux/user';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LogOutIcon from '@material-ui/icons/SubdirectoryArrowRight';

import { history } from '../App';

const mapStateToProps = (store: any) => {
    return {
        isLoggedIn: store.user.token !== null,
        username: store.user.name,
        isAdmin: store.user.admin
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

const MarginButton = styled.div`{
    margin-right: 1rem;
}`;

const LogoText = styled(Typography)`{
    cursor: pointer;
}`;

const LoginWrapper = styled.div`{
    flex: 0 0 auto;
}`;

type ActualProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
class AppHeader extends React.Component<ActualProps> {
    constructor(props: any) {
        super(props);
    }

    handleAdminMenu() {
        history.push("/admin");
    }

    handleLogout() {
        this.props.logout();
        history.push("/");
    }

    render() {
        return (
            <LoginWrapper>
                <AppBar position="static">
                    <Toolbar>
                        <LogoText variant="h6" style={{ flexGrow: 1 }} onClick={() => {
                            history.push("/");
                        }}>Image App</LogoText>
                        {
                            this.props.isLoggedIn ? (
                                <ActionsContainer>
                                    {
                                        this.props.isAdmin ? <MarginButton><Button variant="contained" onClick={this.handleAdminMenu.bind(this)}>Admin</Button></MarginButton> : null
                                    }
                                    <Typography variant="h6">{this.props.username}</Typography>
                                    <LogoutButton onClick={this.handleLogout.bind(this)}>
                                        <LogOutIcon />
                                    </LogoutButton>
                                </ActionsContainer>
                            ) : null
                        }
                    </Toolbar>
                </AppBar>
            </LoginWrapper>
        );
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);