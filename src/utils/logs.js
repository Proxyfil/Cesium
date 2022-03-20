const { MessageEmbed } = require('discord.js');
module.exports = {
    error: async function (content, error) {
        const embed = new MessageEmbed()
            .setTitle(':no_entry_sign: An Error Occured :no_entry_sign: ')
            .setColor(0xcc0000)
            .setDescription(':rotating_light: ' + content + ' :')
            .setTimestamp()
            .addFields(
                { name: 'Error :', value: error.stack + ' || ' + error }
            );

        return embed;
    },
    failed: async function (interaction, error) {
            const embed = new MessageEmbed()
                .setTitle("Something went wrong")
                .setDescription(error)
                .setColor("ff5555")
                .setTimestamp()

        return embed
    },
    referral_success: async function (member,invite_owner) {
            const embed = new MessageEmbed()
                .setTitle(`Hello ${invite_owner.username} :wave:`)
                .setDescription(`I've detected that ${member.username} has joined the server with your invite link ! You\'re count has grown up :thumbsup:`)
                .setColor("1cbe7d")
                .setTimestamp()

        return embed
    }
}