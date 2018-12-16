import http from '@/common/http';

export default {
    getBudgetList: async function(){
        return http.Get('/budget-year/')
    }
}