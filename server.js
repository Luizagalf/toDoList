const express = require("express");
const serveStatic = require("serve-static");
const path = require("path");
const app = express();
app.use(serveStatic(path.join(__dirname, "build")));
const port = process.env.PORT || 3000;
app.listen(port);
