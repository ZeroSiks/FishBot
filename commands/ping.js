exports.run = async (client, message) => {
    const msg = await message.channel.send('KEEKEY?!');
    msg.edit(`Pongasdasbd! (${msg.createdTimestamp - message.createdTimestamp}ms)`);
};