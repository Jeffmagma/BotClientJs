let $ = require('jquery');
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

const input = $('#input');
const div = $('#testdiv');

input.keyup(event => {
	if (event.keyCode === 13) {
		client.guilds.first().defaultChannel.send(input.val());
		input.val('');
	}
});

function updateGuilds() {
	div.val('');
	div.append('guilds:');
	div.append(client.guilds.first().name);
	for (let c in client.guilds) {
		div.append('<button id="' + c.id + '">' + c.name + '</button>')
	}
}

client.on('message', msg => {
	div.append('<p>' + msg.content + '</p>')
});

client.on('guildCreate', async g => {
	alert(g.name);
});

client.on('guildDelete', async g => {
	alert(g.name);
});

const token = fs.readFileSync('.auth', 'utf8');
client.login(token);