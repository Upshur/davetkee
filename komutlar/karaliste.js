const qdb = require('quick.db');
module.exports.run = async(client, message, args) => {
var kişi = args[0]
if(!kişi)
return message.channel.send({embed: {color: "BLACK", description: "Bir id belirtin!"}})
if(kişi.length > 18 || kişi.length < 18)
return message.channel.send({embed: {color: "BLACK", description: "ID'ler 18 hanelidir.!"}})
qdb.set(`karaliste_${message.guild.id}.${kişi}`, "Yasaklı!")
return message.channel.send({embed: {color: "BLACK", description: `\`${kişi}\` ID'li hesap bu sunucuya girerse otomatik olarak banlanıcak.`}})
};
module.exports.conf = {permLevel: 0, aliases: []};
module.exports.help = {name: "karaliste"}