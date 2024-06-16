import { TwitterApi } from "twitter-api-v2";

const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_KEY_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_TOKEN_SECRET,
});

export const uploadToTwitter = async (imgBuffer) => {
  try {
    const mediaKey = await twitterClient.v2.uploadMedia(imgBuffer, {
      mimeType: "jpg",
    });

    const tweet = await twitterClient.v2.tweet({
      media: { media_ids: [mediaKey] },
    });
    console.log("✅ Successly posted to twiiter!", tweet);
  } catch (error) {
    console.error("❌ Problem uploading media to twitter", error);
    throw new Error("Problem uploading media to twitter");
  }
};
