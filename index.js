// documentation.js module file
// ... not for bundlers
const fs = require("fs");
const path = require("path");
const File = require("vinyl");
const vfs = require("vinyl-fs");
const _ = require("lodash");
const concat = require("concat-stream");
const GithubSlugger = require("github-slugger");
const { createFormatters, LinkerStack } = require("documentation").util;
const hljs = require("highlight.js");

function isFunction(section) {
  return (
    section.kind === "function" ||
    (section.kind === "typedef" &&
      section.type.type === "NameExpression" &&
      section.type.name === "Function")
  );
}

module.exports = (comments, config) => {
  const linkerStack = new LinkerStack(config).namespaceResolver(
    comments,
    namespace => {
      const slugger = new GithubSlugger();
      return `#${slugger.slug(namespace)}`;
    }
  );

  const formatters = createFormatters(linkerStack.link);

  hljs.configure(config.hljs || {});

  const sharedImports = {
    imports: {
      slug(str) {
        const slugger = new GithubSlugger();
        return slugger.slug(str);
      },
      shortSignature(section) {
        let prefix = "";
        if (section.kind === "class") {
          prefix = "new ";
        } else if (!isFunction(section)) {
          return section.name;
        }
        return prefix + section.name + formatters.parameters(section, true);
      },
      signature(section) {
        let returns = "";
        let prefix = "";
        if (section.kind === "class") {
          prefix = "new ";
        } else if (!isFunction(section)) {
          return section.name;
        }
        if (section.returns.length) {
          returns = `: ${formatters.type(section.returns[0].type)}`;
        }
        return prefix + section.name + formatters.parameters(section) + returns;
      },
      md(ast, inline) {
        if (
          inline &&
          ast &&
          ast.children.length &&
          ast.children[0].type === "paragraph"
        ) {
          ast = {
            type: "root",
            children: ast.children[0].children.concat(ast.children.slice(1))
          };
        }
        return formatters.markdown(ast);
      },
      formatType: formatters.type,
      autolink: formatters.autolink,
      highlight(example) {
        if (config.hljs && config.hljs.highlightAuto) {
          return hljs.highlightAuto(example).value;
        }
        return hljs.highlight("js", example).value;
      }
    }
  };

  sharedImports.imports.renderSectionList = _.template(
    fs.readFileSync(path.join(__dirname, "/partials/section_list._"), "utf8"),
    sharedImports
  );

  sharedImports.imports.renderSection = _.template(
    fs.readFileSync(path.join(__dirname, "/partials/section._"), "utf8"),
    sharedImports
  );

  sharedImports.imports.renderNote = _.template(
    fs.readFileSync(path.join(__dirname, "/partials/note._"), "utf8"),
    sharedImports
  );

  sharedImports.imports.renderParamProperty = _.template(
    fs.readFileSync(path.join(__dirname, "/partials/paramProperty._"), "utf8"),
    sharedImports
  );

  // ECL static partials
  sharedImports.imports.renderHeader = _.template(
    fs.readFileSync(path.join(__dirname, "/partials/header._"), "utf8"),
    sharedImports
  );

  sharedImports.imports.renderFooter = _.template(
    fs.readFileSync(path.join(__dirname, "/partials/footer._"), "utf8"),
    sharedImports
  );

  const pageTemplate = _.template(
    fs.readFileSync(path.join(__dirname, "index._"), "utf8"),
    sharedImports
  );

  // push assets into the pipeline as well.
  return new Promise(resolve => {
    vfs
      // the result of the bundler which interests the user in the end
      .src(
        [
          `${__dirname}/assets/bundle/**`,
          `${__dirname}/assets/vendor/**`,
          `${__dirname}/assets/favicon/**`
        ],
        {
          base: __dirname
        }
      )
      .pipe(
        concat(files => {
          resolve(
            files.concat(
              new File({
                path: "index.html",
                contents: new Buffer(
                  pageTemplate({
                    docs: comments,
                    config
                  }),
                  "utf8"
                )
              })
            )
          );
        })
      );
  });
};
