import React from 'react';

import styled from "styled-components";

import { TextField, Paper, Typography, Button } from '@material-ui/core';

const TableWrapper = styled.div`{
    display: flex;
    width: 100%;
    flex-flow: column;
}`;

const Row = styled.div`{
    display: flex;
    flex-flow: row;
}`;

const Error = styled.div`{
    width: 100%;
    text-align: center;
    color: red;
}`;

export default class LoginCard extends React.Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return <Paper elevation={3} style={{width: "400px", padding: "20px"}}>
                <Typography variant="h5" style={{textAlign: "center"}}>Bejelentkezés</Typography>
                <TableWrapper>
                    <Row>
                        <TextField id="username" fullWidth label="Felhasználónév" />
                    </Row>
                    <Row>
                        <TextField id="password" type="password" fullWidth label="Jelszó" />
                    </Row>
                    <Row style={{marginTop: "20px"}}>
                        <Error><Typography>ERROR TEXT</Typography></Error>
                    </Row>
                    <Row style={{marginTop: "20px", display: "flex", justifyContent: "center"}}>
                        <Button style={{padding: "10px"}} variant="contained" color="primary">Bejelentkezés</Button>
                    </Row>
                </TableWrapper>
        </Paper>
    }
};
