import axios, { AxiosInstance } from 'axios';

class JsonRestClient{
    DefaultHeaders = {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    }
    request: AxiosInstance | undefined;
    /**
     *
     */
    constructor(uri: string) {
        this.request = axios.create({
            baseURL: uri,
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            responseType: 'json'
        });
    }

    async get(path: string){
        if(this.request)
            return await this.request.get(path);
    }

    async getTyped<T>(path: string){
        if(this.request)
            return await this.request.get<T>(path);
    }

    async post(path: string, body?: any){
        if(this.request)
            return await this.request.post(path, body);
    }

    async put(path: string, body?: any){
        if(this.request)
            return await this.request.post(path, body);
    }
}

export default JsonRestClient;