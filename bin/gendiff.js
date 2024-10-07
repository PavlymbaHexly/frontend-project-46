#!/usr/bin/env node
import { Command } from 'commander';
import { resolve } from 'node:path';
import { genDiff } from '../src/index.js';
import { parseData } from '../src/parsers.js';

const program = new Command();

program
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows the difference.')
  .version('0.0.1', '-v, --version')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    const [data1, data2] = [parseData(resolve(filepath1)), parseData(resolve(filepath2))];
    if (!data1 || !data2) return console.log('wrong file extension');
    genDiff(data1, data2);
  });

program.parse();
