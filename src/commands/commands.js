const { MessageEmbed } = require('discord.js');
module.exports = {
    ping: function (interaction) { //Get latency
        let latency = (Date.now() - interaction.createdTimestamp)

        const embed = new MessageEmbed()
            .setTitle('Pong')
            .setDescription(latency.toString() + ' ms latency')
            .setColor('1cbe7d')

        return embed;
    },
    info: function () { //Get info for the bot
        const embed = new MessageEmbed()
            .setTitle('Referral Programm Info :')
            .setDescription('The referral program keeps track of primary referrals, secondary referrals, as well as tertiary referrals to gauge your network\'s reach. The number of referrals is a factor that the PYX_LABS team will use when considering potential Whitelist users')
            .addFields(
                {"name":":arrow_right: Join the programm :","value":"Use /join command followed by your ETH address to get an invite link to start playing!"},
                {"name":":medal: Leaderboard of the programm :","value":"Use /leaderboard command to get a list of addresses currently competing & their score"}
            )
            .setColor('1cbe7d')

        return embed;
    },
    join: function(interaction,code) { //Message on joined programm
        const embed = new MessageEmbed()
            .setTitle(':white_check_mark: You\'ve successfully joined the referral programm :white_check_mark:')
            .setDescription('')
            .addFields(
                {"name":":link: Your invite link :","value":`https://discord.gg/${code}`}
            )
            .setColor('1cbe7d')

        return embed;
    },
    leaderboard: function(interaction) { //Message on joined programm
        const embed = new MessageEmbed()
            .setTitle(`Leaderboard of ${interaction.guild.name}`)
            .setDescription('')
            .setColor('1cbe7d')

        return embed;
    },
    status: function(interaction,leaderboard,username) {
        const embed = new MessageEmbed()
            .setTitle(`Here is the profile of ${username}`)
            .setDescription('')
            .addFields({"name": `**Tier 0** : ${leaderboard["tier0"].toString()} | **Tier 1** : ${leaderboard["tier1"].toString()} | **Tier 2** : ${leaderboard["tier2"].toString()} | **Overall** : ${leaderboard["overall"].toString()}`,"value": `-------`})
            .setColor('1cbe7d')

        return embed;
    }
}