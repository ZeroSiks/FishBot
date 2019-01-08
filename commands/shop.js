const fetch = require('node-fetch'),
    Canvas = require('canvas'),
    Discord = require('discord.js'),
    snekfetch = require('snekfetch'),
    moment = require('moment-timezone');

function daTe(d1) {
    const d2 = moment.unix(d1);
    const d3 = moment.tz(d2, 'Indian/Maldives').format('Do MMMM YYYY, h:mm a');
    return d3;
}

exports.run = async (client, message) => { // eslint-disable-line no-unused-vars
    const link = 'https://fortnite-public-api.theapinetwork.com/prod09/store/get';
    fetch(link).then(result => result.json()).then(async res => {
        const length = (Math.ceil(res.rows / 4) * 200);
        const canvas = Canvas.createCanvas(800, length);
        const ctx = canvas.getContext('2d');
        
        let num = 0;
        for (var i = 0; i < (Math.ceil(res.items.length / 4)); i++) {
            for (var j = 0; j < 4; j++) {
                if (num < res.items.length) {
                    const { body: buffer } = await snekfetch.get(res.items[num].item.images.information);
                    const avatar = await Canvas.loadImage(buffer);
                    ctx.drawImage(avatar, j * 200, i * 200, 200, 200);
                    num++;
                }
            }
        }
        const attachment = new Discord.Attachment(canvas.toBuffer(), 'shop.png');

        const sendEmbed = (channel) => {
            const embed = new Discord.RichEmbed()
                .setColor(message && message.guild ? message.guild.me.displayHexColor : '#ed4c5c')
                .setTitle(`Shop data for **${res.date}**`)
                .attachFile(attachment)
                .setImage('attachment://shop.png')
                .setFooter(`Last update at: ${daTe(res.lastupdate)}`);
            channel.send(embed);
        };

        if (message) {
            // message.channel.send(`Shop data for **${res.date}**`, attachment);
            sendEmbed(message.channel);
        } else {
            client.config.auto_channels.forEach(function(chan) {
                const notify_channel = client.channels.find(x => x.id === chan);
                sendEmbed(notify_channel);
            });
            // notify_channel.send(`Shop data for **${res.date}**`, attachment);
        }
        
    }).catch(err => console.error(err));
};