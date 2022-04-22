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
        let rawdata = fs.readFileSync('./src/ressources/db/referrals/users.json'); // Store users in referral programm
        let new_user = JSON.parse(rawdata);

        rawdata = fs.readFileSync('./src/ressources/db/referrals/registered.json'); // Store every users that have already join with a link
        let registered = JSON.parse(rawdata);

        rawdata = fs.readFileSync('./src/ressources/db/referrals/invites.json');
        let new_invite = JSON.parse(rawdata);
        if(!new_user[new_invite[code]["eth_address"]]["referrals"].includes(member) && !registered.includes(member)){
            new_user[new_invite[code]["eth_address"]]["referrals"].push(member)
            registered.push(member)

            let data = JSON.stringify(new_user, null, 4);
            fs.writeFileSync('./src/ressources/db/referrals/users.json', data);

            data = JSON.stringify(registered, null, 4);
            fs.writeFileSync('./src/ressources/db/referrals/registered.json', data);

            new_invite[code]["uses"] += amount

            data = JSON.stringify(new_invite, null, 4);
            fs.writeFileSync('./src/ressources/db/referrals/invites.json', data);
            return {"error":0}
        }
        else{
            return {"error":1}
        }
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

        users_key.forEach(user => { //Build overall
            leaderboard[users[user]["user_id"]]["overall"] = leaderboard[users[user]["user_id"]]["tier0"] + leaderboard[users[user]["user_id"]]["tier1"] +leaderboard[users[user]["user_id"]]["tier2"]
        });

        let data = JSON.stringify(leaderboard, null, 4);
        fs.writeFileSync('./src/ressources/db/referrals/leaderboard.json', data);
    },
    get_leaderboard: function(amount){
        let rawdata = fs.readFileSync('./src/ressources/db/referrals/leaderboard.json');
        let leaderboard = JSON.parse(rawdata);

        var items = Object.keys(leaderboard).map( // Build list to sort users
            (key) => { return [key, leaderboard[key]] });
        
        items.sort( // Sort list
            (first, second) => { return second[1]["overall"] - first[1]["overall"] }
        );

        var leaderboard_sorted = items.map( // Build dictionnary sorted
            (e) => { return e });

        return leaderboard_sorted.slice(0, amount) // Send top {amount} users
    },
    get_rank: function(user_id){
        let rawdata = fs.readFileSync('./src/ressources/db/referrals/leaderboard.json');
        let leaderboard = JSON.parse(rawdata);

        if(!Object.keys(leaderboard).includes(user_id)){
            return {"tier0": 0,"tier1": 0,"tier2": 0,"overall": 0}
        }

        return leaderboard[user_id] // Return leaderboard of user
    },
    create_event: function(args){
        let rawdata = fs.readFileSync('./src/ressources/db/events/events.json');
        let events = JSON.parse(rawdata);

        let id = Date.now().toString() // Create id with 5 "random" numbers
        id = id.slice(id.length-5,id.length)

        if(!Date.parse(args[4].value)){
            return {"error":1}
        }
        else if(Date.parse(args[4].value) < Date.now()){
            return {"error":2}
        }
        events[id] = {"title":args[0].value,"description":args[1].value,"nbr_winners":args[2].value,"points":args[3].value,"timestamp":Date.parse(args[4].value),"submission":args[5].value,"joined":[],"submissions":{},"id":id}

        data = JSON.stringify(events, null, 4);
        fs.writeFileSync('./src/ressources/db/events/events.json', data);
        return {"error":0,"data":events[id]}
    },
    join_event: function(user_id,event_id){
        let rawdata = fs.readFileSync('./src/ressources/db/events/events.json'); // Open events file
        let events = JSON.parse(rawdata);

        if(!Object.keys(events).includes(event_id)){
            return {"error":1} // No event with this id
        }
        else if(events[event_id]["joined"].includes(user_id)){
            return {"error":2} // User has already join
        }
        else{
            events[event_id]["joined"].push(user_id) // Add user 
        }

        data = JSON.stringify(events, null, 4); // Rewrite file
        fs.writeFileSync('./src/ressources/db/events/events.json', data);
        return {"error":0,"data":events[event_id]}
    },
    submit: function(user_id,args){
        let rawdata = fs.readFileSync('./src/ressources/db/events/events.json'); // Open events file
        let events = JSON.parse(rawdata);
        let event_id = args[0].value.toString()

        if(!Object.keys(events).includes(event_id)){
            return {"error":1} // No event with this id
        }
        else if(Object.keys(events[event_id]["submissions"]).includes(user_id)){
            return {"error":2} // User has already submit
        }
        else if(!events[event_id]["joined"].includes(user_id)){
            return {"error":3} // User as not joined
        }
        else if(events[event_id]["timestamp"] < Date.now()){
            return {"error":4} // Too late
        }
        else if(events[event_id]["submission"] == false){
            return {"error":5} // Doesn't allow submissions
        }
        else{
            events[event_id]["submissions"][user_id] = []
            args = Array.from(args)
            args = args.splice(1,50)
            args.forEach(element => {
                events[event_id]["submissions"][user_id].push(element.value)           
            });
        }

        data = JSON.stringify(events, null, 4); // Rewrite file
        fs.writeFileSync('./src/ressources/db/events/events.json', data);
        return {"error":0,"data":events[event_id]}
    },
    get_event: function(event_id){
        let rawdata = fs.readFileSync('./src/ressources/db/events/events.json'); // Open events file
        let events = JSON.parse(rawdata);

        if(!Object.keys(events).includes(event_id)){
            return {"error":1} // No event with this id
        }

        return {"error":0,"data":events[event_id]}
    },
    get_events: function(amount){
        let rawdata = fs.readFileSync('./src/ressources/db/events/events.json'); // Open events file
        let events = JSON.parse(rawdata);

        return {"error":0,"data":Object.values(events).splice(0,amount)}
    },
    give: function(args){
        let rawdata = fs.readFileSync('./src/ressources/db/events/users.json'); // Open events file
        let users = JSON.parse(rawdata);

        if(Object.keys(users).includes(args[0].value)){
            users[args[0].value] += args[1].value
        }
        else{
            users[args[0].value] = args[1].value
        }

        data = JSON.stringify(users, null, 4); // Rewrite file
        fs.writeFileSync('./src/ressources/db/events/users.json', data);
        return {"error":0,"data":users[args[0].value]}
    },
    remove: function(args){
        let rawdata = fs.readFileSync('./src/ressources/db/events/users.json'); // Open events file
        let users = JSON.parse(rawdata);

        if(Object.keys(users).includes(args[0].value)){
            users[args[0].value] -= args[1].value
        }
        else{
            users[args[0].value] = 0
        }

        data = JSON.stringify(users, null, 4); // Rewrite file
        fs.writeFileSync('./src/ressources/db/events/users.json', data);
        return {"error":0,"data":users[args[0].value]}
    },
    end: function(args){
        let rawdata = fs.readFileSync('./src/ressources/db/events/events.json'); // Open events file
        let events = JSON.parse(rawdata);
        let rawdata2 = fs.readFileSync('./src/ressources/db/events/users.json'); // Open events file
        let users = JSON.parse(rawdata2);

        if(!Object.keys(events).includes(args[0].value.toString())){
            return {"error":1} // No event with this id
        }

        events[args[0].value]["joined"].forEach(user_id => {
            if(Object.keys(users).includes(user_id)){
                users[user_id] += events[args[0].value.toString()]["points"]
            }
            else{
                users[user_id] = events[args[0].value.toString()]["points"]
            }
        });

        deleted_event = events[args[0].value.toString()]
        delete events[args[0].value.toString()]

        data = JSON.stringify(users, null, 4); // Rewrite file
        fs.writeFileSync('./src/ressources/db/events/users.json', data);
        data = JSON.stringify(events, null, 4); // Rewrite file
        fs.writeFileSync('./src/ressources/db/events/events.json', data);
        return {"error":0,"data":deleted_event}
    },
    e_status: function(user_id){
        let rawdata = fs.readFileSync('./src/ressources/db/events/users.json'); // Open events file
        let users = JSON.parse(rawdata);

        if(!Object.keys(users).includes(user_id)){
            return {"error":0,"data":0}
        }
        else{
            return {"error":0,"data":users[user_id]}
        }
    },
    get_leaderboard_e: function(amount){
        let rawdata = fs.readFileSync('./src/ressources/db/events/users.json');
        let leaderboard = JSON.parse(rawdata);

        var items = Object.keys(leaderboard).map( // Build list to sort users
            (key) => { return [key, leaderboard[key]] });
        
        items.sort( // Sort list
            (first, second) => { return second[1] - first[1] }
        );

        var leaderboard_sorted = items.map( // Build dictionnary sorted
            (e) => { return e });

        return leaderboard_sorted.slice(0, amount) // Send top {amount} users
    }
}