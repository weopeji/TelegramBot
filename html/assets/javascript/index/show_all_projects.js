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
            
            `);
        };

        async render()
        {
            var _projects = await callApi({
                methodName: "gettAllProjects",
                data: null,
            });

            _projects.forEach(function(project) {
                var _block = $(`
            
                `);

                this.global_block.append(_block);
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