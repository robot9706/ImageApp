import React from 'react';

import styled from "styled-components";
import { connect } from "react-redux";
import { TextField, Paper, Typography, Button, CircularProgress } from '@material-ui/core';
import { onUserLogin } from '../redux/user';
import { apiLogin, apiGetUserInfo, apiRegister } from '../api';

const TableWrapper = styled.div`{
    display: flex;
    width: 100%;
    flex-flow: column;
}`;

const Row = styled.div`{
    display: flex;
    flex-flow: row;
    margin-top: 0.5rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
}`;

const Error = styled.div`{
    width: 100%;
    text-align: center;
    color: red;
}`;

const RegText = styled(Typography)`{
    cursor: pointer;
    color: black;
    text-align: center;
    padding-top: 1rem;
}`;

const CenterLoading = styled.div`{
    display: flex;
    justify-content: center;
}`;

interface Props {
}

interface State {
    loginMode: boolean;
    errorText: string;
    loading: boolean;

    inputUsername: string;
    inputPassword: string;
}

const mapStateToProps = (store: any) => {
    return { };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onLogin: (name: string, token: string, admin: boolean) => {
            dispatch(onUserLogin(name, token, admin));
        }
    };
};

type ActualProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & Props;
class LoginCard extends React.Component<ActualProps, State> {
    constructor(props: any) {
        super(props);

        this.state = {
            loginMode: true,
            errorText: "",
            loading: false,
            inputUsername: "",
            inputPassword: ""
        };
    }

    toggleMode() {
        this.setState({
            loginMode: !this.state.loginMode
        });
    }

    handleAction() {
        if (this.state.loginMode) {
            this.setState({
                errorText: "",
                loading: true
            }, () => {
                apiLogin({
                    username: this.state.inputUsername,
                    password: this.state.inputPassword
                }).then(((loginResult: any) => {
                    if ((loginResult.ok !== undefined && !loginResult.ok) || loginResult.authorization === undefined) {
                        this.setState({
                            loading: false,
                            errorText: "Hibás adatok!"
                        });
    
                        return;
                    }
    
                    apiGetUserInfo(loginResult.authorization).then(((userInfo: any) => {
                        if (loginResult.ok !== undefined && !loginResult.ok) {
                            this.setState({
                                loading: false,
                                errorText: "Hibás adatok!"
                            });
        
                            return;
                        }
    
                        this.props.onLogin(userInfo.name, loginResult.authorization, userInfo.admin);
    
                        this.setState({
                            loading: false,
                            errorText: ""
                        });
                    }).bind(this));
                }).bind(this));
            });
        } else {
            this.setState({
                errorText: "",
                loading: true
            }, () => {
                apiRegister({
                    username: this.state.inputUsername,
                    password: this.state.inputPassword
                }).then(((registerResult: any) => {
                    if (registerResult.ok === null || !registerResult.ok) {
                        this.setState({
                            errorText: "Ilyen felhasználó már létezik!",
                            loading: false
                        });
                    } else {
                        this.setState({
                            errorText: "",
                            loading: false,
                            loginMode: true
                        });
                    }
                }).bind(this));
            });
        }
    }

    renderActions() {
        if (this.state.loading) {
            return <CenterLoading><CircularProgress /></CenterLoading>;
        }

        return <React.Fragment>
            <Button style={{ padding: "10px" }} variant="contained" color="primary" onClick={this.handleAction.bind(this)}>{this.state.loginMode ? "Bejelentkezés" : "Regisztráció"}</Button>
            <RegText variant="body2" onClick={this.toggleMode.bind(this)}>
                <u>{this.state.loginMode ? "Nincs felhasználóm" : "Már van felhasználóm"}</u>
            </RegText>
        </React.Fragment>;
    }

    render() {
        return <Paper elevation={3} style={{ width: "400px", padding: "20px" }}>
            <Typography variant="h5" style={{ textAlign: "center" }}>{this.state.loginMode ? "Bejelentkezés" : "Regisztráció"}</Typography>
            <TableWrapper>
                <Row>
                    <TextField id="username" fullWidth label="Felhasználónév" value={this.state.inputUsername} onChange={(e) => this.setState({ inputUsername: e.target.value })} />
                </Row>
                <Row>
                    <TextField id="password" type="password" fullWidth label="Jelszó" value={this.state.inputPassword} onChange={(e) => this.setState({ inputPassword: e.target.value })} />
                </Row>
                <Row style={{ marginTop: "20px" }}>
                    <Error><Typography>{this.state.errorText}</Typography></Error>
                </Row>
                <Row style={{ marginTop: "20px", display: "flex", justifyContent: "center", flexFlow: "column" }}>
                    {this.renderActions()}
                </Row>
            </TableWrapper>
        </Paper>
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginCard);