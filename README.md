# ECL theme for documentation.js

This is a custom theme for [documentationjs](https://github.com/documentationjs):
it consists of underscore templates and a few assets: a [highlight.js](https://highlightjs.org/)
theme and the base of [ECL](https://github.com/ec-europa/europa-component-library)

## Usage

### CLI

Use the [documentation.js CLI](https://github.com/documentationjs/documentation/blob/master/docs/USAGE.md)

Example:

```bash
$ npx documentation.js build **/your-files.js -f md --theme documentation-theme-ecl
```

Where the `--theme` flag should point to the module (index.js) of the theme.

### Node API

See [the html generation script](./example/scripts/docs-html.js) for an example of the
`formats.html` method as pointed out in the [documentation pages](https://github.com/documentationjs/documentation/blob/master/docs/NODE_API.md).

## Developing

### Build the example

```bash
$ node example/scripts/docs-html.js
```

This will generate an example site in `example/app` with the theme.
