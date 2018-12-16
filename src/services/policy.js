import http from '@/common/http'

export default {
    getPolicyList(){
        return http.Get('/policy/')
    }
}