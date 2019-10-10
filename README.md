# Icons

## Summary

`@rei/cedar-icons` is home to the raw svg files that conform to [REI's Iconography guidelines](https://rei.github.io/rei-cedar-docs/foundation/iconography/)

## Getting Started

There are 2 primary ways of consuming Cedar Icons:
- [reference the icon SVG via a sprite sheet](#Using-Icons-Inline)
- [render the icon SVG content inline](#Creating-a-custom-sprite)

Using a sprite sheet ensures that each icon used on your page is only included once. However, this does create an additional maintenance cost as you must track exactly which icons are being used inside of your application, and adding a new icon to the page means generating a new sprite sheet.

Using inline icon components is the easiest way to consume Cedar Icons, as it ensures that the icon content is always available where it needs to be. However it does mean that some icons might be included multiple times in your bundle, especially if you are doing server-side rendering, which could have an impact on performance.

Which approach to take will depend on the needs of your project. Feel free to reach out to the Cedar team for help in assessing the best strategy for you.

## Using Icons Inline

### Installation

`npm install @rei/cedar-icons`

### Distributed Files

- `all-icons.svg`: SVG sprite sheet containing all of the icons
- `icons.esm.js`: ESM export of components. Exports are formatted in CamelCase and prefixed with `Icon`, i.e, `IconCaretDown`
- `icons.json`: JSON object.  kebab-case `caret-down`
- `/icons/`: folder of .svg files. kebab-case `caret-down.svg`
- `/components/`: folder of CJS (`caret-down.js`) and ESM (`caret-down.esm.js`)

### Using Inline Icon Components With CdrIcon

The Icon Components are a simple Vue wrapper around the SVG content. They should be rendered inside of a `CdrIcon` component to ensure that the icon is sized and styled correctly to work with the Cedar design system. However, the Icon components can also be rendered as plain SVG on their own if needed.

```
<script>
import { CdrIcon } from '@rei/cedar';
import { IconAccountProfile } from '@rei/cedar-icons';

export default {
  components: {
    IconAccountProfile,
    CdrIcon
  },
}

</script>
<template>
  <cdr-icon>
    <icon-account-profile />
  </cdr-icon>
</template>
```

### Using Inline Components in CommonJS

If your project is using CommonJS, you will need to import inline icon components directly from `/dist/icons` to ensure un-used icons are not included.

`const IconAccountProfile = require('@rei/cedar-icons/dist/components/account-profile');`

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
