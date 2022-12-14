const Spotify = require('../../../lib/Spotify')
require ('../../../settings')
module.exports = {
    name: "spotify",
    alias: ["sp"],
    usage:`${prefa}sp [spotify_link]`,
    desc: "download songs from spotify",
    category: "Media",

    start: async(client, m, { command, prefix, text, args }) => {

   if (!text) return m.reply("Where is the url of spotify?")
        const spotify = new Spotify(text)
        const info = await spotify.getInfo()
        if ((info).error) return void m.reply('Provide a valid spotify track URL, Baka!')
        const { name, artists, album_name, release_date, cover_url } = info
        const details = `š§ *Title:* ${name || ''}\nš¤ *Artists:* ${(artists || []).join(
            ','
        )}\nš½ *Album:* ${album_name}\nš *Release Date:* ${release_date || ''}`
       const response = await client.sendMessage(m.from, { image: { url: cover_url }, caption: details }, { quoted: m })
        const buffer = await spotify.download()
        await client.sendMessage(m.from, { audio: buffer }, { quoted: response })
    }
}
/* 
The Copyright Of this code is belongs to AliAryanTech
*/