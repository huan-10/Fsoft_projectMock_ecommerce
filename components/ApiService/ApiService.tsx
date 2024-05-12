import axios, { AxiosInstance, AxiosResponse } from 'axios';

const config = {
    api: ' http://localhost:8888',

    options: {
        headers: { 'content-type': 'application/json' },
    },
};

const handleResponse = (response: AxiosResponse) => {
    if (response.status === 200) {
        return response.data;
    } else {
        throw new Error(response.statusText);
    }
};

const apiInstance: AxiosInstance = axios.create({
    baseURL: config.api,
    headers: config.options.headers,
});

apiInstance.interceptors.response.use(
    (response) => handleResponse(response),
    (error) => {
        console.error('Fetch error:', error);
        return Promise.reject(error);
    }
);

export const httpGet = async (endpoint: string) => {
    try {
        const response = await apiInstance.get(endpoint);
        return response;
    } catch (error) {
        const errorMessage = error as string;
        console.error(errorMessage);
        throw new Error(errorMessage);
    }

};
export const httpPost = async (endpoint: string, data: object) => {
    try {
        const response = await apiInstance.post(endpoint, data);
        return response;
    } catch (error) {
        const errorMessage = error as string;
        console.error(errorMessage);
        throw new Error(errorMessage);
    }

};

export const httpPut = async (endpoint: string, data: object) => {
    try {
        const response = await apiInstance.put(endpoint, data);
        return response;
    } catch (error) {
        const errorMessage = error as string;
        console.error(errorMessage);
        throw new Error(errorMessage);
    }

};

export const httpDelete = async (endpoint: string, data?: object) => {
    try {
        const response = await apiInstance.delete(endpoint, { data });
        return response;
    } catch (error) {
        const errorMessage = error as string;
        console.error(errorMessage);
        throw new Error(errorMessage);
    }

};


