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
        var _id = global.location.href.split("#")[1].split("#")[0];

        var need_project = await callApi({
            methodName: 'getProject',
            data: _id,
        });

        var templateText = need_project.signature_document.document_html.toString();

        function getFormattedDate() 
        {
            var date = new Date();
            var str = date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
            return str;
        }


        if(need_project.data.organization == 3)
        {
            templateText = templateText.replace(new RegExp("%date_open%", 'g'),         getFormattedDate());
            templateText = templateText.replace(new RegExp("%name_company%", 'g'),      need_project.data.sob_fio);
            templateText = templateText.replace(new RegExp("%company_data%", 'g'),      `(Инн: ${need_project.data.sob_inn} Паспорт: ${need_project.data.sob_serion} ${need_project.data.sob_number})`);
            templateText = templateText.replace(new RegExp("%full_reqvesits%", 'g'),    `__________________________`); 
        } else
        {
            templateText = templateText.replace(new RegExp("%date_open%", 'g'),         getFormattedDate());                        // redacting
            templateText = templateText.replace(new RegExp("%name_company%", 'g'),      need_project.data.name_company);            // fio - ip / ooo - name -  / fiz - fio собствениика
            templateText = templateText.replace(new RegExp("%opf%", 'g'),               need_project.parce.pr.opf.full);
            templateText = templateText.replace(new RegExp("%position%", 'g'),          need_project.parce.pr.management.post);
            templateText = templateText.replace(new RegExp("%position_name%", 'g'),     need_project.parce.pr.management.name);
            templateText = templateText.replace(new RegExp("%company_data%", 'g'),      `(Инн: ${need_project.data.inn} Огрн: ${need_project.data.ogrn})`); // fiz номер и серия
            templateText = templateText.replace(new RegExp("%pay_need%", 'g'),          need_project.data.attraction_amount);
            templateText = templateText.replace(new RegExp("%rate%", 'g'),              need_project.data.rate + "%");
            templateText = templateText.replace(new RegExp("%site_name%", 'g'),         "undefined");                               // input of site name
            templateText = templateText.replace(new RegExp("%date%", 'g'),              need_project.data.date);
            templateText = templateText.replace(new RegExp("%full_reqvesits%", 'g'),    `Огрн: ${need_project.data.ogrn}\n Инн: ${need_project.data.inn} \n Кпп: ${need_project.data.kpp} \n Адрес Юридический: ${need_project.data.addr}\n Адрес Фактический: ${need_project.data.addr_fact} \n Название банка: ${need_project.data.bank} \n __________________________`); 
            // ogrn inn kpp addres fiz addres ur bank bikBank  proherk Расчетный счет и Кор счет Должность Фио и прочер для подписи
            // Если это физик то мы ввыводим паспортные данные, адрес прописки фактический адресс и подпись
            // У ип нет Кпп
        }
        

        $('.index_page').append(templateText);

        $('.index_page p').eq(0).css({
            "text-align": "center",
            "font-weight": "bold",
            "font-size": "25px"
        });

        $('body').append('<div class="all_good"></div');
        
    }

}(window))