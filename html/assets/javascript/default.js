(function (global) 
{
    io_connect( function() 
    {
        global.loadResources(['./html/assets/javascript/components.js'], () => {
            Main();
        });    
    })

    function Main()
    {
        
        const _moderation       = new global.Components.moderation();
        const _active           = new global.Components.active();
        const _project          = new global.Components.project();
        const _correction       = new global.Components.correction();

        const _components = {
            "moderation": async function() {
                var _block = await _moderation.render();
                $('.index_page_body_row').empty();
                $('.index_page_body_row').append(_block);
                redactingButton();
            },
            "moderation_mini": async function() {
                var _block = await _moderation.render_mini();
                $('.index_page_body_row').empty();
                $('.index_page_body_row').append(_block);
                redactingButton();
            },
            "active": async function() {
                var _block = await _active.render();
                $('.index_page_body_row').empty();
                $('.index_page_body_row').append(_block);
                redactingButton();
            },
            "active_mini": async function() {
                var _block = await _active.render_mini();
                $('.index_page_body_row').empty();
                $('.index_page_body_row').append(_block);
                redactingButton();
            },
            "correction": async function() {
                var _block = await _correction.render();
                $('.index_page_body_row').empty();
                $('.index_page_body_row').append(_block);
                redactingButton();
            },
            "correction_mini": async function() {
                var _block = await _correction.render_mini();
                $('.index_page_body_row').empty();
                $('.index_page_body_row').append(_block);
                redactingButton();
            },
            "preloader": function(header, body, data) {
                var _block = $(`
                    <div class="preloader_block_body">
                        <h1>${header}</h1>
                        <p>${body}</p>
                    </div>
                `);
                $('.index_page_body_row').empty();
                $('.index_page_body_row').append(_block);

                _project._allert(data);
            }
        }

        _components.moderation();

        $('.preloader').fadeOut();

        var typeAttr = 'moderation';

        $('.index_page_menu_line').click( function() 
        {
            $('.index_page_menu_line').removeClass('selected');
            $(this).addClass('selected');
            typeAttr = $(this).attr('data');
            _components[$(this).attr('data')]();
        });

        async function redactingButton() 
        {
            $('.redacting_button').click( async function() {
                var _id     = $(this).attr("data");
                $('.index_page_body_row').empty();
                var _block  = await _project.render(_id);
                acceptingButtons(_id);
            });

            $('.moderation_search_block_buttons_type_full').click( function() {
                $('.moderation_search_block_buttons_type_mini').removeClass('selected');
                $(this).addClass('selected');
                _components[typeAttr]();
            });

            $('.moderation_search_block_buttons_type_mini').click( function() {
                $('.moderation_search_block_buttons_type_full').removeClass('selected');
                $(this).addClass('selected');
                _components[typeAttr + "_mini"]();
            })
        }

        function acceptingButtons(_id) 
        {
            $('.accept').click( async function() 
            {
                _project.accept(_id);
                await _moderation.setActive(_id);

                _components.preloader("Проект принят", "Будет расположена в разделе активные", "Проект принят!");
            });

            $('.not_accept').click( function() 
            {
                var _array = [];

                $('.index_page_body_project_data').children().each(function(i,elem) {
                    var cheack = $(elem).find('input[type="checkbox"]').is(":checked");
                    if(cheack) 
                    {
                        _array.push({
                            type: $(elem).find('textarea').attr('id').split('_')[0],
                            value: $(elem).find('textarea').val(),
                        })
                    }
                });

                _project.not_accept({
                    _id: _id,
                    data: _array,
                });

                _components.preloader("Заявка отправлена на доработку", "Будет расположена в разделе На исправлении", "Проект отправлен на исправление!");
            });
        }
        
    }

    $('.click_button').click( function() {
        $('.index_page_menu').toggleClass('selected');
    })

}(window))