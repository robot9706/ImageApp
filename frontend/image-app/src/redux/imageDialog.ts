import { Entry } from "../api";

const ACTION_SHOW = "ACTION_SHOW";
const ACTION_HIDE = "ACTION_HIDE";

export const showImageDialog = (entry: Entry) => ({
    type: ACTION_SHOW,
    data: {
        entry: entry
    }
});

export const hideImageDialog = () => ({
    type: ACTION_HIDE,
});

const initialDialogState = {
    visible: false,
    entry: undefined
};

export const dialogReducer = (state = initialDialogState, action: any) => {
    switch (action.type) {
        case ACTION_SHOW:
            return {
                visible: true,
                entry: action.data.entry
            };
        case ACTION_HIDE:
            return {
                visible: false,
                entry: undefined
            };
        default:
            return state
    }
};