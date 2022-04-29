const { MessageEmbed } = require('discord.js');
module.exports = {
    ping: function (interaction) { //Get latency
        let latency = (Date.now() - interaction.createdTimestamp)

        const embed = new MessageEmbed()
            .setTitle('📡 Pong 📡')
            .setDescription(latency.toString() + ' ms latency')
            .setColor('1cbe7d')

        return embed;
    },
    r_info: function () { //Get info for the bot
        const embed = new MessageEmbed()
            .setTitle('📝 Referral program Info :')
            .setDescription('The referral program keeps track of primary referrals, secondary referrals, as well as tertiary referrals to gauge your network\'s reach. The number of referrals is a factor that the PYX_LABS team will use when considering potential PYX_LIST users')
            .addFields(
                {"name":":arrow_right: Join the program :","value":"Use /join command followed by your ETH address to get an invite link to start playing!"},
                {"name":":medal: Leaderboard of the program :","value":"Use /leaderboard command to get a list of addresses currently competing & their score"}
            )
            .setColor('1cbe7d')

        return embed;
    },
    r_join: function(interaction,code) { //Message on joined program
        const embed = new MessageEmbed()
            .setTitle(':white_check_mark: You\'ve successfully joined the referral program :white_check_mark:')
            .setDescription('')
            .addFields(
                {"name":":link: Your invite link :","value":`https://discord.gg/${code}`}
            )
            .setColor('1cbe7d')

        return embed;
    },
    r_leaderboard: function(interaction) { //Message on joined program
        const embed = new MessageEmbed()
            .setTitle(`🏆 Leaderboard of ${interaction.guild.name}`)
            .setDescription('')
            .setColor('1cbe7d')

        return embed;
    },
    r_status: function(interaction,leaderboard,username) {
        const embed = new MessageEmbed()
            .setTitle(`🖼️ Here is the profile of ${username}`)
            .setDescription('')
            .addFields({"name": `**🥇 Tier 0** : ${leaderboard["tier0"].toString()} | **🥈 Tier 1** : ${leaderboard["tier1"].toString()} | **🥉 Tier 2** : ${leaderboard["tier2"].toString()} | **🏅 Overall** : ${leaderboard["overall"].toString()}`,"value": `-------`})
            .setColor('1cbe7d')

        return embed;
    },
    e_info: function(events) {
        const embed = new MessageEmbed()
            .setTitle(`📝 Events program Info :`)
            .setDescription('Throughout our marketing campaign, PYX_LABS will host a variety of events and competitions to allow for a select number of members to win a PYX_LIST spot. Even if you do not win however, participating in an event will allow users to gain event points, a factor that the PYX_LABS team will use when considering potential PYX_LIST candidates')
            .setColor('1cbe7d')

        events.forEach(event => {
            if(event["timestamp"] > Date.now())
            embed.addFields({"name":`**🏷️ ${event["title"]}** | 📝 *${event["description"]}*`,"value":`👑 Winners : ${event["nbr_winners"]} - 🪙 Points to earn : ${event["points"]}\n😀 Players : ${event["joined"].length} - 📮 Submissions : ${event["submission"]}\n📅 End date : ${new Date(event["timestamp"]).toString()}\n 🆔 ID : ${event["id"].toString()}\n-------`})
        });

        return embed;
    },
    new_event: function(event) {
        const embed = new MessageEmbed()
            .setTitle(`New event created :`)
            .setDescription(`Created at ${Date()}`)
            .addFields(
                {"name":"🏷️ Title :","value":event["title"].toString()},
                {"name":"📝 Description :","value":event["description"].toString()},
                {"name":"👑 Number of Winners :","value":event["nbr_winners"].toString()},
                {"name":"🪙 Points to winners :","value":event["points"].toString()},
                {"name":"📅 End Date :","value":new Date(event["timestamp"]).toString()},
                {"name":"📮 Allow submissions :","value":event["submission"].toString()},
                {"name":"🆔 ID :","value":event["id"].toString()}
                )
            .setColor('1cbe7d')

        return embed;
    },
    e_join: function(event) {
        const embed = new MessageEmbed()
            .setTitle(`➡️ You have joined the event "*${event["title"]}*"`)
            .setDescription(`📅 End date of this event : ${new Date(event["timestamp"]).toString()}`)
            .setColor('1cbe7d')

        return embed;
    },
    e_submit: function(event) {
        const embed = new MessageEmbed()
            .setTitle(`🔗 You have submitted a link for the event "*${event["title"]}*"`)
            .setDescription(`📅 End date of this event : ${new Date(event["timestamp"]).toString()}`)
            .setColor('1cbe7d')

        return embed;
    },
    e_submissions: function(event) {
        let embeds = []
        const embed_guild = new MessageEmbed()
            .setTitle(`:information_source: The submissions will be send in your DMs to avoid some spamming here`)
            .setDescription(`⌛ This operation could take a bit of time`)
            .setColor('1cbe7d')

        embeds.push(embed_guild)

        return embeds;
    },
    e_give: function(amount,username) {
        const embed = new MessageEmbed()
            .setTitle(`🪙 ${username} has receive points !`)
            .setDescription(`🏦 New amount : ${amount}`)
            .setColor('1cbe7d')

        return embed;
    },
    e_remove: function(amount,username) {
        const embed = new MessageEmbed()
            .setTitle(`🪙 ${username} has lose points !`)
            .setDescription(`🏦 New amount : ${amount}`)
            .setColor('1cbe7d')

        return embed;
    },
    e_end: function(event) {
        const embed = new MessageEmbed()
            .setTitle(`🎬 ${event["title"]} has been ended`)
            .setDescription(`🧑‍🤝‍🧑 Participants : ${event["joined"].length}`)
            .setColor('1cbe7d')

        return embed;
    },
    e_status: function(amount,username) {
        const embed = new MessageEmbed()
            .setTitle(`🖼️ Here is the profile of ${username}`)
            .setDescription('')
            .addFields({"name": `🪙 Event points : ${amount}`,"value": `-------`})
            .setColor('1cbe7d')

        return embed;
    },
    e_leaderboard: function(interaction) { //Message on joined program
        const embed = new MessageEmbed()
            .setTitle(`🏆 Leaderboard of ${interaction.guild.name}`)
            .setDescription('')
            .setColor('1cbe7d')

        return embed;
    }
}