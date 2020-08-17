const Twitter = require('twitter');
const fetch = require('node-fetch');
const request = require('request').defaults({ encoding: null });

console.log("what environment is this?", process.env.NODE_ENV)

if (process.env.NODE_ENV === "development") {
  require('dotenv').config()
}

// TODO: remove hard coding of these keys
const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

function sendImageToTwitter(imageBuffer) {
  console.log('posting shibe?');

  // let data = fs.readFileSync(imagePath)
  // Make post request on media endpoint. Pass file data as media parameter
  client.post('media/upload', { media: imageBuffer }, (error, media, response) => {

    if (error) {
      console.error("Something went wrong uploading image", error)
    } else {

      client.post('statuses/update', { status: "", media_ids: media.media_id_string })
        .then(resp => console.log("success", resp))
        .catch(error => console.error("prblem posting to twitter", error))
        ;
    }
  });
}

fetch('http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true')
  .then((res) => res.json())
  .then((json) => json[0])
  .then((imageURL) => {
    request.get(imageURL, (err, res, body) => {
      sendImageToTwitter(body);
    });
  })
  .catch((error) => console.error('There was error getting a shibe :(', error));
