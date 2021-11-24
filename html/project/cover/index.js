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

        var getPays = await callApi({
            methodName: 'getPaysProject',
            data: _id,
        });

        getPays = getPays.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ');

        var _attraction_amount  = need_project.data.attraction_amount;
        _attraction_amount      = _attraction_amount.replace(/\s/g, '');
        var procent             = (getPays / _attraction_amount) * 100;

        $('.liner_center').css('width', procent + "%");

        var _data = need_project.data.collection_period.split("-");

        var cover_block_liner_k_numer = parseInt(need_project.data.attraction_amount, 10) - parseInt(getPays, 10);

        $('.cover_block_liner a').html(getPays);
        $('.cover_block_liner k').html(cover_block_liner_k_numer);
        $('#name').html(need_project.data.name || "Null");
        $('#target').html(need_project.data.target || "Null");
        $('#money').html(need_project.data.attraction_amount || "Null");
        $('#date').html(`${_data[2]}.${_data[1]}.${_data[0]}` || "Null");
        $('.minimal_amount').html(need_project.data.minimal_amount + "руб" || "Null");
        $('.rate').html(need_project.data.rate + "%" || "Null");
        $('.date_payments').html(need_project.data.date_payments || "Null");
        $('.collection_period').html(need_project.data.date + " мес" || "Null");
    }

}(window))