const Discord = require('discord.js');

exports.run = (client, message) => { // eslint-disable-line no-unused-vars
    message.channel.send('This is a temporary help command. Will be updated later.');
    const embed = new Discord.RichEmbed()
        .setColor(message.guild.me.displayHexColor ? message.guild.me.displayHexColor : '#ed4c5c')
        .setTitle('FishBot Help Command')
        .addField('Fortnite', 'Displays a player\'s overall fortnite stats.\nUsage: b!fn <platform> <username>')
        .addField('Solo', 'Displays a player\'s solo fortnite stats.\nUsage: b!solo <platform> <username>')
        .addField('Duo', 'Displays a player\'s duo fortnite stats.\nUsage: b!duo <platform> <username>')
        .addField('Squad', 'Displays a player\'s squad fortnite stats.\nUsage: b!squad <platform> <username>')
        .addField('Link', 'Links your discord ID to your fortnite account for easier access\nUsage: b!link <platform> <username>')
        .addField('Unlink', 'Unlinks your discord account and fortnite account\nUsage: b!unlink')
        .addField('Ping', 'Pings the bot.\nUsage: b!ping');

    message.channel.send(embed);
};