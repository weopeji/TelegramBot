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

        function getFormattedDate() {
            var date = new Date();
            var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        
            return str;
        }

        templateText = templateText.replace(new RegExp("%date_now%", 'g'), getFormattedDate());
        templateText = templateText.replace(new RegExp("%bizznes_name%", 'g'), need_project.data.initials);
        templateText = templateText.replace(new RegExp("%inn%", 'g'), need_project.data.inn);
        templateText = templateText.replace(new RegExp("%ogrn%", 'g'), need_project.data.ogrn);
        templateText = templateText.replace(new RegExp("%addr%", 'g'), need_project.parce.addr);
        templateText = templateText.replace(new RegExp("%city%", 'g'), need_project.parce.addr.split(',')[0]);
        templateText = templateText.replace(new RegExp("%addr_f%", 'g'), need_project.data.addr);
        templateText = templateText.replace(new RegExp("%bank%", 'g'), need_project.data.bank);
        templateText = templateText.replace(new RegExp("%bik%", 'g'), need_project.data.bik);
        templateText = templateText.replace(new RegExp("%state%", 'g'), need_project.data.account_get);
        templateText = templateText.replace(new RegExp("%date_pay%", 'g'), need_project.data.collection_period);
        templateText = templateText.replace(new RegExp("%pay_investor%", 'g'), need_project.data.rate + " " + need_project.data.date_payments);
        templateText = templateText.replace(new RegExp("%document_more%", 'g'), "_______________");
        templateText = templateText.replace(new RegExp("%pay%", 'g'), "_______________");
        templateText = templateText.replace(new RegExp("%invester_name%", 'g'), "_______________");

        if(typeof need_project.signature_document.img != "undefined")
        {
            templateText = templateText.replace(new RegExp("%document%", 'g'), `<img src="${need_project.signature_document.img}" alt>`);
        } else {
            templateText = templateText.replace(new RegExp("%document%", 'g'), "_______________");
        }

        if(_GET__('id'))
        {
            var getInvestorDocument = await callApi({
                methodName: 'getInvestorDocument',
                data: 
                {
                    id: _GET__('id'),
                    projectId: _id,
                },
            });

            templateText = templateText.replace(new RegExp("%invester_name%", 'g'), getInvestorDocument.data.fio);
            templateText = templateText.replace(new RegExp("%pay%", 'g'), getInvestorDocument.data.pay + " руб");
        }

        $('.index_page').append(templateText);

        $('.index_page p').eq(0).css("text-align", "center")
        $('.index_page p').eq(1).css("text-align", "center")
        $('body').append('<div class="all_good"></div');
    }

}(window))