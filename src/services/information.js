import http from '@/common/http';
const path = '/information/'
export default {
    getInformationList: async function(){
        return http.Get(path)
    },
    addInformationList: async function(data){
      return http.Post(path, data)
    },
    updateInformation: async function(id, data){
        return http.Put(path + id+'/', data)
    },
    removeInformation: async function(id){
        return http.Delete(path + id + '/')
    }

}