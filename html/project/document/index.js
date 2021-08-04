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

        var templateText = need_project.signature_document.document_html.toString();

        templateText = templateText.replace(new RegExp("%date_now%", 'g'), new Date().format('m-d-Y'));
        templateText = templateText.replace(new RegExp("%bizznes_name%", 'g'), need_project.data.initials);
        templateText = templateText.replace(new RegExp("%invester_name%", 'g'), "_______________");
        templateText = templateText.replace(new RegExp("%inn%", 'g'), need_project.data.inn);

        $('.index_page').append(templateText);
        $('.index_page p').eq(0).css("text-align", "center")
        $('.index_page p').eq(1).css("text-align", "center")
    }

}(window))