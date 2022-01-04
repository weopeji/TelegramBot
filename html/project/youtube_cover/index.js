(async (global) => {

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    $('img').attr('src', `./images/${getRandomInt(8)}.jpg`)

})(window)