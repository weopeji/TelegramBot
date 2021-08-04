(function (global) {

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

    io_connect( function() 
    {
        Main();
    });

    async function Main()
    {
        var _id = global.location.href.split("#")[1];

        var need_project = await callApi({
            methodName: 'getProject',
            data: _id,
        });

        $('.index_page').append(need_project.signature_document.document_html);
    }

}(window))