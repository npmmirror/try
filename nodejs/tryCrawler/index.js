var Crawler = require("crawler");

var c = new Crawler({
  maxConnections: 1,
  // rateLimit: 1000,
  // This will be called for each crawled page
  callback: function (error, res, done) {
    if (error) {
      console.log(error);
    } else {
      var $ = res.$;
      // $ is Cheerio by default
      //a lean implementation of core jQuery designed specifically for the server
      console.log(res.options.uri, $("title").text());
    }
    done();
  },
});

// Queue just one URL, with default callback
c.queue("http://bing.com");

// Queue a list of URLs
c.queue(["http://www.baidu.com/", "http://www.qq.com"]);

// Queue URLs with custom callbacks & parameters
c.queue([
  {
    uri: "http://www.hao123.com/",
    // jQuery: false,

    // The global callback won't be called
    callback: function (error, res, done) {
      if (error) {
        console.log(error);
      } else {
        var $ = res.$;
        console.log("😳", res.options.uri, $("title").text());
        // console.log("Grabbed", res.body.length, "bytes");
      }
      done();
    },
  },
]);

// Queue some HTML code directly without grabbing (mostly for tests)
// c.queue([
//   {
//     html: "<p>This is a <strong>test</strong></p>",
//   },
// ]);
