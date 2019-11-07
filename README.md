# icons

## Summary

`@rei/cedar-icons` is home to the raw svg files that conform to [REI's Iconography guidelines](https://rei.github.io/rei-cedar-docs/foundation/iconography/)

## Getting Started

### Installation

`npm install @rei/cedar-icons`

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

## Creating a custom sprite

### Via CLI

`@rei/cedar-icons` provides a command-line interface for creating/editing a SVG symbol definition file.

`npx icon-sprite` will start the CLI. Follow the instructions to create your customized sprite.

NOTE: If you are editing an existing sprite via the CLI it will only look for icons currently in the repo and anything not found within will be excluded from the output file (this may change with a future feature update).

### From within the repo

`npm run sprite` will function the same as above.

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
