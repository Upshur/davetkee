const fs = require('fs');
const db = require('quick.db')
const wiodb = require('wio.db')
const ms2 = require('parse-ms')
const ms = require("ms")
const Canvas = require('canvas')//pythonic
const ayarlar = require('./ayarlar.json');//pythonic
require('./invite.js')
require('events').EventEmitter.prototype._maxListeners = 70;
require('events').defaultMaxListeners = 70;
  process.on('warning', function (err) {
    if ( 'MaxListenersExceededWarning' == err.name ) {
    process.exit(1); 

    }
  }); //pythonic
function foo() {
  return new Promise((resolve, reject) => {
  return resolve();
});
}
async function foobar() {
foobar();
foo().then(() => {}).catch(() => {});
foobar().catch(console.error);
}

var prefix = ayarlar.prefix

const Discord = require("discord.js");
const client = new Discord.Client({ partials: ['MESSAGE', 'REACTION']});
Discord.Role.prototype.toString = function() {
return `@${this.name}`
}
const log = message => {
  console.log(` ${message}`);
};
require('./util/eventLoader.js')(client);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`); //pythonic
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`); //pythonic
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name); //pythonic
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)]; //pythonic
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name); //pythonic
            });
            resolve();
        } catch (e) {
         reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};


///modlog

client.on("channelCreate", async channel => {
  var sunucuidsi = channel.guild.id;
  let kontrol = await db.fetch(`denetimkaydi_${sunucuidsi}`);
  if(!kontrol) return;
  channel.guild.fetchAuditLogs().then(logs => { 
    let kanaliacan = logs.entries.first().executor;
  
  const embed = new Discord.MessageEmbed()
  .setTitle(`${channel.guild.name} Sunucunuzda Bir Kanal Kuruldu!`)
  .setDescription(`
**Kanalı Açan ve ID'si: ${kanaliacan} ve ${kanaliacan.id}**

**Kanal İsmi ve ID'si: ${channel.name} ve ${channel.id}**
  `)
  .setFooter("The Artist")
  channel.guild.owner.send(embed)
  });
});

client.on("channelDelete", async channel => {
  var sunucuidsi = channel.guild.id;
  let kontrol = await db.fetch(`denetimkaydi_${sunucuidsi}`);
  if(!kontrol) return;
  channel.guild.fetchAuditLogs().then(logs => { 
    let kanalisilen = logs.entries.first().executor;
  
  const embed = new Discord.MessageEmbed()
  .setTitle(`${channel.guild.name} Sunucunuzda Bir Kanal Silindi!`)
  .setDescription(`
**Kanalı Silen ve ID'si: ${kanalisilen} ve ${kanalisilen.id}**

**Kanal İsmi ve ID'si: ${channel.name} ve ${channel.id}**
  `)
  .setFooter("The Artist")
  channel.guild.owner.send(embed)
  });
});

client.on("roleCreate", async role => {
  var sunucuidsi = role.guild.id;
  let kontrol = await db.fetch(`denetimkaydi_${sunucuidsi}`);
  if(!kontrol) return;
  role.guild.fetchAuditLogs().then(logs => { 
    let rolukuran = logs.entries.first().executor;
  
  const embed = new Discord.MessageEmbed()
  .setTitle(`${role.guild.name} Sunucunuzda Bir Rol Kuruldu!`)
  .setDescription(`
**Rolü Kuran ve ID'si: ${rolukuran} ve ${rolukuran.id}**

**Rol ID'si: ${role.id}**
  `)
  .setFooter("The Artist")
  role.guild.owner.send(embed)
  });
});

client.on("roleDelete", async role => {
  var sunucuidsi = role.guild.id;
  let kontrol = await db.fetch(`denetimkaydi_${sunucuidsi}`);
  if(!kontrol) return;
  role.guild.fetchAuditLogs().then(logs => { 
    let rolusilen = logs.entries.first().executor;
  
  const embed = new Discord.MessageEmbed()
  .setTitle(`${role.guild.name} Sunucunuzda Bir Rol Silindi!`)
  .setDescription(`
**Rolü Silen ve ID'si: ${rolusilen} ve ${rolusilen.id}**

**Silinmeden Önce Rolün İsmi: ${role.name}**
  `)
  .setFooter("The Artist")
  role.guild.owner.send(embed)
  });
});

client.on("guildBanAdd", async (guild, user) => {
  var sunucuidsi = guild.id;
  let kontrol = await db.fetch(`denetimkaydi_${sunucuidsi}`);
  if(!kontrol) return;
  guild.fetchAuditLogs().then(logs => { 
    let banlayan = logs.entries.first().executor;
  
  const embed = new Discord.MessageEmbed()
  .setTitle(`${guild.name} Sunucunuzda Biri Banlandı!`)
  .setDescription(`
**Banlayan ve ID'si: ${banlayan} ve ${banlayan.id}**

**Banlanan İsmi ve ID'si: ${user.tag} ve ${user.id}**
  `)
  .setFooter("The Artist")
  guild.owner.send(embed)
  });
});

client.on("guildBanRemove", async (guild, user) => {
  var sunucuidsi = guild.id;
  let kontrol = await db.fetch(`denetimkaydi_${sunucuidsi}`);
  if(!kontrol) return;
  guild.fetchAuditLogs().then(logs => { 
    let bankaldiran = logs.entries.first().executor;
  
  const embed = new Discord.MessageEmbed()
  .setTitle(`${guild.name} Sunucunuzda Birinin Banı Kaldırıldı!`)
  .setDescription(`
**Banı Kaldıran ve ID'si: ${bankaldiran} ve ${bankaldiran.id}**

**Banı Kaldırılanın İsmi ve ID'si: ${user.tag} ve ${user.id}**
  `)
  .setFooter("The Artist")
  guild.owner.send(embed)
  });
});

client.on("channelPinsUpdate", async message => {
  var sunucuidsi = message.guild.id;
  let kontrol = await db.fetch(`denetimkaydi_${sunucuidsi}`);
  if(!kontrol) return;
  message.guild.fetchAuditLogs().then(logs => { 
    let pinduzenleyen = logs.entries.first().executor;
  
  const embed = new Discord.MessageEmbed()
  .setTitle(`${message.guild.name} Sunucunuzda Biri Sabitlenenlerle Oynadı!`)
  .setDescription(`
**Mesaj Sabitlemelerini Düzenleyen ve ID'si: ${pinduzenleyen} ve ${pinduzenleyen.id}**
  `)
  .setFooter("The Artist")
  message.guild.owner.send(embed)
  });
});

client.on("emojiCreate", async emoji => {
  var sunucuidsi = emoji.guild.id;
  let kontrol = await db.fetch(`denetimkaydi_${sunucuidsi}`);
  if(!kontrol) return;
  emoji.guild.fetchAuditLogs().then(logs => { 
    let emojiekleyen = logs.entries.first().executor;
  
  const embed = new Discord.MessageEmbed()
  .setTitle(`${emoji.guild.name} Sunucunuzda Biri Emoji Ekledi!`)
  .setDescription(`
**Emoji Ekleyen ve ID'si: ${emojiekleyen} ve ${emojiekleyen.id}**

**Emoji İsmi ve ID'si: ${emoji.name} ve ${emoji.id}**
  `)
  .setFooter("The Artist")
  emoji.guild.owner.send(embed)
  });
});


///ototag

client.on("guildMemberAdd", member => {
  var tag = require('quick.db').fetch(`ototag_${member.guild.id}`)
  if(!tag) return;
  member.setNickname(`${tag}${member.user.username}`)
  })

///seste

client.on("ready", () => {
  client.channels.cache.get('907723361336049725').join();//Hangi Ses Kanalın Gircekse o ses kanalının id sini gir
  });


///güvenlik

client.on('guildMemberAdd',async member => {
    let user = client.users.cache.get(member.id);
    let kanal = client.channels.cache.get(db.fetch(`guvenlik${member.guild.id}`)) 
         const Canvas = require('canvas')
         const canvas = Canvas.createCanvas(360,100);
         const ctx = canvas.getContext('2d');
    
    const resim1 = await Canvas.loadImage('https://cdn.discordapp.com/attachments/591299755976425493/614151181752860672/yhosgeldirrn.png')
      const resim2 = await Canvas.loadImage('https://cdn.discordapp.com/attachments/591299755976425493/614164419768877056/yhosgeldirrn.png')
      const kurulus = new Date().getTime() - user.createdAt.getTime();
      const gün = moment(kurulus).format('dddd');  
      var kontrol;
        if (kurulus > 2629800000) kontrol = resim2
      if (kurulus < 2629800000) kontrol = resim1
  
  
       const background = await Canvas.loadImage( "https://cdn.discordapp.com/attachments/591299755976425493/614164413318168606/Adsz.png");
         ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
     
  
    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({format: "png"}));
    ctx.drawImage(kontrol,0,0,canvas.width, canvas.height)
    ctx.beginPath();
      ctx.lineWidth = 4;
    ctx.fill()
      ctx.lineWidth = 4;
    ctx.arc(180, 46, 36, 0, 2 * Math.PI);
      ctx.clip();
    ctx.drawImage(avatar, 143,10, 73, 72  );
  
     if (!kanal) return
         const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'güvenlik.png');
      kanal.send(attachment)
  });














































































































client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)]; //pythonic
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
   if (ayarlar.sahip.includes(message.author.id)) permlvl = 4;
    return permlvl;
};

client.login(ayarlar.token).then(
  function() {
    console.log("[Token-Log] Token doğru bir şekilde çalışıyor.");
  },
  function(err) {
    console.log("[ERROR] Token'de bir hata oluştu: " + err);
    setInterval(function() {
      process.exit(0);
    }, 20000);
  }
);

