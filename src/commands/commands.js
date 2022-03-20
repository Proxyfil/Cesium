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
            .setDescription('')
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
    }
}