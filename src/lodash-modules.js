'use strict';

import fs from 'fs';
import { assign, findKey, transform } from 'lodash';
import Module from 'module';
import path from 'path';

function getDirectories(srcPath) {
  // Slow synchronous version of https://github.com/megawac/lodash-modularize/blob/master/src/lodashModules.js.
  // Using the paths lodash-cli provides is not an option as they may change version to version =(
  return ['.'].concat(fs.readdirSync(srcPath)).filter(filePath =>
    fs.statSync(path.join(srcPath, filePath)).isDirectory());
}

const lodashPath = path.dirname(Module._resolveFilename('lodash', assign(new Module, {
  'paths': Module._nodeModulePaths(process.cwd())
})));

const categoryMap = transform(getDirectories(lodashPath), (result, category) => {
  result[category] = fs.readdirSync(path.join(lodashPath, category))
    .filter(name => path.extname(name) == '.js')
    .map(name => path.basename(name, '.js'));
}, {});

export default function resolveModule(name, base) {
  let category;

  if (base) {
    category = categoryMap[base].indexOf(name) > -1 && base;
  } else {
    category = findKey(categoryMap, funcs => funcs.indexOf(name) > -1);    
  }
  if (category) {
    return path.join('lodash', category, name);
  }
  throw new Error([
    `lodash method ${name} was not in known modules.`,
    'Please report bugs to https://github.com/lodash/babel-plugin-lodash/issues.'
  ].join('\n'));
}
