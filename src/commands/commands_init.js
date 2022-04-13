module.exports = function (bot) {
    var command_list = [
    {
        "name": "ping",
        "description": "Debug feature",
        "options": ""
    },
    {
        "name": "r_info",
        "description": "Give you info about referral programm",
        "options": ""
    },
    {
        "name": "r_leaderboard",
        "description": "Give you top users in the referral programm",
        "options": ""
    },
    {
        "name": "r_status",
        "description": "Give you top users in the referral programm",
        "options": [{
            "name": "user",
            "description" : "Tag of an user",
            "type": 6,
            "required": true
        }]
    },
    {
        "name": "update_leaderboard",
        "description": "Force leaderboard update [MODS ONLY]",
        "options": ""
    },
    {
        "name": "r_join",
        "description": "Allow you to join the referral programm",
        "options": [{
            "name": "eth_address",
            "description": "Give a valid ETH address (with 0x)",
            "type": 3,
            "required": true
        }]
    },
    {
        "name": "e_info",
        "description": "Give you info about referral programm",
        "options": ""
    },
    {
        "name": "new_event",
        "description": "Create an event [MODS ONLY]",
        "options": [{
            "name": "name",
            "description": "Name of the event",
            "type": 3,
            "required": true
        },
        {
            "name": "description",
            "description": "Description of the event",
            "type": 3,
            "required": true
        },
        {
            "name": "number",
            "description": "Number of winners",
            "type": 10,
            "required": true
        },
        {
            "name": "points",
            "description": "Points to winners",
            "type": 10,
            "required": true
        },
        {
            "name": "timestamp",
            "description": "Date and time of the end as {mm/dd/yyyy hh:mm:ss}",
            "type": 3,
            "required": true
        },
        {
            "name": "submission",
            "description": "Do you allow submissions ?",
            "type": 5,
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