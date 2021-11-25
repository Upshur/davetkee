const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    if (!message.guild) return message.author.sendMessage('Bu Komutu Sadece Sunucularda Kulanabilirsiniz!');


  var onlayn = message.guild.members.cache.filter(m => m.presence.status !== "offline").size.toString().replace(/ /g, "    ")
    const voiceChannels = message.guild.channels.cache.filter(c => c.type === 'voice');
    let count = 0;
    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
 
    const milano = new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.avatarURL ({ dynamic: true}))
        .setColor("RED")
    .setDescription(` Sunucumuzdaki toplam üye sayısı: \`${message.guild.memberCount}\`\n Sunucudaki Toplam Çevrimiçi Üye Sayısı: \`${onlayn}\`\n Seslideki üye sayısı: \`${count}\``)
    .setFooter ('Evolve')
    message.channel.send(milano);

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['say', 'sunucuasay'],
    permLevel: 0
};

exports.help = {
    name: 'say',
    description: 'Say',
};