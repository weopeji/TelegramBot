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
        var canvas          = document.querySelector("canvas");
        var signaturePad    = new SignaturePad(canvas);
        var _id             = global.location.href.split("#")[1];

        $('.clean').click( function() {
            signaturePad.clear();
        });

        $('.put').click( function() {
            var data = signaturePad.toDataURL();
            callApi({
                methodName: 'setSignature',
                data: {
                    data: data,
                    _id: _id,
                },
            }).then((data) => {
                return data; 
            });
        })
    }

}(window))