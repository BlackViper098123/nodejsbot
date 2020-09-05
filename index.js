const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.token;
const welcomeChannelName = "입장";
const byeChannelName = "퇴장";
const welcomeChannelComment = "님이 입장함.";
const byeChannelComment = "님이 퇴장함.";

client.on('ready', () => {
  console.log('--------------------------------------------');
  console.log('배린이#4320');
  console.log('봇 온라인');
  console.log('버전: 1.2');
  console.log('--------------------------------------------');
});

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  const newUser = member.user;
  const welcomeChannel = guild.channels.find(channel => channel.name == welcomeChannelName);

  welcomeChannel.send(`<@${newUser.id}> ${welcomeChannelComment}\n`);

  member.addRole(guild.roles.find(role => role.name == "유저"));
});

client.on("guildMemberRemove", (member) => {
  const guild = member.guild;
  const deleteUser = member.user;
  const byeChannel = guild.channels.find(channel => channel.name == byeChannelName);

  byeChannel.send(`<@${deleteUser.id}> ${byeChannelComment}\n`);
});

client.on('message', (message) => {
  if(message.author.bot) return;

  if(message.content == '레식') {
    return message.reply('헤드 한방 망겜');
  
  }

  if(message.content == '!정보') {
    let img = 'https://cdn.discordapp.com/icons/419671192857739264/6dccc22df4cb0051b50548627f36c09b.webp?size=256';
    let embed = new Discord.RichEmbed()
      .setTitle('배린이봇')
      .setURL('https://discord.gg/RScy8pE')
      .setAuthor(' ')
      .setThumbnail()
      .addBlankField()
      .addField('제작: 배린이#4320', '최근 업데이트: 2020/9/3')
      .addField('커맨드 종류', '!명령어정보 를 통해 알 수 있음', true)
      .addField('그 외 사용법', '입장 이라고 된 이름으로 채널을 만들면 신규 유저 알림 활성화됨(퇴장은 퇴장 채널로 만들면 됨)', true)
      .addField('봇 제작', 'node.js', true)
      .addField('커뮤니티 서버', 'https://discord.gg/RScy8pE\n\n\n')
      .addBlankField()
      .setTimestamp()
      .setFooter('배린이#4320')

    message.channel.send(embed)
  } else if(message.content == '!명령어정보') {
    let helpImg = 'https://images-ext-1.discordapp.net/external/RyofVqSAVAi0H9-1yK6M8NGy2grU5TWZkLadG-rwqk0/https/i.imgur.com/EZRAPxR.png';
    let commandList = [
      {name: '!ping', desc: '핑 상태 표시'},
      {name: '!info', desc: '봇 정보 표시'},
      {name: '!command', desc: '봇 커맨드 리스트 표시'},
      {name: '!전체공지', desc: 'dm으로 전체 공지 보내기, 전체DM으로 테러를 할 수 있ㄷ..'},
    ];
    let commandStr = '';
    let embed = new Discord.RichEmbed()
      .setAuthor('배린이봇 커맨드 정보', helpImg)
      .setColor('#186de6')
      .setFooter(`배린이 봇`)
      .setTimestamp()
    
    commandList.forEach(x => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
    });

    embed.addField('Commands: ', commandStr);

    message.channel.send(embed)
  }

  if(message.content.startsWith('!전체공지')) {
    if(checkPermission(message)) return
    if(message.member != null) { // 채널에서 공지 쓸 때
      let contents = message.content.slice('!전체공지'.length);
      message.member.guild.members.array().forEach(x => {
        if(x.user.bot) return;
        x.user.send(`<@${message.author.id}> ${contents}`);
      });
  
      return message.reply('전체 공지함');
    } else {
      return message.reply('채널에서 실행해야됨');
    }
  }
});

function checkPermission(message) {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) {
    message.channel.send(`<@${message.author.id}> ` + "명령어를 사용할 권한이 없음")
    return true;
  } else {
    return false;
  }
}

function changeCommandStringLength(str, limitLen = 8) {
  let tmp = str;
  limitLen -= tmp.length;

  for(let i=0;i<limitLen;i++) {
      tmp += ' ';
  }

  return tmp;
}


client.login(token);