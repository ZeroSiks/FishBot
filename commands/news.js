const fetch = require('node-fetch');
const Discord = require('discord.js');
const moment = require('moment-timezone');

function daTe(d1) {
    const d2 = moment.unix(d1);
    const d3 = moment.tz(d2, 'Indian/Maldives').format('Do MMMM YYYY, h:mm a');
    return d3;
}
exports.run = async (client, message) => { // eslint-disable-line no-unused-vars
    const link = 'https://fortnite-public-api.theapinetwork.com/prod09/br_motd/get';
    fetch(link).then(result => result.json()).then(async res => {
        
        const sendEmbed = (i, channel) => {
            const embed = new Discord.RichEmbed()
                .setColor(message && message.guild ? message.guild.me.displayHexColor : '#ed4c5c')
                .setTitle(res.entries[i].title)
                .setDescription(res.entries[i].body)
                .setImage(res.entries[i].image)
                .setFooter(daTe(res.entries[i].time));
            channel.send(embed);
        };
        if (message) {
            sendEmbed(0, message.channel);
            sendEmbed(1, message.channel);
            sendEmbed(2, message.channel);
        } else {
            const oldNewsDate = client.newsCheck.get('time_latest');
            if (!oldNewsDate) {
                console.log('New latest time set! ' + res.entries[0].time);
                client.newsCheck.set('time_latest', res.entries[0].time);
                return;
            }
            if (oldNewsDate === res.entries[0].time) return;
            sendEmbed(0, (client.channels.find(x => x.id === '524148033877704714')));
            client.newsCheck.set('time_latest', res.entries[0].time);
        }
    }).catch(err => console.error(err));
};