(function (global) 
{
    io_connect( function() 
    {
        global.loadResources(['./js/components.js'], () => {
            global.loadResources(['./js/redacting_page.js'], () => {
                global.loadResources(['./js/commissions.js'], () => {
                    global.loadResources(['./js/Chats.js'], () => {
                        global.loadResources(['./js/video_redactor.js'], () => {
                            global.loadResources(['./js/wait_investings.js'], () => {
                                global.loadResources(['./js/complaint.js'], () => {
                                    global.loadResources(['./js/bot2.js'], () => {
                                        Main();
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });    
    });

    if(_getCookie('black_styles'))
    {
        let $       = document;
        let head    = $.getElementsByTagName('head')[0];
        let link    = $.createElement('link');
        link.rel    = 'stylesheet';
        link.type   = 'text/css';
        link.href   = '/html/assets/css/2.0.0/black/index.css';
        head.appendChild(link);
    }
    else
    {
        let $       = document;
        let head    = $.getElementsByTagName('head')[0];
        let link    = $.createElement('link');
        link.rel    = 'stylesheet';
        link.type   = 'text/css';
        link.href   = '/html/assets/css/2.0.0/white/index.css';
        head.appendChild(link);
    };

    async function Main()
    {
        global.pageID           = _GET('page');

        const auth_block        = new global.Components.auth_block().render();
        const projects          = new global.Components.projects();
        const block             = new global.Components.block();
        const all_users         = new global.Components.all_users();
        const investings        = new global.Components.investings();
        const pays_business     = new global.Components.pays_business();
        const pays_attract      = new global.Components.pays_attract();
        const commissions       = new global.Components.commissions();
        const Chats             = new global.Components.Chats();
        const wait_investings   = new global.Components.wait_investings();
        const complaint         = new global.Components.complaint();
        const bot2              = new global.Components.bot2();
        
        var pagesLAN = 
        {
            "moderations": function() {projects.render("moderations");},
            "active": function() {projects.render("active");},
            "block": function() {block.render();},
            "all_users": function() {all_users.render();},
            "investings": function() {investings.render()},
            "pays_business": function() {pays_business.render()},
            "pays_attract": function() {pays_attract.render()},
            "commissions": function() {commissions.render()},
            "Chats": function() {Chats.render()},
            "wait_investings": function() {wait_investings.render()},
            "complaint": function() {complaint.render()},
            "bot2": function() {bot2.render()},
        };

        if(global.pageID)
        {
            $('.index_page_body_data').empty();
            pagesLAN[global.pageID]();
        } else {
            $('.index_page_body_data').empty();
            pagesLAN["moderations"]();
        }

        $('.button_open_settings_page').click( function() {
            $('.index_page').toggleClass('selected');
        })
    }

}(window))