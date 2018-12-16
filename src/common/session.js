import axios from 'axios';
import config from '../vue.config';

const CSRF_COOKIE_NAME = 'csrftoken';
const CSRF_HEADER_NAME = 'X-CSRFToken';


const session = axios.create({
    baseURL: config.baseURLAPI,
    withCredentials: true,
    headers: {
        "content-type": "application/json",
    },
    xsrfCookieName: CSRF_COOKIE_NAME,
    xsrfHeaderName: CSRF_HEADER_NAME,
});
session.interceptors.response.use(function (response) {
    return response
}, function (error) {
    if (error.response.status === 401 || error.response.status === 403) {
        localStorage.clear();
        document.cookie = '';
        session.get('/account/logout/');
        window.location.reload()
    }
    return Promise.reject(error.response);
});
export default session;

