const userModel = function () {

    function login(username, password) {
        let authString = btoa(`${username}:${password}`);
        let headers = {
            Authorization: 'Basic ' + authString
        };
        let data = {
            username,
            password
        };
        let url = `user/${storage.appKey}/login`;
        return requester.post(url, data, headers)
    }

    const logout = function () {
        let url = `user/${storage.appKey}/_logout`;

        return requester.post(url);
    };

    function register(username, password) {
        let data = {
            username,
            password
        };
        let authString = btoa(`${storage.appKey}:${storage.appSecret}`);
        let headers = {Authorization: 'Basic ' + authString};
        let url = `user/${storage.appKey}`;
        return requester.post(url, data, headers)
    }

    const isAuthorized = function (ctx) {
        ctx.isAuth = storage.getData('authToken') !== null;
        // ctx.anonymous = storage.getData('authToken') === null;
        if (storage.getData('userInfo') !== null) {
            ctx.username = storage.getData('userInfo').username;
        }
    };

    return {
        register,
        login,
        logout,
        isAuthorized
    }

}();