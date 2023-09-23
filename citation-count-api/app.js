const express = require('express');
const app = express();
const SerpApi = require('google-search-results-nodejs');

// Your SerpApi key
const apiKey = "1c78c6428160647bfc58023fad18f3c060160162a9fbd042947eeabc033f48db";

app.use(express.static('public')); // Serve static files from the "public" directory

app.get('/', (req, res) => {
  const search = new SerpApi.GoogleSearch(apiKey);
  const params = {
    engine: "google_scholar_profiles",
    mauthors: "Amol Vibhute"
  };

  const callback = function(data) {
    let citedByData = "No cited-by data found.";
    if (data && data.profiles) {
      const profiles = data.profiles;
      if (profiles.length > 0 && profiles[0].cited_by) {
        citedByData = profiles[0].cited_by;
      }
    }
    res.send(`<html><body><h5>Cited-By Data:</h5><h1>${JSON.stringify(citedByData, null, 2)}</h1></body></html>`);
  };

  // Perform the search
  search.json(params, callback);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
