import axios from 'axios';
import { store } from './redux/store';

const errorHandler = (err: any) => {
    return {
        ok: false
    };
}

const headerHandler = (res: any) => {
    return {
        ok: true,
        headers: res.headers
    };
}

const successHandler = (res: any) => {
    return {
        ok: (res.status == 200)
    };
};

const dataHandler = (res: any) => {
    return {
        ok: true,
        data: res.data
    };
}

export interface AuthUser {
    username: string;
    password: string;
}

export interface UserSettings {
    id: string;
    name: string;
    allowedExtensions: string[];
}

export interface Entry {
    id: string;
    name: string;
    extension: string;
    directory: boolean;
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
    return apiPost("/login", user).then(headerHandler).catch(errorHandler);
};

export const apiRegister = (user: AuthUser): Promise<any> => {
    return apiPost("/register", user).then(successHandler).catch(errorHandler);
};

export const apiGetUserInfo = (token?: string): Promise<any> => {
    return apiGet('/userInfo', token).then(dataHandler).catch(errorHandler);
};

export const apiAdminGetUsers = (): Promise<any> => {
    return apiGet('/admin/allUsers').then(dataHandler).catch(errorHandler);
};

export const apiAdminGetExtensions = (): Promise<any> => {
    return apiGet('/admin/allExtensions').then(dataHandler).catch(errorHandler);
};

export const apiAdminSaveExtensions = (user: UserSettings): Promise<any> => {
    return apiPost('/admin/userModifyExt', user).then(successHandler).catch(errorHandler);
};

export const apiGetContent = (fromID: string): Promise<any> => {
    const params = (fromID == null ? "" : `?pid=${encodeURIComponent(fromID)}`);

    return apiGet(`/content/byParentId${params}`).then(dataHandler).catch(errorHandler);
};

export const apiGetImageAddress = (entry: Entry): string => {
    const token = store.getState().user.token;

    return `${process.env.REACT_APP_BACKEND}/content/data?id=${entry.id}&t=${token}`;
};

export const apiAdminCreateDirectory = (parentId: string, name: string): Promise<any> => {
    return apiPost('/admin/createDirectory', { parentId: parentId, name: name }).then(successHandler).catch(errorHandler);
};

export const apiAdminCreateFile = (parentId: string, name: string, fullFilename: string, data: ArrayBuffer): Promise<any> => {
    const formData = new FormData();
    formData.append("file", new Blob([data]), fullFilename);

    return apiPost(`/admin/createFile?parentId=${encodeURIComponent(parentId)}&name=${encodeURIComponent(name)}`, formData).then(successHandler).catch(errorHandler);
};

export const apiAdminDeleteEntry = (entryId: string): Promise<any> => {
    return apiGet(`/admin/deleteEntry?entryId=${encodeURIComponent(entryId)}`).then(successHandler).catch(errorHandler);
};