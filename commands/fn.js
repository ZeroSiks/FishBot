const Discord = require('discord.js');
const fn = require('fortnite');
const Canvas = require('canvas');

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
    const applyText = (canvas, text) => {
        const ctx = canvas.getContext('2d');
        let fontSize = 65;
        do {
            ctx.font = `${fontSize -= 10}px sans-serif`;
        } while (ctx.measureText(text).width > canvas.width - 300);
        return ctx.font;
    };
    const fortnite = new fn(client.config.fnkey);
  
    let platform;
    let query;
    const platforms = ['xbox', 'xb1', 'xbox1', 'xbox one', 'xbl', 'playstation', 'ps4', 'ps', 'playstation 4', 'psn', 'computer', 'pc'];
    if (!args[0]) {
        const fndb = client.fortnitedb.get(message.author.id);
        if (!fndb) return message.reply('Error! Fortnite account not linked with discord or incorrect usage');
        const fields = fndb.split(':');
        platform = fields[0];
        query = fields[1];
    } else if (message.mentions.users.first()) {
        const fndb = client.fortnitedb.get(message.mentions.users.first().id);
        if (!fndb) return message.reply('Error! Fortnite account not linked with discord or incorrect usage');
        const fields = fndb.split(':');
        platform = fields[0];
        query = fields[1];
    } else if (platforms.indexOf(args[0]) !== -1) {
        platform = args[0];
        query = args.splice(1, args.length).join(' ');
    } else {
        platform = 'pc';
        query = args.splice(0, args.length).join(' ');
    }
  
    if (!query || !platform) return message.reply('Error! Correct usage is fortnite [platform] [username]');
    try {
        var res = await fortnite.user(query, platform);
  
        if (res) {
            const result = await res;
            const lifetime = result.stats.lifetime;

            const statz = {
                Score: lifetime[6]['Score'],
                Played: lifetime[7]['Matches Played'],
                Wins: lifetime[8]['Wins'],
                WinRate: lifetime[9]['Win%'],
                Kills: lifetime[10]['Kills'],
                KD: lifetime[11]['K/d']
            };

            let plat;
            switch (result.platform) {
                case 'PlayStation 4':
                    plat = 'PS4';
                    break;
                case 'Xbox One':
                    plat = 'Xbox';
                    break;
                case 'PC':
                default:
                    plat = 'PC';
            }

            if (result) {
                switch (message.flags[0]) {
                    case 'v1':
                    case 'old':
                    case 'embed': {
                        const embed = new Discord.RichEmbed()
                            .setColor(message.guild.me.displayHexColor ? message.guild.me.displayHexColor : '#A1E7B2')
                            .setTitle(`Fortnite Stats for ${result.username} on ${result.platform}`)
                            .setURL(result.url)
                            .setFooter('Data provided by FortniteTracker')
                            .setThumbnail('https://pbs.twimg.com/profile_images/991264373086871553/q3bnn-BT.jpg')
                            .addField('Matches Played', statz.Played, true)
                            .addField('Wins', `${statz.Wins} (${statz.WinRate} Winrate)`, true)
                            .addField('Kills', `${statz.Kills} (${statz.KD} K/D)`, true)
                            .addField('Total Score', statz.Score,true);
                        message.channel.send({embed});
                    }
                        break;
                    case 'v2':
                    case 'new':
                    default: {
                        const canvas = Canvas.createCanvas(700, 500);
                        const ctx = canvas.getContext('2d');

                        const background = await Canvas.loadImage('./wallpaper.png');
                        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

                        const ree = result.username;
                        ctx.font = applyText(canvas, ree);
                        ctx.fillStyle = '#ffffff';
                        ctx.fillText(ree, canvas.width / 2.5, 100);

                        ctx.font = '40px sans-serif';
                        ctx.fillStyle = '#ffffff';
                        ctx.fillText(plat, canvas.width / 2.5, 170);

                        ctx.font = '28px sans-serif';
                        ctx.fillStyle = '#ffffff';
                        ctx.fillText('Matches,', 20, 280);

                        ctx.font = applyText(canvas, statz.Played);
                        ctx.fillStyle = '#ffffff';
                        ctx.fillText(statz.Played, 20, 348);

                        ctx.font = '28px sans-serif';
                        ctx.fillStyle = '#ffffff';
                        ctx.fillText('Wins,', 340, 280);

                        ctx.font = applyText(canvas, statz.Wins);
                        ctx.fillStyle = '#ffffff';
                        ctx.fillText(statz.Wins, 340, 348);

                        ctx.font = '28px sans-serif';
                        ctx.fillStyle = '#ffffff';
                        ctx.fillText('Win%,', 520, 280);

                        ctx.font = applyText(canvas, statz.WinRate);
                        ctx.fillStyle = '#ffffff';
                        ctx.fillText(statz.WinRate, 520, 348);

                        ctx.font = '28px sans-serif';
                        ctx.fillStyle = '#ffffff';
                        ctx.fillText('Kills,', 340, 410);

                        ctx.font = applyText(canvas, statz.Kills);
                        ctx.fillStyle = '#ffffff';
                        ctx.fillText(statz.Kills, 340, 478);

                        ctx.font = '28px sans-serif';
                        ctx.fillStyle = '#ffffff';
                        ctx.fillText('K/D,', 520, 410);

                        ctx.font = applyText(canvas, statz.KD);
                        ctx.fillStyle = '#ffffff';
                        ctx.fillText(statz.KD, 520, 478);

                        ctx.font = '28px sans-serif';
                        ctx.fillStyle = '#ffffff';
                        ctx.fillText('Total Score,', 20, 410);

                        ctx.font = applyText(canvas, statz.Score);
                        ctx.fillStyle = '#ffffff';
                        ctx.fillText(statz.Score, 20, 478);

                        const logo = await Canvas.loadImage('./fn-logo.jpg');
                        ctx.drawImage(logo, 25, 25, 200, 200);

                        const attachment = new Discord.Attachment(canvas.toBuffer(), './ree.png');
                        message.channel.send(attachment);
                    }
                }
            }
        }
    } catch (err) {
        message.channel.send('Some error occurred! Big R.I.P');
        return console.log(err);
    }
};