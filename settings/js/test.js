var param       = _project.data.organization;

var string      = function (element, _project)
{

    var moreBlock  = {
        "string": function() {
            return `<p>${_project.data[element._id]}</p>`;
        },
        "file": function() {
            var file_block = `
                <div class="body_point_line_file_show">
                    <span>Посмотреть</span>
                </div>
            `;

            return file_block;
        },
    };

    var _line = $(`
        <div class="body_point_line_block_more">
            <div class="body_point_line body_point_line_first" data="${element._id}">
                <span>${element.name}:</span>
                ${moreBlock[element.type]()}
            </div>
            <div class="body_point_line body_point_line_input" data="${element._id}_input">
                <textarea rows="1" id="${element._id}_textarea" class="text_area"></textarea>
                <div class="body_point_line_input_buttons">
                    <span class="body_point_line_input_close">
                        <i class="fal fa-minus-square"></i>
                    </span>
                    <span class="body_point_line_input_accept">
                        <i class="fal fa-check-square"></i>
                    </span>
                </div>
            </div>
        </div>
    `);

    _line.find('textarea').change(function() {
        global.setCookie($(this).attr('id'), $(this).val());
    })

    if(_getCookie(`${element._id}_textarea`))
    {
        _line.find('textarea').val(_getCookie(`${element._id}_textarea`));
    }

    _line.find(".body_point_line_input_close").click( function() {
        $(this).parent().parent().fadeOut( function() 
        {
            $(this).parent().find(".body_point_line_first").fadeIn();
        });
    })

    _line.find(".body_point_line_input_accept").click( function() 
    {
        var _text = $(this).parent().parent().find("textarea").val();

        if(_text.length > 0)
        {
            callApi({
                methodName: 'redactingLineSettingsPage',
                data: {
                    projectId: _GET('id'),
                    lineId: $(this).parent().parent().attr('data').split('_')[0],
                    data: _text,
                },
            });

            $(this).parent().parent().fadeOut( function() 
            {
                $(this).parent().find(".body_point_line_first p").html(_text);
                $(this).parent().find(".body_point_line_first").fadeIn();
            });
        }
    })



    if(element.type == "string") {
        _line.find(".body_point_line_first").click( function() {
            $(this).fadeOut( function() {
                $(this).parent().find(".body_point_line_input").css("display", "flex");
            });
        })
    } else {
        var _url = getURL() + "/projects/" + _project._id + "/" + _project.data[element._id];
        _line.find(".body_point_line_first").click( function() {
            // location.href = _url;
            window.open(_url);
        })
    }

    return _line;
}

for (var key in struct) 
{
    var _body       = $(`<div class="body_point"></div>`);

    if(param != "1") {
        if(key == "+3.1" || key == "+3.2" || key == "+3.3") {
            continue;
        }
    }

    var data = struct[key];

    _body.append(`
        <div class="body_point_header">
            <span>${data.header}</span>
        </div>
    `);

    if(key == "+2") {
        if(param == 1 || param == 2) {
            data.body[1].forEach(element => 
            {
                _body.append(string(element, _project), );
            });
        } else {
            data.body[2].forEach(element => 
            {
                _body.append(string(element, _project));
            });
        }
    } else {
        data.body.forEach(element => 
        {
            _body.append(string(element, _project));
        });
    }

    _body.append(`
        <div class="body_point_textarea">
            <textarea id="${key}_textarea" class="text_area text_area_redacting" rows="1"></textarea>
        </div>
    `);
    
    this.global_block.append(_body);
}

var not_accept = 
$(`
    <div class="not_accept_block_button">
        <span>Отправить на доработку</span>
    </div>
`);

var _this = this;

not_accept.click( function () 
{
    var _array = [];

    $('.body_point').each(function(i,elem) 
    {
        var _input = $(elem).find('.text_area_redacting').val();

        if(typeof _input != 'undefined')
        {
            if(_input.length > 0)
            {
                _array.push({
                    type: $(elem).find('.text_area_redacting').attr('id').split('_')[0],
                    value: $(elem).find('.text_area_redacting').val(),
                })
            }
        }
    })

    _this.not_accept({
        _id: _GET('id'),
        data: _array,
    });

    alert('Проект отправленн на исправление!');
    
    location.reload();
})

this.global_block.append(not_accept)