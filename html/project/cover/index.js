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

        try {
            var need_project = await callApi({
                methodName: 'getProject',
                data: _id,
            });
    
            $('.liner_center').css('width', procent + "%");
    
            var _data                       = need_project.data.collection_period.split("-");
            var cover_block_liner_k_numer   = Number(need_project.data.attraction_amount.toString().replace( /\s/g, "")) - Number(getPays.toString().replace( /\s/g, ""));
    
            $('.cover_block_liner k').html(cover_block_liner_k_numer.toDivide() + " ₽");
            $('#name').html(need_project.data.name || "Null");
            $('#target').html(need_project.data.target || "Null");
            $('.money').html(need_project.data.attraction_amount + " ₽" || "Null");
            $('.collection_period').html(`${_data[2]}.${_data[1]}.${_data[0]}` || "Null");
            $('.minimal_amount').html(need_project.data.minimal_amount + " ₽" || "Null");
            $('.rate').html(need_project.data.rate + "%" || "Null");
            $('.date_payments').html(need_project.data.date_payments || "Null");
            $('.date').html(need_project.data.date + "мес" || "Null");
    
            if(_GET('liner'))
            {
                $('.index_page').addClass('selected');
                $('.cover_block_liner').remove();
            }
        } catch(e) {};

        $('body').append('<div class="all_good"></div>')
    }

}(window))