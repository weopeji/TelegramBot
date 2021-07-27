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
            "correction": async function() {
                var _block = await _correction.render();
                $('.index_page_body_row').empty();
                $('.index_page_body_row').append(_block);
                redactingButton();
            },
        }

        _components.moderation();

        $('.index_page_menu_line').click( function() 
        {
            $('.index_page_menu_line').removeClass('selected');
            $(this).addClass('selected');

            _components[$(this).attr('data')]();
        });

        async function redactingButton() {
            $('.redacting_button').click( async function() {
                var _id     = $(this).attr("data");
                $('.index_page_body_row').empty();
                var _block  = await _project.render(_id);
                acceptingButtons(_id);
            });

            $('.moderation_search_block_buttons_type_full').click( function() {
                $('.moderation_search_block_buttons_type_mini').removeClass('selected');
                $(this).addClass('selected');
                _components.moderation();
            });

            $('.moderation_search_block_buttons_type_mini').click( function() {
                $('.moderation_search_block_buttons_type_full').removeClass('selected');
                $(this).addClass('selected');
                _components.moderation_mini();
            })
        }

        function acceptingButtons(_id) {
            $('.accept').click( async function() 
            {
                _project.accept(_id);
                await _moderation.setActive(_id);
                var _block = await _moderation.render();
                $('.index_page_body_row').empty();
                $('.index_page_body_row').append(_block);
                redactingButton();
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
                $('.index_page_body_row').empty();
                $('.index_page_body_row').append(_block);
                redactingButton();
            });
        }
        
    }

}(window))