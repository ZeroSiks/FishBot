module.exports = (client) => {
    client.user.setActivity('Unknxwnn_\'s stream', { type: 'WATCHING'});
    console.log(`Ready to serve in ${client.channels.size} channels on ${client.guilds.size} servers, for a total of ${client.users.size} users.`);
    const autoshop = () => {
        const cmd = client.commands.get('shop');

        // https://gist.github.com/vegeta897/b006e789fe5712cf04f257090e73230b
        const START_DATE = '2019-01-03'; // Date used as the starting point for multi-hour intervals, must be YYYY-MM-DD format
        const START_HOUR = 12; // Hour of the day when the timer begins (0 is 12am, 23 is 11pm), used with START_DATE and INTERVAL_HOURS param
        const INTERVAL_HOURS = 24; // Trigger at an interval of every X hours
        const TARGET_MINUTE = 30; // Minute of the hour when the chest will refresh, 30 means 1:30, 2:30, etc.
        const OFFSET = 0; // Notification will warn that the target is X minutes away

        // Don't change any code below
        const NOTIFY_MINUTE = (TARGET_MINUTE < OFFSET ? 60 : 0) + TARGET_MINUTE - OFFSET;
        const START_TIME = new Date(new Date(START_DATE).getTime() + new Date().getTimezoneOffset() * 60000 + START_HOUR * 3600000).getTime();

        setInterval(function() {
            var d = new Date();
            if (Math.floor((d.getTime() - START_TIME) / 3600000) % INTERVAL_HOURS > 0) return; // Return if hour is not the correct interval
            if ( d.getMinutes() !== NOTIFY_MINUTE) return; // Return if current minute is not the notify minute
            cmd.run(client);
        }, 60 * 1000); // Check every minute
    };
    autoshop();
};