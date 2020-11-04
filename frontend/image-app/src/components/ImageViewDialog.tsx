import React from 'react';

import styled from "styled-components";
import { connect } from "react-redux";

import { apiGetImageAddress, Entry } from '../api';
import { Dialog, DialogTitle } from '@material-ui/core';
import { hideImageDialog } from '../redux/imageDialog';

const mapStateToProps = (store: any) => {
    return {
        visible: store.imageDialog.visible,
        entry: store.imageDialog.entry
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        close: () => {
            dispatch(hideImageDialog());
        }
    };
};

type ActualProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
class ImageViewDialog extends React.Component<ActualProps> {
    constructor(props: any) {
        super(props);
    }

    handleClose() {
        this.props.close();
    }

    render() {
        return (
           <Dialog open={this.props.visible} onClose={this.handleClose.bind(this)}>
               {
                   this.props.entry != null ?
                   <>
                        <DialogTitle>{ this.props.entry?.name }</DialogTitle>
                        <img src={apiGetImageAddress(this.props.entry)} />
                   </>
                   : null
               }
           </Dialog>
        );
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageViewDialog);