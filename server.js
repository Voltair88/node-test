const http = require("http");
const fs = require("fs");
const _ = require('lodash');

const server = http.createServer((req, res) => {
  const num = _.random(0, 1020);
  console.log(num)

  // set header content type
  res.setHeader("Content-Type", "text/html");

  let path = "./views/";
  switch (req.url) {
    case "/":
      path += "index.ejs";
      res.statusCode = 200;
      break;
    case "/about":
      path += "about.ejs";
      res.statusCode = 200;
      break;
    case "/about-me.ejs":
      res.statusCode = 301;
      res.setHeader('Location', '/about');
      break;
    default:
      path += "404.ejs";
      res.statusCode = 404;
      break;
  }

  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.end(data);
    }
  });
});

server.listen(3000, "localhost", () => {
  console.log("listening for request on port 3000");
});