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
        async pushMsgOfUser(msgText)
        {
            var myBlock = $(`
                <div class="chat_block_chat_body_msgs_line">
                    <div class="chat_block_chat_body_msgs_line_my">
                        <span>${msgText}</span>
                    </div>
                </div>
            `);

            $('.chat_block_chat_body_msgs').append(myBlock);
            $('.chat_block_chat_body_msgs').animate({scrollTop: $('.chat_block_chat_body_msgs').height()}, 'fast');

            await callApi({
                methodName: "msgUP",
                data: {
                    user: global.allData._id,
                    type: global.allData.User.type,
                    id: _GET("id"),
                    msg: msgText,
                },
            });

            $('.chat_block_chat_body_row_input input').val('');
        };

        async removeButtons() 
        {
            if(global.allData.User.type == "business")
            {
                $('.chat_block_info_more_buttons').remove();
            } else
            {
                $('.chat_block_info_more_buttons_line[data="complaint"]').remove();
            }
        };

        async removeButtonsAll()
        {
            $('.chat_block_info_more_buttons').remove();
        }

        async renderChat()
        {
            var _this   = this;
            var getChat = await callApi({
                methodName: "getChatsOfId",
                data: {
                    user: global.allData._id,
                    id: _GET("id")
                },
            });

            var templateText = $(`
                <div class="chat_block">
                    <div class="chat_block_chat">
                        <div class="chat_block_chat_header">
                            <span>Чат</span>
                        </div>
                        <div class="chat_block_chat_body">
                            <div class="chat_block_chat_body_row">

                                <div class="chat_block_chat_body_msgs">

                                </div>

                                <div class="chat_block_chat_body_row_input">
                                    <input type="text">
                                    <span>Отправить</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="chat_block_info">
                        <div class="info_active_block_photo">
                            <img src="${getChat.photo}" alt="">
                        </div>
                        <span>${getChat.name}</span>
                        <p>${getChat.type}</p>

                        <div class="chat_block_info_more_buttons">
                            
                        </div>
                    </div>
                </div>
            `);

            if(getChat.Inv.status == "not_correct")
            {
                if(getChat.Inv.not_correct.dataType == "money")
                {
                    var buttonsOfNot_correct = 
                    {
                        "investor": function() 
                        {
                            var actionBlock = $(`
                                <div class="chat_block_info_more_buttons_line_row">
                                    <div class="chat_block_info_more_buttons_line" data="complaint">
                                        <span>Подать жалобу</span>
                                    </div>
                                    <div class="chat_block_info_more_buttons_line" data="cancel">
                                        <span>Отменить и заполнить заного</span>
                                    </div>
                                </div>
                            `);

                            actionBlock.find('.chat_block_info_more_buttons_line[data="complaint"]').click( function() 
                            {
                                SoloAlert.confirm({
                                    title: "Подтверждение",
                                    body: "Вы уверены, что хотите отправить жалобу?",
                                    theme: "dark",
                                    html: "",
                                    useTransparency: true,
                                }).then(async (value) => 
                                {
                                    if(value)
                                    {
                                        await callApi({
                                            methodName: "not_correct_complaint",
                                            data: _GET("id"),
                                        });

                                        _this.pushMsgOfUser(`Инвестор подал жалобу по этому проекту, ожидайте решения модерации`);
                                        _this.removeButtons();

                                        SoloAlert.alert({
                                            title:"Успешно",
                                            body:"",
                                            icon: "success"
                                        });
                                    };
                                })
                            });

                            actionBlock.find('.chat_block_info_more_buttons_line[data="cancel"]').click( function() 
                            {
                                SoloAlert.confirm({
                                    title: "Подтверждение",
                                    body: "Вы уверены, что хотите отменить инвестицию?",
                                    theme: "dark",
                                    html: "",
                                    useTransparency: true,
                                }).then(async (value) => 
                                {
                                    if(value)
                                    {
                                        await callApi({
                                            methodName: "not_correct_complaint_again",
                                            data: _GET("id"),
                                        });

                                        _this.pushMsgOfUser(`Инвестиция была отменена инвестором`);
                                        _this.removeButtonsAll();

                                        SoloAlert.alert({
                                            title:"Успешно",
                                            body:"",
                                            icon: "success"
                                        });
                                    };
                                })
                            })

                            return actionBlock;
                        },
                        "business": function() 
                        {
                            var actionBlock = $(`
                                <div class="chat_block_info_more_buttons_line_row">
                                    <div class="chat_block_info_more_buttons_line" data="accept_investing">
                                        <span>Принять инвестицию</span>
                                    </div>
                                    <div class="chat_block_info_more_buttons_line" data="request_again">
                                        <span>Оформить инвестицию повторно</span>
                                    </div>
                                    <div class="chat_block_info_more_buttons_line" data="complaint">
                                        <span>Подать жалобу</span>
                                    </div>
                                </div>
                            `);

                            actionBlock.find('.chat_block_info_more_buttons_line[data="complaint"]').click( function() 
                            {
                                SoloAlert.confirm({
                                    title: "Подтверждение",
                                    body: "Вы уверены, что хотите отправить жалобу?",
                                    theme: "dark",
                                    html: "",
                                    useTransparency: true,
                                }).then(async (value) => 
                                {
                                    if(value)
                                    {
                                        await callApi({
                                            methodName: "not_correct_complaint",
                                            data: _GET("id"),
                                        });

                                        _this.pushMsgOfUser(`Бизнес подал жалобу по этому проекту, ожидайте решения модерации`);
                                        _this.removeButtons();

                                        SoloAlert.alert({
                                            title:"Успешно",
                                            body:"",
                                            icon: "success"
                                        });
                                    };
                                })
                            })

                            return actionBlock;
                        },
                    };

                    templateText.find('.chat_block_info_more_buttons').append(buttonsOfNot_correct[global.allData.User.type]());
                    templateText.find('.chat_block_info_more_buttons').css('display', 'block');
                };
            };

            templateText.find('.chat_block_chat_body_row_input span').click( async function() {
        
                var myBlock = $(`
                    <div class="chat_block_chat_body_msgs_line">
                        <div class="chat_block_chat_body_msgs_line_my">
                            <span>${$('.chat_block_chat_body_row_input input').val()}</span>
                        </div>
                    </div>
                `);

                $('.chat_block_chat_body_msgs').append(myBlock);
                $('.chat_block_chat_body_msgs').animate({scrollTop: $('.chat_block_chat_body_msgs').height()}, 'fast');

                await callApi({
                    methodName: "msgUP",
                    data: {
                        user: global.allData._id,
                        type: global.allData.User.type,
                        id: _GET("id"),
                        msg: $('.chat_block_chat_body_row_input input').val(),
                    },
                });

                $('.chat_block_chat_body_row_input input').val('');
            });

            if(getChat.msgs)
            {
                for(var msgBlock of getChat.msgs)
                {
                    var myBlock = $(`
                        <div class="chat_block_chat_body_msgs_line">
                            <div class="chat_block_chat_body_msgs_line_my">
                                <span>${msgBlock.text}</span>
                            </div>
                        </div>
                    `);

                    if(msgBlock.type == global.allData.User.type)
                    {
                        templateText.find('.chat_block_chat_body_msgs').append(myBlock);
                    }
                    else
                    {
                        myBlock.addClass("chat_block_chat_body_msgs_line_left");
                        templateText.find('.chat_block_chat_body_msgs').append(myBlock);
                    };
                };
            };

            $('.index_page_body_data').append(templateText);

            if(typeof getChat.Inv.not_correct_complaint != "undefined")
            {
                _this.removeButtons();
            }
        };

        async renderType()
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
                    <div class="msg_block_getting_line" data="${element.invId}">
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

                template_text.click( function() {
                    location.href = `./?page=chats&id=${$(this).attr('data')}`;
                });
                
                block.append(template_text);
            })

            $('.index_page_body_data').append(block);
        }

        async render()
        {
            var _idBlock    = _GET("id");
            var _authData   = _GET("auth_date");

            if(_idBlock)
            {
                if(_authData)
                {
                    this.renderType();
                } 
                else
                {
                    this.renderChat();
                };
            }
            else
            {
                this.renderType();
            };
        };
    };

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