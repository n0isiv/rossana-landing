const connect = require("connect");
const serve_static = require("serve-static");

connect()
  .use(serve_static(__dirname))
  .listen(9000, function() {
    console.log("Server running on localhost:9000");
  });
