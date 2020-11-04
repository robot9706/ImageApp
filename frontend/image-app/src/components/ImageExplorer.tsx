import React from 'react';

import styled from "styled-components";
import { connect } from "react-redux";

import imageFolder from '../images/icon-folder.png';
import imageFile from '../images/icon-file.png';
import { apiGetContent, Entry } from '../api';
import { Typography, Breadcrumbs, IconButton } from '@material-ui/core';
import { showImageDialog } from '../redux/imageDialog';
import BackIcon from '@material-ui/icons/KeyboardArrowLeft';

const mapStateToProps = (store: any) => {
    return {
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        showImageDialog: (entry: Entry) => {
            dispatch(showImageDialog(entry));
        }
    };
};

interface State {
    currentID: string;
    entries: Entry[];
    history: Entry[];
}

const ExplorerPage = styled.div`{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
}`;

const BreadcrumpContainer = styled.div`{
    flex: 0 0 auto;
    padding: 0.5rem;
    display: flex;
    align-items: center;
}`;

const ContentContainer = styled.div`{
    display: flex;
    flex-wrap: wrap;
}`;

const EntryWrapper = styled.div`{
    width: 256px;
    height: 256px;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    cursor: pointer;
}`;

const EntryImage = styled.img`{
    flex: 0 0 auto;
}`;

const EntryNameWrapper = styled.div`{
    flex: 1 1 auto;
    justify-content: center;
    align-items: center;
    display: flex;
}`;

const HistoryLink = styled(Typography)`{
    cursor: pointer;
}`;

type ActualProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
class ImageExplorer extends React.Component<ActualProps, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            currentID: "",
            entries: [],
            history: []
        };
    }

    componentWillMount() {
        this.fetchContent();
    }

    handleEntryClick(entry: Entry) {
        if (entry.directory) {
            const history = this.state.history;
            history.push(entry);

            this.setState({
                currentID: entry.id,
                history: history
            }, () => {
                this.fetchContent();
            });
        } else {
            this.props.showImageDialog(entry);
        }
    }

    fetchContent() {
        apiGetContent(this.state.currentID).then(data => {
            if (!data.ok) {
                return;
            }

            const sortFunction = (a: Entry, b: Entry) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            };

            const entries = data.data as Entry[];
            this.setState({
                entries: [ ...entries.filter(x => x.directory).sort(sortFunction), ...entries.filter(x => !x.directory).sort(sortFunction) ]
            });
        })
    }

    handleRootClick() {
        this.setState({
            history: [],
            currentID: ""
        }, () => {
            this.fetchContent();
        });
    }

    handleHistoryClick(entry: Entry) {
        const index = this.state.history.indexOf(entry);
        const history = this.state.history;
        history.splice(index + 1);

        this.setState({
            history: history,
            currentID: history[history.length - 1].id
        }, () => {
            this.fetchContent();
        });
    }

    handleOneUp() {
        const history = this.state.history;
        history.pop();
        this.setState({
            history: history,
            currentID: history.length > 0 ? history[history.length - 1].id : ""
        }, () => {
            this.fetchContent();
        });
    }

    render() {
        return (
            <ExplorerPage>
                <BreadcrumpContainer>
                    <IconButton onClick={this.handleOneUp.bind(this)}>
                        <BackIcon />
                    </IconButton>
                    <Breadcrumbs aria-label="breadcrumb">
                        <HistoryLink color="textPrimary" onClick={this.handleRootClick.bind(this)}>Root</HistoryLink>;
                        {
                            this.state.history.map((historyItem: Entry) => {
                                return <HistoryLink color="textPrimary" onClick={(() => { this.handleHistoryClick(historyItem); }).bind(this)}>{ historyItem.name }</HistoryLink>;
                            })
                        }
                        <Typography color="textPrimary"></Typography>
                    </Breadcrumbs>
                </BreadcrumpContainer>
                <ContentContainer>
                    {
                        this.state.entries.map((entry, index) => {
                            return <EntryWrapper key={index} onClick={(() => { this.handleEntryClick(entry); }).bind(this)}>
                                <EntryImage src={entry.directory ? imageFolder : imageFile} />
                                <EntryNameWrapper>
                                    <Typography>{entry.name}</Typography>
                                </EntryNameWrapper>
                            </EntryWrapper>;
                        })
                    }
                </ContentContainer>
            </ExplorerPage>
        );
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageExplorer);