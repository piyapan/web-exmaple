import http from './http'
let Service = {
    bashPath: '',
    _getPath(id=null, queryString={}){

        if(id){
            this.bashPath += this.bashPath + id + '/';
        }
        if(queryString){
            let params = '';
            for (let _key in queryString){
                if(queryString.hasOwnProperty(_key)){
                    params += _key + '=' + queryString[_key];
                }
            }
            this.bashPath += params
        }
        return this.bashPath
    },
    GetList(queryString={}) {
        return http.Get(this._getPath(null, queryString))
    },
    Add(data) {
        return http.Post(this._getPath(), data)
    },
    Edit(id, data){
        return http.Put(this._getPath(id), data)
    }
};

export default Service