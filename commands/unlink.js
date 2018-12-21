exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    const fnID = client.fortnitedb.get(message.author.id);
    if (fnID) {
        client.fortnitedb.delete(message.author.id);
    } else return message.channel.send('You don\'t have an account linked');
    message.channel.send('Successfully unlinked account!');
};