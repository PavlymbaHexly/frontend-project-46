#!/usr/bin/env node
import { Command } from 'commander';
import { resolve } from 'node:path';
import { genDiff } from '../src/index.js';
import { parseData } from '../src/parsers.js';
import stylish from '../src/stylish.js';

const program = new Command();

program
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows the difference.')
  .version('0.0.1', '-v, --version')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    try {
      const data1 = parseData(resolve(filepath1));
      const data2 = parseData(resolve(filepath2));

      if (!data1 || !data2) {
        console.error('Error: wrong file extension or invalid file format');
        return;
      }

      const diff = genDiff(data1, data2);
      const output = stylish(diff);
      console.log(output);
    } catch (err) {
      console.error(`Error: ${err.message}`);
    }
  });

program.parse();
