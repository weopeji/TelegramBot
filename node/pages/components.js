var Project     = null;


module.exports = {
    init:function(initPlagins)
    {
        privateInit(initPlagins);
    },
    components_page: function(socket,data,callback) {
        privat_index_page(socket,data,callback);
    }
}


function privateInit(initPlagins) {
    Project     = initPlagins.Project;
}


var privat_index_page = function(socket,data,callback) {
    var action = data.action;
    if(typeof action_linker[action] != "undefined") {
        action_linker[action](socket,data.data,callback,data)   
    } else {
        callback({
            error: {
                code:0 //no action
            }
        });
    }
}

var action_linker = {
    "getModerations": getModerations,
    "getActive": getActive,
    "getProject": getProject,
}

function getProject(socket,data,callback) {
    console.log(data);
}

async function getActive(socket,data,callback) {
    var _projects   = await Project.find({type: "active"});
    callback(_projects);
}

async function getModerations(socket,data,callback) {
    var _projects   = await Project.find({type: "moderation"});
    callback(_projects);
}