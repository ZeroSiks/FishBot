module.exports = (client) => {
    client.user.setActivity('PrismR22\'s videos', { type: 'WATCHING'});
    console.log(`Ready to serve in ${client.channels.size} channels on ${client.guilds.size} servers, for a total of ${client.users.size} users.`);

    const autoshop = () => {
        setInterval(function() {
            const cmd = client.commands.get('shop');
            cmd.run(client);
        }, 60 * 1000);
    };
    const autonews = () => {
        setInterval(function() {
            const cmd = client.commands.get('news');
            cmd.run(client);
        }, 60 * 1000);
    };
    const autocs = () => {
        setInterval(function() {
            const cmd = client.commands.get('cheatsheet');
            cmd.run(client);
        }, 60 * 1000);
    };
    autoshop();
    autonews();
    autocs();
};