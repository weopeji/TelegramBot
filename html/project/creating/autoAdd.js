window.structCreator.forEach((element) => {
    element.body.forEach(element2 => {
        var FUN = 
        {
            "string": function()
            {
                $(`#${element2._id}`).val(123);
            },
            "addr": function()
            {
                $(`#${element2._id}`).val("Москва");
            },
        }

        if(typeof FUN[element2.type] != "undefined")
        {
            FUN[element2.type]();
        }
    })
});