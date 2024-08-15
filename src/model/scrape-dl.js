const cheerio = require('cheerio')
const fetch = require('node-fetch')
const axios = require("axios")

async function spotifydl(url)  {
  return new Promise(async (resolve, reject) => {
    try {
      const yanzz = await axios.get(
        `https://api.fabdl.com/spotify/get?url=${encodeURIComponent(url)}`,
        {
          headers: {
            accept: "application/json, text/plain, */*",
            "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
            "sec-ch-ua": "\"Not)A;Brand\";v=\"24\", \"Chromium\";v=\"116\"",
            "sec-ch-ua-mobile": "?1",
            "sec-ch-ua-platform": "\"Android\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "cross-site",
            Referer: "https://spotifydownload.org/",
            "Referrer-Policy": "strict-origin-when-cross-origin",
          },
        }
      );
      const yanz = await axios.get(
        `https://api.fabdl.com/spotify/mp3-convert-task/${yanzz.data.result.gid}/${yanzz.data.result.id}`,
        {
          headers: {
            accept: "application/json, text/plain, */*",
            "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
            "sec-ch-ua": "\"Not)A;Brand\";v=\"24\", \"Chromium\";v=\"116\"",
            "sec-ch-ua-mobile": "?1",
            "sec-ch-ua-platform": "\"Android\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "cross-site",
            Referer: "https://spotifydownload.org/",
            "Referrer-Policy": "strict-origin-when-cross-origin",
          },
        }
      );
      const result = {};
      result.title = yanzz.data.result.name;
      result.type = yanzz.data.result.type;
      result.artis = yanzz.data.result.artists;
      result.durasi = yanzz.data.result.duration_ms;
      result.image = yanzz.data.result.image;
      result.download = "https://api.fabdl.com" + yanz.data.result.download_url;
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { spotifydl }