const fetch = require('node-fetch');
const Discord = require('discord.js');
const moment = require('moment-timezone');

function daTe(d1) {
    const d2 = moment.unix(d1);
    const d3 = moment.tz(d2, 'Indian/Maldives').format('Do MMMM YYYY, h:mm A');
    return d3;
}
exports.run = async (client, message) => { // eslint-disable-line no-unused-vars
    const link = 'https://fortnite-public-api.theapinetwork.com/prod09/br_motd/get';
    fetch(link).then(result => result.json()).then(async res => {
        
        const sendEmbed = (i, channel) => {
            const embed = new Discord.RichEmbed()
                .setColor(message && message.guild ? message.guild.me.displayHexColor : '#35c7e4')
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
            const oldNewsDate = client.autoCheck.get('news_latest');
            if (!oldNewsDate) {
                console.log('News time set! ' + res.entries[0].time);
                client.autoCheck.set('news_latest', res.entries[0].time);
                return;
            }
            if (oldNewsDate === res.entries[0].time) return;
            if (parseInt(oldNewsDate, 10) > parseInt(res.entries[0].time, 10)) return;
            client.config.auto_channels.forEach(function(chan) {
                const notify_channel = client.channels.find(x => x.id === chan);
                sendEmbed(0, notify_channel);
            });
            // sendEmbed(0, (client.channels.find(x => x.id === client.config.auto_channel_id)));
            client.autoCheck.set('news_latest', res.entries[0].time);
            console.log('New latest news time set! ' + res.entries[0].time);
        }
    }).catch(err => console.error(err));
};

exports.help = {
    name: 'news',
    description: 'Sends latest Fortnite ingame news',
    usage: 'news'
};