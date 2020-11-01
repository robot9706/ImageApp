import React from 'react';
import LoginCard from '../components/LoginCard';
import styled from "styled-components";
import { connect } from "react-redux";
import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, CircularProgress, FormControlLabel, Snackbar, Typography } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { history } from '../App';
import { apiAdminGetUsers, apiAdminGetExtensions, UserSettings, apiAdminSaveExtensions } from '../api';

const mapStateToProps = (store: any) => {
    return {
        isLoggedIn: store.user.token !== null,
        isAdmin: store.user.admin,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
    };
};

interface State {
    loading: boolean;
    extensions: string[];
    users: UserSettings[];
    changed: boolean[];
    error: boolean;
}

const PageWrapper = styled.div`{
    flex: 1 1 auto;
    display: flex;
    justify-content: center;
    padding: 1rem;
}`;

const PageColumn = styled.div`{
    min-width: 750px;
}`;

const CenterLoading = styled.div`{
    display: flex;
    justify-content: center;
}`;

const CheckboxContainer = styled.div`{
    display: flex;
    width: 100%;
}`;

const CheckboxRow = styled.div`{
    flex: 1 1 auto;
}`;

const SaveButtonRow = styled.div`{
    flex: 0 1 auto;
}`;

type ActualProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
class AdminPage extends React.Component<ActualProps, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            loading: false,
            extensions: [],
            users: [],
            changed: [],
            error: false
        };
    }

    refreshData() {
        this.setState({
            loading: true
        }, () => {
            apiAdminGetExtensions().then(extensions => {
                if (!extensions.ok) {
                    history.push("/");
                    return;
                }

                apiAdminGetUsers().then(users => {
                    if (!users.ok) {
                        history.push("/");
                        return;
                    }

                    this.setState({
                        loading: false,
                        extensions: extensions.data as string[],
                        users: users.data as UserSettings[],
                        changed: users.data.map((x: any) => false),
                    });
                });
            });
        })
    }

    componentWillMount() {
        if (!this.props.isLoggedIn || !this.props.isAdmin) {
            history.push("/");
            return;
        }

        this.refreshData();
    }

    handleExtensionChange(index: number, ext: string, checked: boolean) {
        const user = this.state.users[index];

        if (checked && !user.allowedExtensions.includes(ext)) {
            user.allowedExtensions.push(ext);
        }
        if (!checked && user.allowedExtensions.includes(ext)) {
            const index = user.allowedExtensions.indexOf(ext);
            user.allowedExtensions.splice(index, 1);
        }

        const usersArray = this.state.users;
        usersArray[index] = user;

        const changedArray = this.state.changed;
        changedArray[index] = true;

        this.setState({
            users: usersArray,
            changed: changedArray
        });
    }

    handleSave(index: number) {
        const changedArray = this.state.changed;
        changedArray[index] = false;
        this.setState({
            changed: changedArray
        }, () => {
            apiAdminSaveExtensions(this.state.users[index]).then(result => {
                if (!result.ok) {
                    changedArray[index] = true;
                    this.setState({
                        error: false,
                        changed: changedArray
                    });
                }
            });
        });
    }

    closeError() {
        this.setState({
            error: false
        });
    }

    renderList() {
        return <React.Fragment>
            {
                this.state.users.map((user, index) => {
                    return (<Accordion key={user.name}>
                        <AccordionSummary>
                            <Typography>{user.name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <CheckboxContainer>
                                <CheckboxRow>
                                    {
                                        this.state.extensions.map(ext => {
                                            return <FormControlLabel key={user.name + ext} control={
                                                <Checkbox
                                                    checked={user.allowedExtensions.includes(ext)}
                                                    onChange={((e: any) => { this.handleExtensionChange(index, ext, e.target.checked); }).bind(this)} />
                                            } label={ext.toUpperCase()} />;
                                        })
                                    }
                                </CheckboxRow>
                                <SaveButtonRow>
                                    <Button variant="contained" color="primary" disabled={!this.state.changed[index]}
                                        onClick={((e: any) => { this.handleSave(index); }).bind(this)}>Save</Button>
                                </SaveButtonRow>
                            </CheckboxContainer>
                        </AccordionDetails>
                    </Accordion>);
                })
            }
        </React.Fragment>;
    }

    render() {
        return <PageWrapper>
            <PageColumn>
                <CenterLoading>
                    <Typography variant="h5">Felhasználók kezelése</Typography>
                </CenterLoading>
                {
                    this.state.loading ?
                        <CenterLoading><CircularProgress /></CenterLoading> :
                        this.renderList()
                }
            </PageColumn>
            <Snackbar open={this.state.error} autoHideDuration={3000} onClose={this.closeError.bind(this)}>
                <MuiAlert elevation={6} variant="filled" onClose={this.closeError.bind(this)} severity="error">Hiba a mentés közben!</MuiAlert>
            </Snackbar>
        </PageWrapper>;
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);