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

    (() => {
        delete imSocket;
        imSocket = null;
        var url = null;
        if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
            url = global_data.data_url_localhost;
            imSocket = io(url, {transports: ['polling']});
        } else {
            url = global_data.data_url_server;
            imSocket = io(url, {
                path: '/socket.io'
            });
        }
        imSocket.on('connect', function() {
            console.log("Сервер подключен к: " + url);
            Main();
        });
    })();

    async function Main()
    {
        var _id = _GET('id');

        var need_project = await callApi({
            methodName: 'getProject',
            data: _id,
        });

        console.log(need_project);

        $('#name').html(need_project.data.name || "Null");
        $('#target').html(need_project.data.target || "Null");
        $('#money').html(need_project.data.attraction_amount || "Null");
        $('#date').html(need_project.data.date || "Null");
        $('.minimal_amount').html(need_project.data.minimal_amount + "руб" || "Null");
        $('.rate').html(need_project.data.rate + "%" || "Null");
        $('.date_payments').html(need_project.data.date_payments || "Null");
        $('.date').html(need_project.data.date + " мес" || "Null");
    }

}(window))