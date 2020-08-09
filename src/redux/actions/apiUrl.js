import axios from "axios"

export function common_api() {
    return axios.create({
        baseURL: 'http://localhost:8000',
        withCredentials: false
    });
}
