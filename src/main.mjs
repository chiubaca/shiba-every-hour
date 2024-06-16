import { parseArgs } from "node:util";
import { uploadToTwitter } from "./uploadToTwitter.mjs";
import { fetchRandomShibe } from "./fetchRandomShibe.mjs";

const { values } = parseArgs({
  options: {
    site: {
      type: "string",
      short: "s",
    },
  },
});

const SITE = values.site;

if (SITE !== "twitter") {
  throw new Error("invalid site");
}

async function main() {
  try {
    const imageBuffer = await fetchRandomShibe();

    switch (SITE) {
      case "twitter":
        console.log("posting to twitter...");
        uploadToTwitter(imageBuffer);
        break;

      default:
        console.warn(`posting to ${site} is not implemented yet`);
        break;
    }
  } catch (error) {
    console.error("There was a problem posting to shibe bot", error);
    throw new Error("Uncaught error posting shibe");
  }
}

main();
