const app = Sammy('#container', function () {
    this.use('Handlebars', 'hbs');

    this.get('#/', homeController.index);
    this.get('index.html', homeController.index);

    this.get('#/login', userController.loginGet);
    this.post('#/login', userController.loginPost);
    this.get('#/logout', userController.logout);
    this.get('#/register', userController.registerGet);
    this.post('#/register', userController.registerPost);

    this.get('#/songs/all',songController.allSongsGet);
    this.get('#/songs/my',songController.allMySongsGet);
    this.get('#/songs/add',songController.addSongGet);
    this.post('#/songs/add',songController.addSongPost);
    this.get('#/songs/like/:id/:page',songController.likeSong);
    this.get('#/songs/listen/:id/:page',songController.listenSong);
    this.get('#/songs/remove/:id',songController.removeSong);

});


$(() => {
    app.run('#/');
});