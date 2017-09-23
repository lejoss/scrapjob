const fs = require("fs");
const request = require("request-promise");
const cheerio = require("cheerio");

module.exports = {
  getJobs: function() {
    const jobs = [];
    const uri =
      "https://www.computrabajo.com.co/ofertas-de-trabajo/?q=Inform%C3%A1tica&prov=20";

    const options = {
      uri: uri,
      transform: function(body) {
        return cheerio.load(body);
      }
    };

    return new Promise(function(resolve, reject) {
      request(options)
        .then(function($) {
          $("#p_ofertas > div > div").each(function() {
            const data = $(this);
            const title = data
              .children("h2")
              .text()
              .trim();
            const description = data
              .children("p")
              .text()
              .trim();
            const jobUrl = data
              .children("h2")
              .children("a")
              .attr("href");

            jobs.push({
              title: title,
              description: description,
              url: "https://www.computrabajo.com.co" + jobUrl
            });
					}, this);
					
          resolve(jobs);
        })
        .catch(function(err) {
          reject(err);
        });
    });
  }
};
