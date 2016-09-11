"use strict";
var Discord = require("discord.js");
var jimbot = new Discord.Client();
var ownerid = "99912330690707456";

// Authentication details
var AuthDetails = require("./auth.json");

var ConfigDetails = require("./config/config.json");
var Cooldown = require("./lib/cooldown.js");
const CONFIG_COOLDOWN = ConfigDetails.cooldownTime;

// Image pools
let jimin = require('./lists/jimin.json');
let jimblep = require('./lists/jimblep.json');
let jiminsta = require('./lists/jiminsta.json');

var commandcount = 0; //how many times function is executed used for !status


jimbot.on("message", message => {

	// Set the prefix
	let prefix = "!";
	// Exit and stop if it's not there
	if (!message.content.startsWith(prefix)) return;
	// Exit if it's a bot
	if (message.author.bot) return;
	// How many times function is executed used for !status
	var jimmers = commandcount;

	if(message.content === "!jimin"/* && !Cooldown.checkCooldown(message)*/) {
		//Cooldown.updateTimeStamp(message);
		message.reply(jimin[Math.floor(Math.random() * (jimin.length))]);
		commandcount++;
	};

	if(message.content.startsWith(prefix + "jimblep")/* && !Cooldown.checkCooldown(message)*/) {
		//Cooldown.updateTimeStamp(message);
		message.reply(jimblep[Math.floor(Math.random() * (jimblep.length))]);
		commandcount++;
	};

	if(message.content.startsWith(prefix + "jiminsta")/* && !Cooldown.checkCooldown(message)*/) {
		//Cooldown.updateTimeStamp(message);
		message.reply(jiminsta[Math.floor(Math.random() * (jiminsta.length))]);
		commandcount++;
	};

	if(message.content.startsWith(prefix + "info")) {
        message.channel.sendMessage("Made out of love for the prettiest girl in the world - in development. Remember to click the link for full res images. ");
		};

	if(message.content.startsWith(prefix + "commands")) {
        message.channel.sendMessage("`!jimin` - Generates a random Jimin.\n\
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
        message.channel.sendMessage("Features currently being worked on:\n\
		Command to view newest uploads from a pool which incrementally exhausts.\n\
		Performance, Fansign and other commands for more advanced filtering.\n\
		Larger image pool. - In Progress\n\
		~~User based cooldown to prevent excessive spamming.~~ - Complete, will be improved upon\n\
		~~24 hour uptime when I can afford it.~~ - Complete");
  	};

	if(message.content.startsWith(prefix + "uptime")){
		message.channel.sendMessage("Online for **" + msToTime(jimbot.uptime) + "s** and delivered **" + jimmers + "** pretty jimmers. Current pool size 843 images in 40 albums.");
  };

	if(message.content.startsWith(prefix + "status")) {
		message.channel.sendMessage("Online for **" + msToTime(jimbot.uptime) + "s** and delivered **" + jimmers + "** pretty jimmers. Current pool size 843 images in 40 albums.");
	};

	if(message.content.startsWith(prefix + "changelog")) {
		message.channel.sendMessage("**Features**\n\
\n\
`160911 (latest)` - new pool formatting so you won't get empty (date only) replies anymore\n\
`160909` - updated code to discord.js version 9, broke cooldowns\n\
`160907` - added user based cooldown applying to all commands\n\
`160906` - added changelog\n\
\n\
**Image pool**\n\
\n\
`160910` - main from 736 to 843 added some 2014/15 and newer stuff\n\
`160907` - increased main pool from 682 to 736 images\n\
`160906` - increased nr of !jiminsta from 28 to 99 images (videos will be added soon)");
	};

	// Testing Admin commands with ownerid
	if(message.author.id === ownerid){
		if(message.content.startsWith(prefix + "hello")) {
			message.channel.sendTTSMessage(message.author + " " + "Hello pretty!");
		}
		if(message.content.startsWith(prefix + "shutdown")) {
			message.channel.sendMessage("\n\
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
jimbot.on("ready", () => {
		console.log(jimbot.user.username + " (ID:" + jimbot.user.id + ") ready on " + jimbot.guilds.size + " servers.")
    Cooldown.Setup(jimbot,CONFIG_COOLDOWN, jimbot.users);
		jimbot.user.setStatus('online', 'Like a Cat');
});



jimbot.on('error', e => { console.error(e); });
jimbot.on('warn', e => { console.warn(e); });
jimbot.on('debug', e => { console.info(e); });


//Bot log in
jimbot.login(AuthDetails.token);
