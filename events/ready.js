module.exports = (client) => {
    client.user.setActivity('Unknxwnn_\'s stream', { type: 'WATCHING'});
    console.log(`Ready to serve in ${client.channels.size} channels on ${client.guilds.size} servers, for a total of ${client.users.size} users.`);
};