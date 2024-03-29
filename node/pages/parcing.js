var fetch                   = require("node-fetch");
var axios                   = require('axios');
var { PythonShell }         = require('python-shell');
const mongoose              = require('mongoose');
const Project               = mongoose.model('Project');
const R_F                   = mongoose.model('R_F');
var config                  = require('../config.json');


module.exports = {
    ParceUsersBlock,
    ParceProject,
    ParcingArbitrage,
    cheackArbitrFizUser,
    ParceProjectIspo,
}

async function ParceProjectIspo(inn)
{
    return new Promise((resolve,reject) => {
        try
        {
            axios({
                method: 'get',
                url: `https://api.damia.ru/fssp/isps?inn=${inn.toString().trim()}&key=${config.fssp_key}`,
                headers: { }
            })
            .then(function (response) {
                resolve(response.data);
            })
            .catch(function (error) {
                resolve('error');
            });
        } catch(e)
        {
            resolve('error');
        }
    })
}

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
        .catch(error => resolve("error"));
    });
};

async function yavlaetcaLiSamozanyatim(_inn)
{
    return new Promise((resolve,reject) =>
    {
        try
        {
            const dateStr   = new Date().toISOString().substring(0, 10);
            const url       = "https://statusnpd.nalog.ru/api/v1/tracker/taxpayer_status";

            async function checkStatus() 
            {
                resp = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        inn: _inn,
                        requestDate: dateStr,
                    }),
                });
                return resp;
            }

            checkStatus()
            .then((response) => {
                resolve(response);
            })
            .catch(error => resolve("error"));
        }
        catch(e)
        {
            resolve("error");
        }
    });
}

async function arbitrajnayaPraktikaFizLica(_initials, _region, date_user)
{
    return new Promise((resolve,reject) =>
    {
        var fio             = _initials.split(' ');

        if(fio.length < 3)
        {
            resolve('error');
        } else
        {
            try
            {
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
                    var _dataFirst = "77";
        
                    if(typeof JSON.parse(result.toString()).suggestions[0] != "undefined")
                    {
                        if(typeof JSON.parse(result.toString()).suggestions[0].data != "undefined")
                        {
                            if(typeof JSON.parse(result.toString()).suggestions[0].data.region_kladr_id != "undefined")
                            {
                                _dataFirst = JSON.parse(result.toString()).suggestions[0].data.region_kladr_id
                                _dataFirst = _dataFirst.replace(/0/g, '');
                            } else
                            {
                                resolve("error");
                                return;
                            }
                        } else
                        {
                            resolve("error");
                            return;
                        }
                    } else
                    {
                        resolve("error");
                        return;
                    }
        
                    var config = 
                    {
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
                        resolve("error");
                    });
                });
            } catch(e)
            {
                resolve("error");
            }
        }
    });
};

async function ParceUsersBlock(_project, MoreUsers)
{
    return new Promise(async (resolve,reject) => 
    {
        try
        {
            var _data = 
            {
                globalUserData: {},
            }
        
            _data.globalUserData.dePa = await deistvitelenLiPaspport(`${_project.sob_serion} ${_project.sob_number}`);
            _data.globalUserData.saMo = await yavlaetcaLiSamozanyatim(_project.sob_inn);


            // _data.globalUserData.arBi = await arbitrajnayaPraktikaFizLica(_project.sob_fio, _project.sob_region, _project.sob_date);
        
            // for(var _key in MoreUsers)
            // {
            //     var _UserParce = 
            //     {
            //         dePa: await deistvitelenLiPaspport(`${MoreUsers[_key][`BB*sob_serion_${_key.split("+")[1]}`]} ${MoreUsers[_key][`BB*sob_number_${_key.split("+")[1]}`]}`),
            //         saMo: await yavlaetcaLiSamozanyatim(MoreUsers[_key][`BB*sob_inn_${_key.split("+")[1]}`]),
            //         arBi: await arbitrajnayaPraktikaFizLica(MoreUsers[_key][`BB*sob_fio_${_key.split("+")[1]}`], MoreUsers[_key][`BB*sob_region_${_key.split("+")[1]}`], MoreUsers[_key][`BB*sob_date_${_key.split("+")[1]}`]),
            //     };

            //     _data.moreUsersData.push(_UserParce);
            // }

            resolve(_data);
        } catch(e)
        {
            resolve("error");
        }
    });
}

async function ParceProject(inn)
{
    return new Promise((resolve,reject) =>
    {   
        try
        {
            var options = 
            {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Token " + "cd3a829357362fec55fc201c3f761002def9906f"
                },
                body: JSON.stringify({query: inn})
            }
            
            fetch("https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party", options)
            .then(response => response.text())
            .then(result => 
            {
                var _dataFirst = JSON.parse(result.toString());
    
                if(typeof _dataFirst.suggestions != "undefined")
                {
                    if(_dataFirst.suggestions.length == 0) 
                    {
                        resolve('error');
                    } else 
                    {
                        resolve(_dataFirst.suggestions[0].data);
                    }
                }
                else
                {
                    resolve('error');
                }
            })
            .catch(function (error) {
                resolve("error");
            });
        } catch(e)
        {
            resolve('error');
        }
    });
}

async function ParcingArbitrage(inn)
{
    return new Promise((resolve,reject) => {
        try
        {
            axios({
                method: 'get',
                url: `https://api.damia.ru/arb/dela?q=${inn.toString().trim()}&key=${config.arbitr_key}`,
                headers: { }
            })
            .then(function (response) {
                resolve(response.data);
            })
            .catch(function (error) {
                resolve('error');
            });
        } catch(e)
        {
            resolve('error');
        }
    })
}

async function cheackArbitrFizUser(token)
{
    return new Promise(async (resolve,reject) =>
    {
        var _token  = token;
        var _getR_F = await R_F.findOne({_id: _token});
        var _data   = JSON.parse(_getR_F.data).response.task;
        
        var config = {
            method: 'get',
            url: `https://api-ip.fssp.gov.ru/api/v1.0/result?token=er77gLcQvTO5&task=${_data}`,
            headers: {}
        };
        
        axios(config)
        .then(async function (response) 
        {
            var _dataLast   = JSON.stringify(response.data);
            var _last       = JSON.parse(_dataLast.toString()).response.result
    
            if(_last.length > 0)
            {
                resolve(_last);
            } else {
                resolve("error");
            }
        })
        .catch(function (error) {
            resolve("error");
        });  
    })
}