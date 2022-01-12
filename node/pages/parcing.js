const fetch                 = require("node-fetch");
var axios                   = require('axios');


module.exports = {
    ParceUsersBlock,
}


async function ParceUsersBlock(_project, MoreUsers)
{
    async function deistvitelenLiPaspport(_query)
    {
        return new Promise((resolve,reject) => 
        {
            var url     = "https://cleaner.dadata.ru/api/v1/clean/passport";
            var token   = "cd3a829357362fec55fc201c3f761002def9906f";
            var secret  = "17df8cdd3e4ace2be6c66bd1ee208d26e54d9843";
            var query   = _query;
    
            var options = {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Token " + token,
                    "X-Secret": secret
                },
                body: JSON.stringify([query])
            }
    
            fetch(url, options)
            .then(response => response.text())
            .then(result => resolve(result))
            .catch(error => console.log("error", error));
        })
    }

    async function yavlaetcaLiSamozanyatim(_inn)
    {
        return new Promise((resolve,reject) =>
        {
            const dateStr = new Date().toISOString().substring(0, 10);
            const url = "https://statusnpd.nalog.ru/api/v1/tracker/taxpayer_status";
            const data = {
                inn: _inn,
                requestDate: dateStr,
            };
            resp = fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            resolve(resp);
        });
    }

    async function arbitrajnayaPraktikaFizLica(_initials, _region, date_user)
    {
        return new Promise((resolve,reject) =>
        {
            var fio             = _initials.split(' ');
            var query           = _region;
            var url             = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
            var token           = "cd3a829357362fec55fc201c3f761002def9906f";
            var first_name      = fio[1];
            var second_name     = fio[2];
            var last_name       = fio[0];
            var birth_date      = date_user;

            var options = {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Token " + token
                },
                body: JSON.stringify({query: query})
            }

            fetch(url, options)
            .then(response => response.text())
            .then(result => 
            {
                var _dataFirst = JSON.parse(result.toString()).suggestions[0].data.region_kladr_id;

                _dataFirst = _dataFirst.replace(/0/g, '');

                var config = {
                    method: 'get',
                    url: `https://api-ip.fssp.gov.ru/api/v1.0/search/physical?token=er77gLcQvTO5&firstname=${encodeURI(first_name)}&secondname=${encodeURI(second_name)}&lastname=${encodeURI(last_name)}&birthdate=${birth_date}&region=${_dataFirst}`,
                    headers: { }
                };    
                
                axios(config)
                .then(async function (response) {
                    var adaw = await R_F.create({
                        data: JSON.stringify(response.data),
                    })
                    resolve(adaw._id);
                })
                .catch(function (error) {
                    console.log(error);
                });
            });
        });
    };

    return new Promise(async (resolve,reject) => 
    {
        var _data = 
        {
            globalUserData: {},
            moreUsersData: [],
        }
    
        _data.globalUserData.dePa = await deistvitelenLiPaspport(`${_project.sob_serion} ${_project.sob_number}`);
        _data.globalUserData.saMo = await yavlaetcaLiSamozanyatim(_project.sob_inn);
        _data.globalUserData.arBi = await arbitrajnayaPraktikaFizLica(_project.sob_fio, _project.sob_region, _project.sob_date);
    
        for(var _key in MoreUsers)
        {
            var _UserParce = 
            {
                dePa: await deistvitelenLiPaspport(`${MoreUsers[_key][`BB#sob_serion_${_key.split("+")[1]}`]} ${MoreUsers[_key][`BB#sob_number_${_key.split("+")[1]}`]}`),
                saMo: await yavlaetcaLiSamozanyatim(MoreUsers[_key][`BB#sob_inn_${_key.split("+")[1]}`]),
                arBi: await arbitrajnayaPraktikaFizLica(MoreUsers[_key][`BB#sob_fio_${_key.split("+")[1]}`], MoreUsers[_key][`BB#sob_region_${_key.split("+")[1]}`], MoreUsers[_key][`BB#sob_date_${_key.split("+")[1]}`]),
            }
    
            _data.moreUsersData.push(_UserParce);
        }
    
        resolve(_data);
    });
}