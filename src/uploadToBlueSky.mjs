import { BskyAgent } from "@atproto/api";

export const uploadToBlueSky = async (imageUrl) => {
  try {
    const agent = new BskyAgent({
      service: "https://bsky.social",
    });

    await agent.login({
      identifier: process.env.BLUESKY_USERNAME,
      password: process.env.BLUESKY_PASSWORD,
    });

    const imageResp = await fetch(imageUrl);
    const imageBlob = await imageResp.blob();

    const {
      data: { blob: image },
    } = await agent.uploadBlob(imageBlob, { encoding: "image/jpg" });

    const post = await agent.post({
      $type: "app.bsky.feed.post",
      text: "",
      embed: {
        $type: "app.bsky.embed.images",
        images: [{ image: image, alt: "random shiba from https://shibes.lol" }],
      },
    });
    console.log("✅ Successfully posted to bluesky", post);
  } catch (error) {
    console.error("❌ Problem uploading media to bluesky", error);
    throw new Error("Problem uploading media to bluesky");
  }
};
