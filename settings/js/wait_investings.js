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

    class wait_investings
    {
        constructor() {};
        
        async render()
        {
            var waitInvestingsData = await callApi({
                methodName: 'waitInvestingsData',
                data:null,
            });
        };
    };

    var components = {
        wait_investings,
    };

    if(!global.Components) { global.Components = components; } 
    else { 
        for(var key in components)
        {
            global.Components[key] = components[key];
        }
    }

}(window))