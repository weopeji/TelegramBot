((global) => {
    var _data = new Date();
    $('.alert span').html(`${_data.getDate()}.${_data.getMonth() + 1}.${_data.getFullYear()}`);
    $('body').append('<div class="all_good"></div');
})(window)

