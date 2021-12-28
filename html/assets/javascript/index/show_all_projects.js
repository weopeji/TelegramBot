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

    class show_all_projects
    {
        constructor() 
        {
            this.global_block = $(`
                <div class="all_projects_show"></div>
            `);
        };

        async render()
        {
            var _this = this;

            var _projects = await callApi({
                methodName: "gettAllProjects",
                data: null,
            });

            _projects.forEach(function(project) {
                var _block = $(`
                    <div class="all_projects_show_block" data="${project._id}">
                        <img src="/projects/${project._id}/logo.png" alt="">
                    </div>
                `);

                _block.click( function() 
                {
                    
                });

                _this.global_block.append(_block);
            })
            

            $('.index_page_body_data').append(this.global_block);
        }
    }

    var components = {
        show_all_projects,
    };

    if(!global.Components) { global.Components = components; } 
    else { 
        for(var key in components)
        {
            global.Components[key] = components[key];
        }
    }

}(window))