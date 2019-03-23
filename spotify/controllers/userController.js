const userController = function () {

    function loginGet(ctx) {
        userModel.isAuthorized(ctx);
        ctx.loadPartials({
            header: "views/common/header.hbs",
            footer: "views/common/footer.hbs"
        }).then(function () {
            this.partial("views/user/login.hbs")
        });
    }

    function loginPost(ctx) {
        let username = ctx.params.username;
        let password = ctx.params.password;
        if (!validator.validCredentials(username, password)) {
            return;
        }
        userModel.login(username, password).then(function (data) {
            storage.saveUser(data);
            ctx.redirect('#/');
            notify.showInfo("Login successful.");
        }).catch(notify.handleError);
    }

    function logout(ctx) {
        userModel.logout().then(function () {
            storage.deleteUser();
            notify.showInfo("Logout successful.");
            ctx.redirect('#/login');
        });
    }

    function registerGet(ctx) {
        userModel.isAuthorized(ctx);
        ctx.loadPartials({
            header: "views/common/header.hbs",
            footer: "views/common/footer.hbs"
        }).then(function () {
            this.partial("views/user/register.hbs")
        });
    }

    function registerPost(ctx) {
        let username = ctx.params.username;
        let password = ctx.params.password;

        if (!validator.isValidInput(username, password)) {
            return;
        }

        userModel.register(username, password).then(function (data) {
            storage.saveUser(data);
            ctx.redirect('#/');
            notify.showInfo("User registration successful.");
        }).catch(notify.handleError);
    }

    return {
        loginGet,
        loginPost,
        logout,
        registerGet,
        registerPost
    }

}();