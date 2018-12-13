const documentation = require("documentation");
const streamArray = require("stream-array");
const vfs = require("vinyl-fs");
const path = require("path");

documentation
  .build(["**/_types/Project.js", "**/lib/helper.js"], {
    github: true
  })
  .then(comments =>
    documentation.formats.html(comments, {
      // inferred package.json if not provided by a config
      "project-name": "Name",
      "project-description": "Description",
      "project-url": "https://ec.europa.eu/commission/index_en",
      // path to the theme module
      // it's here as we are in the theme itself :)
      theme: "."
    })
  )
  .then(output => {
    streamArray(output).pipe(vfs.dest(path.resolve("./example/app")));
  });
