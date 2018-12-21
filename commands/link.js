exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars

    let platform;
    let query;
    const platforms = ['xbox', 'xb1', 'xbox1', 'xbox one', 'xbl', 'playstation', 'ps4', 'ps', 'playstation 4', 'psn', 'computer', 'pc'];
    if (platforms.indexOf(args[0]) !== -1) {
        platform = args[0];
        query = args.splice(1, args.length).join(' ');
    } else {
        platform = 'pc';
        query = args.splice(0, args.length).join(' ');
    }
    if (!query) return message.channel.send('Error! Make sure to enter your platform and username!');
    const user = platform + ':' + query;
    try {
        client.fortnitedb.set(message.author.id, user);
    } catch (error) {
        message.channel.send('An error occurred! Sorry');
        return console.log(error);
    } message.channel.send('Successfully linked account!');
};