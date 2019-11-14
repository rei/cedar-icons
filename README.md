# icons

## Summary

`@rei/cedar-icons` is home to the raw svg files that conform to [REI's Iconography guidelines](https://rei.github.io/rei-cedar-docs/foundation/iconography/)

## Getting Started

There are 2 primary ways of consuming Cedar Icons:
- [reference the icon SVG via a sprite sheet](#Using-Icons-Inline)
- [render the icon SVG content inline](#Creating-a-custom-sprite)

Using a sprite sheet ensures that each icon used on your page is only included once. However this does create an additional maintenance cost as you must track exactly which icons are being used inside of your application, and adding a new icon to the page means generating a new sprite sheet.

Using inline icon components is the easiest way to consume Cedar Icons, as it ensures that the icon content is always available where it needs to be. However it does mean that some icons might be included multiple times in your bundle, especially if you are doing server-side rendering.

Which approach you take will depend on the needs of your project. Feel free to reach out to the Cedar team for help in assessing the best strategy for you.

## Creating a custom sprite

See the [CdrIcon](https://rei.github.io/rei-cedar-docs/components/icon/#svg-sprite) docs for more information on how to reference and load your sprite sheet in your application.

### Via CLI

`@rei/cedar-icons` provides a command-line interface for creating/editing a SVG symbol definition file.

`npx icon-sprite` will start the CLI. Follow the instructions to create your customized sprite.

NOTE: If you are editing an existing sprite via the CLI it will only look for icons currently in the repo and anything not found within will be excluded from the output file (this may change with a future feature update).

### From within the repo

`npm run sprite` will function the same as above.

## Using Icons Inline

To make it easier for consumers to inline individual icons we export single component versions of every SVG icon in this library from @rei/cedar. See the [CdrIcon docs](https://rei.github.io/rei-cedar-docs/components/icon/#inline-icon-components) for more information.

## Programmatic Usage

`npm install @rei/cedar-icons`

### Distributed Files

- `all-icons.svg`: SVG sprite sheet containing all of the icons.
- `icons.esm.js`: ESM export of SVG markup. Exports are formatted in CamelCase and prefixed with `Icon`: `IconCaretDown`
- `icons.js`: ESM export of SVG markup. Icon names are formatted in kebab-case: `caret-down`
- `icons.json`: JSON object.  Icon names formatted in kebab-case: `caret-down`
- `/icons/`: folder of .svg files. Filenames formatted in kebab-case: `caret-down.svg`

### Use

`@rei/cedar-icons` exposes an object that has the following structure:

```
{
  <icon-name>: <SVG String>
}
```

for example:

```
{
  camping: "<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">...</svg>"
}
```

## SVGs

Source svg files are found in `icons/`

## "Docs" view

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```
