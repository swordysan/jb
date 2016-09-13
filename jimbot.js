const Discord = require("discord.js");
var jimbot = new Discord.Client({
	fetch_all_members: true
});
var JsonDB = require('node-json-db');

// Authentication details
var AuthDetails = require("./auth.json");
var ownerid = "99912330690707456";

// Config
var ConfigDetails = require("./config/config.json");
var Cooldown = require("./lib/cooldown.js");
const CONFIG_COOLDOWN = ConfigDetails.cooldownTime;

// Image pools
let jimin = require('./lists/jimin.json');
let jimblep = require('./lists/jimblep.json');
let jiminsta = require('./lists/jiminsta.json');
var favdb = new JsonDB("favourites", true, true);
var favs = new Array();
var histdb = new JsonDB("history", true, true);
var hist = new Array();

// How many times function is executed used for !status
var commandcount = 0;


jimbot.on("message", message => {

	// Set the prefix
	let prefix = "!";
	// Exit and stop if it's not there
	if (!message.content.startsWith(prefix)) return;
	// Exit if it's a bot
	if (message.author.bot) return;
	// Rename
	var jimmers = commandcount;

	if(message.content === "!jimin" /*&& !Cooldown.checkCooldown(message)*/) {
		//Cooldown.updateTimeStamp(message);
		var jim = jimin[Math.floor(Math.random() * (jimin.length))]
		message.reply(jim);
		let args = jim.split(" ").slice(0);
		let temp = args.slice(0).join(" ");
		try{
			hist = histdb.getData("/" + jimbot.user.id, hist);
			hist.push(temp);
			histdb.push("/" + jimbot.user.id, hist);
		}
		catch(error){
			var temphist = new Array();

			temphist.push(temp);
			histdb.push("/" + jimbot.user.id, temphist);
		}
		commandcount++;

	};

	if(message.content.startsWith(prefix + "jimblep")/* && !Cooldown.checkCooldown(message)*/) {
		//Cooldown.updateTimeStamp(message);
		var blep = jimblep[Math.floor(Math.random() * (jimblep.length))]
		message.reply(blep);
		let args = blep.split(" ").slice(0);
		let temp = args.slice(0).join(" ");
		try{
			hist = histdb.getData("/" + jimbot.user.id, hist);
			hist.push(temp);
			histdb.push("/" + jimbot.user.id, hist);
		}
		catch(error){
			var temphist = new Array();

			temphist.push(temp);
			histdb.push("/" + jimbot.user.id, temphist);
		}
		commandcount++;
	};

	if(message.content.startsWith(prefix + "jiminsta")/* && !Cooldown.checkCooldown(message)*/) {
		//Cooldown.updateTimeStamp(message);
		var insta = jiminsta[Math.floor(Math.random() * (jiminsta.length))]
		message.reply(insta);
		let args = insta.split(" ").slice(0);
		let temp = args.slice(0).join(" ");
		try{
			hist = histdb.getData("/" + jimbot.user.id, hist);
			hist.push(temp);
			histdb.push("/" + jimbot.user.id, hist);
		}
		catch(error){
			var temphist = new Array();

			temphist.push(temp);
			histdb.push("/" + jimbot.user.id, temphist);
		}
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
`!love` - Adds the latest submitted Jimin to your favourites.\n\
`!jimfav [number]` - Pulls the selected favourite from your list. e.g. !jimfav 0 \n\
`!randfav` - Same as the above but with a random favourite. Note that if you don't have many Jimins added it won't be very random.\n\
\n\
`!info` - Basic bot info.\n\
`!status` - Uptime and status.\n\
`!roadmap` - Development roadmap.\n\
`!changelog` - Update history.\n\
\n\
This message auto-deletes in 30 seconds. \n\
").then(message => message.delete([30000]));
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
		message.channel.sendMessage("Online for **" + msToTime(jimbot.uptime) + "s** and delivered **" + jimmers + "** pretty Jimmers. Current pool size 843 images in 40 albums.");
  };

	if(message.content.startsWith(prefix + "status")) {
		message.channel.sendMessage("Online for **" + msToTime(jimbot.uptime) + "s** and delivered **" + jimmers + "** pretty Jimmers. Current pool size 843 images in 40 albums.");
	};

	if(message.content.startsWith(prefix + "changelog")) {
		message.channel.sendMessage("**Features**\n\
\n\
`160913 (latest)` - added user favourites, check !commands for how to use \n\
`160911` - new pool formatting so you won't get empty (date only) replies anymore\n\
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


	// Fvourites (change command names to be more Jimin fitting)
	// Adds the last published Jimin by the bot to your favourite list.
	if(message.content.startsWith(prefix + "love")){
		hist = histdb.getData("/" + jimbot.user.id, hist);
		temp = hist[hist.length - 1]; // Selects the last jimin bot post.
		console.log("Saved this Jimin for " + message.author.username + ": " + temp);

		try{
			favs = favdb.getData("/" + message.author.id, favs);
			favs.push(temp);
			favdb.push("/" + message.author.id, favs);
		}
		catch(error){
			var tempfavs = new Array();

			tempfavs.push(temp);
			favdb.push("/" + message.author.id, tempfavs);
		}
		message.reply("Added this Jimin to your favourites. Use `!jimfav [number]` (starts at 0), or `!randfav` to check them out.");
	};

	// Using a number e.g. !jimfav [5] you can specify the bot to return your favourite Jimin at that position.
	if(message.content.startsWith(prefix + "jimfav")){
			temp = message.content.split(" ")[1];
			if(isNaN(temp) === true){
				message.reply("Use a number to select a favourite from your list.");
				return;
			}

			favs = favdb.getData("/" + message.author.id, favs);
			console.log("Length of Favourites Array ; " + favs.length);

			if((temp >= favs.length)||(temp < 0)){
				message.reply("You haven't reached that number of favourites yet. Add more Jimins to your pool!");
				return;
			}
			console.log("Favourite is " + favs[temp])
			message.reply(" one of your favourite Jimins is: " + [favs[temp]]);
			commandcount++;
		}

	// Alternatively you can just request a random favourite from your pool.
	if(message.content === prefix + "randfav"){
		try{
			favs = favdb.getData("/" + message.author.id, favs);
			console.log("Length of Favourites Array ; " + favs.length);
			var rand = Math.floor(Math.random()*favs.length);
			console.log("Favourite is " + favs[rand])
			message.reply(" one of your favourite Jimins is: " + [favs[rand]]);
			commandcount++;
		}
		catch(error){
			console.log("Error : " + error)
			message.reply("You haven't added any Jimbos to your favourites yet, why not try `" + prefix + "favourite`. next time you see one you like");
		}
	};



	// Testing Admin commands with ownerid
	if(message.author.id === ownerid){

		if(message.content.startsWith(prefix + "hello")) {
			message.channel.sendTTSMessage(message.author + " " + "Hello pretty!");
		};

		// Sets the status to whatever you want
		if(message.content.startsWith(prefix + "setstatus")) {
			let args = message.content.split(" ").slice(1);
			let status = args.slice(0).join(" ");
			jimbot.user.setStatus('online', `${status}`);
		};

		// Can only do this twice a day due to discord CD! Use with care
		if(message.content.startsWith(prefix + "setname")) {
			let args = message.content.split(" ").slice(1);
			let name = args.slice(0).join(" ");
			jimbot.user.setUsername(`${name}`);
		};

		// Shuts down the bot after 2 seconds
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

// Ready?
jimbot.on("ready", () => {
		console.log(jimbot.user.username + " (ID:" + jimbot.user.id + ") ready on " + jimbot.guilds.size + " servers.");
    Cooldown.Setup(jimbot, CONFIG_COOLDOWN, jimbot.users);
});



jimbot.on('error', e => { console.error(e); });
jimbot.on('warn', e => { console.warn(e); });
jimbot.on('debug', e => { console.info(e); });


// Bot log in
jimbot.login(AuthDetails.token);
