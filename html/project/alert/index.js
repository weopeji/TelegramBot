((global) => {
    var _data = new Date();
    $('.alert span').html(`${_data.getDate()}.${_data.getMonth()}.${_data.getFullYear()}`);
    $('body').append('<div class="all_good"></div');
})(window)

