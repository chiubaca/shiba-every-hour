import { TwitterApi } from "twitter-api-v2";

const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_KEY_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

export const uploadToTwitter = async (imgBuffer) => {
  try {
    const mediaKey = await twitterClient.v1.uploadMedia(imgBuffer, {
      type: "jpg",
    });

    const tweet = await twitterClient.v2.tweet({
      media: { media_ids: [mediaKey] },
    });
    console.log("✅ Successfully posted to twiiter!", tweet);
  } catch (error) {
    console.error("❌ Problem uploading media to twitter", error);
    throw new Error("Problem uploading media to twitter");
  }
};
