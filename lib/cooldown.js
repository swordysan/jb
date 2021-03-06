var jimbot;
var COOLDOWN_TIME;
var Users = {};

function Setup(jimbotObject, cooldownSeconds, serverUsers){
	//Initialize Array of Users and set timestamps to 0
	for (var i in serverUsers) {
		if (serverUsers[i] != undefined) {
			Users[serverUsers[i].id]= {
				"lastTimeStamp" : "0",
				"lastNotification" : "0"
			};
		}
	}
	COOLDOWN_TIME = cooldownSeconds;
	jimbot=jimbotObject;
}

//Updates a user's last command use time
function updateTimeStamp(message) {
	Users[message.author.id]["lastTimeStamp"] = message.timestamp;
}

//Takes a message object from discord.js and returns true if user is on cooldown
function checkCooldown(message) {
	var timeStamp = message.timestamp;
	var usr = message.author.id;

	//If there's no timestamp assume he can do it
	if (Users[usr]["lastTimeStamp"] <= 0 || Users[usr]["lastTimeStamp"] == undefined) {
		updateTimeStamp(message);
		return false;
	}

	//If TimeStamp difference is less than the configuration
	if ((timeStamp - Users[usr]["lastTimeStamp"]) <= (COOLDOWN_TIME*1000)) {
		//Too Soon!
		sendReminder(message);
		return true;
	}

	//If TimeStamp difference is less than the configuration
	if ((timeStamp - Users[usr]["lastTimeStamp"]) >= (COOLDOWN_TIME*1000)) {
		//We've waited
		return false;
	}

	//If we somehow miss all of it
	return false;

}

function sendReminder(message) {

	//If no last reminder
	if (Users[message.author.id]["lastNotification"] <=0) {
		Users[message.author.id]["lastNotification"] = message.timestamp;
		message.channel.sendMessage(message.author + " Only one jimbo per " + COOLDOWN_TIME + " seconds!!");
	}

	if ((message.timestamp - Users[message.author.id]["lastNotification"]) >= (COOLDOWN_TIME*1000)){
		Users[message.author.id]["lastNotification"] = message.timestamp;
		message.channel.sendMessage(message.author + " Only one jimbo per " + COOLDOWN_TIME + " seconds!!");
	}
}
module.exports = {checkCooldown, Setup, updateTimeStamp};
