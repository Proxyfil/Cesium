# Cesium

## 📅 Roadmap 📅

### 🗺️ Global 🗺️

- **📁 Database**
    - status : Done 🟩
    - Access : Bot dev for raw files, mods with commands on discord
    - observations : Nothing to add or modify for the moment, we will see if we need to reorganize or modify the system later
- **📡 Command /ping**
    - status : Done 🟩
    - Authorisations needed : slash command creation
    - Access : Everyone
    - observations : give you the ping of the bot, high ping could cause minors problems for handling commands
----

### 📝 Referral System 📝

- **▶️ Add on join**
    - status : Done 🟩
    - Authorisations needed : slash command creation
    - Access : Everyone
    - observations : Need tests to be sure but should work
- **📰 Command /referral_info**
    - status : Done 🟩
    - Authorisations needed : slash command creation
    - Access : Everyone
    - observations : Give informations about referrals programm
- **🥇 Command /referral_leaderboard**
    - status : Done 🟩
    - Authorisations needed : slash command creation
    - Access : Everyone
    - observations : Give top 20 of users in the referrals programm
- **➡️ Command referral_join [eth_address]**
    - status : Done 🟩
    - Authorisations needed : slash command creation
    - Access : Everyone
    - observations : Allow users to join the referral programm
- **📃 Command referral_status [user]**
    - status : Done 🟩
    - Authorisations needed : slash command creation
    - Access : Everyone
    - observations : Give the amount of referrals for one user

----

### 🎟️ Event System 🎟️

- **🆕 Command new_event [title] [description] [nbr_winners] [points] [timestamp] [submission]**
    - status : Done 🟩
    - Authorisations needed : slash command creation
    - Access : mods
    - observations : Create a new event
- **📋 Command event_submission [event_id]**
    - status : Done 🟩
    - Authorisations needed : slash command creation
    - Access : mods
    - observations : Send submissions for an event
- **📰 Command event_info**
    - status : Done 🟩
    - Authorisations needed : slash command creation
    - Access : Everyone
    - observations : Give you informations about events and give you the 20 newest events
- **➡️ Command event_join [event_id]**
    - status : Done 🟩
    - Authorisations needed : slash command creation
    - Access : Everyone
    - observations : Allow users to join an event
- **📮 Command event_submit [event_id] [link]**
    - status : Done 🟩
    - Authorisations needed : slash command creation
    - Access : Everyone
    - observations : Allow users to send link for events
- **🥇 Command event_leaderboard**
    - status : Done 🟩
    - Authorisations needed : slash command creation
    - Access : Everyone
    - observations : Give you the top 20 of users with points for events
- **📃 Command event_status [user]**
    - status : Done 🟩
    - Authorisations needed : slash command creation
    - Access : Everyone
    - observations : Give event points for a specific user
- **📃 Command event_end [event_id] [alert]**
    - status : Done 🟩
    - Authorisations needed : slash command creation
    - Access : Mods
    - observations : Allow you to end an event
- **📃 Command event_give [user] [amount]**
    - status : Done 🟩
    - Authorisations needed : slash command creation
    - Access : Mods
    - observations : Allow you to give points to someone
- **📃 Command event_remove [user] [amount]**
    - status : Done 🟩
    - Authorisations needed : slash command creation
    - Access : Mods
    - observations : Allow you to remove points to someone

## Perms

Mod perms will be given to users with their user ID, only bot administrator (atm Proxyfil) will be able to add peoples to that list. I will try to do it a better way later for sure ❤️

## Devlogs

- V1.0b | 16/04/2022

Bot is now ready for beta-test. Obviously we can upgrade design and mecanics for some features but bot is usable. Expect 1 week of tests with fixes and changes before achieving a V1.0 definitive.
Cesium will likely be hosted on my servers, I will do my best to allow 24/24h - 7/7 service but can't garantee that for the moment :/

- V1.2b | 19/04/2022

Some optimisation, aesthetical modifications, Deployement on stable hardware.

- V1.4b | 22/04/2022

Minor fixes, anti-cheat protocols.
Looking for data encryption and other security protocols to ensure bot safety, we talk about this later.