import session from './session'

function handleSuccess(response) {
    return response.data
}

export default {

    Post: function (path, data) {
        return session.post(path, data).then(handleSuccess)
    },
    Get: function (path) {
        return session.get(path).then(handleSuccess)
    },
    Put: function (path, data) {
        return session.put(path, data).then(handleSuccess)
    },
    Path: function (path, data) {
        return session.path(path, data).then(handleSuccess)
    },
    Delete: function (path) {
        return session.delete(path).then(handleSuccess)
    }

}



