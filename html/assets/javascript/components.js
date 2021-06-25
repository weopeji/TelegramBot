(function (global) {
    "use strict";

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


    class moderation {

        constructor() {

            this.$component = $(`
                <div class="index_page_body_moderation">

                </div>
            `);

        };

        getModerationsBlocks() {
            return callApi({
                methodName: 'getModerations',
            }).then((data) => {
                return data; 
            });
        }

        async render() 
        {
            this.$component.empty();
            var _moderations = await this.getModerationsBlocks();
            console.log(_moderations);
            _moderations.forEach(element => {
                var templateText = `
                    <div class="index_page_body_moderation_block">
                        <h1>${element.data[1].name}</h1>
                        <p>${element.data[1].target}</p>
                        <a>Номер ${element._id}</a>

                        <div class="index_page_body_moderation_block_buttons">
                            <div class="moderation_block_buttons_show">
                                <span>Посмотреть</span>
                            </div>
                            <div class="moderation_block_buttons_accept">
                                <span>Принять</span>
                            </div>
                        </div>
                    </div>
                `;
                this.$component.append(templateText);
            });

            return this.$component;
        }

    }

    class active {

        constructor() {

            this.$component = $(`
                <div class="index_page_body_moderation">

                </div>
            `);

        };

        getActiveBlocks() {
            return callApi({
                methodName: 'getActive',
            }).then((data) => {
                return data; 
            });
        }

        async render() 
        {
            this.$component.empty();
            var _moderations = await this.getActiveBlocks();
            console.log(_moderations);
            _moderations.forEach(element => {
                var templateText = `
                    <div class="index_page_body_moderation_block">
                        <h1>${element.data[1].name}</h1>
                        <p>${element.data[1].target}</p>
                        <a>Номер ${element._id}</a>

                        <div class="index_page_body_moderation_block_buttons">
                            <div class="moderation_block_buttons_show">
                                <span>Посмотреть</span>
                            </div>
                            <div class="moderation_block_buttons_accept">
                                <span>Принять</span>
                            </div>
                        </div>
                    </div>
                `;
                this.$component.append(templateText);
            });

            return this.$component;
        }

    }

    if(!global.Components)
    {
        global.Components = {
            moderation,
            active,
        }
    }
    


}(window))