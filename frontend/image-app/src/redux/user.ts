const ACTION_LOGIN = "ACTION_LOGIN";
const ACTION_LOGOUT = "ACTION_LOGOUT";

export const onUserLogin = (name: string, token: string, admin: boolean) => ({
    type: ACTION_LOGIN,
    data: {
        name: name,
        token: token,
        admin: admin
    }
});

export const onUserLogout = () => ({
    type: ACTION_LOGOUT,
});

const initialUserState = {
    name: null,
    token: null,
    admin: false
};

export const userReducer = (state = initialUserState, action: any) => {
    switch (action.type) {
        case ACTION_LOGIN:
            return {
                name: action.data.name,
                token: action.data.token,
                admin: action.data.admin
            };
        case ACTION_LOGOUT:
            return {
                name: null,
                token: null,
                admin: false
            };
        default:
            return state
    }
};