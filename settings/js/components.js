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

    class auth_block
    {
        constructor() {};

        render() 
        {
            if(global.pageID) 
            {
                $(`.index_page_menu_block_line[data="${global.pageID}"]`).addClass('selected');
            }

            $('.index_page_menu_block_line').click( function() {
                location.href = `/settings/?page=${$(this).attr('data')}`;
            });
        }
    }

    class projects
    {
        constructor() 
        {
            this.global_block = $(`
                <div class="moderation_item_block"></div>
            `);
        };

        getBlocks(_array, name) 
        {
            _array.forEach(element => {
                var item_block = $(`
                    <div class="index_page_body_moderation_block" data="${element._id}">
                        <h1>${element.data.name}</h1>
                        <p>${element.data.target}</p>
                        <div class="index_page_body_moderation_block_info_line">
                            <span>${element._id}</span><a>${name}</a>
                        </div>
                        <div class="index_page_body_info">
                            <div class="index_page_body_info_line">
                                <span>Сумма</span><p>${element.data.attraction_amount} руб.</p>
                            </div>
                            <div class="index_page_body_info_line">
                                <span>На срок</span><p>${element.data.collection_period.replace(/-/g, ".")}</p>
                            </div>
                            <div class="index_page_body_info_line">
                                <span>Ставка % в год</span><p>${element.data.rate}%</p>
                            </div>
                            <div class="index_page_body_info_line">
                                <span>Выплаты</span><p>${element.data.date_payments}</p>
                            </div>
                            <div class="index_page_body_info_line">
                                <span>Вход от</span><p>${element.data.minimal_amount} руб.</p>
                            </div>
                        </div>
                        <div class="index_page_body_hrefs">
                            <a target="_blank" href="${getURL()}/html/project/profil/#${element._id}">
                                <i class="fal fa-id-card"></i>
                            </a>
                            <a target="_blank" href="${getURL()}/projects/${element._id}/${element.data["file+7"]}">
                                <i class="fal fa-presentation"></i>
                            </a>
                            <a target="_blank" href="${getURL()}/projects/${element._id}/${element.data["file+8"]}">
                                <i class="fal fa-play"></i>
                            </a>
                        </div>
                    </div>
                `);

                this.global_block.append(item_block);
            });

            $('.index_page_body_data').append(this.global_block);

            $('.index_page_body_moderation_block').click( function () {
                location.href = `/settings/?page=block&id=${$(this).attr('data')}`;
            });
        }

        async render(type) 
        {
            var typeRender = {
                "moderations": async function() {
                    var getModerations = await callApi({
                        methodName: "getModerations",
                        data: null,
                    });

                    return getModerations;
                },
            }

            this.getBlocks(typeRender[type](), "На модерации")
        }
    }

    if(!global.Components)
    {
        global.Components = {
            auth_block,
            projects,
        }
    }

}(window))