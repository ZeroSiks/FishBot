const fetch = require('node-fetch'),
    Canvas = require('canvas'),
    Discord = require('discord.js'),
    snekfetch = require('snekfetch');

exports.run = async (client, message) => { // eslint-disable-line no-unused-vars
    const link = 'https://fortnite-public-api.theapinetwork.com/prod09/upcoming/get';
    fetch(link).then(result => result.json()).then(async res => {
        const length = (Math.ceil(res.rows / 4) * 200);
        const canvas = Canvas.createCanvas(800, length);
        const ctx = canvas.getContext('2d');
        
        let num = 0;
        for (let i = 0; i < (Math.ceil(res.items.length / 4)); i++) {
            for (let j = 0; j < 4; j++) {
                if (num < res.items.length) {
                    const { body: buffer } = await snekfetch.get(res.items[num].item.images.information);
                    const avatar = await Canvas.loadImage(buffer);
                    ctx.drawImage(avatar, j * 200, i * 200, 200, 200);
                    num++;
                }
            }
        }
        const attachment = new Discord.Attachment(canvas.toBuffer(), 'upcoming.png');

        const sendEmbed = (channel) => {
            const embed = new Discord.RichEmbed()
                .setColor(message && message.guild ? message.guild.me.displayHexColor : '#ed4c5c')
                .setTitle('Upcoming Cosmetics')
                .attachFile(attachment)
                .setImage('attachment://upcoming.png');
            channel.send(embed);
        };

        // message.channel.send(`Shop data for **${res.date}**`, attachment);
        sendEmbed(message.channel);  
    }).catch(err => console.error(err));
};

exports.help = {
    name: 'upcoming',
    description: 'Sends an image of upcoming/leaked cosmetics',
    usage: 'upcoming'
};