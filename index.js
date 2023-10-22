// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/:date?", function (req, res) {
  const { date } = req.params;

  if (!date) {
    const currentUnixTimestamp = Date.now();
    const currentUtcDate = new Date(currentUnixTimestamp).toUTCString();

    return res.json({ unix: currentUnixTimestamp, utc: currentUtcDate });
  }

  let unixTimestamp, utcDate;

  if (!isNaN(Number(date))) {
    const parsedDate = new Date(Number(date));
    if (!isNaN(parsedDate.getTime())) {
      unixTimestamp = parsedDate.getTime();
      utcDate = parsedDate.toUTCString();
    }
  }

  if (!unixTimestamp || !utcDate) {
    const parsedDate = new Date(date);

    if (!isNaN(parsedDate.getTime())) {
      unixTimestamp = parsedDate.getTime();
      utcDate = parsedDate.toUTCString();
    }
  }

  if (!unixTimestamp || !utcDate) {
    return res.status(400).json({ error: "Invalid Date" });
  }

  res.json({ unix: unixTimestamp, utc: utcDate });
});

// listen for requests :)

var listener = app.listen(51950, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
