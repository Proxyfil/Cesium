//Var Declaration
const { Client, RichEmbed, Message, MessageEmbed, APIMessage, Intents, MessageAttachment } = require('discord.js');
const { isValidChecksumAddress } = require('ethereumjs-util');
const intents = new Intents([Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_INVITES]);
const bot = new Client({ disableEveryone: "False", intents: intents });
const token = require('./creds/token.json').discord;
const cmdinit = require('./commands/commands_init.js');
const logs = require('./utils/logs.js')
const commands = require('./commands/commands.js')
const db = require('./utils/db.js');
const fs = require('fs');


setInterval(end_events(),300000)

setInterval(delete_events(),300000)

function end_events(){
    let events = db.get_events()["data"]

    Object.keys(events).forEach(event_id => {
        if(events[event_id]["timestamp"] < Date.now() && events[event_id]["status"] == "not given"){
            let output = db.end_event(event_id)

            output["data"]["joined"].forEach(user_id => {
                let embed = new MessageEmbed()
                .setTitle(`🎬 The event "*${output["data"]["title"]}*" has been ended !`)
                .setColor('1cbe7d')

                if(events[event_id]["submissions"][user_id][0] == events[event_id]["answer"]){
                    embed.setDescription(`🪙 You have won ${output["data"]["points"] + output["data"]["wnr_points"]} points :thumbsup:`)
                }
                else{
                    embed.setDescription(`🪙 You have won ${output["data"]["points"]} points :thumbsup:`)
                }
        
                bot.users.send(user_id,{"embeds":[embed]})
            });
            events[event_id]["status"] = "given"
        }
    });

    data = JSON.stringify(events, null, 4); // Rewrite file
    fs.writeFileSync('./src/ressources/db/events/events.json', data);
}

function delete_events(){

    let events = db.get_events()

    Object.keys(events).forEach(event_id => {
        if(events[event_id]["timestamp"]+604800000 < Date.now() && events[event_id]["status"] == "given"){
            delete events[event_id]
        }
    });

    data = JSON.stringify(events, null, 4); // Rewrite file
    fs.writeFileSync('./src/ressources/db/events/events.json', data);
}

//On error -------------------------------------------------------------------------------------------------------------------------------------------------------------------
//This is my debug system.
process.on('unhandledRejection', async (error, promise) => {
    const logs_channel = bot.channels.cache.find(channel => channel.id === logs_channel_id) //Change this channel id to send you errors on bot
    let log = await logs.error("Request failed", error)
    logs_channel.send({ embeds: [log] }) //Send embed to channel
    logs_channel.send('<@&847847768365989988>') //Send ping (can be removed)
});

bot.login(token);