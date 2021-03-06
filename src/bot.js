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

//Global Vars
let logs_channel_id = "924675846843793409"
let bot_channel = "966354052449443853"
let mods = []

//Utils functions
const reply = async function (interaction, response) { //Reply to defered interaction
    interaction.editReply({ embeds: [response] });
}

//Start Script
cmdinit(bot); //Rewrite every commands

bot.on('ready', () => { //Bot init
    console.log("[" + new Date().toLocaleString() + "] [BOOT] Is this... life ?");
    bot.user.setActivity("/referral_info | /event_info")
})

bot.on('interactionCreate', async interaction =>{ //On interaction

    if(interaction.isCommand() && interaction.user.id != bot.user.id && interaction.channelId == bot_channel){ //Interaction is command -> Handle | You can modify channelID

        await interaction.deferReply(); //Say to discord that we handle this command

        if(interaction.commandName == "ping"){
            let embed = commands.ping(interaction)
            reply(interaction,embed) //Send Ping
        }

        else if(interaction.commandName == "referral_info"){
            let embed = commands.r_info()
            reply(interaction,embed)
        }

        else if(interaction.commandName == "update_leaderboard" && mods.includes(interaction.user.id)){
            let users = db.get_users_db()
            db.update_leaderboard(users)

            let embed = await logs.leaderboard_updated()
            reply(interaction,embed)
        }

        else if(interaction.commandName == "referral_leaderboard"){
            let top = db.get_leaderboard(20)

            let embed = commands.r_leaderboard(interaction)

            await top.forEach(async element => {
                let username = await (await bot.users.fetch(element[0])).username
                embed.addFields({"name": `${username.toString() } :arrow_right: **Tier 0** : ${element[1]["tier0"].toString()}`,"value": `-------`})
                
                if(element[0] == top[top.length-1][0]){
                    reply(interaction,embed)
                }
            });
        }

        else if(interaction.commandName == "referral_join"){
            args = interaction.options.data; //Get options as {args}

            if(args[0].value.length != 42 || !args[0].value.startsWith('0x')){ //Verify ETH Address style
                let embed = await logs.failed(interaction,"ETH Address not standardized (should be 42 characters long with '0x')")
                reply(interaction,embed)
            }
            else if(!isValidChecksumAddress(args[0].value)){ //Verify if ETH Address exist
                let embed = await logs.failed(interaction,`The address '${args[0].value}' is not a real ETH Address`)
                reply(interaction,embed)
            }
            else if(db.get_eth().includes(args[0].value)){
                let embed = await logs.failed(interaction,`This address is already registered`)
                reply(interaction,embed)
            }
            else if(db.get_users().includes(interaction.user.id)){
                let embed = await logs.failed(interaction,`You have already link an eth address`)
                reply(interaction,embed)
            }
            else{ //User is unique
                let invite_code = (await interaction.guild.invites.create(interaction.channelId,{temporary: false, unique: true, reason: `referral program, created by ${interaction.user.username}`,maxAge:0})).code //Create invite link for the channel
                db.write_user(interaction,args[0].value,invite_code) //Add user to db
                db.write_invite(args[0].value,invite_code) //Add invite to db

                let embed = commands.r_join(interaction,invite_code) //Confirm message build
                reply(interaction,embed)
            }

        }

        else if(interaction.commandName == "referral_status"){
            args = interaction.options.data; //Get options as {args}
            let user = db.get_rank(args[0].value)
            let username = await (await bot.users.fetch(args[0].value)).username

            let embed = commands.r_status(interaction,user,username)
            reply(interaction,embed)
        }

        else if(interaction.commandName == "event_info"){
            let output = db.get_events(20)

            let embed = commands.e_info(output["data"])
            reply(interaction,embed)
        }

        else if(interaction.commandName == "new_event" && mods.includes(interaction.user.id)){
            args = interaction.options.data; //Get options as {args}  

            let output = db.create_event(args)
            if(output["error"] == 0){
                if(output["data"]["nbr_winners"] < 1){
                    output["data"]["nbr_winners"] = output["data"]["nbr_winners"]+" (somehow you asked for this)" 
                }
                let embed = commands.new_event(output["data"])
                reply(interaction,embed)
            }
            else if(output["error"] == 1){
                let embed = await logs.failed(interaction,"Date couldn't be resolve")
                reply(interaction,embed)
            }
            else if(output["error"] == 2){
                let embed = await logs.failed(interaction,"Endtime is in the past")
                reply(interaction,embed)
            }
        }

        else if(interaction.commandName == "event_join"){
            args = interaction.options.data; //Get options as {args}  

            let output = db.join_event(interaction.user.id,args[0].value.toString())
            if(output["error"] == 0){
                let embed = commands.e_join(output["data"])
                reply(interaction,embed)
            }
            else if(output["error"] == 1){
                let embed = await logs.failed(interaction,"Event ID couldn't be resolve")
                reply(interaction,embed)
            }
            else if(output["error"] == 2){
                let embed = await logs.failed(interaction,"You have already join this event")
                reply(interaction,embed)
            }
        }

        else if(interaction.commandName == "event_submit"){
            args = interaction.options.data; //Get options as {args}

            let output = db.submit(interaction.user.id,args)
            if(output["error"] == 0){
                let embed = commands.e_submit(output["data"])
                reply(interaction,embed)
            }
            else if(output["error"] == 1){
                let embed = await logs.failed(interaction,"Event ID couldn't be resolve")
                reply(interaction,embed)
            }
            else if(output["error"] == 2){
                let embed = await logs.failed(interaction,"You have already submitted a link")
                reply(interaction,embed)
            }
            else if(output["error"] == 3){
                let embed = await logs.failed(interaction,"You need to join this event before submitting")
                reply(interaction,embed)
            }
            else if(output["error"] == 4){
                let embed = await logs.failed(interaction,"It's too late to submit a file")
                reply(interaction,embed)
            }
            else if(output["error"] == 5){
                let embed = await logs.failed(interaction,"This event doesn't allow submissions")
                reply(interaction,embed)
            }
        }

        else if(interaction.commandName == "event_submissions" && mods.includes(interaction.user.id)){
            let args = interaction.options.data; //Get options as {args}
            let output = db.get_event(args[0].value.toString())
            let event = output["data"]

            if(output["error"] == 0){
                let embeds = commands.e_submissions(event)
                reply(interaction,embeds[0])

                for (let e = 0; e < Math.floor(Object.keys(event["submissions"]).length/20)+1; e++) {
                    let embed = new MessageEmbed()
                        .setTitle(`???? Submission list for "*${event["title"]}*"`)
                        .setDescription(`#?????? Page ${e+1}/${Math.floor(Object.keys(event["submissions"]).length/20)+1}`)
                        .setColor('1cbe7d')
        
                    Object.keys(event["submissions"]).splice(e*20,(e+1)*20).forEach(async sub_key => {
                        let user = await (await bot.users.fetch(sub_key)).username
                        embed.addFields({"name":`${user} | ${event["submissions"][sub_key][0]}`,"value":`-------`})

                        if(sub_key == Object.keys(event["submissions"])[Object.keys(event["submissions"]).length-1] || sub_key == Object.keys(event["submissions"])[(e+1)*20-1]){
                            bot.users.send(interaction.user.id,{"embeds":[embed]})
                        }
                    });
                }
            }
            else if(output["error"] == 1){
                let embed = await logs.failed(interaction,"Event ID couldn't be resolve")
                reply(interaction,embed)
            }
        }

        else if(interaction.commandName == "event_give" && mods.includes(interaction.user.id)){
            args = interaction.options.data; //Get options as {args}
            let amount = db.give(args)
            let username = await (await bot.users.fetch(args[0].value)).username

            let embed = commands.e_give(amount["data"],username)
            reply(interaction,embed)
        }

        else if(interaction.commandName == "event_remove" && mods.includes(interaction.user.id)){
            args = interaction.options.data; //Get options as {args}
            let amount = db.remove(args)
            let username = await (await bot.users.fetch(args[0].value)).username

            let embed = commands.e_remove(amount["data"],username)
            reply(interaction,embed)
        }

        else if(interaction.commandName == "event_end" && mods.includes(interaction.user.id)){
            args = interaction.options.data; //Get options as {args}
            let output = db.end(args)

            if(output["error"] == 1){
                let embed = await logs.failed(interaction,"Event ID couldn't be resolve")
                reply(interaction,embed)
            }
            else{
                let embed = commands.e_end(output["data"])
                reply(interaction,embed)

                if(args[1].value == true){
                    output["data"]["joined"].forEach(user_id => {
                        let embed = new MessageEmbed()
                        .setTitle(`???? The event "*${output["data"]["title"]}*" has been ended !`)
                        .setDescription(`???? You have won ${output["data"]["points"]} points :thumbsup:`)
                        .setColor('1cbe7d')

                        bot.users.send(user_id,{"embeds":[embed]})
                    });
                }
            }
        }

        else if(interaction.commandName == "event_status"){
            args = interaction.options.data; //Get options as {args}
            let output = db.e_status(args[0].value)
            let username = await (await bot.users.fetch(args[0].value)).username

            let embed = commands.e_status(output["data"],username)
            reply(interaction,embed)
        }

        else if(interaction.commandName == "event_leaderboard"){
            let top = db.get_leaderboard_e(20)

            let embed = commands.e_leaderboard(interaction)

            await top.forEach(async element => {
                let username = await (await bot.users.fetch(element[0])).username
                embed.addFields({"name": `${username.toString() } :arrow_right: **???? Event points** : ${element[1]}`,"value": `-------`})
                
                if(element[0] == top[top.length-1][0]){
                    reply(interaction,embed)
                    return
                }
            });

            reply(interaction,embed)
        }

        else{
            let embed = await logs.failed(interaction, "You probably don't have perms to do this command !")
            reply(interaction,embed)
        }
    }

});

bot.on('guildMemberAdd', async member=>{
    let invite_cache = await member.guild.invites.fetch({"cache":false,"force":true}) //Require all invites for guild
    let invite_saved = db.get_invites() //require invites stored in db

    invite_cache.forEach(async invite => { //For each invites in server
        if(Object.keys(invite_saved).includes(invite.code)){ //If invite in our db
            if(invite.uses != invite_saved[invite.code].uses){ //If invite uses different than our db
                let output = db.add_use(invite.code,1,member.id)
                let invite_owner = await db.get_user(invite_saved[invite.code].eth_address) //Get invite owner

                let dm = await bot.users.createDM(invite_owner.user_id) //Create DM channel with invite owner
                if(output["error"] == 0){
                    let embed = await logs.referral_success(member,invite_owner) //Info message build
                    dm.send({embeds: [embed]})
                }
                else{
                    let embed = await logs.referral_fail(member,invite_owner)
                    dm.send({embeds: [embed]})
                }
            }
        }
    });
});

//On error -------------------------------------------------------------------------------------------------------------------------------------------------------------------
//This is my debug system.
process.on('unhandledRejection', async (error, promise) => {
    const logs_channel = bot.channels.cache.find(channel => channel.id === logs_channel_id) //Change this channel id to send you errors on bot
    let log = await logs.error("Request failed", error)
    logs_channel.send({ embeds: [log] }) //Send embed to channel
    logs_channel.send('<@&847847768365989988>') //Send ping (can be removed)
});

bot.login(token);