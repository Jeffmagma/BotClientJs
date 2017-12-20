let $ = require('jquery');
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

const input = $('#input');
const div = $('#testdiv');

let currentGuild, currentChannel;

input.keyup(event => {
	if (event.keyCode === 13) {
		currentChannel.send(input.val());
		input.val('');
	}
});

function updateGuilds() {
	div.val('');
	div.append('guilds:');
	div.append(client.guilds.first().name);
	for (let g in client.guilds) {
		let k = div.append('<button id="' + g.id + '">' + g.name + '</button>');
		k.click(() => {
			currentGuild = g;
			for (let c in g.channels) {
				let j = div.append('<button id="' + c.id + '">' + c.name + '</button>');
				j.click(() => {
					currentChannel = c;
				});
			}
		});
	}
}

client.on('message', msg => {
	div.append('<p>' + msg.content + '</p>');
});

client.on('guildCreate', g => {
	alert(g.name);
	updateGuilds();
});

client.on('guildDelete', g => {
	alert(g.name);
	updateGuilds();
});

client.on('ready', () => {
	client.user.setActivity("EDEN", {type: "LISTENING"});
});

const token = fs.readFileSync('.auth', 'utf8');
client.login(token.toString());