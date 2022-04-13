const fs = require('fs');

module.exports = {
    get_eth: function(){ //Get all eth addresses
        let rawdata = fs.readFileSync('./src/ressources/db/referrals/users.json');
        let eth = JSON.parse(rawdata);

        return Object.keys(eth)
    },
    get_users: function(){ //Get all eth addresses
        let rawdata = fs.readFileSync('./src/ressources/db/referrals/addresses.json');
        let users = JSON.parse(rawdata);

        return Object.keys(users)
    },
    get_user: function(eth_address){ //Get every infos on user
        let rawdata = fs.readFileSync('./src/ressources/db/referrals/users.json');
        let users = JSON.parse(rawdata);

        return users[eth_address]
    },
    get_invites: function(){ //Get every invites
        let rawdata = fs.readFileSync('./src/ressources/db/referrals/invites.json');
        let invites = JSON.parse(rawdata);

        return invites
    },
    get_users_db: function(){ //Get every invites
        let rawdata = fs.readFileSync('./src/ressources/db/referrals/users.json');
        let users = JSON.parse(rawdata);

        return users
    },
    write_user: function(interaction,eth_address,code){ //Add user to db
        let rawdata = fs.readFileSync('./src/ressources/db/referrals/users.json');
        let new_user = JSON.parse(rawdata);
        new_user[eth_address] = {"username":interaction.user.username,"user_id":interaction.user.id,"eth_address":eth_address,"referrals":[],"invite":code}

        let data = JSON.stringify(new_user, null, 4);
        fs.writeFileSync('./src/ressources/db/referrals/users.json', data);

        rawdata = fs.readFileSync('./src/ressources/db/referrals/addresses.json');
        let new_address = JSON.parse(rawdata);
        new_address[interaction.user.id] = eth_address

        data = JSON.stringify(new_address, null, 4);
        fs.writeFileSync('./src/ressources/db/referrals/addresses.json', data);
    },
    write_invite: function(eth_address,code){ //Add invite link to db
        let rawdata = fs.readFileSync('./src/ressources/db/referrals/invites.json');
        let new_invite = JSON.parse(rawdata);
        new_invite[code] = {"eth_address":eth_address,"uses":0}

        let data = JSON.stringify(new_invite, null, 4);
        fs.writeFileSync('./src/ressources/db/referrals/invites.json', data);
    },
    add_use: function(code,amount,member){ //Add one use to invite link
        let rawdata = fs.readFileSync('./src/ressources/db/referrals/invites.json');
        let new_invite = JSON.parse(rawdata);
        new_invite[code]["uses"] += amount

        let data = JSON.stringify(new_invite, null, 4);
        fs.writeFileSync('./src/ressources/db/referrals/invites.json', data);

        rawdata = fs.readFileSync('./src/ressources/db/referrals/users.json');
        let new_user = JSON.parse(rawdata);
        new_user[new_invite[code]["eth_address"]]["referrals"].push(member)

        data = JSON.stringify(new_user, null, 4);
        fs.writeFileSync('./src/ressources/db/referrals/users.json', data);
    },
    update_leaderboard: function(users){
        let leaderboard = {}
        let users_key = Object.keys(users)
        users_key.forEach(user => { //Build tier0
            leaderboard[users[user]["user_id"]] = {"tier0":users[user]["referrals"].length}
        });

        users_key.forEach(user => { //Build tier2
            leaderboard[users[user]["user_id"]]["tier1"] = 0
            users[user]["referrals"].forEach(referral => {
                if(leaderboard[referral]){
                    leaderboard[users[user]["user_id"]]["tier1"] += leaderboard[referral]["tier0"]
                }
            });
        });

        users_key.forEach(user => { //Build tier3
            leaderboard[users[user]["user_id"]]["tier2"] = 0
            users[user]["referrals"].forEach(referral => {
                if(leaderboard[referral]){
                    leaderboard[users[user]["user_id"]]["tier2"] += leaderboard[referral]["tier1"]
                }
            });
        });

        users_key.forEach(user => { //Build tier3
            leaderboard[users[user]["user_id"]]["overall"] = leaderboard[users[user]["user_id"]]["tier0"] + leaderboard[users[user]["user_id"]]["tier1"] +leaderboard[users[user]["user_id"]]["tier2"]
        });

        let data = JSON.stringify(leaderboard, null, 4);
        fs.writeFileSync('./src/ressources/db/referrals/leaderboard.json', data);
    },
    get_leaderboard: function(amount){
        let rawdata = fs.readFileSync('./src/ressources/db/referrals/leaderboard.json');
        let leaderboard = JSON.parse(rawdata);

        var items = Object.keys(leaderboard).map(
            (key) => { return [key, leaderboard[key]] });
        
        items.sort(
            (first, second) => { return second[1]["overall"] - first[1]["overall"] }
        );

        var leaderboard_sorted = items.map(
            (e) => { return e });

        return leaderboard_sorted.slice(0, amount)
    },
    get_rank: function(user_id){
        let rawdata = fs.readFileSync('./src/ressources/db/referrals/leaderboard.json');
        let leaderboard = JSON.parse(rawdata);

        return leaderboard[user_id]
    },
    create_event: function(args){
        let rawdata = fs.readFileSync('./src/ressources/db/events/events.json');
        let events = JSON.parse(rawdata);

        let id = Date.now()

        if(!Date.parse(args[4].value)){
            return {"error":1}
        }
        events[id] = {"title":args[0].value,"description":args[1].value,"nbr_winners":args[2].value,"points":args[3].value,"timestamp":Date.parse(args[4].value),"submission":args[5].value,"joined":[],"winners":[],"submissions":[]}

        data = JSON.stringify(events, null, 4);
        fs.writeFileSync('./src/ressources/db/events/events.json', data);
        return {"error":0,"data":events[id]}
    }
}