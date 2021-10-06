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

    class moderations
    {
        constructor() 
        {
            this.global_block = $(`
                <div class="moderation_item_block"></div>
            `);
        };

        async render() 
        {
            $('.index_page_body_data').empty();

            var item_block = $(`
                <div class="index_page_body_moderation_block">
                    <div class="redacting_button" data="41">
                        <i class="fas fa-bars" aria-hidden="true"></i>
                    </div>

                    <h1>VYBERI.STORE</h1>
                    <p>На развитие</p>
                    <div class="index_page_body_moderation_block_info_line">
                        <div class="index_page_body_moderation_block_info_line_row">
                            <span>№ 41</span><a>На модерации</a>
                        </div>
                    </div>
                    <div class="index_page_body_body_line">
                        <div class="index_page_body_body_line_left">
                            <div class="row">
                                <span>СУММА</span>
                                <p> 7 000 000 руб.</p>
                            </div>
                        </div>
                        <div class="index_page_body_body_line_right">
                            <div class="row">
                                <span>НА СРОК</span>
                                <p>2026.12.03</p>
                            </div>
                        </div>
                    </div>
                    <div class="index_page_body_info">
                        <div class="index_page_body_info_line">
                            <span>Ставка % в год</span><p>1.00%</p>
                        </div>
                        <div class="index_page_body_info_line">
                            <span>Выплаты</span><p>Ежегодно</p>
                        </div>
                        <div class="index_page_body_info_line">
                            <span>Вход от</span><p>50 000 руб.</p>
                        </div>
                    </div>
                    <div class="index_page_body_hrefs">
                        <a target="_blank" href="https://skin-win.ru/html/project/profil/#41">Профиль компании</a>
                        <a target="_blank" href="https://skin-win.ru/projects/41/file+7.jpeg">Презентация</a>
                        <a target="_blank" href="https://skin-win.ru/projects/41/file+8.mp4">Видео-презентация</a>
                    </div>
                </div>
            `);

            this.global_block.append(item_block);
            $('.index_page_body_data').append(this.global_block);
        }
    }

    if(!global.Components)
    {
        global.Components = {
            auth_block,
            moderations,
        }
    }

}(window))