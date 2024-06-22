import { parseArgs } from "node:util";

import { fetchRandomShibe } from "./fetchRandomShibe.mjs";
import { uploadToTwitter } from "./uploadToTwitter.mjs";
import { uploadToMastodon } from "./uploadToMastodon.mjs";
import { uploadToBlueSky } from "./uploadToBlueSky.mjs";

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

      case "bluesky":
        console.log("posting to bluesky...");
        uploadToBlueSky(imageUrl);
        break;

      default:
        console.warn(`Posting to ${SITE} is not implemented yet`);
        break;
    }
  } catch (error) {
    console.error(`Uncaught error posting shibe to ${SITE}`, error);
    throw new Error(`Uncaught error posting shibe to ${SITE}`, error);
  }
}

main();
