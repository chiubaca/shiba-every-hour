export const fetchRandomShibe = async () => {
  try {
    const resp = await fetch(
      `https://shibes.lol/api/random?&CLIENT_SECRET=${process.env.SHIBE_LOL_CLIENT_SECRET}`
    );

    const json = await resp.json();

    if (typeof json !== "object") {
      throw new Error("Response from shibe.lol was not JSON");
    }

    const imageUrl = json.img;

    return imageUrl;
  } catch (error) {
    throw new Error("Error getting image from shibe.lol", error);
  }
};
