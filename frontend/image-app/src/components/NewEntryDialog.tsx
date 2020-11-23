import React from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, Select, DialogActions, Switch, Typography, MenuItem } from '@material-ui/core';
import styled from "styled-components";
import { apiAdminCreateDirectory, apiAdminCreateFile } from '../api';

interface DialogProps {
    onDone: Function;
}

interface DialogState {
    open: boolean;
    entryName: string;
    isDirectory: boolean;
    parentID: string;
}

const SwitchRow = styled.div`{
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
}`;

export default class NewEntryDialog extends React.Component<DialogProps, DialogState> {
    inputFileRef: any;

    constructor(props: any) {
        super(props);

        this.state = {
            open: false,
            entryName: "",
            isDirectory: false,
            parentID: ""
        };
    }

    doOpen(currentID: string) {
        this.setState({
            open: true,
            entryName: "",
            parentID: currentID
        });
    }

    handleClose() {
        this.setState({
            open: false
        });
    }

    handleDone() {
        if (this.state.isDirectory) {
            apiAdminCreateDirectory(this.state.parentID, this.state.entryName).then(result => {
                if (result.ok) {
                    this.setState({
                        open: false
                    }, () => {
                        this.props.onDone();
                    });
                }
            });
        } else {
            const reader = new FileReader();
            reader.onload = (e) => {
                apiAdminCreateFile(this.state.parentID, this.state.entryName, this.inputFileRef.files[0].name, (e as any).target.result).then(result => {
                    if (result.ok) {
                        this.setState({
                            open: false
                        }, () => {
                            this.props.onDone();
                        });
                    }
                });
            };
            reader.readAsArrayBuffer(this.inputFileRef.files[0]);
        }
    }

    handleFileChange() {
        if (this.inputFileRef.files.length > 0 && this.state.entryName.length == 0) {
            let fName = this.inputFileRef.files[0].name;
            const indx = fName.lastIndexOf(".");
            if (indx > 0) {
                fName = fName.substr(0,indx);
            }
            this.setState({
                entryName: fName
            });
        }
    }

    render() {
        return <Dialog onClose={this.handleClose.bind(this)} open={this.state.open} maxWidth={"md"}>
            <DialogTitle>Új {this.state.isDirectory ? "mappa" : "file"}</DialogTitle>
            <DialogContent>
                <SwitchRow>
                    <Typography>Fájl</Typography>
                    <Switch color="primary" checked={this.state.isDirectory} onChange={(e) => this.setState({ isDirectory: e.target.checked })} />
                    <Typography>Mappa</Typography>
                </SwitchRow>
                <TextField autoFocus margin="dense" id="ename" type="text" fullWidth label="Név" value={this.state.entryName} onChange={(e) => this.setState({ entryName: e.target.value })} />
                {
                    this.state.isDirectory ? null :
                    (
                        <>
                            <input ref={(r) => this.inputFileRef = r} type="file" name="imageFile" id="imageFile" onChange={this.handleFileChange.bind(this)}></input>
                        </>
                    )
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={this.handleClose.bind(this)} color="primary">Mégse</Button>
                <Button onClick={this.handleDone.bind(this)} color="primary" disabled={this.state.entryName.length == 0}>Létrehozás</Button>
            </DialogActions>
        </Dialog>;
    }
}