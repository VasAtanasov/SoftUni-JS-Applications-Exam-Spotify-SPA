const songModel = function () {

    function createSong(songData) {
        let url = `appdata/${storage.appKey}/songs`;
        return requester.post(url, songData);
    }

    function listAllSongs() {
        let url = `appdata/${storage.appKey}/songs?query={}&sort={}`;
        return requester.get(url);
    }

    function updateSong(songData) {
        let url = `appdata/${storage.appKey}/songs/${songData._id}`;
        return requester.put(url, songData);
    }

    function getSong(songId) {
        let url = `appdata/${storage.appKey}/songs/${songId}`;
        return requester.get(url);
    }

    function listMySongs() {
        let url = `appdata/kid_ry7DZMqgE/songs?query={"_acl.creator":"${storage.getData("userInfo").id}"}&sort={"likes": -1, "listened": -1}`;
        return requester.get(url);
    }

    function listOthersSongs() {
        let url = `appdata/kid_ry7DZMqgE/songs?query={"_acl.creator":{"$ne":"${storage.getData("userInfo").id}"}}&sort={"likes": -1}`;
        return requester.get(url)
    }

    function removeSong(songId) {
        let url = `appdata/${storage.appKey}/songs/${songId}`;
        return requester.del(url)
    }

    return {
        createSong,
        listAllSongs,
        getSong,
        updateSong,
        listMySongs,
        removeSong,
        listOthersSongs
    }

}();