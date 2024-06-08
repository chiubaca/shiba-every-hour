import { TwitterApi } from "twitter-api-v2";
import fetch from "node-fetch";

import 'dotenv/config'

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
      `https://shibes.lol/api/random?&CLIENT_SECRET=${process.env.SHIBE_LOL_CLIENT_SECRET}`
    );

    const json = await resp.json();

    if (typeof json !== "object") {
      console.error("JSON was not an object", json);
      throw new Error("JSON was not an object");
    }

    const imageUrl = json.img;

    const imgResp = await fetch(imageUrl);

    const imgBuffer = Buffer.from(await imgResp.arrayBuffer());

    const mediaKey = await uploadMediaToTwitter(imgBuffer);

    const tweet = await twitterClient.v2.tweet({
      media: { media_ids: [mediaKey] },
    });
    console.log("New shibe successfully posted!", tweet);
  } catch (error) {
    console.error("There was a problem posting to shibe bot", error);
    throw new Error("Uncaught error posting shibe");
  }
}

main();
