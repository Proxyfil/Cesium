module.exports = function (bot) {
    var command_list = [
    {
        "name": "ping",
        "description": "Debug feature",
        "options": ""
    },
    {
        "name": "info",
        "description": "Give you info about referral programm",
        "options": ""
    },
    {
        "name": "leaderboard",
        "description": "Give you top users in the referral programm",
        "options": ""
    },
    {
        "name": "join",
        "description": "Allow you to join the referral programm",
        "options": [{
            "name": "eth_address",
            "description": "Give a valid ETH address (with 0x)",
            "type": 3,
            "required": true
        }]
    }]

    command_list.forEach(command => {
        bot.api.applications('955036416784613406').guilds('751899176262172759').commands.post({ //Change Guild ID to yours and bot ID too
            data: {
                name: command.name,
                description: command.description,
                options: command.options
            }
        }).catch(error => {
            console.log(error)
        });
        console.log("[" + new Date().toLocaleString() + "] [INIT] Command initiated : " + command.name + " has been initiated")
    });
}