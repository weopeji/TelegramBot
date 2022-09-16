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

async function sendInvoiceBot(msg)
{
    await bot.sendInvoice(
        msg.from.id,
        "🚀",
        "Благодарим вас за проявленный интерес. Чтобы получить доступ к закрытому клубу по инвестициям в недвижимость, вам нужно нажать на кнопку для оплаты разового членского взноса в размере",
        crypto.randomBytes(48).toString('hex'),
        config.payment_key_yookassa,
        "pay",
        "RUB",
        [{
            label: "Получить доступ",
            amount: 7453
        }],
    );
};

async function sendEnd(msg)
{
    await bot.sendMessage(msg.from.id, "Благодарим за оплату!\nВот вам первое инвестиционное предложение.\nСумма инвестиций более 5 мл руб\nС Уважением\nКоманда investir", {
        parse_mode: "HTML",
        reply_markup: {
            "inline_keyboard": [
                [
                    {
                        text: "Подтвердить!",
                        url: "https://t.me/investir_official",
                    }
                ]
            ],
        }
    });
};

async function sendTypeTo(msg)
{
    await bot.sendMessage(msg.from.id, "Благодарим вас за проявленный интерес.\nНа данный момент для вас нет подходящего предложения для инвестирования суммы\nдо 5мл руб.\nВ ближайшее время мы вам сообщим о появлении подходящего для вас предложения.\nС Уважением\nКоманда investir", {
        parse_mode: "HTML",
    });
}

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
        var Bot2User    = await secondBotUser.findOne({user: msg.from.id});
        var text        = msg.text;

        if(
            typeof text != 'undefined' &&
            text.indexOf('/start') != -1
        ) {
            return;
        };

        if(!Bot2User) {
            await bot.sendMessage(msg.from.id, "Вы перешли не по рефераьной ссылке! Используйте ее еще раз...");
            return;
        };

        if(Bot2User.type == "from") {
            if(
                typeof msg.contact != 'undefined'
                && typeof msg.contact.phone_number != 'undefined'
            ) {
                Bot2User = await secondBotUser.findOneAndUpdate({user: msg.from.id}, {phone: msg.contact.phone_number});
                await sendInvoiceBot(msg);
                return;
            };
    
            if(typeof msg.successful_payment != 'undefined') {
                Bot2User = await secondBotUser.findOneAndUpdate({user: msg.from.id}, {payment: msg.successful_payment});
                await sendEnd(msg);
                return;
            }
    
            if(typeof Bot2User.phone == 'undefined') {
                await sendPhone(msg);
                return;
            };
    
            if(typeof Bot2User.payment == 'undefined') {
                await sendInvoiceBot(msg);
                return;
            } else {
                await sendEnd(msg);
            };
        };
        
        if(Bot2User.type == "to") {
            await sendTypeTo(msg);
        };
    });

    bot.on('pre_checkout_query', async (msg) => {
        await bot.answerPreCheckoutQuery(msg.id, true);
    });
};
