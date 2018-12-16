import http from '../common/http';
export default {
    geIntegrateList(){
        return http.Get('/integrated-plan/')
    }
}