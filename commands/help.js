const Discord = require('discord.js');

exports.run = (client, message, args) => { // eslint-disable-line no-unused-vars
    if (!args[0]) {
        const commandNames = Array.from(client.commands.keys());
        const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

        const embed = new Discord.RichEmbed()
            .setColor(message && message.guild ? message.guild.me.displayHexColor : '#35c7e4')
            .setTitle('Command List')
            .setDescription(`Commands with <> means argument is required, () means argument is optional.\n\n${client.commands.map(c => `\`${client.config.prefix}${c.help.name}\`${' '.repeat(longest - c.help.name.length)} :: ${c.help.description}`).join('\n')}`)
            .setFooter(`For usage details, type ${client.config.prefix}help (commandname)`);
        message.channel.send((embed));
    } else {
        const cmd = args[0];
        if (client.commands.has(cmd)) {
            const command = client.commands.get(cmd);
            const embed = new Discord.RichEmbed()
                .setColor(message && message.guild ? message.guild.me.displayHexColor : '#35c7e4')
                .setTitle(`Command Info: ${command.help.name.charAt(0).toUpperCase() + command.help.name.substr(1).toLowerCase()}`)
                .setDescription(command.help.description)
                .addField('Usage', client.config.prefix + command.help.usage);
            if (command.help.examples) embed.addField('Examples', command.help.examples.map(e => `\`${client.config.prefix}${e}\``));
            message.channel.send((embed));
        }
    }
};

exports.help = {
    name: 'help',
    description: 'Displays all the available commands.',
    usage: 'help (command)'
};