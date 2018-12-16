import http from '../common/http'
export default {
    getPlanList: async function(){
        return await http.Get('/plan/')
    }
}

