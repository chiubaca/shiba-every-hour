import { parseArgs } from "node:util";

import { fetchRandomShibe } from "./fetchRandomShibe.mjs";
import { uploadToTwitter } from "./uploadToTwitter.mjs";
import { uploadToMastodon } from "./uploadToMastodon.mjs";

const { values } = parseArgs({
  options: {
    site: {
      type: "string",
      short: "s",
    },
  },
});

const SITE = values.site;

async function main() {
  try {
    const imageUrl = await fetchRandomShibe();

    switch (SITE) {
      case "twitter":
        console.log("posting to twitter...");
        uploadToTwitter(imageUrl);
        break;

      case "mastodon":
        console.log("posting to mastodon...");
        uploadToMastodon(imageUrl);
        break;

      default:
        console.warn(`Posting to ${site} is not implemented yet`);
        break;
    }
  } catch (error) {
    console.error("There was a problem posting to shibe bot", error);
    throw new Error("Uncaught error posting shibe");
  }
}

main();
