const storage = (function () {
    const appKey = 'kid_ry7DZMqgE';
    const appSecret = 'c0041b716b15445aa1fbef09a571001b';

    const saveData = function (key, value) {
        sessionStorage.setItem(appKey + key, JSON.stringify(value));
    };

    const getData = function (key) {
        return JSON.parse(sessionStorage.getItem(appKey + key));
    };

    const deleteData = function(key) {
        sessionStorage.removeItem(appKey + key);
    };

    const saveUser = function(data){
        saveData('userInfo', {
            id: data._id,
            username: data.username,
        });

        saveData('authToken', data._kmd.authtoken);
    };

    const deleteUser = function(){
        deleteData('authToken');
        deleteData('userInfo');
    };

    return {
        saveData,
        getData,
        deleteData,
        appKey,
        appSecret,
        saveUser,
        deleteUser
    };
}());