module.exports = {
    init:function(initPlagins)
    {
        privateInit(initPlagins);
    },
    components_page: function(socket,data,callback) {
        privat_index_page(socket,data,callback);
    },
};

function privateInit(initPlagins) 
{
    TelegramBot     = initPlagins.TelegramBot;
    config          = initPlagins.config;
    secondBotUser   = initPlagins.secondBotUser;
    bot             = new TelegramBot(config.second_bot_token, { polling: true });
    crypto          = require('crypto');
    
    startSecondBot();
}

async function sendPhone(msg)
{
    await bot.sendMessage(msg.from.id, "Подтвердите свой номер телефона по кнопке ниже!", {
        parse_mode: "HTML",
        reply_markup: {
            "resize_keyboard": true,
            "keyboard": [
                [
                    {
                        text: "Подтвердить!",
                        request_contact: true,
                    }
                ]
            ],
        }
    });
};

async function startSecondBot() 
{
    bot.onText(/\/start (.+)/, async (msg, match) => 
    {
        try {
            var resp        = match[1];

            if(
                resp == "from" ||
                resp == "to"
            ) {
                await secondBotUser.create({
                    user: msg.from.id,
                    type: resp,
                });
                await sendPhone(msg);
            } else {
                throw new Error("Invalid response");
            };
        } catch (e) {
            await bot.sendMessage(msg.from.id, "Вы перешли не по рефераьной ссылке! Используйте ее еще раз...");
            return;
        };
    });

    bot.on('message', async (msg) => 
    {
        console.log(msg);

        var Bot2User    = await secondBotUser.findOne({user: msg.from.id});
        var text        = msg.text;

        if(
            typeof text != 'undefined' &&
            text.indexOf('/start') != -1
        )
        {
            return;
        };

        if(!Bot2User) {
            await bot.sendMessage(msg.from.id, "Вы перешли не по рефераьной ссылке! Используйте ее еще раз...");
            return;
        };

        if(
            typeof msg.contact != 'undefined'
            && typeof msg.contact.phone_number != 'undefined'
        ) {
            await secondBotUser.findOneAndUpdate({user: msg.from.id}, {phone: msg.contact.phone_number});
        };

        if(typeof Bot2User.phone == 'undefined') {
            await sendPhone(msg);
            return;
        };

        if(typeof Bot2User.payment == 'undefined') {
            console.log(crypto.randomBytes(48).toString('hex'));
            console.log(config.payment_key_yookassa);

            await bot.sendInvoice(
                msg.from.id,
                "Доступ к закрытому клубу",
                "Благодарим вас за проявленный интерес. Чтобы получить доступ к закрытому клубу по инвестициям в недвижимость, вам нужно нажать на кнопку для оплаты разового членского взноса в размере",
                crypto.randomBytes(48).toString('hex'),
                config.payment_key_yookassa,
                "pay",
                "RUB",
                [{
                    label: "Получить доступ",
                    amount: 1000000
                }],
            );
        }
    });

    bot.on('pre_checkout_query', async (msg) => {
        console.log(`[bot] successful payment`)
        console.log('Successful Payment', msg)
        await bot.sendMessage(msg.from.id, 'Thank you for your purchase!');
    });
};