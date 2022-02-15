(function (global) {
    "use strict";

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

    class chat
    {
        async render()
        {
            var getChats     = await callApi({
                methodName: "getChats",
                data:  global.allData._id,
            });

            var block = $(`
                <div class="msg_block_getting">

                </div>
            `);

            getChats.forEach(element => {

                var _PathUrl = null;

                if(element.img)
                {
                    _PathUrl = `https://api.telegram.org/file/bot2062839693:AAE0hzj8SVXyexq29s5x7aRLC5x8O77c-pQ/` + element.img.file_path;
                }

                var template_text = $(`
                    <div class="msg_block_getting_line">
                        <div class="msg_block_getting_line_img">
                            <div class="msg_block_getting_line_img_block">
                                <img src="${_PathUrl}" alt="">
                            </div>
                        </div>
                        <div class="msg_block_getting_line_text">
                            <span>${element.name}</span>
                            <p>${element.msgBlock.msgs[element.msgBlock.msgs.length - 1].text}</p>
                        </div>
                    </div>
                `);
                
                block.append(template_text);
            })

            $('.index_page_body_data').append(block);
        }
    }

    var components = {
        chat,
    };

    if(!global.Components) { global.Components = components; } 
    else { 
        for(var key in components)
        {
            global.Components[key] = components[key];
        }
    }

}(window))