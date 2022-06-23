((global) => {

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

    io_connect( async function() 
    {
        var _data = await callApi({
            methodName: "teletube_get",
            data: null,
        });

        for(var videData of _data)
        {
            var videDataBlock = videData.data;

            var templateText = $(`
                <div class="index_page_block">
                    <div class="index_page_block_video">
                        <video controls>
                            <source src="${videDataBlock.file}">
                        </video>
                    </div>
                    <div class="index_page_block_info">
                        <div class="index_page_block_info_userBlock">
                            <div class="index_page_block_info_userBlock_Img">
                                <img src="${videDataBlock.photoProfile}" alt="">
                            </div>
                            <span>${videDataBlock.userName}</span>
                        </div>
                        <div class="index_page_block_info_header">
                            <span>${videDataBlock.caption}</span>
                        </div>
                    </div>
                </div>
            `);

            $('.index_page').append(templateText);
        }
    });

})(window);