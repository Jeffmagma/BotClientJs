let $ = require('jquery');
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

const input = $('#input');
const guild_div = $('#guilds');
const channel_div = $('#channels');
const message_div = $('#messages');

let currentGuild, currentChannel;

input.keyup(event => {
	if (event.keyCode === 13) {
		currentChannel.send(input.val());
		input.val('');
	}
});

function updateGuilds() {
	guild_div.val('');
	guild_div.append('guilds:');
	let guild_buttons = [], channel_buttons = [];
	for (const [g_id, g] of client.guilds) {
		guild_buttons.push(guild_div.append('<button id="' + g.id + '">' + g.name + '</button>'));
		guild_buttons[guild_buttons.length - 1].click(() => {
			currentGuild = g;
			channel_div.val('');
			channel_div.append('channels:');
			for (const [c_id, c] of g.channels) {
				channel_buttons.push(channel_div.append('<button id="' + c.id + '">' + c.name + '</button>'));
				channel_buttons[channel_buttons.length - 1].click(() => {
					currentChannel = c;
				});
			}
		});
	}
}

client.on('message', msg => {
	message_div.append('<br>' + msg.content);
});

client.on('guildCreate', g => {
	updateGuilds();
});

client.on('guildDelete', g => {
	updateGuilds();
});

client.on('ready', () => {
	client.user.setActivity("EDEN", {type: "LISTENING"});
	updateGuilds();
});

const token = fs.readFileSync('.auth', 'utf8');
client.login(token.toString());