const express = require("express");
const app = express();
const SerpApi = require("google-search-results-nodejs");
const path = require("path");

// Your SerpApi key
const apiKey =
  "1c78c6428160647bfc58023fad18f3c060160162a9fbd042947eeabc033f48db";

// Set the view engine to EJS
app.set("view engine", "ejs");
app.set("/views", path.join(__dirname, "views"));

app.get("/education", function (req, res) {
  res.render("pages/education");
});

// Serve static files from the "public" directory
// app.use('/public', express.static(path.join(__dirname, 'public')));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));

app.get("/", (req, res) => {
  const search = new SerpApi.GoogleSearch(apiKey);
  const params = {
    engine: "google_scholar_profiles",
    mauthors: "Amol Vibhute",
  };

  const callback = function (data) {
    let citedByData = "No cited-by data found.";
    if (data && data.profiles) {
      const profiles = data.profiles;
      if (profiles.length > 0 && profiles[0].cited_by) {
        citedByData = JSON.stringify(profiles[0].cited_by, null, 2);
      }
    }

    // Render the indx.ejs template with the data
    res.render("index", { citedByData });
    // res.render('homepage');
  };

  // Perform the search
  search.json(params, callback);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
