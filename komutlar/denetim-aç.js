const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async(client, message, args) => { 
    if (message.author.id !== message.guild.owner.id) return message.channel.send(`:x: Bu komutu sadece sunucu sahibi kullanabilir.`);
  
    let kontrol = await db.fetch(`denetimkaydi_${message.guild.id}`)
    if(kontrol) return message.reply('Sistem zaten aktif. denetim-kapat komutuyla kapatabilirsin.')
     
    message.channel.send("Sistem aktif!")
  
  db.set(`denetimkaydi_${message.guild.id}`, 'açık')
};
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: [], 
  permLevel: 0
};
 
exports.help = {
  name: 'denetim-aç',
  description: 'denetim kaydı sistemi the artist', 
  usage: 'denetim-aç'
};