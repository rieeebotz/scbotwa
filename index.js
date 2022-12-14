"use strict";
const { downloadContentFromMessage } = require("@adiwajshing/baileys")
const fs = require ("fs");
const axios = require('axios')
const cheerio = require("cheerio")
const moment = require("moment-timezone");
const Dym = require("didyoumean");
const hikki = require("hikki-me");
const hx = require("hxz-api");
const util = require("util");
const brainly = require("brainly-scraper");
const Jimp = require("jimp");
const imageToBase64 = require('image-to-base64');
const { exec, spawn } = require("child_process");
const ffmpeg = require("fluent-ffmpeg");
const speed = require("performance-now");
const qs = require("querystring");
const { Primbon } = require("scrape-primbon");
const primbon = new Primbon()
const request = require("request");
const FormData = require("form-data");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const path = require('path');
const ms = require("parse-ms");
const toMS = require("ms");
const nou = require("node-os-utils");
const _sewa = require("./lib/sewa");
const _prem = require("./lib/premium");
let { sizeFormatter } = require("human-readable");
let format = sizeFormatter({
  std: "JEDEC", // 'SI' (default) | 'IEC' | 'JEDEC'
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}B`,
});

const Exif = require("./lib/exif")
const exif = new Exif()
 
let caklontong = []
let susunkata = []
let siapakahaku = []
let tebakkalimat = []
let tebakkata = []
let tebakkimia = []
let tebaktebakan = []
let tekateki = []
let tebakgambar = []
let tebakgame = []

// Lib
const { isSetLeft,
    addSetLeft,
    removeSetLeft,
    changeSetLeft,
    getTextSetLeft } = require('./lib/data/setleft');
const { Musikmatch } = require("./lib/scrape/lirik");
const { igProfile, insta, igstory } = require("./lib/instagram");
const { addBalance, kurangBalance, getBalance } = require("./lib/server/money");
const { isGame, gameAdd, limitAdd, givegame, cekGLimit } = require("./lib/server/limit");
const { addPlayGame, getJawabanGame, isPlayGame, cekWaktuGame, getGamePosi } = require("./lib/server/game");
const { color, bgcolor } = require('./lib/color')
const { addCmd, AddHituser } = require('./lib/server/hitbot.js')
const { isSetWelcome, changeSetWelcome, addSetWelcome, removeSetWelcome, getTextSetWelcome } = require("./lib/data/setwelcome.js");
const { bytesToSize, checkBandwidth } = require("./lib/function.js");
const { serialize, getBuffer, fetchJson, fetchText, getRandom, getGroupAdmins, runtime, sleep, generateProfilePicture, reSize, makeid, removeEmojis, calculate_age } = require("./lib/myfunc");
const { addResponList, delResponList, isAlreadyResponList, isAlreadyResponListGroup, sendResponList, updateResponList, getDataResponList } = require('./lib/data/respon-list');
const { addResponGroup, checkResponGroup, changeResponGroup, deleteResponGroup, sendResponGroup, getResponGroup } = require('./lib/data/respon-group');
const { isSetProses, addSetProses, removeSetProses, changeSetProses, getTextSetProses } = require('./lib/data/setproses');
const { isSetDone, addSetDone, removeSetDone, changeSetDone, getTextSetDone } = require('./lib/data/setdone');
const { isSetOpen, addSetOpen, removeSetOpen, changeSetOpen, getTextSetOpen } = require("./lib/data/setopen");
const { isSetClose, addSetClose, removeSetClose, changeSetClose, getTextSetClose } = require("./lib/data/setclose");

// Database
let daftar = JSON.parse(fs.readFileSync('./db/function/daftar.json')); 
let commund = JSON.parse(fs.readFileSync('./database/dashboard/datacmd.json'));
let hitbot = JSON.parse(fs.readFileSync('./database/dashboard/userhit.json'));
let pendaftar = JSON.parse(fs.readFileSync('./database/user.json'))
let mess = JSON.parse(fs.readFileSync('./function/mess.json'));
let setting = JSON.parse(fs.readFileSync('./config.json'));
let antilink = JSON.parse(fs.readFileSync('./database/antilink.json'));
let antiwame = JSON.parse(fs.readFileSync('./database/antiwame.json'));
let listCmd = JSON.parse(fs.readFileSync('./database/listcmd.json'));
let _cmdUser = JSON.parse(fs.readFileSync('./database/commandUser.json'));
let responDB = JSON.parse(fs.readFileSync('./database/respon.json'));
let db_respon_list = JSON.parse(fs.readFileSync('./database/list-message.json'));
let db_respon_group = JSON.parse(fs.readFileSync('./database/respon-group.json'));
let db_open_group = JSON.parse(fs.readFileSync('./database/set_open.json'));
let db_close_group = JSON.parse(fs.readFileSync('./database/set_close.json'));
let opengc = JSON.parse(fs.readFileSync('./database/opengc.json'));
let glimit = JSON.parse(fs.readFileSync('./database/glimit.json'));
let _money = JSON.parse(fs.readFileSync('./database/balance.json'));
let anonymous = JSON.parse(fs.readFileSync('./database/anonymous.json'));
let sewa = JSON.parse(fs.readFileSync('./database/sewa.json'));
let premium = JSON.parse(fs.readFileSync('./database/premium.json'));

moment.tz.setDefault("Asia/Jakarta").locale("id");

var packnamenya = 'NEOBOT'
var authornya = 'BY LEXXY'
var apiku = 'lexxygimang'

module.exports = async(lexxy, msg, m, setting, store, welcome, left, set_welcome_group, set_left_db, db_respon_list, opengc, set_proses, set_done, set_open, set_close) => {
    try {
        let { ownerNumber, ownerName, botName, footer, group, youtube, gamewaktu, sticker: stc } = setting

// MESSAGE
let { menuall } = require('./help')
let { textprem } = require('./help')
let { textdonasi } = require('./help')

        let footxt = `${footer}`
        let thumb = await reSize(fs.readFileSync(setting.pathimg), 200, 200, [])
        const { type, quotedMsg, now, fromMe, mentioned } = msg
        if (msg.isBaileys) return
        const tanggal = moment().tz("Asia/Jakarta").format("ll")
        const jam = moment().format("HH:mm:ss z")
        let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
        var fildt = dt == 'Pagi' ? dt + '' : dt == 'Siang' ? dt + '' : dt == 'Sore' ? dt + '' : dt + ''
        const ucapanWaktu = fildt.charAt(0).toUpperCase() + fildt.slice(1)
        const content = JSON.stringify(msg.message)
        const from = msg.key.remoteJid
        const chats = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type === 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type === 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type === 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type === 'buttonsResponseMessage') && quotedMsg.fromMe && msg.message.buttonsResponseMessage.selectedButtonId ? msg.message.buttonsResponseMessage.selectedButtonId : (type === 'templateButtonReplyMessage') && quotedMsg.fromMe && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : (type === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : (type == 'listResponseMessage') && quotedMsg.fromMe && msg.message.listResponseMessage.singleSelectReply.selectedRowId ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ""
        const toJSON = j => JSON.stringify(j, null,'\t')
        if (lexxy.multi) {
        	var prefix = /^[?????????????????????????????????_=|~!?#$%^&.+-,\/\\??^]/.test(chats) ? chats.match(/^[?????????????????????????????????_=|~!?#$%^&.+-,\/\\??^]/gi) : '#'
        } else {
        	if (lexxy.nopref) {
                prefix = ''
        	} else { 
                prefix = lexxy.prefa
        	}
        }
           var dataGroup = (type === 'buttonsResponseMessage') ? msg.message.buttonsResponseMessage.selectedButtonId : ''
                var dataPrivate = (type === "messageContextInfo") ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : ''
                const isButton = dataGroup.length !== 0 ? dataGroup : dataPrivate
        const args = chats.split(' ')
        const command = chats.toLowerCase().split(' ')[0] || ''
        const isCmd = command.startsWith(prefix)
        const isGroup = msg.key.remoteJid.endsWith('@g.us')
        const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
      	const isOwner = ownerNumber == sender ? true : ["6283834558105@s.whatsapp.net"].includes(sender) ? true : false
        const pushname = msg.pushName
        const q = chats.slice(command.length + 1, chats.length)
        const isNan = args[1]
        const body = chats.startsWith(prefix) ? chats : ''
        const quoted = msg.quoted ? msg.quoted : msg
        const botNumber = lexxy.user.id.split(':')[0] + '@s.whatsapp.net'
        const groupMetadata = isGroup ? await lexxy.groupMetadata(from) : ''
        const groupName = isGroup ? groupMetadata.subject : ''
        const groupId = isGroup ? groupMetadata.id : ''
        const groupMembers = isGroup ? groupMetadata.participants : ''
        const participants = isGroup ? await groupMetadata.participants : ''
        const groupDesc = isGroup ? groupMetadata.desc : ''
        const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
        const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
        const isGroupAdmins = groupAdmins.includes(sender)
        const isUser = pendaftar.includes(sender)
        const gcount = setting.limitGame
        const isAntiWame = antiwame.includes(from) ? true : false
        const isAntiLink = antilink.includes(from) ? true : false  
        const isLeft = left.includes(from) ? true : false
        const isWelcome = isGroup ? welcome.includes(from) ? true : false : false
const isPremium = isOwner ? true : _prem.checkPremiumUser(sender, premium)
const isSewa = _sewa.checkSewaGroup(from, sewa)

        let timestamp = speed();
        let latensi = speed() - timestamp

        let wangsaf = "0@s.whatsapp.net"

        const mentionByTag = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.mentionedJid : []
        const mentionByReply = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.participant || "" : ""
        const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
        mention != undefined ? mention.push(mentionByReply) : []
        const mentionUser = mention != undefined ? mention.filter(n => n) : []
        
        try {
        var pp_user = await lexxy.profilePictureUrl(sender, 'image')
        } catch {
        var pp_user = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
        }
                    
        async function downloadAndSaveMediaMessage (type_file, path_file) {
        	if (type_file === 'image') {
                var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
                let buffer = Buffer.from([])
                for await(const chunk of stream) {
                	buffer = Buffer.concat([buffer, chunk])
                }
                fs.writeFileSync(path_file, buffer)
                return path_file
        	} else if (type_file === 'video') {
                var stream = await downloadContentFromMessage(msg.message.videoMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
                let buffer = Buffer.from([])
                for await(const chunk of stream) {
                	buffer = Buffer.concat([buffer, chunk])
                }
                fs.writeFileSync(path_file, buffer)
                return path_file
        	} else if (type_file === 'sticker') {
                var stream = await downloadContentFromMessage(msg.message.stickerMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
                let buffer = Buffer.from([])
                for await(const chunk of stream) {
                	buffer = Buffer.concat([buffer, chunk])
                }
                fs.writeFileSync(path_file, buffer)
                return path_file
        	} else if (type_file === 'audio') {
                var stream = await downloadContentFromMessage(msg.message.audioMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.audioMessage, 'audio')
                let buffer = Buffer.from([])
                for await(const chunk of stream) {
                	buffer = Buffer.concat([buffer, chunk])
                }
                fs.writeFileSync(path_file, buffer)
                return path_file
        	}
        }
        const sendFileFromUrl = async (from, url, caption, options = {}) => {
            let mime = '';
            let res = await axios.head(url)
            mime = res.headerd["content-type"]
            let type = mime.split("/")[0]+"Message"
            if (mime.split("/")[0] === "image") {
               var img = await getBuffer(url)
               return lexxy.sendMessage(from, { image: img, caption: caption }, options)
            } else if (mime.split("/")[0] === "video") {
               var vid = await getBuffer(url)
               return lexxy.sendMessage(from, { video: vid, caption: caption }, options)
            } else if (mime.split("/")[0] === "audio") {
               var aud = await getBuffer(url)
               return lexxy.sendMessage(from, { audio: aud, mimetype: 'audio/mp3' }, options)
            } else {
               var doc = await getBuffer(url)
               return lexxy.sendMessage(from, { document: doc, mimetype: mime, caption: caption }, options)
            }
        }
        
    function toCommas(x) {
	x = x.toString()
	var pattern = /(-?\d+)(\d{3})/;
     while (pattern.test(x))
	   x = x.replace(pattern, "$1,$2");
	return x;
}

        async function sendPlay(from, query) {
            var url = await yts(query)
            url = url.videos[0].url
            hx.youtube(url).then(async(data) => {
                var button = [{ urlButton: { displayText: `Source Code`, url: `${url}` } }, { quickReplyButton: { displayText: `Audio`, id: `${prefix}ytmp3 ${url}` } }, { quickReplyButton: { displayText: `Video`, id: `${prefix}ytmp4 ${url}` } }]

                lexxy.sendMessage(from, { caption: `*???  YOUTUBE PLAY  ???*\n\n??? *Title :* ${data.title ? data.title : '-'}\n??? *Quality :* ${data.quality}\n\n_Silahkan Pilih Format yang ada dibawah_`, image: { url: data.thumb }, templateButtons: button, footer: 'Pilih Media Yang Anda Inginkan', mentions: [sender] })
           }).catch((e) => {
               lexxy.sendMessage(from, { text: mess.error.api }, { quoted: msg })
               ownerNumber.map( i => lexxy.sendMessage(from, { text: `Send Play Error : ${e}` }))
           })
        }
        function hitungmundur(bulan, tanggal) {
            let from = new Date(`${bulan} ${tanggal}, 2022 00:00:00`).getTime();
            let now = Date.now();
            let distance = from - now;
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);
            return days + "Hari " + hours + "Jam " + minutes + "Menit " + seconds + "Detik"
        }
        const isUrl = (url) => {
        	return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
        }
       
        const isEmoji = (emo) => {
            let emoji_ranges = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
            let regexEmoji = new RegExp(emoji_ranges, 'gi');
            return emo.match(regexEmoji)
        }
        function jsonformat(string) {
            return JSON.stringify(string, null, 2)
        }
        function monospace(string) {
            return '```' + string + '```'
        }
        function randomNomor(min, max = null) {
            if (max !== null) {
        	    min = Math.ceil(min);
        	    max = Math.floor(max);
        	    return Math.floor(Math.random() * (max - min + 1)) + min;
            } else {
        	    return Math.floor(Math.random() * min) + 1
            }
        }
        const pickRandom = (arr) => {
        	return arr[Math.floor(Math.random() * arr.length)]
        }
        function mentions(teks, mems = [], id) {
        	if (id == null || id == undefined || id == false) {
        	    let res = lexxy.sendMessage(from, { text: teks, mentions: mems })
        	    return res
        	} else {
                let res = lexxy.sendMessage(from, { text: teks, mentions: mems }, { quoted: msg })
                return res
            }
        }
        const nebal = (angka) => {
            return Math.floor(angka)
        }
        function parseMention(text = '') {
            return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
        }
        const reply = (teks) => {
        	return lexxy.sendMessage(from, { text: teks, mentions: parseMention(teks) }, { quoted: msg })
        }
        
        const fkontak = { key: {fromMe: false,participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { 'contactMessage': { 'displayName': `${pushname}`, 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${pushname},;;;\nFN:${pushname},\nitem1.TEL;waid=${sender.split('@')[0]}:${sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`, 'jpegThumbnail': fs.readFileSync('./media/logo.jpg')}}}
        const textImg = (teks) => {
        	return lexxy.sendMessage(from, { text: teks, jpegThumbnail: fs.readFileSync(setting.pathimg), mentions: parseMention(teks) }, { quoted: msg })
        }
        const sendMess = (hehe, teks) => {
        	lexxy.sendMessage(hehe, { text, teks })
        }
        const buttonWithText = (from, text, footer, buttons) => {
        	return lexxy.sendMessage(from, { text: text, footer: footer, templateButtons: buttons })
        }
        const sendContact = (jid, numbers, name, quoted, mn) => {
        	let number = numbers.replace(/[^0-9]/g, '')
        	const vcard = 'BEGIN:VCARD\n' 
        	+ 'VERSION:3.0\n' 
        	+ 'FN:' + name + '\n'
        	+ 'ORG:;\n'
        	+ 'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n'
        	+ 'END:VCARD'
        	return lexxy.sendMessage(from, { contacts: { displayName: name, contacts: [{ vcard }] }, mentions : mn ? mn : []},{ quoted: quoted })
        }

        async function getGcName(groupID) {
            try {
                let data_name = await lexxy.groupMetadata(groupID)
                return data_name.subject
            } catch (err) {
                return '-'
            }
        }

        async function sendStickerFromUrl(from, url, packname1 = stc.packname, author1 = stc.author, options = {}) {
        	var names = Date.now() / 10000;
        	var download = function (uri, filename, callback) {
                request.head(uri, function (err, res, body) {
                    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
	            });
        	};
            exif.create(packname1, author1, `sendstc_${names}`)
        	download(url, './sticker/' + names + '.png', async function () {
                let filess = './sticker/' + names + '.png'
        	    let asw = './sticker/' + names + '.webp'
        	    exec(`ffmpeg -i ${filess} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${asw}`, async (err) => {
        	        exec(`webpmux -set exif ./sticker/sendstc_${names}.exif ${asw} -o ${asw}`, async (error) => {
                        lexxy.sendMessage(from, { sticker: fs.readFileSync(asw) }, options)
                        fs.unlinkSync(filess)
                        fs.unlinkSync(asw)
        	        })
                })
        	})
        }
        
        function toRupiah(angka) {
                   var balancenyeini = '';
                   var angkarev = angka.toString().split('').reverse().join('');
                   for (var i = 0; i < angkarev.length; i++)
                   if (i % 3 == 0) balancenyeini += angkarev.substr(i, 3) + '.';
                   return '' + balancenyeini.split('', balancenyeini.length - 1).reverse().join('');
                }
                
        const buttonsDefault = [
	        { quickReplyButton: { displayText: `Rules`, id: `${prefix}rules` } },
			{ quickReplyButton: { displayText: `Donasi`, id: `${prefix}donasi` } },
			{ quickReplyButton: { displayText: `Dashboard`, id: `${prefix}dashboard` } }
			]
    
        const buttonsTopup = [
        	{ quickReplyButton: { displayText: `konfirmasi`, id: `${prefix}tp2 ${q.split("|")[0]}|${q.split("|")[1]}` } }
		     ]
const buttonsGames = [
		{ quickReplyButton: { displayText: `back to menu`, id: `${prefix}menu` } },
			{ quickReplyButton: { displayText: `contact owner`, id: `${prefix}owner` } }
		]
		const getCase = (cases) => {
                   return "case prefix+"+`'${cases}'`+fs.readFileSync(__filename).toString().split('case prefix+\''+cases+'\'')[1].split("break")[0]+"break"
                }
		
// ANTILINK
if (isGroup && isAntiLink && !isOwner && !isGroupAdmins && isBotGroupAdmins){
if (chats.match(/(https:\/\/)/gi)) {
if (!isBotGroupAdmins) return reply(`Untung bot bukan admin`)
reply(`*??? LINK TERDETEKSI ???*\n\nSepertinya kamu mengirim Link, maaf kamu akan di kick`)
lexxy.groupParticipantsUpdate(from, [sender], "remove")
}
}
        
//ANTI WAME
if (isGroup && isAntiWame && !isOwner && !isGroupAdmins && isBotGroupAdmins){
if (chats.match(/(wa.me)/gi)) {
if (!isBotGroupAdmins) return reply(`Untung bot bukan admin`)
reply(`*??? WAME DETECTOR ???*\n\nSepertinya kamu mengirim Wa.me, maaf kamu akan di kick`)
lexxy.groupParticipantsUpdate(from, [sender], "remove")
}
}

	    async function addCountCmdUser(nama, sender, u) {
            var posi = null
            var pos = null
            Object.keys(u).forEach((i) => {
                if (u[i].jid === sender) {
                    posi = i
                }
            })
            if (posi === null) {
                u.push({jid: sender, db: [{nama: nama, count: 0}]})
                fs.writeFileSync('./database/commandUser.json', JSON.stringify(u, null, 2));
                Object.keys(u).forEach((i) => {
                    if (u[i].jid === sender) {
                        posi = i
                    }
                })
            }
            if (posi !== null) {
                Object.keys(u[posi].db).forEach((i) => {
                    if (u[posi].db[i].nama === nama) {
                        pos = i
                    }
                })
                if (pos === null) {
                    u[posi].db.push({nama: nama, count: 1})
                    fs.writeFileSync('./database/commandUser.json', JSON.stringify(u, null, 2));
                } else {
                    u[posi].db[pos].count += 1
                    fs.writeFileSync('./database/commandUser.json', JSON.stringify(u, null, 2));
                }
            }
        }
       
        async function getPosiCmdUser(sender, _db) {
            var posi = null
            Object.keys(_db).forEach((i) => {
                if (_db[i].jid === sender) {
                    posi = i
                }
            })
            return posi
        }

        async function addCountCmd(nama, sender, _db) {
            addCountCmdUser(nama, sender, _cmdUser)
            var posi = null
            Object.keys(_db).forEach((i) => {
                if (_db[i].nama === nama) {
                   posi = i
                }
            })
            if (posi === null) {
                _db.push({nama: nama, count: 1})
                fs.writeFileSync('./database/command.json',JSON.stringify(_db, null, 2));
            } else {
                _db[posi].count += 1
                fs.writeFileSync('./database/command.json',JSON.stringify(_db, null, 2));
            }
        }

if (!isCmd && checkResponGroup(from, chats, db_respon_group)) {
            lexxy.sendMessage(from, { text: sendResponGroup(from, chats, db_respon_group) }, {
                quoted: msg
            })
        }
        
                // Auto Write Database Anonymous Every 30 Second's
                setInterval(async () => {
                  fs.writeFileSync('./database/anonymous.json', JSON.stringify(anonymous, null, 2))
                }, 30 * 1000)

                var cekForAnon = isCmd && args[0].length > 1

                // For Action Anonymous Chat
                if (!isGroup && !msg.key.fromMe && !cekForAnon) {
                   let rums = Object.values(anonymous).find(room => [room.a, room.b].includes(sender) && room.state == "CHATTING")
                   if (rums) {
                     var partnerJID = [rums.a, rums.b].find(user => user !== sender)
                     if (msg.type == "conversation") {
                       lexxy.sendMessage(partnerJID, { text: chats })
                     } else if (msg.type == "extendedTextMessage") {
                       lexxy.sendMessage(partnerJID, { text: chats, contextInfo: msg.message["extendedTextMessage"].contextInfo })
                     } else {
                       var contextInfo = msg.message[msg.type].contextInfo
                       lexxy.sendMessageFromContent(partnerJID, msg.message, { contextInfo })
                     }
                   }
                }
                
        // Store
        if (!isCmd && isGroup && isAlreadyResponList(from, chats, db_respon_list)) {
            var get_data_respon = getDataResponList(from, chats, db_respon_list)
            if (get_data_respon.isImage === false) {
                lexxy.sendMessage(from, { text: sendResponList(from, chats, db_respon_list) }, {
                    quoted: msg
                })
            } else {
                lexxy.sendMessage(from, { image: await getBuffer(get_data_respon.image_url), caption: get_data_respon.response }, {
                    quoted: msg
                })
            }
        }
        
                // Function for Anonymous Chat
                function anonyCheck(who = '', _db) {
                   return [_db.a, _db.b].includes(who)
                }
                function anonyOther(who = '', _db) {
                    return who == _db.a ? _db.b : who == _db.b ? _db.a : ''
                }
                
        const isImage = (type == 'imageMessage')
        const isVideo = (type == 'videoMessage')
        const isSticker = (type == 'stickerMessage')
        const isQuotedMsg = msg.isQuotedMsg
        const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true : false : false
        const isQuotedAudio = isQuotedMsg ? content.includes('audioMessage') ? true : false : false
        const isQuotedDocument = isQuotedMsg ? content.includes('documentMessage') ? true : false : false
        const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true : false : false
        const isQuotedSticker = isQuotedMsg ? content.includes('stickerMessage') ? true : false : false


// Auto Registrasi
if (isCmd && !isUser) {
pendaftar.push(sender)
fs.writeFileSync('./database/user.json', JSON.stringify(pendaftar, null, 2))
}

// Premium
_prem.expiredCheck(lexxy, premium)

// Sewa
_sewa.expiredCheck(lexxy, sewa)
                
if (isCmd) {
addBalance(sender, randomNomor(5, 30), _money)
fs.writeFileSync('./database/balance.json', JSON.stringify(_money, null, 2))
}

const lordHitt = await fetchJson(`https://api.countapi.xyz/hit/Lexxy/visits`)

/*if (command){
lexxy.setStatus(`sibuk`)
}*/

let addHit = (sender, command) => {
hitbot.push({
"id": sender,
"command": command
})
fs.writeFileSync('./database/dashboard/userhit.json', JSON.stringify(hitbot))
}
                
// DATAGAMES
cekWaktuGame(lexxy, caklontong)
		if (isPlayGame(from, caklontong) && isUser) {
		  if (chats.toLowerCase() == getJawabanGame(from, caklontong)) {
		    var htgm = randomNomor(100, 150)
			addBalance(sender, htgm, _money)
		    var teks =`*Selamat Jawaban Kamu Benar ????*\n\nJawaban : ${getJawabanGame(from, tebakgame)}\nHadiah : Balance $${htgm}\n\nIngin bermain lagi? klik button  next`
		    var but = [
{ buttonId: prefix+'caklontong', buttonText: { displayText: "Next????" }, type: 1 }
]
            lexxy.sendMessage(from, { text: teks, footer: setting.footer, buttons: but })
            caklontong.splice(getGamePosi(from, caklontong), 1)
		  }
		}
		
cekWaktuGame(lexxy, susunkata)
		if (isPlayGame(from, susunkata) && isUser) {
		  if (chats.toLowerCase() == getJawabanGame(from, susunkata)) {
		    var htgm = randomNomor(100, 150)
			addBalance(sender, htgm, _money)
		    var teks =`*Selamat Jawaban Kamu Benar ????*\n\nJawaban : ${getJawabanGame(from, tebakgame)}\nHadiah : Balance $${htgm}\n\nIngin bermain lagi? klik button  next`
		    var but = [
{ buttonId: prefix+'susunkata', buttonText: { displayText: "Next????" }, type: 1 }
]
            lexxy.sendMessage(from, { text: teks, footer: setting.footer, buttons: but })
            susunkata.splice(getGamePosi(from, susunkata), 1)
		  }
		}
		
cekWaktuGame(lexxy, siapakahaku)
		if (isPlayGame(from, siapakahaku) && isUser) {
		  if (chats.toLowerCase() == getJawabanGame(from, siapakahaku)) {
		    var htgm = randomNomor(100, 150)
			addBalance(sender, htgm, _money)
		    var teks =`*Selamat Jawaban Kamu Benar ????*\n\nJawaban : ${getJawabanGame(from, tebakgame)}\nHadiah : Balance $${htgm}\n\nIngin bermain lagi? klik button  next`
		    var but = [
{ buttonId: prefix+'siapakahaku', buttonText: { displayText: "Next????" }, type: 1 }
]
            lexxy.sendMessage(from, { text: teks, footer: setting.footer, buttons: but })
            siapakahaku.splice(getGamePosi(from, siapakahaku), 1)
		  }
		}
		
cekWaktuGame(lexxy, tebakkalimat)
		if (isPlayGame(from, tebakkalimat) && isUser) {
		  if (chats.toLowerCase() == getJawabanGame(from, tebakkalimat)) {
		    var htgm = randomNomor(100, 150)
			addBalance(sender, htgm, _money)
		var teks =`*Selamat Jawaban Kamu Benar ????*\n\nJawaban : ${getJawabanGame(from, tebakgame)}\nHadiah : Balance $${htgm}\n\nIngin bermain lagi? klik button  next`
		    var but = [
{ buttonId: prefix+'tebakkalimat', buttonText: { displayText: "Next????" }, type: 1 }
]
            lexxy.sendMessage(from, { text: teks, footer: setting.footer, buttons: but })
            tebakkalimat.splice(getGamePosi(from, siapakahaku), 1)
		  }
		}
		
cekWaktuGame(lexxy, tebakkata)
		if (isPlayGame(from, tebakkata) && isUser) {
		  if (chats.toLowerCase() == getJawabanGame(from, tebakkata)) {
		    var htgm = randomNomor(100, 150)
			addBalance(sender, htgm, _money)
		    var teks =`*Selamat Jawaban Kamu Benar ????*\n\nJawaban : ${getJawabanGame(from, tebakgame)}\nHadiah : Balance $${htgm}\n\nIngin bermain lagi? klik button  next`
		    var but = [
{ buttonId: prefix+'tebakkata', buttonText: { displayText: "Next????" }, type: 1 }
]
            lexxy.sendMessage(from, { text: teks, footer: setting.footer, buttons: but })
            tebakkata.splice(getGamePosi(from, tebakkata), 1)
		  }
		}
		
cekWaktuGame(lexxy, tebakkimia)
		if (isPlayGame(from, tebakkimia) && isUser) {
		  if (chats.toLowerCase() == getJawabanGame(from, tebakkimia)) {
		    var htgm = randomNomor(100, 150)
			addBalance(sender, htgm, _money)
		    var teks =`*Selamat Jawaban Kamu Benar ????*\n\nJawaban : ${getJawabanGame(from, tebakgame)}\nHadiah : Balance $${htgm}\n\nIngin bermain lagi? klik button  next`
		    var but = [
{ buttonId: prefix+'tebakkimia', buttonText: { displayText: "Next????" }, type: 1 }
]
            lexxy.sendMessage(from, { text: teks, footer: setting.footer, buttons: but })
            tebakkimia.splice(getGamePosi(from, tebakkimia), 1)
		  }
		}
	
cekWaktuGame(lexxy, tebaktebakan)
		if (isPlayGame(from, tebaktebakan) && isUser) {
		  if (chats.toLowerCase() == getJawabanGame(from, tebaktebakan)) {
		    var htgm = randomNomor(100, 150)
			addBalance(sender, htgm, _money)
		    var teks =`*Selamat Jawaban Kamu Benar ????*\n\nJawaban : ${getJawabanGame(from, tebakgame)}\nHadiah : Balance $${htgm}\n\nIngin bermain lagi? klik button  next`
		    var but = [
{ buttonId: prefix+'tebaktebakan', buttonText: { displayText: "Next????" }, type: 1 }
]
            lexxy.sendMessage(from, { text: teks, footer: setting.footer, buttons: but })
            tebaktebakan.splice(getGamePosi(from, tebaktebakan), 1)
		  }
		}
cekWaktuGame(lexxy, tekateki)
		if (isPlayGame(from, tekateki) && isUser) {
		  if (chats.toLowerCase() == getJawabanGame(from, tekateki)) {
		    var htgm = randomNomor(100, 150)
			addBalance(sender, htgm, _money)
		    var teks =`*Selamat Jawaban Kamu Benar ????*\n\nJawaban : ${getJawabanGame(from, tebakgame)}\nHadiah : Balance $${htgm}\n\nIngin bermain lagi? klik button  next`
		    var but = [
{ buttonId: prefix+'tekateki', buttonText: { displayText: "Next????" }, type: 1 }
]
            lexxy.sendMessage(from, { text: teks, footer: setting.footer, buttons: but })
            tekateki.splice(getGamePosi(from, tekateki), 1)
		  }
		}

cekWaktuGame(lexxy, tebakgambar)
		if (isPlayGame(from, tebakgambar) && isUser) {
		  if (chats.toLowerCase() == getJawabanGame(from, tebakgambar)) {
		    var htgm = randomNomor(100, 150)
			addBalance(sender, htgm, _money)
		    var teks =`*Selamat Jawaban Kamu Benar ????*\n\nJawaban : ${getJawabanGame(from, tebakgame)}\nHadiah : Balance $${htgm}\n\nIngin bermain lagi? klik button  next`
		    var but = [
{ buttonId: prefix+'tebakgambar', buttonText: { displayText: "Next ????" }, type: 1 }
]
            lexxy.sendMessage(from, { text: teks, footer: setting.footer, buttons: but })
            tebakgambar.splice(getGamePosi(from, tebakgambar), 1)
		  }
		}	
		
cekWaktuGame(lexxy, tebakgame)
		if (isPlayGame(from, tebakgame) && isUser) {
		  if (chats.toLowerCase() == getJawabanGame(from, tebakgame)) {
		    var htgm = randomNomor(100, 150)
			addBalance(sender, htgm, _money)
		    var teks =`*Selamat Jawaban Kamu Benar ????*\n\nJawaban : ${getJawabanGame(from, tebakgame)}\nHadiah : Balance $${htgm}\n\nIngin bermain lagi? klik button  next`
		    var but = [
{ buttonId: prefix+'tebakgame', buttonText: { displayText: "Next????" }, type: 1 }
]
            lexxy.sendMessage(from, { text: teks, footer: setting.footer, buttons: but })
		    tebakgame.splice(getGamePosi(from, tebakgame), 1)
		  }
		}	
		
//Auto Block Nomor Luar
if (sender.startsWith('212')) {
return lexxy.updateBlockStatus(sender, 'block')
}
if (sender.startsWith('91')) {
return lexxy.updateBlockStatus(sender, 'block')
}
if (sender.startsWith('92')) {
return lexxy.updateBlockStatus(sender, 'block')
}
if (sender.startsWith('90')) {
return lexxy.updateBlockStatus(sender, 'block')
}
if (sender.startsWith('54')) {
return lexxy.updateBlockStatus(sender, 'block')
}
if (sender.startsWith('55')) {
return lexxy.updateBlockStatus(sender, 'block')
}
if (sender.startsWith('40')) {
return lexxy.updateBlockStatus(sender, 'block')
}
if (sender.startsWith('94')) {
return lexxy.updateBlockStatus(sender, 'block')
}
if (sender.startsWith('60')) {
return lexxy.updateBlockStatus(sender, 'block')
}

	if (chats.startsWith("> ") && isOwner) {
                   console.log(color('[EVAL]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkoakwoak`))
                   const ev = (sul) => {
                     var sat = JSON.stringify(sul, null, 2)
                     var bang = util.format(sat)
                     if (sat == undefined) {
                       bang = util.format(sul)
                     }
                     return textImg(bang)
                   }
                   try {
                     textImg(util.format(eval(`;(async () => { ${chats.slice(2)} })()`)))
                   } catch (e) {
                     textImg(util.format(e))
                   }
                } else if (chats.startsWith("$ ") && isOwner) {
                   console.log(color('[EXEC]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkoakwoak`))
                   exec(chats.slice(2), (err, stdout) => {
                     if (err) return reply(`${err}`)
                     if (stdout) reply(`${stdout}`)
                   })
                } else if (chats.startsWith("x ") && isOwner) {
                   console.log(color('[EVAL]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkaokwoak`))
                   try {
                     let evaled = await eval(chats.slice(2))
                     if (typeof evaled !== 'string') evaled = require("util").inspect(evaled)
                     reply(`${evaled}`)
                   } catch (err) {
                     reply(`${err}`)
                   }
                }


		// Logs
		if (!isGroup && isCmd && !fromMe) {
		    console.log(color('[ CMD ]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
		}
		if (isGroup && isCmd && !fromMe) {
		    console.log(color('[ CMD ]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))
		}
       /* function triggerSticker() {
            try {
                for (let x = 0; x < responDB.length; x++) {
                    if (msg.message.stickerMessage.fileSha256.toString('hex') == responDB[x].hex) {
                        return responDB[x].balasan;
                    }
                }
            } catch {
                return false;
            }
        }*/
       
const lordLexxy = await fetchJson(`https://api.countapi.xyz/hit/Lexxy/visits`)

const wiwik = `_*Selamat ${ucapanWaktu} ${pushname}*_

 ??????????????? *SERVER* ???
 ?????? Library : *Baileys-MD*.
 ?????? Global Hit : ${lordLexxy.value}
 ?????? Total Pengguna : ${pendaftar.length}
 ?????? Waktu : ${tanggal}
 ?????? Jam : ${jam}
 ????????????????????????????????????
 
 ??????????????? *DATA* ???
 ?????? Name : ${pushname}
 ?????? Tag : @${sender.split("@")[0]}
 ?????? Status : ${isOwner ? 'Owner':'User'}
 ?????? Balance : $${getBalance(sender, _money)}
 ?????? Limit Game : ${cekGLimit(sender, gcount, glimit)}
 ????????????????????????????????????
 
*Runtime Bot*:
${runtime(process.uptime())}

${menuall(sender, prefix, pushname, ucapanWaktu, tanggal, jam, isOwner)}

*THANKS TO*
_> Allah_
_> Parents_
_> My Friends_
_> My Subscribers_
_> Rieee Mods_
`

switch(command) {
case prefix+'menu':
case prefix+'help':{
const buttonsMenuu = [
{buttonId: `${prefix}donasi`, buttonText: { displayText: 'Donasi'}, type: 1},
{buttonId: `${prefix}rules`, buttonText: { displayText: 'Rules'}, type: 1},
{buttonId: `${prefix}db`, buttonText: { displayText: 'Server'}, type: 1}
]
const buttonSmenuu = {
image: await reSize(setting.pathimg, 300, 200),
caption: wiwik,
footer: footxt,
buttons: buttonsMenuu,
headerType: 4
}
const sendMsg = await lexxy.sendMessage(from, buttonSmenuu, { quoted: fkontak})
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)
break
//?????????????????????????????????????????????[ MAIN MENU ]???????????????????????????????????????????????????//
case prefix+'infogc':
case prefix+'infogrup':
case prefix+'infogroup':
let cekgcnya =`*INFO GROUP*
??? id : ${from}
??? nama : ${groupName}
??? member : ${groupMembers.length}
??? admin : ${groupAdmins.length}
??? antilink : ${isAntiLink? "on":"off"}
??? welcome : ${isWelcome? "on":"off"}

*Descripsi*:
${groupDesc}`
reply(cekgcnya)
addCmd(command.slice(1), 1, commund)
addHit(sender, command)
break
case prefix+'limit':{
reply(`*INFO-USER*
 Tag : @${sender.split("@")[0]}
 Status : ${isOwner ? 'Owner':'User'}
 Balance : $${getBalance(sender, _money)}
 Limit Game : ${cekGLimit(sender, gcount, glimit)}`)
}
break
case prefix+'unblock':{
if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
if (!q) return reply(`Contoh :\n${command} 628xxxx`)
var nomorNya = q
await lexxy.updateBlockStatus(`${nomorNya}@s.whatsapp.net`, "unblock") // Unblock user
reply('Sukses Unblock Nomor')
}
break
case prefix+'block':{
if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
if (!q) return reply(`Contoh :\n${command} 628xxxx`)
var nomorNya = q
await lexxy.updateBlockStatus(`${nomorNya}@s.whatsapp.net`, "block") // Block user
reply('Sukses Block Nomor')
}
break

case prefix+'server':{
let anuinfopc = await store.chats.all().filter(v => v.id.endsWith('.net')).map(v => v)
let anuinfogc = await store.chats.all().filter(v => v.id.endsWith('@g.us')).map(v => v.id)

let infoText =`*INFO SERVER*
??? Total Hit : ${hitbot.length}
??? Pengguna : ${pendaftar.length}
??? Chat Group : ${anuinfogc.length}
??? Chat Pribadi : ${anuinfopc.length}`
reply(infoText)
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'buygamelimit':
            case prefix+'buylimit':{
                if (args.length < 2) return reply(`Kirim perintah *${prefix}buyglimit* jumlah game limit yang ingin dibeli\n\nHarga 1 game limit = $150 balance\nPajak $1 / $10`)
                if (args[1].includes('-')) return reply(`Jangan menggunakan -`)
                if (args[1].toLowerCase() === 'infinity') return reply(`Yahaha saya ndak bisa di tipu`)
                let ane = Number(parseInt(args[1]) * 150)
                if (getBalance(sender, _money) < ane) return reply(`Balance kamu tidak mencukupi untuk pembelian ini`)
                kurangBalance(sender, ane, _money)
                givegame(sender, parseInt(args[1]), glimit)
                reply(monospace(`Pembeliaan game limit sebanyak ${args[1]} berhasil\n\nSisa Balance : $${getBalance(sender, _money)}\nSisa Game Limit : ${cekGLimit(sender, gcount, glimit)}/${gcount}`))
            }
                break

case prefix+'getpp':{
reply(mess.wait)
lexxy.sendMessage(from, { image: { url: pp_user}, caption: `Get Profile : *@${sender.split("@")[0]}*`}, { quoted: msg})
}
break

case prefix+"nickml": {


if (!q) return reply(`Contoh :\n${command} 109088431|2558`)

reply(`*Searching Username ml ????*\n${q}`)
var myID = q.split("|")[0]
var mySER = q.split("|")[1]
hikki.game.nickNameMobileLegends(myID, mySER).then( res => {
console.log(res)
reply(`*CEK NICKML*\n${res.userName}`)
});
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+"nickff":{


if (!q) return reply(`Contoh :\n${command} 239814337`)
reply(`*Searching Username ff ????*\n${q}`)
hikki.game.nickNameFreefire(q).then(det => {
console.log(det)
reply(`*CEK NICKFF*\n${det.userName}`)
});
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case "nicksupersus":{


if (!q) return reply(`Contoh :\n${command} 20431364`)
reply(`*Searching Username supersus ????*\n${q}`)
hikki.game.superSusChecker(q).then(det => {
console.log(det)
reply(`*CEK NICKSUPERSUS*\nid : ${det.id}\nname : ${det.name}`)
});
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
/*case prefix+'getmyip':
                   if (!isOwner) return reply(mess.OnlyOwner)
//addCountCmd('#getmyip', sender, _cmd)
                   axios({
                      method: 'POST',
                      url: 'https://www.atlantic-pedia.co.id/api/pulsa',
                      data: qs.stringify({
                        key: 'c34aebf5f6314445fae014b8bcc3cec9f8327d96d5b429f0e0570d152c4207bf',
                        action: 'services'
                      })
                   }).then( res => {
                      if (res.data.status === true) return reply(`Tidak perlu lagi`)
                      reply(res.data.data)
                   })
                   break*/

case prefix+'cekuser':


lexxy.sendMessage(from, {text: `Pengguna : ${pendaftar.length}`, quoted: msg})
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'emojimix': {
if (!q) return reply(`Example :\n${command} ????+????`)
		var mytext = body.slice(10)
		let [emoji1, emoji2] = mytext.split`+`
		let anu = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`)
		for (let res of anu.results) {
		    let encmedia = await lexxy.sendImageAsSticker(from, res.url, msg, { packname: packnamenya, author: authornya, categories: res.tags })
		    await fs.unlinkSync(encmedia)
		}
	    }
	    
break

case prefix+'attp':{
if (!q) return reply(`Example :\n${command} Lexxy`)
reply(mess.wait)
let anu = `https://hadi-api.herokuapp.com/api/canvas/attp?text=${q}`
let encmedia = await lexxy.sendImageAsSticker(from, anu, msg, { packname: packnamenya, author: authornya, categories: 'd' })
await fs.unlinkSync(encmedia)
}
break
case prefix+'ttp':{
if (!q) return reply(`Contoh :\n${command} Lexxy`)
let anu = `https://hadi-api.herokuapp.com/api/canvas/ttp?text=${q}`
let encmedia = await lexxy.sendImageAsSticker(from, anu, msg, { packname: packnamenya, author: authornya, categories: 'd' })
await fs.unlinkSync(encmedia)
}
break
case prefix+'base64':{
if (!q) return reply(`Example :\n${command} Lexxy-Api`)
reply(mess.wait)
var encode = q
var yogi = await fetchJson(`https://api-yogipw.herokuapp.com/api/base?type=base64&encode=${encode}`)
var textBase64 =`type : ${yogi.type}
string : ${yogi.string}
encode : ${yogi.encode}`
reply(textBase64)
}
break
case prefix+'base32':{
if (!q) return reply(`Example :\n${command} Lexxy-Api`)
reply(mess.wait)
var encode = q
var yogii = await fetchJson(`https://api-yogipw.herokuapp.com/api/base?type=base32&encode=${encode}`)
var yogi = yogii.result
var textBase32 =`type : ${yogi.type}
string : ${yogi.string}
encode : ${yogi.encode}`
reply(textBase32)
}
break
case prefix+'debase64':{
if (!q) return reply(`Example :\n${command} Lexxy-Api`)
reply(mess.wait)
var decode = q
var yogii = await fetchJson(`https://api-yogipw.herokuapp.com/api/base?type=base64&decode=${decode}`)
var yogi = yogii.result
var textDebase64 =`type : ${yogi.type}
enc : ${yogi.enc}
string : ${yogi.string}`
reply(textDebase64)
}
break
case prefix+'debase32':{
if (!q) return reply(`Example :\n${command} Lexxy-Api`)
reply(mess.wait)
var decode = q
var yogii = await fetchJson(`https://api-yogipw.herokuapp.com/api/base?type=base32&decode=${decode}`)
var yogi = yogii.result
var textDebase32 =`type : ${yogi.type}
enc : ${yogi.enc}
string : ${yogi.string}`
reply(textDebase32)
}
break
                // Anonymous Chat
                case prefix+'anonymous':
                   if (isGroup) return reply(mess.OnlyPM)
           //        addCountCmd('#anonymous', sender, _cmd)
                   var but = [
                        { buttonId: prefix+'start', buttonText: { displayText: "Search ????" }, type: 1 },
                   ]
                   var teks = `Hai ${pushname !== undefined ? pushname : 'Kak'} Selamat Datang di Anonymous Chat\n\nKetik ${prefix}search untuk mencari Teman Chat anda, atau bisa pencet tombol Search dibawah`
                   lexxy.sendMessage(from, { text: teks, footer: setting.footer, buttons: but })
                   break
                case prefix+'start': case prefix+'search':
                   if (isGroup) return reply(mess.OnlyPM)
                  // addCountCmd('#start', sender, _cmd)
                   var rumss = Object.values(anonymous).find(room => anonyCheck(sender, room))
                   var rooms = Object.values(anonymous).find(room => anonyCheck(sender, room) && room.state == 'CHATTING')
                   if (rooms) {
                     var but = [
                        { buttonId: prefix+'stop', buttonText: { displayText: "??? STOP ???" }, type: 1 },
                        { buttonId: prefix+'skip', buttonText: { displayText: "??? SKIP ???" }, type: 1 }
                     ]
                     var teks = `[??????] Kamu masih dalam sesi chat dengan partner! ???`
                     return lexxy.sendMessage(from, { text: teks, footer: setting.footer, buttons: but })
                   } else if (rumss) {
                     var teks = `[????] Mohon tunggu sedang mencari teman chat`
                     var but = [ { buttonId: prefix+'stop', buttonText: { displayText: "??? STOP ???" }, type: 1 } ]
                     return lexxy.sendMessage(from, { text: teks, footer: setting.footer, buttons: but })
                   }
                   var roomm = Object.values(anonymous).find(room => room.state == "WAITING" && !anonyCheck(sender, room))
                   if (roomm) {
                     var but = [
                       { buttonId: prefix+'stop', buttonText: { displayText: "??? STOP ???" }, type: 1 },
                       { buttonId: prefix+'skip', buttonText: { displayText: "??? SKIP ???" }, type: 1 }
                     ]
                     roomm.b = sender
                     roomm.state = "CHATTING"
                     var teks = `_Pasangan Ditemukan ????_\n${prefix}skip -- _cari pasangan baru_\n${prefix}stop -- _hentikan dialog ini_\n${prefix}sendprofil -- _kirim profile contact_`
                     await lexxy.sendMessage(roomm.a, { text: teks, footer: setting.footer, buttons: but })
                     await lexxy.sendMessage(roomm.b, { text: teks, footer: setting.footer, buttons: but })
                   } else if (!rooms) {
                     let id = + new Date
                     anonymous[id] = {
                         id,
                         a: sender,
                         b: '',
                         state: "WAITING"
                     }
                     var but = [
                       { buttonId: prefix+'stop', buttonText: { displayText: "??? STOP ???" }, type: 1 }
                     ]
                     var teks = `[????] Mohon tunggu sedang mencari teman chat`
                     await lexxy.sendMessage(from, { text: teks, footer: setting.footer, buttons: but })
                   }
                   break
                case prefix+'stop':
                   if (isGroup) return reply(mess.OnlyPM)
                //   addCountCmd('#stop', sender, _cmd)
                   var roomo = Object.values(anonymous).find(room => anonyCheck(sender, room))
                   if (!roomo) {
                     var but = [
                       { buttonId: prefix+'start', buttonText: { displayText: "???? SEARCH ????" }, type: 1 }
                     ]
                     var teks = `[??????] Kamu belum pernah mulai chat! ???`
                     await lexxy.sendMessage(from, { text: teks, footer: setting.footer, buttons: but })
                   } else {
                     var but = [
                       { buttonId: prefix+'start', buttonText: { displayText: "???? SEARCH ????" }, type: 1 }
                     ]
                     var teks = `[???] Berhasil memberhentikan chat`
                     var teks2 = `[??????] Sesi chat ini telah diberhentikan oleh teman chat kamu`
                     await lexxy.sendMessage(from, { text: teks, footer: setting.footer, buttons: but })
                     let other = anonyOther(sender, roomo)
                     if (other) await lexxy.sendMessage(other, { text: teks2, footer: setting.footer, buttons: but })
                     delete anonymous[roomo.id]
                   }
                   break
                case prefix+'next': case prefix+'skip':
                   if (isGroup) return reply(mess.OnlyPM)
                 //  addCountCmd('#next', sender, _cmd)
                   let romeo = Object.values(anonymous).find(room => anonyCheck(sender, room))
                   var but = [
                     { buttonId: prefix+'start', buttonText: { displayText: "???? SEARCH ????" }, type: 1 }
                   ]
                   if (!romeo) {
                     var teks = `[??????] Kamu belum pernah memulai chat! ???`
                     return await lexxy.sendMessage(from, { text: teks, footer: setting.footer, buttons: but })
                   } else {
                     let other = anonyOther(sender, romeo)
                     var teks1 = `[??????] Sesi chat ini telah diberhentikan oleh teman chat kamu! ???`
                     if (other) await lexxy.sendMessage(other, { text: teks1, footer: setting.footer, buttons: but })
                     delete anonymous[romeo.id]
                   }
                   let room = Object.values(anonymous).find(room => room.state == "WAITING" && !anonyCheck(sender, room))
                   if (room) {
                     var but = [
                       { buttonId: prefix+'stop', buttonText: { displayText: "??? STOP ???" }, type: 1 },
                       { buttonId: prefix+'skip', buttonText: { displayText: "??? SKIP ???" }, type: 1 }
                     ]
                     room.b = sender
                     room.state = "CHATTING"
                     var teks = `_Pasangan Ditemukan ????_\n${prefix}skip -- _cari pasangan baru_\n${prefix}stop -- _hentikan dialog ini_`
                     await lexxy.sendMessage(room.a, { text: teks, footer: setting.footer, buttons: but })
                     await lexxy.sendMessage(room.b, { text: teks, footer: setting.footer, buttons: but })
                   } else {
                     let id = + new Date
                     anonymous[id] = {
                         id,
                         a: sender,
                         b: '',
                         state: "WAITING"
                     }
                     var but = [
                       { buttonId: prefix+'stop', buttonText: { displayText: "??? STOP ???" }, type: 1 }
                     ]
                     var teks = `[????] Mohon tunggu sedang mencari teman chat`
                     await lexxy.sendMessage(from, { text: teks, footer: setting.footer, buttons: but })
                   }
                   break
                case prefix+'sendprofile': case prefix+'sendprofil':
                   if (isGroup) return reply(mess.OnlyPM)
                   let romoe = Object.values(anonymous).find(room => anonyCheck(sender, room) && room.state == 'CHATTING')
                 //  addCountCmd('#sendprofile', sender, _cmd)
                   var but = [
                     { buttonId: prefix+'start', buttonText: { displayText: "???? SEARCH ????" }, type: 1 }
                   ]
                   if (!romoe) {
                     var teks = `[??????] Kamu belum pernah memulai chat! ???`
                     await lexxy.sendMessage(from, { text: teks, footer: setting.footer, buttons: but })
                   } else {
                     let rms = Object.values(anonymous).find(room => [room.a, room.b].includes(sender) && room.state == "CHATTING")
                     var partnerJID = anonyOther(sender, rms)
                     var res = await lexxy.sendContact(partnerJID, [sender.split("@")[0]])
                     lexxy.sendMessage(from, { text: '[???] Berhasil mengirim profil ke teman chat anda!' }, { quoted: msg })
                     lexxy.sendMessage(partnerJID, { text: '[????????] Teman chat kamu memberikan kontak profil nya!' }, { quoted: res })
                   }
                   break
case prefix+'git': case prefix+'gitclone': {
if (!q) return reply('Linknya Mana?')
 reply(mess.wait)
  var regex1 = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
  var [, user, repo] = q.match(regex1) || []
  repo = repo.replace(/.git$/, '')
  var url = `https://api.github.com/repos/${user}/${repo}/zipball`
  var filename = (await fetch(url, {method: 'HEAD'})).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
  lexxy.sendMessage(from, { document: { url: url }, fileName: filename+'.zip', mimetype: 'application/zip' }, { quoted: msg })
}
  break
case prefix+'ringtone': {
  if (!q) return reply(`Contoh :\n${command} iphone`)
  reply(`Searching Ringtone ${q} ????`)
  var { ringtone } = require('./lib/scrape/scraper')
  let anu = await ringtone(q)
  var result = anu[Math.floor(Math.random() * anu.length)]
// lexxy.sendMessage(from, { audio: { url: result.audio }, mimetype: 'audio/mpeg', fileName: `${result.title}.mp3`}, { quoted: msg })
lexxy.sendMessage(from, {audio: { url: result.audio}, mimetype:'audio/mpeg', ptt:true }, {quoted:msg})
}
break
case prefix+'tts':{
var tts = await getBuffer(`https://hadi-api.herokuapp.com/api/tts?language=id&text=${q}`)
if (!q) return reply(`Contoh :\n${command} hallo`)
reply(mess.wait)
lexxy.sendMessage(from, {audio: tts, mimetype:'audio/mpeg', ptt:true }, {quoted:msg})
}
break
case prefix+'hilih':
case prefix+'halah':
case prefix+'huluh': 
case prefix+'heleh': 
case prefix+'holoh':
if (!quoted && !args[1]) reply(`Kirim/reply text dengan caption ${command}`)
var ter = command[1].toLowerCase()
var tex = quoted ? quoted.text ? quoted.text : q ? q : text : q ? q : text
reply(tex.replace(/[aiueo]/g, ter).replace(/[AIUEO]/g, ter.toUpperCase()))
addCmd(command.slice(1), 1, commund)
break
case prefix+'logo1':{
if (!q) return reply(`Contoh :\n${command} rehan|riski`)
var args1 = q.split("|")[0]
var args2 = q.split("|")[1]
reply(mess.wait)
var bepp = await getBuffer(`https://hadi-api.herokuapp.com/api/photoxy/tiktok-effect?text=${args1}&text2=${args2}`)
lexxy.sendMessage(from, { image: bepp, caption: `?? ${q}` }, {quoted:msg})
}
break
case prefix+'logo2':{
if (!q) return reply(`Contoh :\n${command} yanto`)
reply(mess.wait)
var bepp = await getBuffer(`https://hadi-api.herokuapp.com/api/textpro/neon-devil-wings?teks=${q}`)
lexxy.sendMessage(from, { image: bepp, caption: `?? ${q}` }, {quoted:msg})
}
break
case prefix+'logo3':{
if (!q) return reply(`Contoh :\n${command} yanto`)
reply(mess.wait)
var bepp = await getBuffer(`https://hadi-api.herokuapp.com/api/textpro/black-white-bear-mascot?teks=${q}`)
lexxy.sendMessage(from, { image: bepp, caption: `?? ${q}` }, {quoted:msg})
}
break
case prefix+'nulis':
if (!q) return reply(`Yang Mau Di Tulis Apaan? Titit?\n\nExample: ${command} Lexxy`)
var teks = q
reply(mess.wait)
var nulis = encodeURIComponent(teks)
var res = await axios.get(`https://dt-04.herokuapp.com/nulis?text=${nulis}`)
if (res.data.error) return reply(res.data.error)
  var buff = Buffer.from(res.data.result.split(',')[1], 'base64')
lexxy.sendMessage(from, { image: buff, caption: `Mager ya kak?????` }, { quoted: msg }).catch(e => {
  return reply('_[ ! ] Error Gagal Dalam Mendownload Dan Mengirim File_')
})
break

case prefix+'corona':
case prefix+'covid':{
if (!q) return reply(`Contoh :\n${command} malaysia`)
var covid = await fetchJson(`https://hadi-api.herokuapp.com/api/corohelp?negara=${q}`)
var ind = covid.result
let corna =`*COVID INFO*
negara : ${q}
terkonfirmasi : ${ind.terkonfirmasi}
meniggal : ${ind.meniggal}
sembuh : ${ind.sembuh}
update : ${ind.update}`
reply(corna)
}
break
case prefix+'quotesanime': {
var { quotesAnime } = require('./lib/scrape/scraper')
let anu = await quotesAnime()
console.log(anu)
var ani = anu[Math.floor(Math.random() * anu.length)]
let textAnimm =`*QUOTES-ANIME*
link : ${ani.link}
karakter : ${ani.karakter}
anime : ${ani.anime}
episode : ${ani.episode}
upload : ${ani.up_at}
quotes : ${ani.quotes}`

lexxy.sendMessage(from, { image: { url: ani.gambar }, caption: textAnimm}, { quoted: msg })
}
break
case prefix+"stalkgithub":{
if (!q) return reply(`Contoh :\n${command} Lexxy24`)
reply(mess.wait)
var nama = q
var git = await fetchJson(`https://api.github.com/users/${nama}`)
var tbGit = await getBuffer(git.avatar_url)
let textGitthub =`*STALK-GITHUB*
id : ${git.id}
login : ${git.login}
html_url : ${git.html_url}
type : ${git.type}
admin : ${git.admin}
name : ${git.name}
location : ${git.location}
bio : ${git.bio}
public_repos : ${git.public_repos}
followers : ${git.followers}
following : ${git.following}
created : ${git.created_at}
updated : ${git.updated_at}`
lexxy.sendMessage(from, { image: tbGit, caption: textGitthub }, {quoted:msg})
}
break
case prefix+'styletext':{
  if (!q) return reply(`Contoh :\n${command} Lexxy Official`)
var ttt = q
reply(mess.wait)
var { styletext } = require('./lib/scrape/scraper')
let anu = await styletext(ttt)
console.log(anu)
 teks = ` ??? *STYLE-TEXT* ???\n\n*Text Ori :* ${ttt}\n\n`
for (let i of anu) {
 teks += `*Nama :* ${i.name}\n*Result :* ${i.result}\n\n`
}
reply(teks)
}
break
case prefix+'infogempa':{
reply(mess.wait)
var anu = await fetchJson(`https://hadi-api.herokuapp.com/api/infogempa`)
var i = anu.result
var teksGem = `*INFO-GEMPA*
*waktu :* ${i.waktu}
*kordinat :* ${i.kordinat}
*getaran :* ${i.magnitudo}
*kedalaman :* ${i.kedalaman}
*lokasi :* ${i.lokasi}
*dirasakan :* ${i.dirasakan}`
reply(teksGem)
}
break
case prefix+'font':{
var font = await fetchJson(`https://hadi-api.herokuapp.com/api/font?teks=${q}`)
if (font.Error) return reply(`Contoh :\n${command} Lexxy`)
reply(font.result)
}
break
case prefix+'font2':{
var font = await fetchJson(`https://hadi-api.herokuapp.com/api/font2?teks=${q}`)
if (font.Error) return reply(`Contoh :\n${command} Lexxy`)
reply(font.result)
}
break
case prefix+'ssweb':
if (!q) return reply(`Format Invalid Atau Url Yang Kamu Ketik Tidak Di Temukan !!\n\nContoh :\n${command} google.com`)
var web = `https://hadi-api.herokuapp.com/api/ssweb?url=${q}&device=desktop&full=on`
lexxy.sendMessage(from, { image: { url: web }, caption: 'Done!!' }, {quoted:msg})
break

case prefix+'lirik':
if (args.length < 2) return reply(`Kirim perintah ${command} judul lagu`)
                   reply(mess.wait)
                   
                   Musikmatch(q).then(async(data) => {
                     var teks = `*${data.result.judul} - ${data.result.penyanyi}*\n\n${data.result.lirik}`
                     lexxy.sendMessage(from, { image: { url: data.result.thumb }, caption: teks }, { quoted: msg })
                     
                   }).catch(() => reply(`Judul lagu tidak ditemukan`))
                   break

case prefix+'pinterest':{
if (!q) return reply(`Contoh :\n${command} anime`)
var ttt = q
reply(mess.wait)
var { pinterest } = require('./lib/scrape/scraper')
let anu = await pinterest(ttt)
console.log(anu)
 var images = anu[Math.floor(Math.random() * anu.length)]
 
lexxy.sendMessage(from, {image: { url: images }, caption: `*Pinterest Search*\n???? *Judul* : ${ttt}\n*???? Media Url* : ${images}`}, { quoted: msg })
}
break
case prefix+'wikimedia':{
if (!q) return reply(`Contoh :\n${command} berita`)
var ttt = q
reply(mess.wait)
var { wikimedia } = require('./lib/scrape/scraper')
let anu = await wikimedia(ttt)
console.log(anu)
var kokanjay = anu[Math.floor(Math.random() * anu.length)].image
teks = ` ??? *WIKIMEDIA-SEARCH* ???\n\n*title :* ${ttt}\n\n`
for (let i of anu) {
teks += `title : ${i.title}\nsource : ${i.source}\nimage : ${i.image}\n\n`
}
lexxy.sendMessage(from, { image: { url: kokanjay }, caption: teks }, {quoted:msg})
}
break
case prefix+'cerpen': {
if (!q) return reply(`Contoh :\n${command} kuda lepas`)
  var ttt = q
reply(mess.wait)
var { cerpen } = require('./lib/scrape/scraper')
let anu = await cerpen(ttt)
console.log(anu)
let textCerpen=`*CERITA PENDEK*
title: ${anu.title}
author: ${anu.author}
kategori: ${anu.kategori}
lolos: ${anu.lolos}
cerita: ${anu.cerita}`
reply(textCerpen)
//var result = anu[Math.floor(Math.random() * anu.length)]
// lexxy.sendMessage(from, { audio: { url: result.audio }, mimetype: 'audio/mpeg', fileName: `${result.title}.mp3`}, { quoted: msg })
//lexxy.sendMessage(from, {audio: { url: result.audio}, mimetype:'audio/mpeg', ptt:true }, {quoted:msg})
}
break
case prefix+'google': {
  if (!q) return reply(`Example :\n${command} Elon Musk`)
  reply(mess.wait)
  let google = require('google-it')
  google({'query': q}).then(res => {
  let teks = `*Google Search From : ${q}*\n\n`
  for (let g of res) {
  teks += `???? *Title* : ${g.title}\n`
  teks += `???? *Description* : ${g.snippet}\n`
  teks += `???? *Link* : ${g.link}\n\n\n`
  } 
  reply(teks)
  })
}
  break
case prefix+'gimage': {
 if (!q) return reply(`Example : \n${command} tsunade`)
  reply(mess.wait)
  let gis = require('g-i-s')
  gis(q, async (error, result) => {
  var n = result
 var images = n[Math.floor(Math.random() * n.length)].url
  lexxy.sendMessage(from, { image: { url: images }, caption: `*Google Image*\n???? *Judul* : ${q}\n*???? Media Url* : ${images}`}, { quoted: msg })
 })
}
  break
case prefix+'tourl':
if (!isQuotedImage) return reply(`reply foto dengan pesan ${command}`)
reply(mess.wait)
if (isImage || isQuotedImage){
let mediat = await downloadAndSaveMediaMessage('image', `./media/${sender}`)
const fd = new FormData();
fd.append('file', fs.readFileSync(mediat), '.tmp', '.jpg')
fetch('https://telegra.ph/upload', {
method: 'POST',
body: fd
}).then(res => res.json())
.then((json) => {
reply('Proses Convert..')
reply(`https://telegra.ph${json[0].src}`)
if (fs.existsSync(mediat)) fs.unlinkSync(mediat)
 })
}
break
case prefix+'hitler':
if (!isQuotedImage) return reply(`reply foto dengan pesan ${command}`)
reply(mess.wait)
if (isImage || isQuotedImage){
let mediat = await downloadAndSaveMediaMessage('image', `./media/${sender}`)
const fd = new FormData();
fd.append('file', fs.readFileSync(mediat), '.tmp', '.jpg')
fetch('https://telegra.ph/upload', {
method: 'POST',
body: fd
}).then(res => res.json())
.then((json) => {
reply('Proses Convert..')
let media = `https://api-yogipw.herokuapp.com/api/imgedit/hitler?url=https://telegra.ph${json[0].src}`
lexxy.sendMessage(from, { image: { url: media }, caption: 'done!!'}, {quoted:msg})
if (fs.existsSync(mediat)) fs.unlinkSync(mediat)
 })
}
break
case prefix+'police':
if (!isQuotedImage) return reply(`reply foto dengan pesan ${command}`)
reply(mess.wait)
if (isImage || isQuotedImage){
let mediat = await downloadAndSaveMediaMessage('image', `./media/${sender}`)
const fd = new FormData();
fd.append('file', fs.readFileSync(mediat), '.tmp', '.jpg')
fetch('https://telegra.ph/upload', {
method: 'POST',
body: fd
}).then(res => res.json())
.then((json) => {
reply('Proses Convert..')
let media = `https://api-yogipw.herokuapp.com/api/imgedit/police?url=https://telegra.ph${json[0].src}`
lexxy.sendMessage(from, { image: { url: media }, caption: 'done!!'}, {quoted:msg})
if (fs.existsSync(mediat)) fs.unlinkSync(mediat)
 })
}
break
case prefix+'setthumb':{
if (!isOwner) return reply(mess.OnlyOwner)
if (!isQuotedImage) return reply(`reply foto dengan pesan ${command}`)
reply(mess.wait)
if (isImage || isQuotedImage){
let mediat = await downloadAndSaveMediaMessage('image', `./media/logo.jpg`)
}
reply('Sukses Ganti Thumbnail Bot')
}
break
case prefix+'petimati':
if (!isQuotedImage) return reply(`reply foto dengan pesan ${command}`)
reply(mess.wait)
if (isImage || isQuotedImage){
let mediat = await downloadAndSaveMediaMessage('image', `./media/${sender}`)
const fd = new FormData();
fd.append('file', fs.readFileSync(mediat), '.tmp', '.jpg')
fetch('https://telegra.ph/upload', {
method: 'POST',
body: fd
}).then(res => res.json())
.then((json) => {
reply('Proses Convert..')
let media = `https://api-yogipw.herokuapp.com/api/imgedit/petimati?url=https://telegra.ph${json[0].src}`
lexxy.sendMessage(from, { image: { url: media }, caption: 'done!!'}, {quoted:msg})
if (fs.existsSync(mediat)) fs.unlinkSync(mediat)
 })
}
break
case prefix+'yasin':
if (!isQuotedImage) return reply(`reply foto dengan pesan ${command}`)
reply(mess.wait)
if (isImage || isQuotedImage){
let mediat = await downloadAndSaveMediaMessage('image', `./media/${sender}`)
const fd = new FormData();
fd.append('file', fs.readFileSync(mediat), '.tmp', '.jpg')
fetch('https://telegra.ph/upload', {
method: 'POST',
body: fd
}).then(res => res.json())
.then((json) => {
reply('Proses Convert..')
let media = `https://hadi-api.herokuapp.com/api/canvas/yasin?name=pedofil&url=https://telegra.ph${json[0].src}`
lexxy.sendMessage(from, { image: { url: media }, caption: 'done!!'}, {quoted:msg})
if (fs.existsSync(mediat)) fs.unlinkSync(mediat)
 })
}
break
case prefix+'putin':
if (!isQuotedImage) return reply(`reply foto dengan pesan ${command}`)
reply(mess.wait)
if (isImage || isQuotedImage){
let mediat = await downloadAndSaveMediaMessage('image', `./media/${sender}`)
const fd = new FormData();
fd.append('file', fs.readFileSync(mediat), '.tmp', '.jpg')
fetch('https://telegra.ph/upload', {
method: 'POST',
body: fd
}).then(res => res.json())
.then((json) => {
reply('Proses Convert..')
let media = `https://api-yogipw.herokuapp.com/api/imgedit/putin?url=https://telegra.ph${json[0].src}`
lexxy.sendMessage(from, { image: { url: media }, caption: 'done!!'}, {quoted:msg})
if (fs.existsSync(mediat)) fs.unlinkSync(mediat)
 })
}
break
case prefix+'discordblue':
if (!isQuotedImage) return reply(`reply foto dengan pesan ${command}`)
reply(mess.wait)
if (isImage || isQuotedImage){
let mediat = await downloadAndSaveMediaMessage('image', `./media/${sender}`)
const fd = new FormData();
fd.append('file', fs.readFileSync(mediat), '.tmp', '.jpg')
fetch('https://telegra.ph/upload', {
method: 'POST',
body: fd
}).then(res => res.json())
.then((json) => {
reply('Proses Convert..')
let media = `https://api-yogipw.herokuapp.com/api/imgedit/discordblue?url=https://telegra.ph${json[0].src}`
lexxy.sendMessage(from, { image: { url: media }, caption: 'done!!'}, {quoted:msg})
if (fs.existsSync(mediat)) fs.unlinkSync(mediat)
 })
}
break
case prefix+'discordblack':
if (!isQuotedImage) return reply(`reply foto dengan pesan ${command}`)
reply(mess.wait)
if (isImage || isQuotedImage){
let mediat = await downloadAndSaveMediaMessage('image', `./media/${sender}`)
const fd = new FormData();
fd.append('file', fs.readFileSync(mediat), '.tmp', '.jpg')
fetch('https://telegra.ph/upload', {
method: 'POST',
body: fd
}).then(res => res.json())
.then((json) => {
reply('Proses Convert..')
let media = `https://api-yogipw.herokuapp.com/api/imgedit/discordblack?url=https://telegra.ph${json[0].src}`
lexxy.sendMessage(from, { image: { url: media }, caption: 'done!!'}, {quoted:msg})
if (fs.existsSync(mediat)) fs.unlinkSync(mediat)
 })
}
break
case prefix+'smeme':
if (!isQuotedImage) return reply(`reply foto dengan pesan ${command}`)
reply(mess.wait)
var text1NANG = q.split("|")[0]
var text2NANG = q.split("|")[1]
if (isImage || isQuotedImage){
let mediat = await downloadAndSaveMediaMessage('image', `./media/${sender}`)
const fd = new FormData();
fd.append('file', fs.readFileSync(mediat), '.tmp', '.jpg')
fetch('https://telegra.ph/upload', {
method: 'POST',
body: fd
}).then(res => res.json())
.then((json) => {
reply('Proses Convert..')

let media = `https://api.memegen.link/images/custom/${text1NANG}/${text2NANG}.png?background=https://telegra.ph${json[0].src}`

lexxy.sendMessage(from, { image: { url: media }, caption: '?? Smeme'}, {quoted:msg})
if (fs.existsSync(mediat)) fs.unlinkSync(mediat)
 })
}
  break
case prefix+'resize':
if (!isQuotedImage) return reply(`reply foto dengan caption\n${command}`)
reply(mess.wait)
if (isImage || isQuotedImage){
let mediat = await downloadAndSaveMediaMessage('image', `./media/${sender}`)
const fd = new FormData();
fd.append('file', fs.readFileSync(mediat), '.tmp', '.jpg')
fetch('https://telegra.ph/upload', {
method: 'POST',
body: fd
}).then(res => res.json())
.then((json) => {
reply('Proses Convert..')
let media  = `https://hadi-api.herokuapp.com/api/canvas/image/resize?width=200&height=200&url=https://telegra.ph${json[0].src}`
lexxy.sendMessage(from, { image: { url: media }, caption: '?? Resize'}, {quoted:msg})
if (fs.existsSync(mediat)) fs.unlinkSync(mediat)
 })
}
break

case prefix+'toimg': case prefix+'toimage':
                case prefix+'tovid': case prefix+'tovideo':
                   
                   if (!isQuotedSticker) return reply(`Reply stikernya!`)
                   var stream = await downloadContentFromMessage(msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
                   var buffer = Buffer.from([])
                   for await(const chunk of stream) {
                     buffer = Buffer.concat([buffer, chunk])
                   }
                   var rand1 = 'media/'+getRandom('.webp')
                   var rand2 = 'media/'+getRandom('.png')
                   fs.writeFileSync(`./${rand1}`, buffer)
                   if (isQuotedSticker && msg.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.isAnimated !== true) {
                     reply(mess.wait)
                     exec(`ffmpeg -i ./${rand1} ./${rand2}`, (err) => {
                       fs.unlinkSync(`./${rand1}`)
                       if (err) return reply(mess.error.api)
                       lexxy.sendMessage(from, {caption: `*Sticker Convert To Image!*`, image: fs.readFileSync(`./${rand2}`) }, { quoted: fkontak })
                       
                       fs.unlinkSync(`./${rand2}`)
                     })
                   } else {
                     reply(mess.wait)
                     webp2mp4File(`./${rand1}`).then(async(data) => {
                       fs.unlinkSync(`./${rand1}`)
                       lexxy.sendMessage(from, {caption: `*Sticker Convert To Video!*`, video: await getBuffer(data.data) }, { quoted: fkontak })
                       
                     })
                   }
                   addCmd(command.slice(1), 1, commund)
			break
case prefix+'sticker': case prefix+'stiker': case prefix+'s':
			    if (isImage || isQuotedImage) {
		           var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
			       var buffer = Buffer.from([])
			       for await(const chunk of stream) {
			          buffer = Buffer.concat([buffer, chunk])
			       }
			       reply(mess.wait)
			       var rand1 = 'sticker/'+getRandom('.jpg')
			       var rand2 = 'sticker/'+getRandom('.webp')
			       fs.writeFileSync(`./${rand1}`, buffer)
			       ffmpeg(`./${rand1}`)
				.on("error", console.error)
				.on("end", () => {
				  exec(`webpmux -set exif ./sticker/data.exif ./${rand2} -o ./${rand2}`, async (error) => {
				    lexxy.sendMessage(from, { sticker: fs.readFileSync(`./${rand2}`) }, { quoted: msg })
				    
					fs.unlinkSync(`./${rand1}`)
			            fs.unlinkSync(`./${rand2}`)
			          })
				 })
				.addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"])
				.toFormat('webp')
				.save(`${rand2}`)
			    } else if (isVideo || isQuotedVideo) {
				 var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
				 var buffer = Buffer.from([])
				 for await(const chunk of stream) {
				   buffer = Buffer.concat([buffer, chunk])
				 }
			     var rand1 = 'sticker/'+getRandom('.mp4')
				 var rand2 = 'sticker/'+getRandom('.webp')
			         fs.writeFileSync(`./${rand1}`, buffer)
			         ffmpeg(`./${rand1}`)
				  .on("error", console.error)
				  .on("end", () => {
				    exec(`webpmux -set exif ./sticker/data.exif ./${rand2} -o ./${rand2}`, async (error) => {
				      lexxy.sendMessage(from, { sticker: fs.readFileSync(`./${rand2}`) }, { quoted: msg })
				      
					  fs.unlinkSync(`./${rand1}`)
				      fs.unlinkSync(`./${rand2}`)
				    })
				  })
				 .addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"])
				 .toFormat('webp')
				 .save(`${rand2}`)
                } else {
			       reply(`Kirim gambar/vidio dengan caption ${command} atau balas gambar/vidio yang sudah dikirim\nNote : Maximal vidio 10 detik!`)
			    }
			    addCmd(command.slice(1), 1, commund)
			break
case prefix+'emojimix2': {
	    if (!q) return reply(`Example :\n${command} ????`)
	    var TextNyaStick = body.slice(11)
		var anu = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${TextNyaStick}`)
	  	for (let res of anu.results) {
		   let encmedia = await lexxy.sendImageAsSticker(from, res.url, msg, { packname: packnamenya, author: authornya, categories: res.tags })
		await fs.unlinkSync(encmedia)
		}
	    }
	    
break
case prefix+'menu2':{
const buttons = [
  {buttonId: '#rules', buttonText: {displayText: 'Rules'}, type: 1},
  {buttonId: '#donasi', buttonText: {displayText: 'Donasi'}, type: 1},
  {buttonId: '#owner', buttonText: {displayText: 'Owner'}, type: 1}
  ]

const buttonMessageh = {

    text: `
    _*Selamat ${ucapanWaktu} ${pushname}*_
    
Berikut Info Server & Info User

*INFO SERVER*
 Library : *Baileys-MD*.
 Global Hit : ${lordLexxy.value}
 Total Pengguna : ${pendaftar.length}
 Waktu : ${tanggal}
 Jam : ${jam}
 
 Name : ${pushname}
 Tag : @${sender.split("@")[0]}
 Status : ${isOwner ? 'Owner':'User'}
 Balance : $${getBalance(sender, _money)}
 Limit Game : ${cekGLimit(sender, gcount, glimit)}

*Runtime Bot*:
${runtime(process.uptime())}
 
${menuall(sender, prefix, pushname, ucapanWaktu, tanggal, jam, isOwner)}

*THANKS TO*
_> Rwtone / irfan_
_> Yogi-Pw_
_> Hadi Api's_
_> My Subscribers_
_> Lexxy Official_`,

    footer: footxt,
    buttons: buttons,
    headerType: 1
    }
    
const sendMsg = await lexxy.sendMessage(from, buttonMessageh)
}
break
case prefix+'owner': case prefix+'dev':
sendContact(from, ownerNumber.split('@s.whatsapp.net')[0], ownerName, msg)
.then((res) => lexxy.sendMessage(from, { text: 'Itu Nomor Owner Kak.' }, {quoted: res}))
addCmd(command.slice(1), 1, commund)
addHit(sender, command)
break
case prefix+'tes':
case prefix+'runtime': case prefix+'ping':{
if (!isOwner && !isGroupAdmins) return ('Hanya Bisa Digunakan Oleh Admin')
let timestamp = speed()
let latensi = speed() - timestamp
let respon = `Kecepatan Respon ${latensi.toFixed(4)} _Second_ \n\nRuntime : ${runtime(process.uptime())}`
reply(respon)
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)
limitAdd(sender, glimit)
break
case prefix+'dashboard': case prefix+'db':{

let totalhit = await fetchJson(`https://api.countapi.xyz/hit/Lexxy/visits`)
let hitbiasa = await fetchJson(`https://api.countapi.xyz/hit/Lexxy${moment.tz('Asia/Jakarta').format('DDMMYYYY')}/visits`)

let listpcnya = await store.chats.all().filter(v => v.id.endsWith('.net')).map(v => v)
let listgcnya = await store.chats.all().filter(v => v.id.endsWith('@g.us')).map(v => v.id)

var jumlahCmd = commund.length
if (jumlahCmd > 999) jumlahCmd = 999

teks = `\n*DASHBOARD*\n_Visitor Hit : ${totalhit.value}_\n_Global Hit : ${hitbiasa.value}_\n_Chat Pribadi : ${listpcnya.length}_\n_Chat Group : ${listgcnya.length}_\n\n*COMMAND*`
for (let i = 0; i < jumlahCmd ; i ++) {
teks += `\n_#${commund[i].id} = ${commund[i].total}_`
}
reply(teks)
}
break
/*
case prefix+"komplain":{
if (!q) return reply(`*Contoh :*\n${command} bang proses pesanan ini`)
var textKomplain = `*KOMPLAIN USER*\n*ID :* ${sender.split("@")[0]}\n*Saldo :* Rp.${getMoney(`${sender.split("@")[0]}@s.whatsapp.net`, balance)}\n*Catatan : ${q}*`
lexxy.sendMessage("6283834558105@s.whatsapp.net", { text: `${textKomplain}`, quoted: msg}) 
reply(`Sukses Komplain Ke Owner.`)
}
break
*/
//?????????????????????????????????????????????[ STORE MENU ]???????????????????????????????????????????????????//
        case prefix+'shop': case prefix+'list':
        
            if (!isGroup) return reply(mess.OnlyGrup)
            if (db_respon_list.length === 0) return reply(`Belum ada list message di database`)
            if (!isAlreadyResponListGroup(from, db_respon_list)) return reply(`Belum ada list message yang terdaftar di group ini`)
            var arr_rows = [];
            for (let x of db_respon_list) {
                if (x.id === from) {
                    arr_rows.push({
                        title: x.key,
                        rowId: x.key
                    })
                }
            }
            var listMsg = {
                text: `Hi @${sender.split("@")[0]}`,
                buttonText: 'Click Here!',
                footer: `*List From ${groupName}*\n\n??? ${jam}\n???? ${tanggal}`,
                mentions: [sender],
                sections: [{
                    title: groupName, rows: arr_rows
                }]
            }
            lexxy.sendMessage(from, listMsg)
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)
break
        case prefix+'addlist':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            var args1 = q.split("@")[0]
            var args2 = q.split("@")[1]                
            if (!q.includes("@")) return reply(`Gunakan dengan cara ${command} *key@response*\n\n_Contoh_\n\n${command} tes@apa`)
            if (isAlreadyResponList(from, args1, db_respon_list)) return reply(`List respon dengan key : *${args1}* sudah ada di group ini.`)
            if (isImage || isQuotedImage) {
                let media = await downloadAndSaveMediaMessage('image', `./media/${sender}`)
                const fd = new FormData();
                fd.append('file', fs.readFileSync(media), '.tmp', '.jpg')
                fetch('https://telegra.ph/upload', {
                    method: 'POST',
                    body: fd
                }).then(res => res.json())
                    .then((json) => {
                        addResponList(from, args1, args2, true, `https://telegra.ph${json[0].src}`, db_respon_list)
                        reply(`Berhasil menambah List menu *${args1}*`)
                        if (fs.existsSync(media)) fs.unlinkSync(media)
                    })
            } else {
                addResponList(from, args1, args2, false, '-', db_respon_list)
                reply(`Berhasil menambah List menu : *${args1}*`)
            }
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
        case prefix+'dellist':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (db_respon_list.length === 0) return reply(`Belum ada list message di database`)
            if (!q) return reply(`Gunakan dengan cara ${command} *key*\n\n_Contoh_\n\n${command} hello`)
            if (!isAlreadyResponList(from, q, db_respon_list)) return reply(`List respon dengan key *${q}* tidak ada di database!`)
            delResponList(from, q, db_respon_list)
            reply(`Sukses delete list message dengan key *${q}*`)
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'listgc': {
let anu = await store.chats.all().filter(v => v.id.endsWith('@g.us')).map(v => v.id)
let teks = `     ??? List Group Chat ???\n\nTotal List Group Bot : ${anu.length}`
for (let i of anu) {
 let metadata = await lexxy.groupMetadata(i)
 if (metadata.owner === "undefined") {
var loldd = false
 } else {
var loldd = metadata.owner
 }
 teks += `\n\nName : ${metadata.subject ? metadata.subject : "undefined"}\nOwner : ${loldd ? '@' + loldd.split("@")[0] : "undefined"}\nID : ${metadata.id ? metadata.id : "undefined"}\nDibuat : ${metadata.creation ? moment(metadata.creation * 1000).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss') : "undefined"}\nMember : ${metadata.participants.length ? metadata.participants.length : "undefined"}`
}
reply(teks)
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'listpc': {
let anu = await store.chats.all().filter(v => v.id.endsWith('.net')).map(v => v)
let teks = `     ??? List Personal Chat ???\n\nTotal Chat Pribadi : ${anu.length}`
for (let i of anu) {
 teks += `\n\nProfile : @${i.id.split('@')[0]}\nChat : ${i.unreadCount}\nLastchat : ${moment(i.conversationTimestamp * 1000).tz("Asia/Jakarta").format("DD/MM/YYYY HH:mm:ss")}`
}
reply(teks)
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'mediafire':
if (!q) return reply(`*FORMAT MEDIAFIRE DOWNLOAD*\nExample:\n${command} URL\n\nContoh:\n${command} https://www.mediafire.com/file/4jzmc4boquizy0n/HAPUS_CONFIG_FF_MAX.7z/file`)

var { mediafireDl } = require('./lib/scrape/mediafire')

var linknya = q
const baby1 = await mediafireDl(linknya)
var result4 = `*MEDIAFIRE DOWNLOAD*	
Judul : ${baby1[0].nama}
Type : ${baby1[0].mime}
Size : ${baby1[0].size}
Link : ${baby1[0].link}
			
_Sedang Mengirim file..._`

reply(result4)
lexxy.sendMessage(from, { document : { url : baby1[0].link}, fileName : baby1[0].nama, mimetype: baby1[0].mime }, { quoted : msg }) 
addCmd(command.slice(1), 1, commund)
			break
case prefix+'ytmp4': case prefix+'mp4':
			   if (!q) return reply(`Kirim perintah ${command} https://youtube.com/watch?v=e00w_clLkS0`)
		var datah = await fetchJson(`https://hadi-api.herokuapp.com/api/yt2/video?url=${q}`)
		var data = datah.result
                var txtt = `*YOUTUBE DOWNLOADER*\n\n*??? Title :* ${data.title}\n*??? Quality :* ${data.resolution}\n*??? Size :* ${data.size}\n*??? Type : ${data.ext}*\n*??? Url Source :* ${args[1]}\n\n_Sedang Mengirim Media..._`
                var teks = `Done!`
                lexxy.sendMessage(from, { image: { url: data.thumb }, caption: txtt }, { quoted: msg })
                lexxy.sendMessage(from, { video: { url: data.download_video }, caption: teks }, { quoted: msg })
				addCmd(command.slice(1), 1, commund)
			break
case prefix+'ytmp3': case prefix+'mp3':
			   if (!q) return reply(`Kirim perintah ${command} https://youtube.com/watch?v=e00w_clLkS0`)
		var datah = await fetchJson(`https://hadi-api.herokuapp.com/api/yt2/audio?url=${q}`)
		var data = datah.result
                var txtt = `*YOUTUBE DOWNLOADER*\n\n*??? Title :* ${data.title}\n*??? Quality :* ${data.resolution}\n*??? Size :* ${data.size}\n*??? Type :* ${data.ext}\n*??? Url Source :* ${args[1]}\n\n_Sedang Mengirim Media..._`
                var teks = `Done!`
                lexxy.sendMessage(from, { image: { url: data.thumb }, caption: txtt }, { quoted: msg })
                lexxy.sendMessage(from, { audio: { url: data.download_audio}, mimetype: 'audio/mpeg', fileName: `${data.title}.mp3` }, { quoted:msg })
				addCmd(command.slice(1), 1, commund)
			break
case prefix+'musik':{
if (!q) return reply(`contoh :\n${command} dj angel baby`)
reply(`Mencari Musik.. ${q}`)
var laguuu = q
var mus = await fetchJson(`https://hadi-api.herokuapp.com/api/soundcloud/play?query=${laguuu}`)
var judul = mus.result.title
var thumbMusk = await getBuffer(mus.result.thumbnail)
var linkori = mus.result.originalLink
var laguMusk = mus.result.download
let textMusk =`*PLAY MUSIK SOUNDCLOUD*
title : ${judul}
source : ${linkori}

segeralah buka link result sebelum kadaluarsa !
`
lexxy.sendMessage(from, { image: thumbMusk, caption: textMusk }, { quoted:msg })
lexxy.sendMessage(from, { audio: { url: laguMusk}, mimetype: 'audio/mpeg', fileName: `${mus.result.title}.mp3` }, { quoted:msg })
}
break
case prefix+'soundcloud':{
if (!q) return reply(`Contoh :\n${command} https://m.soundcloud.com/dhproduction-indonesia/hingga-tua-bersama`)
var url = q
reply(mess.wait)
var soundcd = await fetchJson(`https://hadi-api.herokuapp.com/api/soundcloud/download?url=${url}`)
var thumbCD = await getBuffer(soundcd.result.thumbnail)
var textCDnya = `*SOUNDCLOUD-DOWNLOAD*\njudul : ${soundcd.result.title}\nsource : ${url}`
lexxy.sendMessage(from, { image: thumbCD, caption: textCDnya}, { quoted: msg})
lexxy.sendMessage(from, { audio: { url: soundcd.result.download }, mimetype: 'audio/mpeg', fileName: `${soundcd.result.judul}`}, { quoted: msg})
}
break

case prefix+'play':
 if (!q) return reply(`contoh :\n${command} dj angel baby`)
reply(`Searching.. ${q}`)
var yts = require("yt-search")
var search = await yts(q)
var anu = search.videos[Math.floor(Math.random() * search.videos.length)]
var buf = await getBuffer(anu.thumbnail)
var wm = `?? Created By Lexxy Official`

var buttonplayny = [
{buttonId: `${prefix}ytmp3 ${anu.url}`, buttonText: {displayText: 'Audio'}, type: 1},
{buttonId: `${prefix}ytmp4 ${anu.url}`, buttonText: {displayText: 'Video'}, type: 1}
                ]
                var buttonMessage = {
                    image: { url: anu.thumbnail },
                    caption: `*PLAYING YOUTUBE*
??? judul : ${anu.title}
??? channel : ${anu.author.name}
??? durasi : ${anu.timestamp}
??? uploader ${anu.ago}
??? views : ${anu.views}

Source Url :
${anu.url}`,
                    footer: 'Silahkan pilih media dibawah.',
                    buttons: buttonplayny,
                    headerType: 4
                }
lexxy.sendMessage(from, buttonMessage, { quoted: msg })
break
        case prefix+'updatelist': case prefix+'update':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            var args1 = q.split("@")[0]
            var args2 = q.split("@")[1]
            if (!q.includes("@")) return reply(`Gunakan dengan cara ${command} *key@response*\n\n_Contoh_\n\n${command} tes@apa`)
            if (!isAlreadyResponListGroup(from, db_respon_list)) return reply(`Maaf, untuk key *${args1}* belum terdaftar di group ini`)
            if (isImage || isQuotedImage) {
                let media = await downloadAndSaveMediaMessage('image', `./media/${sender}`)
                const fd = new FormData();
                fd.append('file', fs.readFileSync(media), '.tmp', '.jpg')
                fetch('https://telegra.ph/upload', {
                    method: 'POST',
                    body: fd
                }).then(res => res.json())
                    .then((json) => {
                        updateResponList(from, args1, args2, true, `https://telegra.ph${json[0].src}`, db_respon_list)
                        reply(`Berhasil update List menu : *${args1}*`)
                        if (fs.existsSync(media)) fs.unlinkSync(media)
                    })
            } else {
                updateResponList(from, args1, args2, false, '-', db_respon_list)
                reply(`Berhasil update List menu : *${args1}*`)
            }
            break
        case prefix+'tambah':
            if (args.length < 3) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
            var nilai_one = Number(args[1])
            var nilai_two = Number(args[2])
            reply(`${nilai_one + nilai_two}`)
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
        case prefix+'kurang':
            if (args.length < 3) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
            var nilai_one = Number(args[1])
            var nilai_two = Number(args[2])
            reply(`${nilai_one - nilai_two}`)
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)
break
        case prefix+'kali':
            if (args.length < 3) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
            var nilai_one = Number(args[1])
            var nilai_two = Number(args[2])
            reply(`${nilai_one * nilai_two}`)
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
        case prefix+'bagi':
            if (args.length < 3) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
            var nilai_one = Number(args[1])
            var nilai_two = Number(args[2])
            reply(`${nilai_one / nilai_two}`)
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case 'p': case 'proses':
            if (!isGroup) return ('Hanya Dapat Digunakan Gi Group')
            if (!isOwner && !isGroupAdmins) return ('Hanya Bisa Digunakan Oleh Admin')
            if (!isQuotedMsg) return ('Reply Pesanannya!')
            let proses = `??? *TRANSAKSI PENDING* ???\n\n\`\`\`???? TANGGAL : ${tanggal}\n??? JAM     : ${jam}\n??? STATUS  : Pending\`\`\`\n\n???? Catatan :\n${quotedMsg.chats}\n\nPesanan @${quotedMsg.sender.split("@")[0]} sedang di proses!`
            const getTextP = getTextSetProses(from, set_proses);
            if (getTextP !== undefined) {
                mentions(getTextP.replace('pesan', quotedMsg.chats).replace('nama', quotedMsg.sender.split("@")[0]).replace('jam', jam).replace('tanggal', tanggal), [quotedMsg.sender], true)
            } else {
//lexxy.sendMessage(`6285878313791@s.whatsapp.net`, {text: proses });
   mentions(proses, [quotedMsg.sender], true)
            }
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
        case 'd': case 'done':
            if (!isGroup) return ('Hanya Dapat Digunakan Gi Group')
            if (!isOwner && !isGroupAdmins) return ('Hanya Bisa Digunakan Oleh Admin')
            if (!isQuotedMsg) return ('Reply Pesanannya!')
           let sukses = `??? *TRANSAKSI BERHASIL* ???\n\n\`\`\`???? TANGGAL : ${tanggal}\n??? JAM     : ${jam}\n??? STATUS  : Berhasil\`\`\`\n\nTerimakasih @${quotedMsg.sender.split("@")[0]} Next Order ya????`
            const getTextD = getTextSetDone(from, set_done);
            if (getTextD !== undefined) {
                mentions(getTextD.replace('pesan', quotedMsg.chats).replace('nama', quotedMsg.sender.split("@")[0]).replace('jam', jam).replace('tanggal', tanggal), [quotedMsg.sender], true);
            } else {
//await lexxy.sendMessage(`${args[1]}@s.whatsapp.net`, {text: sukses });
   mentions(sukses, [quotedMsg.sender], true)
   }
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
// SET WELCOME
case prefix+'setwelcome':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!q) return reply(`Gunakan dengan cara ${command} *teks_welcome*\n\n_Contoh_\n\n${command} Hallo @user\nSelamat Datang Di @group\n\n*Jangan lupa intro ya :*\nNama :\nKelas :\nUmur : \nStatus : \n\n_*Sering baca deskripsi.*_`)

if (isSetWelcome(from, set_welcome_group)) return reply(`Set Welcome already active`)
addSetWelcome(q, from, set_welcome_group)
reply(`Successfully Set text Welcome!`)
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'changewelcome':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!q) return reply(`Gunakan dengan cara ${command} *teks_welcome*\n\n_Contoh_\n\n${command} Hallo @user\nSelamat Datang Di @group\n\n*Jangan lupa intro ya :*\nNama :\nKelas :\nUmur : \nStatus : \n\n_*Sering baca deskripsi.*_`)
changeSetWelcome(q, from, set_welcome_group)
reply(`Successfully Change text Welcome!`)
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'delwelcome':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!isSetWelcome(from, set_welcome_group)) return reply(`Welcome Belum Di Setting\nSilahkan Ketik ${prefix}setwelcome`)
removeSetWelcome(from, set_welcome_group)
reply(`Successfully Delset text Welcome!`)
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'getwelcome':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!isSetWelcome(from, set_welcome_group)) return reply(`Welcome Belum Di Setting\nSilahkan Ketik ${prefix}setwelcome`)
reply(`*TEXT WELCOME*\n${getTextSetWelcome(from, set_welcome_group)}`)
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'hit':{
reply(`*TOTAL HIT : ${lordLexxy.value}*`)
}
break
// SET LEFT
case prefix+'setleft':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!q) return reply(`Gunakan dengan cara ${command} *teks_left*\n\n_Contoh_\n\n${command} Sayonara @user\nTelah Meninggalkan Grup @group\n`)
if (isSetLeft(from, set_left_db)) return reply(`Set Left already active`)
addSetLeft(q, from, set_left_db)
reply(`Successfully Set text Left!`)
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'changeleft':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!q) return reply(`Gunakan dengan cara ${command} *teks_left*\n\n_Contoh_\n\n${command} Sayonara @user\nTelah Meninggalkan Grup @group\n`)
changeSetLeft(q, from, set_left_db)
reply(`Successfully Change text Self!`)
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'delleft':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!isSetLeft(from, set_left_db)) return reply(`Welcome Belum Di Setting\nSilahkan Ketik ${prefix}setwelcome`)
removeSetLeft(from, set_left_db)
reply(`Successfully Delset text Left!`)
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'getleft':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!isSetLeft(from, set_left_db)) return reply(`Welcome Belum Di Setting\nSilahkan Ketik ${prefix}setwelcome`)
reply(`*TEXT LEFT*\n${getTextSetLeft(from, set_left_db)}`)
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
        case prefix+'setproses': case prefix+'setp':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!q) return reply(`Gunakan dengan cara ${command} *teks_p*\n\n_Contoh_\n\n${command} pesanan @pesan, tag orang @nama`)
            if (isSetProses(from, set_proses)) return reply(`Set proses already active`)
            addSetProses(q, from, set_proses)
            reply(`Successfully set proses!`)
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
        case prefix+'changeproses': case prefix+'changep':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!q) return reply(`Gunakan dengan cara ${command} *teks_p*\n\n_Contoh_\n\n${command} pesanan @pesan, tag orang @nama`)
            if (isSetProses(from, set_proses)) {
                changeSetProses(q, from, set_proses)
                reply(`Sukses change set proses teks!`)
            } else {
                addSetProses(q, from, set_proses)
                reply(`Sukses change set proses teks!`)
            }
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
        case prefix+'delsetproses': case prefix+'delsetp':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!isSetProses(from, set_proses)) return reply(`Belum ada set proses di sini..`)
            removeSetProses(from, set_proses)
            reply(`Sukses delete set proses`)
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
        case prefix+'setdone': case prefix+'setd':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!q) return reply(`Gunakan dengan cara ${command} *teks_done*\n\n_Contoh_\n\n${command} pesanan @pesan, tag orang @nama\n\nList Opts : tanggal/jam`)
            if (isSetDone(from, set_done)) return reply(`Set done already active`)
            addSetDone(q, from, set_done)
            reply(`Successfully set done!`)
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
        case prefix+'changedone': case prefix+'changed':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!q) return reply(`Gunakan dengan cara ${command} *teks_done*\n\n_Contoh_\n\n${command} pesanan @pesan, tag orang @nama\n\nList Opts : tanggal/jam`)
            if (isSetDone(from, set_done)) {
                changeSetDone(q, from, set_done)
                reply(`Sukses change set done teks!`)
            } else {
                addSetDone(q, from, set_done)
                reply(`Sukses change set done teks!`)
            }
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
        case prefix+'delsetdone': case prefix+'delsetd':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!isSetDone(from, set_done)) return reply(`Belum ada set done di sini..`)
            removeSetDone(from, set_done)
            reply(`Sukses delete set done`)
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break

//?????????????????????????????????????????????[ GROUP MENU ]???????????????????????????????????????????????????//
        case prefix+'linkgrup': case prefix+'link': case prefix+'linkgc':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            var url = await lexxy.groupInviteCode(from).catch(() => reply(mess.error.api))
            url = 'https://chat.whatsapp.com/'+url
            reply(url)
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break

        case prefix+'setppgrup': case prefix+'setppgc':
            if (!isGroup) return reply(mess.OnlyGrup)
		    if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
		    if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            if (isImage || isQuotedImage) {
            var media = await downloadAndSaveMediaMessage('image', `ppgc${from}.jpeg`)
            if (args[1] == '\'panjang\'') {
            	var { img } = await generateProfilePicture(media)
            	await lexxy.query({
                    tag: 'iq',
                    attrs: {
                        to: from,
                        type:'set',
                        xmlns: 'w:profile:picture'
                    },
                    content: [
                    {
                        tag: 'picture',
                        attrs: { type: 'image' },
                        content: img
                    } 
                    ]
                })
                fs.unlinkSync(media)
            	reply(`Sukses`)
            } else {
                await lexxy.updateProfilePicture(from, { url: media })
                .then( res => {
                    reply(`Sukses`)
                    fs.unlinkSync(media)
                }).catch(() => reply(mess.error.api))
            }
            } else {
			    reply(`Kirim/balas gambar dengan caption ${command}`)
            }
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
        case prefix+'setnamegrup': case prefix+'setnamegc':
            if (!isGroup) return reply(mess.OnlyGrup)
		    if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
		    if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *text*\n\n_Contoh_\n\n${command} Support ${ownerName}`)
            await lexxy.groupUpdateSubject(from, q)
            .then( res => {
                reply(`Sukses`)
            }).catch(() => reply(mess.error.api))
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
        case prefix+'setdesc': case prefix+'setdescription':
            if (!isGroup) return reply(mess.OnlyGrup)
		    if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
		    if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *text*\n\n_Contoh_\n\n${command} New Description by ${ownerName}`)
            await lexxy.groupUpdateDescription(from, q)
            .then( res => {
                reply(`Sukses`)
            }).catch(() => reply(mess.error.api))
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
        case prefix+'antilink':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            if (args.length === 1) return reply(`Pilih on atau off\n_Contoh :_\n${command} on`)
            if (args[1].toLowerCase() === 'on'){
                if (isAntiLink) return reply(`Udah aktif`)
                antilink.push(from)
                fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink, null, 2))
                reply('Successfully Activate Antilink In This Group')
            } else if (args[1].toLowerCase() === 'off'){
                if (!isAntiLink) return reply(`Udah nonaktif`)
                let anu = antilink.indexOf(from)
                antilink.splice(anu, 1)
                fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink, null, 2))
                reply('Successfully Disabling Antilink In This Group')
            } else {
                reply(`Pilih on atau off\n_Contoh :_\n${command} on`)
            }
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
        case prefix+'antiwame':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            if (args.length === 1) return reply(`Pilih on atau off\n_Contoh :_\n${command} on`)
            if (args[1].toLowerCase() === 'on'){
                if (isAntiWame) return reply(`Udah aktif`)
                antiwame.push(from)
                fs.writeFileSync('./database/antiwame.json', JSON.stringify(antiwame, null, 2))
                reply('Successfully Activate Antiwame In This Group')
            } else if (args[1].toLowerCase() === 'off'){
                if (!isAntiWame) return reply(`Udah nonaktif`)
                let anu = antiwame.indexOf(from)
                antiwame.splice(anu, 1)
                fs.writeFileSync('./database/antiwame.json', JSON.stringify(antiwame, null, 2))
                reply('Successfully Disabling Antiwame In This Group')
            } else {
                reply(`Pilih on atau off\n_Contoh :_\n${command} on`)
            }
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+"resethit":{
if (!isOwner) return reply(mess.OnlyOwner)
fs.writeFileSync('./database/dashboard/userhit.json', JSON.stringify(hitbot, null, 2))
var mytext = "[]"
hitbot.splice(mytext)
reply('Successfully Reset Hit Bot')
}

break
case prefix+"resetuser":{
if (!isOwner) return reply(mess.OnlyOwner)
fs.writeFileSync('./database/user.json', JSON.stringify(pendaftar, null, 2))
var mytext = "[]"
pendaftar.splice(mytext)
reply('Successfully Reset Pengguna')
}

break
case prefix+"resetall":{
if (!isOwner) return reply(mess.OnlyOwner)
var mytext = "[]"
db_close_group.splice(mytext)
daftar.splice(mytext)
commund.splice(mytext)
hitbot.splice(mytext)
pendaftar.splice(mytext)
db_respon_list.splice(mytext)
db_respon_group.splice(mytext)
db_open_group.splice(mytext)
db_close_group.splice(mytext)
glimit.splice(mytext)
_money.splice(mytext)
reply('Successfully Reset Semua Database.')
}
break
case prefix+"resetlist":{
if (!isOwner) return reply(mess.OnlyOwner)
fs.writeFileSync('./database/list-message.json', JSON.stringify(db_respon_list, null, 2))
var mytext = "[]"
db_respon_list.splice(mytext)
reply('Successfully Reset List Group')
}
break
case prefix+"resetkey":{
if (!isOwner) return reply(mess.OnlyOwner)
fs.writeFileSync('./database/respon-group.json', JSON.stringify(db_respon_group, null, 2))
var mytext = "[]"
db_respon_group.splice(mytext)
reply('Successfully Reset List Respon')
}
break
case prefix+"resetlimit":{
if (!isOwner) return reply(mess.OnlyOwner)
fs.writeFileSync('./database/glimit.json', JSON.stringify(glimit, null, 2))
var mytext = "[]"
glimit.splice(mytext)
reply('Successfully Reset Global Game')
}
break
case prefix+"resetbalance":{
if (!isOwner) return reply(mess.OnlyOwner)
fs.writeFileSync('./database/balance.json', JSON.stringify(_money, null, 2))
var mytext = "[]"
_money.splice(mytext)
reply('Successfully Reset Balance Global')
}

break
case prefix+'welcome':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (args.length < 2) return reply(`*Example :*\n${command} on\n${command} off\n\nPilih Salah Satu Di Atas`)
if (args[1].toLowerCase() === "on") {
if (isWelcome) return reply(`Welcome sudah aktif`)
                              welcome.push(from)
                              fs.writeFileSync('./database/welcome.json', JSON.stringify(welcome, null, 2))
                              reply(`Sukses mengaktifkan welcome di grup ini`)
                            } else if (args[1].toLowerCase() === "off") {
                              if (!isWelcome) return reply(`Welcome sudah dimatikan`)
                              var posi = welcome.indexOf(from)
                              welcome.splice(posi, 1)
                              fs.writeFileSync('./database/welcome.json', JSON.stringify(welcome, null, 2))
                              reply(`Sukses menonaktifkan welcome di grup ini`)
                            } else {
                              reply(`Pilih on atau off\n_Contoh :_\n${command} on`)
                            }
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'left':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (args.length < 2) return reply(`*Example :*\n${command} on\n${command} off\n\nPilih Salah Satu Di Atas`)
if (args[1].toLowerCase() === "on") {
if (isLeft) return reply(`Left sudah aktif`)
                              left.push(from)
                              fs.writeFileSync('./database/left.json', JSON.stringify(welcome, null, 2))
                              reply(`Sukses mengaktifkan left di grup ini`)
                            } else if (args[1].toLowerCase() === "off") {
                              if (!isLeft) return reply(`Left sudah dimatikan`)
                              var posi = welcome.indexOf(from)
                             left.splice(posi, 1)
                              fs.writeFileSync('./database/left.json', JSON.stringify(welcome, null, 2))
                              reply(`Sukses menonaktifkan left di grup ini`)
                            } else {
                              reply(`Pilih on atau off\n_Contoh :_\n${command} on`)
                            }
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'open': case prefix+'buka':
            if (!isGroup) return reply(mess.OnlyGrup)
		    if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
		    if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            lexxy.groupSettingUpdate(from, 'not_announcement')
            .then((res) => {
                const textOpen = getTextSetOpen(from, db_open_group);
                if (textOpen !== undefined) {
                    reply(textOpen);
                } else {
                    reply(`Sukses mengizinkan semua peserta dapat mengirim pesan ke grup ini`)
                }
            })
            .catch((err) => reply('Error message'))
			addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
        case prefix+'close': case prefix+'tutup':
            if (!isGroup) return reply(mess.OnlyGrup)
		    if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
		    if (!isBotGroupAdmins) return reply(mess.BotAdmin)
		    lexxy.groupSettingUpdate(from, 'announcement')
		    .then((res) => {
                const textClose = getTextSetClose(from, db_close_group);
                if (textClose !== undefined) {
                    reply(textClose);
                } else {
                    reply(`Sukses mengizinkan hanya admin yang dapat mengirim pesan ke grup ini`)
                }
            })
            .catch((err) => reply('Error message'))
		    addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
        case prefix+'add':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins) return reply(mess.GrupAdmin)
            if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            if (groupMembers.length == 257) return reply(`Anda tidak dapat menambah peserta, karena Grup sudah penuh!`)
            var mems = []
            groupMembers.map( i => mems.push(i.id) )
            var number;
            if (args.length > 1) {
                number = q.replace(/[^0-9]/gi, '')+"@s.whatsapp.net"
                var cek = await lexxy.onWhatsApp(number)
                if (cek.length == 0) return reply(`Masukkan nomer yang valid dan terdaftar di WhatsApp`)
                if (mems.includes(number)) return reply(`Nomer tersebut sudah berada didalam grup!`)
                lexxy.groupParticipantsUpdate(from, [number], "add")
                .then( res => reply(jsonformat(res)))
                .catch((err) => reply(jsonformat(err)))
            } else if (isQuotedMsg) {
                number = quotedMsg.sender
                var cek = await lexxy.onWhatsApp(number)
                if (cek.length == 0) return reply(`Peserta tersebut sudah tidak terdaftar di WhatsApp`)
                if (mems.includes(number)) return reply(`Nomer tersebut sudah berada didalam grup!`)
                lexxy.groupParticipantsUpdate(from, [number], "add")
                .then( res => reply(jsonformat(res)))
                .catch((err) => reply(jsonformat(err)))
            } else {
                reply(`Kirim perintah ${command} nomer atau balas pesan orang yang ingin dimasukkan`)
            }
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
        case prefix+'kick':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins) return reply(mess.GrupAdmin)
            if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            var number;
			if (mentionUser.length !== 0) {
                number = mentionUser[0]
                lexxy.groupParticipantsUpdate(from, [number], "remove")
                .then( res => reply(jsonformat(res)))
                .catch((err) => reply(jsonformat(err)))
            } else if (isQuotedMsg) {
                number = quotedMsg.sender
                lexxy.groupParticipantsUpdate(from, [number], "remove")
                .then( res => reply(jsonformat(res)))
                .catch((err) => reply(jsonformat(err)))
            } else {
                reply(`Tag atau balas pesan orang yang ingin dikeluarkan dari grup`)
            }
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
        case prefix+'promote': case prefix+'pm':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins) return reply(mess.GrupAdmin)
            if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            if (mentionUser.length !== 0) {
                lexxy.groupParticipantsUpdate(from, [mentionUser[0]], "promote")
                .then( res => { mentions(`Sukses menjadikan @${mentionUser[0].split("@")[0]} sebagai admin`, [mentionUser[0]], true) })
                .catch(() => reply(mess.error.api))
            } else if (isQuotedMsg) {
                lexxy.groupParticipantsUpdate(from, [quotedMsg.sender], "promote")
                .then( res => { mentions(`Sukses menjadikan @${quotedMsg.sender.split("@")[0]} sebagai admin`, [quotedMsg.sender], true) })
                .catch(() => reply(mess.error.api))
            } else {
                reply(`Tag atau balas pesan member yang ingin dijadikan admin`)
            }
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
        case prefix+'demote':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins) return reply(mess.GrupAdmin)
            if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            if (mentionUser.length !== 0) {
                lexxy.groupParticipantsUpdate(from, [mentionUser[0]], "demote")
                .then( res => { mentions(`Sukses menjadikan @${mentionUser[0].split("@")[0]} sebagai member biasa`, [mentionUser[0]], true) })
                .catch(() => reply(mess.error.api))
            } else if (isQuotedMsg) {
                lexxy.groupParticipantsUpdate(from, [quotedMsg.sender], "demote")
                .then( res => { mentions(`Sukses menjadikan @${quotedMsg.sender.split("@")[0]} sebagai member biasa`, [quotedMsg.sender], true) })
                .catch(() => reply(mess.error.api))
            } else {
                reply(`Tag atau balas pesan admin yang ingin dijadikan member biasa`)
            }
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
        case prefix+'revoke':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins) return reply(mess.GrupAdmin)
            if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            await lexxy.groupRevokeInvite(from)
            .then( res => {
                reply(`Sukses menyetel tautan undangan grup ini`)
            }).catch(() => reply(mess.error.api))
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'tagall': {
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!q) return reply(`Teks?`)
let teks = `???????????? *???? Tag All* ????????????\n\n${q ? q : ''}\n`
for (let mem of participants) {
teks += `??? @${mem.id.split('@')[0]}\n`
}
lexxy.sendMessage(from, { text: teks, mentions: participants.map(a => a.id) }, { quoted: msg })
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
        case prefix+'hidetag':
            if (!isGroup) return reply(mess.OnlyGrup)
		    if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            let mem = [];
            groupMembers.map( i => mem.push(i.id) )
            lexxy.sendMessage(from, { text: q ? q : '', mentions: mem })
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
        case prefix+'delete': case prefix+'del': case prefix+'d':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!isQuotedMsg) return reply(`Balas chat dari bot yang ingin dihapus`)
            if (!quotedMsg.fromMe) return reply(`Hanya bisa menghapus chat dari bot`)
            lexxy.sendMessage(from, { delete: { fromMe: true, id: quotedMsg.id, remoteJid: from }})
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
        // Owners Menu
        case prefix+'exif':
            if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
            var namaPack = q.split('|')[0] ? q.split('|')[0] : q
            var authorPack = q.split('|')[1] ? q.split('|')[1] : ''
            exif.create(namaPack, authorPack)
            reply(`Sukses membuat exif`)
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
        case prefix+'join':
        if (!isPremium) return reply(`Kamu bukan user premium, kirim perintah *${prefix}daftarprem* untuk membeli premium`)
            if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
            if (args.length < 2) return reply(`Kirim perintah ${command} _linkgrup_`)
            if (!isUrl(args[1])) return reply(mess.error.Iv)
            var url = args[1]
            url = url.split('https://chat.whatsapp.com/')[1]
            var data = await lexxy.groupAcceptInvite(url)
            reply(jsonformat(data))
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
        case prefix+'leave':
            if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
            if (!isGroup) return reply(mess.OnlyGrup)
            lexxy.groupLeave(from)
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
        case prefix+'self':{
            if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
            lexxy.mode = 'self'
            reply('Berhasil berubah ke mode self')
            }
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
        case prefix+'publik': case prefix+'public':{
            if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
            lexxy.mode = 'public'
            reply('Berhasil berubah ke mode public')
            }
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'rules':
let rulestext =`
??? *SYARAT & KETENTUAN*

1. Jangan Spam Bot.
Sanksi: *??? WARN/SOFT BLOCK*
2. Jangan Telepon Bot.
Sanksi: *??? SOFT BLOCK*
3. Jangan Mengeksploitasi Bot.
Sanksi: *PERMANENT BLOCK*

???? : Bang Cara Dapetin Script Botnya? Gmn
???? : Cukup Beli Di RIEEE MODS Ketik *${prefix}creator*

???? : Bang Boleh Ku Masukin Ngga Botnya Di Group?
???? : Dilarang Masukin Bot Ke Group Kecuali Atas Izin Owner.

Jika sudah dipahami rules-nya, silakan ketik *#menu* untuk memulai!
Segala kebijakan dan ketentuan *${setting.botName}* di pegang oleh owner dan segala perubahan kebijakan, sewaktu waktu owner berhak mencabut, atau memblokir user(*???*)`
reply(rulestext)
addCmd(command.slice(1), 1, commund)
break
case prefix+'sewabot':
let textSewaNya =`
*LIST HARGA SEWABOT*

*_Sewabot Harian :_*
??? _1 Hari = Rp700_
??? _2 Hari = Rp1.500_
??? _3 Hari = Rp2.100_
??? _4 Hari = Rp2.700_
??? _5 Hari = Rp3.500_
??? _6 Hari = Rp4.200_

*_Sewabot Mingguan :_*
??? _1 Minggu = Rp5.000_
??? _2 Minggu = Rp9.700_
??? _3 Minggu = Rp.13.500_

*_Sewabot Bulanan :_*
??? _1 Bulan = Rp14.500_
??? _2 Bulan = Rp28.000_
??? _3 Bulan = Rp42.000_

*_Paket Premium :_*
_??? Permanen = Rp70.000_

*Keuntungan Sewabot :*
1. _Bot Online 24 Jam_
2. _Ada Fitur Topup ff Otomatis_
3. _Fitur Store / Buat Jualan Di Group_
4. _Antilink/Hidetag/Shortlink/Kick_
5. _Addlist/Dellist/SetProses/SetDone_
6. _Buka Group - Tutup Group_

*Jika Minat Hubungi Admin.*
_Wa.me/6283834558105_
`
reply(textSewaNya)
break
case prefix+'donasi':
case prefix+'donate':
let textDonaNya =`${textdonasi(sender, prefix)}`
reply(textDonaNya)
break
case prefix+'mysesi':
case prefix+'sendsesi':
case prefix+'session':
if (!isOwner) return reply(mess.OnlyOwner)
var setting = JSON.parse(fs.readFileSync('./config.json'));
var anumu = await fs.readFileSync(`./${setting.sessionName}.json`)
lexxy.sendMessage(from, { document: anumu, mimetype: 'document/application', fileName: 'session.json'}, {quoted: msg } )
reply(`*Note :*\n_Session Bot Bersifat Untuk Pribadi Dari Owner Maupun Bot, Tidak Untuk User Bot Ataupun Pengguna Bot._`)
reply(`_Sedang Mengirim Document_\n_Nama Session : ${setting.sessionName}.json_\n_Mohon Tunggu Sebentar..._`)
addCmd(command.slice(1), 1, commund)
			break
case 'bot':
reply(`Wa.me/${botNumber.split("@")[0]}`)
break
case 'wame':
reply(`Wa.me/${sender.split("@")[0]}`)
break
        case prefix+'setpp': case prefix+'setppbot':
            if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
            if (isImage || isQuotedImage) {
                var media = await downloadAndSaveMediaMessage('image', 'ppbot.jpeg')
                if (args[1] == '\'panjang\'') {
                    var { img } = await generateProfilePicture(media)
                    await lexxy.query({
                        tag: 'iq',
                        attrs: {
                            to: botNumber,
                            type:'set',
                            xmlns: 'w:profile:picture'
                        },
                        content: [
                        {
                            tag: 'picture',
                            attrs: { type: 'image' },
                            content: img
                        }
					    ]
                    })
					fs.unlinkSync(media)
					reply(`Sukses`)
				} else {
					var data = await lexxy.updateProfilePicture(botNumber, { url: media })
			        fs.unlinkSync(media)
				    reply(`Sukses`)
				}
            } else {
                reply(`Kirim/balas gambar dengan caption ${command} untuk mengubah foto profil bot`)
            }
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'sc':
case prefix+'script':{
reply(`_Script ini Dijual 50k Minat Chat_\n*Wa.me/6283805972328 ( Rieee )*\n*No Enc 100% Work All Fitur*\n\n50k 1?? Update\n100k Premium`)
}
break
  case prefix+'stat': case prefix+'stats':
                case prefix+'statistik':
                   
                   var nodeos = require('node-os-utils')
                   var { totalGb, usedGb, freeGb } = await nodeos.drive.info()
                   var { download, upload } = await checkBandwidth()
                   
                   var allgrup = await lexxy.groupFetchAllParticipating().then(res => Object.values(res))
                   var allchat = await store.chats.all()
                   var tmp = speed(); var tmps = speed() - tmp
                   var sesize = bytesToSize(fs.statSync(`./${setting.sessionName}.json`).size)
                   var stat = `*STATISTIK BOT*

*Speed :* ${tmps.toFixed(4)} s
*Runtime :* ${runtime(process.uptime())}
*Total Chat :* ${allchat.length}
*Private Chat :* ${allchat.length - allgrup.length}
*Group Chat :* ${allgrup.length}
*Total Hit :* ${lordLexxy.value}

*Download :* ${download}
*Upload :* ${upload}
*Total Storage :* ${totalGb} GB
*Used :* ${usedGb} GB
*Free :* ${freeGb} GB
*Session Size :* ${sesize}`

                   reply(stat)
                   break

        case prefix+'broadcast': case prefix+'bc':
            if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
            if (args.length < 2) return reply(`Kirim perintah ${command} teks`)
            var data = await store.chats.all()
            var teks = `${q}`
            for (let i of data) {
                lexxy.sendMessage(i.id, { text: teks })
                await sleep(1000)
            }
            reply(`Sukses mengirim pesan siaran kepada ${data.length} chat`)
            addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'creategc':
if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply(`*Example :*\n${command} namagroup`)
var namanya = body.slice(10)
let cret = await lexxy.groupCreate(namanya, [])
let response = await lexxy.groupInviteCode(cret.id)
var teks = `  ??? *Create Group* ???

_*??? Name : ${cret.subject}*_
_*??? Owner : @${cret.owner.split("@")[0]}*_
_*??? Time : ${moment(cret.creation * 1000).tz("Asia/Jakarta").format("DD/MM/YYYY HH:mm:ss")} WIB*_

*Link Create Group* :
https://chat.whatsapp.com/${response}
`
reply(teks)
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'addkey':
case prefix+'addrespon':
if (isGroup) return reply('Khusus Chat Pribadi Kak')
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
var args1 = q.split("@")[0]
var args2 = q.split("@")[1]
if (!q.includes("@")) return reply(`*FORMAT ADDRESPON*\n\n_Example:_\n${command} *key@response*\n\n_Contoh:_\n${command} *tes@apa*`)
if (checkResponGroup(from, args1, db_respon_group)) return reply(`List respon dengan key : *${args1}* sudah ada di group ini.`)
addResponGroup(from, args1, args2, db_respon_group)
reply(`Berhasil menambah Respon : *${args1}*`)
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'delkey':
case prefix+'delrespon':
if (isGroup) return reply('Khusus Chat Pribadi Kak')
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
var args1 = q
if (db_respon_group.length === 0) return reply(`Belum ada key message di database`)
if (!q) return reply(`Gunakan dengan cara ${command} *key*\n\n_Contoh_\n\n${command} hello`)
if (!checkResponGroup(from, args1, db_respon_group)) return reply(`List respon dengan key *${args1}* tidak ada di database!`)
deleteResponGroup(from, args1, db_respon_group)
reply(`Sukses hapus respon message dengan key *${q}*`)
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'setkey':
case prefix+'setrespon':
if (isGroup) return reply('Khusus Chat Pribadi Kak')
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
var args1 = q.split("@")[0]
var args2 = q.split("@")[1]
if (!q.includes("@")) return reply(`*FORMAT ADDRESPON*\n\n_Example:_\n${command} *key@response*\n\n_Contoh:_\n${command} *tes@apa*`)
if (checkResponGroup(from, q, db_respon_group)) return reply(`List respon dengan key *${q}* tidak ada di database!`)
changeResponGroup(from, args1, args2, db_respon_group)
reply(`Berhasil mengubah Respon : *${args1}*`)
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'setclose':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!q) return reply(`Example :\n${command} text\n\nContoh :\n${command} Group Di Tutup Sementara.`)
var args1 = q
addSetClose(args1, from, db_close_group) 
reply(`Berhasil mengubah pesan group close menjadi : ${args1}`)
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'delclose':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
removeSetClose(from, db_close_group)
reply(`Sukses hapus pesan group close`)
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'getclose':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!isSetClose(from, db_close_group)) return reply(`Belum ada pesan close\njika mau mau add pesan\nsilahkan ketik ${prefix}setclose`)
reply(`*PESAN CLOSE GROUP*\n${getTextSetClose(from, db_close_group)}`)
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'listkey':
case prefix+'cekrespon':
case prefix+'listrespon':{
if (isGroup) return reply('Khusus Chat Pribadi Kak')
var group_respon_nya = JSON.parse(fs.readFileSync('./database/respon-group.json'))
if (db_respon_group.length === 0) return reply(`Belum ada respon message di database\nSilahkan Ketik ${prefix}addkey`)
let teks = `*LIST RESPON MESSAGE*\n`
for (let i of group_respon_nya) {
teks += `*keyword :* ${i.key}\n`
}
reply(teks)
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'setopen':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!q) return reply(`Example :\n${command} text\n\nContoh :\n${command} Group Sudah Open Kembali.`)
var args1 = q
addSetOpen(args1, from, db_open_group) 
reply(`Berhasil mengubah pesan group open menjadi : ${args1}`)
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'delopen':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
removeSetOpen(from, db_open_group)
reply(`Sukses hapus pesan group open`)
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'getopen':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!isSetOpen(from, db_open_group)) return reply(`Belum ada pesan close\njika mau mau add pesan\nsilahkan ketik ${prefix}setopen`)
reply(`*PESAN OPEN GROUP*\n${getTextSetOpen(from, db_open_group)}`)
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'simi':
if (!q) return reply(`*Contoh* : ${prefix+command} halo`)
fetchJson(`https://api.simsimi.net/v2/?text=${q}&lc=id`)
.then(simi1 => {reply(simi1.success)})
addCmd(command.slice(1), 1, commund)
addHit(sender, command)
break
case prefix+"cvgpy":{



var idnYaa = q.split("|")[0]
var nopeNya = q.split("|")[1]

const csrf = await hikki.payment.csrfGenerator()
const { data } = await hikki.payment.listProduct(csrf)

reply ('Mengirim Data...')
console.log(data)

const isValidId = data.daftar_product.find(product => product.id == idnYaa)
if (!isValidId) return console.error(isValidId)

const gass = await hikki.payment.convertGopay(idnYaa, nopeNya, csrf)
console.log(gass)

let cpSaldo = `*CONVERT SALDO*
*ID Produk : ${idnYaa}*
*Nomer Tujuan : ${nopeNya}*
*Payment : QRIS*
*ID_TRX : ${gass.id_order}*
*ID_USER : ${gass.id_user}*

Jika Ingin Melihat ID Produk
Silahkan Ketik ${prefix}gopaycv`

lexxy.sendMessage(from, { image: { url: gass.qr}, caption: cpSaldo}, { quoted: msg })
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+"facebook":{


if (!q) return reply(`*Contoh :*\n${command} https://www.facebook.com/mhmd.farid.908/videos/473529950837803/`)

hikki.downloader.facebookDownload(q).then(data => {
reply(mess.wait)
let fbText =`*FACEBOOK DOWNLOAD*
Title : ${data.result.title}
From : ${data.result.url}`
lexxy.sendMessage(from, { video: { url: data.result.hd }, caption: fbText }, { quoted: msg })
});
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break

case prefix+'tiktok':{
if (!q) return reply(`contoh :\n${command} https://vt.tiktok.com/ZSdbFNn96/?k=1`)
var url = q
var fatihh = await fetchJson(`https://hadi-api.herokuapp.com/api/tiktok?url=${url}`)
reply(mess.wait)
var fatih = fatihh.result
lexxy.sendMessage(from, { video: { url: fatih.video.nowm }, caption: 'done!! no watermak' }, { quoted: msg })
lexxy.sendMessage(from, { audio: { url: fatih.audio_only.original }, mimetype: 'audio/mpeg', fileName: `${fatih.title}.mp3` }, { quoted: msg })
}
break

case prefix+"sosmed":{
if (!q) return reply(`Example :\n${command} urlMediaSosial\n\n*?? Meta Scrape - Sosial Media*\nig,Tiktok,youTube,Twitter,Facebook`)
hikki.downloader.metaScrape(q).then(data => {
console.log(data)
let Deteckk =`*META-SCRAPE*
Source : ${data.source}
Video : ${data.medias[0].videoAvailable}
Audio : ${data.medias[0].audioAvailable}`
reply(Deteckk)

let SourceText =`*SOSIAL-MEDIA*
url : ${data.url}
quality : ${data.medias[0].quality}
extension : ${data.medias[0].extension}
formattedSize : ${data.medias[0].formattedSize}
videoAvailable : ${data.medias[0].videoAvailable}
audioAvailable : ${data.medias[0].audioAvailable}
chunked : ${data.medias[0].chunked}

Source : ${data.source}`
reply(mess.wait)

lexxy.sendMessage(from, { video: { url: data.medias[0].url }, caption: SourceText }, { quoted: msg})
lexxy.sendMessage(from, { audio: { url: data.medias[0].url }, mimetype: 'audio/mpeg', fileName: `${data.title}.mp3` }, { quoted: msg })
});
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'gsmarena':{
if (!q) return reply(`*Contoh * : ${prefix+command} realme`)
reply(mess.wait)
let gsMaren = await fetchJson(`https://api-yogipw.herokuapp.com/api/search/gsmarena?query=${q}`)
let textGsMarena =`*GS-MARENA SEARCHING*
judul : ${gsMaren.judul}
rilis : ${gsMaren.rilis}
type : ${gsMaren.type}
ukuran : ${gsMaren.ukuran}
storage : ${gsMaren.storage}
display : ${gsMaren.display}
inchi : ${gsMaren.inchi}
pixel : ${gsMaren.pixel}
videoPixel : ${gsMaren.videoPixel}
ram : ${gsMaren.ram}
chipset : ${gsMaren.chipset}
baterai : ${gsMaren.batrai}
merek_baterai : ${gsMaren.merek_batre}

*detail*:
${gsMaren.detail}`
let tbMarena = await getBuffer(gsMaren.thumb)
lexxy.sendMessage(from, { image: tbMarena, caption: textGsMarena}, { quoted: msg })
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+"tinyurl":{


if (!q) return reply(`*Contoh :*\n${prefix+command} google.com`)
let tinyurl = await fetchJson(`https://api-yogipw.herokuapp.com/api/short/tinyurl?url=${q}`)
lexxy.sendMessage(from, {text: `Link Original : ${q}\nLink Shortlink : ${tinyurl.result}`, quoted: msg })
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+"isgd":{


if (!q) return reply(`*Contoh :*\n${command} http://google.com`)
let isgd = await fetchJson(`https://api-yogipw.herokuapp.com/api/short/isgd?url=${q}`)
lexxy.sendMessage(from, {text: `Link Original : ${q}\nLink Shortlink : ${isgd.result.link}`, quoted: msg })
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+"cuttly":{


if (!q) return reply(`*Contoh :*\n${command} http://google.com`)
let cuttly = await fetchJson(`https://api-yogipw.herokuapp.com/api/short/cuttly?url=${q}`)
lexxy.sendMessage(from, {text: `Link Original : ${q}\nLink Shortlink : ${cuttly.result.link}`, quoted: msg })
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'salurantv':
reply(`*DAFTAR_STASIUN*\nrcti\nnettv\nantv\ngtv\nindosiar\ninewstv\nkompastv\nmetrotv\nmnctv\nrtv\nsctv\ntrans7\ntranstv\ntvone\ntvri`)
break
case prefix+'jadwaltv':{
if (!q) return reply(`Contoh :\n${command} rcti`)
var anu = await fetchJson(`http://nzcha-apii.herokuapp.com/jadwaltv?channel=${q}`)
if (anu.handle) return reply(`Saluran tidak ditemukan silahkan lihat list saluran ketik ${prefix}salurantv`)
teks = ` ??? *JADWAL-TV* ???\n\nNama Channel : ${q}\nJumlah Siaran : ${anu.jumlah_channel_tv}\n\n`
for (let i of anu.result) {
 teks +=`jam : ${i.jam}\ntayang : ${i.tayang}\n\n`
}
reply(teks)
}
break
case prefix+'shorturl':{
if (!q) return reply(`*Contoh :*\n${command} http://google.com`)
var shot = await fetchJson(`https://hadi-api.herokuapp.com/api/shorturl?url=${q}`)
if (shot.msg) return reply('[!] url harus di awali dengan http:// atau https://')
reply(shot.result)
}
break
case prefix+'id':
reply(from)
addCmd(command.slice(1), 1, commund)
addHit(sender, command)
break
case prefix+'y':{
const template = generateWAMessageFromContent(from, proto.Message.fromObject({
                    templateMessage: {
                        hydratedTemplate: {
                           hydratedContentText: 'p',
                            locationMessage: {
                            jpegThumbnail: setting.pathimg},
                            hydratedFooterText: footer,
                            hydratedButtons: [{          
            "urlButton": {
              "displayText": "My Group",
              "url": "https://chat.whatsapp.com/I5tQ4U2B7CVFh3P5QmvgLv"
            }
          },
        ]
      }
    }
               }), { userJid: from })
            lexxy.relayMessage(from, template.message, { messageId: template.key.id })
                }
break
case prefix+'topupff':{


if (!q) return reply(`*Example :*\n${command} id\n\n*Contoh :*\n${command} 239814337`)
let sections = []

var idnya = body.slice(9)

let listmenu = [`tp1 ${idnya}|5`,`tp1 ${idnya}|12`,`tp1 ${idnya}|70`,`tp1 ${idnya}|140`,`tp1 ${idnya}|355`,`tp1 ${idnya}|720`]
let listmenuu = [`5 DIAMOND ????`,`12 DIAMOND ????`,`70 DIAMOND ????`,`140 DIAMOND ????`,`355 DIAMOND ????`,`720 DIAMOND ????`]
let lahkokngamok = ['Sistem Proses Otomatis 3-7 Menit']
let nombor = 1

let startnum = 0
let startnumm = 0
for (let x of listmenu) {
const yy = {title: 'List Diamond Ke ' + nombor++,
rows: [
{
title: `${listmenuu[startnum++]}`,
description: `${lahkokngamok[startnumm]}`,
rowId: `${prefix}${x}`
}
]
}
sections.push(yy)
}
const sendm =  lexxy.sendMessage(
from, 
{
text: `Silahkan Pilih Nominal Diamond Nya`, 
footer: `?? Top Up Free Fire Otomatis`,
title: `Hai ${pushname} ${ucapanWaktu}`, 
buttonText: "Click Here", 
sections,
mentions:[sender]
}, { quoted : fkontak })
}

			addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'tp1':
if (!q) return reply(`*Example :*\n${command} id|nominal\n\n*Contoh :*\n${command} 239814337|70\n\n_Support Nominal_ :\n5 12 70 140 355 720`)

var res = q
var idnya = res.split("|")[0]
var dmnya = res.split("|")[1]

reply(mess.wait)

async function topupFreeFire() {

const makeSession = await hikki.game.topupFreeFire(idnya, dmnya) 

// console.log(makeSession) if get more property

let nihbos = makeSession.data.paymentName
let nihname = makeSession.data.userNameGame
let produkharga = makeSession.data.price
let idtranks = makeSession.data.transactionId
let jumlahdm = makeSession.data.item.name

var yainj =`
*TOP UP DIAMOND FREE FIRE*
???? *Game ID : ${idnya}*
???? *Nickname : ${nihname}*
???? *Produk : Diamond FF*
??????? *Jumlah : ${jumlahdm}* ????
???? *Payment : ${nihbos}*
???? *Harga Produk : Rp${produkharga}*
???? *ID Tranksaksi : ${idtranks}*
`
var yoicpii =`Sebelum Melakukan Pembayaran Silahkan Cek Data Di Atas Apakah Sudah Benar?

Jika Data Nya Sudah Benar, Silahkan Klik Button Konfirmasi Di Bawah`

var bgnya = await getBuffer(`https://telegra.ph/file/09a8a59066e980373c030.jpg`)

lexxy.sendMessage(from, { caption: yainj, location: { jpegThumbnail: bgnya }, templateButtons: buttonsTopup, footer: `${yoicpii}\n\n?? Created By Lexxy Official\n`, mentions: [sender] })

return await hikki.game.payDiamond(makeSession, '08953225697662')
}
topupFreeFire().then(data => {
})

addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break

case prefix+'tp2':

var res = q
var id = res.split("|")[0]
var nom = res.split("|")[1]

async function topupFreeFire2() {
const makeSession = await hikki.game.topupFreeFire(id, nom) // support nominal 5 12 70 140 355 720'
// console.log(makeSession) if get more property

let p1 = makeSession.data.paymentId
let p2 = makeSession.data.item.id
let p3 = makeSession.data.gameId
let nihbos = makeSession.data.paymentName
let nihname = makeSession.data.userNameGame
let produkharga = makeSession.data.price
let idtranks = makeSession.data.transactionId
let jumlahdm = makeSession.data.item.name


var konfir =`*KONFIRMASI TRANSAKSI*\n_#${p1}${p2}${p3}_\n\n*DATA RESULT*\n> _*ID Game :* ${id}_\n> _*Nickname :* ${nihname}_\n> _*Payment* : ${nihbos}_\n> _*Harga Produk :* Rp.${produkharga}_\n> _*Produk :* Diamond Free Fire_`
reply(konfir)

return await hikki.game.payDiamond(makeSession, '08953225697662')
}
topupFreeFire2().then(data => {
lexxy.sendMessage(from, { image: { url: data.qrCode }, caption: `_Silahkan Transfer Via Qris Di Atas_\n\n*Note :*\n_Wajib Transfer Sesuai Jumlah, Agar Diamond Otomatis Masuk_\n\n*Count :*\n_Qris Berlaku Hanya 5 Menit_` }, { quoted: msg })
})
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'gopaycv':
reply(`*KODE PRODUK CONVERT*

Payment : Gopay

*LIST PRODUK*
Kode 24 = Rp10.000
Kode 25 = Rp20.000
Kode 26 = Rp25.000
Kode 27 = Rp30.000
Kode 28 = Rp40.000
Kode 29 = Rp50.000
Kode 30 = Rp70.000
Kode 31 = Rp75.000
Kode 32 = Rp90.000
Kode 33 = Rp100.000
Kode 34 = Rp150.000
Kode 35 = Rp200.000`)
break
case prefix+'gopay': {


if (!q) return reply(`*Contoh :*\n${command} 0857????????????\n\nSalah input nomor bukan tanggung jawab admin.`)
if (args.length == 10) return reply(`Minimal 10 Angka.`)
var nomorNya = q
let sections = []
let listmenu = [`cvgpy 24|${nomorNya}`,`cvgpy 25|${nomorNya}`,`cvgpy 26|${nomorNya}`,`cvgpy 27|${nomorNya}`,`cvgpy 28|${nomorNya}`,`cvgpy 29|${nomorNya}`,`cvgpy 30|${nomorNya}`,`cvgpy 31|${nomorNya}`,`cvgpy 32|${nomorNya}`,`cvgpy 33|${nomorNya}`,`cvgpy 34|${nomorNya}`,`cvgpy 35|${nomorNya}`]
let listmenuu = [`??? GoPay 10.000`,`??? GoPay 20.000`,`??? GoPay 25.000`,`??? GoPay 30.000`,`??? GoPay 40.000`,`??? GoPay 50.000`,`??? GoPay 70.000`,`??? GoPay 75.000`,`??? GoPay 90.000`,`??? GoPay 100.000`,`??? GoPay 150.000`,`??? GoPay 200.000`]
let listmenuuu = [`Convert Saldo`,`Convert Saldo`,`Convert Saldo`,`Convert Saldo`,`Convert Saldo`,`Convert Saldo`,`Convert Saldo`,`Convert Saldo`,`Convert Saldo`,`Convert Saldo`,`Convert Saldo`,`Convert Saldo`]
let nombor = 1

let startnum = 0
let startnumm = 0
for (let x of listmenu) {
const yy = {title: 'Pilihan Saldo Ke ' + nombor++,
rows: [
{
title: `${listmenuu[startnum++]}`,
description: `${listmenuuu[startnumm++]}`,
rowId: `${prefix}${x}`
}
]
}
sections.push(yy)
}
const sendm =  lexxy.sendMessage(
from, 
{
text: `Silahkan Pilih Nominal Saldo E-wallet Yang Akan Anda Convert Ke Gopay!.

Note: Pembayaran Disini Hanya Menggunakan Server, Owner Tidak Mendapatkan Hasil Apapun Disini Karena Diproses Langsung Dari Server!.

Jika Sudah Melakukan Pemilihan Nominal, Anda Akan Dikirimkan Qris Pembayaran Dan Anda Harus Membayar Melalu Aplikasi E-wallet Yang Mendukung Qris, Pastikan Nominal Yang Anda Krimkan Harus Sama Dengan Nominal Yang Diminta!.

Jika Anda Sudah Melakukan Pembayaran, Silahkan Tunggu 1-2 Menit Dan Melakukan Pengecekan Secara Berkala Pada Saldo Anda!.`, 
footer: `?? By Lexxy Official`, 
title: `??????[ Nominal Saldo Gopay ]??????`, 
buttonText: "Click Here", 
sections,
mentions:[sender]
}, { quoted : fkontak })
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break

case prefix+'bocil':{
if (!isPremium) return reply(`Kamu bukan user premium, kirim perintah *${prefix}daftarprem* untuk membeli premium`)

reply(mess.wait)
var tecno = JSON.parse(fs.readFileSync('./media/ASUPAN/Bocil.json'))
var techno = pickRandom(tecno)
reply(`*ASUPAN BOCIL*\n_*Url :*_ ${techno.url}`)
}

addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'santuy':{
if (!isPremium) return reply(`Kamu bukan user premium, kirim perintah *${prefix}daftarprem* untuk membeli premium`)

reply(mess.wait)
var tecno = JSON.parse(fs.readFileSync('./media/ASUPAN/Santuy.json'))
var techno = pickRandom(tecno)
reply(`*ASUPAN SANTUY*\n_*Url :*_ ${techno.url}`)
}

addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'ghea':{
if (!isPremium) return reply(`Kamu bukan user premium, kirim perintah *${prefix}daftarprem* untuk membeli premium`)

reply(mess.wait)
var tecno = JSON.parse(fs.readFileSync('./media/ASUPAN/Ghea.json'))
var techno = pickRandom(tecno)
reply(`*ASUPAN GHEA*\n_*Url :*_ ${techno.url}`)
}

addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'hijab':
case prefix+'hijaber':{
if (!isPremium) return reply(`Kamu bukan user premium, kirim perintah *${prefix}daftarprem* untuk membeli premium`)

reply(mess.wait)
var tecno = JSON.parse(fs.readFileSync('./media/ASUPAN/Hijaber.json'))
var techno = pickRandom(tecno)
reply(`*ASUPAN HIJABER*\n_*Url :*_ ${techno.url}`)
}

addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'rika':{
if (!isPremium) return reply(`Kamu bukan user premium, kirim perintah *${prefix}daftarprem* untuk membeli premium`)

reply(mess.wait)
var tecno = JSON.parse(fs.readFileSync('./media/ASUPAN/Rika.json'))
var techno = pickRandom(tecno)
reply(`*ASUPAN RIKA*\n_*Url :*_ ${techno.url}`)
}

addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'quotes':{


reply(mess.wait)
var tecno = JSON.parse(fs.readFileSync('./media/RANDOM/Quotes.json'))
var techno = pickRandom(tecno)
let TextQuotesNya =`*RANDOM QUOTES*
??? *Author :* ${techno.author}
??? *Quotes :* ${techno.quotes}`
reply(TextQuotesNya)
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break

case prefix+'bacaansholat':{
reply(mess.wait)
var tecno = JSON.parse(fs.readFileSync('./db/function/Bacaansholat.json'))
var hadi = pickRandom(tecno)
let textHadits = `*BACAAN-SHOLAT*
name : ${hadi.name}
arabic : ${hadi.arabic}
latin : ${hadi.latin}
terjemahan : ${hadi.terjemahan}`
reply(textHadits)
}
break
case prefix+'doaharian':{
reply(mess.wait)
var tecno = JSON.parse(fs.readFileSync('./db/function/Doaharian.json'))
var hadi = pickRandom(tecno)
let textDoa =`*DOA-HARIAN*
title : ${hadi.title}
arabic : ${hadi.arabic}
latin : ${hadi.latin}
translation : ${hadi.translation}`
reply(textDoa)
}
break
case prefix+'ayatkursi':{
reply(mess.wait)
var tecno = JSON.parse(fs.readFileSync('./db/function/Ayatkursi.json'))
let textAyatKursi =`*AYAT-KURSI*
tafsir : ${hadi.tafsir}
translation : ${hadi.translation}
arabic : ${hadi.arabic}
latin : ${hadi.latin}`
reply(textAyatKursi)
}
break
case prefix+'loli':{
reply(mess.wait)
var memsk = JSON.parse(fs.readFileSync('./media/RANDOM/Loli.json'))
var jomek = pickRandom(memsk)
var loliNyas = await getBuffer(jomek)
lexxy.sendMessage(from, { image: loliNyas, caption: '?? Random Loli' }, {quoted:msg})
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)
break
case prefix+'asupantiktok':{
var memsk = JSON.parse(fs.readFileSync('./db/data/asupantiktok.json'))
var jomek = pickRandom(memsk)
reply(`*ASUPAN-TIKTOK*\n${jomek}`)
}
break
case prefix+'asupan':{
if (!isPremium) return reply(`Kamu bukan user premium, kirim perintah *${prefix}daftarprem* untuk membeli premium`)
var memsk = JSON.parse(fs.readFileSync('./db/data/asupan.json'))
var jomek = pickRandom(memsk)
reply(`*RANDOM-ASUPAN*\n${jomek.asupan}`)
}
break
case prefix+'cosplayloli':{
var memsk = JSON.parse(fs.readFileSync('./db/data/cosplayloli.json'))
var jomek = pickRandom(memsk)
lexxy.sendMessage(from, { image: { url: jomek }, caption: '?? Cosplay Loli' }, { quoted: msg })
}
break
case prefix+'cosplay':{
var memsk = JSON.parse(fs.readFileSync('./db/data/cosplay.json'))
var jomek = pickRandom(memsk)
lexxy.sendMessage(from, { image: { url: jomek }, caption: '?? Random Cosplay' }, { quoted: msg })
}
break
case prefix+'cosplaysagiri':{
var memsk = JSON.parse(fs.readFileSync('./db/data/cosplaysagiri.json'))
var jomek = pickRandom(memsk)
lexxy.sendMessage(from, { image: { url: jomek }, caption: '?? Cosplay Sagiri' }, { quoted: msg })
}
break
case prefix+'aesthetic':{
reply(mess.wait)
var memsk = JSON.parse(fs.readFileSync('./db/data/aesthetic.json'))
var jomek = pickRandom(memsk)
lexxy.sendMessage(from, { image: { url: jomek }, caption: `?? Random ${command}` }, { quoted: msg })
}
break
case prefix+'ahegao':{
reply(mess.wait)
var memsk = JSON.parse(fs.readFileSync('./db/data/ahegao.json'))
var jomek = pickRandom(memsk)
lexxy.sendMessage(from, { image: { url: jomek }, caption: `?? Random ${command}` }, { quoted: msg })
}
break
case prefix+'akira':{
reply(mess.wait)
var memsk = JSON.parse(fs.readFileSync('./db/data/akira.json'))
var jomek = pickRandom(memsk)
lexxy.sendMessage(from, { image: { url: jomek }, caption: `?? Random ${command}` }, { quoted: msg })
}
break
case prefix+'akiyama':{
reply(mess.wait)
var memsk = JSON.parse(fs.readFileSync('./db/data/akiyama.json'))
var jomek = pickRandom(memsk)
lexxy.sendMessage(from, { image: { url: jomek }, caption: `?? Random ${command}` }, { quoted: msg })
}
break
case prefix+'ana':{
reply(mess.wait)
var memsk = JSON.parse(fs.readFileSync('./db/data/ana.json'))
var jomek = pickRandom(memsk)
lexxy.sendMessage(from, { image: { url: jomek }, caption: `?? Random ${command}` }, { quoted: msg })
}
break
case prefix+'ass':{
reply(mess.wait)
var memsk = JSON.parse(fs.readFileSync('./db/data/ass.json'))
var jomek = pickRandom(memsk)
lexxy.sendMessage(from, { image: { url: jomek }, caption: `?? Random ${command}` }, { quoted: msg })
}
break
case prefix+'asuna':{
reply(mess.wait)
var memsk = JSON.parse(fs.readFileSync('./db/data/asuna.json'))
var jomek = pickRandom(memsk)
lexxy.sendMessage(from, { image: { url: jomek }, caption: `?? Random ${command}` }, { quoted: msg })
}
break
case prefix+'ayuzawa':{
reply(mess.wait)
var memsk = JSON.parse(fs.readFileSync('./db/data/ayuzawa.json'))
var jomek = pickRandom(memsk)
lexxy.sendMessage(from, { image: { url: jomek }, caption: `?? Random ${command}` }, { quoted: msg })
}
break
case prefix+'deidara':{
reply(mess.wait)
var memsk = JSON.parse(fs.readFileSync('./db/data/deidara.json'))
var jomek = pickRandom(memsk)
lexxy.sendMessage(from, { image: { url: jomek }, caption: `?? Random ${command}` }, { quoted: msg })
}
break
case prefix+'elaina':{
reply(mess.wait)
var memsk = JSON.parse(fs.readFileSync('./db/data/elaina.json'))
var jomek = pickRandom(memsk)
lexxy.sendMessage(from, { image: { url: jomek }, caption: `?? Random ${command}` }, { quoted: msg })
}
break
case prefix+'emilia':{
reply(mess.wait)
var memsk = JSON.parse(fs.readFileSync('./db/data/emilia.json'))
var jomek = pickRandom(memsk)
lexxy.sendMessage(from, { image: { url: jomek }, caption: `?? Random ${command}` }, { quoted: msg })
}
break
case prefix+'hinata':{
reply(mess.wait)
var memsk = JSON.parse(fs.readFileSync('./db/data/hinata.json'))
var jomek = pickRandom(memsk)
lexxy.sendMessage(from, { image: { url: jomek }, caption: `?? Random ${command}` }, { quoted: msg })
}
break
case prefix+'isuzu':{
reply(mess.wait)
var memsk = JSON.parse(fs.readFileSync('./db/data/isuzu.json'))
var jomek = pickRandom(memsk)
lexxy.sendMessage(from, { image: { url: jomek }, caption: `?? Random ${command}` }, { quoted: msg })
}
break
case prefix+'cogan':{
reply(mess.wait)
var memsk = JSON.parse(fs.readFileSync('./media/RANDOM/Cogan.json'))
var jomek = pickRandom(memsk)
var cogAn = await getBuffer(jomek)
lexxy.sendMessage(from, { image: cogAn, caption: '?? Random Cogan' }, { quoted: msg })
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'cecan':{


reply(mess.wait)
var memsk = JSON.parse(fs.readFileSync('./media/RANDOM/Cecan.json'))
var jomek = pickRandom(memsk)
var cecAn = await getBuffer(jomek.url)
lexxy.sendMessage(from, { image: cecAn, caption: '?? Random Cecan' }, { quoted: msg })
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'anime':{

reply(mess.wait)
var memsk = JSON.parse(fs.readFileSync('./media/RANDOM/Anime.json'))
var jomek = pickRandom(memsk)
lexxy.sendMessage(from, { image: { url: jomek.url }, caption: '?? Random Anime' }, {quoted:msg})
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'meme':{


reply(mess.wait)
var mems = JSON.parse(fs.readFileSync('./media/RANDOM/Meme.json'))
var jomek = pickRandom(mems)
var gimemm = await getBuffer(jomek)
lexxy.sendMessage(from, { image: gimemm, caption: '?? Random Meme'}, { quoted: msg})
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'jokes':{


reply(mess.wait)
var memsk = JSON.parse(fs.readFileSync('./media/RANDOM/Darkjokes.json'))
var jomek = pickRandom(memsk)
var jokss = await getBuffer(jomek)
lexxy.sendMessage(from, { image: jokss, caption: '?? Random Darkjoke' }, { quoted: msg})
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'bucin':{


reply(mess.wait)
var memsk = JSON.parse(fs.readFileSync('./media/KATA-KATA/bucin.json'))
var jomek = pickRandom(memsk)
reply(`${jomek}\n\n?? random kata bucin.`)
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'ppcouple':
case prefix+'couple':{


reply(mess.wait)
var memsk = JSON.parse(fs.readFileSync('./media/RANDOM/Couple.json'))
var jomek = pickRandom(memsk)
var cewek = await getBuffer(jomek.male)
var cowok = await getBuffer(jomek.female)
lexxy.sendMessage(from, { image: cewek, caption: '?? pp cowoknya' }, { quoted: msg})
lexxy.sendMessage(from, { image: cowok, caption: '?? pp ceweknya' }, { quoted: msg})
}
addCmd(command.slice(1), 1, commund)
addHit(sender, command)

break
case prefix+'dare':{
var thumbDaree = await reSize(fs.readFileSync('./media/truth.png'), 200, 120)
reply(mess.wait)
var daree = JSON.parse(fs.readFileSync('./media/KATA-KATA/dare.json'))
var kukus = pickRandom(daree)
let dareText = `*DARE*\n${kukus.dare}\n\nketik ${command} untuk melanjutkan`
lexxy.sendMessage(from, {image: thumbDaree, caption: dareText}, { quoted : msg })
  }
addCmd(command.slice(1), 1, commund)
addHit(sender, command)
break

case prefix+'truth':{
reply(mess.wait)
var thumbTruth = await reSize(fs.readFileSync('./media/truth.png'), 200, 120)
var daree = JSON.parse(fs.readFileSync('./media/KATA-KATA/truth.json'))
var kukus = pickRandom(daree)
let dareText = `*TRUTH*\n${kukus}\n\nketik ${command} untuk melanjutkan`
lexxy.sendMessage(from, {image: thumbTruth, caption: dareText}, { quoted : msg })
  }
addCmd(command.slice(1), 1, commund)
addHit(sender, command)
break
case prefix+'caklontong':
if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
if (isPlayGame(from, caklontong)) return reply(`Masih ada game yang belum diselesaikan`)
var soal = JSON.parse(fs.readFileSync('./media/GAMES/caklontong.json'))
var kukus = pickRandom(soal)
kukus.jawaban = kukus.jawaban.split('Jawaban ').join('')
var teks = `*CAK LONTONG*\n`+monospace(`Soal : ${kukus.soal}\nWaktu : ${gamewaktu}s`)
lexxy.sendMessage(from, {text: teks}, {quoted: msg })
.then( res => {
var jawab = kukus.jawaban.toLowerCase()
addPlayGame(from, 'Cak Lontong', jawab, gamewaktu, res, caklontong)
let ane = Number(parseInt(args[1]) * 1)
limitAdd(sender, glimit)
})
addCmd(command.slice(1), 1, commund)
break
case prefix+'susunkata':
if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
if (isPlayGame(from, susunkata)) return reply(`Masih ada game yang belum diselesaikan`)
var soal = JSON.parse(fs.readFileSync('./media/GAMES/susunkata.json'))
var kukus = pickRandom(soal)
kukus.jawaban = kukus.jawaban.split('Jawaban ').join('')
var teks = `*SUSUN KATA*\nSoal : ${kukus.soal}\nTipe : ${kukus.tipe}\nWaktu : ${gamewaktu}s`
lexxy.sendMessage(from, {text: teks}, {quoted: msg })
.then( res => {
var jawab = kukus.jawaban.toLowerCase()
addPlayGame(from, 'Susun Kata', jawab, gamewaktu, res, susunkata)
gameAdd(sender, glimit)
})
addCmd(command.slice(1), 1, commund)
break
case prefix+'siapakahaku':
if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
if (isPlayGame(from, siapakahaku)) return reply(`Masih ada game yang belum diselesaikan`)
var soal = JSON.parse(fs.readFileSync('./media/GAMES/siapakahaku.json'))
var kukus = pickRandom(soal)
kukus.jawaban = kukus.jawaban.split('Jawaban ').join('')
var teks = `*SUSUN KATA*\nSoal : ${kukus.soal}\nWaktu : ${gamewaktu}s`
lexxy.sendMessage(from, {text: teks}, {quoted: msg })
.then( res => {
var jawab = kukus.jawaban.toLowerCase()
addPlayGame(from, 'Siapakah Aku', jawab, gamewaktu, res, siapakahaku)
gameAdd(sender, glimit)
})
addCmd(command.slice(1), 1, commund)
break
case prefix+'tebakkalimat':
if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
if (isPlayGame(from, tebakkalimat)) return reply(`Masih ada game yang belum diselesaikan`)
var soal = JSON.parse(fs.readFileSync('./media/GAMES/tebakkalimat.json'))
var kukus = pickRandom(soal)
kukus.jawaban = kukus.jawaban.split('Jawaban ').join('')
var teks = `*TEBAK KALIMAT*\nSoal : ${kukus.soal}\nWaktu : ${gamewaktu}s`
lexxy.sendMessage(from, {text: teks}, {quoted: msg })
.then( res => {
var jawab = kukus.jawaban.toLowerCase()
addPlayGame(from, 'Tebak Kalimat', jawab, gamewaktu, res, tebakkalimat)
gameAdd(sender, glimit)
})
addCmd(command.slice(1), 1, commund)
break
case prefix+'tebakkata':
if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
if (isPlayGame(from, tebakkata)) return reply(`Masih ada game yang belum diselesaikan`)
var soal = JSON.parse(fs.readFileSync('./media/GAMES/tebakkata.json'))
var kukus = pickRandom(soal)
kukus.jawaban = kukus.jawaban.split('Jawaban ').join('')
var teks = `*TEBAK KATA*\nSoal : ${kukus.soal}\nWaktu : ${gamewaktu}s`
lexxy.sendMessage(from, {text: teks}, {quoted: msg })
.then( res => {
var jawab = kukus.jawaban.toLowerCase()
addPlayGame(from, 'Tebak Kalimat', jawab, gamewaktu, res, tebakkata)
gameAdd(sender, glimit)
})
addCmd(command.slice(1), 1, commund)
break
case prefix+'tebaklirik':
if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
if (isPlayGame(from, tebaklirik)) return reply(`Masih ada game yang belum diselesaikan`)
var soal = JSON.parse(fs.readFileSync('./media/GAMES/tebaklirik.json'))
var kukus = pickRandom(soal)
kukus.jawaban = kukus.jawaban.split('Jawaban ').join('')
var teks = `*TEBAK LIRIK*\nSoal : ${kukus.soal}\nWaktu : ${gamewaktu}s`
lexxy.sendMessage(from, {text: teks}, {quoted: msg })
.then( res => {
var jawab = kukus.jawaban.toLowerCase()
addPlayGame(from, 'Tebak Lirik', jawab, gamewaktu, res, tebaklirik)
gameAdd(sender, glimit)
})
addCmd(command.slice(1), 1, commund)
break
case prefix+'tebaktebakan':
if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
if (isPlayGame(from, tebaktebakan)) return reply(`Masih ada game yang belum diselesaikan`)
var soal = JSON.parse(fs.readFileSync('./media/GAMES/tebaktebakan.json'))
var kukus = pickRandom(soal)
kukus.jawaban = kukus.jawaban.split('Jawaban ').join('')
var teks = `*TEBAK TEBAKAN*\nSoal : ${kukus.soal}\nWaktu : ${gamewaktu}s`
lexxy.sendMessage(from, {text: teks}, {quoted: msg })
.then( res => {
var jawab = kukus.jawaban.toLowerCase()
addPlayGame(from, 'Tebak Tebakan', jawab, gamewaktu, res, tebaktebakan)
gameAdd(sender, glimit)
})
addCmd(command.slice(1), 1, commund)
break
case prefix+'tekateki':
if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
if (isPlayGame(from, tekateki)) return reply(`Masih ada game yang belum diselesaikan`)
var soal = JSON.parse(fs.readFileSync('./media/GAMES/tekateki.json'))
var kukus = pickRandom(soal)
kukus.jawaban = kukus.jawaban.split('Jawaban ').join('')
var teks = `*TEBAK TEBAKAN*\nSoal : ${kukus.soal}\nWaktu : ${gamewaktu}s`
lexxy.sendMessage(from, {text: teks}, {quoted: msg })
.then( res => {
var jawab = kukus.jawaban.toLowerCase()
addPlayGame(from, 'Teka Teki', jawab, gamewaktu, res, tekateki)
gameAdd(sender, glimit)
})
addCmd(command.slice(1), 1, commund)
break
case prefix+'tebakgambar':
if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
if (isPlayGame(from, tebakgambar)) return reply(`Masih ada game yang belum diselesaikan`)
var soal = JSON.parse(fs.readFileSync('./media/GAMES/tebakgambar.json'))
var data = pickRandom(soal)
data.jawaban = data.jawaban.split('Jawaban ').join('')
var teks = `*TEBAK GAMBAR*\nPetunjuk : ${data.deskripsi}\nWaktu : ${gamewaktu}s`
lexxy.sendMessage(from, { image: { url: data.img }, caption: teks }, { quoted: msg })
.then( res => {
var jawab = data.jawaban.toLowerCase()
addPlayGame(from, 'Tebak Gambar', jawab, gamewaktu, res, tebakgambar)
gameAdd(sender, glimit)
})
addCmd(command.slice(1), 1, commund)
break
case prefix+'tebakgame':
if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
if (isPlayGame(from, tebakgame)) return reply(`Masih ada game yang belum diselesaikan`)
var soal = JSON.parse(fs.readFileSync('./media/GAMES/tebakgame.json'))
var data = pickRandom(soal)
data.jawaban = data.jawaban.split('Jawaban ').join('')
var teks = `*TEBAK GAME*\nWaktu : ${gamewaktu}s`
lexxy.sendMessage(from, { image: { url: data.img }, caption: teks }, { quoted: msg })
.then( res => {
var jawab = data.jawaban.toLowerCase()
addPlayGame(from, 'Tebak Game', jawab, gamewaktu, res, tebakgame)
gameAdd(sender, glimit)
})
addCmd(command.slice(1), 1, commund)
break
case prefix+'ramalanjodoh': case prefix+'ramaljodoh': {
if (!q) return reply(`Example :\n${command} Yanto, 7, 7, 2005, Yanti, 16, 11, 2004`)
let [nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2] = q.split`,`
let anu = await primbon.ramalan_jodoh(nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2)
if (anu.status == false) return reply(anu.message)
reply(`> *Nama Anda :* ${anu.message.nama_anda.nama}\n> *Lahir Anda :* ${anu.message.nama_anda.tgl_lahir}\n> *Nama Pasangan :* ${anu.message.nama_pasangan.nama}\n> *Lahir Pasangan :* ${anu.message.nama_pasangan.tgl_lahir}\n> *Hasil :* ${anu.message.result}\n> *Catatan :* ${anu.message.catatan}`)
}
break
case prefix+'nomorhoki':{
if (!q) return reply(`Example :\n${command} 6288292024190`)
let anu = await primbon.nomer_hoki(q)
if (anu.status == false) return reply(anu.message)
reply (`> *Nomor HP :* ${anu.message.nomer_hp}\n> *Angka Shuzi :* ${anu.message.angka_shuzi}\n> *Energi Positif :*\n- Kekayaan : ${anu.message.energi_positif.kekayaan}\n- Kesehatan : ${anu.message.energi_positif.kesehatan}\n- Cinta : ${anu.message.energi_positif.cinta}\n- Kestabilan : ${anu.message.energi_positif.kestabilan}\n- Persentase : ${anu.message.energi_positif.persentase}\n> *Energi Negatif :*\n- Perselisihan : ${anu.message.energi_negatif.perselisihan}\n- Kehilangan : ${anu.message.energi_negatif.kehilangan}\n- Malapetaka : ${anu.message.energi_negatif.malapetaka}\n- Kehancuran : ${anu.message.energi_negatif.kehancuran}\n- Persentase : ${anu.message.energi_negatif.persentase}`)
}
break
case prefix+'artimimpi': case prefix+'tafsirmimpi': {
 if (!q) return reply( `Example :\n${command} belanja`)
let anu = await primbon.tafsir_mimpi(q)
if (anu.status == false) return m.reply(anu.message)
reply(`> *Mimpi :* ${anu.message.mimpi}\n> *Arti :* ${anu.message.arti}\n> *Solusi :* ${anu.message.solusi}`)
}
break
case prefix+'ramalanjodohbali': case prefix+'ramaljodohbali': {
if (!q) return reply( `Example :\n${command} Yanto, 7, 7, 2005, Yanti, 16, 11, 2004`)
let [nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2] = q.split`,`
let anu = await primbon.ramalan_jodoh_bali(nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2)
if (anu.status == false) return reply(anu.message)
reply(`> *Nama Anda :* ${anu.message.nama_anda.nama}\n> *Lahir Anda :* ${anu.message.nama_anda.tgl_lahir}\n> *Nama Pasangan :* ${anu.message.nama_pasangan.nama}\n> *Lahir Pasangan :* ${anu.message.nama_pasangan.tgl_lahir}\n> *Hasil :* ${anu.message.result}\n> *Catatan :* ${anu.message.catatan}`)
}
break
case prefix+'suamiistri': {
if (!q) return reply( `Example :\n${command} Yanto, 7, 7, 2005, Yanti, 16, 11, 2004`)
let [nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2] = q.split`,`
let anu = await primbon.suami_istri(nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2)
if (anu.status == false) return m.reply(anu.message)
reply(`> *Nama Suami :* ${anu.message.suami.nama}\n> *Lahir Suami :* ${anu.message.suami.tgl_lahir}\n> *Nama Istri :* ${anu.message.istri.nama}\n> *Lahir Istri :* ${anu.message.istri.tgl_lahir}\n> *Hasil :* ${anu.message.result}\n> *Catatan :* ${anu.message.catatan}`)
}
break
case prefix+'ramalancinta': case prefix+'ramalcinta': {
if (!q) return reply(`Example :\n${command} Yanto, 7, 7, 2005, Yanti, 16, 11, 2004`)
let [nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2] = q.split`,`
let anu = await primbon.ramalan_cinta(nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2)
if (anu.status == false) return reply(anu.message)
reply(`> *Nama Anda :* ${anu.message.nama_anda.nama}\n> *Lahir Anda :* ${anu.message.nama_anda.tgl_lahir}\n> *Nama Pasangan :* ${anu.message.nama_pasangan.nama}\n> *Lahir Pasangan :* ${anu.message.nama_pasangan.tgl_lahir}\n> *Sisi Positif :* ${anu.message.sisi_positif}\n> *Sisi Negatif :* ${anu.message.sisi_negatif}\n> *Catatan :* ${anu.message.catatan}`)
}
break
case prefix+'artinama':{            
if (!q) return reply(`Example :\n${command} Yanto`)
let anu = await primbon.arti_nama(text)
if (anu.status == false) return reply(anu.message)
reply(`> *Nama :* ${q}\n> *Arti :* ${anu.message.arti}\n> *Catatan :* ${anu.message.catatan}`)
}
break
case prefix+'kecocokannama': case prefix+'cocoknama': {
if (!q) return reply( `Example :\n${command} yanto, 7, 7, 2005`)
let [nama, tgl, bln, thn] = q.split`,`
let anu = await primbon.kecocokan_nama(nama, tgl, bln, thn)
if (anu.status == false) return reply(anu.message)
reply(`> *Nama :* ${anu.message.nama}\n> *Lahir :* ${anu.message.tgl_lahir}\n> *Life Path :* ${anu.message.life_path}\n> *Destiny :* ${anu.message.destiny}\n> *Destiny Desire :* ${anu.message.destiny_desire}\n> *Personality :* ${anu.message.personality}\n> *Persentase :* ${anu.message.persentase_kecocokan}`)
}
break
case prefix+'kecocokanpasangan': case prefix+'cocokpasangan': case prefix+'pasangan': {
if (!q) return reply(`Example :\n${command} yanto|yanti`)
let [nama1, nama2] = q.split`|`
let anu = await primbon.kecocokan_nama_pasangan(nama1, nama2)
if (anu.status == false) return reply(anu.message)
reply(`> *Nama Anda :* ${anu.message.nama_anda}\n> *Nama Pasangan :* ${anu.message.nama_pasangan}\n> *Sisi Positif :* ${anu.message.sisi_positif}\n> *Sisi Negatif :* ${anu.message.sisi_negatif}`)
}
break
case prefix+'sifatusaha': {
if (!q) return reply(`Example : ${command} 24, 10, 2005`)
let [tgl, bln, thn] = q.split`,`
let anu = await primbon.sifat_usaha_bisnis(tgl, bln, thn)
if (anu.status == false) return reply(anu.message)
reply(`> *Lahir :* ${anu.message.hari_lahir}\n> *Usaha :* ${anu.message.usaha}`)
}
break
case prefix+'menfes':
case prefix+'menfess':{
if (!isPremium) return reply(mess.OnlyPrem)
if (!q) return reply(`Kirim Perintah ${command} nama|nomor|pesan\n\nContoh :\n${command} Lexxy|6283834558105|Hallo Bang\n\n*Note :*\n_Nomor Wajib Awal 628xxxx_`)
let [namaNya, nomorNya, pesanNya] = q.split`|`
var yoi = `[ *PESAN RAHASIA* ]\n_Nama : ${namaNya}_\n_Nomor : ${sender.split("@")[0]}_\n_Pesan : ${pesanNya}_`
var yoii = `Pesan dari ${pushname}`
const buttonsMenfess = [
{buttonId: `${prefix}kirkonn ${sender.split("@")[0]}|${nomorNya}|${namaNya}`, buttonText: { displayText: 'Send Contact'}, type: 1}
]
const buttonMessageYgygy = {
image: await reSize(setting.pathimg, 300, 200),
caption: yoi,
footer: yoii,
buttons: buttonsMenfess,
headerType: 4
}
const sendMsg = await lexxy.sendMessage(`${nomorNya}@s.whatsapp.net`, buttonMessageYgygy, { quoted: fkontak})
reply('Pesan berhasil dikirim ke nomor tujuan.')
}
break
case prefix+'kirkonn':{
var yyNonya = q.split("|")[0]
var nomorNya = q.split("|")[1]
var namaNya = q.split("|")[2]
sendContact(`${nomorNya}@s.whatsapp.net`, yyNonya.split('@s.whatsapp.net')[0], namaNya, msg)
}
break
case prefix+'react':

                   if (!isOwner) return reply(mess.OnlyOwner)
                   if (!isQuotedMsg) return reply(`Balas pesannya`)
                   if (args.length < 2) return reply(`Masukkan 1 emoji`)
                   if (!isEmoji(args[1])) return reply(`Itu bukan emoji!`)
                   if (isEmoji(args[1]).length > 1) return reply(`Satu aja emojinya`)
                   var reactMsg = { reactionMessage: {
                        key: {
                          remoteJid: from,
                          fromMe: quotedMsg.fromMe,
                          id: quotedMsg.id,
                          participant: quotedMsg.sender
                        },
                        text: args[1]
                      }
                   }
                   lexxy.sendMessageFromContent(from, reactMsg)
                   break
case prefix+'say':

              //     if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                   if (args.length < 2) return reply(`Kirim perintah ${command} teks`)
                //   addCountCmd('#say', sender, _cmd)
                   var lang = q.split("--")[1]
                   if (!lang) lang = 'id'
                   var gen = ["female", "male"].includes(args[1]) ? args[1] : 'male'
                   var teks = ["female", "male"].includes(args[1]) ? (q.slice(args[1].length + 1, q.length).split('--')[0]) : q.split('--')[0]
                   lexxy.sendPresenceUpdate('recording', from)
                   getBuffer(`http://texttospeech.responsivevoice.org/v1/text:synthesize?text=${removeEmojis(teks)}&lang=${lang}&engine=g3&name=&pitch=0.5&rate=0.420&volume=1&key=0POmS5Y2&gender=${gen}`)
                   .then(async(buf) => {
                    lexxy.sendMessage(from, { audio: buf, mimetype: 'audio/mp4', ptt: true }, { quoted: msg })
               //  limitAdd(sender, limit)
                   })
                   break
case prefix+'towame':
                   if (!isPremium) return reply(mess.OnlyPrem)
                //   if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                   if (isQuotedMsg) {
                     if (quotedMsg.chats.length > 1) {
                       var all = quotedMsg.chats.split('\n')
                       var teks = ''
                       for (let i of all) {
                         var a = i.replace(/[+| |(|)|.|-]/gi, "")
                         var b = parseInt(a)
                         if (!b) teks += `${i} fail`
                         teks += `wa.me/`+b+'\n'
                       }
                       reply(teks.trim())
                //       limitAdd(sender, limit)
                     } else {
                  //     addCountCmd('#towame', sender, _cmd)
                       var a = quotedMsg.chats.replace(/[+| |(|)|.|-]/gi, "")
                       var b = parseInt(a)
                       if (!b) return reply("Pastikan hanya reply angka")
                       reply("wa.me/"+b)
                   //   limitAdd(sender, limit)
                     }
                   } else if (args.length > 1) {
                  //   addCountCmd('#towame', sender, _cmd)
                     if (q.split('\n').length > 1) {
                       var all = q.split('\n')
                       var teks = ''
                       for (let i of all) {
                         var a = i.replace(/[+| |(|)|.|-]/gi, "")
                         var b = parseInt(a)
                         if (!b) teks += `${i} fail`
                         teks += `wa.me/`+b+'\n'
                       }
                       reply(teks.trim())
                     //  limitAdd(sender, limit)
                     } else {
                       var a = q.replace(/[+| |(|)|.|-]/gi, "")
                       var b = parseInt(a)
                       if (!b) return reply("Pastikan hanya angka")
                       reply("wa.me/"+b)
                      // limitAdd(sender, limit)
                     }
                   } else {
                     reply(`Kirim perintah ${command} nomer atau balas pesan nomernya dengan caption ${command}`)
                   }
                   break
case prefix+'q': case prefix+'getquotedmsg':
                case prefix+'getquoted': case prefix+'quoted':
                   if (!isPremium) return reply(mess.OnlyPrem)
                   if (!isQuotedMsg) return reply(`Balas Pesannya!`)
                   var data = await store.loadMessage(from, quotedMsg.id)
                   data = serialize(lexxy, data)
                   if (data.isQuotedMsg !== true) return reply(`The message you replied to contained no reply`)
                   var typ = Object.keys(data.message)[0]
                //   addCountCmd('#getquotedmsg', sender, _cmd)
                   if (data.message[typ].contextInfo.quotedMessage.conversation) {
                     reply(`${data.message[typ].contextInfo.quotedMessage.conversation}`)
                   } else {
                     var anu = data.message[typ].contextInfo.quotedMessage
                     lexxy.sendMessageFromContent(from, anu)
                   }
                   break
case prefix+'setsewa':
                if (!isGroup)return reply(mess.OnlyGrup)
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`Penggunaan :\n${command} add\n${command} del`)
                if (args[1].toLowerCase() === 'add'){
                  if (!args[2]) return reply(`Kirim perintah ${command} add waktu\nKirim perintah pada grup yang ingin di tambahkan\n\nUntuk melihat waktu silahkan ketik ${prefix}listwaktu`)
                  //  addCountCmd('#setsewa', sender, _cmd)
                    _sewa.addSewaGroup(from, args[2], sewa)
                    reply(`Success`)
                } else if (args[1].toLowerCase() === 'del'){
                  if (!args[2]) return reply(`Kirim perintah ${command} del idgrup, atau kirim perintah di grupnya\n\nUntuk cara ambil id group nya tinggal ketik : ${prefix}id`)
                 //  addCountCmd('#setsewa', sender, _cmd)
                    sewa.splice(_sewa.getSewaPosition(args[2] ? args[2] : from, sewa), 1)
                    fs.writeFileSync('./database/sewa.json', JSON.stringify(sewa))
                    reply(`Success`)
                } else {
                   reply(`Penggunaan :\n*${prefix}+sewa* add/del waktu`)
                }
                break
            case prefix+'listsewa':{
                if (!isOwner) return reply(mess.OnlyOwner)
            //    addCountCmd('#listsewa', sender, _cmd)
                var tkt = `List Sewa Bot\nJumlah : ${sewa.length}\n\n`
                for (let i of sewa) {
                  tkt += `*ID :* ${i.id}\n`
                  if (i.expired === 'PERMANENT') {
                    let cekvip = 'PERMANENT'
                    tkt += `*Expire :* PERMANENT\n\n`
                  } else {
                    let cekvip = ms(i.expired - Date.now())
                    tkt += `*Expire :* ${cekvip.days} day ${cekvip.hours} hour ${cekvip.minutes} minute ${cekvip.seconds} second\n\n`
                  }
                }
                reply(tkt)
                }
                break
            case prefix+'sewacheck':
            case prefix+'ceksewa': {
                if (!isGroup)return reply(mess.OnlyGrup)
                if (!isSewa) return reply(`Bot tidak di sewa group ini!`)
             //   addCountCmd('#ceksewa', sender, _cmd)
                let cekvip = ms(_sewa.getSewaExpired(from, sewa) - Date.now())
                let premiumnya = `*Expire :* ${cekvip.days} day(s) ${cekvip.hours} hour(s) ${cekvip.minutes} minute(s)`
                reply(premiumnya)
                }
                break
case prefix+'listwaktu':{
if (!isOwner) return reply(mess.OnlyOwner)
reply(`*LIST WAKTU*
d = days
h = hours
m = minutes

*TRANSLATE*
days > hari
hours > jam
minutes > menit`)
}
break
case prefix+'cekprem':
                case prefix+'cekpremium':
                   if (!isPremium) return reply(`Kamu bukan user premium, kirim perintah *${prefix}daftarprem* untuk membeli premium`)
               //    addCountCmd('#cekpremium', sender, _cmd)
                   if (isOwner) return reply(`Lu owner bego!`)
                   if (_prem.getPremiumExpired(sender, premium) == "PERMANENT") return reply(`PERMANENT`)
                   let cekvip = ms(_prem.getPremiumExpired(sender, premium) - Date.now())
                   let premiumnya = `*Expire :* ${cekvip.days} day(s) ${cekvip.hours} hour(s) ${cekvip.minutes} minute(s)`
                   reply(premiumnya)
                   break
                case prefix+'listprem':
                  // addCountCmd('#listprem', sender, _cmd)
                   let txt = `List Prem\nJumlah : ${premium.length}\n\n`
                   let men = [];
                   for (let i of premium) {
                     men.push(i.id)
                     txt += `*ID :* @${i.id.split("@")[0]}\n`
                     if (i.expired === 'PERMANENT') {
                       let cekvip = 'PERMANENT'
                       txt += `*Expire :* PERMANENT\n\n`
                     } else {
                       let cekvip = ms(i.expired - Date.now())
                       txt += `*Expire :* ${cekvip.days} day(s) ${cekvip.hours} hour(s) ${cekvip.minutes} minute(s) ${cekvip.seconds} second(s)\n\n`
                     }
                   }
                   mentions(txt, men, true)
                   break
                case prefix+'daftarprem': case prefix+'daftarpremium':
                   //addCountCmd('#daftarprem', sender, _cmd)
                   var teks = `${textprem(sender, prefix)}`
                   reply(teks)
                   break
case prefix+'addprem':
                   if (!isOwner) return reply(mess.OnlyOwner)
                   if (args.length < 2) return reply(`Penggunaan :\n*${prefix}addprem* @tag waktu\n*${prefix}addprem* nomor waktu\n\nContoh :\n${command} @tag 30d\n\nUntuk melihat waktu silahkan ketik ${prefix}listwaktu`)
                   if (!args[2]) return reply(`Mau yang berapa hari?`)
                   if (mentionUser.length !== 0) {
                   //  addCountCmd('#addprem', sender, _cmd)
                     _prem.addPremiumUser(mentionUser[0], args[2], premium)
                     reply('Sukses')
                   } else {
                     var cekap = await conn.onWhatsApp(args[1]+"@s.whatsapp.net")
                     if (cekap.length == 0) return reply(`Masukkan nomer yang valid/terdaftar di WhatsApp`)
                     addCountCmd('#addprem', sender, _cmd)
                     _prem.addPremiumUser(args[1]+'@s.whatsapp.net', args[2], premium)
                     reply('Sukses')
                   }
                   break
                case prefix+'delprem':
                   if (!isOwner) return reply(mess.OnlyOwner)
                   if (args.length < 2) return reply(`Penggunaan :\n*${prefix}delprem* @tag\n*${prefix}delprem* nomor`)
                   if (mentionUser.length !== 0){
                   // addCountCmd('#delprem', sender, _cmd)
                     premium.splice(_prem.getPremiumPosition(mentionUser[0], premium), 1)
                     fs.writeFileSync('./database/premium.json', JSON.stringify(premium))
                     reply('Sukses!')
                   } else {
                     addCountCmd('#delprem', sender, _cmd)
                     premium.splice(_prem.getPremiumPosition(args[1] + '@s.whatsapp.net', premium), 1)
                     fs.writeFileSync('./database/premium.json', JSON.stringify(premium))
                     reply('Sukses!')
                   }
                   break
case prefix+'brainly':{
if (!isPremium) return reply(mess.OnlyPrem)
if (!q) return reply(`Contoh : \n${command} siapa ir Soekarno`)
reply(mess.wait)
brainly(`${q}`).then(brinn => {
console.log(brinn)
var brainn = brinn.data
var hmm = `????????????????????????????????????\n`
for (let hasil of brainn) {
hmm += `\n*??? _BRAINLY_ ???*\n\n*??? Pertanyaan:* ${hasil.pertanyaan}\n\n*??? Jawaban:* ${hasil.jawaban[0].text}\n?????????????????????????????????\n\n`
}
reply(hmm)
});
}
break
case prefix+'buyprem': case prefix+'daftarprem': case prefix+'daftarpremium':
                //   addCountCmd('#daftarprem', sender, _cmd)
                   var teks = `Jika kamu ingin menjadi Member Premium, kamu cukup membayar Rp5.000 untuk 1 Minggu, Rp20.000 untuk 1 Bulan dan jika ingin menjadi Member Premium Permanen kamu hanya membayar Rp50.000. Jika berminat silahkan chat Owner Bot, ketik ${prefix}owner\n\nPembayaran bisa melalui Gopay/Pulsa/Shoopepay/Ovo`
                   reply(teks)
                   break
/*case prefix+'joko':{

const buttonsszz = [
  {buttonId: 'id1', buttonText: {displayText: 'Button 1'}, type: 1},
  {buttonId: 'id2', buttonText: {displayText: 'Button 2'}, type: 1},
  {buttonId: 'id3', buttonText: {displayText: 'Button 3'}, type: 1}
]

const buttonMessageYgygy = {
    image: await reSize(setting.pathimg, 300, 200),
    caption: "Hi it's button message",
    footer: 'Hello World',
    buttons: buttonsszz,
    headerType: 4
}

const sendMsg = await lexxy.sendMessage(from, buttonMessageYgygy, { quoted: fkontak})
}
break*/
default:
}
    } catch (err) {
        console.log(color('[ ERROR ]', 'red'), err)
    }
}
