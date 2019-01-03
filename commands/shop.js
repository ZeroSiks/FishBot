const fetch = require('node-fetch');
const Canvas = require('canvas');
const Discord = require('discord.js');
const snekfetch = require('snekfetch');

exports.run = async (client, message) => { // eslint-disable-line no-unused-vars
    const link = 'https://fortnite-public-api.theapinetwork.com/prod09/store/get';
    fetch(link).then(result => result.json()).then(async res => {
        const canvas = Canvas.createCanvas(800, 600);
        const ctx = canvas.getContext('2d');
        
        let num = 0;
        for (var i = 0; i < (Math.round(res.items.length / 4)); i++) {
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
        if (message) {
            message.channel.send(`Shop data for **${res.date}**`, attachment);
        } else {
            const notify_channel = client.channels.find(x => x.id === '524148033877704714');
            notify_channel.send(`Shop data for **${res.date}**`, attachment);
        }
        
    }).catch(err => console.error(err));
};