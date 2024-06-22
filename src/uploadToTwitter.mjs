import { TwitterApi } from "twitter-api-v2";

export const uploadToTwitter = async (imageUrl) => {
  const twitterClient = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_KEY_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  });

  try {
    const imageResp = await fetch(imageUrl);
    const imageBuffer = Buffer.from(await imageResp.arrayBuffer());

    const mediaKey = await twitterClient.v1.uploadMedia(imageBuffer, {
      type: "jpg",
    });

    const tweet = await twitterClient.v2.tweet({
      media: { media_ids: [mediaKey] },
    });
    console.log("✅ Successfully posted to twitter!", tweet);
  } catch (error) {
    console.error("❌ Problem uploading media to twitter", error);
    throw new Error("Problem uploading media to twitter");
  }
};
