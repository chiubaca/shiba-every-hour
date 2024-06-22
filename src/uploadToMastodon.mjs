import { createRestAPIClient } from "masto";

export const uploadToMastodon = async (imageUrl) => {
  const masto = createRestAPIClient({
    url: "https://mas.to",
    accessToken: process.env.MASTODON_ACCESS_TOKEN_KEY,
  });

  try {
    const imageResp = await fetch(imageUrl);
    const imageBlob = await imageResp.blob();

    const attachment = await masto.v2.media.create({
      file: imageBlob,
      description: "a random shiba from shibes.lol",
    });

    const post = await masto.v1.statuses.create({
      visibility: "public",
      mediaIds: [attachment.id],
    });

    console.log("✅ Successfully posted to mas.to!", post.id);
  } catch (error) {
    console.error("❌ Problem uploading media to mas.to", error);
    throw new Error("Problem uploading media to mas.to");
  }
};
