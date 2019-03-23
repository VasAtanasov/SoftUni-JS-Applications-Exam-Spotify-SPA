const songController = function () {

    function allSongsGet(ctx) {
        userModel.isAuthorized(ctx);
        songModel.listOthersSongs().then(function (othersSongs) {
            songModel.listMySongs().then(function (mySongs) {
                ctx.songs = othersSongs.concat(mySongs).map(isAuthor).map(song => setPage(song, 'all'));
                ctx.loadPartials({
                    header: "views/common/header.hbs",
                    footer: "views/common/footer.hbs",
                    songPartial: "views/songs/songPartial.hbs"
                }).then(function () {
                    this.partial("views/songs/allSongs.hbs")
                });
            }).catch(notify.handleError);
        }).catch(notify.handleError);
    }

    function addSongGet(ctx) {
        userModel.isAuthorized(ctx);
        ctx.loadPartials({
            header: "views/common/header.hbs",
            footer: "views/common/footer.hbs"
        }).then(function () {
            this.partial("views/songs/add.hbs")
        });
    }

    function addSongPost(ctx) {
        userModel.isAuthorized(ctx);
        let songData = {
            title: ctx.params.title,
            artist: ctx.params.artist,
            imageURL: ctx.params.imageURL,
            likes: 0,
            listened: 0
        };

        if (!validator.validateSong(songData)) {
            return;
        }

        songModel.createSong(songData).then(function (song) {
            notify.showInfo("Song created successfully.");
            ctx.redirect("#/songs/all");
        }).catch(notify.handleError);
    }

    function likeSong(ctx) {
        let songId = ctx.params.id;
        let page = ctx.params.page;
        songModel.getSong(songId).then(function (song) {
            song.likes = song.likes + 1;
            songModel.updateSong(song).then(function () {
                notify.showInfo("Liked!");
                ctx.redirect(`#/songs/${page}`);
            }).catch(notify.handleError);
        }).catch(notify.handleError);
    }

    function listenSong(ctx) {
        let songId = ctx.params.id;
        let page = ctx.params.page;
        songModel.getSong(songId).then(function (song) {
            song.listened = song.listened + 1;
            songModel.updateSong(song).then(function () {
                notify.showInfo(`You just listened ${song.title}`);
                ctx.redirect(`#/songs/${page}`);
            }).catch(notify.handleError);
        }).catch(notify.handleError);
    }

    function removeSong(ctx) {
        let songId = ctx.params.id;
        songModel.removeSong(songId).then(function (song) {
            notify.showInfo("Song removed successfully!");
            ctx.redirect(`#/songs/all`);
        }).catch(notify.handleError);
    }

    function allMySongsGet(ctx) {
        userModel.isAuthorized(ctx);
        songModel.listMySongs().then(function (songs) {
            ctx.songs = songs.map(isAuthor).map(song => setPage(song, 'my'));
            ctx.loadPartials({
                header: "views/common/header.hbs",
                footer: "views/common/footer.hbs",
                songPartial: "views/songs/songPartial.hbs"
            }).then(function () {
                this.partial("views/songs/mySongs.hbs")
            });
        }).catch(notify.handleError);
    }

    function isAuthor(song) {
        song.isAuthor = storage.getData('userInfo').id === song._acl.creator;
        return song;
    }

    function setPage(song, page) {
        song.page = page;
        return song;
    }

    return {
        allSongsGet,
        addSongGet,
        addSongPost,
        likeSong,
        listenSong,
        removeSong,
        allMySongsGet
    }

}();