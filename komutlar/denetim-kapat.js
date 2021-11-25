const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async(client, message, args) => { 
    if (message.author.id !== message.guild.owner.id) return message.channel.send(`:x: Bu komutu sadece sunucu sahibi kullanabilir.`);
    let kontrol = await db.fetch(`denetimkaydi_${message.guild.id}`)
    if(!kontrol) return message.reply('Sistem zaten deaktif. denetim-aç komutuyla açabilirsin.')
    message.reply('Denetim kaydı sistemi deaktifleştiriyor.').then(ilkkodumsj => {
        ilkkodumsj.edit("Sistem deaktif!")
  
  db.delete(`denetimkaydi_${message.guild.id}`)
    }, 5000)
};
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: [], 
  permLevel: 0
};
 
exports.help = {
  name: 'denetim-kapat',
  description: 'denetim kaydı sistemi the artist', 
  usage: 'denetim-kapat'
};