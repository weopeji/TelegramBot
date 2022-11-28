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

    class video_redactor
    {
        constructor() 
        {
            this.project        = null;
            this.global_block   = null;
        };

        async renderFirst() 
        {
            var _this       = this;
            var dataOfVideo = await callApi({
                methodName: "dataOfVideo",
                data: this.project._id,
            });

            var tamplateText = $(`
                <div class="upload_video_block_info">
                    <p>Длинна: <data class="upload_video_block_info_long"></data></p>
                    <p>Разрешение: <data class="upload_video_block_info_px"></data></p>
                    <p>Формат: <data class="upload_video_block_info_fomr"></data></p>
                    <p>Соотношение сторон: <data class="upload_video_block_info_soot"></data></p>
                    <p>Количество кадров в секунду: <data class="upload_video_block_info_cadr"></data></p>
                    <p>Наличие звука: <data class="upload_video_block_info_volue"></data></p>
                </div>
                <div class="upload_video_block">
                    <video controls="controls" src="https://cashflo.ru/projects/${this.project._id}/${this.project.data['file+8']}"></video>
                </div>
                <div class="upload_video_block_button_row">
                    <div class="upload_video_block_button">
                        <span>Подтвердить видео и отправить на обработку</span>
                    </div>
                </div>
            `);

            if(dataOfVideo.status == "ok")
            {
                var _volue = "Нет звуковой дорожки";

                if(typeof dataOfVideo.data.audio != "undefined")
                {
                    _volue = "Есть звуковая дорожка";
                }

                tamplateText.find('.upload_video_block_info_long').html(dataOfVideo.data.duration.raw);
                tamplateText.find('.upload_video_block_info_px').html(`${dataOfVideo.data.video.resolution.w}:${dataOfVideo.data.video.resolution.h}`);
                tamplateText.find('.upload_video_block_info_fomr').html(dataOfVideo.data.filename.split('.')[dataOfVideo.data.filename.split('.').length - 1]);
                tamplateText.find('.upload_video_block_info_soot').html(dataOfVideo.data.video.aspect.string);
                tamplateText.find('.upload_video_block_info_cadr').html(dataOfVideo.data.video.fps);
                tamplateText.find('.upload_video_block_info_volue').html(_volue);

                tamplateText.find('.upload_video_block_button').click( async function() 
                {
                    callApi({
                        methodName: "dataOfVideoAccept",
                        data: _this.project._id,
                    });

                    note({
                        content: "Вы успешно отправили видео на обработку, дождитесь уведомления в боте",
                        type: "info",
                        time: 2,
                        callback: function()
                        {
                            location.reload();
                        },
                    });
                });
            } else
            {
                tamplateText.find('.upload_video_block_button span').html('ОШИБКА');
            }

            this.global_block.append(tamplateText);
        }

        async renderWait()
        {
            var tamplateText = $(`
                <div class="upload_video_block_info">
                    <div class="upload_video_block_info_row">
                        <span>Ожидайте форматирования видео и добавление прелоадера</span>
                    </div>
                </div>
            `);

            this.global_block.append(tamplateText);
        }

        async renderAccept()
        {
            var _project = this.project;

            if(_project.YT_VIDEO)
            {
                var yt_data = JSON.parse(_project.YT_VIDEO[3])

                var tamplateText = $(`
                    <div class="upload_video_block">
                        <h1>Загруженное видео</h1>
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/${yt_data.id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                `);

                this.global_block.append(tamplateText);
            } else 
            {
                var _description = `${_project.data.name} № ${_project._id}\n${_project.data.target}\nСтавка ${_project.data.rate}% годовых\nВыплаты ${_project.data.date_payments}\nВход от ${_project.data.minimal_amount} руб.\nПодробнее о предложении в телеграм канале - https://t.me/invester_official
                `.toString().trim();

                var tamplateText = $(`
                    <div class="upload_video_block">
                        <h1>Загрузка видео на YouTube</h1>
                        <video controls="controls" src="https://cashflo.ru/projects/${_project._id}/default_video_project.mp4"></video>
                        <div class="upload_video_block_unputs">
                            <div class="upload_video_block_unputs_text" id="upload_video_name" contenteditable="true" style="white-space: pre-line">${_project.data.name} № ${_project._id}</div>
                            <textarea class="upload_video_block_unputs_text" id="upload_video_description">${_description}</textarea>
                        </div>
                    </div>
                    <div class="upload_video_block_button_row">
                        <div class="upload_video_block_button">
                            <span>Загрузить видео</span>
                        </div>
                    </div>
                `);

                tamplateText.find('.upload_video_block_button').click( async function () {
                    var _name = $('#upload_video_name').html();
                    var _description = $('#upload_video_description').val();

                    alert('Видео отправленно на загрузку, дождитесь его публикации');

                    var setYouTubeVideo = await callApi({
                        methodName: "setYouTubeVideo",
                        data: {
                            projectId: _project._id,
                            name: _name,
                            description: _description,
                        },
                    });


                    alert(setYouTubeVideo);

                    location.reload();
                })

                this.global_block.append(tamplateText);
            }
        }
        
        async render(global_block, _project)
        {
            this.project        = _project;
            this.global_block   = global_block;

            if(!_project.YT_VIDEO)
            {
                if(typeof _project.video_redacting == "undefined")
                {
                    await this.renderFirst();
                } 
                else
                {
                    if(_project.video_redacting == "wait")
                    {
                        await this.renderWait();
                    }
                    else
                    {
                        await this.renderAccept();
                    }
                }
            } else
            {
                await this.renderAccept();
            }
        }
    }

    var components = {
        video_redactor,
    };

    if(!global.Components) { global.Components = components; } 
    else { 
        for(var key in components)
        {
            global.Components[key] = components[key];
        }
    }

}(window))