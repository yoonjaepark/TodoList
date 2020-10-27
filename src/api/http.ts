import axios, { AxiosRequestConfig } from 'axios';

export const http = <T> (request: AxiosRequestConfig): Promise<T> => {
  return axios.request({ baseURL: `${process.env.REACT_APP_API_URL!}`, method: 'GET' , ...request })
    .then(response => {
      return response.data;
    });
};