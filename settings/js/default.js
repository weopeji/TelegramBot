(function (global) 
{
    io_connect( function() 
    {
        global.loadResources(['./js/components.js'], () => {
            Main();
        });    
    });

    async function Main()
    {
        
        // const user_block        = new global.Components.user_block();
        // const activ_projects    = new global.Components.activ_projects();
        // const acceptPays        = new global.Components.acceptPays();
        // const chats             = new global.Components.chats();
        // const pay_investors     = new global.Components.pay_investors();
        // const myProjects        = new global.Components.myProjects();
        // const signature         = new global.Components.signature();
        // const Attracted_by_me   = new global.Components.Attracted_by_me();
        // const reward            = new global.Components.reward();

        // var _User = await user_block.render(_id);
        // global.allData.User = _User;

        // var renderPage = 
        // {
        //     "profil": function() {profil_page.render(global.allData)},
        //     "activ_projects": function() {
        //         if(!_GET('id')) {
        //             activ_projects.render(global.allData)
        //         } else {
        //             activ_projects.renderType(global.allData)
        //         }
        //     },
        //     "acceptPays": function() {acceptPays.render(global.allData)},
        //     "chats": function() {chats.render(global.allData)},
        //     "pay_investors": function() {pay_investors.render(global.allData)},
        //     "myProjects": function() {
        //         if(!_GET('id')) {
        //             myProjects.render(global.allData)
        //         } else {
        //             myProjects.renderType(global.allData)
        //         }
        //     },
        //     "signature": function() {signature.render(global.allData)},
        //     "Attracted_by_me": function() {Attracted_by_me.render(global.allData)},
        //     "reward": function() {reward.render(global.allData)}
        // }

        // renderPage[pageID]();

        (() => {
            $('.buttons_menu').click( function() {
                $('.index_page_menu').toggleClass('selected');
                $('.buttons_menu').toggleClass('selected');
            })
        })()
    }

}(window))