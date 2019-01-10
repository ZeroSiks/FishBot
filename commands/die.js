exports.run = async (client, message) => {
    if (message.author.id === client.config.ownerID) {
        await message.channel.send('Shutting down.');
        process.exit(1);
    } else message.reply('~~Oof~~, nice try retard.');
};

exports.help = {
    name: 'die',
    description: 'It\'s obvious what this does. Don\'t use this at home',
    usage: 'die'
};