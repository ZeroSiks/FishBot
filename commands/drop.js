const Canvas = require('canvas'),
    Discord = require('discord.js');

exports.run = async (client, message) => {  // eslint-disable-line no-unused-vars
    const dropLocations = require('../util/droplocations.json');

    if (message.flags[0] && message.flags[0] === 'list') {
        const embed = new Discord.RichEmbed()
            .setColor(message && message.guild ? message.guild.me.displayHexColor : '#35c7e4')
            .setTitle('Drop Locations list')
            .setDescription(dropLocations.map(a => a.name));

        return message.channel.send(embed);
    } else if (message.flags[0] && message.flags[0] === 'reload' && message.author.id === client.config.ownerID) {
        delete require.cache[require.resolve('../util/dropLocations.json')];
        return message.reply('Reloaded Locations!');
    }

    const location = dropLocations[Math.floor(Math.random()*dropLocations.length)];

    const canvas = Canvas.createCanvas(750, 270);
    const ctx = canvas.getContext('2d');
    const image = await Canvas.loadImage(location.image);
    ctx.drawImage(image, 0, 0, 480, 270);
    const map = await Canvas.loadImage(location.mapImg);
    ctx.drawImage(map, 481, 0, 270, 270);

    // const attachment = new Discord.Attachment(location.image, 'img.jpg');
    const attachment = new Discord.Attachment(canvas.toBuffer(), 'img.jpg');

    const embed = new Discord.RichEmbed()
        .setColor(message && message.guild ? message.guild.me.displayHexColor : '#35c7e4')
        .setTitle(`FishBot suggests dropping to **${location.name}** [${location.coordinates}]`)
        .attachFile(attachment)
        .setImage('attachment://img.jpg');
    message.channel.send(embed);
};

exports.help = {
    name: 'drop',
    description: 'Suggests a random drop location',
    usage: 'drop'
};