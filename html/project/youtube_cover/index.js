(async (global) => {
    
    const callApi = ({ methodName, data }) => {    
        return new Promise((resolve, reject) => 
        {
            global.PostComponents(
                methodName,
                data,
                (response) => {
                    resolve(response)
                }
            )
        });
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    $('img').attr('src', `./images/${getRandomInt(8)}.jpg`);

    var _id = _GET('id');

    var need_project = await callApi({
        methodName: 'getProject',
        data: _id,
    });

    $('.index_page_block_body h1').html(need_project.data.name);
    $('.index_page_block_target span').html(need_project.data.target);

})(window)