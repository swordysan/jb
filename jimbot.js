"use strict";
var Discord = require("discord.js");
var jimbot = new Discord.Client();
var ownerid ="99912330690707456";

var ConfigDetails = require("./config/config.json");
var Cooldown = require("./lib/cooldown.js");
const CONFIG_COOLDOWN = ConfigDetails.cooldownTime;

let jimin = require('./lists/jimin.json');
let jimblep = require('./lists/jimblep.json');
let jiminsta = require('./lists/jiminsta.json');

var commandcount = 0; //how many times function is executed used for !status



jimbot.on("message", function(message) {

	//Set the prefix
	let prefix = "!";
	//Exit and stop if it's not there
	if (!message.content.startsWith(prefix)) return;
	//how many times function is executed used for !status
	var jimmers = commandcount;

	if(message.content === "!jimin" && !Cooldown.checkCooldown(message)) {
		Cooldown.updateTimeStamp(message);
		jimbot.reply(message, jimin[Math.floor(Math.random() * (jimin.length))]);
		commandcount++;
	};

	if(message.content.startsWith(prefix + "jimblep") && !Cooldown.checkCooldown(message)) {
		Cooldown.updateTimeStamp(message);
		jimbot.reply(message, jimblep[Math.floor(Math.random() * (jimblep.length))]);
		commandcount++;
	};

	if(message.content.startsWith(prefix + "jiminsta") && !Cooldown.checkCooldown(message)) {
		Cooldown.updateTimeStamp(message);
		jimbot.reply(message, jiminsta[Math.floor(Math.random() * (jiminsta.length))]);
		commandcount++;
	};

	if(message.content.startsWith(prefix + "info")) {
        jimbot.sendMessage(message, "Made out of love for the prettiest girl in the world - in development. Remember to click the link for full res images. ");
		};

	if(message.content.startsWith(prefix + "commands")) {
        jimbot.sendMessage(message, "`!jimin` - Generates a random Jimin.\n\
`!jimblep` - Gives a random top madam blep.\n\
`!jiminsta` - Random JIMINSTAGRAM.\n\
\n\
`!info` - Basic bot info.\n\
`!status` - Uptime and status.\n\
`!roadmap` - Development roadmap.\n\
`!changelog` - Update history.\n\
");
		};

		if(message.content.startsWith(prefix + "roadmap")) {
        jimbot.sendMessage(message, "Features currently being worked on:\n\
		Performance and Fansign commands for more advanced filtering.\n\
		User based cooldown to prevent excessive spamming.\n\
		~~24 hour uptime when I can afford it.~~ - Complete\n\
		Larger image pool. - In Progress");
  	};

	if(message.content.startsWith(prefix + "uptime")){
		jimbot.sendMessage(message, "Online for **" + msToTime(jimbot.uptime) + "s** and delivered **" + jimmers + "** pretty jimmers. Current pool size 682 images in 28 albums.");
  };

	if(message.content.startsWith(prefix + "status")) {
		jimbot.sendMessage(message, "Online for **" + msToTime(jimbot.uptime) + "s** and delivered **" + jimmers + "** pretty jimmers. Current pool size 682 images in 28 albums.");
	};

	if(message.content.startsWith(prefix + "changelog")) {
		jimbot.sendMessage(message, "**160907** - added user based cooldown applying to all commands\n\
**160906** - added changelog and increased nr of !jiminsta from 28 to 99 images (videos will be added soon)");
	};

	//Testing Adming commands with ownerid
	if(message.author.id === ownerid){
		if(message.content.startsWith(prefix + "hello")) {
			jimbot.reply(message, "Hello pretty!");
		}
		if(message.content.startsWith(prefix + "shutdown")) {
			jimbot.sendMessage(message, "\n\
			`Goodbye my friends`\n\
			\n\http://puu.sh/r2sDl/9162b5bbab.jpg ");
			setTimeout( function () {
				process.exit(1);
			}, 2000);
		}
	};
});

//Uptime and status formatting
function msToTime(s) {

  function addZ(n) {
    return (n<10? '0':'') + n;
  }

  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60;

  return addZ(hrs) + ':' + addZ(mins) + ':' + addZ(secs);
}

//Ready?
jimbot.on("ready", function() {
    console.log("Bot Name : " + jimbot.user.username);
    console.log("Bot ID : " + jimbot.user.id);
		Cooldown.Setup(jimbot,CONFIG_COOLDOWN, jimbot.users);
});


jimbot.on('error', e => { console.error(e); });
jimbot.on('warn', e => { console.warn(e); });
jimbot.on('debug', e => { console.info(e); });


jimbot.loginWithToken("MjIxMDY0ODI1OTYxMTg1Mjgw.CqpaMg.n0jPeX_bgGSDFU9n_IgW2gy38pY");
