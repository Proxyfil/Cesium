module.exports = function (bot) {
    var command_list = [
    {
        "name": "ping",
        "description": "Debug feature",
        "options": ""
    },
    {
        "name": "referral_info",
        "description": "Give you info about referral program",
        "options": ""
    },
    {
        "name": "referral_leaderboard",
        "description": "Give you top users in the referral program",
        "options": ""
    },
    {
        "name": "referral_status",
        "description": "Give you someone's referrals",
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
        "name": "referral_join",
        "description": "Allow you to join the referral program",
        "options": [{
            "name": "eth_address",
            "description": "Give a valid ETH address (with 0x)",
            "type": 3,
            "required": true
        }]
    },
    {
        "name": "event_info",
        "description": "Give you info about events",
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
            "description": "Points for each participants",
            "type": 10,
            "required": true
        },
        {
            "name": "winner_points",
            "description": "Points for each winners",
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
        },
        {
            "name": "answer",
            "description": "Answer that need to be find",
            "type": 3,
            "required": true
        }]
    },
    {
        "name": "event_join",
        "description": "Allow you to join an event",
        "options": [{
            "name": "event_id",
            "description": "Give a valid event id",
            "type": 10,
            "required": true
        }]
    },
    {
        "name": "event_submit",
        "description": "Allow you to submit an answer",
        "options": [{
            "name": "event_id",
            "description": "Give a valid event id",
            "type": 10,
            "required": true
        },{
            "name": "answer",
            "description": "Answer of your submit",
            "type": 3,
            "required": true
        }]
    },
    {
        "name": "event_submissions",
        "description": "Allow you to see submissions for an event [MODS ONLY]",
        "options": [{
            "name": "event_id",
            "description": "Give a valid event id",
            "type": 10,
            "required": true
        }]
    },
    {
        "name": "event_end",
        "description": "Allow you to end an event [MODS ONLY]",
        "options": [{
            "name": "event_id",
            "description": "Give a valid event id",
            "type": 10,
            "required": true
        },
        {
            "name": "alert",
            "description": "Do you want to alert users of the event's end ?",
            "type": 5,
            "required": true
        }]
    },
    {
        "name": "event_give",
        "description": "Allow you to give points to someone [MODS ONLY]",
        "options": [{
            "name": "user",
            "description": "User to target",
            "type": 6,
            "required": true
        },
        {
            "name": "amount",
            "description": "Amount to give",
            "type": 10,
            "required": true
        }]
    },
    {
        "name": "event_remove",
        "description": "Allow you to remove points to someone [MODS ONLY]",
        "options": [{
            "name": "user",
            "description": "User to target",
            "type": 6,
            "required": true
        },
        {
            "name": "amount",
            "description": "Amount to remove",
            "type": 10,
            "required": true
        }]
    },
    {
        "name": "event_status",
        "description": "Give you someone's event points",
        "options": [{
            "name": "user",
            "description" : "Tag of an user",
            "type": 6,
            "required": true
        }]
    },
    {
        "name": "event_leaderboard",
        "description": "Give you top users in the event program",
        "options": ""
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