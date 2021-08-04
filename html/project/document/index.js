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

        var _document = need_project.signature_document.document_html;
        
        _document
            .replace(/%date_now%/g, new Date(0, 0, 0))
            .replace(/%invester_name%/g, "_______________")
            .replace(/%bizznes_name%/g, need_project.data.initials)
            .replace(/ %inn%/g, need_project.data.inn)

        $('.index_page').append(_document);
        $('.index_page p').eq(0).css("text-align", "center")
        $('.index_page p').eq(1).css("text-align", "center")
    }

}(window))