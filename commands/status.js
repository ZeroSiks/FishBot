const fetch = require('node-fetch'),
    Discord = require('discord.js');

exports.run = async (client, message) => { // eslint-disable-line no-unused-vars
    const link = 'https://fortnite-public-api.theapinetwork.com/prod09/status/fortnite_server_status';
    fetch(link).then(result => result.json()).then(async res => {
        let msg;
        if (res.status === 'UP') {
            msg = '(UP) Servers are up vahtharu';
        } else {
            msg = `(${res.status}) ${res.message}`;
        }
        const embed = new Discord.RichEmbed()
            .setColor(message && message.guild ? message.guild.me.displayHexColor : '#ed4c5c')
            .setTitle(msg)
            .setFooter(`Uptime: ${res.time.duration.formated}`);
        message.channel.send(embed);
    }).catch(err => console.error(err));
};

exports.help = {
    name: 'status',
    description: 'Check the Fortnite server status',
    usage: 'status'
};