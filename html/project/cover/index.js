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

        var cover_block_liner_k_numer = Number(need_project.data.attraction_amount.toString().trim()) - Number(getPays.toString().trim());

        $('.cover_block_liner a').html(Number(getPays.toString().trim()).toDivide());
        $('.cover_block_liner k').html(cover_block_liner_k_numer.toDivide());
        $('#name').html(need_project.data.name || "Null");
        $('#target').html(need_project.data.target || "Null");
        $('#money').html(need_project.data.attraction_amount || "Null");
        $('#date').html(`${_data[2]}.${_data[1]}.${_data[0]}` || "Null");
        $('.minimal_amount').html(need_project.data.minimal_amount + "₽" || "Null");
        $('.rate').html(need_project.data.rate + "%" || "Null");
        $('.date_payments').html(need_project.data.date_payments || "Null");
        $('.collection_period').html(need_project.data.date + " мес" || "Null");

        if(_GET('liner'))
        {
            $('.cover_block_liner').remove();
            $('.cover_block').css({
                "padding-bottom": "10px",
                "width": "1080px",
                "height": "1350px",
            });
            $('.cover_block_logo').css('width', "50%");
            $('.cover_block h1').css({
                "font-size": "65px",
            })
            $('.cover_block p').css("font-size", "42px");
            $('.cover_block_centr_inter span').css("font-size", "50px");
            $('.cover_block_centr_inter p').css("font-size", "42px");
            $('.cover_block_body_line').css("font-size", "48px");
            $('.cover_block_body_line').css("padding", "24px 0");
        }

        $('body').append('<div class="all_good"></div>')
    }

}(window))