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
        var _id = _GET('id');

        var need_project = await callApi({
            methodName: 'getProject',
            data: _id,
        });


        $('#name').html(need_project.data.name || "Null");
        $('#target').html(need_project.data.target || "Null");
        $('#money').html(need_project.data.attraction_amount || "Null");
        $('#date').html(need_project.data.collection_period.replace(/-/g, ".") || "Null");
        $('.minimal_amount').html(need_project.data.minimal_amount + "руб" || "Null");
        $('.rate').html(need_project.data.rate + "%" || "Null");
        $('.date_payments').html(need_project.data.date_payments || "Null");
        $('.collection_period').html(need_project.data.date + " мес" || "Null");
    }

}(window))