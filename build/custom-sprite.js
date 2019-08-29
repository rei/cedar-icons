#!/usr/bin/env/ node

const inquirer = require('inquirer');
const fs = require('fs-extra');
const chalk = require('chalk');
const path = require('path');
const svgstore = require('svgstore');
const cheerio = require('cheerio');
const _ = require('lodash');
const allIcons = require('../dist/icons');

const sprite = svgstore();

const getIconsFromFile = filePath => {
  const icons = {};
  const xml = fs.readFileSync(filePath, 'utf8');
  const $ = cheerio.load(xml);
  $('symbol').each((i,el) => {
    const fullName = $(el).attr('id');
    const set = fullName.split('-')[0];
    const iconName = fullName.substring(fullName.indexOf('-') + 1);

    if (!_.has(icons, set)) {
      icons[set] = {};
    }
    icons[set][iconName] = '';
  })

  return icons;
};

const hasDeep = (obj, prop, ...rest) => {
  if (obj === undefined) return false
  if (rest.length == 0 && _.has(obj, prop)) return true
  return hasDeep(obj[prop], ...rest)
};

// Not used, but might be useful for future features
const uniqObjects = (base, compare) => {
  function diff(obj1, obj2) {
    return _.transform(obj1, function (result, value, key) {
      if (_.has(obj2, key)) {
        if (_.isObject(value) && _.isObject(obj2[key])) {
          result[key] = diff(value, obj2[key]);
        } 
      } else {
        result[key] = value;
      }
    });
  }

  return diff(base, compare);
}

const QUESTIONS = [
  {
    name: 'editing',
    type: 'confirm',
    message: 'Do you have an existing sprite to edit?',
  },
  {
    name: 'inputSprite',
    type: 'input',
    message: `Enter the path to the file: `,
    when(answers) {
      return answers.editing
    },
    validate(input) {
      if (fs.existsSync(input)) {
        if (path.extname(input) !== '.svg') return chalk.red('File must be an .svg');
        return true;
      }
      return chalk.red(`File does not exist, check the provided path`);
    }
  },
  {
    name: 'icons',
    type: 'checkbox',
    message: 'Choose your icons',
    choices(answers) {
      let iconChoices = [];
      let iconsToFilter = false;

      if (answers.editing) {
        iconsToFilter = getIconsFromFile(answers.inputSprite);
      }

      const sets = Object.keys(allIcons);

      sets.forEach(set => {
        iconChoices.push(new inquirer.Separator(`---${set}---`));

        const icons = Object.keys(allIcons[set]);
        icons.forEach(icon => {
          const isChecked = iconsToFilter === false ? false : hasDeep(iconsToFilter, set, icon);
          iconChoices.push({
            name: icon,
            value: { set, name: icon},
            checked: isChecked,
          });
        })
      })

      return iconChoices;
    }
  },
  {
    name: 'output',
    type: 'input',
    message: 'Where should the sprite be saved? (Path to file i.e. "./sprite.svg")',
    default: './sprite.svg',
    validate(input) {
      if (path.extname(input) !== '.svg') return chalk.red('File must be an .svg');
      return true;
    }
  }
];

// make the sprite
inquirer.prompt(QUESTIONS).then((answers) => {
  let iconArr = answers.icons;

  iconArr.forEach(icon => {
    let { set, name } = icon
    sprite.add(`${set}-${name}`, allIcons[set][name]);
  });

  const finalPath = path.resolve(answers.output);

  fs.outputFileSync(finalPath, sprite);
  console.log(chalk.green(`File saved to ${finalPath}`));
});
