# ECL theme for documentation.js

This is a custom theme for [documentation.js](http://documentation.js.org): it consists of underscore templates and a few assets: a [highlight.js](https://highlightjs.org/) theme and the base of [ECL](https://github.com/ec-europa/europa-component-library)

![Example documentation theme based on ECL](https://github.com/kalinchernev/documentation-theme-ecl/raw/master/example/screenshot.png)

## Options

The theme is ready to accept the following options from your configuration:

- `project-name`
- `project-description`

## Usage

### CLI

Use the [documentation.js CLI](https://github.com/documentationjs/documentation/blob/master/docs/USAGE.md)

Example:

```bash
$ npx documentation build **/_types/*.js --theme . -f html -o example/app
```

Where the `--theme` flag should point to the module (index.js) of the theme.

### Node API

See [the html generation script](./example/scripts/docs-html.js) for an example of the
`formats.html` method as pointed out in the [documentation pages](https://github.com/documentationjs/documentation/blob/master/docs/NODE_API.md).

## Theme development

Requirements:

- Node.js current (8.x recommended)
- `yarn` or `npm`

There are a few `npm` script tasks which you can use:

- `develop:assets`
- `develop:theme`
- `develop:server`

Order is important, so it's recommended you start a separate terminal session for each task.

### Develop assets

Takes care of CSS and JavaScript assets.

- Makes use of `webpack` CLI.
- Automatically discovers configuration from `webpack.config.js`
- Bundles assets to `assets/bundle`
- Watches for changes.

### Develop theme

Takes care of templates.

- Makes use of `documentationjs` CLI.
- Takes input of glob patterns where documentation should be extracted from.
- Builds HTML from underscore templates and moves `images`, `favicon` and `bundle` folders into a target `dist` folder. Thus, ensure that assets are bundled before they are moved.
- Watches for changes

### Develop server

Delivers results to the browser and reloads on changes.

- Makes use of `reload` CLI.
- Takes input of `dist` folder where `develop:theme` stores its results.
- Can optionally listen to different ports if necessary.
- Serves `dist` folder as a static site
- Reloads when there are changes in `dist` folder.

## Maintenance notes

Please commit the results of `develop:assets` in `assets/bundle`. This simplifies the workflow of publishing them to `npm`.
Raw/Source styles and scripts in `assets/js` and `assets/styles` are ignored and not published to `npm`.
