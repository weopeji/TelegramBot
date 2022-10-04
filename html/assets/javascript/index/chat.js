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
        constructor() 
        {
            this.globalType = $(`<div class="msg_block_getting"></div>`);
            this.UserData   = null;
        }

        async scrollBlock() {
            $('.chat_block_chat_body_msgs').animate({scrollTop: $('.chat_block_chat_body_msgs').prop('scrollHeight')}, 'fast');
        }

        async pushMsgOfUser(msgText)
        {
            function padTo2Digits(num) {
                return num.toString().padStart(2, '0');
            }

            function convertMsToTime(milliseconds) 
            {
                let seconds = Math.floor(milliseconds / 1000);
                let minutes = Math.floor(seconds / 60);
                let hours = Math.floor(minutes / 60);
                
                seconds = seconds % 60;
                minutes = minutes % 60;
                
                hours = hours % 24;
                
                return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
                    seconds,
                )}`;
            }

            var time = convertMsToTime(Number(new Date().getTime().toString()));

            var myBlock = $(`
                <div class="chat_block_chat_body_msgs_line chat_block_chat_body_msgs_line_left">
                    <div class="chat_block_chat_body_msgs_line_header">
                        <span>Вы</span>
                        <div class="chat_block_chat_body_msgs_line_header_time">
                            <bb>${time}</bb>
                        </div>
                    </div>
                    <div class="chat_block_chat_body_msgs_line_my">
                        <span>${msgText}</span>
                    </div>
                </div>
            `);

            $('.chat_block_chat_body_msgs').append(myBlock);

            await callApi({
                methodName: "msgUP",
                data: {
                    user: global.allData._id,
                    type: global.allData.User.type,
                    id: _GET("id"),
                    msg: msgText,
                },
            });

            this.scrollBlock();
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
            var getChat = null;
            var photoPushed = null;
            var namePushed  = null;
            var typePushed  = null;

            if(!_GET("owner")) {
                getChat = await callApi({
                    methodName: "getChatsOfId",
                    data: {
                        user: global.allData._id,
                        id: _GET("id")
                    },
                });

                photoPushed = getChat.photo;
                namePushed  = getChat.name;
                typePushed  = getChat.type;
            };

            var templateText = $(`
                <div class="chat_block">
                    <div class="chat_block_chat">
                        <div class="version2_default_bkg row_default"></div>
                        <div class="chat_block_chat_header">
                            <span>Чат</span>
                        </div>
                        <div class="chat_block_chat_body">
                            <div class="chat_block_chat_body_row">

                                <div class="chat_block_chat_body_msgs">

                                </div>

                                <div class="chat_block_chat_body_row_input">
                                    <input type="text" placeholder="Напишите сообщение">
                                    <span>
                                        <i class="fas fa-paper-plane"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="chat_block_info">
                        <div class="version2_default_bkg row_default"></div>
                        <div class="info_active_block_photo">
                            <img src="${photoPushed}" alt="">
                        </div>
                        <span>${namePushed}</span>
                        <p>${typePushed}</p>

                        <div class="chat_block_info_more_buttons">
                            
                        </div>
                    </div>
                </div>
            `);

            templateText.find('.chat_block_chat').prepend($(`
                <div class="chatPageBehinedByMoreBlocks">
                    <i class="fal fa-angle-left"></i>
                    <bb>
                        <bb_circule></bb_circule>
                        <bb_circule></bb_circule>
                        <bb_circule></bb_circule>
                    </bb>
                </div>
            `).css({
                "position": "absolute",
                "z-index": "6",
                "left": "10px",
                "top": "10px",
            }));
            
            templateText.find('.chatPageBehinedByMoreBlocks i').click(function() {
                $('.chat_block').fadeOut('fast', function () {
                    _this.renderType();
                    $(this).remove();
                });
            });

            templateText.find('.chatPageBehinedByMoreBlocks bb').click( function() {
                $('.chat_block').toggleClass('selected');
            });

            templateText.find('.chat_block_chat_header bb').click( function() {
                $('.chat_block').toggleClass('selected');
            })

            if(!_GET("owner")) {
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
                                            var InvDocId = await callApi({
                                                methodName: "not_correct_complaint_again",
                                                data: _GET("id"),
                                            });
    
                                            _this.pushMsgOfUser(`Инвестиция была отменена инвестором`);
                                            _this.removeButtonsAll();
    
                                            SoloAlert.alert({
                                                title:"Успешно",
                                                body:"",
                                                icon: "success"
                                            }).then( function() {
                                                location.href = `https://investir.one/?user=${global.allData._id}&page=invester_data&InvRedacting=${InvDocId}`;
                                            })
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
                                });
    
                                actionBlock.find('.chat_block_info_more_buttons_line[data="accept_investing"]').click( function() 
                                {
                                    SoloAlert.confirm({
                                        title: "Подтверждение",
                                        body: "Вы уверены, что хотите принять инвестицию?",
                                        theme: "dark",
                                        html: "",
                                        useTransparency: true,
                                    }).then(async (value) => 
                                    {
                                        if(value)
                                        {
                                            await callApi({
                                                methodName: "version2_acceptInvOfComplaintBusinnes",
                                                data: _GET("id"),
                                            });
    
                                            _this.pushMsgOfUser(`Бизнес принял инвестицию`);
                                            _this.removeButtonsAll();
    
                                            SoloAlert.alert({
                                                title:"Успешно",
                                                body:"",
                                                icon: "success"
                                            });
                                        };
                                    });
                                });
    
                                actionBlock.find('.chat_block_info_more_buttons_line[data="request_again"]').click( function() 
                                {
                                    SoloAlert.confirm({
                                        title: "Подтверждение",
                                        body: "Вы уверены, что хотите отправить запрос на оформление инвестиции повторно?",
                                        theme: "dark",
                                        html: "",
                                        useTransparency: true,
                                    }).then(async (value) => 
                                    {
                                        if(value)
                                        {
                                            await callApi({
                                                methodName: "requestInvestingOfRemove",
                                                data: _GET("id"),
                                            });
    
                                            _this.pushMsgOfUser(`Бизнес отправил запрос на перезаполнение инвестиции`);
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
                        };
    
                        templateText.find('.chat_block_info_more_buttons').append(buttonsOfNot_correct[global.allData.User.type]());
                        templateText.find('.chat_block_info_more_buttons').css('display', 'block');
                    };
                };
            }

            templateText.find('.chat_block_chat_body_row_input span').click( async function() {
        
                function padTo2Digits(num) {
                    return num.toString().padStart(2, '0');
                }
    
                function convertMsToTime(milliseconds) 
                {
                    let seconds = Math.floor(milliseconds / 1000);
                    let minutes = Math.floor(seconds / 60);
                    let hours = Math.floor(minutes / 60);
                    
                    seconds = seconds % 60;
                    minutes = minutes % 60;
                    
                    hours = hours % 24;
                    
                    return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
                        seconds,
                    )}`;
                }
    
                var time = convertMsToTime(Number(new Date().getTime().toString()));

                var myBlock = $(`
                    <div class="chat_block_chat_body_msgs_line chat_block_chat_body_msgs_line_left">
                        <div class="chat_block_chat_body_msgs_line_header">
                            <span>Вы</span>
                            <div class="chat_block_chat_body_msgs_line_header_time">
                                <bb>${time}</bb>
                            </div>
                        </div>
                        <div class="chat_block_chat_body_msgs_line_my">
                            <span>${$('.chat_block_chat_body_row_input input').val()}</span>
                        </div>
                    </div>
                `);

                $('.chat_block_chat_body_msgs').append(myBlock);

                await callApi({
                    methodName: "msgUP",
                    data: {
                        user: global.allData._id,
                        type: global.allData.User.type,
                        id: _GET("id"),
                        msg: $('.chat_block_chat_body_row_input input').val(),
                    },
                });

                _this.scrollBlock();

                $('.chat_block_chat_body_row_input input').val('');
            });

            if(getChat.msgs)
            {
                for(var msgBlock of getChat.msgs)
                {
                    var time = "";

                    function padTo2Digits(num) {
                        return num.toString().padStart(2, '0');
                    }

                    function convertMsToTime(milliseconds) 
                    {
                        let seconds = Math.floor(milliseconds / 1000);
                        let minutes = Math.floor(seconds / 60);
                        let hours = Math.floor(minutes / 60);
                      
                        seconds = seconds % 60;
                        minutes = minutes % 60;
                      
                        hours = hours % 24;
                      
                        return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
                          seconds,
                        )}`;
                    }

                    if(typeof msgBlock.time != "undefined")
                    {
                        time = convertMsToTime(Number(msgBlock.time.toString()))
                    };

                    if(msgBlock.type == global.allData.User.type)
                    {
                        templateText.find('.chat_block_chat_body_msgs').append(`
                            <div class="chat_block_chat_body_msgs_line chat_block_chat_body_msgs_line_left">
                                <div class="chat_block_chat_body_msgs_line_header">
                                    <span>Вы</span>
                                    <div class="chat_block_chat_body_msgs_line_header_time">
                                        <bb>${time}</bb>
                                    </div>
                                </div>
                                <div class="chat_block_chat_body_msgs_line_my">
                                    <span>${msgBlock.text}</span>
                                </div>
                            </div>
                        `);
                    }
                    else
                    {
                        templateText.find('.chat_block_chat_body_msgs').append(`
                            <div class="chat_block_chat_body_msgs_line">
                                <div class="chat_block_chat_body_msgs_line_header">
                                    <span>${getChat.name}</span>
                                    <div class="chat_block_chat_body_msgs_line_header_time">
                                        <bb>${time}</bb>
                                    </div>
                                </div>
                                <div class="chat_block_chat_body_msgs_line_my">
                                    <span>${msgBlock.text}</span>
                                </div>
                            </div>
                        `);
                    };
                };
            };

            $('.index_page_body_data').append(templateText);

            if(typeof getChat.Inv.not_correct_complaint != "undefined")
            {
                _this.removeButtons();
            };

            if(global.allData.User.type == "investor")
            {
                if(typeof getChat.Inv.request_remove != "undefined")
                {
                    SoloAlert.confirm({
                        title: "Подтверждение",
                        body: "Бизнес отпрасил запрос на закрытие и перезаполнение инвестиции",
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
                        }
                        else
                        {
                            await callApi({
                                methodName: "requestInvestingOfRemoveCLOSE",
                                data: _GET("id"),
                            });

                            _this.pushMsgOfUser(`Предложение было отклонено инвестором`);
                            _this.removeButtonsAll();

                            SoloAlert.alert({
                                title:"Успешно",
                                body:"",
                                icon: "success"
                            });
                        }
                    })
                };
            };

            imSocket.on("request_mail", function(data) {
                if(_GET("id"))
                {
                    if(_GET("id") == data.id.toString())
                    {
                        var msgBlock = data;

                        if(msgBlock.type == global.allData.User.type)
                        {
                            templateText.find('.chat_block_chat_body_msgs').append(`
                                <div class="chat_block_chat_body_msgs_line chat_block_chat_body_msgs_line_left">
                                    <div class="chat_block_chat_body_msgs_line_header">
                                        <span>Вы</span>
                                        <div class="chat_block_chat_body_msgs_line_header_time">
                                            <bb>${time}</bb>
                                        </div>
                                    </div>
                                    <div class="chat_block_chat_body_msgs_line_my">
                                        <span>${msgBlock.text}</span>
                                    </div>
                                </div>
                            `);
                        }
                        else
                        {
                            templateText.find('.chat_block_chat_body_msgs').append(`
                                <div class="chat_block_chat_body_msgs_line">
                                    <div class="chat_block_chat_body_msgs_line_header">
                                        <span>Вам</span>
                                        <div class="chat_block_chat_body_msgs_line_header_time">
                                            <bb>${time}</bb>
                                        </div>
                                    </div>
                                    <div class="chat_block_chat_body_msgs_line_my">
                                        <span>${msgBlock.text}</span>
                                    </div>
                                </div>
                            `);
                        };

                        _this.scrollBlock();
                    };
                }
            });

            _this.scrollBlock();
        };

        async renderChatMoreBlock(showBlock)
        {
            var _this = this;
            
            $('.msg_block_getting').fadeOut('fast', function () {
                $(this).empty().append($(`
                    <div class="chatPageBehinedByMoreBlocks">
                        <i class="fal fa-angle-left"></i>
                    </div>
                `).click(function() {
                    $('.msg_block_getting').fadeOut('fast', function () {
                        $('.msg_block_getting').empty();
                        _this.renderType();
                        $('.msg_block_getting').fadeIn('fast');
                    });
                }));

                for(var element of showBlock)
                {
                    var _PathUrl    = null;
                    var AlertBlock  = false;
                    var AlertsUser  = [];

                    if(element.img)
                    {
                        _PathUrl = `https://api.telegram.org/file/bot2062839693:AAE0hzj8SVXyexq29s5x7aRLC5x8O77c-pQ/` + element.img.file_path;
                    };

                    if(typeof _this.UserData.alerts_main != 'undefined')
                    {
                        for(var alertBlockOfUser of _this.UserData.alerts_main)
                        {
                            if(alertBlockOfUser.type == "new_msg")
                            {
                                AlertsUser.push(alertBlockOfUser.idChat);
                            }
                        };
                    }

                    if(AlertsUser.length > 0)
                    {
                        for(var AlertUserOne of AlertsUser)
                        {
                            if(AlertUserOne.toString() == element.invId.toString())
                            {
                                AlertBlock = true;
                            }
                        }
                    }
    
                    var template_text = $(`
                        <div class="msg_block_getting_line" data="${element.invId}">
                            <div class="version2_default_bkg row_default"></div>
                            <div class="msg_block_getting_line_img">
                                <div class="msg_block_getting_line_img_block">
                                    <img src="${_PathUrl}" alt="">
                                </div>
                            </div>
                            <div class="msg_block_getting_line_text">
                                <span>${element.name} ${element.Project._id}/${element.invDoc.number} от ${DateFormatted(element.invDoc.data.date.toString())} | ${element.invDoc.data.data.pay} ₽</span>
                                <p>${element.msgBlock.msgs[element.msgBlock.msgs.length - 1].text}</p>
                            </div>
                        </div>
                    `);

                    if(AlertBlock)
                    {
                        template_text.append($(`
                            <div class="msg_block_getting_line_alertBlock"></div>
                        `));
                    }

                    template_text.click( function() {
                        location.href = `./?page=chats&id=${$(this).attr('data')}`;
                    });
                    
                    $(this).append(template_text);
                };

                $(this).fadeIn('fast');
            });
        };

        async renderType()
        {
            var errorpush       = true;
            var _TypeUser       = window.allData.User.type;
            var _this           = this;
            var allPushChats    = [];
            var getChats        = await callApi({
                methodName: "getChats",
                data:  global.allData._id,
            });

            this.UserData       = getChats.User;
            var AlerstUser      = [];

            if(typeof getChats.User.alerts_main != 'undefined')
            {
                for(var alertUser of getChats.User.alerts_main)
                {
                    if(alertUser.type == "new_msg")
                    {
                        AlerstUser.push(alertUser.idChat);
                    };
                };
            };

            if(_TypeUser == "business")
            {
                if(typeof getChats.defaultChats.business != "undefined")
                {
                    for(var _key in getChats.defaultChats.business)
                    {
                        var _PathUrl    = null;
                        var element     = getChats.defaultChats.business[_key][0];
                        var AlertBlock  = false;

                        if(AlerstUser.length > 0)
                        {
                            for(var cheackAlertBlock of getChats.defaultChats.business[_key])
                            {
                                for(var AlerstUserOne of AlerstUser)
                                {
                                    if(AlerstUserOne.toString() == cheackAlertBlock.invId.toString())
                                    {
                                        AlertBlock = true;
                                    };
                                };   
                            };
                        };
    
                        if(element.img)
                        {
                            _PathUrl = `https://api.telegram.org/file/bot2062839693:AAE0hzj8SVXyexq29s5x7aRLC5x8O77c-pQ/` + element.img.file_path;
                        };
        
                        var template_text = $(`
                            <div class="msg_block_getting_line" data="${element.invId}" data-id="${_key}">
                                <div class="version2_default_bkg row_default"></div>
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

                        if(AlertBlock)
                        {
                            template_text.append($(`
                                <div class="msg_block_getting_line_alertBlock"></div>
                            `));
                        }

                        if(getChats.defaultChats.business[_key].length > 0) 
                        {
                            template_text.append(`
                                <div class="msg_block_getting_line_moreInfo">
                                    <span>+ ${getChats.defaultChats.business[_key].length - 1}</span>
                                </div>
                            `).addClass("msg_block_getting_line_Many").click( function() 
                            {
                                _this.renderChatMoreBlock(getChats.defaultChats.business[$(this).attr('data-id')]);
                            });

                            template_text.find('.msg_block_getting_line_text p').remove();
                            template_text.find(".msg_block_getting_line_text").css({
                                "display": "flex",
                                "align-items": "center",
                            });
                        }
                        else
                        {
                            template_text.click( function() {
                                location.href = `./?page=chats&id=${$(this).attr('data')}`;
                            });
                        }
                        
                        errorpush = false;
                        _this.globalType.append(template_text);
                    };
                };
            }
            else
            {
                if(typeof getChats.defaultChats.other != "undefined")
                {
                    for(var _key in getChats.defaultChats.other)
                    {
                        var _PathUrl    = null;
                        var element     = getChats.defaultChats.other[_key][0];
                        var AlertBlock  = false;

                        if(AlerstUser.length > 0)
                        {
                            for(var cheackAlertBlock of getChats.defaultChats.other[_key])
                            {
                                for(var AlerstUserOne of AlerstUser)
                                {
                                    if(AlerstUserOne.toString() == cheackAlertBlock.invId.toString())
                                    {
                                        AlertBlock = true;
                                    };
                                };   
                            };
                        };
                        
    
                        if(element.img)
                        {
                            _PathUrl = `https://api.telegram.org/file/bot2062839693:AAE0hzj8SVXyexq29s5x7aRLC5x8O77c-pQ/` + element.img.file_path;
                        };
        
                        var template_text = $(`
                            <div class="msg_block_getting_line" data="${element.invId}" data-id="${_key}">
                                <div class="version2_default_bkg row_default"></div>
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

                        if(AlertBlock)
                        {
                            template_text.append($(`
                                <div class="msg_block_getting_line_alertBlock"></div>
                            `));
                        }

                        if(getChats.defaultChats.other[_key].length > 0) 
                        {
                            template_text.append(`
                                <div class="msg_block_getting_line_moreInfo">
                                    <span>+ ${getChats.defaultChats.other[_key].length - 1}</span>
                                </div>
                            `).addClass("msg_block_getting_line_Many").click( function() 
                            {
                                _this.renderChatMoreBlock(getChats.defaultChats.other[$(this).attr('data-id')]);
                            });

                            template_text.find('.msg_block_getting_line_text p').remove();
                            template_text.find(".msg_block_getting_line_text").css({
                                "display": "flex",
                                "align-items": "center",
                            });
                        }
                        else
                        {
                            template_text.click( function() {
                                location.href = `./?page=chats&id=${$(this).attr('data')}`;
                            });
                        }
                        
                        errorpush = false;
                        _this.globalType.append(template_text);
                    };
                };
            };

            if(errorpush)
            {
                _this.globalType.append(`<span class="msg_block_errorPush">У вас пока нет чатов</span>`);
            }

            $('.index_page_body_data').append(_this.globalType);
        }

        async render()
        {
            var _idBlock    = _GET("id");
            var _authData   = _GET("auth_date");
            var ownerBlock  = _GET("owner");

            if(_idBlock)
            {
                if(_authData)
                {
                    if(ownerBlock) {
                        location.href = "./?owner=true";
                    }
                    else
                    {
                        this.renderType();
                    }
                } 
                else
                {
                    this.renderChat();
                };
            }
            else
            {
                if(ownerBlock) {
                    this.renderChat();
                }
                else {
                    this.renderType();
                }
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