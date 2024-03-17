import process from 'process';

import fs from 'fs';
import yaml from 'js-yaml';

const env = process.env.ENV;

if (!env) throw Error('Invalid configuration! Please set the CONFIG environment variable!');

const ymlFilePath = `./config/${env}.yml`;

const config = yaml.load(fs.readFileSync(ymlFilePath, 'utf8'));

global.config = config;

export default config;