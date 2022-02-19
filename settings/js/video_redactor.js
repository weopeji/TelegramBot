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
                    <video controls="controls" src="https://invester-relocation.site/projects/${this.project._id}/${this.project.data['file+8']}"></video>
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

                tamplateText.find('.upload_video_block_button').click( async function() {
                    alert("Успешно! Дождитесь обработки видео!");
                    callApi({
                        methodName: "dataOfVideoAccept",
                        data: _this.project._id,
                    });
                    setTimeout(() => {
                        location.reload();
                    }, 1000)
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
                        
                    }
                }
            };
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