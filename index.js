const Twitter = require("twitter");
const fetch = require("node-fetch");
const request = require("request").defaults({ encoding: null });

if (process.env.NODE_ENV === "development") {
  require("dotenv").config()
}

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
})

function sendImageToTwitter(imageBuffer) {
  // Adapted from this example - https://github.com/desmondmorris/node-twitter/tree/master/examples#media
  client.post("media/upload", { media: imageBuffer }, (error, media) => {
    if (error) {
      console.error("Something went wrong uploading image...😫", error)
    } else {
      client.post("statuses/update", { status: "", media_ids: media.media_id_string })
        .then(resp => console.log("🐕‍🦺New shibe successfully posted!🐕‍🦺"))
        .catch(error => console.error("Thats ruff, something went wrong posting to Twitter...😒", error))
    }
  });
}

fetch("http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true")
  .then((res) => res.json())
  .then((json) => json[0]) 
  .then((imageURL) => {
    request.get(imageURL, (err, res, body) => {
      sendImageToTwitter(body);
    });
  })
  .catch((error) => console.error("There was an error fetching a shibe...😑", error));
