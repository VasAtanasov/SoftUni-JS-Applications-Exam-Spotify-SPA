const validator = function () {

    function isValidInput(username, password) {
        if (username.trim().length < 3) {
            notify.showError('The username should be at least 3 characters long.');
            return false;
        }

        if (password.trim().length < 6) {
            notify.showError('The password should be at least 6 characters long.');
            return false;
        }

        return true;
    }

    function validCredentials(username, password) {
        if (isEmpty(username)) {
            notify.showError('Username input field shouldn’t be empty!');
            return false;
        }

        if (isEmpty(password)) {
            notify.showError('Passwords input field shouldn’t be empty!');
            return false;
        }

        return true;
    }

    function validateSong(songData) {
        if (songData.title.length < 6) {
            notify.showError('The title should be at least 6 characters long');
            return false;
        }

        if (songData.artist.length < 3) {
            notify.showError('The artist should be at least 3 characters long');
            return false;
        }

        if (!songData.imageURL.startsWith("http://") && !songData.imageURL.startsWith("https://")) {
            notify.showError('The image should start with "http://" or "https://"');
            return false;
        }

        return true;
    }

    function isEmpty(value) {
        return !value.trim();
    }

    return {
        isValidInput,
        validCredentials,
        validateSong
    }
}();