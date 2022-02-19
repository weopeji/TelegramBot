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
            this.global_block   = $(`
                <div class="global_block"></div>
            `);
        };

        async renderFirst() 
        {
            var tamplateText = $(`
                <div class="upload_video_block">
                    <video controls="controls" src="https://invester-relocation.site/projects/${this.project._id}/${this.project.data['file+8']}"></video>
                </div>
                <div class="upload_video_block_button_row">
                    <div class="upload_video_block_button">
                        <span>Загрузить видео</span>
                    </div>
                </div>
            `);

            this.global_block.append(tamplateText);
        }
        
        async render(_project)
        {
            this.project = _project;

            if(!_project.YT_VIDEO)
            {
                this.renderFirst();
            }

            $('.index_page_body_data').append(this.global_block);
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