import axios from 'axios';
import { store } from './redux/store';

const errorHandler = (err: any) => {
    return {
        ok: false
    };
}

export interface AuthUser {
    username: string;
    password: string;
}

const createHeaders = (token2?: string) => {
    const token = store.getState().user.token;
    if (token === null) {
        if (token2 !== null) {
            return {
                headers: {
                    authorization: token2
                }
            };
        }

        return {
            headers: { }
        };
    }

    return {
        headers: {
            authorization: token
        }
    };
};

const apiGet = (url: string, token?: string): any => {
    return axios.get(process.env.REACT_APP_BACKEND + url, createHeaders(token));
}

const apiPost = (url: string, postData: any): any => {
    return axios.post(process.env.REACT_APP_BACKEND + url, postData, createHeaders());
}

export const apiLogin = (user: AuthUser): Promise<any> => {
    return apiPost("/login", user).then((res: any) => res.headers).catch(errorHandler);
};

export const apiRegister = (user: AuthUser): Promise<any> => {
    return apiPost("/register", user).then((res: any) => {return { ok: (res.status == 200) } }).catch(errorHandler);
};

export const apiGetUserInfo = (token?: string): Promise<any> => {
    return apiGet('/userInfo', token).then((res: any) => res.data).catch(errorHandler);
};