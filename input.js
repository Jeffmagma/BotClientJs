let $ = require('jquery');
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

const input = $('#input');
const guild_div = $('#guilds');
const channel_div = $('#channels');
const message_div = $('#messages');

let currentGuild, currentChannel;
let guild_buttons, channel_buttons;

input.keyup(event => {
	if (event.keyCode === 13) {
		currentChannel.send(input.val());
		input.val('');
	}
});

function updateMessages() {
	if (currentChannel.type === "text") console.log(currentChannel.fetchMessages({limit: 100})); //message_div.append(currentChannel.fetchMessages({limit: 100}));
}

function updateGuilds() {
	guild_div.val('');
	guild_div.append('guilds:');
	/*let*/
	guild_buttons = [];
	channel_buttons = [];
	for (const [g_id, g] of client.guilds) {
		let current_button = $('<button id="' + g_id + '">' + g.name + '</button>');
		current_button.click(() => {
			currentGuild = g;
			channel_div.empty();
			channel_div.append('channels:');
			for (const [c_id, c] of currentGuild.channels) {
				let current_channel_button = $('<button id="' + c_id + '">' + c.name + '</button>');
				current_channel_button.click(() => {
					currentChannel = c;
					updateMessages()
				});
				channel_div.append('<br>').append(current_channel_button);
				channel_buttons.push(current_channel_button);
			}
		});
		guild_div.append('<br>').append(current_button);
		guild_buttons.push(current_button);
	}
}

client.on('message', msg => {
	//console.log(`${msg.guild.name}#${msg.channel.name} ${msg.author.name}: ${msg.content}\n`);
	message_div.append(`<br>${msg.guild.name}#${msg.channel.name} ${msg.author.name}: ${msg.content}`);
});

client.on('guildCreate', g => {
	updateGuilds();
});

client.on('guildDelete', g => {
	updateGuilds();
});

client.on('ready', () => {
	//client.user.setActivity("myself being hacked", {type: "WATCHING"});
	updateGuilds();
});

const token = fs.readFileSync('.auth', 'utf8');
client.login(token.toString());