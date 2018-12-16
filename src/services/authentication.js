import session from '../common/session'
export default {
    login(username, password) {
        return session.post('/account/login-simple/', {username, password});
    },
    logout() {
        localStorage.clear();
        return session.get('/account/logout/');
    },
}