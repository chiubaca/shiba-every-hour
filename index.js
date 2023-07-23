const { TwitterApi } = require("twitter-api-v2");
const fetch = require("node-fetch");

if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

const twitterClient = new TwitterApi({
  appKey: process.env.API_KEY,
  appSecret: process.env.API_KEY_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_TOKEN_SECRET,
});

async function uploadMediaToTwitter(imageData) {
  const mediaKey = await twitterClient.v1.uploadMedia(imageData, {
    type: "jpg",
  });
  return mediaKey;
}

async function main() {
  try {
    const resp = await fetch(
      "http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true"
    );

    const json = await resp.json();

    const imageUrl = json[0];

    const imgResp = await fetch(imageUrl);

    const imgBuffer = Buffer.from(await imgResp.arrayBuffer());

    const mediaKey = await uploadMediaToTwitter(imgBuffer);

    const tweet = await twitterClient.v2.tweet({
      media: { media_ids: [mediaKey] },
    });
    console.log("New shibe successfully posted!", tweet);
  } catch (error) {
    console.warn("There was a problem posting to shibe bot", error);
  }
}

main();
