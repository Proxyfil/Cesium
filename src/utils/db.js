const fs = require('fs');

module.exports = {
    get_users: function(){
        let rawdata = fs.readFileSync('./src/ressources/db/users.json');
        let users = JSON.parse(rawdata);

        return Object.keys(users)
    },
    get_user: function(eth_address){
        let rawdata = fs.readFileSync('./src/ressources/db/users.json');
        let users = JSON.parse(rawdata);

        return users[eth_address]
    },
    get_invites: function(){
        let rawdata = fs.readFileSync('./src/ressources/db/invites.json');
        let invites = JSON.parse(rawdata);

        return invites
    },
    write_user: function(interaction,eth_address,code){
        let rawdata = fs.readFileSync('./src/ressources/db/users.json');
        let new_user = JSON.parse(rawdata);
        new_user[eth_address] = {"username":interaction.user.username,"user_id":interaction.user.id,"eth_address":eth_address,"referrals":[],"invite":code}

        let data = JSON.stringify(new_user, null, 4);
        fs.writeFileSync('./src/ressources/db/users.json', data);
    },
    write_invite: function(eth_address,code){
        let rawdata = fs.readFileSync('./src/ressources/db/invites.json');
        let new_invite = JSON.parse(rawdata);
        new_invite[code] = {"eth_address":eth_address,"uses":0}

        let data = JSON.stringify(new_invite, null, 4);
        fs.writeFileSync('./src/ressources/db/invites.json', data);
    },
    add_use: function(code,amount){
        let rawdata = fs.readFileSync('./src/ressources/db/invites.json');
        let new_invite = JSON.parse(rawdata);
        new_invite[code]["uses"] += amount

        let data = JSON.stringify(new_invite, null, 4);
        fs.writeFileSync('./src/ressources/db/invites.json', data);
    }
}