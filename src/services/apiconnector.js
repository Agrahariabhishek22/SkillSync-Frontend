import axios from "axios";

export const axiosInstance = axios.create();

export const apiConnector = (method, url, bodyData, headers, params) => {
    return axiosInstance({
        method,
        url,
        data: bodyData,
        headers,
        params,
        // withCredentials: true,
    });
};

