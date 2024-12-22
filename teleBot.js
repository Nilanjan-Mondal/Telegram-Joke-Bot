const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');
const axios = require('axios');
// console.log(dotenv); // dotenv is an object that contqains config 

dotenv.config();

// console.log(process.env.TELEGRAM_TOKEN);  //process is the global object which has a env property which has access to all the environment variables

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {polling: true});

bot.on('message', (option) => {
    console.log("Message received on the bot", option); //option is the object getting recieved when we type something to the bot (it is displayed on the terminal)
})

bot.onText(/\/start/, (option) => { 
    console.log("Message received on the bot", option);
    bot.sendMessage(option.chat.id, "Hello, I am a joke bot developed by Cheemdu. I am here to Give you lame jokes");
    bot.sendMessage(option.chat.id, "Type /joke for a random joke");
})

bot.onText(/\/info/, (option) => { 
    console.log("Message received on the bot", option);
    bot.sendMessage(option.chat.id, "Type /joke for a random joke");
})

bot.onText(/\/joke/, async (option) => { //option is the object getting recieved when we type something to the bot (it is displayed on the terminal)
    console.log("Message received on the bot", option);
    const response = await axios.get('https://official-joke-api.appspot.com/jokes/random');
    // console.log(response);
    const setup = response.data.setup;
    // console.log(response.data.setup);
    const punchline = response.data.punchline;
    // console.log(response.data.punchline);
    bot.sendMessage(option.chat.id, setup + ", " + punchline);
})