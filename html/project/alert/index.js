((global) => {
    function fixedEncodeURI (str) {
        return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
    }

    var _textEncode = urldecode(_GET("text"));
    var _data = new Date();
    $('.alert span').html(`${_data.getDate()}.${_data.getMonth() + 1}.${_data.getFullYear()}`);
    $('.alert p').html(_textEncode);
    $('body').append('<div class="all_good"></div');
})(window)

